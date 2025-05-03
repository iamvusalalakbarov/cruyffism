import { z } from "zod";

// Article validation schema
export const articleSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(255, "Title must be less than 255 characters"),
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters")
    .max(255, "Slug must be less than 255 characters")
    .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be less than 500 characters"),
  content: z.string().min(50, "Content must be at least 50 characters"),
  image_url: z.string().url("Image URL must be a valid URL").or(z.string().length(0)).optional(),
  read_time: z.string().optional(),
  tags: z.array(z.string()),
  newTag: z.string().optional(),
});

export type ArticleFormData = z.infer<typeof articleSchema>;

// Quote validation schema
export const quoteSchema = z.object({
  text: z.string().min(3, "Quote text must be at least 3 characters"),
  context: z.string().optional(),
  year: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  featured: z.boolean(),
});

export type QuoteFormData = z.infer<typeof quoteSchema>;

// Tag validation schema
export const tagSchema = z.object({
  name: z.string().min(1, "Tag name is required").max(100, "Tag name must be less than 100 characters"),
});

export type TagFormData = z.infer<typeof tagSchema>;

// Login validation schema
export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Ad minimum 2 simvol olmalıdır" }),
  email: z.string().email({ message: "Düzgün e-poçt ünvanı daxil edin" }),
  subject: z.string().min(5, { message: "Mövzu minimum 5 simvol olmalıdır" }),
  message: z.string().min(10, { message: "Müraciət minimum 10 simvol olmalıdır" }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;