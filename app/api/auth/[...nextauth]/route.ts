import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import { createEdgeMiddlewareAdapter } from '@/lib/edgeMiddlewareAdapter';

export async function GET(req: NextRequest) {
    const { req: adaptedReq, res: adaptedRes } =
        await createEdgeMiddlewareAdapter(req);

    // Handle NextAuth
    const result = await NextAuth(adaptedReq, adaptedRes, authOptions);

    // Return a NextResponse
    return NextResponse.json(result);
}

export async function POST(req: NextRequest) {
    const { req: adaptedReq, res: adaptedRes } =
        await createEdgeMiddlewareAdapter(req);

    // Handle NextAuth
    const result = await NextAuth(adaptedReq, adaptedRes, authOptions);

    // Return a NextResponse
    return NextResponse.json(result);
}
