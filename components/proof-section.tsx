"use client"

import { useState } from "react"

interface PortfolioItem {
  id: string
  category: "all" | "interior" | "golf" | "korean" | "tech"
  categoryLabel: string
  title: string
  subtitle: string
  tags: string[]
  metrics: string
  description: string
}

const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: "p1",
    category: "interior",
    categoryLabel: "공간 디자인",
    title: "성수동 갤러리형 복합 문화 쇼룸",
    subtitle: "상업 공간 브랜딩 & 직영 시공",
    tags: ["상업 인테리어", "노출 콘크리트", "조명 연출", "3D 설계"],
    metrics: "시공 기간 4주 · 예산 대비 만족도 100%",
    description: "브랜드 철학을 고스란히 담아낸 미니멀 모던 공간 기획 및 맞춤 금속 집기 제작.",
  },
  {
    id: "p2",
    category: "interior",
    categoryLabel: "공간 디자인",
    title: "한남동 65평 프라이빗 주거 레지던스",
    subtitle: "하이엔드 주거 리모델링",
    tags: ["주거 인테리어", "원목 마루", "히든 도어", "수납 최적화"],
    metrics: "공간 동선 개선 · 수납 효율 40% 증가",
    description: "가족 구성원의 일상을 담아낸 따뜻한 톤앤매너와 무문선·무몰딩 정밀 마감.",
  },
  {
    id: "p3",
    category: "golf",
    categoryLabel: "골프 코칭",
    title: "구력 3년차 골퍼 싱글 진입 프로젝트",
    subtitle: "스윙 궤도 정밀 교정 12주 코스",
    tags: ["스윙 교정", "드라이버 비거리", "아이언 컨택", "구질 안정"],
    metrics: "평균 비거리 +28m · 핸디캡 18 → 8 달성",
    description: "고질적인 슬라이스 구질을 인앤아웃 스윙 궤도와 하체 턴 리듬 교정으로 드로우 구질 전환.",
  },
  {
    id: "p4",
    category: "golf",
    categoryLabel: "골프 코칭",
    title: "초보 비즈니스 골퍼 8주 머리올리기 완성",
    subtitle: "실전 필드 매너 & 코스 매니지먼트",
    tags: ["비즈니스 골프", "숏게임", "퍼팅 라인", "멘탈 관리"],
    metrics: "첫 라운드 100타 돌파 · 수강생 만족도 최상",
    description: "어프로치 거리감 훈련과 실전 룰·에티켓 교육을 병행하여 당당하고 매너 있는 골퍼로 육성.",
  },
  {
    id: "p5",
    category: "korean",
    categoryLabel: "한국어 교육",
    title: "외국계 IT 기업 임원 비즈니스 한국어",
    subtitle: "맞춤형 1:1 회화 및 프레젠테이션 코칭",
    tags: ["비즈니스 한국어", "발음 교정", "미팅 스피치", "전문 용어"],
    metrics: "한국어 회의 주재 가능 수준 달성",
    description: "한국 특유의 비즈니스 뉘앙스와 존댓말 체계를 체계적으로 습득하여 사내 신뢰도 향상.",
  },
  {
    id: "p6",
    category: "tech",
    categoryLabel: "웹·앱 개발",
    title: "전문직 프리미엄 고객 관리 & 예약 시스템",
    subtitle: "Next.js 기반 고성능 반응형 웹 솔루션",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "자동화"],
    metrics: "페이지 로딩 0.6초 · 모바일 상담 전환율 2.5배",
    description: "모바일 퍼스트 UX와 카카오톡 자동 알림 연동을 통해 수기 예약 업무를 100% 전산화.",
  },
]

export default function ProofSection() {
  const [filter, setFilter] = useState<string>("all")

  const filteredItems =
    filter === "all"
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((item) => item.category === filter)

  return (
    <section id="proof" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200/80">
      {/* 핵심 신뢰 지표 카운터 바 (화이트 글래스 & 스카이 악센트) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-20">
        <div className="p-6 rounded-2xl bg-white/85 border border-slate-200/90 text-center space-y-1 shadow-md backdrop-blur-md">
          <div className="text-3xl sm:text-4xl font-black text-sky-700">80+</div>
          <div className="text-xs sm:text-sm font-bold text-slate-800">공간 시공 완공</div>
          <div className="text-[11px] text-slate-500 font-medium">주거 및 상업 공간 프로젝트</div>
        </div>
        <div className="p-6 rounded-2xl bg-white/85 border border-slate-200/90 text-center space-y-1 shadow-md backdrop-blur-md">
          <div className="text-3xl sm:text-4xl font-black text-sky-700">3,200+</div>
          <div className="text-xs sm:text-sm font-bold text-slate-800">골프 코칭 시간</div>
          <div className="text-[11px] text-slate-500 font-medium">KPGA 준회원 1:1 맞춤 지도</div>
        </div>
        <div className="p-6 rounded-2xl bg-white/85 border border-slate-200/90 text-center space-y-1 shadow-md backdrop-blur-md">
          <div className="text-3xl sm:text-4xl font-black text-sky-700">99.4%</div>
          <div className="text-xs sm:text-sm font-bold text-slate-800">수강 만족도</div>
          <div className="text-[11px] text-slate-500 font-medium">공인 한국어교원 지도</div>
        </div>
        <div className="p-6 rounded-2xl bg-white/85 border border-slate-200/90 text-center space-y-1 shadow-md backdrop-blur-md">
          <div className="text-3xl sm:text-4xl font-black text-sky-700">100%</div>
          <div className="text-xs sm:text-sm font-bold text-slate-800">책임 완수율</div>
          <div className="text-[11px] text-slate-500 font-medium">직영 관리 및 단독 풀스택 빌드</div>
        </div>
      </div>

      {/* 갤러리 헤더 및 필터 버튼 */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <span className="text-xs font-bold tracking-widest text-sky-700 uppercase font-mono">
            Selected Works & Case Studies
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
            결과로 증명하는 포트폴리오
          </h3>
          <p className="text-slate-600 text-sm mt-1 font-medium">
            각 분야의 실제 수행 사례와 문제 해결 과정을 확인해 보세요.
          </p>
        </div>

        {/* 필터 칩 */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: "all", label: "전체보기" },
            { id: "interior", label: "공간 디자인" },
            { id: "golf", label: "골프 코칭" },
            { id: "korean", label: "한국어 교육" },
            { id: "tech", label: "웹·앱 개발" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all min-h-[38px] ${
                filter === tab.id
                  ? "bg-sky-600 text-white shadow-md font-bold"
                  : "bg-white/80 text-slate-600 hover:text-slate-900 border border-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 포트폴리오 카드 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group relative rounded-2xl bg-white/85 border border-slate-200/90 hover:border-sky-400 p-6 flex flex-col justify-between transition-all duration-300 hover:translate-y-[-2px] shadow-md backdrop-blur-md"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-sky-800 px-2.5 py-1 bg-sky-100 rounded-md border border-sky-200">
                  {item.categoryLabel}
                </span>
                <span className="text-[11px] font-mono text-slate-500 font-semibold">
                  {item.metrics}
                </span>
              </div>

              <h4 className="text-lg font-black text-slate-900 group-hover:text-sky-700 transition-colors">
                {item.title}
              </h4>
              <p className="text-xs text-sky-700 font-semibold mb-3">
                {item.subtitle}
              </p>
              <p className="text-xs text-slate-600 leading-relaxed mb-4 font-medium">
                {item.description}
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-200">
                {item.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] px-2 py-0.5 rounded bg-sky-50 text-sky-800 border border-sky-100 font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
