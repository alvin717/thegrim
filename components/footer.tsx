export default function Footer() {
  return (
    <footer className="relative bg-zinc-950 border-t border-zinc-900 py-16 px-4 sm:px-6 lg:px-8 pb-24 sm:pb-16 text-zinc-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-10">
        {/* 좌측 브랜드 및 소개 */}
        <div className="space-y-3 max-w-sm">
          <div className="text-xl font-extrabold text-white tracking-wider">
            THE GRIM
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            공간의 가치를 짓는 인테리어 디자인부터 골프 세미프로 1:1 코칭,
            한국어 교육, 최신 웹·앱 풀스택 개발까지 다분야 전문성을 바탕으로
            최상의 솔루션을 제공합니다.
          </p>
          <div className="text-[11px] text-zinc-400">
            © 2026 THE GRIM. All rights reserved.
          </div>
        </div>

        {/* 우측 4대 전문 서비스 및 바로가기 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs">
          <div className="space-y-2.5">
            <div className="font-bold text-zinc-200">전문 분야</div>
            <ul className="space-y-1.5 text-zinc-400">
              <li>공간 기획 및 직영 시공</li>
              <li>골프 세미프로 1:1 레슨</li>
              <li>공인 한국어 교육 지도</li>
              <li>풀스택 웹·앱 개발</li>
            </ul>
          </div>

          <div className="space-y-2.5">
            <div className="font-bold text-zinc-200">문의 채널</div>
            <ul className="space-y-1.5 text-zinc-400">
              <li>
                <a href="tel:010-0000-0000" className="hover:text-white transition-colors">
                  📞 유선 문의
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  ✍️ 온라인 상담 신청
                </a>
              </li>
              <li>
                <span className="text-zinc-400">✉️ 공식 메일 문의</span>
              </li>
            </ul>
          </div>

          <div className="space-y-2.5 col-span-2 sm:col-span-1">
            <div className="font-bold text-zinc-200">운영 원칙</div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              모든 프로젝트와 교육은 사전 1:1 심층 상담을 통해 맞춤형으로만 운영됩니다.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
