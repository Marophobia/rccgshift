import { errorHandler, sucessHandler } from "@/lib/functions"
import prisma from "@/lib/db"
import { getAuthSession } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"


export const POST = async (req: NextRequest) => {
    const data = await req.json()
    const { id } = data
    try {

        const round = await prisma.round.findFirst({
            where: {
                id: Number(id)
            },
            include: {
                users: {
                    include: {
                        user: true
                    },
                    orderBy: [
                        {
                            qualified: 'desc'
                        },
                        {
                            score: 'desc'
                        }
                    ],
                }
            }
        });

        if (!round) {
            return errorHandler("Round not found", 404)
        }
        return sucessHandler("Active round", 200, round)
    } catch (error) {
        return errorHandler(`Something went wrong: ${error}`)
    }
}