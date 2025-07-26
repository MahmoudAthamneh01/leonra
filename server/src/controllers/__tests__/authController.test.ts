import { login } from '../authController';
import prisma from '../../models/prisma';

jest.mock('../../models/prisma', () => ({
  __esModule: true,
  default: {
    user: {
      findUnique: jest.fn()
    }
  }
}));

function createResponse() {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
}

describe('login', () => {
  it('rejects unverified users', async () => {
    const req: any = { body: { email: 'test@example.com', password: 'secret' } };
    const res = createResponse();
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: 1,
      email: 'test@example.com',
      password: 'hash',
      role: 'buyer',
      isVerified: false
    });

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'Email not verified' });
  });
});
