import { createServerFn } from "@tanstack/react-start";
import nodemailer from "nodemailer";

import { emailRegex, nameRegex } from "@/helpers";
import { emailTemplate } from "@/lib/emailTemplate";
import type { User } from "@/types";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: true,
  port: 465,
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendEmailMessage = async ({ name, email, message }: User) => {
  const res = await transporter.sendMail({
    from: process.env.EMAIL_ADDRESS,
    to: process.env.EMAIL_ADDRESS,
    subject: `Kontaktny formular - Alexa Lashes`,
    text: `Meno: ${name}\n\nE-mail: ${email}\n\nSprava: ${message}`,
    html: emailTemplate(name, email, message),
    replyTo: email,
    cc: email,
  });
  return res;
};

export const submitForm = createServerFn({ method: "POST" })
  .inputValidator((data: User) => {
    const { name, email, message } = data;
    if (!name) {
      throw new Error("Name is required");
    } else if (!nameRegex.test(name)) {
      throw new Error("Name is not valid");
    } else if (!email) {
      throw new Error("email is required");
    } else if (!emailRegex.test(email)) {
      throw new Error("Email is not valid");
    } else if (!message) {
      throw new Error("Message is required");
    } else if (message.length < 10) {
      throw new Error("Message must be at least 10 characters");
    } else if (message.length > 280) {
      throw new Error("Message must be at most 280 characters");
    }

    return {
      name: name.toString(),
      email: email.toString(),
      message: message.toString(),
    };
  })
  .handler(async (ctx) => {
    return await sendEmailMessage(ctx.data);
  });
