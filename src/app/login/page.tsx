import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '로그인 - 오프로',
  description: '오프로에 로그인하여 건축 서비스를 이용하세요',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-6xl w-full">
        <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
          <div className="grid lg:grid-cols-2 min-h-[600px]">
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

            {/* 오른쪽 섹션 - 로그인 폼 */}
            <div className="p-12 flex flex-col justify-center">
              <div className="max-w-md mx-auto w-full">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">로그인</h2>
                  <p className="text-gray-600">오프로 계정으로 로그인하세요</p>
                </div>

                <form className="space-y-6">
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
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                      비밀번호
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-120"
                      placeholder="비밀번호를 입력하세요"
                      required
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                      />
                      <span className="ml-2 text-sm text-gray-600">로그인 상태 유지</span>
                    </label>
                    <Link href="/forgot-password" className="text-sm text-primary hover:text-primary-hover">
                      비밀번호 찾기
                    </Link>
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg transition-colors duration-120"
                  >
                    로그인
                  </button>
                </form>

                <div className="mt-8 text-center">
                  <p className="text-gray-600 text-sm">
                    아직 계정이 없으신가요?{' '}
                    <Link href="/signup" className="text-primary hover:text-primary-hover font-medium">
                      회원가입하기
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