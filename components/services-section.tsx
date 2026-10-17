"use client"

import { useState } from "react"
import Link from "next/link"

// 4대 전문 영역 데이터 정의
export interface ServiceItem {
  id: string
  category: string
  title: string
  subTitle: string
  badge: string
  description: string
  highlights: string[]
  offerings: string[]
  stats: { label: string; value: string }
  accentColor: string
}

const SERVICES: ServiceItem[] = [
  {
    id: "interior",
    category: "공간 디자인 & 시공",
    title: "공간의 가치를 짓는 인테리어 디렉팅",
    subTitle: "Interior & Spatial Design",
    badge: "공간 컨설팅 · 직영 시공",
    description:
      "주거 공간부터 상업 시설까지, 고객의 라이프스타일과 비즈니스 동선을 과학적으로 분석하여 미학과 실용성이 공존하는 감각적인 공간을 완성합니다.",
    highlights: [
      "3D 정밀 모델링 및 렌더링 사전 시각화",
      "현장 밀착형 직영 책임 시공 및 마감 감리",
      "예산 맞춤형 자재 큐레이션 및 투명한 견적",
    ],
    offerings: [
      "아파트 · 주택 하이엔드 주거 인테리어",
      "카페 · 쇼룸 · 오피스 상업 공간 브랜딩 인테리어",
      "부분 리모델링 & 홈스타일링 컨설팅",
    ],
    stats: { label: "완공 프로젝트", value: "80+ 건" },
    accentColor: "from-amber-500/20 to-orange-500/5",
  },
  {
    id: "golf",
    category: "골프 코칭 & 레슨",
    title: "데이터와 감각의 조화, 세미프로 1:1 맞춤 레슨",
    subTitle: "Professional Golf Coaching",
    badge: "KPGA 준회원 · 맞춤 커리큘럼",
    description:
      "획일화된 스윙 주입이 아닌, 수강생 각자의 체형과 유연성을 분석하여 평생 부상 없이 일관성 있는 구질을 만들어 드리는 고효율 맞춤형 코칭입니다.",
    highlights: [
      "초고속 스윙 궤도 및 임팩트 지표 정밀 분석",
      "비거리 20m 증가 및 슬라이스 완벽 교정 루틴",
      "실전 감각을 극대화하는 숏게임 및 필드 동반 레슨",
    ],
    offerings: [
      "골린이 단기 속성 입문 마스터 코스",
      "중·상급자 싱글 진입 스윙 교정 및 구질 최적화",
      "18홀 필드 코스 매니지먼트 & 멘탈 케어",
    ],
    stats: { label: "누적 코칭 시간", value: "3,200+ 시간" },
    accentColor: "from-emerald-500/20 to-teal-500/5",
  },
  {
    id: "korean",
    category: "한국어 지도 & 교육",
    title: "언어와 문화를 함께 전하는 전문 한국어 강의",
    subTitle: "Korean Language Education",
    badge: "공인 한국어교원 · 다국적 지도",
    description:
      "외국인 주재원, 글로벌 기업 임직원, 유학생을 대상으로 발음 교정부터 고급 비즈니스 의사소통, 문화적 맥락까지 쉽고 재미있게 체득하도록 지도합니다.",
    highlights: [
      "한국어교원 전문 자격 기반의 체계적 커리큘럼",
      "1:1 맞춤형 억양 및 정밀 발음 트레이닝",
      "현업에서 바로 쓰는 실무 비즈니스 표현 집중 마스터",
    ],
    offerings: [
      "외국인 주재원 & 비즈니스 전문가 속성 한국어",
      "TOPIK(한국어능력시험) 고득점 대비 전략반",
      "K-컬처 연계 실전 일상 회화 및 에티켓 수업",
    ],
    stats: { label: "지도 수강생 만족도", value: "99.4%" },
    accentColor: "from-blue-500/20 to-indigo-500/5",
  },
  {
    id: "tech",
    category: "웹 & 앱 풀스택 개발",
    title: "기획부터 배포까지, 비즈니스를 움직이는 기술 개발",
    subTitle: "Full-Stack Web & App Development",
    badge: "Next.js · 반응형 · 업무 자동화",
    description:
      "최신 모던 웹 스택(Next.js, TypeScript, Tailwind)을 바탕으로 방문자를 고객으로 바꾸는 초고속 반응형 웹사이트 및 업무 효율을 극대화하는 맞춤형 시스템을 제작합니다.",
    highlights: [
      "검색엔진 최적화(SEO) 및 모바일 완벽 대응 반응형 UI",
      "디자인부터 프론트·백엔드 통합 단독 풀스택 빌드",
      "반복 업무를 줄이는 업무 자동화 및 1인 기업 전산 툴 구축",
    ],
    offerings: [
      "고급 반응형 브랜드 웹사이트 & 포트폴리오 구축",
      "외주 의뢰 · 예약 · 고객 관리 웹 애플리케이션",
      "업무 데이터 자동화 스크립트 및 관리자 대시보드",
    ],
    stats: { label: "런칭 시스템", value: "35+ 개" },
    accentColor: "from-purple-500/20 to-pink-500/5",
  },
]

export default function ServicesSection() {
  const [selectedId, setSelectedId] = useState<string>("interior")
  const activeService = SERVICES.find((s) => s.id === selectedId) || SERVICES[0]

  // 특정 서비스 선택 시 문의 폼으로 부드럽게 스크롤
  const handleConsultClick = (categoryName: string) => {
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
      // 커스텀 이벤트 전달하여 폼의 라디오/선택 상태 자동 동기화
      window.dispatchEvent(
        new CustomEvent("select-service-category", { detail: categoryName })
      )
    }
  }

  return (
    <section id="services" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* 섹션 헤더 */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <span className="inline-block px-3 py-1 text-xs font-semibold tracking-widest text-zinc-300 uppercase bg-zinc-800/80 border border-zinc-700/60 rounded-full">
          Core Expertise
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
          경계를 넘나드는 4가지 전문성,
          <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-zinc-300 to-zinc-500">
            하나의 타협 없는 디테일
          </span>
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
          공간을 구현하는 직관과 코드를 작성하는 정밀함, 그리고 사람을 지도하는 소통력까지.
          각 분야에서 축적된 실전 노하우로 최상의 성과를 약속합니다.
        </p>
      </div>

      {/* 모바일/데스크톱 탭 선택 버튼 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-1.5 bg-zinc-900/90 border border-zinc-800 rounded-2xl mb-10 max-w-4xl mx-auto backdrop-blur-md">
        {SERVICES.map((item) => {
          const isActive = item.id === selectedId
          return (
            <button
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 flex flex-col items-center justify-center gap-1 min-h-[56px] ${
                isActive
                  ? "bg-zinc-800 text-white shadow-lg border border-zinc-700/80"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-850/50"
              }`}
            >
              <span>{item.category.split("&")[0].trim()}</span>
              <span className="text-[11px] opacity-70 font-normal">
                {item.id === "interior" && "공간 시공"}
                {item.id === "golf" && "1:1 레슨"}
                {item.id === "korean" && "맞춤 교육"}
                {item.id === "tech" && "풀스택 개발"}
              </span>
            </button>
          )
        })}
      </div>

      {/* 선택된 영역 상세 카드 */}
      <div className="relative rounded-3xl bg-zinc-900/80 border border-zinc-800 p-6 sm:p-10 lg:p-12 overflow-hidden shadow-2xl backdrop-blur-xl">
        {/* 은은한 배경 그라데이션 */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${activeService.accentColor} pointer-events-none transition-all duration-700`}
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* 좌측 정보 (제목, 설명, 핵심 지표) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 text-xs font-semibold text-zinc-200 bg-zinc-800/90 border border-zinc-700 rounded-md">
                {activeService.badge}
              </span>
              <span className="text-xs text-zinc-400 tracking-wider uppercase font-mono">
                {activeService.subTitle}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-snug">
              {activeService.title}
            </h3>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              {activeService.description}
            </p>

            {/* 핵심 강점 3가지 */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                핵심 차별화 포인트
              </h4>
              <ul className="space-y-2.5">
                {activeService.highlights.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-zinc-300">
                    <span className="mt-1 flex-shrink-0 w-4 h-4 rounded-full bg-zinc-800 border border-zinc-600 flex items-center justify-center text-[10px] text-zinc-200 font-bold">
                      ✓
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 버튼 및 실적 수치 */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href={
                  activeService.id === "interior"
                    ? "/interior"
                    : activeService.id === "golf"
                    ? "/golf"
                    : activeService.id === "korean"
                    ? "/korean"
                    : "/dev"
                }
                className="px-6 py-3.5 rounded-xl bg-white text-zinc-950 font-extrabold text-sm hover:bg-zinc-200 transition-all shadow-md active:scale-[0.98] min-h-[44px] flex items-center gap-2 group"
              >
                <span>{activeService.category.split("&")[0].trim()} 전용관 바로가기</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>

              <button
                onClick={() => handleConsultClick(activeService.category)}
                className="px-5 py-3.5 rounded-xl bg-zinc-800 hover:bg-zinc-750 text-zinc-200 font-bold text-sm border border-zinc-700 transition-all min-h-[44px]"
              >
                빠른 상담 신청
              </button>

              <div className="flex items-baseline gap-2 border-l border-zinc-800 pl-4 sm:pl-6 my-1">
                <span className="text-xs text-zinc-400">{activeService.stats.label}</span>
                <span className="text-2xl font-extrabold text-white">
                  {activeService.stats.value}
                </span>
              </div>
            </div>
          </div>

          {/* 우측 주요 제공 서비스 목록 카드 */}
          <div className="lg:col-span-5 bg-zinc-950/70 border border-zinc-800/90 rounded-2xl p-6 sm:p-8 space-y-6">
            <h4 className="text-sm font-bold text-zinc-300 tracking-wide flex items-center justify-between">
              <span>주요 제공 서비스 범위</span>
              <span className="text-xs text-zinc-500 font-mono">Scope of Work</span>
            </h4>

            <div className="space-y-4">
              {activeService.offerings.map((service, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700/80 transition-colors"
                >
                  <div className="text-xs font-mono text-zinc-400 mb-1">
                    0{idx + 1}
                  </div>
                  <div className="text-sm font-semibold text-zinc-200">
                    {service}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 text-xs text-zinc-400 leading-relaxed bg-zinc-900/40 p-4 rounded-xl border border-zinc-850">
              💡 세부 일정 및 견적은 고객님의 현장 상황과 요청 사항에 맞춰 유연하게 맞춤 조율됩니다.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
