"use server";

import { Resend } from "resend";
import { ContactFormData, contactFormSchema } from "@/lib/validations";

const resend = new Resend(process.env.RESEND_API_KEY);

type ContactResponse = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

export const sendContactEmail = async (formData: ContactFormData): Promise<ContactResponse> => {
  try {
    const parsed = contactFormSchema.safeParse(formData);

    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      return {
        success: false,
        message: "Zəhmət olmasa, düzgün məlumatlar daxil edin",
        errors,
      };
    }

    const { name, email, subject, message } = parsed.data;

    const emailResult = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "cruyffism.blog@gmail.com",
      subject: `Yeni müraciət: ${subject}`,
      replyTo: email,
      text: `
Ad: ${name}
E-poçt: ${email}
Mövzu: ${subject}
        
Müraciət:
${message}
`,
    });

    if (emailResult.error) {
      console.error("Email sending failed:", emailResult.error);
      return {
        success: false,
        message: "E-poçt göndərilə bilmədi. Zəhmət olmasa, bir az sonra yenidən cəhd edin.",
      };
    }
    return {
      success: true,
      message: "Müraciətiniz uğurla göndərildi!",
    };

  } catch (err: unknown) {
    console.error("Contact form submission error:", err);
    return {
      success: false,
      message: "Bir xəta baş verdi. Zəhmət olmasa, bir az sonra yenidən cəhd edin.",
    };
  }
};