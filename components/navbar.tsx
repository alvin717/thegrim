"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export default function Navbar() {
  const pathname = usePathname()
  const isHomePage = pathname === "/"

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

    // 스크롤 감지 (대문 영역을 지나 본문으로 진입했는지 감지)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 150)
    }
    // 초기 로드 시 스크롤 상태 반영
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })

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

  // 메인 대문 화면에서는 문을 열고 본문으로 스크롤했을 때만 표시하고,
  // 독립 멀티페이지(/interior, /golf 등)에서는 항상 표시
  const isVisible = !isHomePage || isScrolled

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-out transform ${
        isVisible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "-translate-y-full opacity-0 pointer-events-none"
      } ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md border-b border-slate-200/90 py-3 shadow-sm"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* 브랜드 로고 */}
        <Link
          href="/"
          className="text-lg sm:text-xl font-black text-slate-900 tracking-wider flex items-center gap-2 group"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-sky-600 group-hover:scale-125 transition-transform" />
          <span>THE GRIM</span>
        </Link>

        {/* 데스크톱 네비게이션 메뉴 (멀티페이지 라우팅) */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-bold text-slate-600">
          <Link
            href="/interior"
            className="hover:text-sky-600 transition-colors py-1 hover:border-b-2 hover:border-sky-600"
          >
            공간 인테리어
          </Link>
          <Link
            href="/golf"
            className="hover:text-sky-600 transition-colors py-1 hover:border-b-2 hover:border-sky-600"
          >
            골프 레슨
          </Link>
          <Link
            href="/korean"
            className="hover:text-sky-600 transition-colors py-1 hover:border-b-2 hover:border-sky-600"
          >
            한국어 교육
          </Link>
          <Link
            href="/dev"
            className="hover:text-sky-600 transition-colors py-1 hover:border-b-2 hover:border-sky-600"
          >
            웹·앱 개발
          </Link>
          <Link
            href="/#contact"
            className="text-slate-500 hover:text-sky-600 transition-colors pl-2 border-l border-slate-300"
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
                className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-300 transition-all flex items-center gap-1.5 min-h-[38px]"
              >
                <span>👤</span>
                <span>마이페이지</span>
              </Link>
              <button
                onClick={handleLogout}
                className="text-xs text-slate-500 hover:text-slate-800 transition-colors px-2 py-1 font-semibold"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 rounded-full bg-sky-600 text-white hover:bg-sky-700 text-xs font-extrabold transition-all shadow-md active:scale-95 flex items-center gap-1.5 min-h-[38px]"
            >
              <span>고객 / 수강생 로그인</span>
              <span>→</span>
            </Link>
          )}

          {/* 모바일 햄버거 메뉴 토글 버튼 */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:text-slate-900 focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="전체 메뉴 열기"
          >
            <span className="text-xl">{mobileMenuOpen ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {/* 모바일 드롭다운 메뉴 (멀티페이지 링크 탑재) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md border-b border-slate-200 px-6 py-5 space-y-3 text-sm shadow-xl">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            전문 영역 바로가기
          </div>
          <Link
            href="/interior"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between py-2 text-slate-800 hover:text-sky-600 border-b border-slate-100 font-medium"
          >
            <span>🏛️ 공간 인테리어 & 시공</span>
            <span className="text-xs text-sky-600 font-bold">1번 이미지 →</span>
          </Link>
          <Link
            href="/golf"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between py-2 text-slate-800 hover:text-sky-600 border-b border-slate-100 font-medium"
          >
            <span>⛳ 골프 코칭 & 1:1 레슨</span>
            <span className="text-xs text-sky-600 font-bold">2번 이미지 →</span>
          </Link>
          <Link
            href="/korean"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between py-2 text-slate-800 hover:text-sky-600 border-b border-slate-100 font-medium"
          >
            <span>🇰🇷 공인 한국어 지도 & 교육</span>
            <span className="text-xs text-sky-600 font-bold">3번 이미지 →</span>
          </Link>
          <Link
            href="/dev"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between py-2 text-slate-800 hover:text-sky-600 border-b border-slate-100 font-medium"
          >
            <span>💻 웹 & 앱 풀스택 개발</span>
            <span className="text-xs text-sky-600 font-bold">4번 이미지 →</span>
          </Link>

          <div className="pt-2">
            <Link
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-600 hover:text-sky-600 font-semibold"
            >
              📞 1:1 견적 및 상담 의뢰
            </Link>
          </div>

          <div className="pt-2 border-t border-slate-200">
            {user ? (
              <Link
                href="/mypage"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 font-bold text-slate-900"
              >
                👤 마이페이지 바로가기
              </Link>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 font-black text-sky-700"
              >
                🔑 로그인 / 회원가입
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
