import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import FloatingContactBar from "@/components/floating-contact-bar"
import ContactSection from "@/components/contact-section"
import InteriorPortfolioSection from "@/components/interior-portfolio-section"
import Link from "next/link"

export const metadata: Metadata = {
  title: "공간 디자인 & 직영 시공 | 더 그림 (THE GRIM)",
  description:
    "아파트 주거 공간부터 상업 쇼룸까지, 라이프스타일 분석 기반 3D 시각화와 책임 직영 시공으로 완성하는 하이엔드 인테리어",
}


// 5단계 시공 프로세스
const PROCESS_STEPS = [
  {
    step: "01",
    title: "현장 실측 & 1:1 라이프스타일 인터뷰",
    desc: "현장 구조 및 설비를 정밀 점검하고, 고객의 생활 패턴과 비즈니스 동선을 심층 분석합니다.",
  },
  {
    step: "02",
    title: "3D 모델링 설계 & 가상 시각화",
    desc: "도면만으로는 알 수 없는 마감 느낌을 실감형 3D 렌더링으로 미리 확인하고 수정합니다.",
  },
  {
    step: "03",
    title: "투명한 내역서 & 자재 샘플 큐레이션",
    desc: "품목별 자재와 규격이 명시된 투명 견적서를 제공하며, 실물 샘플을 직접 보고 결정합니다.",
  },
  {
    step: "04",
    title: "현장 밀착 직영 책임 시공 & 마감 감리",
    desc: "하도급에 넘기지 않고 디렉터가 매일 현장을 직접 상주·감리하여 오차 없는 마감을 완성합니다.",
  },
  {
    step: "05",
    title: "완공 인도 & 철저한 사후 무상 A/S",
    desc: "공사 완료 후 꼼꼼한 최종 검수를 진행하며, 안심하고 사용하실 수 있도록 사후 관리를 보증합니다.",
  },
]

export default function InteriorPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-sky-200 selection:text-sky-900 relative">
      {/* 1번 이미지 배경 적용: '1번이미지 공간 인테리어' */}
      <div
        className="fixed inset-0 pointer-events-none z-0 bg-cover bg-center bg-no-repeat opacity-95"
        style={{ backgroundImage: "url('/images/bg/bg-interior.png')" }}
      />

      <div className="relative z-10">
        <Navbar />

        {/* 1. 히어로 섹션 */}
        <section className="relative pt-36 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
          <div className="relative z-10 text-center max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 border border-sky-300 text-sky-800 text-xs font-bold tracking-wider uppercase shadow-sm">
              <span>🏛️ THE GRIM SPATIAL DESIGN</span>
              <span>·</span>
              <span>1번 배경 이미지 적용</span>
              <span>·</span>
              <span>직영 책임 시공</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.2]">
              머무는 사람의 품격을 높이는
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-blue-600 to-teal-600">
                하이엔드 공간 인테리어 디렉팅
              </span>
            </h1>

            <p className="text-slate-700 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-medium">
              단순히 예쁜 마감재를 바르는 것을 넘어, 공간에 머무는 사람의 호흡과 동선을 연구합니다.
              사전 3D 가상 시각화부터 직영 책임 시공까지 군더더기 없는 완벽을 선사합니다.
            </p>

            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <a
                href="#portfolio"
                className="px-6 py-3.5 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-all shadow-lg active:scale-95 min-h-[44px] flex items-center gap-2"
              >
                <span>시공 포트폴리오 둘러보기</span>
                <span>↓</span>
              </a>
              <a
                href="#contact"
                className="px-6 py-3.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm shadow-md transition-all min-h-[44px] flex items-center gap-2"
              >
                <span>실시간 견적 & 상담 신청</span>
                <span>→</span>
              </a>
            </div>

            {/* 핵심 지표 3종 */}
            <div className="grid grid-cols-3 gap-4 pt-12 max-w-2xl mx-auto border-t border-slate-200">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900">80+ 건</div>
                <div className="text-xs text-slate-500 font-semibold mt-1">완공 프로젝트</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-sky-700">100%</div>
                <div className="text-xs text-slate-500 font-semibold mt-1">현장 직영 책임 감리</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900">3D 제안</div>
                <div className="text-xs text-slate-500 font-semibold mt-1">착공 전 가상 렌더링</div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. 시공 사례 & 공간 갤러리 (사진 교체/업로드 및 카카오/네이버 지도 길찾기 기능 포함) */}
        <InteriorPortfolioSection />

        {/* 3. 5단계 시공 프로세스 안내 */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200 bg-white/70 backdrop-blur-md rounded-3xl my-10 shadow-sm border">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-sky-700 tracking-widest uppercase">
              Work Process
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
              불안 없는 5단계 안심 시공 프로세스
            </h2>
            <p className="text-slate-600 text-sm font-medium">
              견적 부풀리기나 공사 지연 없이, 모든 단계가 투명하게 공유됩니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {PROCESS_STEPS.map((step, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white/90 border border-slate-200 flex flex-col justify-between space-y-3 shadow-sm"
              >
                <div className="text-2xl font-black text-sky-700 font-mono">
                  {step.step}
                </div>
                <h3 className="text-sm font-bold text-slate-900 leading-snug">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. 견적 가이드라인 안내 */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="p-8 sm:p-10 rounded-3xl bg-white/85 border border-slate-200 shadow-xl backdrop-blur-md space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
              <div>
                <span className="text-xs font-bold text-sky-700 uppercase tracking-widest">
                  Estimation Guide
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                  투명한 예산 맞춤형 견적 시스템
                </h3>
              </div>
              <span className="text-xs text-slate-600 bg-slate-100 font-semibold px-3 py-1.5 rounded-lg border border-slate-200">
                상담 시 상세 자재표 제공
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="text-xs font-bold text-slate-500">부분 리모델링 / 홈스타일링</div>
                <div className="text-xl font-black text-slate-900">맞춤 조율</div>
                <p className="text-xs text-slate-600 font-medium">
                  욕실, 주방, 도배·마루 등 꼭 필요한 핵심 영역만 합리적으로 개선
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-sky-50/70 border border-sky-300 space-y-2 relative">
                <span className="absolute top-3 right-3 text-[10px] font-bold text-sky-800 bg-sky-100 px-2 py-0.5 rounded border border-sky-200">
                  인기 선택
                </span>
                <div className="text-xs font-bold text-sky-800">올 리모델링 (주거 올수리)</div>
                <div className="text-xl font-black text-slate-900">평당 맞춤 견적</div>
                <p className="text-xs text-slate-600 font-medium">
                  샷시 교체, 단열 보강, 배관 점검부터 무몰딩 히든도어 마감까지 풀체인지
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="text-xs font-bold text-slate-500">상업 공간 브랜딩 인테리어</div>
                <div className="text-xl font-black text-slate-900">프로젝트별 기획</div>
                <p className="text-xs text-slate-600 font-medium">
                  매장 콘셉트 기획, 고객 회전율 동선 분석, 소방법 및 인허가 완벽 대응
                </p>
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
