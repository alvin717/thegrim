"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

export interface DevAppItem {
  id: string
  title: string
  badge: string
  category: "free" | "paid"
  target: string
  description: string
  features: string[]
  techStack: string
  repoUrl: string
  downloadUrl: string
  priceText?: string
  version?: string
}

// 깃허브 저장소(alvin717) 기반 기본 등록 앱 데이터
const INITIAL_DEV_APPS: DevAppItem[] = [
  {
    id: "voice-polisher",
    title: "Voice Polisher AI (음성 교정 & 노이즈 튜너)",
    badge: "AI 오디오 솔루션",
    category: "free",
    target: "녹음 음질 개선 및 음성 잡음 제거, 보이스 튜닝이 필요한 크리에이터·강사",
    description:
      "녹음된 음성의 배경 노이즈를 딥러닝 기반으로 실시간 정제하고 또렷한 음성 톤으로 다듬어주는 풀스택 웹 앱입니다.",
    features: [
      "실시간 웹 오디오 스트림 캡처 및 잡음 캔슬링 알고리즘 탑재",
      "클릭 한 번으로 원본 음성 대비 개선된 음질 즉시 청취 및 WAV/MP3 내보내기",
      "모바일 스마트폰 마이크와 PC 외장 마이크 자동 최적화 게인 제어",
    ],
    techStack: "Next.js · Web Audio API · AI Noise Reducer · Tailwind",
    repoUrl: "https://github.com/alvin717/voice-polisher",
    downloadUrl: "https://github.com/alvin717/voice-polisher/archive/refs/heads/main.zip",
    version: "v1.0 (최신)",
  },
  {
    id: "meal-curator",
    title: "Meal Curator 2026 (맞춤 영양 식단 큐레이터)",
    badge: "헬스케어 & 라이프",
    category: "free",
    target: "식단 관리, 다이어트 및 건강 관리가 필요한 개인 및 피트니스 회원",
    description:
      "사용자의 체형, 활동량, 건강 목표를 정밀 분석하여 매일 아침 맞춤형 식단과 영양 균형 레시피를 제안하는 스마트 웹 앱입니다.",
    features: [
      "사용자 맞춤형 칼로리·탄단지 비율 자동 계산 및 영양 대시보드",
      "선호 식재료 기반 원클릭 식단 플래너 및 장보기 체크리스트 연동",
      "반응형 모바일 UI로 스마트폰에서 식단 기록 및 체중 변화 그래프 추적",
    ],
    techStack: "TypeScript · Next.js · Chart.js · REST API",
    repoUrl: "https://github.com/alvin717/meal-curator-2026",
    downloadUrl: "https://github.com/alvin717/meal-curator-2026/archive/refs/heads/main.zip",
    version: "v1.2",
  },
  {
    id: "food-service",
    title: "Food Service POS & 오더 관리 시스템",
    badge: "외식업 매장 자동화",
    category: "free",
    target: "카페, 식당 등 매장 운영에서 주문 접수와 고객 관리를 효율화하고 싶은 자영업자",
    description:
      "복잡하고 비싼 기존 POS 대신 태블릿이나 PC 브라우저에서 바로 구동되는 가볍고 강력한 매장 운영 관리 솔루션입니다.",
    features: [
      "테이블별 실시간 주문 접수 현황 및 결제 상태 모니터링 대시보드",
      "일별/월별 매출 자동 정산 및 단골 고객 방문 데이터 통계 제공",
      "별도 장비 없이 스마트폰·아이패드 브라우저에서 즉시 작동",
    ],
    techStack: "Next.js · Supabase DB · Realtime Sync · Admin Dashboard",
    repoUrl: "https://github.com/alvin717/food-service",
    downloadUrl: "https://github.com/alvin717/food-service/archive/refs/heads/main.zip",
    version: "v1.1",
  },
  {
    id: "smart-card",
    title: "Smart Digital Business Card (스마트 모바일 명함)",
    badge: "비즈니스 & 브랜딩",
    category: "free",
    target: "영업직, 전문직, 프리랜서, 1인 기업 대표님을 위한 인터랙티브 명함",
    description:
      "종이 명함 대신 스마트폰 링크 하나로 전화, 카카오톡, 포트폴리오, SNS, 찾아오는 길까지 한 번에 전달하는 디지털 명함입니다.",
    features: [
      "원클릭 스마트폰 연락처(vCard) 자동 저장 및 다이렉트 전화·문자 연결",
      "카카오톡 공유 최적화 썸네일 및 QR코드 스캔 지원",
      "언제든 내 경력과 연락처 정보를 실시간으로 수정·반영 가능",
    ],
    techStack: "HTML5 · Tailwind CSS · vCard Generator · Vercel",
    repoUrl: "https://github.com/alvin717/card-shin",
    downloadUrl: "https://github.com/alvin717/card-shin/archive/refs/heads/main.zip",
    version: "v2.0",
  },
  {
    id: "custom-enterprise",
    title: "맞춤형 비즈니스 자동화 풀스택 시스템",
    badge: "프리미엄 커스텀",
    category: "paid",
    target: "우리 회사 업무에 딱 맞춘 전용 웹 프로그램 및 고객 관리 ERP가 필요한 기업",
    description:
      "대표님의 업무 프로세스에 맞춰 100% 맞춤 설계되는 상용 풀스택 솔루션으로, 배포부터 사후 유지보수 및 소스코드 양도까지 지원합니다.",
    features: [
      "기업 고유 업무 방식에 맞춘 커스텀 데이터베이스 및 관리자 화면 구축",
      "전자결제(PG), 알림톡, 이메일 자동 발송 등 외부 비즈니스 API 완전 연동",
      "소스코드 전체 소유권 양도 및 전담 엔지니어 1:1 유지보수 지원",
    ],
    techStack: "Full-Stack Custom · Next.js · Supabase · Cloud Infra",
    repoUrl: "https://github.com/alvin717/thegrim",
    downloadUrl: "#contact",
    priceText: "상담 후 맞춤 견적 (회원 우대)",
    version: "Custom Enterprise",
  },
]

export default function DevAppsMarketplace() {
  const [apps, setApps] = useState<DevAppItem[]>(INITIAL_DEV_APPS)
  const [filter, setFilter] = useState<"all" | "free" | "paid">("all")
  const [user, setUser] = useState<{ email?: string } | null>(null)

  // 로그인 유도 모달 상태
  const [loginPromptOpen, setLoginPromptOpen] = useState(false)
  const [selectedAppForLogin, setSelectedAppForLogin] = useState<DevAppItem | null>(null)

  // 유료 앱 문의 모달 상태
  const [paidInquiryOpen, setPaidInquiryOpen] = useState(false)
  const [selectedPaidApp, setSelectedPaidApp] = useState<DevAppItem | null>(null)

  // 대표님 전용 앱 등록/수정 모달 상태
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editingApp, setEditingApp] = useState<DevAppItem | null>(null)

  // 폼 입력 상태
  const [formTitle, setFormTitle] = useState("")
  const [formBadge, setFormBadge] = useState("")
  const [formCategory, setFormCategory] = useState<"free" | "paid">("free")
  const [formTarget, setFormTarget] = useState("")
  const [formDesc, setFormDesc] = useState("")
  const [formFeatures, setFormFeatures] = useState("")
  const [formTech, setFormTech] = useState("")
  const [formRepo, setFormRepo] = useState("")
  const [formDownload, setFormDownload] = useState("")
  const [formPrice, setFormPrice] = useState("")

  // 로그인 상태 실시간 감지
  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    // LocalStorage에서 커스텀 등록 앱 불러오기
    try {
      const saved = localStorage.getItem("thegrim_dev_apps_v1")
      if (saved) {
        setApps(JSON.parse(saved))
      }
    } catch (e) {
      console.warn("앱 목록 로컬 불러오기 실패", e)
    }

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  // 다운로드 클릭 처리
  const handleDownloadClick = (app: DevAppItem) => {
    // 1. 유료 앱인 경우 -> 구매 및 상담 모달 오픈
    if (app.category === "paid") {
      setSelectedPaidApp(app)
      setPaidInquiryOpen(true)
      return
    }

    // 2. 비회원인 경우 -> 로그인 유도 모달 오픈
    if (!user) {
      setSelectedAppForLogin(app)
      setLoginPromptOpen(true)
      return
    }

    // 3. 회원인 경우 -> 즉시 다운로드 실행
    if (app.downloadUrl && app.downloadUrl.startsWith("http")) {
      const link = document.createElement("a")
      link.href = app.downloadUrl
      link.target = "_blank"
      link.rel = "noopener noreferrer"
      link.setAttribute("download", `${app.id}.zip`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } else {
      window.open(app.repoUrl, "_blank", "noopener,noreferrer")
    }
  }

  // 앱 등록/수정 모달 열기
  const openEditModal = (appToEdit?: DevAppItem) => {
    if (appToEdit) {
      setEditingApp(appToEdit)
      setFormTitle(appToEdit.title)
      setFormBadge(appToEdit.badge)
      setFormCategory(appToEdit.category)
      setFormTarget(appToEdit.target)
      setFormDesc(appToEdit.description)
      setFormFeatures(appToEdit.features.join("\n"))
      setFormTech(appToEdit.techStack)
      setFormRepo(appToEdit.repoUrl)
      setFormDownload(appToEdit.downloadUrl)
      setFormPrice(appToEdit.priceText || "")
    } else {
      setEditingApp(null)
      setFormTitle("")
      setFormBadge("신규 솔루션")
      setFormCategory("free")
      setFormTarget("앱의 주요 사용자 대상")
      setFormDesc("")
      setFormFeatures("핵심 기능 1\n핵심 기능 2\n핵심 기능 3")
      setFormTech("Next.js · TypeScript · Supabase")
      setFormRepo("https://github.com/alvin717/...")
      setFormDownload("https://github.com/alvin717/.../archive/refs/heads/main.zip")
      setFormPrice("")
    }
    setEditModalOpen(true)
  }

  // 앱 저장
  const handleSaveApp = () => {
    if (!formTitle.trim()) {
      alert("앱 이름을 입력해 주세요.")
      return
    }

    const featureList = formFeatures
      .split("\n")
      .map((s) => s.trim())
      .filter((s) => s.length > 0)

    const updatedItem: DevAppItem = {
      id: editingApp ? editingApp.id : `app-${Date.now()}`,
      title: formTitle.trim(),
      badge: formBadge.trim() || "웹 솔루션",
      category: formCategory,
      target: formTarget.trim() || "모든 비즈니스 고객",
      description: formDesc.trim() || "편리하고 강력한 소프트웨어 앱입니다.",
      features: featureList.length > 0 ? featureList : ["스마트 반응형 UI 탑재", "원클릭 배포 연동"],
      techStack: formTech.trim() || "Next.js · React",
      repoUrl: formRepo.trim() || "https://github.com/alvin717",
      downloadUrl:
        formDownload.trim() ||
        (formRepo.trim() ? `${formRepo.trim()}/archive/refs/heads/main.zip` : "#"),
      priceText: formCategory === "paid" ? formPrice.trim() || "상담 후 결정" : undefined,
      version: editingApp?.version || "v1.0",
    }

    let nextApps: DevAppItem[]
    if (editingApp) {
      nextApps = apps.map((a) => (a.id === editingApp.id ? updatedItem : a))
    } else {
      nextApps = [updatedItem, ...apps]
    }

    setApps(nextApps)
    try {
      localStorage.setItem("thegrim_dev_apps_v1", JSON.stringify(nextApps))
    } catch (e) {
      console.warn("저장 실패", e)
    }

    alert("✨ 앱 정보가 성공적으로 저장되었습니다!")
    setEditModalOpen(false)
  }

  // 기본 목록으로 복원
  const handleResetApps = () => {
    if (confirm("등록된 앱 목록을 기본 제공 상태로 되돌리시겠습니까?")) {
      setApps(INITIAL_DEV_APPS)
      try {
        localStorage.removeItem("thegrim_dev_apps_v1")
      } catch {}
      setEditModalOpen(false)
      alert("기본 앱 목록으로 복원되었습니다.")
    }
  }

  // 필터링된 앱 목록
  const filteredApps = apps.filter((app) => {
    if (filter === "free") return app.category === "free"
    if (filter === "paid") return app.category === "paid"
    return true
  })

  return (
    <section id="solutions" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200">
      {/* 섹션 타이틀 헤더 */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100 text-sky-800 text-xs font-bold border border-sky-200">
          <span>🚀 THE GRIM SOFTWARE STORE</span>
          <span>·</span>
          <span>회원 전용 소프트웨어 다운로드 센터</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          직접 개발·공개한 주요 앱 & 솔루션
        </h2>
        <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed">
          더 그림(THE GRIM)이 실제 깃허브(GitHub)에 구축하고 검증한 실전 앱들입니다.
          <br className="hidden sm:inline" />
          <strong className="text-sky-700 font-bold">회원 가입 고객</strong>에 한해 무료 앱의 전체 소스코드와 실행 패키지를 자유롭게 다운로드하실 수 있습니다.
        </p>

        {/* 상단 회원 상태 표시줄 & 대표님 전용 등록 버튼 */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          {user ? (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>회원 인증 완료 ({user.email}) - 모든 무료 앱 다운로드 가능 🟢</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold shadow-sm">
              <span>🔒 비회원 상태 - 다운로드를 위해 무료 간편 로그인이 필요합니다.</span>
              <Link href="/login" className="text-sky-600 underline hover:text-sky-800 ml-1">
                로그인하기 →
              </Link>
            </div>
          )}

          {/* 대표님 전용 신규 앱 등록 버튼 */}
          <button
            type="button"
            onClick={() => openEditModal()}
            className="px-3.5 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 active:scale-95 min-h-[36px]"
          >
            <span>➕ 내 앱 등록·수정</span>
          </button>
        </div>

        {/* 카테고리 필터 탭 */}
        <div className="flex items-center justify-center gap-2 pt-4">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all min-h-[40px] ${
              filter === "all"
                ? "bg-slate-900 text-white shadow-md"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            전체 앱 보기 ({apps.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter("free")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all min-h-[40px] flex items-center gap-1.5 ${
              filter === "free"
                ? "bg-emerald-600 text-white shadow-md"
                : "bg-white text-slate-600 hover:bg-emerald-50 border border-slate-200"
            }`}
          >
            <span>🟢 회원 무료 앱</span>
            <span>({apps.filter((a) => a.category === "free").length})</span>
          </button>
          <button
            type="button"
            onClick={() => setFilter("paid")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all min-h-[40px] flex items-center gap-1.5 ${
              filter === "paid"
                ? "bg-purple-600 text-white shadow-md"
                : "bg-white text-slate-600 hover:bg-purple-50 border border-slate-200"
            }`}
          >
            <span>💎 프리미엄·상용 앱</span>
            <span>({apps.filter((a) => a.category === "paid").length})</span>
          </button>
        </div>
      </div>

      {/* 앱 카드 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredApps.map((app) => (
          <div
            key={app.id}
            className="rounded-3xl bg-white/90 border border-slate-200 hover:border-sky-400 transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between space-y-6 group hover:-translate-y-1 shadow-lg backdrop-blur-md relative"
          >
            <div className="space-y-4">
              {/* 상단 뱃지 및 카테고리 태그 */}
              <div className="flex items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-sky-100 text-sky-800 border border-sky-200 truncate">
                  {app.badge}
                </span>

                {app.category === "free" ? (
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1 shrink-0">
                    <span>🟢</span>
                    <span>회원 무료</span>
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-purple-100 text-purple-800 border border-purple-300 flex items-center gap-1 shrink-0">
                    <span>💎</span>
                    <span>프리미엄 상용</span>
                  </span>
                )}
              </div>

              {/* 앱 제목 및 추천 대상 */}
              <div>
                <h3 className="text-xl font-black text-slate-900 group-hover:text-sky-700 transition-colors flex items-center justify-between">
                  <span>{app.title}</span>
                </h3>
                <div className="text-xs text-slate-600 mt-2 leading-relaxed font-medium">
                  🎯 <strong className="text-slate-800">추천 대상:</strong> {app.target}
                </div>
              </div>

              {/* 앱 상세 소개 */}
              <p className="text-xs text-slate-600 leading-relaxed font-normal bg-slate-50 p-3 rounded-xl border border-slate-100">
                {app.description}
              </p>

              {/* 핵심 기능 목록 */}
              <div className="space-y-2 pt-1">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  핵심 탑재 기술 & 기능
                </div>
                <ul className="space-y-2">
                  {app.features.map((feat, fIdx) => (
                    <li key={fIdx} className="text-xs text-slate-700 font-medium flex items-start gap-2">
                      <span className="text-sky-600 font-bold shrink-0">✓</span>
                      <span className="leading-snug">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 카드 하단 기술 스택 및 다운로드 액션 바 */}
            <div className="space-y-3 pt-3 border-t border-slate-200">
              <div className="text-[11px] text-sky-800 font-bold bg-sky-50 px-3 py-2 rounded-xl border border-sky-100 flex items-center justify-between">
                <span className="truncate">⚙️ {app.techStack}</span>
                {app.version && (
                  <span className="text-[10px] text-slate-500 font-semibold shrink-0 ml-1">
                    {app.version}
                  </span>
                )}
              </div>

              {/* 다운로드 버튼 영역 (회원/비회원 구분) */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => handleDownloadClick(app)}
                  className={`w-full py-3 px-4 rounded-xl font-extrabold text-xs transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 min-h-[44px] ${
                    app.category === "free"
                      ? user
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                        : "bg-slate-900 hover:bg-slate-800 text-white"
                      : "bg-purple-600 hover:bg-purple-700 text-white"
                  }`}
                >
                  {app.category === "free" ? (
                    user ? (
                      <>
                        <span>💾</span>
                        <span>소스코드 & 패키지 무료 다운로드 (ZIP)</span>
                      </>
                    ) : (
                      <>
                        <span>🔒</span>
                        <span>회원 전용 무료 다운로드 (로그인 필요)</span>
                      </>
                    )
                  ) : (
                    <>
                      <span>💳</span>
                      <span>{app.priceText ? `${app.priceText} · 구매 문의` : "구매 & 라이선스 문의"}</span>
                    </>
                  )}
                </button>

                {/* 깃허브 저장소 및 수정 버튼 */}
                <div className="flex items-center justify-between text-[11px] pt-1 px-1">
                  {app.repoUrl && app.repoUrl.startsWith("http") ? (
                    <a
                      href={app.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-500 hover:text-sky-600 font-semibold flex items-center gap-1 transition-colors"
                    >
                      <span>📂 GitHub 저장소 코드 보기</span>
                      <span>↗</span>
                    </a>
                  ) : (
                    <span className="text-slate-400">비공개 전용 저장소</span>
                  )}

                  <button
                    type="button"
                    onClick={() => openEditModal(app)}
                    className="text-slate-400 hover:text-slate-700 font-semibold underline transition-colors"
                  >
                    내용 수정
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================================================================= */}
      {/* 1. 비회원 로그인 유도 모달 */}
      {/* ================================================================= */}
      {loginPromptOpen && selectedAppForLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5 text-center">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 text-2xl flex items-center justify-center mx-auto shadow-inner">
              🔒
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-black text-slate-900">
                회원 전용 다운로드 안내
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                <strong>[{selectedAppForLogin.title}]</strong> 소스코드 및 설치 패키지는
                <br />
                <strong className="text-sky-700">더 그림(THE GRIM) 회원 전용 혜택</strong>으로 무료 제공됩니다.
              </p>
              <p className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                카카오/구글 3초 간편 로그인을 완료하시면
                <br />
                즉시 모든 무료 앱의 원본 소스를 다운로드하실 수 있습니다.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setLoginPromptOpen(false)}
                className="flex-1 py-3 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-all min-h-[44px]"
              >
                닫기
              </button>
              <Link
                href="/login"
                className="flex-1 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-1 min-h-[44px]"
              >
                <span>3초 간편 로그인</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* 2. 유료 상용 앱 구매 및 라이선스 문의 모달 */}
      {/* ================================================================= */}
      {paidInquiryOpen && selectedPaidApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-purple-100 text-purple-800 text-[11px] font-bold">
                  💎 프리미엄 상용 솔루션
                </span>
                <span className="text-sm font-black text-slate-900">
                  {selectedPaidApp.title}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setPaidInquiryOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700 leading-relaxed font-medium">
              <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 space-y-1">
                <div className="font-bold text-purple-900">제공 라이선스 및 패키지 내역</div>
                <p className="text-[11px] text-purple-800">
                  • 전체 원본 소스코드 양도 & 상업적 이용 허가
                  <br />
                  • 클라우드 서버(Vercel, Supabase) 설치 및 도메인 연결 무상 지원
                  <br />
                  • 대표님 및 실무자 전용 1:1 시스템 운영 가이드 제공
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <span className="font-bold text-slate-700">공식 가격 정책:</span>
                <span className="text-sm font-black text-purple-700">
                  {selectedPaidApp.priceText || "협의 견적"}
                </span>
              </div>

              <p className="text-[11px] text-slate-500">
                구매 전 데모 테스트 또는 세부 커스텀 요구사항이 있으시면 아래 상담 의뢰 폼이나 전화로 즉시 안내받으실 수 있습니다.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="tel:010-0000-0000"
                className="flex-1 py-3 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-all text-center min-h-[44px] flex items-center justify-center gap-1"
              >
                <span>📞 전화 상담</span>
              </a>
              <a
                href="#contact"
                onClick={() => setPaidInquiryOpen(false)}
                className="flex-1 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md transition-all text-center min-h-[44px] flex items-center justify-center gap-1"
              >
                <span>✍️ 1:1 견적·구매 신청</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* 3. 대표님 전용 앱 등록 / 수정 모달 */}
      {/* ================================================================= */}
      {editModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="text-sm font-black text-slate-900 flex items-center gap-2">
                <span>💻</span>
                <span>{editingApp ? "앱 정보 수정" : "새로운 앱 등록"}</span>
              </div>
              <button
                type="button"
                onClick={() => setEditModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">앱 이름</label>
                <input
                  type="text"
                  placeholder="예: Voice Polisher AI"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">카테고리 뱃지</label>
                  <input
                    type="text"
                    placeholder="예: AI 오디오 솔루션"
                    value={formBadge}
                    onChange={(e) => setFormBadge(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">무료 / 유료 선택</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as "free" | "paid")}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none font-bold"
                  >
                    <option value="free">🟢 회원 무료 앱</option>
                    <option value="paid">💎 프리미엄 유료 앱</option>
                  </select>
                </div>
              </div>

              {formCategory === "paid" && (
                <div>
                  <label className="block font-bold text-purple-800 mb-1">가격 표시 문구</label>
                  <input
                    type="text"
                    placeholder="예: 33,000원 또는 상담 후 견적"
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-purple-300 bg-purple-50/30 focus:ring-2 focus:ring-purple-500 focus:outline-none font-bold text-purple-900"
                  />
                </div>
              )}

              <div>
                <label className="block font-bold text-slate-700 mb-1">추천 대상</label>
                <input
                  type="text"
                  placeholder="예: 녹음 음질 개선이 필요한 크리에이터 및 강사"
                  value={formTarget}
                  onChange={(e) => setFormTarget(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">앱 설명</label>
                <textarea
                  rows={2}
                  placeholder="앱에 대한 간단한 소개를 입력하세요."
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  핵심 기능 목록 (줄바꿈으로 구분)
                </label>
                <textarea
                  rows={3}
                  placeholder="기능 1&#10;기능 2&#10;기능 3"
                  value={formFeatures}
                  onChange={(e) => setFormFeatures(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">핵심 기술 스택</label>
                <input
                  type="text"
                  placeholder="예: Next.js · Web Audio API · Tailwind"
                  value={formTech}
                  onChange={(e) => setFormTech(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">GitHub 저장소 링크</label>
                  <input
                    type="url"
                    placeholder="https://github.com/alvin717/..."
                    value={formRepo}
                    onChange={(e) => setFormRepo(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">다운로드 파일 링크 (ZIP)</label>
                  <input
                    type="url"
                    placeholder="https://github.com/alvin717/.../archive/refs/heads/main.zip"
                    value={formDownload}
                    onChange={(e) => setFormDownload(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={handleResetApps}
                className="text-xs font-bold text-slate-400 hover:text-red-600 transition-colors"
              >
                기본 목록 복원
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100"
                >
                  취소
                </button>
                <button
                  type="button"
                  onClick={handleSaveApp}
                  className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md"
                >
                  저장 & 반영
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
