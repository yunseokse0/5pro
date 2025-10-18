import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '회원가입 - 오프로',
  description: '오프로에 가입하여 투명한 건축 서비스를 시작하세요',
};

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-6xl w-full">
        <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
          <div className="grid lg:grid-cols-2 min-h-[700px]">
            {/* 왼쪽 섹션 - 서비스 강조 */}
            <div className="bg-gradient-to-br from-primary-50 to-blue-100 p-12 flex flex-col justify-center">
              <div className="max-w-md">
                <h1 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
                  건축 계획부터 완공까지, 오프로와 함께하는 건축은 투명하고 안전합니다.
                </h1>
                
                {/* 핵심 이점 리스트 */}
                <div className="space-y-6 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">건축주 직접 견적 비교</h3>
                      <p className="text-gray-600 text-sm">건축 관련 정보 제공 및 투명한 견적 비교 서비스</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">검증된 건설사 매칭</h3>
                      <p className="text-gray-600 text-sm">실력 있는 공사팀을 검증을 통해 매칭해드립니다</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">투명한 대금 관리</h3>
                      <p className="text-gray-600 text-sm">공정별 대금 지급으로 숨은 비용 없는 투명 관리</p>
                    </div>
                  </div>
                </div>
                
                {/* 건축 일러스트 */}
                <div className="relative">
                  <svg className="w-full h-32 text-primary/20" viewBox="0 0 200 80" fill="currentColor">
                    {/* 건물들이 위로 솟는 모습 */}
                    <rect x="20" y="40" width="12" height="40" rx="1" />
                    <rect x="40" y="30" width="12" height="50" rx="1" />
                    <rect x="60" y="20" width="12" height="60" rx="1" />
                    <rect x="80" y="25" width="12" height="55" rx="1" />
                    <rect x="100" y="15" width="12" height="65" rx="1" />
                    <rect x="120" y="35" width="12" height="45" rx="1" />
                    <rect x="140" y="10" width="12" height="70" rx="1" />
                    <rect x="160" y="28" width="12" height="52" rx="1" />
                    {/* 화살표 */}
                    <path d="M95 5 L95 15 L90 10 L100 10 Z" fill="currentColor" opacity="0.6" />
                  </svg>
                </div>
              </div>
            </div>

            {/* 오른쪽 섹션 - 회원가입 폼 */}
            <div className="p-12 flex flex-col justify-center">
              <div className="max-w-md mx-auto w-full">
                <div className="text-center mb-8">
                  <div className="mb-4">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                      <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                      <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-bold">3</div>
                    </div>
                    <p className="text-sm text-gray-500">3단계 중 2단계</p>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">본인 인증 완료</h2>
                  <p className="text-gray-600">아이디와 비밀번호를 설정해주세요.</p>
                </div>

                <form className="space-y-6">
                  <div>
                    <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-2">
                      아이디
                    </label>
                    <input
                      type="text"
                      id="userId"
                      name="userId"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-120"
                      placeholder="영문, 숫자 6-20자"
                      required
                    />
                    <p className="mt-1 text-xs text-gray-500">영문, 숫자를 포함하여 6-20자로 입력해주세요</p>
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                      비밀번호
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-120"
                      placeholder="영문, 숫자, 특수문자 포함 8-20자"
                      required
                    />
                    <p className="mt-1 text-xs text-gray-500">영문, 숫자, 특수문자를 포함하여 8-20자로 입력해주세요</p>
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                      비밀번호 확인
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-120"
                      placeholder="비밀번호를 다시 입력하세요"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      이메일
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-120"
                      placeholder="이메일을 입력하세요"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      휴대폰 번호
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-120"
                      placeholder="010-0000-0000"
                      required
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary mt-0.5"
                        required
                      />
                      <span className="text-sm text-gray-600">
                        <span className="text-red-500">*</span> 오프로 서비스 이용약관 및 개인정보 처리방침에 동의합니다.
                      </span>
                    </label>

                    <label className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary mt-0.5"
                      />
                      <span className="text-sm text-gray-600">
                        마케팅 정보 수신에 동의합니다. (선택)
                      </span>
                    </label>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Link
                      href="/login"
                      className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg text-center transition-colors duration-120 hover:border-gray-400"
                    >
                      이전으로
                    </Link>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg transition-colors duration-120"
                    >
                      회원가입
                    </button>
                  </div>
                </form>

                <div className="mt-8 text-center">
                  <p className="text-gray-600 text-sm">
                    이미 계정이 있으신가요?{' '}
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