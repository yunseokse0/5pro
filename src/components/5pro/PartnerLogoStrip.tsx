'use client';

import { useEffect, useState } from 'react';

interface Partner {
  id: string;
  name: string;
  logo: string;
  category: string;
  description: string;
}

export default function PartnerLogoStrip() {
  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    fetch('/data/partners.json')
      .then((res) => res.json())
      .then((data) => setPartners(data.partners || []))
      .catch(console.error);
  }, []);

  return (
    <section className="pt-20 pb-20 bg-white border-y border-gray-100">
      <div className="max-w-container mx-auto px-5">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            검증된 파트너와 함께
          </h2>
          <p className="text-gray-600">
            34개 협력사가 품질을 보증합니다
          </p>
        </div>

        {/* 로고 그리드 */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="flex items-center justify-center p-6 rounded-lg hover:bg-gray-50 transition-colors duration-120 group"
              title={partner.name}
            >
              <div className="text-center">
                {/* 플레이스홀더 로고 - 실제 로고로 교체 필요 */}
                <div className="w-full h-16 flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity duration-120">
                  <div className="text-xs font-medium text-gray-400 group-hover:text-gray-600 px-4 py-2 border-2 border-gray-200 rounded">
                    {partner.name}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 추가 설명 */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            시공·설비·인증·금융 분야 전문 파트너
          </p>
        </div>
      </div>
    </section>
  );
}

