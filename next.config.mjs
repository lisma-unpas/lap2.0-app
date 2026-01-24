/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        optimizePackageImports: ["@untitledui/icons"],
        serverActions: {
            bodySizeLimit: "5mb",
        },
    },
};

export default nextConfig;
