import { sendVerificationEmail } from './email';

test('sendVerificationEmail resolves', async () => {
  await expect(
    sendVerificationEmail('test@example.com', '123'),
  ).resolves.toBeUndefined();
});
