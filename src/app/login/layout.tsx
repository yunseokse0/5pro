import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '로그인 - 오프로',
  description: '오프로에 로그인하여 건축 서비스를 이용하세요',
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-gray-50">
        {children}
      </body>
    </html>
  );
}
