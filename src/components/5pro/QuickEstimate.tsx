'use client';

import { useState } from 'react';
import Link from 'next/link';

interface EstimateResult {
  min: number;
  max: number;
  unit: string;
}

export default function QuickEstimate() {
  const [buildingType, setBuildingType] = useState('');
  const [area, setArea] = useState('');
  const [region, setRegion] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [estimateResult, setEstimateResult] = useState<EstimateResult | null>(null);

  const buildingTypes = [
    { value: 'bakery', label: '베이커리 공장' },
    { value: 'dairy', label: '유제품 공장' },
    { value: 'kimchi', label: '김치/발효 공장' },
    { value: 'frozen', label: '냉동식품 공장' },
    { value: 'healthfood', label: '건강식품 공장' },
    { value: 'other', label: '기타 식품공장' },
  ];

  const regions = [
    { value: 'seoul', label: '서울특별시' },
    { value: 'gyeonggi', label: '경기도' },
    { value: 'busan', label: '부산광역시' },
    { value: 'incheon', label: '인천광역시' },
    { value: 'daegu', label: '대구광역시' },
    { value: 'daejeon', label: '대전광역시' },
    { value: 'gwangju', label: '광주광역시' },
    { value: 'ulsan', label: '울산광역시' },
    { value: 'sejong', label: '세종특별자치시' },
    { value: 'gangwon', label: '강원도' },
    { value: 'chungbuk', label: '충청북도' },
    { value: 'chungnam', label: '충청남도' },
    { value: 'jeonbuk', label: '전라북도' },
    { value: 'jeonnam', label: '전라남도' },
    { value: 'gyeongbuk', label: '경상북도' },
    { value: 'gyeongnam', label: '경상남도' },
    { value: 'jeju', label: '제주특별자치도' },
  ];

  // 간단한 견적 계산 로직 (실제로는 더 복잡한 알고리즘 사용)
  const calculateEstimate = () => {
    if (!buildingType || !area || !region) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    const areaNum = parseFloat(area);
    if (isNaN(areaNum) || areaNum <= 0) {
      alert('올바른 면적을 입력해주세요.');
      return;
    }

    // 기본 단가 (평당 만원 기준) - 식품공장 특화
    let basePrice = 0;
    switch (buildingType) {
      case 'bakery':
        basePrice = 1500; // 평당 150만원 (오븐, 발효실 등 특수 설비)
        break;
      case 'dairy':
        basePrice = 1800; // 평당 180만원 (냉장, 살균 설비)
        break;
      case 'kimchi':
        basePrice = 1200; // 평당 120만원 (발효실, 저장고)
        break;
      case 'frozen':
        basePrice = 2000; // 평당 200만원 (냉동설비, 보관창고)
        break;
      case 'healthfood':
        basePrice = 1600; // 평당 160만원 (정제, 캡슐 설비)
        break;
      case 'other':
        basePrice = 1400; // 평당 140만원 (일반 식품공장)
        break;
    }

    // 지역별 가중치
    const regionMultiplier = region === 'seoul' ? 1.3 : 
                            ['gyeonggi', 'busan', 'incheon'].includes(region) ? 1.1 : 1.0;

    const baseEstimate = areaNum * basePrice * regionMultiplier;
    const minEstimate = baseEstimate * 0.8;
    const maxEstimate = baseEstimate * 1.2;

    setEstimateResult({
      min: Math.round(minEstimate / 1000) * 1000, // 천만원 단위로 반올림
      max: Math.round(maxEstimate / 1000) * 1000,
      unit: '만원'
    });

    setShowResult(true);
  };

  const closeResult = () => {
    setShowResult(false);
    setEstimateResult(null);
  };

  return (
    <>
      <section className="pt-16 pb-20 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-container mx-auto px-5">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              3초 만에 식품공장 예상 공사비를 확인하세요.
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600">
              간단한 정보 입력만으로, 지역별/공장종류별 평균 공사비를 즉시 안내해 드립니다.
            </p>
          </div>

          {/* 퀵 견적 폼 */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-soft p-4 sm:p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6 items-end">
                {/* 건물 용도 */}
                <div>
                  <label htmlFor="building-type" className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                    식품공장 종류
                  </label>
                  <select
                    id="building-type"
                    value={buildingType}
                    onChange={(e) => setBuildingType(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-120"
                  >
                    <option value="">선택하세요</option>
                    {buildingTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 예상 면적 */}
                <div>
                  <label htmlFor="area" className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                    예상 면적
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="area"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      placeholder="예: 200"
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-120"
                    />
                    <span className="absolute right-3 top-2.5 sm:top-3 text-gray-500 text-xs sm:text-sm">평</span>
                  </div>
                </div>

                {/* 지역 */}
                <div>
                  <label htmlFor="region" className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                    지역
                  </label>
                  <select
                    id="region"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-120"
                  >
                    <option value="">선택하세요</option>
                    {regions.map((region) => (
                      <option key={region.value} value={region.value}>
                        {region.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* CTA 버튼 */}
                <div>
                  <button
                    onClick={calculateEstimate}
                    className="w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-primary hover:bg-primary-hover text-white text-sm sm:text-base font-semibold rounded-lg transition-colors duration-120 shadow-soft hover:shadow-soft-hover"
                  >
                    예상 견적 확인하기
                  </button>
                </div>
              </div>

              {/* 결과 표시 영역 */}
              {showResult && estimateResult && (
                <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
                  <div className="text-center">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                      예상 공사비
                    </h3>
                    <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary mb-3 sm:mb-4">
                      {estimateResult.min.toLocaleString()} ~ {estimateResult.max.toLocaleString()} {estimateResult.unit}
                    </div>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-4 sm:mb-6">
                * 위 금액은 참고용 평균 견적이며, HACCP 설비, 특수 공정라인 등에 따라 실제 공사비는 달라질 수 있습니다.
              </p>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                      <button
                        onClick={closeResult}
                        className="px-4 sm:px-6 py-2.5 sm:py-3 border-2 border-gray-300 text-gray-700 text-sm sm:text-base font-medium rounded-lg transition-colors duration-120 hover:border-gray-400"
                      >
                        다시 계산하기
                      </button>
                      <Link
                        href="/contact"
                        className="px-4 sm:px-6 py-2.5 sm:py-3 bg-primary hover:bg-primary-hover text-white text-sm sm:text-base font-medium rounded-lg transition-colors duration-120 text-center"
                      >
                        정확한 견적 받기
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 안내 메시지 */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                정확한 견적은 무료 견적 요청을 통해 받아보세요. 전문가가 현장을 방문하여 상세한 견적을 제공합니다.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
