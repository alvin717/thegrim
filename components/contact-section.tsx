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
        <span className="inline-block px-3 py-1 text-xs font-semibold tracking-widest text-zinc-300 uppercase bg-zinc-800/80 border border-zinc-700/60 rounded-full">
          Get in Touch
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          프로젝트 의뢰 & 1:1 상담 신청
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
          공간 인테리어 시공부터 골프 레슨, 한국어 교육, 맞춤 웹 개발까지
          <br className="hidden sm:inline" />
          궁금하신 사항을 남겨주시면 24시간 이내에 직접 상세한 상담을 드립니다.
        </p>
      </div>

      <div className="relative rounded-3xl bg-[#26372d]/95 border border-[#3d5345] p-6 sm:p-10 lg:p-12 shadow-2xl backdrop-blur-xl">
        {submitted ? (
          <div className="py-12 text-center space-y-6">
            <div className="w-16 h-16 bg-[#344e41] text-[#dad7cd] border border-[#588157] rounded-full flex items-center justify-center mx-auto text-2xl font-bold shadow-md">
              ✓
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-[#f4f2ee]">상담 신청이 정상 접수되었습니다!</h3>
              <p className="text-[#dad7cd] text-sm max-w-md mx-auto leading-relaxed">
                남겨주신 연락처(<span className="text-[#f4f2ee] font-mono font-bold">{phone}</span>)로 요청하신{" "}
                <span className="text-[#f4f2ee] font-semibold">[{selectedCategory}]</span> 관련 상담 내용을 검토한 후 빠르게 연락드리겠습니다.
              </p>
            </div>
            <button
              onClick={handleReset}
              className="px-6 py-3 rounded-xl bg-[#344e41] hover:bg-[#3d594b] text-[#dad7cd] text-xs font-bold transition-all min-h-[44px] border border-[#588157]"
            >
              추가 문의 작성하기
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 1. 의뢰 분야 선택 칩 */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-[#dad7cd] uppercase tracking-wider">
                1. 의뢰 / 상담 분야 선택 <span className="text-[#a3b18a]">*</span>
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
                          ? "bg-[#dad7cd] text-[#1c2720] font-bold shadow-md ring-2 ring-[#a3b18a]/40"
                          : "bg-[#1c2720]/80 text-[#a3b18a] hover:text-[#dad7cd] border border-[#384c3f]"
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
                <label className="block text-xs font-semibold text-[#dad7cd]">
                  성함 / 기업명 <span className="text-[#a3b18a]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="예: 홍길동 (또는 회사명)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#1c2720]/90 border border-[#384c3f] text-[#f4f2ee] placeholder-[#a3b18a]/60 text-sm focus:outline-none focus:border-[#a3b18a] focus:ring-1 focus:ring-[#a3b18a] transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-[#dad7cd]">
                  연락처 (휴대전화) <span className="text-[#a3b18a]">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="예: 010-1234-5678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#1c2720]/90 border border-[#384c3f] text-[#f4f2ee] placeholder-[#a3b18a]/60 text-sm focus:outline-none focus:border-[#a3b18a] focus:ring-1 focus:ring-[#a3b18a] transition-colors"
                />
              </div>
            </div>

            {/* 3. 희망 예산 또는 예상 일정 (선택사항) */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-[#dad7cd]">
                예상 일정 또는 희망 예산대 (선택)
              </label>
              <input
                type="text"
                placeholder="예: 다음달 시공 희망 / 주말 레슨 희망 / 예산 500만원 내외 등"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#1c2720]/90 border border-[#384c3f] text-[#f4f2ee] placeholder-[#a3b18a]/60 text-sm focus:outline-none focus:border-[#a3b18a] focus:ring-1 focus:ring-[#a3b18a] transition-colors"
              />
            </div>

            {/* 4. 문의 세부 내용 */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-[#dad7cd]">
                구체적인 상담 및 의뢰 내용 <span className="text-[#a3b18a]">*</span>
              </label>
              <textarea
                required
                rows={4}
                placeholder="의뢰하시고자 하는 프로젝트 내용, 현재 겪고 계신 문제점, 원하시는 목표 등을 자유롭게 적어주세요."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#1c2720]/90 border border-[#384c3f] text-[#f4f2ee] placeholder-[#a3b18a]/60 text-sm focus:outline-none focus:border-[#a3b18a] focus:ring-1 focus:ring-[#a3b18a] transition-colors leading-relaxed"
              />
            </div>

            {/* 개인정보 처리 동의 체크 */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="agree"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="w-4 h-4 rounded border-[#384c3f] bg-[#1c2720] text-[#588157] focus:ring-0 focus:ring-offset-0 cursor-pointer"
              />
              <label htmlFor="agree" className="text-xs text-[#dad7cd] cursor-pointer select-none">
                상담 진행 및 연락을 위한 개인정보 수집 및 이용에 동의합니다.
              </label>
            </div>

            {/* 제출 버튼 */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-[#dad7cd] text-[#1c2720] font-extrabold text-sm sm:text-base hover:bg-[#e4e1d7] transition-all shadow-xl active:scale-[0.99] min-h-[48px] flex items-center justify-center gap-2"
              >
                <span>상담 신청서 접수하기</span>
                <span>→</span>
              </button>
            </div>
          </form>
        )}

        {/* 다이렉트 긴급 문의 배너 */}
        <div className="mt-8 pt-6 border-t border-[#384c3f]/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#a3b18a]">
          <div>
            ⚡ 빠른 유선 상담이 필요하신가요? 직접 전화 연결도 가능합니다.
          </div>
          <a
            href="tel:010-0000-0000"
            className="text-[#f4f2ee] hover:text-[#dad7cd] font-bold underline underline-offset-4 flex items-center gap-1.5 min-h-[44px]"
          >
            <span>📞 전화 바로 걸기 (010-0000-0000)</span>
          </a>
        </div>
      </div>
    </section>
  )
}
