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
            // Allow +1 (like) or -1 (unlike) only
            if (body.count === -1) count = -1;
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
                likes: Math.max(0, count),
            },
        });

        const likes = Math.max(0, post.likes);

        if (post.likes < 0) {
            await prisma.postView.update({
                where: { slug },
                data: { likes: 0 },
            });
        }

        return NextResponse.json({ likes });
    } catch (error: any) {
        console.error("POST likes error:", error);
        return NextResponse.json({
            error: error.message || String(error),
            stack: error.stack
        }, { status: 500 });
    }
}

