import { auth } from "@clerk/nextjs/server";
import { MAX_FREE_COUNTS } from "@/constants";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const increaseApiLimit = async () => {
    const { userId } = await auth();

    if (!userId) return;

    const userApiLimit = await prisma.userApiLimit.findUnique({
        where: {
            userId,
        },
    });

    if (userApiLimit) {
        await prisma.userApiLimit.update({
            where: { userId },
            // @ts-ignore
            data: { count: userApiLimit.count + 1 },
        });
    } else {
        await prisma.userApiLimit.create({
            data: { userId: userId, count: 1 },
        });
    }
};

export const checkApiLimit = async () => {
    const { userId } = await auth();

    if (!userId) return false;

    const userApiLimit = await prisma.userApiLimit.findUnique({
        where: {
            userId,
        },
    });

    return !!(userApiLimit && userApiLimit.count < MAX_FREE_COUNTS);
};

export const getApiLimitCount = async () => {
    const { userId } = await auth();

    if (!userId) return 0;

    const userApiLimit = await prisma.userApiLimit.findUnique({
        where: {
            userId,
        },
    });

    if (!userApiLimit) return 0;

    return userApiLimit.count;
};
