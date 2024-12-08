import GoogleProvider from "next-auth/providers/google";
import { getServerSession } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
// import prisma from "./connect";

const prisma = new PrismaClient();

async function testConnection() {
    try {
        await prisma.$connect();
        console.log("Database connected successfully!");
    } catch (error) {
        console.error("Database connection failed:", error);
    }
}

testConnection();

// console.log(process.env.GOOGLE_ID, process.env.GOOGLE_SECRET, process.env.DATABASE_URL);

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],
};

export const getAuthSession = () => getServerSession(authOptions);