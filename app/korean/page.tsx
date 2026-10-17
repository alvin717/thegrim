import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import FloatingContactBar from "@/components/floating-contact-bar"
import ContactSection from "@/components/contact-section"
import KoreanCoursesSection from "@/components/korean-courses-section"
import KoreanTutorIntegration from "@/components/korean-tutor-integration"
import Link from "next/link"

export const metadata: Metadata = {
  title: "공인 한국어 교육 & 비즈니스 코칭 | 더 그림 (THE GRIM)",
  description:
    "공인 한국어교원 직강! 외국인 주재원 비즈니스 회화부터 TOPIK 고득점 합격까지, 1:1 맞춤형 발음 교정과 문화 연계 강의",
}


// 지도 실적 및 특징
const TEACHING_POINTS = [
  {
    title: "국가공인 한국어교원 자격 보유",
    desc: "체계적인 언어 교수법과 외국어로서의 한국어 교육학 이론을 바탕으로 안전하고 검증된 수업을 제공합니다.",
  },
  {
    title: "다국적 지도 노하우 (미국, 유럽, 일본, 동남아 등)",
    desc: "학습자의 모국어에 따른 언어적 간섭 현상을 정확히 파악하여 발음 오류를 빠르게 교정합니다.",
  },
  {
    title: "마이페이지를 통한 전용 교재 & 복습 음원 지원",
    desc: "수업 후 매일 복습할 수 있는 핵심 요약 PDF 교재와 원어민 발음 MP3 음원을 홈페이지에서 무료 제공합니다.",
  },
]

export default function KoreanPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-sky-200 selection:text-sky-900 relative">
      {/* 3번 이미지 배경 적용: '3번이미지 한국어교육' */}
      <div
        className="fixed inset-0 pointer-events-none z-0 bg-cover bg-center bg-no-repeat opacity-95"
        style={{ backgroundImage: "url('/images/bg/bg-korean.png')" }}
      />

      <div className="relative z-10">
        <Navbar />

        {/* 1. 히어로 섹션 */}
        <section className="relative pt-36 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
          <div className="relative z-10 text-center max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 border border-sky-300 text-sky-800 text-xs font-bold tracking-wider uppercase shadow-sm">
              <span>🇰🇷 국가공인 한국어교원 직강</span>
              <span>·</span>
              <span>3번 배경 이미지 적용</span>
              <span>·</span>
              <span>다국적 수강생 지도</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.2]">
              언어를 넘어 문화와 마음을 전하는
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-blue-600 to-teal-600">
                전문 한국어 맞춤 강의
              </span>
            </h1>

            <p className="text-slate-700 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-medium">
              딱딱한 문법 암기는 그만! 학습자의 직업과 관심사에 맞춘 실전 비즈니스 회화부터
              정밀 발음 교정, TOPIK 합격까지 체계적인 1:1 맞춤 솔루션을 제공합니다.
            </p>

            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <a
                href="#courses"
                className="px-6 py-3.5 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-all shadow-lg active:scale-95 min-h-[44px] flex items-center gap-2"
              >
                <span>교육 과정 둘러보기</span>
                <span>↓</span>
              </a>
              <a
                href="#contact"
                className="px-6 py-3.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm shadow-md transition-all min-h-[44px] flex items-center gap-2"
              >
                <span>무료 레벨 테스트 & 상담</span>
                <span>→</span>
              </a>
            </div>

            {/* 핵심 지표 */}
            <div className="grid grid-cols-3 gap-4 pt-12 max-w-2xl mx-auto border-t border-slate-200">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900">100%</div>
                <div className="text-xs text-slate-500 font-semibold mt-1">공인 교원 직강</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-sky-700">99.4%</div>
                <div className="text-xs text-slate-500 font-semibold mt-1">수강생 수업 만족도</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900">온·오프라인</div>
                <div className="text-xs text-slate-500 font-semibold mt-1">전국/해외 Zoom 연동</div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. 3대 교육 과정 (우수학생 & 교육과정 사진 등록·수시 변경 관리) */}
        <KoreanCoursesSection />

        {/* 2-1. 기존 K-Lingo 스마트 한국어 에듀테크 플랫폼 통합 섹션 */}
        <KoreanTutorIntegration />

        {/* 3. 지도 철학 및 차별점 */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-sky-700 tracking-widest uppercase">
              Why The Grim
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
              왜 더그림 한국어 교육을 선택할까요?
            </h2>
            <p className="text-slate-600 text-sm font-medium">
              단순 원어민 대화가 아닌, 검증된 교육학적 접근으로 언어 습득 시간을 절반으로 줄여드립니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TEACHING_POINTS.map((point, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white/85 border border-slate-200 shadow-md backdrop-blur-md space-y-3"
              >
                <div className="text-xl font-mono font-black text-sky-700">
                  0{idx + 1}
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  {point.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {point.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. 마이페이지 연동 안내 */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="p-8 sm:p-10 rounded-3xl bg-white/85 border border-slate-200 shadow-xl backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <span className="text-xs font-bold text-sky-700 uppercase tracking-wider">
                Student MyPage Support
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                수강생 전용 자료실 (교재 & 원어민 MP3)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                수강 등록 시 로그인 후 마이페이지에서 매 수업의 복습 교재와 음원 파일을 언제든 다운로드하여 복습할 수 있습니다.
              </p>
            </div>
            <Link
              href="/mypage"
              className="px-6 py-3.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs sm:text-sm whitespace-nowrap transition-colors min-h-[44px] flex items-center justify-center shadow-md"
            >
              수강생 자료실 보기 →
            </Link>
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
