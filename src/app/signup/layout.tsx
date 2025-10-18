import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '회원가입 - 오프로',
  description: '오프로에 가입하여 투명한 건축 서비스를 시작하세요',
};

export default function SignupLayout({
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
