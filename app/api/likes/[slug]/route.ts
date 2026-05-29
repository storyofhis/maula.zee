/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;

        const post = await prisma.postView.findUnique({
            where: { slug },
        });

        return NextResponse.json({
            likes: post?.likes || 0,
        });
    } catch (error: any) {
        console.error("GET likes error:", error);
        return NextResponse.json({
            error: error.message || String(error),
            stack: error.stack
        }, { status: 500 });
    }
}

export async function POST(
    req: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        let count = 1;

        try {
            const body = await req.json();
            if (typeof body.count === "number") {
                // Clamp count between 1 and 10 per request to prevent spamming
                count = Math.min(Math.max(body.count, 1), 10);
            }
        } catch (e) {
            // Fallback to default count of 1
        }

        const post = await prisma.postView.upsert({
            where: { slug },
            update: {
                likes: {
                    increment: count,
                },
            },
            create: {
                slug,
                likes: count,
            },
        });

        return NextResponse.json({
            likes: post.likes,
        });
    } catch (error: any) {
        console.error("POST likes error:", error);
        return NextResponse.json({
            error: error.message || String(error),
            stack: error.stack
        }, { status: 500 });
    }
}

