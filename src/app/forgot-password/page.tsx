import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '비밀번호 찾기 - 오프로',
  description: '오프로 계정의 비밀번호를 재설정하세요',
};

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-6xl w-full">
        <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
          <div className="grid lg:grid-cols-2 min-h-[600px]">
            {/* 왼쪽 섹션 - 서비스 강조 */}
            <div className="bg-gradient-to-br from-primary-50 to-blue-100 p-12 flex flex-col justify-center">
              <div className="max-w-md">
                <h1 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
                  안전한 계정 관리를 위해 비밀번호를 재설정하세요.
                </h1>
                
                {/* 보안 정보 */}
                <div className="space-y-6 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                      🔒
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">보안 강화</h3>
                      <p className="text-gray-600 text-sm">정기적인 비밀번호 변경으로 계정을 보호하세요</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                      ✉️
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">이메일 인증</h3>
                      <p className="text-gray-600 text-sm">등록된 이메일로 안전하게 비밀번호를 재설정할 수 있습니다</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                      🛡️
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">투명한 서비스</h3>
                      <p className="text-gray-600 text-sm">오프로는 사용자의 개인정보를 안전하게 보호합니다</p>
                    </div>
                  </div>
                </div>
                
                {/* 보안 일러스트 */}
                <div className="relative">
                  <svg className="w-full h-32 text-primary/20" viewBox="0 0 200 80" fill="currentColor">
                    {/* 방패와 열쇠 */}
                    <path d="M100 20 L120 30 L120 50 C120 60 110 65 100 65 C90 65 80 60 80 50 L80 30 Z" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <path d="M95 35 L95 45 M90 40 L100 40" stroke="currentColor" strokeWidth="2"/>
                    <path d="M140 25 L150 30 L145 35 L135 30 Z" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <circle cx="142" cy="30" r="3" fill="currentColor"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* 오른쪽 섹션 - 비밀번호 찾기 폼 */}
            <div className="p-12 flex flex-col justify-center">
              <div className="max-w-md mx-auto w-full">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">비밀번호 찾기</h2>
                  <p className="text-gray-600">등록된 이메일로 비밀번호 재설정 링크를 보내드립니다</p>
                </div>

                <form className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      이메일 주소
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-120"
                      placeholder="가입 시 사용한 이메일을 입력하세요"
                      required
                    />
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <p className="text-sm text-blue-800 font-medium">안내사항</p>
                        <p className="text-sm text-blue-700 mt-1">
                          입력하신 이메일 주소로 비밀번호 재설정 링크가 발송됩니다. 
                          이메일을 확인하고 링크를 클릭하여 새 비밀번호를 설정해주세요.
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg transition-colors duration-120"
                  >
                    비밀번호 재설정 이메일 발송
                  </button>
                </form>

                <div className="mt-8 text-center space-y-3">
                  <p className="text-gray-600 text-sm">
                    이메일을 받지 못하셨나요?{' '}
                    <Link href="/contact" className="text-primary hover:text-primary-hover font-medium">
                      고객센터 문의
                    </Link>
                  </p>
                  <p className="text-gray-600 text-sm">
                    계정이 기억나셨나요?{' '}
                    <Link href="/login" className="text-primary hover:text-primary-hover font-medium">
                      로그인하기
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
