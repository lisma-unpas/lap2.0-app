import { Metadata } from 'next';
import { openSharedMetadata } from '@/utils/metadata';

export const metadata: Metadata = {
    ...openSharedMetadata('Masuk'),
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return children;
}
