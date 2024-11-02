const { htmlEmail } = require('./html-email-verify');

describe('htmlEmail', () => {
  it('should return correct html structure', () => {
    const testVerificationLink = 'https://www.example.com/verify?token=123';

    const expected = `<div style="font-family: Arial, sans-serif;">
        <div
          style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ccc; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);"
        >
          <div
            style="text-align: center; margin-bottom: 20px;"
          >
            <img
              src="/public/images/logo.png"
              alt="Pet Adoption Logo"
              style="max-width: 200px; height: auto;"
            />
          </div>
          <div
            style="margin-bottom: 20px;"
          >
            <p>Hi there,</p>
            <p>
              Thank you for signing up to Patilerce.com. To complete your
              registration, please click the button below to verify your email
              address:
            </p>
          </div>
          <div
            style="text-align: center; margin-top: 30px;"
          >
            <a
              style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;"
              href="https://www.example.com/verify?token=123"
            >
              Verify Email
            </a>
          </div>
          <p>
            If you did not create an account on our website, you can safely ignore
            this email.
          </p>
          <p>
            Thank you,
            <br />
            patilerce.com
          </p>
          <p>
            If the button does not work for any reason, you can use this link to
            verify your email address:
          </p>
          <div>https://www.example.com/verify?token=123</div>
        </div>
      </div>`;

    const actual = htmlEmail(testVerificationLink);
    expect(actual).toBe(expected);
  });
});
