/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ik.imagekit.io',
                port: '',
                pathname: '/**',
            },
        ],
    },
    experimental: {
        optimizePackageImports: ["@untitledui/icons"],
        serverActions: {
            bodySizeLimit: "100mb",
        },
    },
};

export default nextConfig;
