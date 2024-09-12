import { NextRequest, NextResponse } from 'next/server';
import { NextApiRequest, NextApiResponse } from 'next';
import { Readable } from 'stream';

// Helper to convert NextRequest to NextApiRequest
export async function createEdgeMiddlewareAdapter(req: NextRequest) {
    const res = new NextResponse();

    const adaptedReq = {
        ...req,
        body: req.body ? await req.text() : undefined, // Converts the body to text
        headers: req.headers,
        method: req.method,
        url: req.url,
        query: req.nextUrl.searchParams,
    } as unknown as NextApiRequest;

    const adaptedRes = {
        ...res,
        json: (data: any) => NextResponse.json(data),
        status: (statusCode: number) =>
            new NextResponse(undefined, { status: statusCode }), // Handle status separately
    } as unknown as NextApiResponse;

    return { req: adaptedReq, res: adaptedRes };
}
