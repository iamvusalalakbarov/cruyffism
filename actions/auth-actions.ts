"use server";

import { sql } from "@/lib/db";
import { cookies } from "next/headers";
import crypto from "crypto";
import { loginSchema } from "@/lib/validations";
import { z } from "zod";

// Helper function to hash passwords
function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

// Create admin user if it doesn't exist
export async function ensureAdminExists() {
  try {
    const users = await sql`SELECT * FROM users WHERE username = 'admin'`;

    if (users.length === 0) {
      // Create default admin user
      const passwordHash = hashPassword("password"); // Default password

      await sql`
        INSERT INTO users (username, email, password_hash, is_admin)
        VALUES ('admin', 'admin@cruyffism.com', ${passwordHash}, true)
      `;

      console.log("Default admin user created");
    }

    return { success: true };
  } catch (error) {
    console.error("Error ensuring admin exists:", error);
    return { success: false };
  }
}

// Login function
export async function login(formData: FormData) {
  try {
    const rawData = {
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    };

    // Validate form data
    const validatedData = loginSchema.parse(rawData);

    const passwordHash = hashPassword(validatedData.password);

    const users = await sql`
      SELECT * FROM users
      WHERE username = ${validatedData.username} AND password_hash = ${passwordHash}
    `;

    if (users.length === 0) {
      return { success: false, error: "Invalid username or password" };
    }

    // Set a session cookie
    const sessionId = crypto.randomUUID();
    (await cookies()).set("session_id", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });

    // Store user ID in another cookie for client-side access
    (await cookies()).set("user_id", String(users[0].id), {
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });

    return { success: true, error: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors.map((e) => `${e.path.join(".")}: ${e.message}`).join(", "),
      };
    }

    console.error("Error during login:", error);
    return { success: false, error: "An error occurred during login" };
  }
}

// Logout function
export async function logout() {
  (await cookies()).delete("session_id");
  (await cookies()).delete("user_id");
  return { success: true };
}

// Check if user is authenticated
export async function isAuthenticated() {
  const sessionId = (await cookies()).get("session_id")?.value;

  if (!sessionId) {
    return false;
  }

  return true;
}
