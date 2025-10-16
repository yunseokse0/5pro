'use client'

import { useState } from 'react'
import Link from 'next/link'
import { toast, Toaster } from 'react-hot-toast'
import { 
  Cog6ToothIcon as Settings, 
  ArrowPathIcon as Loader2, 
  CubeIcon,
  BuildingOfficeIcon,
  CogIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline'

interface FactoryOptions {
  size: string
  industry: string
  customIndustry?: string
  includeFermentation: boolean
  includeFreezer: boolean
  includeQualityControl: boolean
  includeColdStorage: boolean
  includePackagingLine: boolean
  includeWasteManagement: boolean
}

const INDUSTRY_OPTIONS = [
  { value: 'kimchi', label: '김치공장', sections: ['Raw Material Storage', 'Washing Room', 'Cutting Room', 'Fermentation Room', 'Processing Room', 'Packaging Room', 'Warehouse', 'Shipping Area'] },
  { value: 'bakery', label: '제빵공장', sections: ['Raw Material Storage', 'Mixing Room', 'Fermentation Room', 'Baking Room', 'Cooling Room', 'Packaging Room', 'Warehouse', 'Shipping Area'] },
  { value: 'meat', label: '육가공공장', sections: ['Raw Material Storage', 'Preparation Room', 'Processing Room', 'Packaging Room', 'Freezer Storage', 'Warehouse', 'Shipping Area'] },
  { value: 'beverage', label: '음료공장', sections: ['Raw Material Storage', 'Mixing Room', 'Filtration Room', 'Bottling Room', 'Packaging Room', 'Warehouse', 'Shipping Area'] },
  { value: 'dairy', label: '유제품공장', sections: ['Raw Material Storage', 'Pasteurization Room', 'Fermentation Room', 'Packaging Room', 'Cold Storage', 'Quality Control', 'Warehouse', 'Shipping Area'] },
  { value: 'confectionery', label: '과자공장', sections: ['Raw Material Storage', 'Mixing Room', 'Shaping Room', 'Baking Room', 'Coating Room', 'Packaging Room', 'Warehouse', 'Shipping Area'] },
  { value: 'noodles', label: '면류공장', sections: ['Raw Material Storage', 'Mixing Room', 'Kneading Room', 'Extrusion Room', 'Drying Room', 'Packaging Room', 'Warehouse', 'Shipping Area'] },
  { value: 'sauce', label: '소스공장', sections: ['Raw Material Storage', 'Cooking Room', 'Blending Room', 'Filtration Room', 'Packaging Room', 'Warehouse', 'Shipping Area'] },
  { value: 'frozen', label: '냉동식품공장', sections: ['Raw Material Storage', 'Preparation Room', 'Blast Freezing Room', 'Frozen Storage', 'Packaging Room', 'Warehouse', 'Shipping Area'] },
  { value: 'organic', label: '유기농식품공장', sections: ['Raw Material Storage', 'Washing Room', 'Processing Room', 'Packaging Room', 'Quality Control', 'Warehouse', 'Shipping Area'] }
]

const SIZE_OPTIONS = [
  { value: '100', label: '100평', area: '330㎡' },
  { value: '300', label: '300평', area: '990㎡' },
  { value: '500', label: '500평', area: '1650㎡' },
  { value: '1000', label: '1000평', area: '3300㎡' }
]

export default function Smart3DVisualization() {
  const [options, setOptions] = useState<FactoryOptions>({
    size: '500',
    industry: 'kimchi',
    includeFermentation: true,
    includeFreezer: false,
    includeQualityControl: true,
    includeColdStorage: false,
    includePackagingLine: true,
    includeWasteManagement: false
  })
  
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isGeminiImage, setIsGeminiImage] = useState<boolean>(false)
  const [showImageModal, setShowImageModal] = useState<boolean>(false)
  const [generationProgress, setGenerationProgress] = useState<number>(0)

  const handleOptionChange = (key: keyof FactoryOptions, value: any) => {
    setOptions(prev => ({ ...prev, [key]: value }))
    setError(null)
  }

  const generatePrompt = () => {
    const selectedIndustry = INDUSTRY_OPTIONS.find(opt => opt.value === options.industry)
    const industryName = selectedIndustry?.label || 'factory'
    const sizePyeong = Math.round(parseFloat(options.size))
    const sizeArea = Math.round(sizePyeong * 3.3)
    
    let sections = selectedIndustry?.sections || []
    
    // Add optional sections based on selections
    if (options.includeFermentation && !sections.includes('Fermentation Room')) {
      sections.push('Fermentation Room')
    }
    if (options.includeFreezer && !sections.includes('Freezer Storage')) {
      sections.push('Freezer Storage')
    }
    if (options.includeQualityControl && !sections.includes('Quality Control')) {
      sections.push('Quality Control')
    }
    if (options.includeColdStorage && !sections.includes('Cold Storage')) {
      sections.push('Cold Storage')
    }
    if (options.includePackagingLine && !sections.includes('Packaging Room')) {
      sections.push('Packaging Room')
    }
    if (options.includeWasteManagement && !sections.includes('Waste Management')) {
      sections.push('Waste Management')
    }

    const sectionsText = sections.join(', ')

    return `Generate an isometric 3D simulation image of a modern ${industryName} factory layout, viewed from slightly above. The image should look like a professional software screenshot for HACCP (Hazard Analysis and Critical Control Points) validation.

Key elements to include and emphasize:

Clear Zone Segmentation (Color-Coded): Divide the plant interior into at least 4-5 distinct functional areas (e.g., Raw Material Receiving, Preparation, Processing, Packaging, Dispatch, Washing Area). Each zone must be colored differently to visually represent its hygiene level:
- Blue/Green: For Clean Zones (Processing, Packaging).
- Orange/Red: For Contamination Zones (Raw Material Receiving, initial Preparation, Waste).
- Yellow/Gray: For Neutral/Transition/Utility Zones (e.g., offices, changing rooms, storage areas).

Flow Path Visualization:
- Correct (HACCP-Compliant) Flow: Use thick, bright green arrows to clearly show the ideal, one-way flow of materials and personnel from dirty to clean areas, ensuring no cross-contamination.
- Cross-Contamination Risk: Highlight areas where improper flow paths would create risk. This should be indicated by thick, bright red arrows pointing against the green flow, often accompanied by red 'X' marks or caution symbols where pathways intersect dangerously.

Detailed Equipment & Stations: Include realistic 3D models of typical food processing equipment in each zone (e.g., conveyor belts, mixers, ovens, packaging machines, washing stations, hand-washing sinks, air showers at clean zone entrances). Equipment should be rendered in a clean, metallic, or industrial plastic style.

Professional Software UI Elements: Overlay subtle, semi-transparent UI elements on the image to mimic a software interface. These should include:
- Top/Side Menus: Text labels like "Layout," "Flow Analysis," "HACCP Check," "Reports," "Equipment," "Sensors."
- Data Panels: A small side panel displaying simulated real-time data or checklist items (e.g., "Temperature: 12.5°C," "Humidity: 45%," "HACCP Compliant: Yes ✔," "Cross-Contamination Risk: High ✖").

Factory Layout Details:
- Total size: ${sizePyeong}평 (about ${sizeArea}㎡)
- Sections: ${sectionsText}
- Perspective: isometric view, slightly above
- Lighting: bright and even, highlighting all details
- Style: professional software simulation interface

Overall Aesthetic: The image should convey precision, cleanliness, and advanced technological analysis, suitable for showcasing a sophisticated food safety management tool. The lighting should be bright and even, highlighting all details.`
  }

  const handleGenerate = async () => {
    setIsGenerating(true)
    setError(null)
    setGeneratedImage(null)
    setIsGeminiImage(false)
    setGenerationProgress(0)

    // 진행률 시뮬레이션
    const progressInterval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 90) return prev
        return prev + Math.random() * 10
      })
    }, 500)

    try {
      const prompt = generatePrompt()
      console.log('생성 요청 시작:', { prompt, options })
      
      setGenerationProgress(20) // 요청 시작
      
      const generateResponse = await fetch('/api/generate-3d-visualization', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          options
        }),
      })

      console.log('API 응답 상태:', generateResponse.status)
      setGenerationProgress(60) // API 응답 받음

      if (!generateResponse.ok) {
        const errorData = await generateResponse.json().catch(() => ({}))
        throw new Error(errorData.error || `HTTP ${generateResponse.status}: 이미지 생성에 실패했습니다.`)
      }

      const generateData = await generateResponse.json()
      console.log('API 응답 데이터:', generateData)
      
      if (generateData.warning) {
        console.warn('API 경고:', generateData.warning)
      }
      
      setGenerationProgress(90) // 데이터 처리 중
      
      if (generateData.success && generateData.imageUrl) {
        setGeneratedImage(generateData.imageUrl)
        setIsGeminiImage(generateData.isGeminiImage || false)
        setGenerationProgress(100) // 완료
        console.log('이미지 설정 완료')
        
        // 성공 토스트 메시지
        toast.success('3D 조감도가 생성되었습니다!', {
          duration: 4000,
          icon: '🎉',
        })
      } else {
        throw new Error('이미지 URL을 받지 못했습니다.')
      }
    } catch (err) {
      console.error('생성 오류:', err)
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.')
      toast.error('3D 조감도 생성에 실패했습니다. 다시 시도해주세요.')
    } finally {
      clearInterval(progressInterval)
      setIsGenerating(false)
      setGenerationProgress(0)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <Toaster position="top-right" />
      <div className="max-w-6xl mx-auto">
        {/* 헤더 섹션 */}
        <div className="text-center mb-8">
          <div className="inline-block px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold mb-4">
            🏭 HACCP 검증형 3D 시뮬레이터
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            스마트 3D 조감도 생성기
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            HACCP 기준에 맞춰 자동으로 동선을 배치하는 3D 조감도 시뮬레이터입니다.<br />
            <span className="font-semibold text-indigo-600">색상 구분된 구역</span>과 <span className="font-semibold text-green-600">동선 검증</span>으로<br />
            식품안전관리인증을 위한 최적의 공장 레이아웃을 미리 확인하세요.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 좌측 설정 영역 */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center mb-6">
              <CogIcon className="h-6 w-6 text-indigo-600 mr-3" />
              <h2 className="text-xl font-bold text-gray-900">설정 영역</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4 flex items-center">
                  <BuildingOfficeIcon className="h-4 w-4 text-indigo-600 mr-2" />
                  공장 평수
                </label>
                
                {/* 현재 선택된 평수 표시 */}
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-indigo-600 mb-1">
                    {Math.round(parseFloat(options.size))}평
                  </div>
                  <div className="text-sm text-gray-500">
                    약 {Math.round(parseFloat(options.size) * 3.3)}㎡
                  </div>
                </div>

                {/* 연속 슬라이더 */}
                <div className="relative">
                  <input
                    type="range"
                    min="50"
                    max="2000"
                    step="10"
                    value={options.size}
                    onChange={(e) => handleOptionChange('size', e.target.value)}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, #4f46e5 0%, #4f46e5 ${((parseFloat(options.size) - 50) / (2000 - 50)) * 100}%, #e5e7eb ${((parseFloat(options.size) - 50) / (2000 - 50)) * 100}%, #e5e7eb 100%)`
                    }}
                  />
                  
                  {/* 슬라이더 범위 표시 */}
                  <div className="flex justify-between mt-2 text-xs text-gray-500">
                    <span>50평</span>
                    <span>2000평</span>
                  </div>
                </div>

                {/* 빠른 선택 버튼들 */}
                <div className="mt-4">
                  <div className="text-xs text-gray-500 mb-2">빠른 선택:</div>
                  <div className="flex gap-2 flex-wrap">
                    {[100, 300, 500, 1000].map((size) => (
                      <button
                        key={size}
                        onClick={() => handleOptionChange('size', size.toString())}
                        className={`px-3 py-1 text-xs rounded-full border transition-all ${
                          Math.round(parseFloat(options.size)) === size
                            ? 'bg-indigo-600 text-white border-indigo-600'
                            : 'bg-white text-gray-600 border-gray-300 hover:border-indigo-300'
                        }`}
                      >
                        {size}평
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <Settings className="h-4 w-4 text-indigo-600 mr-2" />
                  업종 종류
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {INDUSTRY_OPTIONS.map((industry) => (
                    <label key={industry.value} className="flex items-center p-2 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        id={`industry-${industry.value}`}
                        name="industry"
                        value={industry.value}
                        checked={options.industry === industry.value}
                        onChange={(e) => handleOptionChange('industry', e.target.value)}
                        className="mr-2"
                      />
                      <span className="text-sm">{industry.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <CheckCircleIcon className="h-4 w-4 text-indigo-600 mr-2" />
                  추가 옵션
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      id="includeFermentation"
                      name="includeFermentation"
                      checked={options.includeFermentation}
                      onChange={(e) => handleOptionChange('includeFermentation', e.target.checked)}
                      className="mr-3"
                    />
                    <span className="text-sm">숙성실 포함</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      id="includeFreezer"
                      name="includeFreezer"
                      checked={options.includeFreezer}
                      onChange={(e) => handleOptionChange('includeFreezer', e.target.checked)}
                      className="mr-3"
                    />
                    <span className="text-sm">냉동창고 포함</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      id="includeQualityControl"
                      name="includeQualityControl"
                      checked={options.includeQualityControl}
                      onChange={(e) => handleOptionChange('includeQualityControl', e.target.checked)}
                      className="mr-3"
                    />
                    <span className="text-sm">품질검사실 포함</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      id="includeColdStorage"
                      name="includeColdStorage"
                      checked={options.includeColdStorage}
                      onChange={(e) => handleOptionChange('includeColdStorage', e.target.checked)}
                      className="mr-3"
                    />
                    <span className="text-sm">냉장저장고 포함</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      id="includePackagingLine"
                      name="includePackagingLine"
                      checked={options.includePackagingLine}
                      onChange={(e) => handleOptionChange('includePackagingLine', e.target.checked)}
                      className="mr-3"
                    />
                    <span className="text-sm">포장라인 포함</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      id="includeWasteManagement"
                      name="includeWasteManagement"
                      checked={options.includeWasteManagement}
                      onChange={(e) => handleOptionChange('includeWasteManagement', e.target.checked)}
                      className="mr-3"
                    />
                    <span className="text-sm">폐기물 처리 포함</span>
                  </label>
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full bg-indigo-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all transform hover:-translate-y-1 hover:shadow-lg"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                    생성 중... {Math.round(generationProgress)}%
                  </>
                ) : (
                  <>
                    <CubeIcon className="h-5 w-5 mr-2" />
                    3D 조감도 생성
                  </>
                )}
              </button>

              {/* 평균 30% 설계 효율 개선 배너 */}
              <div className="text-center">
                <div className="text-xs text-gray-400 bg-gray-50 rounded-lg py-2 px-4">
                  평균 30% 설계 효율 개선
                </div>
              </div>

              {/* 진행률 바 */}
              {isGenerating && (
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full transition-all duration-300 ease-out"
                      style={{ width: `${generationProgress}%` }}
                    ></div>
                  </div>
                  <div className="text-center text-sm text-gray-600 mt-2">
                    {generationProgress < 30 && "AI 모델 로딩 중..."}
                    {generationProgress >= 30 && generationProgress < 60 && "이미지 생성 중..."}
                    {generationProgress >= 60 && generationProgress < 90 && "후처리 중..."}
                    {generationProgress >= 90 && "완료 중..."}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 우측 프리뷰 패널 */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center mb-6">
              <CubeIcon className="h-6 w-6 text-indigo-600 mr-3" />
              <h2 className="text-xl font-bold text-gray-900">3D 조감도 프리뷰</h2>
            </div>

            <div className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <ExclamationTriangleIcon className="h-5 w-5 text-red-600 mr-2" />
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                </div>
              )}

              {generatedImage ? (
                <div className="space-y-4">
                  <div className="bg-gray-100 rounded-xl p-4 aspect-video flex items-center justify-center">
                    <img
                      src={generatedImage}
                      alt="Generated 3D Visualization"
                      className="w-full h-full object-contain rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => setShowImageModal(true)}
                    />
                  </div>
                  
                  <div className="text-center text-sm text-gray-600">
                    이미지를 클릭하면 크게 볼 수 있습니다
                  </div>

                  {/* HACCP 구역별 색상 구분 안내 */}
                  <div className="bg-indigo-50 rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-indigo-800 mb-3 flex items-center">
                      <InformationCircleIcon className="h-4 w-4 mr-2" />
                      HACCP 구역별 색상 구분 안내
                    </h3>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                          <span className="text-gray-700">청결구역 (가공, 포장)</span>
                        </div>
                        <span className="text-green-600 font-medium">→</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-orange-500 rounded mr-2"></div>
                          <span className="text-gray-700">오염구역 (원료, 폐기물)</span>
                        </div>
                        <span className="text-red-600 font-medium">✗</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-yellow-400 rounded mr-2"></div>
                          <span className="text-gray-700">중립구역 (사무실, 탈의실)</span>
                        </div>
                        <span className="text-gray-600 font-medium">○</span>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-indigo-200">
                      <div className="flex items-center text-xs text-indigo-700">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span>정상 동선</span>
                        <div className="w-2 h-2 bg-red-500 rounded-full mr-2 ml-4"></div>
                        <span>교차 오염 위험</span>
                      </div>
                    </div>
                  </div>

                  {/* 후속 행동 CTA */}
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-700 mb-3">
                      이제 견적 단계로 이동해보세요 ▸
                    </p>
                    <Link 
                      href="/estimate"
                      className="inline-block px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
                    >
                      견적 받기
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-100 rounded-xl p-8 text-center aspect-video flex flex-col items-center justify-center">
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mb-4"></div>
                      <p className="text-gray-600">3D 조감도 생성 중...</p>
                    </>
                  ) : (
                    <>
                      <div className="w-full h-full flex items-center justify-center mb-4">
                        <img 
                          src="/imgs/5PROLINE.png" 
                          alt="오프로 3D 조감도 예시" 
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                      <p className="text-gray-500">설정을 완료하고 '3D 조감도 생성' 버튼을 클릭하세요</p>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 하단 정보 배너 */}
        <div className="bg-indigo-50 text-indigo-700 rounded-lg py-3 px-4 text-sm text-center mt-6">
          지금까지 200+ 식품공장이 OFRO의 3D 시뮬레이터로 설계되었습니다.
        </div>
      </div>

      {/* 이미지 확대 모달 */}
      {showImageModal && generatedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-7xl max-h-full">
            <img
              src={generatedImage}
              alt="Generated 3D Visualization - 확대보기"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute top-4 right-4 bg-black bg-opacity-50 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-75 transition-all"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  )
}