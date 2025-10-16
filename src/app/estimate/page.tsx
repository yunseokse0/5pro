'use client';

import { useState } from 'react';
import { useEstimateStore } from '@/store/estimateStore';
import { ArrowRight, ArrowLeft, Calculator, Download, Check } from 'lucide-react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const REGIONS = [
  '서울특별시', '경기도', '인천광역시', '부산광역시', 
  '대구광역시', '광주광역시', '대전광역시', '울산광역시', '세종특별자치시'
];

const FACTORY_TYPES = [
  { value: '김치공장', label: '🥬 김치공장', icon: '🥬' },
  { value: '제빵공장', label: '🍞 제빵공장', icon: '🍞' },
  { value: '냉동식품', label: '🧊 냉동식품', icon: '🧊' },
  { value: '유제품', label: '🥛 유제품', icon: '🥛' },
  { value: '육류가공', label: '🥩 육류가공', icon: '🥩' },
  { value: '음료제조', label: '🥤 음료제조', icon: '🥤' },
];

const FACILITIES = [
  { value: '냉장시설', label: '냉장시설' },
  { value: '냉동시설', label: '냉동시설' },
  { value: 'CCTV', label: 'CCTV 시스템' },
  { value: '공조시설', label: '공조시설' },
  { value: '정수시설', label: '정수시설' },
];

export default function EstimatePage() {
  const { input, result, currentStep, setInput, setCurrentStep, calculateEstimate, reset } = useEstimateStore();
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);

  const handleNext = () => {
    if (currentStep === 1 && !input.region) {
      alert('지역을 선택해주세요');
      return;
    }
    if (currentStep === 2 && !input.factoryType) {
      alert('공장 유형을 선택해주세요');
      return;
    }
    
    if (currentStep === 3) {
      setInput({ facilities: selectedFacilities });
      calculateEstimate();
    }
    
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleReset = () => {
    reset();
    setSelectedFacilities([]);
  };

  const toggleFacility = (facility: string) => {
    setSelectedFacilities(prev =>
      prev.includes(facility)
        ? prev.filter(f => f !== facility)
        : [...prev, facility]
    );
  };

  // Chart data
  const pieData = result ? {
    labels: ['건설비', '설비비', '인건비', '기타'],
    datasets: [{
      data: [
        result.breakdown.construction,
        result.breakdown.equipment,
        result.breakdown.labor,
        result.breakdown.misc,
      ],
      backgroundColor: [
        '#007AFF',
        '#6A5AE0',
        '#34D399',
        '#FBBF24',
      ],
    }],
  } : null;

  const barData = result ? {
    labels: ['기존 방식', '오프로 방식'],
    datasets: [{
      label: '비용 (억원)',
      data: [
        (result.totalCost + result.savings) / 100000000,
        result.totalCost / 100000000,
      ],
      backgroundColor: ['#EF4444', '#10B981'],
    }],
  } : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#101828] mb-4">
            스마트 견적 시뮬레이터
          </h1>
          <p className="text-xl text-gray-600">
            3단계만으로 정확한 공장 건설 견적을 확인하세요
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {[
              { num: 1, label: '지역·규모' },
              { num: 2, label: '공장 유형' },
              { num: 3, label: '추가 시설' },
              { num: 4, label: '견적 결과' },
            ].map((step, idx) => (
              <div key={step.num} className="flex items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                  currentStep >= step.num
                    ? 'bg-gradient-to-br from-[#007AFF] to-[#6A5AE0] text-white'
                    : 'bg-gray-200 text-gray-400'
                }`}>
                  {currentStep > step.num ? <Check className="w-6 h-6" /> : step.num}
                </div>
                <div className="ml-2 text-sm font-medium text-gray-700 hidden sm:block">
                  {step.label}
                </div>
                {idx < 3 && (
                  <div className={`w-12 h-1 mx-4 ${
                    currentStep > step.num ? 'bg-blue-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Step 1: 지역 및 규모 */}
          {currentStep === 1 && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-2 text-[#101828]">지역을 선택하세요</h2>
                <p className="text-gray-600 mb-6">지역별 비용 지수가 자동으로 적용됩니다</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {REGIONS.map((region) => (
                    <button
                      key={region}
                      onClick={() => setInput({ region })}
                      className={`p-4 rounded-xl border-2 font-medium transition-all ${
                        input.region === region
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      {region}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-2 text-[#101828]">부지 면적을 설정하세요</h2>
                <p className="text-gray-600 mb-6">슬라이더를 움직여 원하는 규모를 선택하세요</p>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">면적</span>
                    <span className="text-3xl font-bold text-blue-600">{input.size}평</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="1000"
                    value={input.size}
                    onChange={(e) => setInput({ size: parseInt(e.target.value) })}
                    className="slider w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>50평</span>
                    <span>300평</span>
                    <span>1000평</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: 공장 유형 */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2 text-[#101828]">공장 유형을 선택하세요</h2>
                <p className="text-gray-600 mb-6">업종별 특화된 설계가 적용됩니다</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {FACTORY_TYPES.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => setInput({ factoryType: type.value })}
                      className={`p-6 rounded-2xl border-2 font-medium transition-all hover:scale-105 ${
                        input.factoryType === type.value
                          ? 'border-blue-500 bg-blue-50 shadow-lg'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-4xl mb-3">{type.icon}</div>
                      <div className="font-bold text-gray-800">{type.value}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: 추가 시설 */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2 text-[#101828]">추가 시설을 선택하세요</h2>
                <p className="text-gray-600 mb-6">필요한 시설을 모두 선택하세요 (복수 선택 가능)</p>
                <div className="space-y-3">
                  {FACILITIES.map((facility) => (
                    <button
                      key={facility.value}
                      onClick={() => toggleFacility(facility.value)}
                      className={`w-full p-5 rounded-xl border-2 font-medium transition-all text-left flex items-center justify-between ${
                        selectedFacilities.includes(facility.value)
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="text-lg">{facility.label}</span>
                      {selectedFacilities.includes(facility.value) && (
                        <Check className="w-6 h-6 text-blue-600" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: 결과 */}
          {currentStep === 4 && result && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-[#101828] mb-2">견적 결과</h2>
                <p className="text-gray-600">
                  {input.region} | {input.size}평 | {input.factoryType}
                </p>
              </div>

              {/* 총 비용 */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl border-2 border-blue-200">
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-2">예상 건설 비용</div>
                  <div className="text-5xl font-bold text-[#007AFF] mb-4">
                    {(result.totalCost / 100000000).toFixed(1)}억원
                  </div>
                  <div className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full font-bold">
                    💰 {(result.savings / 100000000).toFixed(1)}억원 절감
                  </div>
                </div>
              </div>

              {/* 비용 분석 차트 */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                  <h3 className="font-bold text-lg mb-4 text-center">비용 구성</h3>
                  {pieData && (
                    <Pie 
                      data={pieData}
                      options={{
                        responsive: true,
                        plugins: {
                          legend: {
                            position: 'bottom',
                          },
                        },
                      }}
                    />
                  )}
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200">
                  <h3 className="font-bold text-lg mb-4 text-center">비용 비교</h3>
                  {barData && (
                    <Bar
                      data={barData}
                      options={{
                        responsive: true,
                        plugins: {
                          legend: {
                            display: false,
                          },
                        },
                        scales: {
                          y: {
                            beginAtZero: true,
                            title: {
                              display: true,
                              text: '비용 (억원)',
                            },
                          },
                        },
                      }}
                    />
                  )}
                </div>
              </div>

              {/* 상세 내역 */}
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="font-bold text-lg mb-4">상세 내역</h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">건설 공사비</span>
                    <span className="font-bold">
                      {(result.breakdown.construction / 100000000).toFixed(1)}억원
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">설비 비용</span>
                    <span className="font-bold">
                      {(result.breakdown.equipment / 100000000).toFixed(1)}억원
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">인건비</span>
                    <span className="font-bold">
                      {(result.breakdown.labor / 100000000).toFixed(1)}억원
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">기타 비용</span>
                    <span className="font-bold">
                      {(result.breakdown.misc / 100000000).toFixed(1)}억원
                    </span>
                  </div>
                  <div className="flex justify-between py-3 pt-4 border-t-2 border-gray-300">
                    <span className="font-bold text-lg">총 비용</span>
                    <span className="font-bold text-2xl text-[#007AFF]">
                      {(result.totalCost / 100000000).toFixed(1)}억원
                    </span>
                  </div>
                </div>
              </div>

              {/* 액션 버튼 */}
              <div className="flex gap-4">
                <button className="flex-1 px-6 py-4 bg-gradient-to-r from-[#007AFF] to-[#6A5AE0] text-white rounded-xl font-bold hover:shadow-xl transition-all">
                  <Download className="inline-block w-5 h-5 mr-2" />
                  PDF로 저장하기
                </button>
                <button 
                  onClick={handleReset}
                  className="px-6 py-4 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all"
                >
                  다시 계산하기
                </button>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          {currentStep < 4 && (
            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <button
                  onClick={handleBack}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all"
                >
                  <ArrowLeft className="inline-block w-5 h-5 mr-2" />
                  이전
                </button>
              )}
              <button
                onClick={handleNext}
                className={`px-8 py-3 bg-gradient-to-r from-[#007AFF] to-[#6A5AE0] text-white rounded-xl font-bold hover:shadow-xl transition-all ${
                  currentStep === 1 ? 'ml-auto' : ''
                }`}
              >
                {currentStep === 3 ? (
                  <>
                    <Calculator className="inline-block w-5 h-5 mr-2" />
                    견적 계산하기
                  </>
                ) : (
                  <>
                    다음
                    <ArrowRight className="inline-block w-5 h-5 ml-2" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
