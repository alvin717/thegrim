import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import FloatingContactBar from "@/components/floating-contact-bar"
import ContactSection from "@/components/contact-section"
import Link from "next/link"

export const metadata: Metadata = {
  title: "웹 & 앱 풀스택 개발 | 더 그림 (THE GRIM)",
  description:
    "Next.js, TypeScript 기반의 초고속 반응형 웹 구축! 브랜드 홈페이지부터 예약 시스템, 업무 자동화 관리자 툴까지 원스톱 풀스택 개발",
}

// 3대 개발 서비스 솔루션
const DEV_SOLUTIONS = [
  {
    title: "하이엔드 반응형 브랜드 홈페이지",
    badge: "브랜딩 & 랜딩페이지",
    target: "전문직, 인테리어/건축, 학원, 병원, 쇼룸 등 고품격 웹사이트가 필요한 기업",
    features: [
      "스마트폰·태블릿·PC 어디서나 완벽한 모바일 퍼스트 반응형 레이아웃",
      "검색엔진 최적화(SEO) 및 네이버·구글 포털 사이트 상위 노출 구조",
      "방문자의 이탈을 방지하고 상담/전화 전환율을 극대화하는 UX 설계",
    ],
    tech: "Next.js · Tailwind CSS · Vercel 배포",
    accent: "border-purple-500/30",
  },
  {
    title: "예약 · 결제 · 고객 마이페이지 웹 앱",
    badge: "웹 애플리케이션 시스템",
    target: "고객 관리, 상담 접수, 온라인 클래스, 수강생 과제 제출 시스템이 필요한 서비스",
    features: [
      "카카오 3초 간편 로그인 및 구글·이메일 소셜 인증 연동",
      "고객별 마이페이지(의뢰 현황, 자료 다운로드, 피드백 게시판)",
      "수파베이스(Supabase) 클라우드 DB 연동으로 안전한 데이터 암호화",
    ],
    tech: "Next.js · Supabase DB · Auth · REST API",
    accent: "border-pink-500/50 bg-purple-950/20",
  },
  {
    title: "1인 기업 & 자영업자 업무 자동화 관리자 툴",
    badge: "업무 생산성 극대화",
    target: "엑셀 수작업을 줄이고 실시간 고객 접수와 통계를 한눈에 관리하고 싶은 대표님",
    features: [
      "접수된 고객 데이터 실시간 대시보드 및 원클릭 엑셀(CSV) 다운로드",
      "관리자 전용 PIN 잠금 보안 시스템 탑재",
      "반복 수작업을 없애주는 맞춤형 자동화 스크립트 구축",
    ],
    tech: "Admin Dashboard · 자동화 스크립트 · 통계 차트",
    accent: "border-purple-500/30",
  },
]

// 풀스택 개발 프로세스
const DEV_PROCESS = [
  {
    step: "01",
    title: "요구사항 분석 & 기능 명세",
    desc: "만들고자 하는 웹/앱의 핵심 목적과 필수 기능을 함께 정의하고 기획안을 수립합니다.",
  },
  {
    step: "02",
    title: "UI/UX 화면 설계 & 프로토타입",
    desc: "고객이 사용하기 편한 최신 디자인 스타일과 모바일 화면 동선을 먼저 시각화합니다.",
  },
  {
    step: "03",
    title: "풀스택 코딩 & 데이터베이스 연동",
    desc: "화면 UI와 백엔드 DB(Supabase)를 정밀하게 결합하여 오류 없는 기능을 구축합니다.",
  },
  {
    step: "04",
    title: "모바일·PC 크로스 브라우징 & 성능 검수",
    desc: "모든 기기에서 로딩 속도 1초 미만의 초고속 성능과 가로 스크롤 없는 반응형을 완성합니다.",
  },
  {
    step: "05",
    title: "글로벌 클라우드(Vercel) 무중단 배포",
    desc: "서버 다운 걱정 없는 글로벌 CDN망에 도메인을 연결하고 실시간 운영 상태로 인도합니다.",
  },
]

export default function DevPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-sky-200 selection:text-sky-900 relative">
      {/* 4번 이미지 배경 적용: '4번이미지 웹,앱 개발' */}
      <div
        className="fixed inset-0 pointer-events-none z-0 bg-cover bg-center bg-no-repeat opacity-95"
        style={{ backgroundImage: "url('/images/bg/bg-dev.png')" }}
      />

      <div className="relative z-10">
        <Navbar />

        {/* 1. 히어로 섹션 */}
        <section className="relative pt-36 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
          <div className="relative z-10 text-center max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 border border-sky-300 text-sky-800 text-xs font-bold tracking-wider uppercase shadow-sm">
              <span>💻 FULL-STACK WEB & APP DEVELOPMENT</span>
              <span>·</span>
              <span>4번 배경 이미지 적용</span>
              <span>·</span>
              <span>최신 Next.js 기반</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.2]">
              기획부터 디자인, 배포까지
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-blue-600 to-teal-600">
                비즈니스를 움직이는 기술을 만듭니다
              </span>
            </h1>

            <p className="text-slate-700 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-medium">
              화려하기만 하고 관리가 안 되는 웹사이트는 사양합니다.
              방문자를 실제 고객으로 바꾸는 감각적인 디자인과 강력한 데이터베이스 연동,
              그리고 대표님의 시간을 아껴주는 업무 자동화 시스템을 완성해 드립니다.
            </p>

            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <a
                href="#solutions"
                className="px-6 py-3.5 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-all shadow-lg active:scale-95 min-h-[44px] flex items-center gap-2"
              >
                <span>개발 솔루션 둘러보기</span>
                <span>↓</span>
              </a>
              <a
                href="#contact"
                className="px-6 py-3.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm shadow-md transition-all min-h-[44px] flex items-center gap-2"
              >
                <span>프로젝트 외주 & 견적 문의</span>
                <span>→</span>
              </a>
            </div>

            {/* 핵심 지표 */}
            <div className="grid grid-cols-3 gap-4 pt-12 max-w-2xl mx-auto border-t border-slate-200">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900">35+ 개</div>
                <div className="text-xs text-slate-500 font-semibold mt-1">런칭 웹·앱 시스템</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-sky-700">1초 미만</div>
                <div className="text-xs text-slate-500 font-semibold mt-1">초고속 페이지 로딩</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900">100% 모바일</div>
                <div className="text-xs text-slate-500 font-semibold mt-1">완벽 반응형 지원</div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. 3대 핵심 개발 솔루션 */}
        <section id="solutions" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-sky-700 tracking-widest uppercase">
              Solutions
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
              제작 가능한 주요 개발 분야
            </h2>
            <p className="text-slate-600 text-sm sm:text-base font-medium">
              단순 소개형 홈페이지부터 복잡한 기능의 고객 관리 웹 애플리케이션까지 모두 가능합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {DEV_SOLUTIONS.map((sol, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white/85 border border-slate-200/90 hover:border-sky-400 transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between space-y-6 group hover:-translate-y-1 shadow-md backdrop-blur-md"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-sky-100 text-sky-800 border border-sky-200">
                      {sol.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-slate-900 group-hover:text-sky-700 transition-colors">
                      {sol.title}
                    </h3>
                    <div className="text-xs text-slate-600 mt-1.5 leading-relaxed font-medium">
                      🎯 추천 대상: {sol.target}
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      핵심 탑재 기술 & 기능
                    </div>
                    <ul className="space-y-2">
                      {sol.features.map((feat, fIdx) => (
                        <li key={fIdx} className="text-xs text-slate-700 font-medium flex items-start gap-2">
                          <span className="text-sky-600 font-bold">✓</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 text-xs text-sky-800 font-bold bg-sky-50 p-3 rounded-xl border border-sky-100">
                  ⚙️ 핵심 스택: {sol.tech}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. 5단계 체계적 개발 프로세스 */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200 bg-white/70 backdrop-blur-md rounded-3xl my-10 shadow-sm border">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-sky-700 tracking-widest uppercase">
              Development Lifecycle
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
              기획부터 배포까지 투명한 5단계 개발 흐름
            </h2>
            <p className="text-slate-600 text-sm font-medium">
              소통 부재로 인한 재작업 없이, 매 단계 진행 상황을 눈으로 확인하며 완성됩니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {DEV_PROCESS.map((p, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white/90 border border-slate-200 flex flex-col justify-between space-y-3 shadow-sm"
              >
                <div className="text-2xl font-black text-sky-700 font-mono">
                  {p.step}
                </div>
                <h3 className="text-sm font-bold text-slate-900 leading-snug">
                  {p.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. 대표님 전용 관리자 기능 소개 */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="p-8 sm:p-10 rounded-3xl bg-white/85 border border-slate-200 shadow-xl backdrop-blur-md space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
              <div>
                <span className="text-xs font-bold text-sky-700 uppercase tracking-widest">
                  Admin System Integration
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                  관리자 대시보드 무상 연동
                </h3>
              </div>
              <Link
                href="/admin"
                className="text-xs text-sky-700 hover:text-sky-900 bg-sky-50 px-3 py-1.5 rounded-lg border border-sky-200 font-bold transition-colors"
              >
                관리자 페이지 데모 체험 🔒
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="font-bold text-sky-800">실시간 상담 접수 알림</div>
                <p className="text-slate-600 font-medium">고객이 폼을 제출하는 즉시 관리자 페이지에 실시간 반영 및 확인</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="font-bold text-sky-800">원클릭 고객 다이렉트 통화</div>
                <p className="text-slate-600 font-medium">모바일에서 접수된 전화번호를 클릭하면 즉시 통화 연결</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="font-bold text-sky-800">엑셀(CSV) 원클릭 백업</div>
                <p className="text-slate-600 font-medium">누적된 고객 리스트를 엑셀 파일로 한 번에 다운로드하여 관리</p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. 1:1 상담 신청 폼 */}
        <ContactSection />

        {/* 푸터 및 모바일 바 */}
        <Footer />
        <FloatingContactBar />
      </div>
    </div>
  )
}
