const prisma = {
  user: {
    create: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn()
  },
  verificationToken: {
    create: jest.fn(),
    findUnique: jest.fn(),
    delete: jest.fn()
  },
  product: {
    findMany: jest.fn(),
    create: jest.fn()
  },
  order: {
    findMany: jest.fn(),
    create: jest.fn()
  }
};
export default prisma;
