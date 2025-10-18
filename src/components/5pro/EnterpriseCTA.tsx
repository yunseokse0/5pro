'use client';

import Link from 'next/link';

export default function EnterpriseCTA() {
  return (
    <section className="pt-20 pb-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5">
        <svg className="w-full h-full" viewBox="0 0 200 200" fill="currentColor">
          <circle cx="100" cy="100" r="80" />
        </svg>
      </div>

      <div className="max-w-container mx-auto px-5 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 좌측 콘텐츠 */}
          <div>
            <h2 className="text-4xl font-bold mb-6">
              기업 파트너를 찾습니다
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              시공사·설비사·금융사 등 협력 네트워크를 확장합니다.
              <br />
              함께 성장할 파트너를 기다립니다.
            </p>

            {/* 특징 */}
            <ul className="space-y-4 mb-10">
              {[
                '검증된 프로젝트 수주 기회',
                '투명한 계약·정산 프로세스',
                '기술·품질 지원 체계',
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 우측 CTA 카드 */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-card p-10">
            <h3 className="text-2xl font-bold mb-6">함께 하시겠습니까?</h3>
            
            <div className="space-y-4">
              <Link
                href="/partners/register"
                className="block w-full px-8 py-4 bg-white hover:bg-gray-100 text-gray-900 text-center text-base font-medium rounded-lg transition-colors duration-120"
              >
                기업 제휴 문의
              </Link>
              
              <Link
                href="/about"
                className="block w-full px-8 py-4 bg-white/10 hover:bg-white/20 text-white text-center text-base font-medium rounded-lg transition-colors duration-120 border border-white/20"
              >
                회사 소개서 받기
              </Link>
            </div>

            <div className="mt-8 pt-8 border-t border-white/10">
              <div className="text-sm text-gray-400 mb-3">문의</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>partners@offro.kr</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>02-1234-5678</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

