
// lib/roleCheck.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { errorHandler, sucessHandler } from "@/lib/functions"

type Handler = (req: NextApiRequest) => void | Promise<void>;

export function roleCheck(handler: Handler, requiredRole: string) {
    return async (req: NextApiRequest) => {
        const token = await getToken({ req });

        if (!token) {
            return errorHandler("Error", 404)
        }

        if (token.role !== requiredRole) {
            return errorHandler("Error", 404)
        }

        return handler(req,);
    };
}
