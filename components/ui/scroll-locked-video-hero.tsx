"use client"

import { useEffect, useRef, useState } from "react"

// ─────────────────────────────────────────────────────────────
// THE CITY OPENS — locked scroll-scrub video hero
// The page cannot move while this is active — body is pinned
// with position:fixed (the same bulletproof technique modal
// libraries use; plain overflow:hidden alone isn't reliable
// across browsers). Wheel/touch input is captured and used
// purely to drive video.currentTime, forward and backward. Once
// the video reaches the end and the user keeps pushing forward,
// the page unlocks and continues normally — and re-locks if they
// scroll back up into it. No dependencies, system fonts only.
// ─────────────────────────────────────────────────────────────

export interface MetroHeroProps {
  videoSrc?: string
  title?: string
  scrollHint?: string
  tagline?: string
  signature?: { name: string; url: string } | false
  /** Total input distance (px) needed to scrub the full video. Tune to taste. */
  scrubDistance?: number
  className?: string
  style?: React.CSSProperties
}

const DEFAULT_VIDEO =
  "https://cdn.21st.dev/assets/mirror/21/21a77eac28eacbb7e142016eefeaa0b4a766619e51113629a3bc6df6af066c0f.mp4"
const DEFAULT_SIGNATURE = {
  name: "THE GRIM STUDIO",
  url: "#",
}
const SANS =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"

const COL_BG = "#05070d"
const COL_TEXT = "#f2f4f8"

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v))
}

export default function MetroHero({
  videoSrc = DEFAULT_VIDEO,
  title = "THE GRIM",
  scrollHint = "SCROLL TO OPEN",
  tagline = "공간의 가치를 짓고, 디지털의 흐름을 만듭니다.",
  signature = DEFAULT_SIGNATURE,
  scrubDistance = 2400,
  className,
  style,
}: MetroHeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const hintRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)
  const [isUnlocked, setIsUnlocked] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    const section = sectionRef.current
    if (!video || !section) return

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches

    let duration = 0
    let rafId = 0
    let targetProgress = 0
    let currentProgress = 0
    let hasStartedScrolling = false
    let isSeeking = false
    let pendingTime: number | null = null
    let locked = false
    let lockedScrollY = 0
    let touchStartY = 0

    const onLoadedData = () => {
      duration = video.duration || 0
      setReady(true)
      if (reduceMotion) {
        video.currentTime = duration * 0.92
      }
    }
    video.addEventListener("loadeddata", onLoadedData)

    // iOS Safari 및 브라우저 비디오 초기 버퍼링 확보
    const kickstartLoad = () => {
      const p = video.play()
      if (p && typeof p.then === "function") {
        p.then(() => video.pause()).catch(() => {})
      } else {
        video.pause()
      }
    }
    kickstartLoad()

    const onSeeked = () => {
      isSeeking = false
      if (pendingTime !== null && video) {
        const t = pendingTime
        pendingTime = null
        isSeeking = true
        video.currentTime = t
      }
    }
    video.addEventListener("seeked", onSeeked)

    function seekTo(t: number) {
      if (!video) return
      if (isSeeking) {
        pendingTime = t
        return
      }
      isSeeking = true
      video.currentTime = t
    }

    // 화면 스크롤 잠금 및 해제 상태 관리 (body position fixed 제거하여 네이티브 스크롤 파괴 방지)
    function engageLock() {
      locked = true
      setIsUnlocked(false)
    }

    function releaseLock() {
      locked = false
      setIsUnlocked(true)
    }

    // 초기 진입 시 최상단이면 잠금 활성화
    if (window.scrollY <= 10) {
      engageLock()
    } else {
      targetProgress = 1
      currentProgress = 1
      releaseLock()
    }

    // 휠/터치 델타값 처리 함수
    function addDelta(deltaY: number): boolean {
      // 1. 문이 열리는 중 (아래로 휠)
      if (deltaY > 0) {
        if (targetProgress < 0.98) {
          targetProgress = clamp(targetProgress + deltaY / scrubDistance, 0, 1)
          if (targetProgress > 0.001) hasStartedScrolling = true
          return true // 문이 열리는 동안에는 스크롤 가로채기
        } else {
          // 문이 100% 열림 -> 스크롤 락 즉시 해제하여 본문으로 부드럽게 스크롤 허용!
          if (locked) {
            releaseLock()
          }
          return false // 본문으로 자연스럽게 스크롤 통과
        }
      }

      // 2. 문이 닫히는 중 (위로 휠): 페이지 맨 위(scrollY === 0)에 완전히 도달했을 때만 작동
      if (deltaY < -15) {
        if (window.scrollY <= 5) {
          if (!locked && targetProgress >= 0.95) {
            engageLock()
          }
          if (locked) {
            targetProgress = clamp(targetProgress + deltaY / scrubDistance, 0, 1)
            return targetProgress > 0
          }
        }
      }

      return false
    }

    const onWheel = (e: WheelEvent) => {
      // 최상단이거나 문이 아직 완전히 열리지 않았을 때 비디오 스크러빙
      if (window.scrollY <= 5 || targetProgress < 0.98) {
        if (addDelta(e.deltaY)) {
          e.preventDefault()
        }
      }
    }

    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY ?? 0
    }
    const onTouchMove = (e: TouchEvent) => {
      const y = e.touches[0]?.clientY ?? touchStartY
      const deltaY = touchStartY - y
      touchStartY = y

      if (window.scrollY <= 5 || targetProgress < 0.98) {
        if (addDelta(deltaY)) {
          e.preventDefault()
        }
      }
    }

    // 스크롤 이벤트 감지
    const onScroll = () => {
      if (window.scrollY <= 2 && targetProgress >= 0.98) {
        // 맨 위로 복귀한 상태
      }
    }

    window.addEventListener("wheel", onWheel, { passive: false })
    window.addEventListener("touchstart", onTouchStart, { passive: true })
    window.addEventListener("touchmove", onTouchMove, { passive: false })
    window.addEventListener("scroll", onScroll, { passive: true })
    section.addEventListener("touchstart", onTouchStart, {
      passive: true,
      capture: true,
    })
    section.addEventListener("touchmove", onTouchMove, {
      passive: false,
      capture: true,
    })

    function frame() {
      currentProgress += (targetProgress - currentProgress) * 0.18

      if (duration > 0) {
        seekTo(currentProgress * duration)
      }

      if (videoRef.current) {
        const scale = 1 + currentProgress * 0.06
        videoRef.current.style.transform = `scale(${scale})`
      }
      if (titleRef.current) {
        const t = 1 - clamp(currentProgress / 0.35, 0, 1)
        titleRef.current.style.opacity = String(t)
        titleRef.current.style.transform = `translateY(${(1 - t) * -24}px) scale(${0.96 + t * 0.04})`
        titleRef.current.style.filter = `blur(${(1 - t) * 10}px)`
      }
      if (hintRef.current) {
        hintRef.current.style.opacity = hasStartedScrolling ? "0" : "1"
      }
      if (taglineRef.current) {
        const t = clamp((currentProgress - 0.82) / 0.18, 0, 1)
        taglineRef.current.style.opacity = String(t)
        taglineRef.current.style.transform = `translateY(${(1 - t) * 20}px) scale(${0.97 + t * 0.03})`
        taglineRef.current.style.filter = `blur(${(1 - t) * 8}px)`
        taglineRef.current.style.pointerEvents = t > 0.5 ? "auto" : "none"
      }
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${currentProgress})`
      }

      rafId = requestAnimationFrame(frame)
    }

    if (!reduceMotion) {
      rafId = requestAnimationFrame(frame)
    }

    // 전역 함수로 버튼 클릭 시 강제 문 열기 지원
    ;(window as unknown as { __openTheGrimDoors?: () => void }).__openTheGrimDoors = () => {
      targetProgress = 1
      releaseLock()
    }

    ;(window as unknown as { __closeTheGrimDoors?: () => void }).__closeTheGrimDoors = () => {
      targetProgress = 0
      engageLock()
      window.scrollTo({ top: 0, behavior: "smooth" })
    }

    return () => {
      video.removeEventListener("loadeddata", onLoadedData)
      video.removeEventListener("seeked", onSeeked)
      window.removeEventListener("wheel", onWheel)
      window.removeEventListener("touchstart", onTouchStart)
      window.removeEventListener("touchmove", onTouchMove)
      window.removeEventListener("scroll", onScroll)
      section.removeEventListener("touchstart", onTouchStart, true)
      section.removeEventListener("touchmove", onTouchMove, true)
      cancelAnimationFrame(rafId)
      releaseLock()
    }
  }, [scrubDistance])

  // 문이 다 열린 후 본문 영역으로 부드럽게 스크롤 이동
  const handleScrollDown = () => {
    // 1. 문을 100% 열기
    if (typeof window !== "undefined") {
      const openFn = (window as unknown as { __openTheGrimDoors?: () => void }).__openTheGrimDoors
      if (openFn) openFn()
    }

    // 2. 본문 섹션으로 부드럽게 스크롤 이동
    setTimeout(() => {
      const nextSection = document.getElementById("services")
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth" })
      } else {
        window.scrollBy({ top: window.innerHeight, behavior: "smooth" })
      }
    }, 100)
  }

  // 문 다시 닫기
  const handleCloseDoors = () => {
    if (typeof window !== "undefined") {
      const closeFn = (window as unknown as { __closeTheGrimDoors?: () => void }).__closeTheGrimDoors
      if (closeFn) closeFn()
    }
  }

  return (
    <div
      ref={sectionRef}
      className={className}
      style={{
        position: "relative",
        height: "100dvh",
        width: "100%",
        overflow: "hidden",
        background: COL_BG,
        touchAction: "none",
        ...style,
      }}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        muted
        playsInline
        preload="auto"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: ready ? 1 : 0,
          transformOrigin: "center center",
          willChange: "transform",
          transition: "opacity 0.6s ease",
          touchAction: "none",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(5,7,13,0.35), rgba(5,7,13,0) 30%, rgba(5,7,13,0.15) 70%, rgba(5,7,13,0.55))",
          pointerEvents: "none",
        }}
      />

      {/* 인트로 메인 타이틀 */}
      <div
        ref={titleRef}
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 6%",
          textAlign: "center",
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            fontFamily: SANS,
            fontWeight: 800,
            fontSize: "clamp(30px, 7vw, 96px)",
            lineHeight: 1,
            letterSpacing: "-0.02em",
            color: COL_TEXT,
            textShadow: "0 4px 30px rgba(0,0,0,0.5)",
            display: "inline-block",
            willChange: "transform, filter, opacity",
          }}
        >
          {title}
        </span>
      </div>

      {/* 슬로건 및 문 열린 후 본문 이동 버튼 */}
      {tagline && (
        <div
          ref={taglineRef}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 8%",
            textAlign: "center",
            opacity: 0,
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              fontFamily: SANS,
              fontWeight: 700,
              fontSize: "clamp(20px, 3.4vw, 40px)",
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
              color: COL_TEXT,
              textShadow: "0 4px 24px rgba(0,0,0,0.5)",
            }}
          >
            {tagline}
          </span>

          {/* 문 열림 완료 후 본문으로 바로 스크롤해 내려갈 수 있는 럭셔리 크롬 알약 버튼 */}
          <div className="mt-8 flex flex-col items-center gap-3 pointer-events-auto">
            <button
              onClick={handleScrollDown}
              className="chrome-capsule-btn group"
            >
              {/* 크롬 반사 스파클 광택 */}
              <span className="chrome-sparkle-left" />
              <span className="chrome-sparkle-right" />
              <span className="chrome-capsule-inner px-8 py-3.5 text-xs sm:text-sm tracking-widest uppercase">
                <span>포트폴리오 내용 둘러보기</span>
                <span className="text-zinc-400 group-hover:translate-y-0.5 transition-transform font-bold">↓</span>
              </span>
            </button>
            <span className="text-[11px] text-zinc-400 font-mono tracking-tight">
              (마우스 휠을 내리시거나 버튼을 누르면 본문으로 이어집니다)
            </span>
          </div>
        </div>
      )}

      {/* 하단 스크롤 힌트 */}
      <div
        ref={hintRef}
        style={{
          position: "absolute",
          left: "50%",
          bottom: "clamp(20px, 6vh, 48px)",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          color: "rgba(240,244,248,0.75)",
          fontFamily: SANS,
          fontSize: "clamp(10px, 1.4vw, 12px)",
          fontWeight: 600,
          letterSpacing: "0.3em",
          transition: "opacity 0.4s ease",
          pointerEvents: "none",
        }}
      >
        <span>{scrollHint}</span>
        <svg
          width="14"
          height="18"
          viewBox="0 0 14 18"
          style={{ animation: "metro-hero-bounce 1.6s ease-in-out infinite" }}
        >
          <style>{`
            @keyframes metro-hero-bounce {
              0%, 100% { transform: translateY(0); opacity: 0.5; }
              50% { transform: translateY(5px); opacity: 1; }
            }
          `}</style>
          <path
            d="M7 1 L7 17 M2 12 L7 17 L12 12"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* 하단 스크롤 진행 바 */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 2,
          background: "rgba(255,255,255,0.12)",
        }}
      >
        <div
          ref={progressBarRef}
          style={{
            height: "100%",
            width: "100%",
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.5), rgba(255,255,255,0.95))",
            transform: "scaleX(0)",
            transformOrigin: "left center",
          }}
        />
      </div>

      {/* 시그니처 뱃지 */}
      {signature && (
        <span
          style={{
            position: "absolute",
            right: "clamp(12px, 2.5vw, 24px)",
            bottom: "clamp(10px, 2vw, 18px)",
            fontFamily: SANS,
            fontWeight: 500,
            fontSize: "clamp(11px, 1.4vw, 13px)",
            letterSpacing: "0.01em",
            color: "rgba(220,224,232,0.6)",
            zIndex: 2,
          }}
        >
          by{" "}
          <a
            href={signature.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "rgba(220,224,232,0.6)",
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.currentTarget.style.color = COL_TEXT
            }}
            onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.currentTarget.style.color = "rgba(220,224,232,0.6)"
            }}
          >
            {signature.name}
          </a>
        </span>
      )}
    </div>
  )
}
