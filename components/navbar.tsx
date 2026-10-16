"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

export default function Navbar() {
  const [user, setUser] = useState<{ email?: string } | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const supabase = createClient()

    // 초기 세션 확인
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })

    // 로그인 상태 변화 실시간 감지
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )

    // 스크롤 감지하여 상단 바 배경색 변경
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)

    return () => {
      authListener.subscription.unsubscribe()
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    setUser(null)
    window.location.href = "/"
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#05070d]/85 backdrop-blur-md border-b border-zinc-800/80 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* 브랜드 로고 */}
        <Link
          href="/"
          className="text-lg sm:text-xl font-black text-white tracking-wider flex items-center gap-2 group"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-white group-hover:scale-125 transition-transform" />
          <span>THE GRIM</span>
        </Link>

        {/* 데스크톱 네비게이션 메뉴 */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-zinc-300">
          <Link
            href="/#services"
            className="hover:text-white transition-colors"
          >
            4대 전문 영역
          </Link>
          <Link
            href="/#proof"
            className="hover:text-white transition-colors"
          >
            실적 포트폴리오
          </Link>
          <Link
            href="/#contact"
            className="hover:text-white transition-colors"
          >
            1:1 상담 의뢰
          </Link>
        </nav>

        {/* 회원 로그인 / 마이페이지 상태 영역 */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2">
              <Link
                href="/mypage"
                className="px-3.5 py-1.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold border border-zinc-700 transition-all flex items-center gap-1.5 min-h-[38px]"
              >
                <span>👤</span>
                <span>마이페이지</span>
              </Link>
              <button
                onClick={handleLogout}
                className="text-xs text-zinc-400 hover:text-zinc-200 transition-colors px-2 py-1"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 rounded-full bg-white text-zinc-950 hover:bg-zinc-200 text-xs font-extrabold transition-all shadow-md active:scale-95 flex items-center gap-1.5 min-h-[38px]"
            >
              <span>고객 / 수강생 로그인</span>
              <span>→</span>
            </Link>
          )}

          {/* 모바일 햄버거 메뉴 토글 버튼 */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-white focus:outline-none"
            aria-label="메뉴 열기"
          >
            <span className="text-xl">{mobileMenuOpen ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {/* 모바일 드롭다운 메뉴 */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0d14] border-b border-zinc-800 px-6 py-4 space-y-3 text-sm">
          <Link
            href="/#services"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-zinc-300 hover:text-white"
          >
            4대 전문 영역
          </Link>
          <Link
            href="/#proof"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-zinc-300 hover:text-white"
          >
            실적 포트폴리오
          </Link>
          <Link
            href="/#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-zinc-300 hover:text-white"
          >
            1:1 상담 의뢰
          </Link>
          {user ? (
            <Link
              href="/mypage"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 font-bold text-amber-300"
            >
              마이페이지 바로가기
            </Link>
          ) : (
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 font-bold text-white"
            >
              로그인 / 회원가입
            </Link>
          )}
        </div>
      )}
    </header>
  )
}
