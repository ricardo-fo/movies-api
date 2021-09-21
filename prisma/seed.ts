import { PrismaService } from './../src/prisma/prisma.service';
const prismaService = new PrismaService();
async function main() {
  const admin = await prismaService.userType.upsert({
    where: { name: 'admin' },
    update: {},
    create: { name: 'admin' },
  });

  const client = await prismaService.userType.upsert({
    where: { name: 'client' },
    update: {},
    create: { name: 'client' },
  });

  console.log({ admin, client });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
