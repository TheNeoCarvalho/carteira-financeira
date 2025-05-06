import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.user.createMany({
        data: [
            {
                id: "133db5d7-2d39-46c5-bd87-f0735178661",
                name: "Manoel",
                email: "manoel@gmail.com",
                password: "manoel12345",
                balance: 100
            },
            {
                id: "b137fde0-a297-4b55-945a-a95a046f24cc",
                name: "Manoel Carvalho",
                email: "manoelcarvalho@gmail.com",
                password: "manoel12345",
                balance: 200
            },
        ],
    });

    await prisma.transaction.createMany({
        data: [
            {
                id: '133db5d7-2d39-46c5-bd87-f0735178662',
                senderId: "133db5d7-2d39-46c5-bd87-f0735178661",
                receiverId: "b137fde0-a297-4b55-945a-a95a046f24cc",
                amount: 50,
                status: 'COMPLETED'
            },
            {
                id: 'b137fde0-a297-4b55-945a-a95a046f24cb',
                senderId: "b137fde0-a297-4b55-945a-a95a046f24cc",
                receiverId: "133db5d7-2d39-46c5-bd87-f0735178661",
                amount: 30,
                status: 'COMPLETED'
            },
        ],
    });
}

main()