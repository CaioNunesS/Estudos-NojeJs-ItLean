import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const findAll = async ({ offset, listPerPage }) => {
  try {
    return await prisma.quotes.findMany({
      include: { author: true },
      skip: offset,
      take: listPerPage,
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const create = async ({ quote, author }) => {
  if (!author || !quote) throw new Error('Either quote or author is missing');

  try {
    const getQuote = await prisma.quotes.findFirst({
      where: { quote },
    });

    if (getQuote) throw new Error('Quote already registered');

    const getAuthor = await prisma.author.findFirst({
      where: { name: author },
    });

    if (!getAuthor) {
      await prisma.author.create({
        data: {
          name: author,
          Quotes: {
            create: {
              quote,
            },
          },
        },
      });
    }

    return await prisma.quote.create({
      data: {
        quote,
        author: { connect: { name: author } },
      },
    });
  } catch (error) {
    throw new Error(error);
  }
};
