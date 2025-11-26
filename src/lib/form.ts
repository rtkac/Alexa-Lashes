import { createServerFn } from "@tanstack/react-start";
import nodemailer from "nodemailer";

import { emailRegex, nameRegex } from "@/helpers";
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
  console.log(process.env.EMAIL_ADDRESS);
  console.log(process.env.EMAIL_PASSWORD);
  const res = await transporter.sendMail({
    from: process.env.EMAIL_ADDRESS,
    to: process.env.EMAIL_ADDRESS,
    subject: `Kontaktny formular - Alexa Lashes`,
    text: `Meno: ${name}\n\nE-mail: ${email}\n\nSprava: ${message}`,
    html: `<!doctypehtml><html dir=ltr lang=en xmlns=http://www.w3.org/1999/xhtml xmlns:o=urn:schemas-microsoft-com:office:office xmlns:v=urn:schemas-microsoft-com:vml><title>Kontaktny formular</title><!--[if !mso]><!--><meta content="IE=edge"http-equiv=X-UA-Compatible><!--<![endif]--><meta content="text/html; charset=UTF-8"http-equiv=Content-Type><meta content="width=device-width,initial-scale=1"name=viewport><style>#outlook a{padding:0}body{margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}table,td{border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0}img{border:0;height:auto;line-height:100%;outline:0;text-decoration:none;-ms-interpolation-mode:bicubic}p{display:block;margin:13px 0}</style><!--[if mso]><noscript><xml><o:officedocumentsettings><o:allowpng><o:pixelsperinch>96</o:pixelsperinch></o:officedocumentsettings></xml></noscript><![endif]--><!--[if lte mso 11]><style>.mj-outlook-group-fix{width:100%!important}</style><![endif]--><style>@media only screen and (min-width:480px){.mj-column-per-100{width:100%!important;max-width:100%}.mj-column-per-50{width:50%!important;max-width:50%}}</style><style media="screen and (min-width:480px)">.moz-text-html .mj-column-per-100{width:100%!important;max-width:100%}.moz-text-html .mj-column-per-50{width:50%!important;max-width:50%}</style><style>[owa] .mj-column-per-100{width:100%!important;max-width:100%}[owa] .mj-column-per-50{width:50%!important;max-width:50%}</style><style>@media only screen and (max-width:479px){table.mj-full-width-mobile{width:100%!important}td.mj-full-width-mobile{width:auto!important}}</style><style></style><body style=word-spacing:normal;background-color:#f4f4f4><div style=background-color:#f4f4f4 dir=ltr lang=en role=main><!--[if mso | IE]><table border=0 cellpadding=0 cellspacing=0 role=presentation style=width:600px align=center width=600 bgcolor=#c4ad72><tr><td style=line-height:0;font-size:0;mso-line-height-rule:exactly><![endif]--><div style="background:#c4ad72;background-color:#c4ad72;margin:0 auto;max-width:600px"><table border=0 cellpadding=0 cellspacing=0 role=presentation style=background:#c4ad72;background-color:#c4ad72;width:100% align=center><tr><td style="direction:ltr;font-size:0;padding:12px 0 12px 0;text-align:center"><!--[if mso | IE]><table border=0 cellpadding=0 cellspacing=0 role=presentation><tr><td style=vertical-align:middle;width:600px><![endif]--><div style=font-size:0;line-height:0;text-align:left;display:inline-block;width:100%;direction:ltr;vertical-align:middle class="mj-outlook-group-fix mj-column-per-100"><!--[if mso | IE]><table border=0 cellpadding=0 cellspacing=0 role=presentation><tr><td style=vertical-align:middle;width:300px><![endif]--><div style=font-size:0;text-align:left;direction:ltr;display:inline-block;vertical-align:middle;width:50% class="mj-outlook-group-fix mj-column-per-50"><table border=0 cellpadding=0 cellspacing=0 role=presentation style=vertical-align:middle width=100%><tr><td style="font-size:0;padding:12px 32px 12px 32px;word-break:break-word"align=left><table border=0 cellpadding=0 cellspacing=0 role=presentation style=border-collapse:collapse;border-spacing:0><tr><td style=width:35px><img alt=logo height=30 src=https://alexalashes.netlify.app/logo.png style=border:none;display:block;outline:0;text-decoration:none;height:30px;width:100%;font-size:13px width=35></table></table></div><!--[if mso | IE]><td style=vertical-align:middle;width:300px><![endif]--><div style=font-size:0;text-align:left;direction:ltr;display:inline-block;vertical-align:middle;width:50% class="mj-outlook-group-fix mj-column-per-50"><table border=0 cellpadding=0 cellspacing=0 role=presentation style=vertical-align:middle width=100%><tr><td style="font-size:0;padding:0 32px 0 32px;padding-top:0;padding-bottom:0;word-break:break-word"align=left><div style=font-family:Verdana,Helvetica,Arial,sans-serif;font-size:13px;line-height:1;text-align:left;color:#000><p style="text-align:right;margin:10px 0;margin-top:10px;margin-bottom:10px"class=text-build-content><a href=https://alexalashes.sk target=_blank style=color:inherit;text-decoration:none;text-decoration:none class=link-build-content><span style=color:#000;font-family:Arial;font-size:14px;line-height:20px><b>Alexa Lashes</b></span></a></div></table></div><!--[if mso | IE]><![endif]--></div><!--[if mso | IE]><![endif]--></table></div><!--[if mso | IE]><table border=0 cellpadding=0 cellspacing=0 role=presentation style=width:600px align=center width=600 bgcolor=#fdfbf7><tr><td style=line-height:0;font-size:0;mso-line-height-rule:exactly><![endif]--><div style="background:#fdfbf7;background-color:#fdfbf7;margin:0 auto;max-width:600px"><table border=0 cellpadding=0 cellspacing=0 role=presentation style=background:#fdfbf7;background-color:#fdfbf7;width:100% align=center><tr><td style="direction:ltr;font-size:0;padding:16px 16px 16px 16px;text-align:center"><!--[if mso | IE]><table border=0 cellpadding=0 cellspacing=0 role=presentation><tr><td style=vertical-align:top;width:568px><![endif]--><div style=font-size:0;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100% class="mj-outlook-group-fix mj-column-per-100"><table border=0 cellpadding=0 cellspacing=0 role=presentation style=vertical-align:top width=100%><tr><td style="font-size:0;padding:0 16px 0 16px;padding-top:0;padding-bottom:0;word-break:break-word"align=left><div style=font-family:Verdana,Helvetica,Arial,sans-serif;font-size:13px;line-height:1;text-align:left;color:#000><p style="margin:10px 0;margin-top:10px"class=text-build-content><span style=color:#272f36;font-family:Arial;font-size:16px;line-height:24px><b>Správa z kontaktného formuláru</b></span><p style="margin:10px 0"class=text-build-content> <p style="margin:10px 0"class=text-build-content><span style=color:#272f36;font-family:Arial;font-size:16px;line-height:24px>Meno: ${name}</span><p style="margin:10px 0"class=text-build-content><span style=color:#272f36;font-family:Arial;font-size:16px;line-height:24px>E-mail: ${email}</span><p style="margin:10px 0;margin-bottom:10px"class=text-build-content><span style=color:#272f36;font-family:Arial;font-size:16px;line-height:24px>Správa: ${message}</span></div></table></div><!--[if mso | IE]><![endif]--></table></div><!--[if mso | IE]><table border=0 cellpadding=0 cellspacing=0 role=presentation style=width:600px align=center width=600 bgcolor=#fdfbf7><tr><td style=line-height:0;font-size:0;mso-line-height-rule:exactly><![endif]--><div style="background:#fdfbf7;background-color:#fdfbf7;margin:0 auto;max-width:600px"><table border=0 cellpadding=0 cellspacing=0 role=presentation style=background:#fdfbf7;background-color:#fdfbf7;width:100% align=center><tr><td style="direction:ltr;font-size:0;padding:0 16px 16px 16px;text-align:center"><!--[if mso | IE]><table border=0 cellpadding=0 cellspacing=0 role=presentation><tr><td style=vertical-align:bottom;width:568px><![endif]--><div style=font-size:0;text-align:left;direction:ltr;display:inline-block;vertical-align:bottom;width:100% class="mj-outlook-group-fix mj-column-per-100"><table border=0 cellpadding=0 cellspacing=0 role=presentation style=vertical-align:bottom width=100%><tr><td style="font-size:0;padding:10px 16px 25px 16px;word-break:break-word"align=center><p style="border-top:solid 1px #c4ad72;font-size:1px;margin:0 auto;width:100%"></p><!--[if mso | IE
                            ]><table
                              align="center"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              style="
                                border-top: solid 1px #c4ad72;
                                font-size: 1px;
                                margin: 0px auto;
                                width: 536px;
                              "
                              role="presentation"
                              width="536px"
                            >
                              <tr>
                                <td style="height: 0; line-height: 0">
                                  &nbsp;
                                </td>
                              </tr>
                            </table>
                            <table
                              align="center"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              style="
                                border-top: solid 1px #c4ad72;
                                font-size: 1px;
                                margin: 0px auto;
                                width: 536px;
                              "
                              role="presentation"
                              width="536px"
                            >
                              <tr>
                                <td style="height: 0; line-height: 0">
                                  &nbsp;
                                </td>
                              </tr>
                            </table><!
                          [endif]--><tr><td style="font-size:0;padding:10px 16px 10px 16px;padding-top:10px;padding-bottom:10px;word-break:break-word"align=left><div style=font-family:Verdana,Helvetica,Arial,sans-serif;font-size:13px;line-height:1;text-align:left;color:#000><p style="margin:10px 0;margin-top:10px;margin-bottom:10px"><span style=color:#000;line-height:20px;font-size:14px;font-family:Arial>Tento e-mail bol odoslaný spoločnosťou Alexa Lashes. Túto správu ste dostali, pretože ste odoslali formulár prostredníctvom našej webovej stránky.</span></div></table></div><!--[if mso | IE]><![endif]--></table></div></div>`,
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
