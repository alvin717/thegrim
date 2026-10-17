import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-[#18231c] border-t border-[#384c3f] py-16 px-4 sm:px-6 lg:px-8 pb-24 sm:pb-16 text-[#a3b18a]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-10">
        {/* 좌측 브랜드 및 소개 */}
        <div className="space-y-3 max-w-sm">
          <div className="text-xl font-extrabold text-[#f4f2ee] tracking-wider">
            THE GRIM
          </div>
          <p className="text-xs text-[#a3b18a] leading-relaxed">
            공간의 가치를 짓는 인테리어 디자인부터 골프 세미프로 1:1 코칭,
            한국어 교육, 최신 웹·앱 풀스택 개발까지 다분야 전문성을 바탕으로
            최상의 솔루션을 제공합니다.
          </p>
          <div className="text-[11px] text-[#a3b18a]/80 flex items-center gap-2">
            <span>© 2026 THE GRIM. All rights reserved.</span>
            <span>·</span>
            <Link href="/admin" className="hover:text-[#dad7cd] transition-colors">
              🔒 관리자
            </Link>
          </div>
        </div>

        {/* 우측 4대 전문 서비스 및 바로가기 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs">
          <div className="space-y-2.5">
            <div className="font-bold text-[#dad7cd]">전문 분야 전용관</div>
            <ul className="space-y-1.5 text-[#a3b18a]">
              <li>
                <Link href="/interior" className="hover:text-[#dad7cd] transition-colors">
                  🏛️ 공간 디자인 & 시공
                </Link>
              </li>
              <li>
                <Link href="/golf" className="hover:text-[#dad7cd] transition-colors">
                  ⛳ 골프 1:1 맞춤 레슨
                </Link>
              </li>
              <li>
                <Link href="/korean" className="hover:text-[#dad7cd] transition-colors">
                  🇰🇷 공인 한국어 교육
                </Link>
              </li>
              <li>
                <Link href="/dev" className="hover:text-[#dad7cd] transition-colors">
                  💻 풀스택 웹·앱 개발
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-2.5">
            <div className="font-bold text-[#dad7cd]">문의 채널</div>
            <ul className="space-y-1.5 text-[#a3b18a]">
              <li>
                <a href="tel:010-0000-0000" className="hover:text-[#f4f2ee] transition-colors">
                  📞 유선 문의
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#f4f2ee] transition-colors">
                  ✍️ 온라인 상담 신청
                </a>
              </li>
              <li>
                <span className="text-[#a3b18a]">✉️ 공식 메일 문의</span>
              </li>
            </ul>
          </div>

          <div className="space-y-2.5 col-span-2 sm:col-span-1">
            <div className="font-bold text-[#dad7cd]">운영 원칙</div>
            <p className="text-xs text-[#a3b18a] leading-relaxed">
              모든 프로젝트와 교육은 사전 1:1 심층 상담을 통해 맞춤형으로만 운영됩니다.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
