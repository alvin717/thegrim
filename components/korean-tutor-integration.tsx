"use client"

import { useState } from "react"

// 퀴즈 및 한글 샘플 데이터
interface HangeulQuiz {
  vowel: string
  sound: string
  words: { word: string; meaning: string; roman: string }[]
  quizQuestion: string
  quizOptions: string[]
  quizAnswer: number
}

const HANGEUL_SAMPLES: HangeulQuiz[] = [
  {
    vowel: "ㅏ",
    sound: "[a]",
    words: [
      { word: "아이", meaning: "Child", roman: "a-i" },
      { word: "바다", meaning: "Sea / Ocean", roman: "ba-da" },
    ],
    quizQuestion: "'아이'의 올바른 뜻은 무엇일까요?",
    quizOptions: ["바다 (Sea)", "아이 (Child)", "나무 (Tree)", "물 (Water)"],
    quizAnswer: 1,
  },
  {
    vowel: "ㅗ",
    sound: "[o]",
    words: [
      { word: "오이", meaning: "Cucumber", roman: "o-i" },
      { word: "모자", meaning: "Hat / Cap", roman: "mo-ja" },
    ],
    quizQuestion: "'오이'의 올바른 뜻은 무엇일까요?",
    quizOptions: ["오이 (Cucumber)", "사과 (Apple)", "우유 (Milk)", "모자 (Hat)"],
    quizAnswer: 0,
  },
  {
    vowel: "ㅜ",
    sound: "[u]",
    words: [
      { word: "우유", meaning: "Milk", roman: "u-yu" },
      { word: "구두", meaning: "Dress shoes", roman: "gu-du" },
    ],
    quizQuestion: "'우유'의 올바른 뜻은 무엇일까요?",
    quizOptions: ["물 (Water)", "주스 (Juice)", "우유 (Milk)", "커피 (Coffee)"],
    quizAnswer: 2,
  },
]

export default function KoreanTutorIntegration() {
  // 5대 탭 시스템
  const [activeTab, setActiveTab] = useState<
    "simulator" | "curriculum" | "srs" | "gamification" | "architecture"
  >("simulator")

  // 모바일 인터랙티브 시뮬레이터 상태
  const [quizIdx, setQuizIdx] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null)
  const [hearts, setHearts] = useState(5)
  const [streak, setStreak] = useState(7)
  const [xp, setXp] = useState(145)

  // SRS 시뮬레이터 슬라이더 상태
  const [reviewCount, setReviewCount] = useState(3)
  const [difficulty, setDifficulty] = useState(5) // 1~10

  const handleSelectAnswer = (idx: number) => {
    setSelectedAnswer(idx)
    const currentQ = HANGEUL_SAMPLES[quizIdx]
    if (idx === currentQ.quizAnswer) {
      setIsAnswerCorrect(true)
      setXp((prev) => prev + 25)
    } else {
      setIsAnswerCorrect(false)
      setHearts((prev) => Math.max(0, prev - 1))
    }
  }

  const handleNextQuiz = () => {
    setSelectedAnswer(null)
    setIsAnswerCorrect(null)
    setQuizIdx((prev) => (prev + 1) % HANGEUL_SAMPLES.length)
  }

  // FSRS 기억 회상도(Retrievability) 간이 계산: R = exp( - t / S )
  const calculatedInterval = Math.round(Math.pow(2.2, reviewCount) * (1 - difficulty * 0.05))
  const calculatedRetention = Math.min(99, Math.max(40, 100 - difficulty * 5 + reviewCount * 4))

  return (
    <section id="klingo-platform" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200">
      {/* 상단 통합 브랜딩 헤더 */}
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-900 text-xs font-bold border border-blue-200 shadow-sm">
          <span>🚀 K-Lingo × THE GRIM</span>
          <span>·</span>
          <span>스마트 한국어 학습 플랫폼 통합</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          에듀테크 기술과 접목된 스마트 K-Lingo 시스템
        </h2>

        <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed">
          국가공인 한국어교원의 1:1 심층 티칭 노하우와 검증된 K-Lingo 에듀테크 시스템이 하나로 결합되었습니다.
          <br className="hidden sm:inline" />
          스마트폰 앱 시뮬레이터와 망각곡선 반복 학습(SRS), 게이미피케이션 커리큘럼을 직접 체험해 보세요.
        </p>

        {/* 오리지널 사이트 외부 링크 버튼 */}
        <div className="pt-2 flex justify-center">
          <a
            href="https://korean-tutor-weld.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all active:scale-95 group"
          >
            <span>🌐 K-Lingo 오리지널 웹앱 새 창으로 열기</span>
            <span className="group-hover:translate-x-1 transition-transform">↗</span>
          </a>
        </div>
      </div>

      {/* 5대 핵심 탭 내비게이션 */}
      <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-4xl mx-auto">
        {[
          { key: "simulator", label: "📱 모바일 인터랙티브 퀴즈 체험", icon: "✨" },
          { key: "curriculum", label: "📚 초·중급 정밀 커리큘럼 명세", icon: "📖" },
          { key: "srs", label: "🧠 망각곡선 간격 반복(SRS) 알고리즘", icon: "📈" },
          { key: "gamification", label: "🏆 행동심리학 기반 게이미피케이션", icon: "🎮" },
          { key: "architecture", label: "⚙️ 에듀테크 시스템 아키텍처", icon: "🏗️" },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 shadow-sm min-h-[44px] ${
              activeTab === tab.key
                ? "bg-blue-600 text-white shadow-md scale-105"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ================================================================= */}
      {/* 탭 1: 모바일 인터랙티브 시뮬레이터 */}
      {/* ================================================================= */}
      {activeTab === "simulator" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl">
          {/* 좌측 설명 */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
              DUOLINGO-STYLE INTERACTIVE LEARNING
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
              몰입감을 높이는 3분 스피드 드릴
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              지루한 문법 주입식 교육이 아닌, 손실 회피 심리와 보상 루프를 적용하여
              하루 3분만 투자해도 머릿속에 오래 남는 인터랙티브 한글 학습 환경을 제공합니다.
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-xl">🔥</span>
                <div className="text-xs">
                  <strong className="text-slate-900 block font-bold">7일 연속 학습 스트릭</strong>
                  <span className="text-slate-500">매일 연속으로 학습을 완료하면 보너스 경험치(XP)와 보물상자 지급</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-xl">❤️</span>
                <div className="text-xs">
                  <strong className="text-slate-900 block font-bold">하트 시스템 (5/5)</strong>
                  <span className="text-slate-500">오답 시 하트가 차감되며 집중력을 유도하고 자연스러운 복습을 지원</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-xl">🎯</span>
                <div className="text-xs">
                  <strong className="text-slate-900 block font-bold">원어민 조음 발음 & 실시간 퀴즈</strong>
                  <span className="text-slate-500">오른쪽 스마트폰 화면에서 직접 퀴즈를 풀고 경험치를 올려보세요!</span>
                </div>
              </div>
            </div>
          </div>

          {/* 우측 스마트폰 시뮬레이터 목업 */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-[340px] rounded-[40px] p-3 bg-slate-900 shadow-2xl border-4 border-slate-800">
              {/* 스피커 & 노치 */}
              <div className="w-24 h-4 bg-slate-800 rounded-full mx-auto mb-3" />

              {/* 스마트폰 화면 내부 */}
              <div className="bg-slate-50 rounded-[30px] p-5 space-y-4 border border-slate-200 min-h-[480px] flex flex-col justify-between">
                {/* 스마트폰 상단 상태바 */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 text-xs font-black">
                  <div className="flex items-center gap-1 text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full">
                    <span>🔥</span>
                    <span>{streak}일</span>
                  </div>
                  <div className="flex items-center gap-1 text-red-600 bg-red-100 px-2 py-0.5 rounded-full">
                    <span>❤️</span>
                    <span>{hearts}</span>
                  </div>
                  <div className="flex items-center gap-1 text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
                    <span>⚡</span>
                    <span>{xp} XP</span>
                  </div>
                </div>

                {/* 퀴즈 본문 */}
                <div className="space-y-4 flex-1">
                  <div className="text-center space-y-1">
                    <span className="text-[11px] font-bold text-blue-600 uppercase">
                      Unit 1 · 기초 모음 레슨
                    </span>
                    <div className="w-16 h-16 rounded-2xl bg-white border border-blue-200 shadow-md flex items-center justify-center mx-auto text-3xl font-black text-blue-700">
                      {HANGEUL_SAMPLES[quizIdx].vowel}
                    </div>
                    <div className="text-xs text-slate-500 font-mono">
                      발음: {HANGEUL_SAMPLES[quizIdx].sound}
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-200 text-center">
                    <p className="text-xs font-bold text-slate-800">
                      {HANGEUL_SAMPLES[quizIdx].quizQuestion}
                    </p>
                  </div>

                  {/* 보기 버튼들 */}
                  <div className="grid grid-cols-2 gap-2">
                    {HANGEUL_SAMPLES[quizIdx].quizOptions.map((opt, oIdx) => {
                      let btnStyle = "bg-white text-slate-700 border-slate-200 hover:border-blue-400"
                      if (selectedAnswer !== null) {
                        if (oIdx === HANGEUL_SAMPLES[quizIdx].quizAnswer) {
                          btnStyle = "bg-emerald-500 text-white border-emerald-600 shadow-md"
                        } else if (selectedAnswer === oIdx) {
                          btnStyle = "bg-red-500 text-white border-red-600"
                        }
                      }

                      return (
                        <button
                          key={oIdx}
                          type="button"
                          onClick={() => handleSelectAnswer(oIdx)}
                          disabled={selectedAnswer !== null}
                          className={`p-2.5 rounded-xl border text-xs font-bold transition-all min-h-[44px] flex items-center justify-center text-center ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      )
                    })}
                  </div>

                  {/* 정답/오답 피드백 */}
                  {selectedAnswer !== null && (
                    <div
                      className={`p-3 rounded-xl text-xs font-bold text-center animate-fade-in ${
                        isAnswerCorrect
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                          : "bg-red-100 text-red-800 border border-red-200"
                      }`}
                    >
                      {isAnswerCorrect ? "🎉 정답입니다! (+25 XP 획득)" : "😢 아쉽네요! 다시 기억해 보세요."}
                    </div>
                  )}
                </div>

                {/* 다음 문제 버튼 */}
                {selectedAnswer !== null && (
                  <button
                    type="button"
                    onClick={handleNextQuiz}
                    className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all active:scale-95"
                  >
                    다음 레슨으로 이동 →
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* 탭 2: 초·중급 정밀 커리큘럼 명세 */}
      {/* ================================================================= */}
      {activeTab === "curriculum" && (
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-8 animate-fade-in">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">
              CURRICULUM SPECIFICATIONS (CEFR A1 / TOPIK LEVEL 1)
            </span>
            <h3 className="text-2xl font-black text-slate-900 mt-1">
              한글 창제 원리부터 TOPIK 1급 완성까지
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              총 10개 유닛과 41개 레슨으로 구성된 과학적 표준 교육과정입니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 유닛 1 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-blue-100 text-blue-800">
                  Unit 1 · 기초 모음 & 자음
                </span>
                <span className="text-xs text-slate-500 font-semibold">5개 레슨</span>
              </div>
              <h4 className="text-lg font-black text-slate-900">
                한글의 탄생 원리와 기본 10모음·14자음
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">·</span>
                  <span><strong>천지인(天地人) 원리:</strong> 하늘(·), 땅(ㅡ), 사람(ㅣ)의 상형 원리로 배우는 모음(ㅏ, ㅓ, ㅗ, ㅜ, ㅡ, ㅣ)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">·</span>
                  <span><strong>발음 기관 상형 자음:</strong> 입술, 혀, 목구멍 모양을 본뜬 ㄱ, ㄴ, ㅁ, ㅅ, ㅇ 기본 5자</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">·</span>
                  <span><strong>기초 필수 단어:</strong> 아이, 오이, 우유, 모자, 바다, 나무 등 실생활 단어 40개 완성</span>
                </li>
              </ul>
            </div>

            {/* 유닛 2 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-indigo-100 text-indigo-800">
                  Unit 2 · 받침(종성) & 연음 법칙
                </span>
                <span className="text-xs text-slate-500 font-semibold">6개 레슨</span>
              </div>
              <h4 className="text-lg font-black text-slate-900">
                7대 대표 받침과 한국어 자연스러운 발음 연음
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 font-bold">·</span>
                  <span><strong>7종성 원리:</strong> ㄱ, ㄴ, ㄷ, ㄹ, ㅁ, ㅂ, ㅇ 7가지 소리로 정리되는 받침 메커니즘</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 font-bold">·</span>
                  <span><strong>연음 현상 (Liaison):</strong> '한국어' → [한구거], '집에' → [지베] 실제 원어민 연음 마스터</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 font-bold">·</span>
                  <span><strong>어려운 음운 규칙 정복:</strong> 비음화, 유음화, 구개음화 등 외국인이 헷갈리는 발음 완벽 정리</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* 탭 3: 적응형 망각곡선 간격 반복(SRS) 알고리즘 */}
      {/* ================================================================= */}
      {activeTab === "srs" && (
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-8 animate-fade-in">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">
              ADAPTIVE SPACED REPETITION SYSTEM (FSRS v4)
            </span>
            <h3 className="text-2xl font-black text-slate-900 mt-1">
              에빙하우스 망각곡선을 이기는 최적의 복습 타이밍
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              학습자가 단어를 잊어버리기 직전(회상도 90% 시점)에 정확히 복습 퀴즈를 제시하는 알고리즘입니다.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* 공식 설명 */}
            <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-4">
              <h4 className="text-base font-bold text-sky-400">FSRS 알고리즘 핵심 변수</h4>
              <div className="space-y-2 text-xs text-slate-300">
                <div>
                  <strong className="text-white block font-mono">1. Difficulty (D: 난이도)</strong>
                  단어의 구조적 복잡도 및 학습자의 이전 오답 빈도
                </div>
                <div>
                  <strong className="text-white block font-mono">2. Stability (S: 기억 안정도)</strong>
                  기억이 유지되는 기간 (일 단위)
                </div>
                <div>
                  <strong className="text-white block font-mono">3. Retrievability (R: 기억 인출율)</strong>
                  현재 시점에서 단어를 올바르게 기억해낼 확률
                </div>
              </div>
            </div>

            {/* 인터랙티브 계산기 */}
            <div className="p-6 rounded-2xl bg-blue-50 border border-blue-200 space-y-5">
              <h4 className="text-sm font-bold text-slate-900">
                📊 라이브 SRS 복습 주기 시뮬레이터
              </h4>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs text-slate-700 font-semibold mb-1">
                    <span>누적 복습 횟수</span>
                    <span className="text-blue-700 font-bold">{reviewCount}회</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="6"
                    value={reviewCount}
                    onChange={(e) => setReviewCount(Number(e.target.value))}
                    className="w-full accent-blue-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-700 font-semibold mb-1">
                    <span>단어 난이도 (1: 매우 쉬움 ~ 10: 어려움)</span>
                    <span className="text-blue-700 font-bold">{difficulty}단계</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={difficulty}
                    onChange={(e) => setDifficulty(Number(e.target.value))}
                    className="w-full accent-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-blue-200">
                <div className="p-3 bg-white rounded-xl text-center">
                  <span className="text-[10px] text-slate-500 font-bold block">다음 추천 복습 간격</span>
                  <span className="text-xl font-black text-blue-700">{calculatedInterval}일 뒤</span>
                </div>
                <div className="p-3 bg-white rounded-xl text-center">
                  <span className="text-[10px] text-slate-500 font-bold block">기억 유지율(예측)</span>
                  <span className="text-xl font-black text-emerald-600">{calculatedRetention}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* 탭 4: 행동심리학 기반 게이미피케이션 */}
      {/* ================================================================= */}
      {activeTab === "gamification" && (
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-6 animate-fade-in">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">
              BEHAVIORAL PSYCHOLOGY GAMIFICATION
            </span>
            <h3 className="text-2xl font-black text-slate-900 mt-1">
              포기하지 않고 끝까지 공부하게 만드는 심리학 설계
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 space-y-3">
              <span className="text-2xl">🛡️</span>
              <h4 className="text-base font-bold text-slate-900">
                손실 회피 심리 (Loss Aversion)
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                행동경제학자 카너먼&트버스키의 연구에 따르면, 사람은 100달러를 얻을 때의 기쁨보다 100달러를 잃을 때의 고통을 2배 더 크게 느낍니다.
                연속 학습 스트릭과 스트릭 프리즈(보호권)를 통해 하루라도 공부를 거르지 않는 습관을 형성합니다.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-purple-50 border border-purple-200 space-y-3">
              <span className="text-2xl">🎁</span>
              <h4 className="text-base font-bold text-slate-900">
                가변 보상 루프 (Variable Ratio Schedule)
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                B.F. 스키너의 조작적 조건화 원리에 따라, 고정된 보상보다 무작위로 터지는 일일 보물상자와 깜짝 젬 부스터가 도파민 분비를 자극하여 지속적인 자기주도 학습을 촉진합니다.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* 탭 5: 에듀테크 시스템 아키텍처 */}
      {/* ================================================================= */}
      {activeTab === "architecture" && (
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-6 animate-fade-in">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">
              SYSTEM ARCHITECTURE & INFRASTRUCTURE
            </span>
            <h3 className="text-2xl font-black text-slate-900 mt-1">
              안정적인 글로벌 서비스 인프라 구성
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-blue-700">Client Tier</span>
              <h5 className="font-bold text-slate-900 text-sm">React / Next.js / PWA</h5>
              <p className="text-[11px] text-slate-500">
                오프라인 캐싱 지원 (IndexedDB & Service Worker), 초저지연 모바일 최적화 반응형 UI
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-blue-700">Audio / Speech</span>
              <h5 className="font-bold text-slate-900 text-sm">Web Audio API & STT</h5>
              <p className="text-[11px] text-slate-500">
                수강생의 한국어 발음 음파 분석 및 실시간 조음 오류 피드백 엔진 탑재
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-blue-700">Edge & Security</span>
              <h5 className="font-bold text-slate-900 text-sm">Cloudflare + Vercel Edge</h5>
              <p className="text-[11px] text-slate-500">
                전 세계 해외 주재원 및 유학생 어디서나 1초 미만 응답 속도 보장
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
