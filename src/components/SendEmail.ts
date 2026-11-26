"use server";
import { Resend } from "resend";
import { redirect } from "next/navigation";

// EMAIL SENDING FUNCTIONALITY
// ADD RESEND_API_KEY IN YOUR .ENV FILE (see .env.sample)
// NOTE: the Resend client is created inside the function (not at module
// scope) so the page itself doesn't crash during build/dev when the key
// isn't set yet — it only errors if someone actually submits the form.
export const SendEmail = async (formdata: FormData) => {
  const message = formdata.get("message");
  const name = formdata.get("name");
  const SenderEmail = formdata.get("SenderEmail");
  if (!message) {
    return {
      error: "Invalid message",
    };
  }

  if (!process.env.RESEND_API_KEY) {
    return {
      error:
        "Contact form isn't configured yet — add RESEND_API_KEY to your .env file.",
    };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: "Contact Form <onboarding@resend.dev>",
    to: `chimzyprime@gmail.com`,
    subject: `${name} From Contact Form.`,
    reply_to: `${SenderEmail}`,
    text: `sender email: ${SenderEmail}
     ${message}`,
  });

  return redirect("/");
};
