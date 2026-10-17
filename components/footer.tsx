import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-slate-950/95 border-t border-slate-800 py-16 px-4 sm:px-6 lg:px-8 pb-24 sm:pb-16 text-slate-400">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* 상단 3개 열: 브랜드/대표정보, 전문분야 바로가기, 직통 문의 채널 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          {/* 1. 좌측 브랜드 및 대표자 사업자 정보 (5열) */}
          <div className="md:col-span-5 space-y-4">
            <Link
              href="/"
              className="text-2xl font-black text-white tracking-wider flex items-center gap-2 group cursor-pointer"
              aria-label="더 그림 대문(홈)으로 이동"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500 group-hover:scale-125 transition-transform shrink-0" />
              <span>THE GRIM</span>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed font-normal max-w-sm">
              공간의 가치를 짓는 인테리어 디자인부터 골프 세미프로 1:1 코칭,
              한국어 교육, 최신 웹·앱 풀스택 개발까지 다분야 전문성을 바탕으로
              최상의 솔루션을 제공합니다.
            </p>

            {/* 대표자 및 사업장 상세 명시 (신뢰도 제고) */}
            <div className="pt-2 space-y-1.5 text-xs text-slate-400 border-t border-slate-900">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span><strong className="text-slate-300">상호:</strong> 더 그림 (THE GRIM)</span>
                <span>·</span>
                <span><strong className="text-slate-300">대표 / CEO:</strong> 이승국</span>
              </div>
              <div>
                <strong className="text-slate-300">주소:</strong> 경기도 화성시 새비봉동로 37
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span>
                  <strong className="text-slate-300">대표전화:</strong>{" "}
                  <a href="tel:010-7533-9193" className="hover:text-sky-400 text-slate-300 font-mono transition-colors">
                    010-7533-9193
                  </a>
                </span>
                <span>·</span>
                <span>
                  <strong className="text-slate-300">이메일:</strong>{" "}
                  <a href="mailto:ddasmee63@gmail.com" className="hover:text-sky-400 text-slate-300 font-mono transition-colors">
                    ddasmee63@gmail.com
                  </a>
                </span>
              </div>
            </div>
          </div>

          {/* 2. 중앙 4대 전문 분야 전용관 (3열) */}
          <div className="md:col-span-3 space-y-3 text-xs">
            <div className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">
              전문 분야 전용관
            </div>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link href="/interior" className="hover:text-sky-400 transition-colors flex items-center gap-1.5">
                  <span>🏛️</span>
                  <span>공간 디자인 & 직영 시공</span>
                </Link>
              </li>
              <li>
                <Link href="/golf" className="hover:text-sky-400 transition-colors flex items-center gap-1.5">
                  <span>⛳</span>
                  <span>골프 1:1 맞춤 레슨</span>
                </Link>
              </li>
              <li>
                <Link href="/korean" className="hover:text-sky-400 transition-colors flex items-center gap-1.5">
                  <span>🇰🇷</span>
                  <span>공인 한국어 지도 & 교육</span>
                </Link>
              </li>
              <li>
                <Link href="/dev" className="hover:text-sky-400 transition-colors flex items-center gap-1.5">
                  <span>💻</span>
                  <span>풀스택 웹·앱 개발</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. 우측 공식 소통 & 소셜 채널 (4열) */}
          <div className="md:col-span-4 space-y-3 text-xs">
            <div className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">
              공식 직통 소통 채널
            </div>
            <div className="space-y-2">
              <a
                href="https://open.kakao.com/o/gBFGomDi"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 hover:border-amber-400/50 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-2 text-amber-200 font-medium">
                  <span>💬</span>
                  <span>카카오톡 1:1 오픈채팅 상담</span>
                </div>
                <span className="text-amber-400 text-[11px] group-hover:translate-x-0.5 transition-transform">
                  입장 →
                </span>
              </a>

              <a
                href="https://blog.naver.com/ddasmee63"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 hover:border-emerald-400/50 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-2 text-emerald-200 font-medium">
                  <span>📗</span>
                  <span>네이버 공식 블로그 (시공·칼럼)</span>
                </div>
                <span className="text-emerald-400 text-[11px] group-hover:translate-x-0.5 transition-transform">
                  방문 →
                </span>
              </a>

              <a
                href="tel:010-7533-9193"
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-sky-500/40 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-2 text-slate-300 font-medium">
                  <span>📞</span>
                  <span>유선 통화: 010-7533-9193</span>
                </div>
                <span className="text-sky-400 text-[11px] group-hover:translate-x-0.5 transition-transform">
                  연결 →
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* 하단 저작권 및 관리자 링크 */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-medium">
          <div>
            © 2026 THE GRIM. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://blog.naver.com/ddasmee63"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-300 transition-colors"
            >
              네이버 블로그
            </a>
            <span>·</span>
            <a
              href="https://open.kakao.com/o/gBFGomDi"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-300 transition-colors"
            >
              카카오톡 오픈채팅
            </a>
            <span>·</span>
            <Link href="/admin" className="hover:text-slate-300 transition-colors">
              🔒 관리자
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
