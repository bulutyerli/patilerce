/* eslint-disable @next/next/no-img-element */
export function htmlEmail(verificationLink) {
  console.log('received link', verificationLink);
  return `<div style="font-family: Arial, sans-serif;">
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
              Thank you for signing up to Tailwish.com. To complete your
              registration, please click the button below to verify your email
              address:
            </p>
          </div>
          <div
            style="text-align: center; margin-top: 30px;"
          >
            <a
              style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;"
              href="${verificationLink}"
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
            Tailwish.com
          </p>
          <p>
            If the button does not work for any reason, you can use this link to
            verify your email address:
          </p>
          <div>${verificationLink}</div>
        </div>
      </div>`;
}
