import { ensureAdminExists } from "@/actions/auth-actions"

// This function will be called when the app starts
export async function initializeAdmin() {
  await ensureAdminExists()
}
