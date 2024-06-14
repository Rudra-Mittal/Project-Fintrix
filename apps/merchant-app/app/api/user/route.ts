import { NextResponse } from "next/server"
import {PrismaClient} from "@prisma/client";

const client = new PrismaClient();

export const GET = async () => {
    await client.user.create({
        // @ts-ignore
        data: {
            email: "asd",
            name: "adsads",
            password: "password123"
        }
    })
    return NextResponse.json({
        message: "hi there"
    })
}