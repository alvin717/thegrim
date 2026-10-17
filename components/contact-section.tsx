"use client"

import { useState, useEffect } from "react"

export default function ContactSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("공간 디자인 & 시공")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [budget, setBudget] = useState("")
  const [message, setMessage] = useState("")
  const [agree, setAgree] = useState(true)
  const [submitted, setSubmitted] = useState(false)

  // 상단 서비스 섹션에서 버튼 클릭 시 해당 카테고리로 자동 선택되는 이벤트 수신
  useEffect(() => {
    const handleCategorySelect = (e: Event) => {
      const customEvent = e as CustomEvent<string>
      if (customEvent.detail) {
        setSelectedCategory(customEvent.detail)
      }
    }
    window.addEventListener("select-service-category", handleCategorySelect)
    return () => {
      window.removeEventListener("select-service-category", handleCategorySelect)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !phone || !message) {
      alert("성함과 연락처, 문의 내용을 모두 입력해 주세요.")
      return
    }
    if (!agree) {
      alert("개인정보 수집 및 상담 진행에 동의해 주세요.")
      return
    }

    // 관리자 대시보드 실시간 반영용 데이터 생성 및 저장
    const newEntry = {
      id: `req-${Date.now()}`,
      name,
      phone,
      category: selectedCategory,
      budget: budget || undefined,
      message,
      status: "pending" as const,
      createdAt: new Date().toISOString().slice(0, 16).replace("T", " "),
    }

    try {
      const existing = localStorage.getItem("thegrim_consultations")
      const list = existing ? JSON.parse(existing) : []
      list.unshift(newEntry)
      localStorage.setItem("thegrim_consultations", JSON.stringify(list))
    } catch {
      // 스토리지 예외 무시
    }

    setSubmitted(true)
  }

  const handleReset = () => {
    setName("")
    setPhone("")
    setBudget("")
    setMessage("")
    setSubmitted(false)
  }

  return (
    <section id="contact" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
        <span className="inline-block px-3.5 py-1 text-xs font-bold tracking-widest text-sky-800 uppercase bg-sky-100 border border-sky-300 rounded-full shadow-sm">
          Get in Touch
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          프로젝트 의뢰 & 1:1 상담 신청
        </h2>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
          공간 인테리어 시공부터 골프 레슨, 한국어 교육, 맞춤 웹 개발까지
          <br className="hidden sm:inline" />
          궁금하신 사항을 남겨주시면 24시간 이내에 직접 상세한 상담을 드립니다.
        </p>
      </div>

      <div className="relative rounded-3xl bg-white/85 border border-slate-200/90 p-6 sm:p-10 lg:p-12 shadow-2xl backdrop-blur-xl">
        {submitted ? (
          <div className="py-12 text-center space-y-6">
            <div className="w-16 h-16 bg-sky-600 text-white rounded-full flex items-center justify-center mx-auto text-2xl font-bold shadow-md">
              ✓
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-900">상담 신청이 정상 접수되었습니다!</h3>
              <p className="text-slate-700 text-sm max-w-md mx-auto leading-relaxed">
                남겨주신 연락처(<span className="text-sky-700 font-mono font-bold">{phone}</span>)로 요청하신{" "}
                <span className="text-slate-900 font-bold">[{selectedCategory}]</span> 관련 상담 내용을 검토한 후 빠르게 연락드리겠습니다.
              </p>
            </div>
            <button
              onClick={handleReset}
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all min-h-[44px] shadow-sm"
            >
              추가 문의 작성하기
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 1. 의뢰 분야 선택 칩 */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                1. 의뢰 / 상담 분야 선택 <span className="text-sky-600">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  "공간 디자인 & 시공",
                  "골프 코칭 & 레슨",
                  "한국어 지도 & 교육",
                  "웹 & 앱 풀스택 개발",
                ].map((category) => {
                  const isSelected = selectedCategory === category
                  return (
                    <button
                      type="button"
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`py-3 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all min-h-[44px] flex items-center justify-center text-center ${
                        isSelected
                          ? "bg-sky-600 text-white font-bold shadow-md ring-2 ring-sky-300"
                          : "bg-slate-50/90 text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
                      }`}
                    >
                      {category}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* 2. 기본 인적사항 입력 그리드 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-800">
                  성함 / 기업명 <span className="text-sky-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="예: 홍길동 (또는 회사명)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-colors shadow-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-800">
                  연락처 (휴대전화) <span className="text-sky-600">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="예: 010-1234-5678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-colors shadow-sm"
                />
              </div>
            </div>

            {/* 3. 희망 예산 또는 예상 일정 (선택사항) */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-800">
                예상 일정 또는 희망 예산대 (선택)
              </label>
              <input
                type="text"
                placeholder="예: 다음달 시공 희망 / 주말 레슨 희망 / 예산 500만원 내외 등"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-colors shadow-sm"
              />
            </div>

            {/* 4. 문의 세부 내용 */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-800">
                구체적인 상담 및 의뢰 내용 <span className="text-sky-600">*</span>
              </label>
              <textarea
                required
                rows={4}
                placeholder="의뢰하시고자 하는 프로젝트 내용, 현재 겪고 계신 문제점, 원하시는 목표 등을 자유롭게 적어주세요."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-colors leading-relaxed shadow-sm"
              />
            </div>

            {/* 개인정보 처리 동의 체크 */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="agree"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 bg-white text-sky-600 focus:ring-sky-500 cursor-pointer"
              />
              <label htmlFor="agree" className="text-xs text-slate-700 cursor-pointer select-none font-medium">
                상담 진행 및 연락을 위한 개인정보 수집 및 이용에 동의합니다.
              </label>
            </div>

            {/* 제출 버튼 */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-black text-sm sm:text-base transition-all shadow-xl active:scale-[0.99] min-h-[48px] flex items-center justify-center gap-2"
              >
                <span>상담 신청서 접수하기</span>
                <span>→</span>
              </button>
            </div>
          </form>
        )}

        {/* 대표 직통 채널 빠른 연결 바 */}
        <div className="mt-8 pt-6 border-t border-slate-200 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-700">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span><strong>더 그림 (THE GRIM) 대표/CEO 이승국</strong> 직통 소통 채널:</span>
            </div>
            <div className="text-slate-500 text-[11px]">
              📍 경기도 화성시 새비봉동로 37
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <a
              href="tel:010-7533-9193"
              className="px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 min-h-[44px] shadow-sm active:scale-98"
            >
              <span>📞 직통 전화 (010-7533-9193)</span>
            </a>

            <a
              href="https://open.kakao.com/o/gBFGomDi"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-900 font-extrabold text-xs transition-all flex items-center justify-center gap-2 min-h-[44px] shadow-sm active:scale-98"
            >
              <span>💬 카카오톡 1:1 오픈채팅</span>
            </a>

            <a
              href="https://blog.naver.com/ddasmee63"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 min-h-[44px] shadow-sm active:scale-98"
            >
              <span>📗 네이버 공식 블로그 방문</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
