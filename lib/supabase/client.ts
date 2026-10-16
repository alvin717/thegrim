import { createBrowserClient } from "@supabase/ssr"

/**
 * 브라우저 환경에서 사용하는 Supabase 클라이언트
 */
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://demo.supabase.co"
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "demo-anon-key"

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
