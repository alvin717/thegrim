import { createBrowserClient } from "@supabase/ssr"

/**
 * 브라우저 환경에서 사용하는 Supabase 클라이언트
 */
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://afvvduherpkqorowvqct.supabase.co"
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "sb_publishable_mNkUoJBcypUDW-p2QSrr7w_xHEAXVL-"

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
