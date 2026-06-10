import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;

    const post = await prisma.postView.upsert({
        where: { slug },
        update: {
            views: {
                increment: 1,
            },
        },
        create: {
            slug,
            views: 1,
        },
    });

    return NextResponse.json(post);
}

export async function GET(
    req: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;

    const post = await prisma.postView.findUnique({
        where: { slug },
    });

    return NextResponse.json({
        views: post?.views || 0,
    });
}