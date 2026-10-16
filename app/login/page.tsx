"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export default function LoginPage() {
  const router = useRouter()
  const [mode, setMode] = useState<"login" | "signup">("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const [successMsg, setSuccessMsg] = useState("")

  const supabase = createClient()

  // 이메일 로그인 / 회원가입 처리
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg("")
    setSuccessMsg("")

    // Supabase 키가 미설정된 상태일 경우 안내
    const isConfigured =
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("demo.supabase.co")

    if (!isConfigured) {
      // 체험용 시뮬레이션
      setTimeout(() => {
        setLoading(false)
        router.push("/mypage")
      }, 700)
      return
    }

    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: name },
          },
        })
        if (error) throw error
        setSuccessMsg(
          "회원가입 확인 메일이 발송되었습니다! 메일함을 확인하여 인증을 완료해 주세요."
        )
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        router.push("/mypage")
      }
    } catch (err: unknown) {
      const error = err as { message?: string }
      setErrorMsg(error.message || "로그인 처리 중 오류가 발생했습니다.")
    } finally {
      setLoading(false)
    }
  }

  // 소셜 로그인 (카카오 / 구글)
  const handleSocialLogin = async (provider: "kakao" | "google") => {
    setLoading(true)
    setErrorMsg("")

    const isConfigured =
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("demo.supabase.co")

    if (!isConfigured) {
      // 체험용 안내 및 시뮬레이션
      setTimeout(() => {
        router.push("/mypage")
      }, 500)
      return
    }

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (error) throw error
    } catch (err: unknown) {
      const error = err as { message?: string }
      setErrorMsg(error.message || "소셜 로그인 연결에 실패했습니다.")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#05070d] text-[#f2f4f8] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* 은은한 배경 장식 */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-zinc-800/20 rounded-full blur-3xl pointer-events-none" />

      {/* 상단 홈으로 돌아가기 */}
      <div className="absolute top-6 left-6 z-10">
        <Link
          href="/"
          className="text-xs font-semibold text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5"
        >
          <span>←</span>
          <span>홈으로 돌아가기</span>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="text-center space-y-2">
          <Link
            href="/"
            className="text-2xl font-black text-white tracking-widest inline-block"
          >
            THE GRIM
          </Link>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            {mode === "login" ? "고객 / 수강생 전용 로그인" : "신규 회원가입"}
          </h2>
          <p className="text-xs text-zinc-400">
            {mode === "login"
              ? "상담 내역 확인, 골프 레슨 스케줄 및 전용 학습 자료를 열람하세요."
              : "간편 회원가입으로 맞춤형 피드백과 전용 자료실을 이용하세요."}
          </p>
        </div>

        <div className="mt-8 bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-6">
          {/* 로그인 / 회원가입 탭 전환 */}
          <div className="grid grid-cols-2 p-1 bg-zinc-950 rounded-xl border border-zinc-800/80 text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                setMode("login")
                setErrorMsg("")
                setSuccessMsg("")
              }}
              className={`py-2.5 rounded-lg transition-all ${
                mode === "login"
                  ? "bg-zinc-800 text-white shadow-md"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              로그인
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("signup")
                setErrorMsg("")
                setSuccessMsg("")
              }}
              className={`py-2.5 rounded-lg transition-all ${
                mode === "signup"
                  ? "bg-zinc-800 text-white shadow-md"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              회원가입
            </button>
          </div>

          {/* 소셜 원클릭 로그인 버튼들 */}
          <div className="space-y-2.5">
            {/* 카카오 로그인 */}
            <button
              type="button"
              onClick={() => handleSocialLogin("kakao")}
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-[#FEE500] hover:bg-[#FADA0A] text-[#191919] font-bold text-xs flex items-center justify-center gap-2 transition-transform active:scale-[0.99] shadow-sm min-h-[44px]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3C6.477 3 2 6.477 2 10.768c0 2.766 1.83 5.2 4.606 6.556l-1.17 4.318a.5.5 0 0 0 .72.552l5.056-3.342c.258.018.52.026.788.026 5.523 0 10-3.477 10-7.768C22 6.477 17.523 3 12 3z" />
              </svg>
              <span>카카오톡으로 3초 만에 시작하기</span>
            </button>

            {/* 구글 로그인 */}
            <button
              type="button"
              onClick={() => handleSocialLogin("google")}
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-750 border border-zinc-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-transform active:scale-[0.99] shadow-sm min-h-[44px]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.14z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>Google 계정으로 계속하기</span>
            </button>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-zinc-800 w-full" />
            <span className="bg-zinc-900 px-3 text-[11px] text-zinc-500 uppercase tracking-widest font-mono">
              또는 이메일로
            </span>
            <div className="border-t border-zinc-800 w-full" />
          </div>

          {/* 에러 및 성공 안내 메시지 */}
          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-950/60 border border-red-800/80 text-red-200 text-xs">
              ⚠️ {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/80 text-emerald-200 text-xs">
              ✓ {successMsg}
            </div>
          )}

          {/* 이메일 로그인 폼 */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-zinc-300">
                  성함 / 닉네임
                </label>
                <input
                  type="text"
                  required
                  placeholder="홍길동"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-zinc-500 transition-colors"
                />
              </div>
            )}

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-zinc-300">
                이메일 주소
              </label>
              <input
                type="email"
                required
                placeholder="example@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-zinc-500 transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-zinc-300">
                비밀번호
              </label>
              <input
                type="password"
                required
                placeholder="6자 이상 입력"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-zinc-500 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl bg-white text-zinc-950 font-extrabold text-xs hover:bg-zinc-200 transition-all shadow-md active:scale-[0.98] min-h-[44px] flex items-center justify-center gap-1.5"
            >
              {loading ? (
                <span>처리 중...</span>
              ) : (
                <span>
                  {mode === "login" ? "이메일로 로그인" : "회원가입 완료하기"}
                </span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
