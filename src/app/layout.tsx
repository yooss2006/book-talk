import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Book Talk",
  description: "책에 대한 이야기를 나누는 공간",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        {modal}
        {children}
      </body>
    </html>
  );
}
