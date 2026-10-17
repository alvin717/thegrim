"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export default function MyPage() {
  const router = useRouter()
  const [user, setUser] = useState<{ email?: string; user_metadata?: { full_name?: string } } | null>(null)
  const [activeTab, setActiveTab] = useState<"consult" | "golf" | "korean">("consult")

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUser(data.user)
      } else {
        // 미로그인 시 기본 게스트 사용자 목업 표시
        setUser({
          email: "guest@thegrim.kr",
          user_metadata: { full_name: "홍길동 고객님" },
        })
      }
    })
  }, [])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <div
      className="min-h-screen bg-slate-50 text-slate-800 py-12 px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('/images/bg/bg-korean.png')" }}
    >
      <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] pointer-events-none" />
      <div className="max-w-5xl mx-auto space-y-8 relative z-10">
        {/* 상단 네비게이션 */}
        <div className="flex items-center justify-between pb-6 border-b border-zinc-800">
          <Link
            href="/"
            className="text-xs font-semibold text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <span>←</span>
            <span>홈으로 이동</span>
          </Link>
          <button
            onClick={handleLogout}
            className="px-3.5 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-xs text-zinc-300 border border-zinc-800 transition-colors"
          >
            로그아웃
          </button>
        </div>

        {/* 고객 환영 배너 */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-zinc-900 to-zinc-950 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
              Client Portal
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              안녕하세요, {user?.user_metadata?.full_name || "회원"}님!
            </h1>
            <p className="text-xs text-zinc-400 font-mono">
              계정: {user?.email}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/#contact"
              className="px-5 py-2.5 rounded-xl bg-white text-zinc-950 font-bold text-xs hover:bg-zinc-200 transition-all shadow-md min-h-[40px] flex items-center justify-center"
            >
              새로운 상담/의뢰 신청하기 →
            </Link>
          </div>
        </div>

        {/* 마이페이지 카테고리 탭 */}
        <div className="flex gap-2 p-1.5 bg-zinc-950 rounded-2xl border border-zinc-800/80 max-w-md">
          <button
            onClick={() => setActiveTab("consult")}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "consult"
                ? "bg-zinc-850 text-white shadow-md border border-zinc-700/60"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            내 의뢰 / 상담 현황
          </button>
          <button
            onClick={() => setActiveTab("golf")}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "golf"
                ? "bg-zinc-850 text-white shadow-md border border-zinc-700/60"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            골프 레슨 피드백
          </button>
          <button
            onClick={() => setActiveTab("korean")}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "korean"
                ? "bg-zinc-850 text-white shadow-md border border-zinc-700/60"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            한국어 학습 자료
          </button>
        </div>

        {/* 1. 상담 및 의뢰 접수 내역 */}
        {activeTab === "consult" && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-wider">
              접수된 프로젝트 및 상담 내역
            </h2>

            <div className="space-y-3">
              <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      상담 검토 중
                    </span>
                    <span className="text-xs text-zinc-400 font-mono">
                      2026.10.16 접수
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white">
                    성수동 오피스 상업 인테리어 기획 및 견적 의뢰
                  </h3>
                  <p className="text-xs text-zinc-400">
                    요청 분야: 공간 디자인 & 시공 · 담당 디렉터 배정 완료
                  </p>
                </div>
                <div className="text-xs text-zinc-300 bg-zinc-950 px-4 py-3 rounded-xl border border-zinc-850 max-w-xs">
                  💬 24시간 이내에 담당자가 직접 유선 또는 메일로 상세 견적서를 안내해 드립니다.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. 골프 레슨 전용 피드백 */}
        {activeTab === "golf" && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-wider">
              1:1 맞춤 스윙 분석 및 과제 노트
            </h2>

            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white">
                  3회차: 드라이버 인앤아웃 궤도 교정 및 하체 턴 리듬
                </h3>
                <span className="text-xs text-zinc-400 font-mono">최근 업데이트</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                백스윙 탑에서 헤드가 먼저 덮여 들어오는 아웃인 궤도를 교정하기 위해, 오른쪽 팔꿈치가 몸통에 붙어 들어오는 다운스윙 궤적을 중점 연습했습니다.
              </p>
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-850 text-xs text-emerald-300 font-medium">
                🎯 이번 주 미션: 하루 50회 하체 선행 릴리즈 빈스윙 루틴 수행하기
              </div>
            </div>
          </div>
        )}

        {/* 3. 한국어 학습 전용 자료 */}
        {activeTab === "korean" && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-wider">
              맞춤형 한국어 강의 교재 및 발음 녹음본
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2">
                <div className="text-xs text-zinc-500 font-mono">Lesson 01 PDF</div>
                <h3 className="text-sm font-bold text-white">
                  비즈니스 한국어: 미팅 진행 및 정중한 거절 표현
                </h3>
                <button className="text-xs text-zinc-300 hover:text-white underline underline-offset-4 pt-1">
                  교재 다운로드 (PDF)
                </button>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2">
                <div className="text-xs text-zinc-500 font-mono">Audio Clip MP3</div>
                <h3 className="text-sm font-bold text-white">
                  원어민 억양 트레이닝 쉐도잉 음원
                </h3>
                <button className="text-xs text-zinc-300 hover:text-white underline underline-offset-4 pt-1">
                  음원 재생하기 (MP3)
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
