import { type AnyFieldApi, useForm } from "@tanstack/react-form";
import { createServerFn } from "@tanstack/react-start";
import nodemailer from "nodemailer";

// Creating the transporter object for nodemailer
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: true,
  port: 465,
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Function that uses the nodemailer transporter to send the email
const sendEmailMessage = async ({ email, message }: { email: string; message: string }) => {
  console.log(process.env.EMAIL_ADDRESS);
  console.log(process.env.EMAIL_PASSWORD);
  const res = await transporter.sendMail({
    from: process.env.EMAIL_ADDRESS,
    to: process.env.EMAIL_ADDRESS,
    subject: `Message from ${email}, sent from Portfolio Website`,
    text: message,
    replyTo: email,
  });
  return res;
};

// Server function that calls that validates the input and calls the `sendEmailMessage` function
const submitForm = createServerFn({ method: "POST" })
  .inputValidator((data: User) => {
    const { name, email, message } = data;
    if (!name) {
      throw new Error("Name is required");
    } else if (!email) {
      throw new Error("email is required");
    } else if (!message) {
      throw new Error("Message is required");
    }

    return { name: name.toString(), email: email.toString(), message: message.toString() };
  })
  .handler(async (ctx) => {
    return await sendEmailMessage(ctx.data);
  });

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <em>{field.state.meta.errors.join(",")}</em>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  );
}

interface User {
  name: string;
  email: string;
  message: string;
}
const defaultUser: User = { name: "", email: "", message: "" };

const ContactForm = () => {
  const form = useForm({
    defaultValues: defaultUser,
    onSubmit: async ({ value }) => {
      // Do something with form data
      console.log(value);
      const res = await submitForm({ data: value });
      console.log("Email sent:", res);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <div>
        {/* A type-safe field component*/}
        <form.Field
          name="name"
          validators={{
            onChange: ({ value }) =>
              !value
                ? "A first name is required"
                : value.length < 3
                  ? "First name must be at least 3 characters"
                  : undefined,
            onChangeAsyncDebounceMs: 500,
            onChangeAsync: async ({ value }) => {
              await new Promise((resolve) => setTimeout(resolve, 1000));
              return value.includes("error") && 'No "error" allowed in first name';
            },
          }}
        >
          {(field) => (
            <>
              <label htmlFor={field.name}>Name:</label>
              <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </>
          )}
        </form.Field>
      </div>
      <div>
        <form.Field name="email">
          {(field) => (
            <>
              <label htmlFor={field.name}>Email:</label>
              <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </>
          )}
        </form.Field>
      </div>
      <div>
        <form.Field name="message">
          {(field) => (
            <>
              <label htmlFor={field.name}>Message:</label>
              <textarea
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </>
          )}
        </form.Field>
      </div>
      <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
        {([canSubmit, isSubmitting]) => (
          <>
            <button type="submit" disabled={!canSubmit}>
              {isSubmitting ? "..." : "Submit"}
            </button>
          </>
        )}
      </form.Subscribe>
    </form>
  );
};

export default ContactForm;
