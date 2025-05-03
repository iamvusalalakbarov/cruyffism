"use server";

import { ArticleFormData, newsletterFormSchema } from "@/lib/validations";
import { ISubscriptionState } from "@/components/newsletter";
import { generateArticleEmailMarkdown } from "@/lib/utils";

const BUTTONDOWN_API_KEY = process.env.BUTTONDOWN_API_KEY;

export const subscribeToNewsletter = async (
  prevState: ISubscriptionState,
  formData: FormData,
): Promise<ISubscriptionState> => {
  const parsed = newsletterFormSchema.safeParse({
    email: formData.get("email"),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Məlumatlar doğrulanmadı",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const { email } = parsed.data;

  if (!BUTTONDOWN_API_KEY) {
    console.error("Buttondown API key is not defined");
    return {
      success: false,
      message: "Abunəlik xidməti hazırda əlçatan deyil. Zəhmət olmasa bir az sonra yenidən cəhd edin.",
    };
  }

  try {
    const response = await fetch("https://api.buttondown.email/v1/subscribers", {
      method: "POST",
      headers: {
        Authorization: `Token ${BUTTONDOWN_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: email,
        tags: ["newsletter"],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      if (data.email?.[0]?.includes("already exists")) {
        return {
          success: false,
          message: "Bu e-poçt ünvanı artıq abunə olub.",
        };
      } else {
        console.log(response, data);
        return {
          success: false,
          message: "Bilinməyən bir xəta baş verdi.",
        };
      }
    }

    return {
      success: true,
      message: "Təşəkkürlər! Zəhmət olmasa, e-poçtunuzu yoxlayın və abunəliyi təsdiqləyin.",
    };
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return {
      success: false,
      message: "Abunəlik prosesində xəta baş verdi. Zəhmət olmasa bir az sonra yenidən cəhd edin.",
    };
  }
};

export const notifySubscribers = async (articleFormData: ArticleFormData) => {
  if (!BUTTONDOWN_API_KEY) {
    console.error("Buttondown API key is not defined");
    return;
  }

  try {
    const res = await fetch("https://api.buttondown.com/v1/emails", {
      method: "POST",
      headers: {
        Authorization: `Token ${BUTTONDOWN_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject: `Cruyffism | Yeni məqalə: ${articleFormData.title}`,
        body: generateArticleEmailMarkdown(articleFormData),
      }),
    });

    const data = await res.json();

    console.log("data", data);

    if (!res.ok) {
      console.error("Buttondown API error:", data);
    }
  } catch (err: unknown) {
    console.error("Error sending article newsletter:", err);
  }
};