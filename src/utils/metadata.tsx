import { Metadata } from 'next';

export const openSharedMetadata = (title: string, description?: string): Metadata => {
    const prefix = 'Ujian AI';
    const fullTitle = title ? `${prefix} | ${title}` : prefix;

    return {
        title: fullTitle,
        description: description || 'Platform Ujian Online berbasis AI yang membantu orang tua membuat latihan ujian dengan mudah.',
        openGraph: {
            title: fullTitle,
            description: description || 'Platform Ujian Online berbasis AI yang membantu orang tua membuat latihan ujian dengan mudah.',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: fullTitle,
            description: description || 'Platform Ujian Online berbasis AI yang membantu orang tua membuat latihan ujian dengan mudah.',
        },
    };
};
