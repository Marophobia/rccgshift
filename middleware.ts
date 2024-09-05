import { NextApiRequest } from "next"
import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server";

export const middleware = async (req: any) => {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

    const { pathname } = req.nextUrl;

    if (!token) {
        return NextResponse.redirect(new URL("/auth", req.url));
    }

    const userRole = token.role;

    if (pathname.startsWith("/admin") && userRole !== "admin") {
        return NextResponse.redirect(new URL("/auth", req.url));
    }
    if (pathname.startsWith("/judge") && userRole !== "judge") {
        return NextResponse.redirect(new URL("/auth", req.url));
    }

    return NextResponse.next()
}

export const config = { matcher: ["/admin/:path*", "/judge/:path"] }