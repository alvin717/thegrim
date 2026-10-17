import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import FloatingContactBar from "@/components/floating-contact-bar"
import ContactSection from "@/components/contact-section"
import Link from "next/link"

export const metadata: Metadata = {
  title: "골프 세미프로 1:1 맞춤 레슨 | 더 그림 (THE GRIM)",
  description:
    "KPGA 준회원 직강! 초고속 스윙 궤도 분석을 통해 부상 없이 비거리를 늘리고 슬라이스를 잡는 1:1 맞춤 골프 코칭",
}

// 3대 핵심 레슨 프로그램
const LESSON_PROGRAMS = [
  {
    title: "골린이 8주 완성 입문 마스터",
    badge: "입문 / 초급 추천",
    target: "처음 골프채를 잡는 비기너 & 기초가 흔들리는 초보 골퍼",
    duration: "총 8주 (주 2회, 회당 50분)",
    keyPoints: [
      "각자 체형에 맞는 자연스러운 뉴트럴 그립 & 어드레스 정립",
      "똑딱이 탈출 후 7번 아이언 및 드라이버 풀스윙 폼 완성",
      "골프 룰, 에티켓, 필드 기본 소양 원스톱 교육",
    ],
    outcome: "8주 후 첫 머리 올리기(정규 홀 라운드) 완벽 준비",
    accent: "border-emerald-500/30",
  },
  {
    title: "슬라이스 탈출 & 비거리 +20m 파워 임팩트",
    badge: "가장 높은 수강 만족도",
    target: "고질적인 우측 슬라이스나 비거리 정체로 고민하는 아마추어",
    duration: "총 4~6주 (주 1~2회 집중 교정)",
    keyPoints: [
      "아웃-인 궤도를 인-아웃 드로우 구질로 전환하는 릴리즈 드릴",
      "지면 반발력과 힙 턴을 활용한 폭발적인 헤드 스피드 생성",
      "임팩트 구간에서의 척추각 유지 및 핸드퍼스트 타격 교정",
    ],
    outcome: "드라이버 비거리 평균 20~30m 증가 & 페어웨이 안착률 급상승",
    accent: "border-teal-500/50 bg-emerald-950/20",
  },
  {
    title: "싱글 진입 숏게임 & 18홀 필드 매니지먼트",
    badge: "중·상급자 필독 코스",
    target: "보기 플레이어(80~90대 타수)에서 70대 싱글 타수를 노리는 분",
    duration: "원포인트 + 18홀 필드 동반 레슨",
    keyPoints: [
      "30~70m 거리별 웨지 거리감 세분화 및 핀 하이 공략",
      "벙커 탈출 원샷 공식 및 그린 주변 로우 리스크 어프로치",
      "트러블 라이(경사지) 탈출 샷 및 바람/핀 위치 코스 전략",
    ],
    outcome: "스코어를 잃지 않는 단단한 위기관리 능력 및 라베(라이프 베스트) 달성",
    accent: "border-emerald-500/30",
  },
]

// 스윙 교정 전/후 데이터
const STATS_BEFORE_AFTER = [
  {
    title: "30대 직장인 김O수 님",
    issue: "악성 슬라이스 & 190m 비거리 정체",
    result: "안정적 페이드 구질 · 비거리 235m (+45m)",
    change: "105타 → 87타 달성 (3개월)",
  },
  {
    title: "40대 사업가 박O진 님",
    issue: "엎어 치는 스윙 궤도로 인한 엘보 통증",
    result: "지면 반발력 스윙으로 통증 해소 및 일관성 확보",
    change: "92타 → 첫 싱글 79타 기록",
  },
  {
    title: "20대 입문자 이O은 님",
    issue: "스윙 축이 무너져 헛스윙 및 탑볼 잦음",
    result: "예쁜 스윙 폼 장착 및 안정된 컨택트",
    change: "입문 2개월 만에 필드 108타 안착",
  },
]

export default function GolfPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-sky-200 selection:text-sky-900 relative">
      {/* 2번 이미지 배경 적용: '2번이미지 골프레슨' */}
      <div
        className="fixed inset-0 pointer-events-none z-0 bg-cover bg-center bg-no-repeat opacity-95"
        style={{ backgroundImage: "url('/images/bg/bg-golf.png')" }}
      />

      <div className="relative z-10">
        <Navbar />

        {/* 1. 히어로 섹션 */}
        <section className="relative pt-36 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
          <div className="relative z-10 text-center max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 border border-sky-300 text-sky-800 text-xs font-bold tracking-wider uppercase shadow-sm">
              <span>⛳ KPGA 준회원 프로 직강</span>
              <span>·</span>
              <span>2번 배경 이미지 적용</span>
              <span>·</span>
              <span>데이터 기반 1:1 맞춤 레슨</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.2]">
              몸에 억지로 맞추지 않는 스윙,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-blue-600 to-teal-600">
                평생 부상 없는 스윙 궤도의 완성
              </span>
            </h1>

            <p className="text-slate-700 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-medium">
              남의 스윙 폼을 무작정 흉내 내면 부상과 슬라이스만 남습니다.
              수강생의 체형, 유연성, 근력을 정밀 분석하여 가장 편안하면서도 폭발적인 비거리를 찾아드립니다.
            </p>

            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <a
                href="#programs"
                className="px-6 py-3.5 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-all shadow-lg active:scale-95 min-h-[44px] flex items-center gap-2"
              >
                <span>레슨 커리큘럼 확인하기</span>
                <span>↓</span>
              </a>
              <a
                href="#contact"
                className="px-6 py-3.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm shadow-md transition-all min-h-[44px] flex items-center gap-2"
              >
                <span>1:1 원포인트 레슨 신청</span>
                <span>→</span>
              </a>
            </div>

            {/* 핵심 지표 */}
            <div className="grid grid-cols-3 gap-4 pt-12 max-w-2xl mx-auto border-t border-slate-200">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900">3,200+</div>
                <div className="text-xs text-slate-500 font-semibold mt-1">누적 코칭 시간</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-sky-700">+25m</div>
                <div className="text-xs text-slate-500 font-semibold mt-1">평균 비거리 증가량</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900">99.2%</div>
                <div className="text-xs text-slate-500 font-semibold mt-1">수강생 만족도</div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. 3대 레슨 커리큘럼 프로그램 */}
        <section id="programs" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-sky-700 tracking-widest uppercase">
              Curriculum
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
              골퍼의 목표별 맞춤 레슨 코스
            </h2>
            <p className="text-slate-600 text-sm sm:text-base font-medium">
              단순 반복 연습이 아닌, 스윙 메커니즘의 원리를 깨우치는 과학적인 수업입니다.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {LESSON_PROGRAMS.map((program, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white/85 border border-slate-200/90 hover:border-sky-400 transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between space-y-6 group hover:-translate-y-1 shadow-md backdrop-blur-md"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-sky-100 text-sky-800 border border-sky-200">
                      {program.badge}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold">{program.duration}</span>
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-slate-900 group-hover:text-sky-700 transition-colors">
                      {program.title}
                    </h3>
                    <div className="text-xs text-slate-600 mt-1.5 leading-relaxed font-medium">
                      🎯 추천: {program.target}
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      핵심 트레이닝 내용
                    </div>
                    <ul className="space-y-2">
                      {program.keyPoints.map((point, pIdx) => (
                        <li key={pIdx} className="text-xs text-slate-700 font-medium flex items-start gap-2">
                          <span className="text-sky-600 font-bold">✓</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 text-xs text-sky-800 font-bold bg-sky-50 p-3 rounded-xl border border-sky-100">
                  🏆 목표 성과: {program.outcome}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. 스윙 데이터 분석 및 실제 교정 후기 */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-sky-700 tracking-widest uppercase">
              Proof of Result
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
              실제 수강생의 스윙 변화 & 타수 기록
            </h2>
            <p className="text-slate-600 text-sm font-medium">
              감에만 의존하지 않고, 초고속 카메라와 론치 모니터 데이터로 입증합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STATS_BEFORE_AFTER.map((stat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white/85 border border-slate-200 shadow-md backdrop-blur-md space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">{stat.title}</span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold border border-slate-200">
                    실제 사례
                  </span>
                </div>

                <div className="text-xs text-red-700 bg-red-50 p-2.5 rounded-lg border border-red-200 font-medium">
                  <span className="font-bold">레슨 전: </span>
                  {stat.issue}
                </div>

                <div className="text-xs text-sky-800 bg-sky-50 p-2.5 rounded-lg border border-sky-200 font-medium">
                  <span className="font-bold">레슨 후: </span>
                  {stat.result}
                </div>

                <div className="pt-2 text-center text-xs font-black text-slate-900 bg-slate-100 py-2 rounded-xl border border-slate-200">
                  ✨ {stat.change}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. 레슨 진행 방식 안내 */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="p-8 sm:p-10 rounded-3xl bg-white/85 border border-slate-200 shadow-xl backdrop-blur-md space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
              <div>
                <span className="text-xs font-bold text-sky-700 uppercase tracking-widest">
                  Lesson Workflow
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                  레슨 진행 및 피드백 시스템
                </h3>
              </div>
              <span className="text-xs text-slate-600 bg-slate-100 font-semibold px-3 py-1.5 rounded-lg border border-slate-200">
                마이페이지 스윙 영상 제공
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="font-bold text-sky-800">1. 스윙 궤도 촬영</div>
                <p className="text-slate-600 font-medium">초고속 카메라로 정면·측면 스윙 폼과 임팩트 앵글 정밀 진단</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="font-bold text-sky-800">2. 원포인트 솔루션</div>
                <p className="text-slate-600 font-medium">문제점 1~2개에만 집중하여 현장에서 즉시 구질 변화 체감</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="font-bold text-sky-800">3. 개인 맞춤 연습 루틴</div>
                <p className="text-slate-600 font-medium">혼자 연습할 때 잘못된 동작이 나오지 않도록 드릴(Drill) 전수</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="font-bold text-sky-800">4. 온라인 마이페이지 리포트</div>
                <p className="text-slate-600 font-medium">레슨 영상과 교정 코멘트를 홈페이지 마이페이지에서 언제든 복습</p>
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
