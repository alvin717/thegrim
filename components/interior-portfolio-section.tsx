"use client"

import { useState, useEffect, useRef } from "react"

export interface PortfolioCase {
  id: string
  title: string
  category: string
  area: string
  period: string
  concept: string
  points: string[]
  beforeAfter: string
  badge: string
  locationName: string
  locationAddress: string
  kakaoMapUrl: string
  naverMapUrl: string
  defaultImage: string
  customImage?: string
}

const INITIAL_CASES: PortfolioCase[] = [
  {
    id: "seongsu",
    title: "성수동 복합 문화 쇼룸 & 오피스",
    category: "상업 공간 브랜딩",
    area: "65평 (214㎡)",
    period: "4주 소요",
    concept: "모던 인더스트리얼 & 웜 미니멀리즘",
    points: [
      "노출 콘크리트와 따뜻한 원목 집기의 감각적 조화",
      "브랜드 쇼룸과 업무 공간을 유연하게 분리하는 유리 파티션",
      "3D 정밀 조도 설계를 통한 시간대별 조명 연출",
    ],
    beforeAfter: "노후 창고 공간 → 하이엔드 복합 쇼룸 변신",
    badge: "상업 시공 우수작",
    locationName: "서울 성수동 카페거리 인근",
    locationAddress: "서울특별시 성동구 성수이로 (성수역 도보 5분)",
    kakaoMapUrl: "https://map.kakao.com/link/search/성수이로",
    naverMapUrl: "https://m.map.naver.com/search2/search.naver?query=성수이로",
    defaultImage: "/images/portfolio/seongsu.jpg",
  },
  {
    id: "hannam",
    title: "한남동 하이엔드 주거 아파트",
    category: "프리미엄 주거 리모델링",
    area: "48평 (158㎡)",
    period: "5주 소요",
    concept: "호텔식 구조 변경 & 히든 도어 인테리어",
    points: [
      "대형 아일랜드 대면형 주방 및 히든 팬트리 시공",
      "무몰딩·무문선·라인 조명 마감으로 극대화된 공간감",
      "친환경 이태리 포세린 타일 및 수입 원목마루 적용",
    ],
    beforeAfter: "20년 된 칙칙한 체리색 마감 → 모던 호텔 스위트룸",
    badge: "주거 리모델링 베스트",
    locationName: "서울 용산구 한남동 UN빌리지 인근",
    locationAddress: "서울특별시 용산구 한남대로",
    kakaoMapUrl: "https://map.kakao.com/link/search/한남대로",
    naverMapUrl: "https://m.map.naver.com/search2/search.naver?query=한남대로",
    defaultImage: "/images/portfolio/hannam.jpg",
  },
  {
    id: "pangyo",
    title: "판교 IT 스타트업 라운지 & 미팅룸",
    category: "오피스 공간 기획",
    area: "82평 (271㎡)",
    period: "3.5주 소요",
    concept: "애자일 워크스페이스 & 방음 폰부스",
    points: [
      "직원 몰입도를 높이는 인체공학적 동선 분리",
      "음향 흡음재 적용 화상회의 전용 폰부스 4실 구축",
      "자유로운 소통이 가능한 카페형 타운홀 라운지",
    ],
    beforeAfter: "칸막이 사무실 → 창의적 오픈 워크스페이스",
    badge: "업무 생산성 극대화",
    locationName: "경기 성남시 판교 테크노밸리",
    locationAddress: "경기도 성남시 분당구 판교역로",
    kakaoMapUrl: "https://map.kakao.com/link/search/판교테크노밸리",
    naverMapUrl: "https://m.map.naver.com/search2/search.naver?query=판교테크노밸리",
    defaultImage: "/images/portfolio/pangyo.jpg",
  },
]

export default function InteriorPortfolioSection() {
  const [cases, setCases] = useState<PortfolioCase[]>(INITIAL_CASES)
  const [editingCase, setEditingCase] = useState<PortfolioCase | null>(null)
  const [selectedCaseForDetail, setSelectedCaseForDetail] = useState<PortfolioCase | null>(null)
  
  // 사진 업로드 모달 상태
  const [previewImage, setPreviewImage] = useState<string>("")
  const [addressInput, setAddressInput] = useState<string>("")
  const [mapInput, setMapInput] = useState<string>("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 로컬 스토리지에서 저장된 사용자 커스텀 사진 불러오기
  useEffect(() => {
    try {
      const saved = localStorage.getItem("thegrim_interior_portfolio_v2")
      if (saved) {
        const parsed = JSON.parse(saved) as Record<string, { image?: string; address?: string; mapUrl?: string }>
        setCases((prev) =>
          prev.map((c) => {
            if (parsed[c.id]) {
              return {
                ...c,
                customImage: parsed[c.id].image || c.customImage,
                locationAddress: parsed[c.id].address || c.locationAddress,
                kakaoMapUrl: parsed[c.id].mapUrl || c.kakaoMapUrl,
                naverMapUrl: parsed[c.id].mapUrl || c.naverMapUrl,
              }
            }
            return c
          })
        )
      }
    } catch (e) {
      console.error("Failed to load custom portfolio data", e)
    }
  }, [])

  // 사진 수정 모달 열기
  const handleOpenEditModal = (item: PortfolioCase, e: React.MouseEvent) => {
    e.stopPropagation()
    setEditingCase(item)
    setPreviewImage(item.customImage || item.defaultImage)
    setAddressInput(item.locationAddress)
    setMapInput(item.kakaoMapUrl)
  }

  // 파일 업로드 (내 컴퓨터/스마트폰 사진 선택)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 10 * 1024 * 1024) {
      alert("파일 크기는 최대 10MB까지 업로드 가능합니다.")
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      const base64 = event.target?.result as string
      setPreviewImage(base64)
    }
    reader.readAsDataURL(file)
  }

  // 변경 내용 저장
  const handleSaveEdit = () => {
    if (!editingCase) return

    const updatedCases = cases.map((c) => {
      if (c.id === editingCase.id) {
        return {
          ...c,
          customImage: previewImage,
          locationAddress: addressInput || c.locationAddress,
          kakaoMapUrl: mapInput || c.kakaoMapUrl,
          naverMapUrl: mapInput || c.naverMapUrl,
        }
      }
      return c
    })

    setCases(updatedCases)

    // 로컬 스토리지에 영구 보존
    try {
      const storageObj: Record<string, { image?: string; address?: string; mapUrl?: string }> = {}
      updatedCases.forEach((c) => {
        if (c.customImage || c.locationAddress !== INITIAL_CASES.find((i) => i.id === c.id)?.locationAddress) {
          storageObj[c.id] = {
            image: c.customImage,
            address: c.locationAddress,
            mapUrl: c.kakaoMapUrl,
          }
        }
      })
      localStorage.setItem("thegrim_interior_portfolio_v2", JSON.stringify(storageObj))
    } catch (e) {
      console.error("Failed to save to localStorage", e)
    }

    alert("시공 사진 및 장소 정보가 성공적으로 반영되었습니다!")
    setEditingCase(null)
  }

  // 기본 사진으로 초기화
  const handleResetToDefault = () => {
    if (!editingCase) return
    if (!confirm("기본 시공 사진으로 복원하시겠습니까?")) return

    const updatedCases = cases.map((c) => {
      if (c.id === editingCase.id) {
        return {
          ...c,
          customImage: undefined,
        }
      }
      return c
    })

    setCases(updatedCases)
    try {
      const saved = localStorage.getItem("thegrim_interior_portfolio_v2")
      if (saved) {
        const parsed = JSON.parse(saved)
        delete parsed[editingCase.id]
        localStorage.setItem("thegrim_interior_portfolio_v2", JSON.stringify(parsed))
      }
    } catch (e) {
      console.error(e)
    }

    setEditingCase(null)
  }

  // 장소 링크 열기 (카카오맵 / 네이버 지도)
  const handleNavigateToPlace = (item: PortfolioCase, e: React.MouseEvent) => {
    e.stopPropagation()
    window.open(item.kakaoMapUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <section id="portfolio" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200">
      {/* 갤러리 헤더 */}
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <span className="text-xs font-bold text-sky-700 tracking-widest uppercase bg-sky-100 px-3.5 py-1 rounded-full border border-sky-300 shadow-sm">
          Signature Works & Places
        </span>
        <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
          시공 사례 및 공간 갤러리
        </h2>
        <p className="text-slate-600 text-sm sm:text-base font-medium">
          카드를 클릭하면 시공된 실제 장소로 바로 이동하며, 대표님이 시공한 실제 사진을 수시로 등록·교체하실 수 있습니다.
        </p>
      </div>

      {/* 3대 시공 사례 카드 그리드 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {cases.map((item) => {
          const currentImg = item.customImage || item.defaultImage
          const isCustom = Boolean(item.customImage)

          return (
            <div
              key={item.id}
              onClick={() => setSelectedCaseForDetail(item)}
              className="rounded-3xl bg-white/90 border border-slate-200/90 hover:border-sky-400 transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1.5 shadow-xl backdrop-blur-md cursor-pointer"
            >
              {/* 상단 시공 사진 영역 */}
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={currentImg}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                {/* 뱃지 및 사진 변경 버튼 */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-white/95 text-sky-900 shadow-md backdrop-blur-sm border border-slate-100">
                    {item.badge}
                  </span>

                  {/* 사진 변경하기 버튼 */}
                  <button
                    onClick={(e) => handleOpenEditModal(item, e)}
                    className="px-3 py-1.5 rounded-full text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white shadow-lg flex items-center gap-1.5 active:scale-95 transition-all min-h-[36px]"
                    title="내가 시공한 사진 올리기 / 바꾸기"
                  >
                    <span>📷 사진 올리기·변경</span>
                    {isCustom && <span className="w-2 h-2 rounded-full bg-emerald-400" />}
                  </button>
                </div>

                {/* 하단 장소 바로가기 안내 오버레이 */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                  <button
                    onClick={(e) => handleNavigateToPlace(item, e)}
                    className="px-3 py-1 rounded-lg bg-black/60 hover:bg-sky-600 text-white font-bold backdrop-blur-sm flex items-center gap-1.5 transition-colors border border-white/20 min-h-[34px]"
                    title="클릭 시 시공된 장소 지도로 이동"
                  >
                    <span>📍 {item.locationName}</span>
                    <span className="text-[11px] bg-white/20 px-1.5 py-0.5 rounded">지도 이동 ↗</span>
                  </button>
                  <span className="text-[11px] font-mono text-slate-200">{item.area}</span>
                </div>
              </div>

              {/* 본문 콘텐츠 */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                <div className="space-y-3.5">
                  <div>
                    <div className="text-xs text-slate-500 font-semibold mb-1">{item.category}</div>
                    <h3 className="text-xl font-black text-slate-900 group-hover:text-sky-700 transition-colors flex items-center justify-between">
                      <span>{item.title}</span>
                      <span className="text-sky-600 text-sm group-hover:translate-x-1 transition-transform">→</span>
                    </h3>
                  </div>

                  {/* 위치 주소 안내 바 */}
                  <div className="p-2.5 rounded-xl bg-sky-50 border border-sky-200/80 flex items-center justify-between text-xs text-sky-900">
                    <span className="truncate pr-2">📍 {item.locationAddress}</span>
                    <button
                      onClick={(e) => handleNavigateToPlace(item, e)}
                      className="font-bold underline underline-offset-2 whitespace-nowrap text-sky-700 hover:text-sky-950"
                    >
                      장소 보기
                    </button>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-medium">
                    <span className="font-bold text-sky-700">💡 변화 핵심: </span>
                    {item.beforeAfter}
                  </div>

                  <div className="space-y-2 pt-1">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      시공 디테일
                    </div>
                    <ul className="space-y-1.5">
                      {item.points.map((p, pIdx) => (
                        <li key={pIdx} className="text-xs text-slate-700 font-medium flex items-start gap-2">
                          <span className="text-sky-600 font-bold">✓</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* 하단 버튼 및 정보 */}
                <div className="pt-4 border-t border-slate-200 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>공사 기간: {item.period}</span>
                    <span className="text-slate-800 font-bold">{item.concept}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={(e) => handleNavigateToPlace(item, e)}
                      className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors min-h-[40px] shadow-sm"
                    >
                      <span>📍 장소 길찾기</span>
                      <span>↗</span>
                    </button>
                    <button
                      onClick={(e) => handleOpenEditModal(item, e)}
                      className="py-2.5 px-3 rounded-xl bg-sky-100 hover:bg-sky-200 text-sky-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-sky-200 min-h-[40px]"
                    >
                      <span>📷 사진 변경</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* 📷 사진 업로드 및 장소 수정 모달 */}
      {editingCase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]">
            <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div>
                <span className="text-xs font-bold text-sky-700 uppercase tracking-wider">
                  시공 사진 & 장소 관리자
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-0.5">
                  {editingCase.title}
                </h3>
              </div>
              <button
                onClick={() => setEditingCase(null)}
                className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold flex items-center justify-center transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6 overflow-y-auto">
              {/* 실시간 사진 미리보기 */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-800">
                  현재 등록된 시공 사진
                </label>
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border-2 border-dashed border-sky-300 bg-slate-50 flex items-center justify-center">
                  <img
                    src={previewImage}
                    alt="미리보기"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 bg-white text-slate-900 rounded-xl font-bold text-xs shadow-lg hover:bg-slate-100 transition-colors"
                    >
                      새 사진 파일 선택
                    </button>
                  </div>
                </div>
              </div>

              {/* 내 기기에서 사진 선택 버튼 */}
              <div className="space-y-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-3.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-sm shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.98] min-h-[44px]"
                >
                  <span>📁 내 컴퓨터 / 스마트폰에서 시공 사진 선택</span>
                </button>
                <p className="text-[11px] text-slate-500 text-center">
                  스마트폰이나 PC에 있는 실제 현장 사진(JPG, PNG, WebP)을 선택하시면 즉시 교체됩니다.
                </p>
              </div>

              {/* 시공된 장소 주소 및 지도 링크 수정 */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">
                    📍 시공 장소 주소 표시
                  </label>
                  <input
                    type="text"
                    value={addressInput}
                    onChange={(e) => setAddressInput(e.target.value)}
                    placeholder="예: 서울특별시 성동구 성수이로 123"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 shadow-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">
                    🗺️ 이동할 지도 검색 링크 (카카오맵 / 네이버 지도)
                  </label>
                  <input
                    type="text"
                    value={mapInput}
                    onChange={(e) => setMapInput(e.target.value)}
                    placeholder="예: https://map.kakao.com/link/search/성수동"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 shadow-sm"
                  />
                </div>
              </div>
            </div>

            {/* 모달 하단 버튼 */}
            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleResetToDefault}
                className="px-3.5 py-2.5 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors"
              >
                기본 사진으로 복원
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setEditingCase(null)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors min-h-[40px]"
                >
                  취소
                </button>
                <button
                  type="button"
                  onClick={handleSaveEdit}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs shadow-md transition-all min-h-[40px]"
                >
                  사진 & 장소 저장하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 🔍 상세 보기 & 지도 이동 팝업 모달 */}
      {selectedCaseForDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]">
            <div className="relative aspect-[16/9] w-full bg-slate-100">
              <img
                src={selectedCaseForDetail.customImage || selectedCaseForDetail.defaultImage}
                alt={selectedCaseForDetail.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedCaseForDetail(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white font-bold flex items-center justify-center backdrop-blur-sm transition-colors"
              >
                ✕
              </button>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-600 shadow-md">
                  {selectedCaseForDetail.badge}
                </span>
                <span className="text-xs font-mono bg-black/60 px-2.5 py-1 rounded-md backdrop-blur-sm">
                  {selectedCaseForDetail.area} · {selectedCaseForDetail.period}
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
              <div>
                <div className="text-xs font-bold text-sky-700 uppercase tracking-wider mb-1">
                  {selectedCaseForDetail.category}
                </div>
                <h3 className="text-2xl font-black text-slate-900">
                  {selectedCaseForDetail.title}
                </h3>
                <p className="text-sm text-slate-600 mt-2 font-medium">
                  {selectedCaseForDetail.concept}
                </p>
              </div>

              {/* 시공된 장소 안내 & 지도 길찾기 버튼 */}
              <div className="p-5 rounded-2xl bg-sky-50/80 border border-sky-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-sky-900 uppercase">📍 실제 시공 장소</span>
                  <span className="text-xs text-sky-700 font-semibold">{selectedCaseForDetail.locationName}</span>
                </div>
                <div className="text-sm font-bold text-slate-900">
                  {selectedCaseForDetail.locationAddress}
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <a
                    href={selectedCaseForDetail.kakaoMapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-4 rounded-xl bg-[#FEE500] hover:bg-[#ebd200] text-[#191919] font-black text-xs flex items-center justify-center gap-1.5 shadow-sm transition-transform active:scale-95"
                  >
                    <span>🟡 카카오맵으로 장소 보기</span>
                  </a>
                  <a
                    href={selectedCaseForDetail.naverMapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-4 rounded-xl bg-[#03C75A] hover:bg-[#02b350] text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-sm transition-transform active:scale-95"
                  >
                    <span>🟢 네이버 지도로 보기</span>
                  </a>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  시공 핵심 포인트
                </h4>
                <ul className="space-y-2">
                  {selectedCaseForDetail.points.map((p, idx) => (
                    <li key={idx} className="text-sm text-slate-700 font-medium flex items-start gap-2.5">
                      <span className="text-sky-600 font-bold mt-0.5">✓</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-5 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <button
                onClick={(e) => {
                  const target = selectedCaseForDetail
                  setSelectedCaseForDetail(null)
                  handleOpenEditModal(target, e)
                }}
                className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
              >
                <span>📷 이 현장 사진 올리기 / 바꾸기</span>
              </button>

              <button
                onClick={() => setSelectedCaseForDetail(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
