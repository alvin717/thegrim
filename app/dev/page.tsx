import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import FloatingContactBar from "@/components/floating-contact-bar"
import ContactSection from "@/components/contact-section"
import DevAppsMarketplace from "@/components/dev-apps-marketplace"
import Link from "next/link"

export const metadata: Metadata = {
  title: "웹 & 앱 풀스택 개발 | 더 그림 (THE GRIM)",
  description:
    "Next.js, TypeScript 기반의 초고속 반응형 웹 구축! 브랜드 홈페이지부터 예약 시스템, 업무 자동화 관리자 툴까지 원스톱 풀스택 개발",
}

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

        {/* 2. 회원 전용 소프트웨어 & 앱 다운로드 스토어 */}
        <DevAppsMarketplace />

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
