"use client"

export default function FloatingContactBar() {
  const scrollToContact = () => {
    const contactEl = document.getElementById("contact")
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <aside aria-label="빠른 상담 및 전화 연결" className="fixed bottom-0 left-0 right-0 z-50 p-3 bg-white/95 backdrop-blur-xl border-t border-slate-200/90 sm:hidden shadow-2xl">
      <div className="flex items-center gap-2 max-w-md mx-auto">
        {/* 전화 상담 바로 연결 버튼 */}
        <a
          href="tel:010-0000-0000"
          className="flex-1 py-3 px-3 rounded-xl bg-slate-100 border border-slate-300 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 min-h-[44px] active:scale-[0.98] transition-transform"
        >
          <span>📞</span>
          <span>전화 상담</span>
        </a>

        {/* 상담 신청 폼 바로가기 버튼 */}
        <button
          onClick={scrollToContact}
          className="flex-1 py-3 px-3 rounded-xl bg-sky-600 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 min-h-[44px] active:scale-[0.98] transition-transform shadow-md"
        >
          <span>✍️</span>
          <span>의뢰·레슨 신청</span>
        </button>
      </div>
    </aside>
  )
}
