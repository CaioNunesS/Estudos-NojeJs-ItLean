const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

(async function main() {
  try {
    const newAuthor = await prisma.author.upsert({
      where: { name: 'Martin Fowler' },
      update: {},
      create: {
        name: 'Martin Fowler',
        Quotes: {
          create: [
            {
              quote:
                'Qualquer tolo pode escrever um código que um computador pode entender. Porém bons programadores escrevem códigos que os humanos podem entender.',
            },
            {
              quote:
                'Não sou um grande programador. Sou apenas um bom programador com ótimos hábitos.',
            },
          ],
        },
      },
    });
    console.log('Crie 1 author com 2 citações', newAuthor);
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
