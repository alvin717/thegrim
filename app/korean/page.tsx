import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import FloatingContactBar from "@/components/floating-contact-bar"
import ContactSection from "@/components/contact-section"
import Link from "next/link"

export const metadata: Metadata = {
  title: "공인 한국어 교육 & 비즈니스 코칭 | 더 그림 (THE GRIM)",
  description:
    "공인 한국어교원 직강! 외국인 주재원 비즈니스 회화부터 TOPIK 고득점 합격까지, 1:1 맞춤형 발음 교정과 문화 연계 강의",
}

// 3대 교육 과정
const KOREAN_COURSES = [
  {
    title: "글로벌 기업 주재원 비즈니스 속성반",
    badge: "기업 임직원 추천",
    target: "한국 지사 파견 주재원, 글로벌 기업 외국인 임원 및 실무진",
    features: [
      "한국 비즈니스 격식체(하십시오체/해요체)와 공문서 이메일 작성법",
      "한국 특유의 회의 문화, 결재 보고, 거래처 미팅 실전 시뮬레이션",
      "회식 에티켓 및 직장 동료와의 자연스러운 스몰토크 노하우",
    ],
    format: "1:1 대면 방문 / 온라인 Zoom / 기업 사내 단체 출강",
    accent: "border-blue-500/30",
  },
  {
    title: "TOPIK I · II 고득점 단기 합격반",
    badge: "유학생 / 취업 준비생",
    target: "국내 대학(원) 진학 및 E-7 비자, 영주권 취득을 준비하는 분",
    features: [
      "최신 5개년 기출 경향 분석 및 빈출 어휘·문법 압축 마스터",
      "가장 점수가 안 나오는 53·54번 쓰기(작문) 1:1 첨삭 지도",
      "실전 모의고사 풀이 및 시간 분배 테크닉 집중 훈련",
    ],
    format: "주 2~3회 집중 과외 + 매주 작문 1:1 정밀 피드백",
    accent: "border-indigo-500/50 bg-blue-950/20",
  },
  {
    title: "K-컬처 연계 실전 일상 회화 & 발음 클리닉",
    badge: "회화 중심 / 초·중급",
    target: "K-드라마·K-POP 팬 및 한국 생활 적응이 필요한 외국인 거주자",
    features: [
      "한국인이 실제 사용하는 트렌디한 자연스러운 구어체 표현 습득",
      "외국인이 가장 어려워하는 평음·경음·격음(ㄱ-ㄲ-ㅋ) 조음 위치 정밀 교정",
      "상황별 롤플레잉(식당, 병원, 은행, 부동산, 여행 등) 체험형 수업",
    ],
    format: "1:1 맞춤 진도 or 2~3인 소그룹 회화 클래스",
    accent: "border-blue-500/30",
  },
]

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
    <div className="min-h-screen bg-[#1e2a22] text-[#dad7cd] selection:bg-[#a3b18a] selection:text-[#1e2a22]">
      <Navbar />

      {/* 1. 히어로 섹션 */}
      <section className="relative pt-36 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* 세이지/블루-그린 배경 블러 */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#588157]/15 blur-[130px] rounded-full pointer-events-none" />

        <div className="relative z-10 text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#344e41] border border-[#588157]/50 text-[#dad7cd] text-xs font-bold tracking-wider uppercase">
            <span>🇰🇷 국가공인 한국어교원 직강</span>
            <span>·</span>
            <span>다국적 수강생 지도</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.2]">
            언어를 넘어 문화와 마음을 전하는
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-indigo-300 to-sky-400">
              전문 한국어 맞춤 강의
            </span>
          </h1>

          <p className="text-zinc-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            딱딱한 문법 암기는 그만! 학습자의 직업과 관심사에 맞춘 실전 비즈니스 회화부터
            정밀 발음 교정, TOPIK 합격까지 체계적인 1:1 맞춤 솔루션을 제공합니다.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <a
              href="#courses"
              className="px-6 py-3.5 rounded-xl bg-white text-zinc-950 font-bold text-sm hover:bg-zinc-200 transition-all shadow-lg active:scale-95 min-h-[44px] flex items-center gap-2"
            >
              <span>교육 과정 둘러보기</span>
              <span>↓</span>
            </a>
            <a
              href="#contact"
              className="px-6 py-3.5 rounded-xl bg-zinc-850 hover:bg-zinc-800 text-white font-bold text-sm border border-zinc-700 transition-all min-h-[44px] flex items-center gap-2"
            >
              <span>무료 레벨 테스트 & 상담</span>
              <span>→</span>
            </a>
          </div>

          {/* 핵심 지표 */}
          <div className="grid grid-cols-3 gap-4 pt-12 max-w-2xl mx-auto border-t border-zinc-800/80">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white">100%</div>
              <div className="text-xs text-zinc-400 mt-1">공인 교원 직강</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-400">99.4%</div>
              <div className="text-xs text-zinc-400 mt-1">수강생 수업 만족도</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white">온·오프라인</div>
              <div className="text-xs text-zinc-400 mt-1">전국/해외 Zoom 연동</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 3대 교육 과정 */}
      <section id="courses" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-zinc-900">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-blue-400 tracking-widest uppercase">
            Curriculum
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            수강생 목적별 체계적 교육 과정
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            비즈니스 실무부터 자격증 시험, 일상 대화까지 최적화된 로드맵을 제시합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {KOREAN_COURSES.map((course, idx) => (
            <div
              key={idx}
              className={`rounded-2xl bg-zinc-900/80 border ${course.accent} hover:border-blue-400/60 transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between space-y-6 group hover:-translate-y-1`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-blue-500/10 text-blue-300 border border-blue-500/20">
                    {course.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-200 transition-colors">
                    {course.title}
                  </h3>
                  <div className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
                    🎯 대상: {course.target}
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                    주요 커리큘럼 특징
                  </div>
                  <ul className="space-y-2">
                    {course.features.map((item, fIdx) => (
                      <li key={fIdx} className="text-xs text-zinc-300 flex items-start gap-2">
                        <span className="text-blue-400 font-bold">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-800 text-xs text-blue-300 font-semibold bg-blue-950/20 p-3 rounded-xl border border-blue-900/40">
                📌 수업 방식: {course.format}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. 지도 철학 및 차별점 */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-zinc-900">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-blue-400 tracking-widest uppercase">
            Why The Grim
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            왜 더그림 한국어 교육을 선택할까요?
          </h2>
          <p className="text-zinc-400 text-sm">
            단순 원어민 대화가 아닌, 검증된 교육학적 접근으로 언어 습득 시간을 절반으로 줄여드립니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TEACHING_POINTS.map((point, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-3"
            >
              <div className="text-xl font-mono font-bold text-blue-400">
                0{idx + 1}
              </div>
              <h3 className="text-base font-bold text-white">
                {point.title}
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {point.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. 마이페이지 연동 안내 */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-blue-950/30 via-zinc-900 to-zinc-900 border border-blue-900/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
              Student MyPage Support
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              수강생 전용 자료실 (교재 & 원어민 MP3)
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              수강 등록 시 로그인 후 마이페이지에서 매 수업의 복습 교재와 음원 파일을 언제든 다운로드하여 복습할 수 있습니다.
            </p>
          </div>
          <Link
            href="/mypage"
            className="px-6 py-3.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-bold text-xs sm:text-sm whitespace-nowrap transition-colors min-h-[44px] flex items-center justify-center"
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
  )
}
