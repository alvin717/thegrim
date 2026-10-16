"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

// 상담 접수 내역 인터페이스
export interface ConsultationItem {
  id: string
  name: string
  phone: string
  category: string
  budget?: string
  message: string
  status: "pending" | "in_progress" | "completed"
  createdAt: string
}

// 초기 기본 데모 샘플 데이터
const INITIAL_DATA: ConsultationItem[] = [
  {
    id: "req-1",
    name: "김민준 대표",
    phone: "010-8921-3341",
    category: "공간 디자인 & 시공",
    budget: "5,000만원 내외",
    message: "성수동 40평형 브랜드 쇼룸 겸 오피스 인테리어 기획 및 3D 시안 상담을 요청합니다. 다음 달 초 착공 희망합니다.",
    status: "pending",
    createdAt: "2026-10-16 19:40",
  },
  {
    id: "req-2",
    name: "박서연 님",
    phone: "010-4412-9082",
    category: "골프 코칭 & 레슨",
    budget: "10회 맞춤 코스",
    message: "구력 2년 차인데 고질적인 드라이버 슬라이스가 심합니다. 주말 1:1 집중 레슨 스케줄 조율 가능할까요?",
    status: "in_progress",
    createdAt: "2026-10-16 17:15",
  },
  {
    id: "req-3",
    name: "데이비드 리 (주재원)",
    phone: "010-2391-7711",
    category: "한국어 지도 & 교육",
    budget: "기업 지원 바우처",
    message: "외국계 IT 지사 임원입니다. 비즈니스 미팅 주재를 위한 고급 한국어 표현과 프레젠테이션 발음 교정을 원합니다.",
    status: "completed",
    createdAt: "2026-10-15 14:20",
  },
  {
    id: "req-4",
    name: "최정훈 팀장",
    phone: "010-5510-1289",
    category: "웹 & 앱 풀스택 개발",
    budget: "800만원 내외",
    message: "사내 예약 및 외주 발주 관리 웹 애플리케이션 제작 의뢰 건입니다. Next.js 기반으로 구축 희망합니다.",
    status: "pending",
    createdAt: "2026-10-15 11:05",
  },
]

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [pinInput, setPinInput] = useState("")
  const [pinError, setPinError] = useState(false)

  const [items, setItems] = useState<ConsultationItem[]>([])
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState<string>("")

  // 데이터 로드
  useEffect(() => {
    // 로컬 스토리지 확인
    const saved = localStorage.getItem("thegrim_consultations")
    if (saved) {
      try {
        setItems(JSON.parse(saved))
      } catch {
        setItems(INITIAL_DATA)
      }
    } else {
      setItems(INITIAL_DATA)
      localStorage.setItem("thegrim_consultations", JSON.stringify(INITIAL_DATA))
    }

    // 관리자 세션 확인
    const adminSession = sessionStorage.getItem("thegrim_admin_auth")
    if (adminSession === "true") {
      setIsAuthenticated(true)
    }
  }, [])

  // 비밀번호 인증 (기본 비밀번호: 1234)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (pinInput === "1234") {
      setIsAuthenticated(true)
      sessionStorage.setItem("thegrim_admin_auth", "true")
      setPinError(false)
    } else {
      setPinError(true)
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem("thegrim_admin_auth")
    setPinInput("")
  }

  // 상태 변경 (대기 -> 진행중 -> 완료)
  const updateStatus = (id: string, newStatus: "pending" | "in_progress" | "completed") => {
    const updated = items.map((item) =>
      item.id === id ? { ...item, status: newStatus } : item
    )
    setItems(updated)
    localStorage.setItem("thegrim_consultations", JSON.stringify(updated))
  }

  // 항목 삭제
  const deleteItem = (id: string) => {
    if (confirm("정말 이 상담 내역을 삭제하시겠습니까?")) {
      const updated = items.filter((item) => item.id !== id)
      setItems(updated)
      localStorage.setItem("thegrim_consultations", JSON.stringify(updated))
    }
  }

  // 엑셀(CSV) 파일 다운로드 기능
  const exportToCSV = () => {
    const headers = ["신청일시", "고객명", "연락처", "분야", "예산/일정", "상태", "문의내용"]
    const rows = items.map((i) => [
      i.createdAt,
      i.name,
      i.phone,
      i.category,
      i.budget || "미입력",
      i.status === "pending" ? "상담대기" : i.status === "in_progress" ? "상담진행중" : "상담완료",
      `"${i.message.replace(/"/g, '""')}"`,
    ])

    const csvContent =
      "\uFEFF" + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n")
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", `더그림_고객상담내역_${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // 필터링 적용
  const filteredItems = items.filter((item) => {
    const matchesCategory =
      filterCategory === "all" || item.category.includes(filterCategory)
    const matchesStatus =
      filterStatus === "all" || item.status === filterStatus
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone.includes(searchTerm) ||
      item.message.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesStatus && matchesSearch
  })

  // 통계 계산
  const countPending = items.filter((i) => i.status === "pending").length
  const countInProgress = items.filter((i) => i.status === "in_progress").length
  const countCompleted = items.filter((i) => i.status === "completed").length

  // ========================================================
  // 1. 관리자 비밀번호 입력 화면 (미인증 시)
  // ========================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#05070d] text-[#f2f4f8] flex flex-col justify-center items-center px-4">
        <div className="w-full max-w-sm bg-zinc-900/90 border border-zinc-800 rounded-3xl p-8 shadow-2xl text-center space-y-6">
          <div className="w-14 h-14 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-2xl flex items-center justify-center mx-auto text-2xl font-bold">
            🔒
          </div>

          <div className="space-y-1.5">
            <h1 className="text-xl font-extrabold text-white">THE GRIM 관리자 전용</h1>
            <p className="text-xs text-zinc-400">
              고객 개인정보 보호를 위해 관리자 비밀번호를 입력해 주세요.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="비밀번호 입력 (기본: 1234)"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-center tracking-widest text-sm focus:outline-none focus:border-zinc-500 transition-colors"
                autoFocus
              />
              {pinError && (
                <div className="text-xs text-red-400 mt-2 font-medium">
                  비밀번호가 일치하지 않습니다. (기본: 1234)
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-white text-zinc-950 font-extrabold text-xs hover:bg-zinc-200 transition-all shadow-md active:scale-98 min-h-[44px]"
            >
              관리자 모드 접속하기 →
            </button>
          </form>

          <div className="pt-2">
            <Link
              href="/"
              className="text-xs text-zinc-400 hover:text-white transition-colors"
            >
              홈페이지 메인으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // ========================================================
  // 2. 관리자 메인 대시보드 화면 (인증 완료 시)
  // ========================================================
  return (
    <div className="min-h-screen bg-[#05070d] text-[#f2f4f8] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* 상단 헤더 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs font-semibold text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <span>←</span>
              <span>사이트 바로가기</span>
            </Link>
            <span className="text-zinc-600">|</span>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-800/80">
              ● 관리자 접속 중
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={exportToCSV}
              className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-xs font-bold text-white border border-zinc-700 transition-all flex items-center gap-2 min-h-[40px] shadow-sm"
            >
              <span>📊 엑셀(CSV) 다운로드</span>
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl bg-zinc-950 hover:bg-zinc-900 text-xs text-zinc-400 hover:text-zinc-200 border border-zinc-850 transition-colors min-h-[40px]"
            >
              관리자 로그아웃
            </button>
          </div>
        </div>

        {/* 타이틀 및 핵심 요약 카드 */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              고객 상담 및 외주 의뢰 관리 대시보드
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              실시간으로 접수된 4대 분야 고객 문의를 확인하고 연락 및 처리 상태를 관리하세요.
            </p>
          </div>

          {/* 통계 요약 4구 카드 */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-1">
              <span className="text-xs text-zinc-400 font-medium">전체 누적 접수</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-white">
                {items.length} <span className="text-sm font-normal text-zinc-500">건</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-1">
              <span className="text-xs text-amber-300 font-medium">신규 상담 대기</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">
                {countPending} <span className="text-sm font-normal text-amber-300/70">건</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-blue-500/10 border border-blue-500/30 space-y-1">
              <span className="text-xs text-blue-300 font-medium">상담 진행 중</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-400">
                {countInProgress} <span className="text-sm font-normal text-blue-300/70">건</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-1">
              <span className="text-xs text-emerald-300 font-medium">상담 완료</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">
                {countCompleted} <span className="text-sm font-normal text-emerald-300/70">건</span>
              </div>
            </div>
          </div>
        </div>

        {/* 필터 및 검색 바 */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 bg-zinc-900/50 rounded-2xl border border-zinc-800">
          <div className="flex flex-wrap items-center gap-2">
            {/* 분야 필터 */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none"
            >
              <option value="all">전체 분야 보기</option>
              <option value="공간 디자인">공간 디자인 & 시공</option>
              <option value="골프 코칭">골프 코칭 & 레슨</option>
              <option value="한국어 지도">한국어 지도 & 교육</option>
              <option value="웹 & 앱">웹 & 앱 풀스택 개발</option>
            </select>

            {/* 상태 필터 */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none"
            >
              <option value="all">전체 상태 보기</option>
              <option value="pending">상담 대기</option>
              <option value="in_progress">상담 진행 중</option>
              <option value="completed">상담 완료</option>
            </select>
          </div>

          {/* 검색창 */}
          <div className="w-full sm:w-64">
            <input
              type="text"
              placeholder="고객명, 연락처, 내용 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
            />
          </div>
        </div>

        {/* 상담 목록 테이블 / 카드 */}
        <div className="space-y-4">
          <div className="text-xs text-zinc-400 font-mono">
            총 {filteredItems.length}건의 상담 내역이 표시됩니다.
          </div>

          <div className="space-y-3">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-zinc-750 transition-colors shadow-lg flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                {/* 좌측 고객 및 문의 핵심 정보 */}
                <div className="space-y-2.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    {/* 상태 뱃지 */}
                    {item.status === "pending" && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                        ● 상담 대기
                      </span>
                    )}
                    {item.status === "in_progress" && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/40">
                        ● 진행 중
                      </span>
                    )}
                    {item.status === "completed" && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        ✓ 완료됨
                      </span>
                    )}

                    {/* 카테고리 뱃지 */}
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-semibold bg-zinc-800 text-zinc-300">
                      {item.category}
                    </span>

                    {/* 등록 일시 */}
                    <span className="text-[11px] text-zinc-400 font-mono">
                      {item.createdAt}
                    </span>
                  </div>

                  {/* 고객명 및 전화번호 */}
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-base sm:text-lg font-bold text-white">
                      {item.name}
                    </span>
                    <a
                      href={`tel:${item.phone}`}
                      className="text-xs font-mono text-emerald-400 hover:text-emerald-300 underline underline-offset-4 flex items-center gap-1 font-semibold"
                    >
                      <span>📞</span>
                      <span>{item.phone} (전화걸기)</span>
                    </a>
                    {item.budget && (
                      <span className="text-xs text-zinc-400 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-850">
                        예산/일정: {item.budget}
                      </span>
                    )}
                  </div>

                  {/* 세부 문의 내용 */}
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed bg-zinc-950/60 p-3.5 rounded-xl border border-zinc-850">
                    {item.message}
                  </p>
                </div>

                {/* 우측 관리 조작 버튼군 */}
                <div className="flex flex-wrap lg:flex-col items-end gap-2 border-t lg:border-t-0 lg:border-l border-zinc-800 pt-4 lg:pt-0 lg:pl-6">
                  <div className="text-[11px] text-zinc-400 font-medium hidden lg:block">
                    상태 변경:
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => updateStatus(item.id, "pending")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        item.status === "pending"
                          ? "bg-amber-500 text-zinc-950 shadow-md"
                          : "bg-zinc-800/80 text-zinc-400 hover:text-white"
                      }`}
                    >
                      대기
                    </button>
                    <button
                      onClick={() => updateStatus(item.id, "in_progress")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        item.status === "in_progress"
                          ? "bg-blue-500 text-white shadow-md"
                          : "bg-zinc-800/80 text-zinc-400 hover:text-white"
                      }`}
                    >
                      진행중
                    </button>
                    <button
                      onClick={() => updateStatus(item.id, "completed")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        item.status === "completed"
                          ? "bg-emerald-500 text-white shadow-md"
                          : "bg-zinc-800/80 text-zinc-400 hover:text-white"
                      }`}
                    >
                      완료
                    </button>
                  </div>

                  <button
                    onClick={() => deleteItem(item.id)}
                    className="text-[11px] text-zinc-400 hover:text-red-400 transition-colors pt-2"
                  >
                    내역 삭제
                  </button>
                </div>
              </div>
            ))}

            {filteredItems.length === 0 && (
              <div className="p-12 text-center text-zinc-500 rounded-2xl bg-zinc-900/40 border border-zinc-800/60 space-y-2">
                <div className="text-2xl">📭</div>
                <div className="text-xs">해당 조건에 일치하는 상담 접수 내역이 없습니다.</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
