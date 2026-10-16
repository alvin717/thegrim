import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

/**
 * Next.js 서버 컴포넌트 및 서버 액션에서 사용하는 Supabase 클라이언트
 */
export async function createClient() {
  const cookieStore = await cookies()

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://demo.supabase.co"
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "demo-anon-key"

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        } catch {
          // 서버 컴포넌트 내부에서 쿠키를 변경할 수 없는 경우 예외 무시
        }
      },
    },
  })
}
