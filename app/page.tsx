import Navbar from "@/components/navbar";
import MetroHero from "@/components/ui/scroll-locked-video-hero";
import ServicesSection from "@/components/services-section";
import ProofSection from "@/components/proof-section";
import CeoProfileCard from "@/components/ceo-profile-card";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import FloatingContactBar from "@/components/floating-contact-bar";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-sky-200 selection:text-sky-900 relative">
      {/* 3번 이미지 배경 적용: '나머지는 3번 이미지로 처리' (화면 고정 배경) */}
      <div
        className="fixed inset-0 pointer-events-none z-0 bg-cover bg-center bg-no-repeat opacity-95"
        style={{ backgroundImage: "url('/images/bg/bg-korean.png')" }}
      />

      <div className="relative z-10">
        {/* 상단 글로벌 네비게이션 & 로그인/마이페이지 헤더 */}
        <Navbar />

        {/* 1. 대문(Hero): 원본 지하철 문 시네마틱 스크러빙 & 양방향 휠 개폐 (원형 절대 보존) */}
        <MetroHero
          title="THE GRIM"
          tagline="공간부터 디지털까지, 삶의 가치를 높입니다."
          scrollHint="SCROLL TO OPEN"
          signature={{ name: "The Grim Studio", url: "#" }}
          scrubDistance={1400}
        />

        {/* 2. 4대 전문 영역(Core Services) 인터랙티브 섹션 (1, 2, 3, 4번 이미지 탭 연동) */}
        <ServicesSection />

        {/* 3. 성과 및 포트폴리오 갤러리(Proof) 섹션 (3번 이미지 배경 연동) */}
        <ProofSection />

        {/* 4. 더 그림 대표(CEO) 공식 프로필 & 직통 소통 채널 카드 */}
        <CeoProfileCard />

        {/* 5. 프로젝트 의뢰 & 1:1 레슨 상담 신청 폼(Contact Form) (3번 이미지 배경 연동) */}
        <ContactSection />

        {/* 6. 공식 푸터(Footer) */}
        <Footer />

        {/* 7. 모바일 퍼스트 하단 플로팅 전화/상담 바 */}
        <FloatingContactBar />
      </div>
    </div>
  );
}
