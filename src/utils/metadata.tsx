import { Metadata } from 'next';

export const openSharedMetadata = (title?: string, description?: string): Metadata => {
    const prefix = 'LAP 2.0"';
    const fullTitle = `${prefix} | ${title || 'Beranda'}`;
    const defaultDesc = 'Platform Terintegrasi LISMA dan LAP untuk Pendaftaran dan Materi.';

    return {
        title: fullTitle,
        description: description || defaultDesc,
        openGraph: {
            title: fullTitle,
            description: description || defaultDesc,
            type: 'website',
            images: [
                {
                    url: '/logo.png',
                    width: 800,
                    height: 600,
                    alt: 'LAP 2.0 Logo',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: fullTitle,
            description: description || defaultDesc,
            images: ['/logo.png'],
        },
    };
};
