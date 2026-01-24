import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
    return new PrismaClient();
};

declare const globalThis: {
    prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

import { config } from "@/lib/config";

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (!config.isProduction) globalThis.prismaGlobal = prisma;
