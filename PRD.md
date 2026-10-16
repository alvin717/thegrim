# 프로젝트 기획서 (PRD): 멀티 페르소나 전문가 포트폴리오 & 외주 의뢰 웹사이트

## 1. 프로젝트 개요 및 목표
- 대상: 인테리어 디자인/시공 대표, 골프 세미프로 코치, 한국어 지도 강사, 웹·앱 풀스택 개발자
- 목표: 방문자에게 첫인상부터 강렬한 인터랙션 경험을 선사하고, 4대 전문성을 명확히 전달하여 외주 의뢰 및 교육 상담으로 연결.
- 아키텍처: Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui 구조.

## 2. 대문(Hero) 인터랙션 설계 (핵심)
- Reference: 21st.dev "Scroll-Locked Video Hero" (`MetroHero`)
- 위치: `@/components/ui/scroll-locked-video-hero.tsx`
- 사용자 경험:
  1. 진입 시 풀스크린 시네마틱 비디오와 메인 타이틀 배치.
  2. 스크롤 시 화면이 일시적으로 고정되며 영상이 프레임 단위로 스크러빙(Scrubbing).
  3. 진행률에 따라 인트로 텍스트가 블러/페이드아웃되고, 대표 슬로건("공간부터 디지털까지, 삶의 가치를 높입니다")이 페이드인.
  4. 비디오 스크러빙 완료 시 자연스럽게 하단 본문(4대 전문분야 소개 섹션)으로 스크롤이 해제되어 연결됨.

## 3. 사이트 구조
1. **Hero Section**: `MetroHero` 스크롤 인터랙션 비디오 배너
2. **Core Services (4대 전문 영역)**:
   - Interior & Construction (공간 기획 및 시공)
   - Golf Coaching (세미프로 1:1 맞춤형 레슨)
   - Korean Language Education (한국어 지도 강사)
   - Web & App Development (웹/앱 제작 및 자동화)
3. **Portfolio & Proof**: 성과 지표, 작업 갤러리 탭
4. **Contact Form**: 외주 의뢰, 견적 문의, 1:1 상담 신청 폼
5. **Footer**: 사업자 정보, SNS/전화 다이렉트 연결