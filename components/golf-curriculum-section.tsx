"use client"

import { useState, useEffect, useRef } from "react"

export interface VideoItem {
  type: "upload" | "youtube" | "sample"
  url: string // blob url, data url, or youtube embed
  rawYoutubeUrl?: string
  thumbnail: string
  title: string
  desc: string
  memberBeforeAfter?: string
}

export interface GolfProgram {
  id: string
  title: string
  badge: string
  target: string
  duration: string
  keyPoints: string[]
  outcome: string
  proVideo: VideoItem
  memberVideo: VideoItem
}

// 초기 기본 프로그램 및 샘플 영상 데이터
const INITIAL_PROGRAMS: GolfProgram[] = [
  {
    id: "beginner",
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
    proVideo: {
      type: "sample",
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      thumbnail: "/images/golf/lesson_beginner.jpg",
      title: "기초 그립 & 어드레스 척추각 교정 직강",
      desc: "초보자가 가장 많이 하는 손목 캐스팅 방지 및 견고한 척추각 유지 드릴",
    },
    memberVideo: {
      type: "sample",
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      thumbnail: "/images/golf/lesson_beginner.jpg",
      title: "20대 입문 회원 4주 차 7번 아이언 풀스윙",
      desc: "헛스윙과 탑볼에서 벗어나 완벽한 피니시 밸런스를 잡아가는 과정",
      memberBeforeAfter: "체중 뒤뚱거림 폼 → 중심축 고정 정타 스윙",
    },
  },
  {
    id: "slice",
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
    proVideo: {
      type: "sample",
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
      thumbnail: "/images/golf/lesson_slice.jpg",
      title: "인-아웃 샬로잉 & 로테이션 비거리 레슨",
      desc: "엎어 치는 궤도를 즉시 고쳐주는 벽 드릴 및 지면 반발력 힙턴 메커니즘",
    },
    memberVideo: {
      type: "sample",
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
      thumbnail: "/images/golf/lesson_slice.jpg",
      title: "40대 남성 회원 슬라이스 탈출 & 비거리 +35m",
      desc: "캐스팅 교정 후 트랙맨 볼스피드 61m/s → 68m/s 향상",
      memberBeforeAfter: "우측 OB 슬라이스 → 시원한 드로우 구질 안착",
    },
  },
  {
    id: "shortgame",
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
    proVideo: {
      type: "sample",
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
      thumbnail: "/images/golf/lesson_shortgame.jpg",
      title: "스핀량 극대화 56도 웨지 피치샷 & 벙커샷",
      desc: "그린에 런 없이 툭 떨어지는 바운스 활용 어프로치 시범",
    },
    memberVideo: {
      type: "sample",
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
      thumbnail: "/images/golf/lesson_shortgame.jpg",
      title: "50대 회원 필드 동반 레슨 벙커 탈출 원샷",
      desc: "그린 주변 벙커 공포증 극복 후 홀컵 1.5m 원샷 붙이기 성공",
      memberBeforeAfter: "벙커 3연속 철퍼덕 → 1타 만에 핀 근접 온그린",
    },
  },
]

// 유튜브 URL을 embed 링크로 변환하는 유틸리티
function parseYoutubeEmbed(url: string): string | null {
  if (!url) return null
  try {
    // 1. youtube.com/shorts/ID
    const shortsMatch = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/)
    if (shortsMatch && shortsMatch[1]) {
      return `https://www.youtube-nocookie.com/embed/${shortsMatch[1]}?autoplay=1&rel=0`
    }
    // 2. youtu.be/ID
    const youtuMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/)
    if (youtuMatch && youtuMatch[1]) {
      return `https://www.youtube-nocookie.com/embed/${youtuMatch[1]}?autoplay=1&rel=0`
    }
    // 3. youtube.com/watch?v=ID
    const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/)
    if (watchMatch && watchMatch[1]) {
      return `https://www.youtube-nocookie.com/embed/${watchMatch[1]}?autoplay=1&rel=0`
    }
    // 4. 이미 embed url인 경우
    if (url.includes("youtube.com/embed/")) {
      return url
    }
  } catch (e) {
    console.error("Youtube parse error", e)
  }
  return null
}

// IndexedDB 영상 저장 헬퍼 (스마트폰/PC 대용량 MP4 영상 보관용)
const DB_NAME = "TheGrimGolfDB"
const DB_STORE = "golf_videos"

function openGolfDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !window.indexedDB) {
      reject(new Error("IndexedDB not supported"))
      return
    }
    const request = window.indexedDB.open(DB_NAME, 1)
    request.onupgradeneeded = (e) => {
      const db = (e.target as IDBOpenDBRequest).result
      if (!db.objectStoreNames.contains(DB_STORE)) {
        db.createObjectStore(DB_STORE)
      }
    }
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

async function saveVideoToDB(key: string, blob: Blob): Promise<void> {
  try {
    const db = await openGolfDB()
    const tx = db.transaction(DB_STORE, "readwrite")
    tx.objectStore(DB_STORE).put(blob, key)
    return new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve()
      tx.onerror = () => reject(tx.error)
    })
  } catch (err) {
    console.warn("DB save error", err)
  }
}

async function getVideoFromDB(key: string): Promise<Blob | null> {
  try {
    const db = await openGolfDB()
    const tx = db.transaction(DB_STORE, "readonly")
    const req = tx.objectStore(DB_STORE).get(key)
    return new Promise((resolve) => {
      req.onsuccess = () => resolve(req.result || null)
      req.onerror = () => resolve(null)
    })
  } catch {
    return null
  }
}

async function deleteVideoFromDB(key: string): Promise<void> {
  try {
    const db = await openGolfDB()
    const tx = db.transaction(DB_STORE, "readwrite")
    tx.objectStore(DB_STORE).delete(key)
  } catch (err) {
    console.warn("DB delete error", err)
  }
}

export default function GolfCurriculumSection() {
  const [programs, setPrograms] = useState<GolfProgram[]>(INITIAL_PROGRAMS)
  // 각 카드별 활성화된 비디오 탭 ("pro" | "member")
  const [activeTabs, setActiveTabs] = useState<Record<string, "pro" | "member">>({
    beginner: "pro",
    slice: "pro",
    shortgame: "pro",
  })

  // 영상 업로드 모달 상태
  const [editingProgram, setEditingProgram] = useState<GolfProgram | null>(null)
  const [editingSlot, setEditingSlot] = useState<"pro" | "member">("pro")
  const [uploadType, setUploadType] = useState<"file" | "youtube">("file")
  const [youtubeInput, setYoutubeInput] = useState<string>("")
  const [titleInput, setTitleInput] = useState<string>("")
  const [descInput, setDescInput] = useState<string>("")
  const [beforeAfterInput, setBeforeAfterInput] = useState<string>("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewBlobUrl, setPreviewBlobUrl] = useState<string>("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 큰 화면 재생용 라이트박스 모달 상태
  const [playingVideo, setPlayingVideo] = useState<{
    item: VideoItem
    programTitle: string
    isMember: boolean
  } | null>(null)

  // IndexedDB 및 LocalStorage에서 저장된 영상 설정 불러오기
  useEffect(() => {
    async function loadSavedData() {
      try {
        const savedMeta = localStorage.getItem("thegrim_golf_curriculum_meta_v1")
        if (savedMeta) {
          const parsed = JSON.parse(savedMeta)
          // DB에서 Blob 불러와서 blob URL 생성
          const updatedPrograms = await Promise.all(
            parsed.map(async (prog: GolfProgram) => {
              // 프로 영상 복원
              let proUrl = prog.proVideo.url
              if (prog.proVideo.type === "upload") {
                const blob = await getVideoFromDB(`golf_video_${prog.id}_pro`)
                if (blob) {
                  proUrl = URL.createObjectURL(blob)
                }
              }
              // 회원 영상 복원
              let memUrl = prog.memberVideo.url
              if (prog.memberVideo.type === "upload") {
                const blob = await getVideoFromDB(`golf_video_${prog.id}_member`)
                if (blob) {
                  memUrl = URL.createObjectURL(blob)
                }
              }

              return {
                ...prog,
                proVideo: { ...prog.proVideo, url: proUrl },
                memberVideo: { ...prog.memberVideo, url: memUrl },
              }
            })
          )
          setPrograms(updatedPrograms)
        }
      } catch (e) {
        console.error("데이터 복원 실패", e)
      }
    }

    loadSavedData()
  }, [])

  // 탭 전환 핸들러
  const handleTabChange = (programId: string, slot: "pro" | "member") => {
    setActiveTabs((prev) => ({ ...prev, [programId]: slot }))
  }

  // 영상 업로드/수정 모달 열기
  const openEditModal = (prog: GolfProgram, slot: "pro" | "member") => {
    setEditingProgram(prog)
    setEditingSlot(slot)
    const currentItem = slot === "pro" ? prog.proVideo : prog.memberVideo
    setUploadType(currentItem.type === "youtube" ? "youtube" : "file")
    setYoutubeInput(currentItem.rawYoutubeUrl || "")
    setTitleInput(currentItem.title)
    setDescInput(currentItem.desc)
    setBeforeAfterInput(currentItem.memberBeforeAfter || "")
    setSelectedFile(null)
    setPreviewBlobUrl(currentItem.type === "youtube" ? "" : currentItem.url)
  }

  // 파일 선택 처리 (스마트폰/PC 비디오)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("video/")) {
      alert("동영상 파일(MP4, WebM, MOV 등)을 선택해 주세요.")
      return
    }

    // 100MB 이하 권장
    if (file.size > 120 * 1024 * 1024) {
      alert("동영상 크기는 120MB 이하를 권장합니다.")
      return
    }

    setSelectedFile(file)
    const url = URL.createObjectURL(file)
    setPreviewBlobUrl(url)
  }

  // 업로드 저장 처리
  const handleSaveVideo = async () => {
    if (!editingProgram) return

    const progId = editingProgram.id
    const isMember = editingSlot === "member"
    let finalUrl = ""
    let finalType: "upload" | "youtube" | "sample" = "sample"
    let rawYt = ""

    if (uploadType === "youtube") {
      const embed = parseYoutubeEmbed(youtubeInput)
      if (!embed) {
        alert("올바른 유튜브 링크(Shorts, 영상 URL)를 입력해 주세요.\n예: https://youtu.be/xxxxx 또는 https://youtube.com/shorts/xxxxx")
        return
      }
      finalUrl = embed
      finalType = "youtube"
      rawYt = youtubeInput
    } else {
      if (selectedFile) {
        // IndexedDB에 Blob 저장
        const dbKey = `golf_video_${progId}_${editingSlot}`
        await saveVideoToDB(dbKey, selectedFile)
        finalUrl = URL.createObjectURL(selectedFile)
        finalType = "upload"
      } else if (previewBlobUrl) {
        finalUrl = previewBlobUrl
        const currentItem = isMember ? editingProgram.memberVideo : editingProgram.proVideo
        finalType = currentItem.type
      } else {
        alert("동영상 파일을 선택하거나 유튜브 주소를 입력해 주세요.")
        return
      }
    }

    const updated = programs.map((p) => {
      if (p.id !== progId) return p
      const updatedItem: VideoItem = {
        type: finalType,
        url: finalUrl,
        rawYoutubeUrl: rawYt || undefined,
        thumbnail: isMember ? p.memberVideo.thumbnail : p.proVideo.thumbnail,
        title: titleInput || (isMember ? "회원 스윙 교정 분석 영상" : "프로 시범 레슨 영상"),
        desc: descInput || (isMember ? "회원 전/후 스윙 교정 포인트" : "스윙 메커니즘 핵심 직강"),
        memberBeforeAfter: isMember ? beforeAfterInput : undefined,
      }

      return {
        ...p,
        proVideo: !isMember ? updatedItem : p.proVideo,
        memberVideo: isMember ? updatedItem : p.memberVideo,
      }
    })

    setPrograms(updated)

    // 메타데이터 LocalStorage에 영구 보존
    try {
      const metaOnly = updated.map((p) => ({
        ...p,
        proVideo: {
          ...p.proVideo,
          // blob url은 다음 세션에서 재발급되므로 제외
          url: p.proVideo.type === "upload" ? "" : p.proVideo.url,
        },
        memberVideo: {
          ...p.memberVideo,
          url: p.memberVideo.type === "upload" ? "" : p.memberVideo.url,
        },
      }))
      localStorage.setItem("thegrim_golf_curriculum_meta_v1", JSON.stringify(metaOnly))
    } catch (e) {
      console.warn("로컬 저장 실패", e)
    }

    alert("✨ 영상이 성공적으로 등록되었습니다!\n언제든 자유롭게 교체하실 수 있습니다.")
    setEditingProgram(null)
  }

  // 기본 영상으로 복원
  const handleResetToDefault = async () => {
    if (!editingProgram) return
    if (!confirm("해당 슬롯의 영상을 기본 제공 샘플 영상으로 되돌리시겠습니까?")) return

    const progId = editingProgram.id
    const initialMatch = INITIAL_PROGRAMS.find((p) => p.id === progId)
    if (!initialMatch) return

    // DB 삭제
    const dbKey = `golf_video_${progId}_${editingSlot}`
    await deleteVideoFromDB(dbKey)

    const updated = programs.map((p) => {
      if (p.id !== progId) return p
      return {
        ...p,
        proVideo: editingSlot === "pro" ? initialMatch.proVideo : p.proVideo,
        memberVideo: editingSlot === "member" ? initialMatch.memberVideo : p.memberVideo,
      }
    })

    setPrograms(updated)

    try {
      localStorage.setItem("thegrim_golf_curriculum_meta_v1", JSON.stringify(updated))
    } catch {}

    alert("기본 영상으로 복원되었습니다.")
    setEditingProgram(null)
  }

  return (
    <section id="programs" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200">
      {/* 섹션 타이틀 헤더 */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100 text-sky-800 text-xs font-bold border border-sky-200">
          <span>⛳ LESSON & SWING LAB</span>
          <span>·</span>
          <span>실제 스윙 영상 업로드 & 교체 관리</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          골퍼의 목표별 맞춤 레슨 코스
        </h2>
        <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed">
          단순 반복 연습이 아닌, 스윙 메커니즘의 원리를 깨우치는 과학적인 수업입니다.
          <br className="hidden sm:inline" />
          <strong className="text-sky-700 font-bold">프로 레슨 영상</strong>과{" "}
          <strong className="text-emerald-700 font-bold">실제 회원 스윙 교정 영상</strong>을 직접 확인하고 수시로 등록하실 수 있습니다.
        </p>
      </div>

      {/* 3대 레슨 카드 그리드 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {programs.map((program) => {
          const currentSlot = activeTabs[program.id] || "pro"
          const currentVideo = currentSlot === "pro" ? program.proVideo : program.memberVideo

          return (
            <div
              key={program.id}
              className="rounded-3xl bg-white/90 border border-slate-200/90 hover:border-sky-400 transition-all duration-300 p-5 sm:p-6 flex flex-col justify-between space-y-5 shadow-lg backdrop-blur-md group"
            >
              {/* 카드 상단 배지 & 기간 */}
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

                {/* 🎥 비디오 플레이어 & 탭 영역 */}
                <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-950 shadow-inner">
                  {/* 영상 탭 전환 헤더 */}
                  <div className="flex bg-slate-900 border-b border-slate-800 p-1">
                    <button
                      type="button"
                      onClick={() => handleTabChange(program.id, "pro")}
                      className={`flex-1 py-1.5 text-[11px] font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                        currentSlot === "pro"
                          ? "bg-sky-600 text-white shadow-sm"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      <span>🎥 프로 레슨 영상</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleTabChange(program.id, "member")}
                      className={`flex-1 py-1.5 text-[11px] font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                        currentSlot === "member"
                          ? "bg-emerald-600 text-white shadow-sm"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      <span>🏌️ 회원 스윙 영상</span>
                    </button>
                  </div>

                  {/* 비디오 뷰어 영역 */}
                  <div className="relative aspect-video bg-black overflow-hidden group/vid">
                    {currentVideo.type === "youtube" ? (
                      <iframe
                        src={currentVideo.url}
                        title={currentVideo.title}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <video
                        src={currentVideo.url}
                        poster={currentVideo.thumbnail}
                        controls
                        playsInline
                        preload="metadata"
                        className="w-full h-full object-cover"
                      />
                    )}

                    {/* 우측 상단 빠른 전체화면/팝업 재생 버튼 */}
                    <button
                      type="button"
                      onClick={() =>
                        setPlayingVideo({
                          item: currentVideo,
                          programTitle: program.title,
                          isMember: currentSlot === "member",
                        })
                      }
                      title="큰 화면으로 보기"
                      className="absolute top-2 right-2 px-2.5 py-1 rounded-md bg-black/70 hover:bg-black/90 text-white text-[11px] font-bold backdrop-blur-sm transition-all flex items-center gap-1 z-10"
                    >
                      <span>🔍 확대 보기</span>
                    </button>

                    {/* 회원 영상일 경우 Before & After 배지 */}
                    {currentSlot === "member" && currentVideo.memberBeforeAfter && (
                      <div className="absolute bottom-2 left-2 right-2 px-2 py-1 bg-black/75 backdrop-blur-sm rounded text-[10px] text-emerald-300 font-bold border border-emerald-500/30 truncate z-10 pointer-events-none">
                        💡 {currentVideo.memberBeforeAfter}
                      </div>
                    )}
                  </div>

                  {/* 영상 설명 및 [영상 올리기·수정] 버튼 바 */}
                  <div className="p-3 bg-slate-900/90 text-white flex items-center justify-between gap-2 border-t border-slate-800">
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-slate-100 truncate flex items-center gap-1.5">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            currentSlot === "pro" ? "bg-sky-400" : "bg-emerald-400"
                          }`}
                        />
                        <span className="truncate">{currentVideo.title}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 truncate mt-0.5">
                        {currentVideo.desc}
                      </div>
                    </div>

                    {/* ⭐ 사용자가 직접 영상을 올리고 교체할 수 있는 버튼 */}
                    <button
                      type="button"
                      onClick={() => openEditModal(program, currentSlot)}
                      className="shrink-0 px-2.5 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-white font-bold text-[11px] transition-all flex items-center gap-1 shadow-sm active:scale-95"
                    >
                      <span>🎥 영상 올리기·수정</span>
                    </button>
                  </div>
                </div>

                {/* 핵심 트레이닝 내용 */}
                <div className="space-y-2 pt-1">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    핵심 트레이닝 내용
                  </div>
                  <ul className="space-y-1.5">
                    {program.keyPoints.map((point, pIdx) => (
                      <li key={pIdx} className="text-xs text-slate-700 font-medium flex items-start gap-2">
                        <span className="text-sky-600 font-bold">✓</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 하단 목표 성과 */}
              <div className="pt-3 border-t border-slate-200">
                <div className="text-xs text-sky-900 font-bold bg-sky-50 p-3 rounded-xl border border-sky-100 flex items-start gap-2">
                  <span className="text-base shrink-0">🏆</span>
                  <div>
                    <span className="font-extrabold text-sky-800">목표 성과: </span>
                    <span className="text-slate-700 font-medium">{program.outcome}</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* ================================================================= */}
      {/* 1. 영상 올리기 & 수시 변경 모달 (스마트폰/PC 파일 + 유튜브 링크 지원) */}
      {/* ================================================================= */}
      {editingProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-6 max-h-[90vh] overflow-y-auto">
            {/* 모달 헤더 */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 uppercase tracking-wider">
                  <span>🎥 비디오 등록 & 교체 매니저</span>
                  <span>·</span>
                  <span className={editingSlot === "pro" ? "text-sky-600 font-extrabold" : "text-emerald-600 font-extrabold"}>
                    {editingSlot === "pro" ? "[프로 레슨 영상]" : "[회원 스윙 영상]"}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                  {editingProgram.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingProgram(null)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-lg transition-colors"
              >
                ✕
              </button>
            </div>

            {/* 업로드 방식 선택 탭 */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">등록 방식 선택</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setUploadType("file")}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-2 ${
                    uploadType === "file"
                      ? "bg-sky-50 border-sky-500 text-sky-800 shadow-sm"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span>📁 동영상 파일 직접 올리기 (MP4)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setUploadType("youtube")}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-2 ${
                    uploadType === "youtube"
                      ? "bg-red-50 border-red-500 text-red-800 shadow-sm"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span>📺 유튜브 / 쇼츠 링크 등록</span>
                </button>
              </div>
            </div>

            {/* ① 동영상 파일 직접 올리기 영역 */}
            {uploadType === "file" && (
              <div className="space-y-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">내 기기에서 동영상 선택</span>
                  <span className="text-[11px] text-slate-500">MP4, WebM, MOV 지원</span>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <span>📂 스마트폰 / PC에서 동영상 파일 선택</span>
                </button>

                {/* 선택된 파일 및 미리보기 */}
                {selectedFile && (
                  <div className="p-3 bg-white rounded-xl border border-sky-200 text-xs text-sky-900 font-medium flex items-center justify-between">
                    <span className="truncate">선택됨: <strong>{selectedFile.name}</strong></span>
                    <span className="text-[10px] text-slate-500">
                      {(selectedFile.size / (1024 * 1024)).toFixed(1)} MB
                    </span>
                  </div>
                )}

                {previewBlobUrl && (
                  <div className="rounded-xl overflow-hidden aspect-video bg-black border border-slate-300">
                    <video src={previewBlobUrl} controls className="w-full h-full object-cover" />
                  </div>
                )}
                <p className="text-[11px] text-slate-500 leading-normal">
                  💡 스마트폰으로 직접 촬영한 회원 스윙 분석이나 프로 시범 영상을 올리시면 브라우저에 안전하게 영구 저장되어 언제든 바로 재생됩니다.
                </p>
              </div>
            )}

            {/* ② 유튜브 / 쇼츠 링크 등록 영역 */}
            {uploadType === "youtube" && (
              <div className="space-y-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <label className="text-xs font-bold text-slate-700 block">
                  유튜브 영상 또는 쇼츠(Shorts) URL 주소
                </label>
                <input
                  type="url"
                  placeholder="예: https://youtube.com/shorts/... 또는 https://youtu.be/..."
                  value={youtubeInput}
                  onChange={(e) => setYoutubeInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
                <p className="text-[11px] text-slate-500">
                  💡 유튜브 일반 영상뿐 아니라 스마트폰 세로형 **유튜브 쇼츠(Shorts)** 주소를 넣으셔도 자동으로 깔끔하게 임베드 재생됩니다.
                </p>
              </div>
            )}

            {/* 메타 정보 입력 (제목 & 설명) */}
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  영상 제목
                </label>
                <input
                  type="text"
                  placeholder="예: 7번 아이언 어드레스 & 척추각 고정 드릴"
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  영상 설명 및 교정 포인트
                </label>
                <input
                  type="text"
                  placeholder="예: 캐스팅 방지 및 임팩트 구간 핸드퍼스트 각도 유지"
                  value={descInput}
                  onChange={(e) => setDescInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              {/* 회원 영상 전용 Before & After 코멘트 */}
              {editingSlot === "member" && (
                <div>
                  <label className="text-xs font-bold text-emerald-800 block mb-1">
                    회원 스윙 Before & After 요약 배지
                  </label>
                  <input
                    type="text"
                    placeholder="예: 엎어 치는 궤도 → 인-아웃 35m 비거리 증가"
                    value={beforeAfterInput}
                    onChange={(e) => setBeforeAfterInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-300 bg-emerald-50/40 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              )}
            </div>

            {/* 모달 하단 버튼 액션 */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={handleResetToDefault}
                className="text-xs font-bold text-slate-500 hover:text-red-600 transition-colors"
              >
                기본 샘플 영상으로 복원
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setEditingProgram(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-all"
                >
                  취소
                </button>
                <button
                  type="button"
                  onClick={handleSaveVideo}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md transition-all"
                >
                  영상 저장 & 즉시 반영
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* 2. 고화질 전체화면 / 라이트박스 재생 모달 */}
      {/* ================================================================= */}
      {playingVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
          <div className="max-w-4xl w-full bg-slate-950 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col">
            {/* 라이트박스 상단 헤더 */}
            <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <span
                  className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
                    playingVideo.isMember
                      ? "bg-emerald-600 text-white"
                      : "bg-sky-600 text-white"
                  }`}
                >
                  {playingVideo.isMember ? "회원 스윙 교정 분석" : "프로 시범 직강"}
                </span>
                <span className="text-sm font-black text-slate-200">
                  {playingVideo.programTitle}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setPlayingVideo(null)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center justify-center transition-colors"
              >
                ✕
              </button>
            </div>

            {/* 비디오 재생 본체 */}
            <div className="aspect-video bg-black flex items-center justify-center">
              {playingVideo.item.type === "youtube" ? (
                <iframe
                  src={playingVideo.item.url}
                  title={playingVideo.item.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  src={playingVideo.item.url}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                />
              )}
            </div>

            {/* 하단 캡션 */}
            <div className="p-4 bg-slate-900 text-slate-300 flex items-center justify-between text-xs">
              <div>
                <h4 className="font-bold text-white text-sm">{playingVideo.item.title}</h4>
                <p className="text-slate-400 mt-0.5">{playingVideo.item.desc}</p>
              </div>
              {playingVideo.item.memberBeforeAfter && (
                <div className="px-3 py-1.5 rounded-lg bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-bold">
                  ✨ {playingVideo.item.memberBeforeAfter}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
