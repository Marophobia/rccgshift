import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    for (let i = 1; i <= 30; i++) {
        const user = await prisma.user.create({
            data: {
                name: `User ${i}`,
                email: `user${i}@example.com`,
                telephone: `123-456-789${i}`,
                bio: `This is the bio of user ${i}`,
                regional_pastor: `Pastor ${i}`,
                gender: i % 2 === 0 ? 'Male' : 'Female',
                age_grade: 'Youth',
                category: 'Contestant',
                type: 'Individual',
                number_of_members: 1,
                country: 'Country',
                state: `State ${i}`,
                region: `Region ${i}`,
                province: `Province ${i}`,
                picture: `user${i}.jpg`,
                status: 'registered',
                user_sessions: {
                    create: {
                        round_id: 1,
                        votes: 0, // Random number of votes
                        judge_votes: 0, // Random judge votes
                        score: 0, // Random score
                        status: 'pending',
                    },
                },
            },
        });

        console.log(`Created user with id: ${user.id}`);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
