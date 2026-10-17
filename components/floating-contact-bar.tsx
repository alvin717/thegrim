"use client"

export default function FloatingContactBar() {
  const scrollToContact = () => {
    const contactEl = document.getElementById("contact")
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <aside aria-label="빠른 상담 및 전화 연결" className="fixed bottom-0 left-0 right-0 z-50 p-2.5 bg-white/95 backdrop-blur-xl border-t border-slate-200/90 sm:hidden shadow-2xl">
      <div className="flex items-center gap-2 max-w-md mx-auto">
        {/* 대표 직통 전화 바로 연결 버튼 */}
        <a
          href="tel:010-7533-9193"
          className="flex-1 py-3 px-2 rounded-xl bg-slate-900 text-white font-extrabold text-xs flex items-center justify-center gap-1 min-h-[44px] active:scale-[0.98] transition-transform shadow-sm"
          aria-label="대표 유선 전화 010-7533-9193 바로 걸기"
        >
          <span>📞</span>
          <span>전화 상담</span>
        </a>

        {/* 카카오톡 1:1 오픈채팅 바로 연결 */}
        <a
          href="https://open.kakao.com/o/gBFGomDi"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-3 px-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center gap-1 min-h-[44px] active:scale-[0.98] transition-transform shadow-sm"
          aria-label="카카오톡 1:1 오픈채팅 상담 연결"
        >
          <span>💬</span>
          <span>카톡 상담</span>
        </a>

        {/* 1:1 의뢰 및 레슨 신청 폼 이동 */}
        <button
          onClick={scrollToContact}
          className="flex-1 py-3 px-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-black text-xs flex items-center justify-center gap-1 min-h-[44px] active:scale-[0.98] transition-transform shadow-md"
          aria-label="1:1 상담 신청서 폼으로 이동"
        >
          <span>✍️</span>
          <span>상담 접수</span>
        </button>
      </div>
    </aside>
  )
}
