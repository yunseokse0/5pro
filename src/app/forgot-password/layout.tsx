import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '비밀번호 찾기 - 오프로',
  description: '오프로 계정의 비밀번호를 재설정하세요',
};

export default function ForgotPasswordLayout({
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
