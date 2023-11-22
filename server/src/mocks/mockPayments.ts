import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const payments = [];

  for (let i = 1; i <= 100; i++) {
    payments.push({
      buyerId: i,
      sellerId: (i % 100) + 1,
      sellerEmail: `seller${i}@example.com`,
      sellerName: `Seller ${i}`,
      amount: Math.floor(Math.random() * 10000) + 1,
      escrow: true,
    });
  }

  await prisma.payment.createMany({
    data: payments,
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
