"use client"

import { useState } from "react"

export default function CeoProfileCard() {
  const [copied, setCopied] = useState(false)

  const handleCopyContact = () => {
    const contactText = `[더 그림 (THE GRIM)]
대표/CEO: 이승국
연락처: 010-7533-9193
이메일: ddasmee63@gmail.com
블로그: https://blog.naver.com/ddasmee63
카카오톡: https://open.kakao.com/o/gBFGomDi
주소: 경기도 화성시 새비봉동로 37`

    if (navigator.clipboard) {
      navigator.clipboard.writeText(contactText).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2500)
      })
    } else {
      alert(contactText)
    }
  }

  return (
    <section id="about-ceo" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* 명품 CEO 프로필 프레임 카드 */}
      <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-700/80 p-7 sm:p-12 shadow-2xl overflow-hidden text-white">
        {/* 은은한 배경 글로우 라이트 효과 */}
        <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-sky-500/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-8">
          {/* 상단 뱃지 & 브랜드 헤더 */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-sky-400 animate-pulse" />
              <span className="text-xs font-black tracking-widest uppercase text-sky-400">
                THE GRIM EXECUTIVE PROFILE
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-xs font-semibold text-slate-400">공식 대표 소개</span>
            </div>

            <button
              type="button"
              onClick={handleCopyContact}
              className="self-start sm:self-auto px-4 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all border border-slate-700 flex items-center gap-1.5 active:scale-95 shadow-sm min-h-[40px]"
            >
              <span>{copied ? "✅ 복사 완료!" : "📋 대표 연락처 명함 복사"}</span>
            </button>
          </div>

          {/* 대표 소개 본체 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* 좌측: 이름 및 핵심 메시지 */}
            <div className="lg:col-span-7 space-y-5">
              <div className="space-y-1">
                <div className="inline-block px-3 py-1 rounded-md bg-sky-950/80 border border-sky-500/40 text-sky-300 font-extrabold text-xs">
                  더 그림 (THE GRIM) 대표 · CEO
                </div>
                <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-baseline gap-3 pt-2">
                  <span>이승국</span>
                  <span className="text-sm font-semibold text-slate-400 font-sans tracking-normal">
                    Lee Seung-guk
                  </span>
                </h3>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
                &ldquo;공간에 품격을 더하고, 골프에 자신감을 불어넣으며,
                <br className="hidden sm:inline" />
                한국어 교육과 최신 디지털 기술로 사람과 비즈니스를 연결합니다.&rdquo;
              </p>

              {/* 4대 전문 분야 역량 배지 */}
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-[11px] font-bold text-slate-200">
                  🏛️ 공간 디자인 & 직영 시공 디렉팅
                </span>
                <span className="px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-[11px] font-bold text-slate-200">
                  ⛳ 골프 세미프로 1:1 테크니컬 레슨
                </span>
                <span className="px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-[11px] font-bold text-slate-200">
                  🇰🇷 공인 한국어 교육 & 비즈니스 코칭
                </span>
                <span className="px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-[11px] font-bold text-slate-200">
                  💻 웹·앱 풀스택 개발 & 시스템 자동화
                </span>
              </div>
            </div>

            {/* 우측: 핵심 스튜디오 안내 배너 */}
            <div className="lg:col-span-5 rounded-2xl bg-slate-950/70 border border-slate-800 p-6 space-y-4 shadow-inner">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <span>📍</span>
                <span>오프라인 본사 및 스튜디오</span>
              </div>
              <div>
                <div className="text-base font-extrabold text-white">
                  경기도 화성시 새비봉동로 37
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  (방문 상담 및 필드/스튜디오 레슨은 100% 사전 예약제로 운영됩니다.)
                </div>
              </div>
              <div className="pt-2 flex items-center gap-2">
                <a
                  href="https://map.naver.com/v5/search/%EA%B2%BD%EA%B8%B0%EB%8F%84%20%ED%99%94%EC%84%B1%EC%8B%9C%20%EC%83%88%EB%B9%84%EB%B4%89%EB%8F%99%EB%A1%9C%2037"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-400 hover:text-sky-300 text-xs font-bold transition-all border border-slate-700 flex items-center gap-1.5"
                >
                  <span>🗺️ 네이버 지도에서 위치 보기</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          </div>

          {/* 하단 4대 공식 소통 직통 채널 그리드 */}
          <div className="pt-4 border-t border-slate-800">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
              공식 직통 연락 및 소통 채널
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* 1. 직통 유선 전화 */}
              <a
                href="tel:010-7533-9193"
                className="p-4 rounded-2xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/80 hover:border-sky-500/60 transition-all group flex flex-col justify-between min-h-[92px]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xl">📞</span>
                  <span className="text-[10px] font-extrabold text-sky-400 group-hover:translate-x-0.5 transition-transform">
                    통화 연결 →
                  </span>
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">CEO 직통 유선 번호</div>
                  <div className="text-sm font-black text-white font-mono mt-0.5">
                    010-7533-9193
                  </div>
                </div>
              </a>

              {/* 2. 카카오톡 1:1 오픈채팅 */}
              <a
                href="https://open.kakao.com/o/gBFGomDi"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 hover:border-amber-400/60 transition-all group flex flex-col justify-between min-h-[92px]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xl">💬</span>
                  <span className="text-[10px] font-extrabold text-amber-300 group-hover:translate-x-0.5 transition-transform">
                    채팅 입장 →
                  </span>
                </div>
                <div>
                  <div className="text-xs text-amber-200 font-medium">카카오톡 1:1 오픈채팅</div>
                  <div className="text-sm font-black text-amber-100 mt-0.5">
                    실시간 빠른 비대면 상담
                  </div>
                </div>
              </a>

              {/* 3. 공식 네이버 블로그 */}
              <a
                href="https://blog.naver.com/ddasmee63"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 hover:border-emerald-400/60 transition-all group flex flex-col justify-between min-h-[92px]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xl">📗</span>
                  <span className="text-[10px] font-extrabold text-emerald-300 group-hover:translate-x-0.5 transition-transform">
                    블로그 방문 →
                  </span>
                </div>
                <div>
                  <div className="text-xs text-emerald-200 font-medium">공식 네이버 블로그</div>
                  <div className="text-sm font-black text-emerald-100 mt-0.5">
                    blog.naver.com/ddasmee63
                  </div>
                </div>
              </a>

              {/* 4. 대표 이메일 */}
              <a
                href="mailto:ddasmee63@gmail.com"
                className="p-4 rounded-2xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/80 hover:border-sky-500/60 transition-all group flex flex-col justify-between min-h-[92px]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xl">✉️</span>
                  <span className="text-[10px] font-extrabold text-sky-400 group-hover:translate-x-0.5 transition-transform">
                    메일 쓰기 →
                  </span>
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">비즈니스 대표 이메일</div>
                  <div className="text-xs sm:text-sm font-bold text-white mt-0.5 truncate font-mono">
                    ddasmee63@gmail.com
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
