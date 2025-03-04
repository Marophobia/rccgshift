import { errorHandler, sucessHandler } from "@/lib/functions"
import prisma from "@/lib/db"
import { OfficialType } from "@/app/types/officials"
export const POST = async (req: Request) => {
    try {

        const settings = await prisma.settings.findFirst();
        if (!settings) {
            return errorHandler("No settings found", 404)
        }

        const coordinators = await prisma.officials.findMany({
            where: {
                status: true,
                type: {
                    in: [
                        OfficialType.provincial_shift_coordinator,
                        OfficialType.assistant_regional_shift_coordinator,
                        OfficialType.regional_shift_coordinator
                    ]
                }
            },
            include: {
                official_sessions: {
                    where: {
                        status: true,
                        seasonId: settings.current_season
                    }
                }
            },
            orderBy: {
                id: "asc"
            }
        });

        if (!coordinators || coordinators.length < 1) {
            return sucessHandler("All Coordinators", 200, coordinators)
        }

        return sucessHandler("All Coordinators", 200, coordinators)
    } catch (error) {
        return errorHandler(`Something went wrong: ${error}`)
    }
}