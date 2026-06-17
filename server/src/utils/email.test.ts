import { sendVerificationEmail } from './email';

describe('sendVerificationEmail', () => {
  it('logs the email being sent', async () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    await sendVerificationEmail('user@example.com', '12345');

    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining('Sending email')
    );

    logSpy.mockRestore();
  });
});
