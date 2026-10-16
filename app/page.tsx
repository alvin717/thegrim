import Navbar from "@/components/navbar";
import MetroHero from "@/components/ui/scroll-locked-video-hero";
import ServicesSection from "@/components/services-section";
import ProofSection from "@/components/proof-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import FloatingContactBar from "@/components/floating-contact-bar";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#05070d] text-[#f2f4f8] selection:bg-white selection:text-black">
      {/* 상단 글로벌 네비게이션 & 로그인/마이페이지 헤더 */}
      <Navbar />

      {/* 1. 대문(Hero): 원본 지하철 문 시네마틱 스크러빙 & 양방향 휠 개폐 */}
      <MetroHero
        title="THE GRIM"
        tagline="공간부터 디지털까지, 삶의 가치를 높입니다."
        scrollHint="SCROLL TO OPEN"
        signature={{ name: "The Grim Studio", url: "#" }}
        scrubDistance={2400}
      />

      {/* 2. 4대 전문 영역(Core Services) 인터랙티브 섹션 */}
      <ServicesSection />

      {/* 3. 성과 및 포트폴리오 갤러리(Proof) 섹션 */}
      <ProofSection />

      {/* 4. 프로젝트 의뢰 & 1:1 레슨 상담 신청 폼(Contact Form) */}
      <ContactSection />

      {/* 5. 공식 푸터(Footer) */}
      <Footer />

      {/* 6. 모바일 퍼스트 하단 플로팅 전화/상담 바 */}
      <FloatingContactBar />
    </div>
  );
}
