"use client"

import { useState, useEffect, useRef } from "react"

export interface KoreanCourse {
  id: string
  title: string
  badge: string
  target: string
  features: string[]
  format: string
  defaultImage: string
  customImage?: string
  imageCaption: string
  studentStory?: string
}

const INITIAL_COURSES: KoreanCourse[] = [
  {
    id: "business",
    title: "글로벌 기업 주재원 비즈니스 속성반",
    badge: "기업 임직원 추천",
    target: "한국 지사 파견 주재원, 글로벌 기업 외국인 임원 및 실무진",
    features: [
      "한국 비즈니스 격식체(하십시오체/해요체)와 공문서 이메일 작성법",
      "한국 특유의 회의 문화, 결재 보고, 거래처 미팅 실전 시뮬레이션",
      "회식 에티켓 및 직장 동료와의 자연스러운 스몰토크 노하우",
    ],
    format: "1:1 대면 방문 / 온라인 Zoom / 기업 사내 단체 출강",
    defaultImage: "/images/korean/class_business.jpg",
    imageCaption: "글로벌 IT 기업 외국인 총괄이사 1:1 비즈니스 회화 수료",
    studentStory: "3개월 집중 수강 후 한국 본사 임원 회의에서 통역 없이 발표 성공",
  },
  {
    id: "topik",
    title: "TOPIK I · II 고득점 단기 합격반",
    badge: "유학생 / 취업 준비생",
    target: "국내 대학(원) 진학 및 E-7 비자, 영주권 취득을 준비하는 분",
    features: [
      "최신 5개년 기출 경향 분석 및 빈출 어휘·문법 압축 마스터",
      "가장 점수가 안 나오는 53·54번 쓰기(작문) 1:1 첨삭 지도",
      "실전 모의고사 풀이 및 시간 분배 테크닉 집중 훈련",
    ],
    format: "주 2~3회 집중 과외 + 매주 작문 1:1 정밀 피드백",
    defaultImage: "/images/korean/class_topik.jpg",
    imageCaption: "TOPIK II 6급 고득점(231점) 합격 우수 장학생",
    studentStory: "작문 첨삭 8주 집중 훈련으로 쓰기 영역 35점 → 78점 수직 상승",
  },
  {
    id: "culture",
    title: "K-컬처 연계 실전 일상 회화 & 발음 클리닉",
    badge: "회화 중심 / 초·중급",
    target: "K-드라마·K-POP 팬 및 한국 생활 적응이 필요한 외국인 거주자",
    features: [
      "한국인이 실제 사용하는 트렌디한 자연스러운 구어체 표현 습득",
      "외국인이 가장 어려워하는 평음·경음·격음(ㄱ-ㄲ-ㅋ) 조음 위치 정밀 교정",
      "상황별 롤플레잉(식당, 병원, 은행, 부동산, 여행 등) 체험형 수업",
    ],
    format: "1:1 맞춤 진도 or 2~3인 소그룹 회화 클래스",
    defaultImage: "/images/korean/class_culture.jpg",
    imageCaption: "다국적 수강생 4인 소그룹 한국어 롤플레잉 회화 수업",
    studentStory: "식당 주문부터 병원 진료까지 한국인처럼 자연스러운 억양 완성",
  },
]

export default function KoreanCoursesSection() {
  const [courses, setCourses] = useState<KoreanCourse[]>(INITIAL_COURSES)
  const [editingCourse, setEditingCourse] = useState<KoreanCourse | null>(null)
  const [previewImage, setPreviewImage] = useState<string>("")
  const [captionInput, setCaptionInput] = useState<string>("")
  const [storyInput, setStoryInput] = useState<string>("")
  const [selectedCourseForDetail, setSelectedCourseForDetail] = useState<KoreanCourse | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // LocalStorage에서 커스텀 등록 사진 불러오기
  useEffect(() => {
    try {
      const saved = localStorage.getItem("thegrim_korean_course_images_v1")
      if (saved) {
        const parsed = JSON.parse(saved)
        setCourses(parsed)
      }
    } catch (e) {
      console.warn("한국어 코스 이미지 불러오기 실패", e)
    }
  }, [])

  // 이미지 올리기·변경 모달 열기
  const openEditModal = (course: KoreanCourse) => {
    setEditingCourse(course)
    setPreviewImage(course.customImage || course.defaultImage)
    setCaptionInput(course.imageCaption)
    setStoryInput(course.studentStory || "")
  }

  // 파일 선택 처리 (스마트폰/PC 사진)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      alert("이미지 파일(JPG, PNG, WebP)을 선택해 주세요.")
      return
    }

    const reader = new FileReader()
    reader.onload = (uploadEvent) => {
      const result = uploadEvent.target?.result as string
      setPreviewImage(result)
    }
    reader.readAsDataURL(file)
  }

  // 이미지 저장 처리
  const handleSaveCourse = () => {
    if (!editingCourse) return

    const updated = courses.map((c) => {
      if (c.id !== editingCourse.id) return c
      return {
        ...c,
        customImage: previewImage,
        imageCaption: captionInput || c.imageCaption,
        studentStory: storyInput || c.studentStory,
      }
    })

    setCourses(updated)

    try {
      localStorage.setItem("thegrim_korean_course_images_v1", JSON.stringify(updated))
    } catch (e) {
      console.warn("로컬 저장 실패", e)
    }

    alert("✨ 우수학생/교육과정 이미지가 성공적으로 등록되었습니다!\n언제든 자유롭게 교체하실 수 있습니다.")
    setEditingCourse(null)
  }

  // 기본 이미지로 복원
  const handleResetToDefault = () => {
    if (!editingCourse) return
    if (!confirm("해당 과정의 이미지를 기본 사진으로 되돌리시겠습니까?")) return

    const initialMatch = INITIAL_COURSES.find((c) => c.id === editingCourse.id)
    if (!initialMatch) return

    const updated = courses.map((c) => {
      if (c.id !== editingCourse.id) return c
      return {
        ...c,
        customImage: undefined,
        imageCaption: initialMatch.imageCaption,
        studentStory: initialMatch.studentStory,
      }
    })

    setCourses(updated)

    try {
      localStorage.setItem("thegrim_korean_course_images_v1", JSON.stringify(updated))
    } catch {}

    alert("기본 사진으로 복원되었습니다.")
    setEditingCourse(null)
  }

  return (
    <section id="courses" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200">
      {/* 헤더 */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-900 text-xs font-bold border border-blue-200">
          <span>CURRICULUM & HONORS</span>
          <span>·</span>
          <span>우수 학생 & 교육과정 사진 등록·수시 교체</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          수강생 목적별 체계적 교육 과정
        </h2>
        <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed">
          비즈니스 실무부터 자격증 시험, 일상 대화까지 최적화된 로드맵을 제시합니다.
          <br className="hidden sm:inline" />
          실제 <strong className="text-blue-700 font-bold">수료생 및 우수 학생 후기 사진</strong>을 직접 등록하고 언제든 교체하실 수 있습니다.
        </p>
      </div>

      {/* 3대 과정 카드 그리드 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {courses.map((course) => {
          const displayImage = course.customImage || course.defaultImage

          return (
            <div
              key={course.id}
              className="rounded-3xl bg-white/90 border border-slate-200/90 hover:border-blue-400 transition-all duration-300 p-5 sm:p-6 flex flex-col justify-between space-y-5 group hover:-translate-y-1 shadow-lg backdrop-blur-md"
            >
              <div className="space-y-4">
                {/* 상단 배지 */}
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
                    {course.badge}
                  </span>
                  <span className="text-xs text-slate-500 font-semibold font-mono">1:1 맞춤 코칭</span>
                </div>

                {/* 📷 대표 이미지 & 수시 변경 버튼 영역 */}
                <div className="relative rounded-2xl overflow-hidden aspect-video bg-slate-100 border border-slate-200 shadow-inner group/img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={displayImage}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105 cursor-pointer"
                    onClick={() => setSelectedCourseForDetail(course)}
                  />

                  {/* 사진 위 오버레이 캡션 */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-3 pt-6 text-white pointer-events-none">
                    <p className="text-xs font-bold truncate drop-shadow-sm">
                      🎓 {course.imageCaption}
                    </p>
                  </div>

                  {/* 우측 상단 [📷 사진 올리기·변경] 버튼 */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      openEditModal(course)
                    }}
                    className="absolute top-2 right-2 px-2.5 py-1.5 rounded-lg bg-blue-600/90 hover:bg-blue-600 text-white font-bold text-[11px] shadow-md backdrop-blur-sm transition-all flex items-center gap-1 active:scale-95"
                  >
                    <span>📷 사진 올리기·변경</span>
                  </button>

                  {/* 좌측 상단 [🔍 확대] 버튼 */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedCourseForDetail(course)
                    }}
                    className="absolute top-2 left-2 px-2 py-1 rounded-md bg-black/60 hover:bg-black/80 text-white font-bold text-[10px] backdrop-blur-sm transition-all"
                  >
                    🔍 확대
                  </button>
                </div>

                {/* 타이틀 및 대상 */}
                <div>
                  <h3 className="text-xl font-black text-slate-900 group-hover:text-blue-700 transition-colors">
                    {course.title}
                  </h3>
                  <div className="text-xs text-slate-600 mt-1.5 leading-relaxed font-medium">
                    🎯 대상: {course.target}
                  </div>
                </div>

                {/* 우수학생 수료 한줄 스토리 (있을 경우) */}
                {course.studentStory && (
                  <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-200 text-xs text-blue-900 font-medium">
                    <span className="font-bold text-blue-800">✨ 우수학생 후기: </span>
                    {course.studentStory}
                  </div>
                )}

                {/* 주요 커리큘럼 특징 */}
                <div className="space-y-2 pt-1">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    주요 커리큘럼 특징
                  </div>
                  <ul className="space-y-2">
                    {course.features.map((item, fIdx) => (
                      <li key={fIdx} className="text-xs text-slate-700 font-medium flex items-start gap-2">
                        <span className="text-blue-600 font-bold">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 하단 수업 방식 및 하단 변경 버튼 */}
              <div className="pt-3 border-t border-slate-200 space-y-2">
                <div className="text-xs text-blue-900 font-bold bg-blue-50/60 p-2.5 rounded-xl border border-blue-100 flex items-center justify-between">
                  <span>📌 {course.format}</span>
                </div>
                <button
                  type="button"
                  onClick={() => openEditModal(course)}
                  className="w-full py-2 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 font-bold text-xs border border-slate-200 transition-all flex items-center justify-center gap-1.5 min-h-[40px]"
                >
                  <span>📷 사진 올리기 및 후기 수정</span>
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* ================================================================= */}
      {/* 1. 우수학생 / 교육과정 사진 등록 & 수시 변경 모달 */}
      {/* ================================================================= */}
      {editingCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-6 max-h-[90vh] overflow-y-auto">
            {/* 모달 헤더 */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                  우수학생 & 교육과정 사진 관리자
                </span>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-0.5">
                  {editingCourse.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingCourse(null)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-lg transition-colors"
              >
                ✕
              </button>
            </div>

            {/* 현재 등록된 사진 미리보기 */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">
                현재 등록된 사진 미리보기
              </label>
              <div className="rounded-2xl overflow-hidden aspect-video bg-slate-100 border-2 border-dashed border-blue-300 relative group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={previewImage}
                  alt="미리보기"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* 파일 선택 버튼 */}
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <span>📂 내 컴퓨터 / 스마트폰에서 사진 선택</span>
              </button>
              <p className="text-[11px] text-slate-500 mt-2 text-center">
                수료증 전달 사진, 우수 학생 인터뷰, 수업 현장 교재 사진(JPG, PNG, WebP)을 선택하시면 즉시 교체됩니다.
              </p>
            </div>

            {/* 캡션 및 후기 입력 */}
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  사진 설명 캡션 (카드 사진 위에 노출)
                </label>
                <input
                  type="text"
                  placeholder="예: 글로벌 화학사 파견 주재원 3개월 집중 코칭 수료"
                  value={captionInput}
                  onChange={(e) => setCaptionInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  우수 학생 후기 / 성과 코멘트
                </label>
                <input
                  type="text"
                  placeholder="예: 8주 집중 수업으로 쓰기 영역 점수 2배 상승 및 실전 비즈니스 회화 마스터"
                  value={storyInput}
                  onChange={(e) => setStoryInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* 모달 하단 버튼 액션 */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={handleResetToDefault}
                className="text-xs font-bold text-slate-500 hover:text-red-600 transition-colors"
              >
                기본 사진으로 복원
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setEditingCourse(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-all"
                >
                  취소
                </button>
                <button
                  type="button"
                  onClick={handleSaveCourse}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md transition-all"
                >
                  사진 & 설명 저장하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* 2. 고화질 사진 확대 & 상세 스토리 라이트박스 모달 */}
      {/* ================================================================= */}
      {selectedCourseForDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
          <div className="max-w-3xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <span className="text-xs text-blue-400 font-bold block">
                  {selectedCourseForDetail.badge}
                </span>
                <h3 className="text-base font-black">
                  {selectedCourseForDetail.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCourseForDetail(null)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center justify-center transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="aspect-video bg-black overflow-hidden flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedCourseForDetail.customImage || selectedCourseForDetail.defaultImage}
                alt={selectedCourseForDetail.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-5 bg-slate-50 space-y-2 border-t border-slate-200">
              <div className="text-xs font-bold text-slate-900">
                🎓 {selectedCourseForDetail.imageCaption}
              </div>
              {selectedCourseForDetail.studentStory && (
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {selectedCourseForDetail.studentStory}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
