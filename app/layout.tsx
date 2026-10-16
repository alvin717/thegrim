import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 뷰포트 메타태그 설정 (모바일 최적화 및 불필요한 확대 방지)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
};

// 메타데이터 설정 (한국어 및 전문가 포트폴리오 SEO 대응)
export const metadata: Metadata = {
  title: "더 그림 (The Grim) | 공간 기획부터 디지털 개발까지",
  description: "인테리어 디렉팅, 골프 맞춤 코칭, 한국어 교육, 풀스택 웹·앱 개발 다분야 전문가 공식 포트폴리오",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">{children}</body>
    </html>
  );
}
