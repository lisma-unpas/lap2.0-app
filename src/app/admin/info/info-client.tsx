"use client";

import { useState, useCallback, memo, useEffect } from "react";
import {
    Plus,
    SearchRefraction,
    Trash01 as Trash,
    Edit01 as Edit,
    Send01 as Send,
    Image01 as ImageIcon,
    AlertCircle,
} from "@untitledui/icons";
import {
    getInfoList,
    createInfo,
    updateInfo,
    deleteInfo,
    sendInfoNotification,
    uploadImage
} from "@/actions/info";
import { TextEditor } from "@/components/base/text-editor/text-editor";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { Input } from "@/components/base/input/input";
import { Table, TableCard } from "@/components/application/table/table";
import { Select } from "@/components/base/select/select";
import { FileUpload } from "@/components/application/file-upload/file-upload-base";
import Container from "@/components/shared/container";
import Section from "@/components/shared/section";
import { Modal } from "@/components/shared/modals/modal/index";
import { cx } from "@/utils/cx";
import { TableBody } from "react-aria-components";
import { useToast } from "@/context/toast-context";

export default function InfoClient({ initialInfo = [] }: { initialInfo: any[] }) {
    const [infoList, setInfoList] = useState<any[]>(initialInfo);
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState("");

    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingInfo, setEditingInfo] = useState<any>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isNotifyingId, setIsNotifyingId] = useState<string | null>(null);

    // Confirmation states
    const [confirmNotifyId, setConfirmNotifyId] = useState<string | null>(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

    const { toastSuccess, toastError, toastWarning } = useToast();

    const fetchInfo = useCallback(async () => {
        setIsLoading(true);
        const res = await getInfoList();
        if (res.success && res.data) setInfoList(res.data);
        setIsLoading(false);
    }, []);

    const handleCreateOrUpdate = useCallback(async (formData: any) => {
        setIsSaving(true);
        let res;
        if (editingInfo) {
            res = await updateInfo(editingInfo.id, formData);
        } else {
            res = await createInfo(formData);
        }

        if (res.success) {
            toastSuccess("Berhasil", editingInfo ? "Informasi diperbarui" : "Informasi dibuat");
            setIsModalOpen(false);
            setEditingInfo(null);
            await fetchInfo();
        } else {
            toastError("Gagal", res.message || "Terjadi kesalahan");
        }
        setIsSaving(false);
    }, [editingInfo, fetchInfo, toastSuccess, toastError]);

    const handleDelete = useCallback(async () => {
        if (!confirmDeleteId) return;
        const res = await deleteInfo(confirmDeleteId);
        if (res.success) {
            toastSuccess("Berhasil", "Informasi dihapus");
            setConfirmDeleteId(null);
            await fetchInfo();
        } else {
            toastError("Gagal", res.message || "Gagal menghapus informasi");
        }
    }, [confirmDeleteId, fetchInfo, toastSuccess, toastError]);

    const handleNotify = useCallback(async () => {
        if (!confirmNotifyId) return;
        setIsNotifyingId(confirmNotifyId);
        setConfirmNotifyId(null);
        toastWarning("Mengirim...", "Sedang mengirim notifikasi ke semua email terdaftar.");
        const res = await sendInfoNotification(confirmNotifyId);
        if (res.success) {
            toastSuccess("Berhasil", `Notifikasi terkirim ke ${res.count} email.`);
        } else {
            toastError("Gagal", res.message || "Gagal mengirim notifikasi");
        }
        setIsNotifyingId(null);
    }, [confirmNotifyId, toastWarning, toastSuccess, toastError]);

    const filteredInfo = infoList.filter(item =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Section className="bg-secondary_alt min-h-screen py-10">
            <Container>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-display-sm font-bold text-primary">Informasi & Pengumuman</h1>
                        <p className="text-md text-tertiary">Kelola konten informasi parade dan kirim notifikasi email</p>
                    </div>
                    <Button
                        iconLeading={Plus}
                        onClick={() => {
                            setEditingInfo(null);
                            setIsModalOpen(true);
                        }}
                    >
                        Tambah Informasi
                    </Button>
                </div>

                <TableCard.Root>
                    <TableCard.Header
                        title="Daftar Informasi"
                        badge={filteredInfo.length}
                        contentTrailing={
                            <Input
                                placeholder="Cari informasi..."
                                value={search}
                                onChange={(val) => setSearch(val)}
                                icon={SearchRefraction}
                                size="sm"
                                className="w-full md:w-64"
                            />
                        }
                    />
                    <Table size="sm">
                        <Table.Header>
                            <Table.Head label="Informasi" isRowHeader />
                            <Table.Head label="Kategori" className="hidden md:table-cell" />
                            <Table.Head label="Tanggal" className="hidden md:table-cell" />
                            <Table.Head label="Aksi" className="text-right" />
                        </Table.Header>
                        <TableBody>
                            {filteredInfo.length === 0 ? (
                                <Table.Row>
                                    <Table.Cell colSpan={4} className="py-10 text-center text-tertiary">
                                        Belum ada informasi.
                                    </Table.Cell>
                                </Table.Row>
                            ) : (
                                filteredInfo.map((item) => (
                                    <Table.Row key={item.id}>
                                        <Table.Cell>
                                            <div className="flex items-center gap-3">
                                                {item.imageUrl ? (
                                                    <img src={item.imageUrl} className="size-10 rounded object-cover border border-secondary" alt="" />
                                                ) : (
                                                    <div className="size-10 rounded bg-secondary flex items-center justify-center">
                                                        <ImageIcon className="size-5 text-quaternary" />
                                                    </div>
                                                )}
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-primary">{item.title}</span>
                                                    <span className="text-xs text-tertiary md:hidden">{item.category}</span>
                                                </div>
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell className="hidden md:table-cell">
                                            <Badge size="sm" color="blue">{item.category}</Badge>
                                        </Table.Cell>
                                        <Table.Cell className="hidden md:table-cell">
                                            <span className="text-xs text-tertiary">
                                                {new Date(item.createdAt).toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </span>
                                        </Table.Cell>
                                        <Table.Cell className="text-right">
                                            <div className="flex items-center justify-start gap-2 text-right">
                                                <Button
                                                    size="sm"
                                                    color="secondary"
                                                    iconLeading={Send}
                                                    onClick={() => setConfirmNotifyId(item.id)}
                                                    isLoading={isNotifyingId === item.id}
                                                    className="size-8 p-0"
                                                    aria-label="Kirim Notifikasi"
                                                />
                                                <Button
                                                    size="sm"
                                                    color="secondary"
                                                    iconLeading={Edit}
                                                    onClick={() => {
                                                        setEditingInfo(item);
                                                        setIsModalOpen(true);
                                                    }}
                                                    className="size-8 p-0"
                                                    aria-label="Edit"
                                                />
                                                <Button
                                                    size="sm"
                                                    color="secondary"
                                                    iconLeading={Trash}
                                                    onClick={() => setConfirmDeleteId(item.id)}
                                                    className="size-8 p-0 text-error-600 hover:text-error-700"
                                                    aria-label="Hapus"
                                                />
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableCard.Root>

                <InfoModal
                    isOpen={isModalOpen}
                    onOpenChange={setIsModalOpen}
                    editingInfo={editingInfo}
                    onSave={handleCreateOrUpdate}
                    isSaving={isSaving}
                />

                <Modal
                    isOpen={!!confirmNotifyId}
                    onOpenChange={(open) => !open && setConfirmNotifyId(null)}
                    title="Konfirmasi Notifikasi"
                    description="Anda akan mengirim email notifikasi informasi ini ke SEMUA user terdaftar (pembeli tiket & login GDrive). Lanjutkan?"
                    variant="modal"
                    maxWidth="sm"
                    primaryAction={{
                        label: "Ya, Kirim Sekarang",
                        onClick: handleNotify,
                        icon: Send
                    }}
                    secondaryAction={{
                        label: "Batal",
                        onClick: () => setConfirmNotifyId(null)
                    }}
                />

                <Modal
                    isOpen={!!confirmDeleteId}
                    onOpenChange={(open) => !open && setConfirmDeleteId(null)}
                    title="Hapus Informasi"
                    description="Apakah Anda yakin ingin menghapus informasi ini? Tindakan ini tidak dapat dibatalkan."
                    variant="modal"
                    maxWidth="sm"
                    primaryAction={{
                        label: "Ya, Hapus",
                        onClick: handleDelete,
                        color: "primary-destructive",
                        icon: Trash
                    }}
                    secondaryAction={{
                        label: "Batal",
                        onClick: () => setConfirmDeleteId(null)
                    }}
                />
            </Container>
        </Section>
    );
}

const InfoModal = memo(({ isOpen, onOpenChange, editingInfo, onSave, isSaving }: any) => {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("PENGUMUMAN");
    const [body, setBody] = useState("");
    const [imageBase64, setImageBase64] = useState<string | undefined>(undefined);
    const [fileName, setFileName] = useState<string | undefined>(undefined);
    const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);

    // Reset when modal opens or editingInfo changes
    useEffect(() => {
        if (isOpen) {
            setTitle(editingInfo?.title || "");
            setCategory(editingInfo?.category || "PENGUMUMAN");
            setBody(editingInfo?.body || "");
            setPreviewUrl(editingInfo?.imageUrl);
            setImageBase64(undefined);
            setFileName(undefined);
        }
    }, [isOpen, editingInfo]);

    const handleFileDrop = (files: FileList) => {
        const file = files[0];
        if (file) {
            setFileName(file.name);
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result as string;
                setImageBase64(base64);
                setPreviewUrl(base64);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        if (!title || !body || !category) return;
        onSave({ title, body, category, imageBase64, fileName });
    };

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            title={editingInfo ? "Edit Informasi" : "Tambah Informasi"}
            description="Isi detail informasi di bawah ini."
            primaryAction={{
                label: editingInfo ? "Simpan Perubahan" : "Buat Informasi",
                onClick: handleSave,
                isLoading: isSaving
            }}
            secondaryAction={{
                label: "Batal",
                onClick: () => onOpenChange(false)
            }}
        >
            <div className="space-y-4 py-4">
                <Input
                    label="Judul Informasi"
                    placeholder="Masukkan judul..."
                    value={title}
                    onChange={setTitle}
                    isRequired
                />

                <div className="grid grid-cols-1 gap-4">
                    <Select
                        label="Kategori"
                        selectedKey={category}
                        onSelectionChange={(key) => setCategory(key as string)}
                    >
                        <Select.Item id="PENGUMUMAN">Pengumuman</Select.Item>
                        <Select.Item id="EVENT">Event</Select.Item>
                        <Select.Item id="ARTIKEL">Artikel</Select.Item>
                        <Select.Item id="UPDATE">Update</Select.Item>
                    </Select>

                    <div>
                        <label className="block text-sm font-medium text-secondary mb-1.5">Gambar Utama</label>
                        {previewUrl && (
                            <div className="relative mb-2 group">
                                <img src={previewUrl} className="w-full h-32 object-cover rounded-lg border border-secondary" alt="Preview" />
                                <button
                                    onClick={() => {
                                        setPreviewUrl(undefined);
                                        setImageBase64(undefined);
                                        setFileName(undefined);
                                    }}
                                    className="absolute top-2 right-2 p-1 bg-white/80 rounded-full shadow-sm hover:bg-white text-error-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <Trash className="size-4" />
                                </button>
                            </div>
                        )}
                        <FileUpload.DropZone
                            onDropFiles={handleFileDrop}
                            accept="image/*"
                            allowsMultiple={false}
                            hint="Maks. 5MB"
                            className={previewUrl ? "hidden" : ""}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-secondary mb-1.5">Isi Informasi</label>
                    <TextEditor.Root
                        content={body}
                        onUpdate={({ editor }) => setBody(editor.getHTML())}
                        placeholder="Tulis isi informasi di sini..."
                    >
                        <TextEditor.Toolbar type="advanced" className="border-b border-secondary pb-2 mb-2" />
                        <TextEditor.Content />
                    </TextEditor.Root>
                </div>
            </div>
        </Modal>
    );
});
