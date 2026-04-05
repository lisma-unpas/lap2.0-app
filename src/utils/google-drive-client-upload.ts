
export async function uploadToDriveClient(file: File, accessToken: string, onProgress: (progress: number) => void) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        // 1. Initiate Resumable Upload
        xhr.open('POST', 'https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable', true);
        xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        xhr.setRequestHeader('X-Upload-Content-Type', file.type);
        xhr.setRequestHeader('X-Upload-Content-Length', file.size.toString());

        xhr.onload = () => {
            if (xhr.status === 200) {
                const location = xhr.getResponseHeader('Location');
                if (!location) {
                    reject(new Error('Failed to get resumable upload location'));
                    return;
                }

                // 2. Perform the actual upload
                const uploadXhr = new XMLHttpRequest();
                uploadXhr.open('PUT', location, true);
                
                uploadXhr.upload.onprogress = (e) => {
                    if (e.lengthComputable) {
                        const percent = Math.round((e.loaded / e.total) * 100);
                        onProgress(percent);
                    }
                };

                uploadXhr.onload = async () => {
                    if (uploadXhr.status === 200 || uploadXhr.status === 201) {
                        const response = JSON.parse(uploadXhr.responseText);
                        
                        // 3. Make file public (optional - if already handled by backend, but we are doing it all here for efficiency)
                        // Actually, we can just return the fileId and let the server make it public,
                        // OR we do a second client-side call to permissions.
                        
                        try {
                            const permXhr = new XMLHttpRequest();
                            permXhr.open('POST', `https://www.googleapis.com/drive/v3/files/${response.id}/permissions`, true);
                            permXhr.setRequestHeader('Authorization', `Bearer ${accessToken}`);
                            permXhr.setRequestHeader('Content-Type', 'application/json');
                            permXhr.send(JSON.stringify({
                                role: "reader",
                                type: "anyone",
                            }));
                            
                            // Note: We don't necessarily need to wait for permissions to finish 
                            // as long as we have the file ID and metadata.
                            // But usually, it's better to wait or use the known URL pattern.
                            
                            // The URL in Google Drive v3 is: https://drive.google.com/file/d/FILE_ID/view
                            const webViewLink = `https://drive.google.com/file/d/${response.id}/view?usp=drivesdk`;
                            
                            resolve({
                                success: true,
                                url: webViewLink,
                                fileId: response.id
                            });
                        } catch (err) {
                            console.error("Error setting permissions:", err);
                            // Fallback to just returning the ID
                            resolve({
                                success: true,
                                url: `https://drive.google.com/file/d/${response.id}/view?usp=drivesdk`,
                                fileId: response.id
                            });
                        }
                    } else {
                        reject(new Error(`Upload failed with status ${uploadXhr.status}`));
                    }
                };

                uploadXhr.onerror = () => reject(new Error('Upload failed (Network error)'));
                uploadXhr.send(file);
            } else {
                reject(new Error(`Resumable upload initiation failed: ${xhr.status} ${xhr.responseText}`));
            }
        };

        xhr.onerror = () => reject(new Error('Resumable upload initiation failed (Network error)'));
        xhr.send(JSON.stringify({
            name: `LISMA_${Date.now()}_${file.name}`,
            description: 'Uploaded via LISMA Registration Form',
        }));
    });
}
