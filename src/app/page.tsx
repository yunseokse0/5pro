'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  // 기본 아이콘들
  Building2, 
  Calculator, 
  FileText, 
  Upload, 
  BarChart3, 
  CheckSquare,
  ArrowRight,
  Shield,
  Award,
  Clock,
  Users,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Truck,
  DollarSign,
  Target,
  Zap,
  Lock,
  Star,
  Play,
  Youtube,
  Mic,
  BookOpen,
  Activity,
  MessageCircle,
  Phone,
  X,
  TrendingDown,
  Percent,
  Timer,
  Download,
  Gift,
  MessageSquare,
  Headphones,
  Calendar,
  MapPin,
  Building,
  Ruler,
  Settings,
  Eye,
  Share,
  Save,
  RefreshCw,
  Database,
  Image,
  Palette,
  Sparkles,
  Heart,
  Globe,
  Lightbulb,
  Rocket,
  Gem,
  Crown,
  Flame,
  User,
  UserPlus,
  Mail,
  Key,
  Fingerprint,
  Smartphone,
  CreditCard,
  FileCheck,
  ClipboardCheck,
  UserCheck,
  ShieldCheck,
  Scale,
  TestTube,
  Microscope,
  Thermometer,
  Droplets,
  Wind,
  Sun,
  Moon,
  Wrench,
  Hammer,
  Cog,
  Layers,
  FileBarChart,
  BookOpenCheck,
  GraduationCap,
  Badge,
  Award as Certificate,
  Badge as Seal,
  Stamp,
  ClipboardList,
  FileSpreadsheet,
  PieChart,
  TrendingUp as TrendingUpIcon,
  AlertCircle,
  Info,
  HelpCircle,
  ExternalLink,
  Quote,
  Camera,
  Newspaper,
  Trophy,
  Medal,
  Flag,
  Globe2,
  Map,
  Briefcase,
  Users2,
  ThumbsUp,
  MessageSquare as MessageSquareText,
  Video,
  ImageIcon,
  // 더 세련된 현대적 아이콘들
  Factory,
  Cpu,
  HardDrive,
  Monitor,
  Wifi,
  Bluetooth,
  Gauge,
  Workflow,
  GitBranch,
  GitCommit,
  GitMerge,
  GitPullRequest,
  Code,
  Terminal,
  Command,
  Search,
  Filter,
  SlidersHorizontal,
  ToggleLeft,
  ToggleRight,
  Battery,
  Signal,
  Radio,
  Satellite,
  Cloud,
  Server,
  Router,
  Laptop,
  Tablet,
  Plus,
  Package
} from 'lucide-react'

// 타이핑 효과 컴포넌트
const TypingText = ({ text, delay = 100 }: { text: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, delay)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text, delay])

  return <span>{displayText}</span>
}

// 카운터 애니메이션 컴포넌트
const CounterAnimation = ({ end, duration = 2000, id }: { end: number; duration?: number; id?: string }) => {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const counterId = id || `counter-${Math.random().toString(36).substr(2, 9)}`

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById(counterId)
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [counterId])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      
      setCount(Math.floor(progress * end))
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    requestAnimationFrame(animate)
  }, [isVisible, end, duration])

  return <span id={counterId} className="inline-block">{count}</span>
}

// 로딩 애니메이션 컴포넌트
const LoadingAnimation = () => (
  <div className="fixed inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 z-50 flex items-center justify-center">
    <div className="text-center">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-white border-opacity-20 rounded-full animate-spin border-t-white"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Factory className="w-8 h-8 text-white animate-pulse" />
        </div>
      </div>
      <div className="mt-8">
        <div className="text-white text-xl font-semibold mb-2">
          <TypingText text="오프로" delay={100} />
        </div>
        <div className="text-blue-200 text-sm">식품공장 설립 전문 플랫폼</div>
      </div>
    </div>
  </div>
)

// 실시간 성과 지표 컴포넌트
const RealtimeStats = () => {
  const [stats, setStats] = useState({
    activeProjects: 12,
    todayConsultations: 23,
    customerSatisfaction: 4.9,
    onlineConsultants: 3
  })

  useEffect(() => {
    // 실시간 업데이트를 위한 타이머
    const interval = setInterval(() => {
      setStats(prev => ({
        activeProjects: prev.activeProjects + Math.floor(Math.random() * 2),
        todayConsultations: prev.todayConsultations + Math.floor(Math.random() * 3),
        customerSatisfaction: Math.min(5.0, prev.customerSatisfaction + (Math.random() - 0.5) * 0.1),
        onlineConsultants: Math.max(1, prev.onlineConsultants + Math.floor(Math.random() * 3) - 1)
      }))
    }, 5000) // 5초마다 업데이트

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      <div className="text-center group">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-200 transition-colors duration-300">
          <Activity className="w-8 h-8 text-blue-600" />
        </div>
        <div className="text-2xl font-bold text-gray-900 mb-1">
          <span className="inline-block">
            <CounterAnimation end={stats.activeProjects} id="active-projects" />
          </span>
        </div>
        <div className="text-sm text-gray-600">진행 중인 프로젝트</div>
        <div className="text-xs text-green-600 mt-1">● 실시간 업데이트</div>
      </div>

      <div className="text-center group">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-green-200 transition-colors duration-300">
          <MessageCircle className="w-8 h-8 text-green-600" />
        </div>
        <div className="text-2xl font-bold text-gray-900 mb-1">
          <span className="inline-block">
            <CounterAnimation end={stats.todayConsultations} id="today-consultations" />
          </span>
        </div>
        <div className="text-sm text-gray-600">오늘 상담 완료</div>
        <div className="text-xs text-green-600 mt-1">● 실시간 업데이트</div>
      </div>

      <div className="text-center group">
        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-yellow-200 transition-colors duration-300">
          <Star className="w-8 h-8 text-yellow-600" />
        </div>
        <div className="text-2xl font-bold text-gray-900 mb-1">
          {stats.customerSatisfaction.toFixed(1)}
        </div>
        <div className="text-sm text-gray-600">고객 만족도</div>
        <div className="text-xs text-green-600 mt-1">● 실시간 업데이트</div>
      </div>

      <div className="text-center group">
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-purple-200 transition-colors duration-300">
          <Phone className="w-8 h-8 text-purple-600" />
        </div>
        <div className="text-2xl font-bold text-gray-900 mb-1">
          <span className="inline-block">
            <CounterAnimation end={stats.onlineConsultants} id="online-consultants" />
          </span>
        </div>
        <div className="text-sm text-gray-600">온라인 상담원</div>
        <div className="text-xs text-green-600 mt-1">● 실시간 업데이트</div>
      </div>
    </div>
  )
}

// 비교 분석 도구 컴포넌트
const ComparisonTool = () => {
  const [investmentAmount, setInvestmentAmount] = useState(1000000000) // 10억원 기본값
  const [selectedRegion, setSelectedRegion] = useState('')
  const [factorySize, setFactorySize] = useState(300)
  const [selectedPurposes, setSelectedPurposes] = useState<string[]>([])

  const handleRegionSelect = (region: string) => {
    setSelectedRegion(region)
  }

  const handlePurposeToggle = (purpose: string) => {
    setSelectedPurposes(prev => 
      prev.includes(purpose) 
        ? prev.filter(p => p !== purpose)
        : [...prev, purpose]
    )
  }

  const handleSimulationStart = () => {
    // 입력된 데이터를 URL 파라미터로 전달하여 견적 페이지로 이동
    const params = new URLSearchParams({
      region: selectedRegion || '서울특별시',
      size: factorySize.toString(),
      purposes: selectedPurposes.join(',')
    })
    
    window.location.href = `/estimate?${params.toString()}`
  }

  const comparisonData = [
    {
      category: "견적 정확도",
      traditional: "60%",
      offro: "95%",
      improvement: "+35%",
      icon: Target,
      color: "text-blue-600"
    },
    {
      category: "공사 기간",
      traditional: "12개월",
      offro: "8개월",
      improvement: "-33%",
      icon: Clock,
      color: "text-green-600"
    },
    {
      category: "비용 절감",
      traditional: "0%",
      offro: "30%",
      improvement: "-30%",
      icon: DollarSign,
      color: "text-purple-600"
    },
    {
      category: "HACCP 인증률",
      traditional: "60%",
      offro: "98%",
      improvement: "+38%",
      icon: Shield,
      color: "text-orange-600"
    },
    {
      category: "완공 보장",
      traditional: "없음",
      offro: "100%",
      improvement: "보장",
      icon: Lock,
      color: "text-red-600"
    },
    {
      category: "사후 관리",
      traditional: "1년",
      offro: "2년",
      improvement: "+100%",
      icon: Award,
      color: "text-indigo-600"
    }
  ]

  const traditionalCost = investmentAmount
  const offroCost = investmentAmount * 0.7 // 30% 절감
  const savings = investmentAmount - offroCost

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white rounded-3xl p-6 md:p-10 shadow-xl border border-blue-100">
      <div className="text-center mb-8 md:mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full mb-4">
          <Calculator className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">스마트 견적 시뮬레이션</h3>
        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto mb-4">
          지역, 규모, 용도를 입력하면 스마트 시스템이 즉시 정확한 견적과 3D 조감도를 생성합니다
        </p>
        <div className="flex items-center justify-center space-x-4 text-sm text-blue-600 mb-8">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            <span>실시간 계산</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
            <span>95% 정확도</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
            <span>3D 시각화</span>
          </div>
        </div>
        
        {/* 입력 폼 */}
        <div className="max-w-4xl mx-auto space-y-6 mb-8">
          {/* 지역 선택 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">지역 선택</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {['서울특별시', '경기도', '인천광역시', '부산광역시'].map((region) => (
                <button
                  key={region}
                  onClick={() => handleRegionSelect(region)}
                  className={`px-4 py-3 border-2 rounded-xl transition-all duration-200 text-sm font-medium ${
                    selectedRegion === region
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-blue-500 hover:bg-blue-50'
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>

          {/* 공장 규모 슬라이더 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">공장 규모 (부지면적)</label>
            <div className="relative">
          <input
                type="range"
                min="50"
                max="1000"
                step="50"
                value={factorySize}
                onChange={(e) => setFactorySize(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>50㎡</span>
                <span className="font-medium text-blue-600">{factorySize}㎡</span>
                <span>1000㎡</span>
              </div>
        </div>
          </div>

          {/* 용도 체크박스 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">용도 (복수 선택 가능)</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { id: 'bakery', label: '제과제빵', icon: '🍞' },
                { id: 'frozen', label: '냉동식품', icon: '🧊' },
                { id: 'dairy', label: '유제품', icon: '🥛' },
                { id: 'meat', label: '육류가공', icon: '🥩' },
                { id: 'beverage', label: '음료제조', icon: '🥤' },
                { id: 'other', label: '기타', icon: '🏭' }
              ].map((item) => (
                <label key={item.id} className={`flex items-center space-x-2 p-3 border-2 rounded-xl transition-all duration-200 cursor-pointer ${
                  selectedPurposes.includes(item.id)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-500 hover:bg-blue-50'
                }`}>
                  <input 
                    type="checkbox" 
                    checked={selectedPurposes.includes(item.id)}
                    onChange={() => handlePurposeToggle(item.id)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" 
                  />
                  <span className="text-sm font-medium">{item.icon} {item.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        
        <button 
          onClick={handleSimulationStart}
          className="inline-flex items-center px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
        >
          <Calculator className="w-6 h-6 mr-3" />
          견적 시뮬레이션 시작
          <ArrowRight className="w-5 h-5 ml-3" />
        </button>
      </div>

      {/* 비용 비교 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="bg-red-50 rounded-xl p-4 md:p-6 border-2 border-red-200">
          <div className="flex items-center mb-3 md:mb-4">
            <X className="w-5 h-5 md:w-6 md:h-6 text-red-600 mr-2" />
            <h4 className="text-base md:text-lg font-semibold text-red-800">기존 방식</h4>
          </div>
          <div className="text-2xl md:text-3xl font-bold text-red-600 mb-2">
            {formatKoreanNumber(traditionalCost)}
          </div>
          <div className="text-xs md:text-sm text-red-600">
            + 추가 비용 발생 가능성 높음
          </div>
        </div>

        <div className="bg-green-50 rounded-xl p-4 md:p-6 border-2 border-green-200">
          <div className="flex items-center mb-3 md:mb-4">
            <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-600 mr-2" />
            <h4 className="text-base md:text-lg font-semibold text-green-800">오프로 방식</h4>
          </div>
          <div className="text-2xl md:text-3xl font-bold text-green-600 mb-2">
            {formatKoreanNumber(offroCost)}
          </div>
          <div className="text-xs md:text-sm text-green-600">
            + 완벽한 비용 보장
          </div>
        </div>
      </div>

      {/* 절감 효과 */}
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-4 md:p-6 text-white text-center mb-6 md:mb-8">
        <div className="text-xl md:text-2xl font-bold mb-2">💰 절감 효과</div>
        <div className="text-3xl md:text-4xl font-bold mb-2">
          {formatKoreanNumber(savings)}
        </div>
        <div className="text-sm md:text-base text-yellow-100">30% 비용 절감으로 투자 회수 기간 단축</div>
      </div>

      {/* 상세 비교표 */}
      <div className="overflow-x-auto -mx-4 md:mx-0">
        <table className="w-full min-w-[600px] md:min-w-0">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-3 md:py-4 px-2 font-semibold text-gray-900 text-sm md:text-base">항목</th>
              <th className="text-center py-3 md:py-4 px-2 font-semibold text-red-600 text-sm md:text-base">기존 방식</th>
              <th className="text-center py-3 md:py-4 px-2 font-semibold text-green-600 text-sm md:text-base">오프로</th>
              <th className="text-center py-3 md:py-4 px-2 font-semibold text-blue-600 text-sm md:text-base">개선 효과</th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((item, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 md:py-4 px-2">
                  <div className="flex items-center">
                    <item.icon className={`w-4 h-4 md:w-5 md:h-5 ${item.color} mr-2 flex-shrink-0`} />
                    <span className="font-medium text-gray-900 text-sm md:text-base">{item.category}</span>
                  </div>
                </td>
                <td className="py-3 md:py-4 px-2 text-center text-red-600 font-medium text-sm md:text-base">
                  {item.traditional}
                </td>
                <td className="py-3 md:py-4 px-2 text-center text-green-600 font-medium text-sm md:text-base">
                  {item.offro}
                </td>
                <td className="py-3 md:py-4 px-2 text-center">
                  <span className={`inline-flex items-center px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-semibold ${
                    item.improvement.startsWith('+') || item.improvement === '보장' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {item.improvement === '보장' ? (
                      <CheckCircle className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                    ) : item.improvement.startsWith('-') ? (
                      <TrendingDown className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                    ) : (
                      <TrendingUp className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                    )}
                    {item.improvement}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 스마트 견적 시뮬레이션 결과 섹션 */}
      <div className="mt-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-6 md:p-10 border border-blue-100">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
            <Cog className="w-8 h-8 text-white animate-spin" />
          </div>
          <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">스마트 견적 시뮬레이션 결과</h4>
          <p className="text-sm md:text-base text-gray-600">스마트 시스템이 실시간으로 계산한 정확한 견적과 설계안</p>
          
          {/* 스마트 계산 과정 표시 */}
          <div className="mt-6 bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-center space-x-6 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-gray-700">지역별 단가 분석</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                <span className="text-gray-700">용도별 설계 계산</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                <span className="text-gray-700">3D 모델 생성</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* HACCP 기준 설계 시각화 */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h5 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Award className="w-5 h-5 mr-2 text-emerald-600" />
              HACCP 기준 설계
            </h5>
            

            {/* HACCP 핵심 요소 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 text-center shadow-sm border border-emerald-200 hover:shadow-md transition-all duration-300">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-emerald-500 rounded-full mb-2">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div className="text-xl font-bold text-emerald-700 mb-1">100%</div>
                <div className="text-sm font-medium text-emerald-800">HACCP 준수</div>
                <div className="text-xs text-emerald-600 mt-1">완벽한 위생 관리</div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center shadow-sm border border-blue-200 hover:shadow-md transition-all duration-300">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-blue-500 rounded-full mb-2">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div className="text-xl font-bold text-blue-700 mb-1">24시간</div>
                <div className="text-sm font-medium text-blue-800">위생 모니터링</div>
                <div className="text-xs text-blue-600 mt-1">실시간 감시 시스템</div>
              </div>
            </div>
          </div>

          {/* 프로젝트 대시보드 목업 */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h5 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Monitor className="w-5 h-5 mr-2 text-green-600" />
              프로젝트 대시보드
            </h5>

            {/* 진행률 */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">전체 진행률</span>
                <span className="text-sm font-bold text-green-600">0%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-green-500 h-3 rounded-full" style={{width: '0%'}}></div>
              </div>
            </div>

            {/* 단계별 진행률 */}
            <div className="space-y-3">
              {[
                { step: '견적', progress: 0, color: 'bg-blue-500' },
                { step: '설계', progress: 0, color: 'bg-emerald-500' },
                { step: '시공', progress: 0, color: 'bg-purple-500' },
                { step: 'HACCP', progress: 0, color: 'bg-orange-500' },
                { step: '모니터링', progress: 0, color: 'bg-green-500' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{item.step}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div className={`${item.color} h-2 rounded-full`} style={{width: `${item.progress}%`}}></div>
                    </div>
                    <span className="text-xs text-gray-500 w-8">{item.progress}%</span>
                  </div>
                </div>
              ))}
            </div>

            {/* 예상 일정 */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h6 className="text-sm font-bold text-gray-900 mb-3">예상 일정</h6>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">견적 완료</span>
                  <span className="text-blue-600 font-medium">1일</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">설계 완료</span>
                  <span className="text-emerald-600 font-medium">2주</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">시공 완료</span>
                  <span className="text-purple-600 font-medium">4개월</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">HACCP 인증</span>
                  <span className="text-orange-600 font-medium">1-2개월</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 식품공장 특화 자재·장비 DB 섹션 */}
      <div className="mt-12 bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-6 md:p-10 border border-purple-100">
        <div className="text-center mb-8">
          <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">식품공장 특화 자재·장비 DB</h4>
          <p className="text-sm md:text-base text-gray-600">HACCP 인증에 최적화된 전문 장비와 자재를 선택하세요</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 위생 설비 */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h5 className="text-lg font-bold text-gray-900 mb-2">위생 설비</h5>
              <p className="text-sm text-gray-600">HACCP 인증 필수 장비</p>
            </div>
            
            <div className="space-y-3">
              {[
                { name: '무균 포장기', price: '2,500만원', rating: '★★★★★' },
                { name: '세척 소독 시스템', price: '1,800만원', rating: '★★★★★' },
                { name: '냉동 냉장 시설', price: '3,200만원', rating: '★★★★★' },
                { name: '공기 정화 시스템', price: '1,500만원', rating: '★★★★☆' }
              ].map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-3 hover:border-green-300 transition-colors">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-medium text-gray-900 text-sm">{item.name}</span>
                    <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">{item.rating}</span>
                  </div>
                  <div className="text-xs text-gray-600">{item.price}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 가공 장비 */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Cog className="w-8 h-8 text-blue-600" />
              </div>
              <h5 className="text-lg font-bold text-gray-900 mb-2">가공 장비</h5>
              <p className="text-sm text-gray-600">업종별 맞춤 장비</p>
            </div>
            
            <div className="space-y-3">
              {[
                { name: '제과제빵 오븐', price: '4,500만원', category: '제과제빵' },
                { name: '유제품 살균기', price: '6,800만원', category: '유제품' },
                { name: '냉동식품 냉각기', price: '3,200만원', category: '냉동식품' },
                { name: '육류 가공 설비', price: '5,500만원', category: '육류가공' }
              ].map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-3 hover:border-blue-300 transition-colors">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-medium text-gray-900 text-sm">{item.name}</span>
                    <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">{item.category}</span>
                  </div>
                  <div className="text-xs text-gray-600">{item.price}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 건축 자재 */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Building2 className="w-8 h-8 text-purple-600" />
              </div>
              <h5 className="text-lg font-bold text-gray-900 mb-2">건축 자재</h5>
              <p className="text-sm text-gray-600">위생 기준 준수 자재</p>
            </div>
            
            <div className="space-y-3">
              {[
                { name: '위생 타일', price: '15만원/㎡', spec: 'FDA 인증' },
                { name: '스테인리스 패널', price: '25만원/㎡', spec: 'HACCP 인증' },
                { name: '방수 코팅', price: '8만원/㎡', spec: '식품안전' },
                { name: '환기 시스템', price: '500만원/세트', spec: '공기질 관리' }
              ].map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-3 hover:border-purple-300 transition-colors">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-medium text-gray-900 text-sm">{item.name}</span>
                    <span className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded">{item.spec}</span>
                  </div>
                  <div className="text-xs text-gray-600">{item.price}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <button className="inline-flex items-center px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
            <Package className="w-5 h-5 mr-2" />
            전체 자재·장비 카탈로그 보기
          </button>
        </div>
      </div>
    </div>
  )
}

// 긴급성/희소성 요소 컴포넌트
const UrgencyScarcity = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else {
          return { hours: 23, minutes: 59, seconds: 59 } // 리셋
        }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl p-6 text-white">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center mb-4">
          <Timer className="w-6 h-6 mr-2" />
          <h3 className="text-2xl font-bold">🎉 이번 달 한정 특별 혜택</h3>
        </div>
        <p className="text-pink-100 text-lg">매월 10개 프로젝트만 선착순 접수</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="text-center">
          <div className="text-3xl font-bold mb-2">7</div>
          <div className="text-pink-100">남은 프로젝트</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold mb-2">5%</div>
          <div className="text-pink-100">추가 할인</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold mb-2">무료</div>
          <div className="text-pink-100">상담료</div>
        </div>
      </div>

      <div className="text-center">
        <div className="text-sm text-pink-100 mb-2">남은 시간</div>
        <div className="flex justify-center space-x-4 text-2xl font-bold">
          <div className="bg-white bg-opacity-20 rounded-lg px-3 py-2">
            {timeLeft.hours.toString().padStart(2, '0')}
          </div>
          <div className="text-pink-100">:</div>
          <div className="bg-white bg-opacity-20 rounded-lg px-3 py-2">
            {timeLeft.minutes.toString().padStart(2, '0')}
          </div>
          <div className="text-pink-100">:</div>
          <div className="bg-white bg-opacity-20 rounded-lg px-3 py-2">
            {timeLeft.seconds.toString().padStart(2, '0')}
          </div>
        </div>
      </div>
    </div>
  )
}

// 리드 생성 요소 컴포넌트
const LeadGeneration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    interest: 'consultation'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 실제로는 API 호출 또는 이메일 발송
    alert('신청이 완료되었습니다! 곧 연락드리겠습니다.')
  }

  const leadOptions = [
    {
      id: 'guidebook',
      title: '무료 HACCP 가이드북',
      description: '식품공장 설립 필수 가이드북',
      icon: Download,
      color: 'bg-blue-500'
    },
    {
      id: 'consultation',
      title: '전문가 1:1 무료 상담',
      description: '1시간 무료 전문가 상담',
      icon: Headphones,
      color: 'bg-green-500'
    },
    {
      id: 'estimate',
      title: '무료 견적서',
      description: '정확한 비용 견적서 발급',
      icon: Calculator,
      color: 'bg-purple-500'
    }
  ]

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">무료 혜택 신청</h3>
        <p className="text-gray-600">원하는 서비스를 선택하고 정보를 입력해주세요</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {leadOptions.map((option) => (
            <label key={option.id} className="relative">
              <input
                type="radio"
                name="interest"
                value={option.id}
                checked={formData.interest === option.id}
                onChange={(e) => setFormData({...formData, interest: e.target.value})}
                className="sr-only"
              />
              <div className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                formData.interest === option.id 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}>
                <div className={`w-12 h-12 ${option.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                  <option.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{option.title}</h4>
                <p className="text-sm text-gray-600">{option.description}</p>
              </div>
            </label>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">이름</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">회사명</label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({...formData, company: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">이메일</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">연락처</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white py-4 rounded-lg font-semibold hover:from-emerald-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105"
        >
          무료 혜택 신청하기
        </button>
      </form>
    </div>
  )
}

// 즉시 연락 요소 컴포넌트
const ImmediateContact = () => {
  const contactOptions = [
    {
      title: '지금 바로 전화',
      description: '전문가와 즉시 상담',
      icon: Phone,
      color: 'bg-green-500',
      action: 'tel:02-1234-5678'
    },
    {
      title: '카카오톡 상담',
      description: '24시간 채팅 상담',
      icon: MessageSquare,
      color: 'bg-yellow-500',
      action: 'https://pf.kakao.com/_foodus'
    },
    {
      title: '실시간 채팅',
      description: '온라인 상담원 연결',
      icon: MessageCircle,
      color: 'bg-blue-500',
      action: '/chat'
    },
    {
      title: '상담 예약',
      description: '원하는 시간 예약',
      icon: Calendar,
      color: 'bg-purple-500',
      action: '/contact'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {contactOptions.map((option, index) => (
        <a
          key={index}
          href={option.action}
          className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-center"
        >
          <div className={`w-16 h-16 ${option.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
            <option.icon className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{option.title}</h3>
          <p className="text-sm text-gray-600">{option.description}</p>
        </a>
      ))}
    </div>
  )
}

// 견적 프로세스 가이드 컴포넌트
const EstimateProcessGuide = () => {
  const processSteps = [
    {
      step: 1,
        title: "견적",
        description: "지역, 규모, 용도 입력 → 스마트 자동 비용 계산",
        icon: Calculator,
        time: "5분",
        cta: "견적 받아보기",
        color: "blue",
        progress: 20
    },
    {
      step: 2,
        title: "설계",
        description: "HACCP 기준 맞춤 설계 → 설계안 검토",
        icon: FileText,
        time: "1-2주",
        cta: "설계안 보기",
        color: "emerald",
        progress: 40
    },
    {
      step: 3,
        title: "시공",
        description: "전문 시공팀 투입 → 품질 관리",
        icon: Building2,
        time: "3-6개월",
        cta: "진행상황 보기",
        color: "purple",
        progress: 60
    },
    {
      step: 4,
        title: "HACCP 인증",
        description: "인증 준비 → 정부 승인 → 인증서 발급",
        icon: Award,
        time: "1-2개월",
        cta: "인증 진행보기",
        color: "orange",
        progress: 80
      },
      {
        step: 5,
        title: "운영 모니터링",
        description: "24/7 현황 관리 → 실시간 알림 → 지속 지원",
        icon: Monitor,
        time: "지속적",
        cta: "대시보드 보기",
        color: "green",
        progress: 100
    }
  ]

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-6 md:p-10 shadow-xl border border-gray-100">
      <div className="text-center mb-8 md:mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full mb-6 shadow-lg">
          <Workflow className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4 leading-tight">
          식품공장 설립 5단계 프로세스
        </h3>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          견적부터 HACCP 인증까지 완벽한 식품공장 설립 여정을 완성하세요
        </p>
      </div>

      {/* 데스크톱: 수평 플로우 차트 */}
      <div className="hidden lg:block mb-12">
        <div className="flex items-center justify-between relative">
          {/* 배경 연결선 */}
          <div className="absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-emerald-200 via-purple-200 via-orange-200 to-green-200 rounded-full opacity-60"></div>
          {/* 활성 연결선 */}
          <div className="absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-emerald-500 via-purple-500 via-orange-500 to-green-500 rounded-full opacity-80 animate-pulse"></div>
          
        {processSteps.map((step, index) => (
            <div key={step.step} className="flex flex-col items-center relative z-10">
              {/* 단계 아이콘 */}
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-lg transition-all duration-300 hover:scale-110 ${
                step.color === 'blue' ? 'bg-gradient-to-br from-blue-400 to-blue-600' :
                step.color === 'emerald' ? 'bg-gradient-to-br from-emerald-400 to-emerald-600' :
                step.color === 'purple' ? 'bg-gradient-to-br from-purple-400 to-purple-600' :
                step.color === 'orange' ? 'bg-gradient-to-br from-orange-400 to-orange-600' :
                'bg-gradient-to-br from-green-400 to-green-600'
              }`}>
                <step.icon className="w-8 h-8 text-white" />
              </div>
              
              {/* 단계 정보 */}
              <div className="text-center max-w-32">
                <h4 className="font-bold text-gray-900 mb-2">{step.title}</h4>
                <p className="text-sm text-gray-600 mb-3 leading-relaxed">{step.description}</p>
                
                {/* 진행률 표시 */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-gray-500">진행률</span>
                    <span className="text-xs font-bold text-gray-700">{step.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1500 ease-out ${
                        step.color === 'blue' ? 'bg-gradient-to-r from-blue-400 to-blue-600' :
                        step.color === 'emerald' ? 'bg-gradient-to-r from-emerald-400 to-emerald-600' :
                        step.color === 'purple' ? 'bg-gradient-to-r from-purple-400 to-purple-600' :
                        step.color === 'orange' ? 'bg-gradient-to-r from-orange-400 to-orange-600' :
                        'bg-gradient-to-r from-green-400 to-green-600'
                      }`}
                      style={{width: `${step.progress}%`}}
                    ></div>
                  </div>
                </div>
                
                <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium mb-3 border ${
                  step.color === 'blue' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                  step.color === 'emerald' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                  step.color === 'purple' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                  step.color === 'orange' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                  'bg-green-50 text-green-700 border-green-200'
                }`}>
                  <Clock className="w-3 h-3 mr-1" />
                  {step.time}
                </div>
                
                <button 
                  onClick={() => {
                    if (step.step === 1) {
                      // 견적 받아보기 - 견적 시뮬레이션 섹션으로 스크롤
                      const element = document.querySelector('.bg-gradient-to-br.from-blue-50.to-white')
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' })
                      }
                    } else if (step.step === 2) {
                      // 설계안 보기 - 설계 페이지로 이동
                      window.location.href = '/design'
                    } else if (step.step === 3) {
                      // 진행상황 보기 - 시공 페이지로 이동
                      window.location.href = '/construction'
                    } else if (step.step === 4) {
                      // 대시보드 보기 - 대시보드 페이지로 이동
                      window.location.href = '/dashboard'
                    }
                  }}
                  className={`w-full px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg ${
                    step.color === 'blue' ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white' :
                    step.color === 'emerald' ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white' :
                    step.color === 'purple' ? 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white' :
                    step.color === 'orange' ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white' :
                    'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white'
                  }`}
                >
                  {step.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 모바일/태블릿: 수직 플로우 차트 */}
      <div className="lg:hidden space-y-6">
        {processSteps.map((step, index) => (
          <div key={step.step} className="relative">
            {/* 연결선 (모바일) */}
            {index < processSteps.length - 1 && (
              <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-gradient-to-b from-gray-200 to-transparent"></div>
            )}
            
            <div className="flex items-start space-x-4 p-4 bg-white rounded-2xl shadow-md border border-gray-100">
              {/* 단계 아이콘 */}
              <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center shadow-md ${
                step.color === 'blue' ? 'bg-blue-500' :
                step.color === 'emerald' ? 'bg-emerald-500' :
                step.color === 'purple' ? 'bg-purple-500' :
                step.color === 'orange' ? 'bg-orange-500' :
                'bg-green-500'
              }`}>
                <step.icon className="w-6 h-6 text-white" />
              </div>
              
              {/* 단계 정보 */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-bold text-gray-900">{step.title}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    step.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                    step.color === 'emerald' ? 'bg-emerald-100 text-emerald-700' :
                    step.color === 'purple' ? 'bg-purple-100 text-purple-700' :
                    step.color === 'orange' ? 'bg-orange-100 text-orange-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {step.time}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3 leading-relaxed">{step.description}</p>
                
                {/* 진행률 표시 (모바일) */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-gray-500">진행률</span>
                    <span className="text-xs font-bold text-gray-700">{step.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-1000 ${
                        step.color === 'blue' ? 'bg-blue-500' :
                        step.color === 'emerald' ? 'bg-emerald-500' :
                        step.color === 'purple' ? 'bg-purple-500' :
                        step.color === 'orange' ? 'bg-orange-500' :
                        'bg-green-500'
                      }`}
                      style={{width: `${step.progress}%`}}
                    ></div>
                  </div>
                </div>
                
                <button 
                  onClick={() => {
                    if (step.step === 1) {
                      // 견적 받아보기 - 견적 시뮬레이션 섹션으로 스크롤
                      const element = document.querySelector('.bg-gradient-to-br.from-blue-50.to-white')
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' })
                      }
                    } else if (step.step === 2) {
                      // 설계안 보기 - 설계 페이지로 이동
                      window.location.href = '/design'
                    } else if (step.step === 3) {
                      // 진행상황 보기 - 시공 페이지로 이동
                      window.location.href = '/construction'
                    } else if (step.step === 4) {
                      // 대시보드 보기 - 대시보드 페이지로 이동
                      window.location.href = '/dashboard'
                    }
                  }}
                  className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 ${
                    step.color === 'blue' ? 'bg-blue-500 hover:bg-blue-600 text-white' :
                    step.color === 'emerald' ? 'bg-emerald-500 hover:bg-emerald-600 text-white' :
                    step.color === 'purple' ? 'bg-purple-500 hover:bg-purple-600 text-white' :
                    step.color === 'orange' ? 'bg-orange-500 hover:bg-orange-600 text-white' :
                    'bg-green-500 hover:bg-green-600 text-white'
                  }`}
                >
                  {step.cta}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-center mb-2">
          <Eye className="w-5 h-5 text-blue-600 mr-2" />
          <h4 className="font-semibold text-blue-900">견적서 미리보기</h4>
        </div>
        <p className="text-blue-700 text-sm">
          견적서에는 상세 비용 내역, 조감도 이미지, 공사 일정표가 포함됩니다.
        </p>
      </div>
    </div>
  )
}

// 견적 정확성 입증 컴포넌트
const EstimateAccuracyProof = () => {
  const accuracyData = [
    {
      region: "서울/경기",
      accuracy: 97,
      cases: 45,
      avgError: 2.3
    },
    {
      region: "충청도",
      accuracy: 94,
      cases: 32,
      avgError: 4.1
    },
    {
      region: "전라도",
      accuracy: 93,
      cases: 28,
      avgError: 4.8
    },
    {
      region: "경상도",
      accuracy: 95,
      cases: 35,
      avgError: 3.2
    }
  ]

  const industryData = [
    { industry: "제과/제빵", accuracy: 96, cases: 25 },
    { industry: "유제품", accuracy: 94, cases: 18 },
    { industry: "육류가공", accuracy: 93, cases: 22 },
    { industry: "음료", accuracy: 95, cases: 15 }
  ]

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Database className="w-8 h-8 text-green-600 mr-2" />
          <h3 className="text-2xl font-bold text-gray-900">견적 정확성 입증</h3>
        </div>
        <p className="text-gray-600">150개 실제 사례 기반 데이터베이스로 검증된 정확성</p>
      </div>

      {/* 전체 통계 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
          <div className="text-green-800 font-semibold">평균 정확도</div>
          <div className="text-green-600 text-sm">전체 사례 기준</div>
        </div>
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className="text-3xl font-bold text-blue-600 mb-2">150+</div>
          <div className="text-blue-800 font-semibold">검증 사례</div>
          <div className="text-blue-600 text-sm">실제 완공 프로젝트</div>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <div className="text-3xl font-bold text-purple-600 mb-2">3.2%</div>
          <div className="text-purple-800 font-semibold">평균 오차율</div>
          <div className="text-purple-600 text-sm">견적 vs 실제</div>
        </div>
      </div>

      {/* 5% 초과분 환불 보장 */}
      <div className="mb-8 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-xl p-6">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
            <Shield className="w-6 h-6 text-red-600" />
          </div>
          <h3 className="text-2xl font-bold text-red-800">견적 정확도 100% 보장</h3>
        </div>
        <div className="text-center">
          <div className="mb-4">
            <p className="text-lg text-red-700 font-semibold mb-2">
              예상 견적에서
            </p>
            <p className="text-2xl font-bold text-red-800 mb-2">
              5% 초과분에 대해 환불해 드립니다
            </p>
          </div>
          <div className="space-y-2 text-red-600 text-sm max-w-2xl mx-auto">
            <div className="flex items-start justify-center">
              <span className="text-red-500 mr-2">•</span>
              <span>견적서 발급 후 실제 공사비가 견적 대비 5% 초과 시 차액 전액 환불</span>
            </div>
            <div className="flex items-start justify-center">
              <span className="text-red-500 mr-2">•</span>
              <span>완공 후 최종 정산 시점에서 자동 환불 처리</span>
            </div>
            <div className="flex items-start justify-center">
              <span className="text-red-500 mr-2">•</span>
              <span>별도 신청 없이 자동으로 처리되는 오프로만의 특별 보장</span>
            </div>
          </div>
        </div>
      </div>

      {/* 지역별 정확도 */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">지역별 정확도</h4>
        <div className="space-y-3">
          {accuracyData.map((data, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 text-gray-600 mr-2" />
                <span className="font-medium text-gray-900">{data.region}</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">{data.accuracy}%</div>
                  <div className="text-xs text-gray-500">정확도</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">{data.cases}건</div>
                  <div className="text-xs text-gray-500">사례수</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-orange-600">{data.avgError}%</div>
                  <div className="text-xs text-gray-500">오차율</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 업종별 정확도 */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4">업종별 정확도</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {industryData.map((data, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Building className="w-4 h-4 text-gray-600 mr-2" />
                  <span className="font-medium text-gray-900">{data.industry}</span>
                </div>
                <span className="text-lg font-bold text-green-600">{data.accuracy}%</span>
              </div>
              <div className="text-sm text-gray-600">{data.cases}건 검증</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// 숫자를 한국어 표기법으로 변환하는 함수
const formatKoreanNumber = (num: number) => {
  if (num >= 100000000) {
    const eok = Math.floor(num / 100000000)
    const remainder = num % 100000000
    if (remainder === 0) {
      return `${eok}억원`
    } else {
      const man = Math.floor(remainder / 10000)
      if (man === 0) {
        return `${eok}억원`
      } else {
        return `${eok}억 ${man}만원`
      }
    }
  } else if (num >= 10000) {
    const man = Math.floor(num / 10000)
    const remainder = num % 10000
    if (remainder === 0) {
      return `${man}만원`
    } else {
      return `${man}만 ${num % 10000}원`
    }
  } else {
    return `${num.toLocaleString()}원`
  }
}

// 견적 후 액션 플로우 컴포넌트
const EstimateActionFlow = () => {
  const [estimateResult, setEstimateResult] = useState({
    totalCost: 850000000,
    savings: 150000000,
    duration: 8,
    hasResult: false
  })

  const actionOptions = [
    {
      title: "견적서 저장",
      description: "PDF로 다운로드하여 보관",
      icon: Save,
      color: "bg-blue-500",
      action: "download"
    },
    {
      title: "이메일 발송",
      description: "견적서를 이메일로 전송",
      icon: MessageSquare,
      color: "bg-green-500",
      action: "email"
    },
    {
      title: "상담 예약",
      description: "전문가와 1:1 상담 예약",
      icon: Calendar,
      color: "bg-purple-500",
      action: "consultation"
    },
    {
      title: "비교 견적",
      description: "다른 옵션과 비교하기",
      icon: BarChart3,
      color: "bg-orange-500",
      action: "compare"
    }
  ]

  const handleAction = (action: string) => {
    switch(action) {
      case 'download':
        alert('견적서가 다운로드되었습니다!')
        break
      case 'email':
        alert('견적서가 이메일로 발송되었습니다!')
        break
      case 'consultation':
        window.location.href = '/consultation'
        break
      case 'compare':
        window.location.href = '/compare'
        break
    }
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">견적 완료 후 액션</h3>
        <p className="text-gray-600">견적서를 받은 후 다음 단계를 진행해보세요</p>
      </div>

      {/* 견적 결과 미리보기 */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 mb-8">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">견적 결과 요약</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">
              {formatKoreanNumber(estimateResult.totalCost)}
            </div>
            <div className="text-sm text-gray-600">총 예상 비용</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">
              {formatKoreanNumber(estimateResult.savings)}
            </div>
            <div className="text-sm text-gray-600">절감 효과</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 mb-2">
              {estimateResult.duration}개월
            </div>
            <div className="text-sm text-gray-600">예상 공기</div>
          </div>
        </div>
      </div>

      {/* 액션 옵션들 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {actionOptions.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAction(option.action)}
            className="group p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 text-left"
          >
            <div className="flex items-center mb-4">
              <div className={`w-12 h-12 ${option.color} rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300`}>
                <option.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                  {option.title}
                </h4>
                <p className="text-sm text-gray-600">{option.description}</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300 ml-auto" />
          </button>
        ))}
      </div>

      {/* 추가 혜택 */}
      <div className="mt-8 p-4 bg-yellow-50 rounded-lg">
        <div className="flex items-center mb-2">
          <Gift className="w-5 h-5 text-yellow-600 mr-2" />
          <h4 className="font-semibold text-yellow-900">견적 완료 시 추가 혜택</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-yellow-800">
          <div>• 무료 HACCP 가이드북 제공</div>
          <div>• 전문가 1시간 무료 상담</div>
          <div>• 상세 조감도 이미지 제공</div>
          <div>• 공사 일정표 무료 제공</div>
        </div>
      </div>
    </div>
  )
}

// 비주얼 강화 컴포넌트들
const VisualEnhancements = {
  // 플로팅 아이콘 컴포넌트
  FloatingIcons: () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => {
        const icons = [Factory, Calculator, Shield, Award, Star, Rocket, Gem, Crown, Flame, Lightbulb, Globe, Heart, Sparkles, Palette, Image]
        const IconComponent = icons[i % icons.length]
        const colors = ['text-blue-400', 'text-green-400', 'text-purple-400', 'text-pink-400', 'text-yellow-400', 'text-red-400', 'text-indigo-400', 'text-orange-400']
        
        return (
          <div
            key={i}
            className={`absolute opacity-20 animate-pulse ${colors[i % colors.length]}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
              transform: `rotate(${Math.random() * 360}deg) scale(${0.5 + Math.random() * 0.5})`
            }}
          >
            <IconComponent className="w-6 h-6" />
          </div>
        )
      })}
    </div>
  ),

  // 그라데이션 배경 컴포넌트
  GradientBackground: ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-800/20 to-purple-800/20"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-indigo-800/20 via-transparent to-pink-800/20"></div>
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  ),

  // 애니메이션 카드 컴포넌트
  AnimatedCard: ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
    <div 
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative z-10">{children}</div>
      
      {/* 호버 시 나타나는 효과 */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
        <Sparkles className="w-5 h-5 text-yellow-500" />
      </div>
    </div>
  ),

  // 아이콘 배지 컴포넌트
  IconBadge: ({ icon: Icon, color = "blue", size = "md", animated = false }: { 
    icon: any; 
    color?: "blue" | "green" | "purple" | "orange" | "pink"; 
    size?: "sm" | "md" | "lg"; 
    animated?: boolean;
  }) => {
    const sizeClasses = {
      sm: "w-8 h-8",
      md: "w-12 h-12", 
      lg: "w-16 h-16"
    }
    
    const colorClasses = {
      blue: "bg-blue-100 text-blue-600 group-hover:bg-blue-200",
      green: "bg-green-100 text-green-600 group-hover:bg-green-200",
      purple: "bg-purple-100 text-purple-600 group-hover:bg-purple-200",
      orange: "bg-orange-100 text-orange-600 group-hover:bg-orange-200",
      pink: "bg-pink-100 text-pink-600 group-hover:bg-pink-200"
    }

    return (
      <div className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full flex items-center justify-center transition-all duration-300 ${animated ? 'animate-pulse' : ''}`}>
        <Icon className={`${size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-6 h-6' : 'w-8 h-8'} ${animated ? 'animate-bounce' : ''}`} />
      </div>
    )
  },

  // 스파클 효과 컴포넌트
  SparkleEffect: () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-ping"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}
        >
          <Sparkles className="w-3 h-3 text-yellow-400 opacity-60" />
        </div>
      ))}
    </div>
  ),

  // 그라데이션 텍스트 컴포넌트
  GradientText: ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <span className={`bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent ${className}`}>
      {children}
    </span>
  ),

  // 3D 카드 효과 컴포넌트
  Card3D: ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`group perspective-1000 ${className}`}>
      <div className="relative preserve-3d group-hover:rotate-y-6 transition-transform duration-500">
        <div className="backface-hidden bg-white rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-500">
          {children}
        </div>
      </div>
    </div>
  )
}

// 회원가입 및 본인 인증 시스템 컴포넌트들
const AuthSystem = {
  // 회원가입 컴포넌트
  SignUpForm: () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      company: '',
      businessNumber: '',
      password: '',
      confirmPassword: '',
      agreeTerms: false,
      agreePrivacy: false
    })

    const [step, setStep] = useState(1)
    const [emailVerified, setEmailVerified] = useState(false)
    const [phoneVerified, setPhoneVerified] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      if (step === 1) {
        setStep(2)
      } else if (step === 2) {
        alert('회원가입이 완료되었습니다!')
      }
    }

    const sendVerification = (type: 'email' | 'phone') => {
      if (type === 'email') {
        setTimeout(() => setEmailVerified(true), 2000)
        alert('인증 메일을 발송했습니다. 이메일을 확인해주세요.')
      } else {
        setTimeout(() => setPhoneVerified(true), 2000)
        alert('인증 SMS를 발송했습니다. 휴대폰을 확인해주세요.')
      }
    }

    return (
      <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <UserPlus className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">오프로 회원가입</h3>
          <p className="text-gray-600">식품공장 설립 전문 서비스를 이용하세요</p>
        </div>

        {/* 진행 단계 표시 */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
              1
            </div>
            <div className={`w-16 h-1 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
              2
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">이름 *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">회사명 *</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">이메일 *</label>
                <div className="flex space-x-2">
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => sendVerification('email')}
                    className="px-4 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors duration-300"
                  >
                    인증
                  </button>
                </div>
                {emailVerified && (
                  <div className="flex items-center mt-2 text-green-600">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    <span className="text-sm">이메일 인증 완료</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">휴대폰 번호 *</label>
                <div className="flex space-x-2">
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="010-1234-5678"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => sendVerification('phone')}
                    className="px-4 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors duration-300"
                  >
                    인증
                  </button>
                </div>
                {phoneVerified && (
                  <div className="flex items-center mt-2 text-green-600">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    <span className="text-sm">휴대폰 인증 완료</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">사업자등록번호 *</label>
                <input
                  type="text"
                  value={formData.businessNumber}
                  onChange={(e) => setFormData({...formData, businessNumber: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="123-45-67890"
                  required
                />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">비밀번호 *</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">비밀번호 확인 *</label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.agreeTerms}
                    onChange={(e) => setFormData({...formData, agreeTerms: e.target.checked})}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    required
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    <a href="/terms" className="text-blue-600 hover:underline">이용약관</a>에 동의합니다 *
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.agreePrivacy}
                    onChange={(e) => setFormData({...formData, agreePrivacy: e.target.checked})}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    required
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    <a href="/privacy" className="text-blue-600 hover:underline">개인정보처리방침</a>에 동의합니다 *
                  </span>
                </label>
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white py-4 rounded-lg font-semibold hover:from-emerald-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105"
          >
            {step === 1 ? '다음 단계' : '회원가입 완료'}
          </button>
        </form>
      </div>
    )
  },

  // 로그인 컴포넌트
  LoginForm: () => {
    const [formData, setFormData] = useState({
      email: '',
      password: '',
      rememberMe: false
    })

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      alert('로그인되었습니다!')
    }

    return (
      <div className="bg-white rounded-2xl p-8 shadow-lg max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <User className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">로그인</h3>
          <p className="text-gray-600">오프로에 오신 것을 환영합니다</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">이메일</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">비밀번호</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.rememberMe}
                onChange={(e) => setFormData({...formData, rememberMe: e.target.checked})}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">로그인 상태 유지</span>
            </label>
            <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">비밀번호 찾기</a>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white py-4 rounded-lg font-semibold hover:from-emerald-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105"
          >
            로그인
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            계정이 없으신가요? 
            <a href="#signup" className="text-blue-600 hover:underline ml-1">회원가입</a>
          </p>
        </div>
      </div>
    )
  },

  // 본인 인증 컴포넌트
  IdentityVerification: () => {
    const [verificationStep, setVerificationStep] = useState(1)
    const [verificationData, setVerificationData] = useState({
      name: '',
      phone: '',
      verificationCode: '',
      documentType: 'business',
      documentFile: null as File | null
    })

    const verificationMethods = [
      {
        id: 'phone',
        title: '휴대폰 본인인증',
        description: 'SMS 인증번호로 본인 확인',
        icon: Smartphone,
        color: 'bg-blue-500'
      },
      {
        id: 'document',
        title: '사업자등록증 업로드',
        description: '사업자등록증으로 사업자 확인',
        icon: FileCheck,
        color: 'bg-green-500'
      }
    ]

    const handleVerification = (method: string) => {
      if (method === 'phone') {
        alert('인증 SMS를 발송했습니다.')
        setVerificationStep(2)
      } else if (method === 'document') {
        setVerificationStep(3)
      }
    }

    return (
      <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <ShieldCheck className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">본인 인증</h3>
          <p className="text-gray-600">프로젝트 접근을 위한 본인 확인이 필요합니다</p>
        </div>

        {verificationStep === 1 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {verificationMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => handleVerification(method.id)}
                  className="p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 text-left"
                >
                  <div className={`w-12 h-12 ${method.color} rounded-full flex items-center justify-center mb-3`}>
                    <method.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{method.title}</h4>
                  <p className="text-sm text-gray-600">{method.description}</p>
                </button>
              ))}
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
                <h4 className="font-semibold text-yellow-900">인증 필요 사항</h4>
              </div>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• 프로젝트 견적서 다운로드</li>
                <li>• 상세 상담 예약</li>
                <li>• 공사 진행 상황 확인</li>
                <li>• 결제 및 계약 진행</li>
              </ul>
            </div>
          </>
        )}

        {verificationStep === 2 && (
          <div className="space-y-6">
            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">휴대폰 인증 완료</h4>
              <p className="text-gray-600">본인 확인이 완료되었습니다.</p>
            </div>
            <button
              onClick={() => setVerificationStep(1)}
              className="w-full bg-emerald-500 text-white py-3 rounded-lg hover:bg-emerald-600 transition-colors duration-300"
            >
              다른 인증 방법 선택
            </button>
          </div>
        )}

        {verificationStep === 3 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">사업자등록증 업로드</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">파일을 드래그하거나 클릭하여 업로드</p>
                <p className="text-sm text-gray-500">JPG, PNG, PDF 파일 (최대 10MB)</p>
                <input
                  type="file"
                  className="hidden"
                  accept=".jpg,.jpeg,.png,.pdf"
                />
              </div>
            </div>
            <button
              onClick={() => setVerificationStep(2)}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors duration-300"
            >
              업로드 완료
            </button>
          </div>
        )}
      </div>
    )
  }
}

// 전문 식품공장 설립 시스템 컴포넌트들
const ProfessionalSystems = {
  // HACCP 인증 시스템
  HACCPCertification: () => (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <Certificate className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">HACCP 인증 시스템</h3>
        <p className="text-gray-600">식품안전관리인증원 공식 인증 시스템</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <TestTube className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <h4 className="font-semibold text-gray-900 mb-1">위해요소 분석</h4>
          <p className="text-sm text-gray-600">HA (Hazard Analysis)</p>
        </div>
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <h4 className="font-semibold text-gray-900 mb-1">중요관리점</h4>
          <p className="text-sm text-gray-600">CCP (Critical Control Point)</p>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <ClipboardCheck className="w-8 h-8 text-purple-600 mx-auto mb-2" />
          <h4 className="font-semibold text-gray-900 mb-1">관리기준</h4>
          <p className="text-sm text-gray-600">관리한계 및 모니터링</p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6">
        <h4 className="font-semibold text-gray-900 mb-4">인증 단계별 진행</h4>
        <div className="space-y-3">
          <div className="flex items-center">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-white text-xs font-bold">1</span>
            </div>
            <span className="text-gray-700">사전 심사 및 현황 분석</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-white text-xs font-bold">2</span>
            </div>
            <span className="text-gray-700">HACCP 팀 구성 및 교육</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-white text-xs font-bold">3</span>
            </div>
            <span className="text-gray-700">HACCP 계획서 작성</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-white text-xs font-bold">4</span>
            </div>
            <span className="text-gray-700">인증기관 심사 및 인증</span>
          </div>
        </div>
      </div>
    </div>
  ),

  // 법규 및 인허가 시스템
  LegalCompliance: () => (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
          <Scale className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">법규 및 인허가 관리</h3>
        <p className="text-gray-600">식품위생법, 건축법 등 관련 법규 준수</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">필수 인허가</h4>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <FileCheck className="w-5 h-5 text-green-600 mr-3" />
              <div>
                <div className="font-medium text-gray-900">식품제조업 신고</div>
                <div className="text-sm text-gray-600">식품위생법 제37조</div>
              </div>
            </div>
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <Building className="w-5 h-5 text-blue-600 mr-3" />
              <div>
                <div className="font-medium text-gray-900">건축물 사용승인</div>
                <div className="text-sm text-gray-600">건축법 제22조</div>
              </div>
            </div>
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <Droplets className="w-5 h-5 text-purple-600 mr-3" />
              <div>
                <div className="font-medium text-gray-900">폐수배출시설 설치신고</div>
                <div className="text-sm text-gray-600">수질환경보전법</div>
              </div>
            </div>
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <Wind className="w-5 h-5 text-orange-600 mr-3" />
              <div>
                <div className="font-medium text-gray-900">대기오염물질 배출시설 신고</div>
                <div className="text-sm text-gray-600">대기환경보전법</div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-4">법규 준수 체크리스트</h4>
          <div className="space-y-3">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
              <span className="text-gray-700">식품위생법 준수</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
              <span className="text-gray-700">건축법 규정 준수</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
              <span className="text-gray-700">환경법규 준수</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
              <span className="text-gray-700">소방법 규정 준수</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
              <span className="text-gray-700">노동안전보건법 준수</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),

  // 기술 표준 및 설계 기준
  TechnicalStandards: () => (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
          <Microscope className="w-8 h-8 text-purple-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">기술 표준 및 설계 기준</h3>
        <p className="text-gray-600">식품공장 설계 및 시공 전문 기술 기준</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">환경 조건 관리</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <Thermometer className="w-5 h-5 text-red-500 mr-3" />
                <span className="text-gray-700">온도 관리</span>
              </div>
              <span className="text-sm font-medium text-gray-600">18-22°C</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <Droplets className="w-5 h-5 text-blue-500 mr-3" />
                <span className="text-gray-700">습도 관리</span>
              </div>
              <span className="text-sm font-medium text-gray-600">45-65% RH</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <Wind className="w-5 h-5 text-green-500 mr-3" />
                <span className="text-gray-700">환기량</span>
              </div>
              <span className="text-sm font-medium text-gray-600">15회/시간</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <Sun className="w-5 h-5 text-yellow-500 mr-3" />
                <span className="text-gray-700">조명</span>
              </div>
              <span className="text-sm font-medium text-gray-600">500 Lux 이상</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-4">설계 기준</h4>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="font-medium text-blue-900 mb-1">동선 설계</div>
              <div className="text-sm text-blue-700">원료 → 가공 → 포장 → 출하 단방향 흐름</div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="font-medium text-green-900 mb-1">구역 분리</div>
              <div className="text-sm text-green-700">오염구역과 청정구역 엄격 분리</div>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="font-medium text-purple-900 mb-1">소재 선택</div>
              <div className="text-sm text-purple-700">식품접촉면 비식품접촉면 구분</div>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <div className="font-medium text-orange-900 mb-1">위생 설비</div>
              <div className="text-sm text-orange-700">세정·소독 시설 필수 설치</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),

  // 전문가 인증 시스템
  ExpertCertification: () => (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
          <GraduationCap className="w-8 h-8 text-yellow-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">전문가 인증 시스템</h3>
        <p className="text-gray-600">식품공장 설립 분야 공인 전문가 인증</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="text-center p-4 bg-yellow-50 rounded-lg">
          <Badge className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
          <h4 className="font-semibold text-gray-900 mb-1">식품공장 설계 전문가</h4>
          <p className="text-sm text-gray-600">5년 이상 경력</p>
        </div>
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <Certificate className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <h4 className="font-semibold text-gray-900 mb-1">HACCP 컨설턴트</h4>
          <p className="text-sm text-gray-600">식품안전관리인증원 인증</p>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <Seal className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <h4 className="font-semibold text-gray-900 mb-1">건축사</h4>
          <p className="text-sm text-gray-600">건축사법 정식 등록</p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-yellow-50 to-blue-50 rounded-xl p-6">
        <h4 className="font-semibold text-gray-900 mb-4">인증 과정</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              <span className="text-sm text-gray-700">학력 및 경력 검증</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              <span className="text-sm text-gray-700">전문 교육 이수</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              <span className="text-sm text-gray-700">실무 프로젝트 수행</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              <span className="text-sm text-gray-700">필기 및 실기 시험</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              <span className="text-sm text-gray-700">면접 심사</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              <span className="text-sm text-gray-700">인증서 발급</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// 신뢰성 강화 컴포넌트들
const CredibilityElements = {
  // 인증서 및 자격 증명
  Certifications: () => (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
          <Trophy className="w-8 h-8 text-yellow-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">인증서 및 자격 증명</h3>
        <p className="text-gray-600">공식 기관으로부터 인정받은 전문성과 신뢰성</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <Certificate className="w-8 h-8 text-white" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-1">ISO 22000</h4>
          <p className="text-sm text-gray-600">국제식품안전관리시스템</p>
          <div className="mt-2 text-xs text-blue-600 font-medium">2023.12 인증</div>
        </div>

        <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-1">FSSC 22000</h4>
          <p className="text-sm text-gray-600">식품안전시스템인증</p>
          <div className="mt-2 text-xs text-green-600 font-medium">2023.10 인증</div>
        </div>

        <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
          <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <Building className="w-8 h-8 text-white" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-1">건설업 등록</h4>
          <p className="text-sm text-gray-600">건설산업기본법</p>
          <div className="mt-2 text-xs text-purple-600 font-medium">2022.08 등록</div>
        </div>

        <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
          <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <Cog className="w-8 h-8 text-white" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-1">설계업 등록</h4>
          <p className="text-sm text-gray-600">건축사법 정식 등록</p>
          <div className="mt-2 text-xs text-orange-600 font-medium">2022.06 등록</div>
        </div>

        <div className="text-center p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-xl">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <Flame className="w-8 h-8 text-white" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-1">소방시설업</h4>
          <p className="text-sm text-gray-600">소방시설업 등록증</p>
          <div className="mt-2 text-xs text-red-600 font-medium">2023.03 등록</div>
        </div>

        <div className="text-center p-4 bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl">
          <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <Globe2 className="w-8 h-8 text-white" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-1">환경영향평가</h4>
          <p className="text-sm text-gray-600">환경영향평가 자격</p>
          <div className="mt-2 text-xs text-teal-600 font-medium">2023.05 자격</div>
        </div>
      </div>
    </div>
  ),

  // 고객 후기 및 리뷰
  CustomerReviews: () => (
    <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-500 rounded-full mb-6">
          <Quote className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">검증된 성공 사례</h3>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed px-4">
          200+ 완공 프로젝트와 실제 고객의 생생한 경험담
        </p>
        
        {/* 신뢰성 지표 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 max-w-4xl mx-auto px-4">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-emerald-600 mb-2">200+</div>
            <div className="text-xs sm:text-sm md:text-base text-gray-600">완공 프로젝트</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-emerald-600 mb-2">98%</div>
            <div className="text-xs sm:text-sm md:text-base text-gray-600">고객 만족도</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-emerald-600 mb-2">30%</div>
            <div className="text-xs sm:text-sm md:text-base text-gray-600">평균 비용 절감</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-emerald-600 mb-2">100%</div>
            <div className="text-xs sm:text-sm md:text-base text-gray-600">HACCP 인증률</div>
          </div>
      </div>

        <div className="inline-flex items-center bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full px-6 py-3 shadow-lg">
          <Star className="w-6 h-6 mr-3 fill-current" />
          <span className="font-bold text-lg">평균 만족도 4.9/5.0</span>
            </div>
      </div>

      {/* 실제 고객 사례 - 스토리텔링 기반 */}
      <div className="space-y-12">
        {/* 사례 1: 김철수 대표 - 제과제빵 공장 */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-emerald-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 좌측: 고객 사진 및 정보 */}
            <div className="relative">
              <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-2xl p-6 text-center">
                {/* 고객 사진 */}
                <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face&auto=format" 
                    alt="김철수 대표" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">김철수 대표</h4>
                <p className="text-emerald-600 font-semibold mb-4">(주)맛있는식품 · 제과제빵 전문</p>
                
                {/* 성과 지표 */}
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-600">30%</div>
                      <div className="text-sm text-gray-600">비용 절감</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-600">3개월</div>
                      <div className="text-sm text-gray-600">완공</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 우측: 인터뷰 내용 */}
            <div>
              <div className="mb-6">
                <h5 className="text-lg font-semibold text-gray-900 mb-3">💬 고객 인터뷰</h5>
                <blockquote className="border-l-4 border-emerald-500 pl-4 italic text-gray-700 text-lg leading-relaxed">
                  "처음에는 3개월이 너무 빠르다고 생각했는데, 오프로의 체계적인 관리 덕분에 예정보다 일찍 완공되었습니다. 
                  HACCP 인증도 한 번에 통과해서 정말 놀랐어요. 예상 비용보다 30%나 절약되었습니다."
                </blockquote>
            </div>
              
              <div className="bg-emerald-50 rounded-xl p-4">
                <h6 className="font-semibold text-emerald-900 mb-2">🏭 프로젝트 개요</h6>
                <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">규모</span>
                    <span className="font-semibold">500㎡</span>
          </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">예산</span>
                    <span className="font-semibold">3억원</span>
          </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">절감액</span>
                    <span className="font-semibold text-emerald-600">9천만원</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">완공일</span>
                    <span className="font-semibold">2024.01.15</span>
          </div>
        </div>

                {/* 시공 현장 사진 */}
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=200&fit=crop&auto=format" 
                    alt="제과제빵 공장 시공 현장" 
                    className="w-full h-32 object-cover"
                  />
            </div>
              </div>
            </div>
          </div>
        </div>

        {/* 사례 2: 이영희 사장 - 유제품 가공 */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-blue-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 좌측: 고객 사진 및 정보 */}
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-100 rounded-2xl p-6 text-center">
                {/* 고객 사진 */}
                <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face&auto=format" 
                    alt="이영희 사장" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">이영희 사장</h4>
                <p className="text-blue-600 font-semibold mb-4">(주)신선한유제품 · 유제품 가공</p>
                
                {/* 성과 지표 */}
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">2개월</div>
                      <div className="text-sm text-gray-600">기간 단축</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">100%</div>
                      <div className="text-sm text-gray-600">HACCP 통과</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 우측: 인터뷰 내용 */}
            <div>
              <div className="mb-6">
                <h5 className="text-lg font-semibold text-gray-900 mb-3">💬 고객 인터뷰</h5>
                <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-700 text-lg leading-relaxed">
                  "HACCP 인증이 이렇게 어려운 줄 몰랐는데, 오프로의 전문가들이 단계별로 가이드해주셔서 
                  어려움 없이 통과할 수 있었습니다. 공사 기간도 2개월이나 단축되어서 빨리 영업을 시작할 수 있었어요."
                </blockquote>
            </div>
              
              <div className="bg-blue-50 rounded-xl p-4">
                <h6 className="font-semibold text-blue-900 mb-2">🏭 프로젝트 개요</h6>
                <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">규모</span>
                    <span className="font-semibold">300㎡</span>
          </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">예산</span>
                    <span className="font-semibold">2.5억원</span>
          </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">기간 단축</span>
                    <span className="font-semibold text-blue-600">2개월</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">완공일</span>
                    <span className="font-semibold">2024.02.03</span>
          </div>
        </div>

                {/* 시공 현장 사진 */}
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=200&fit=crop&auto=format" 
                    alt="유제품 공장 시공 현장" 
                    className="w-full h-32 object-cover"
                  />
            </div>
              </div>
            </div>
          </div>
        </div>

        {/* 사례 3: 박민수 대표 - 냉동식품 제조 */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-purple-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 좌측: 고객 사진 및 정보 */}
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl p-6 text-center">
                {/* 고객 사진 */}
                <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face&auto=format" 
                    alt="박민수 대표" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">박민수 대표</h4>
                <p className="text-purple-600 font-semibold mb-4">(주)건강한베이커리 · 냉동식품 제조</p>
                
                {/* 성과 지표 */}
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">15회</div>
                      <div className="text-sm text-gray-600">상담 횟수</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">5.0</div>
                      <div className="text-sm text-gray-600">만족도</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 우측: 인터뷰 내용 */}
            <div>
              <div className="mb-6">
                <h5 className="text-lg font-semibold text-gray-900 mb-3">💬 고객 인터뷰</h5>
                <blockquote className="border-l-4 border-purple-500 pl-4 italic text-gray-700 text-lg leading-relaxed">
                  "전문가 상담이 정말 도움이 되었습니다. 식품공장 설립에 대한 모든 궁금증을 해결해주셨어요. 
                  실시간 모니터링 덕분에 공사 진행상황을 언제든 확인할 수 있어서 안심이 됐어요. 강력 추천합니다!"
                </blockquote>
            </div>
              
              <div className="bg-purple-50 rounded-xl p-4">
                <h6 className="font-semibold text-purple-900 mb-2">🏭 프로젝트 개요</h6>
                <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">규모</span>
                    <span className="font-semibold">800㎡</span>
          </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">예산</span>
                    <span className="font-semibold">4.5억원</span>
          </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">상담</span>
                    <span className="font-semibold text-purple-600">15회</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">완공일</span>
                    <span className="font-semibold">2024.02.20</span>
                  </div>
                </div>
                
                {/* 시공 현장 사진 */}
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=200&fit=crop&auto=format" 
                    alt="냉동식품 공장 시공 현장" 
                    className="w-full h-32 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <div className="inline-flex items-center bg-yellow-50 border border-yellow-200 rounded-full px-6 py-3">
          <ThumbsUp className="w-5 h-5 text-yellow-600 mr-2" />
          <span className="text-yellow-800 font-semibold">고객 만족도 4.9/5.0 (98% 만족)</span>
        </div>
      </div>
    </div>
  ),

  // 언론 보도 및 미디어
  MediaCoverage: () => (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
          <Newspaper className="w-8 h-8 text-red-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">언론 보도 및 미디어</h3>
        <p className="text-gray-600">주요 언론에서 주목받는 오프로의 혁신</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mr-3">
              <Newspaper className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">조선일보</h4>
              <p className="text-sm text-gray-600">2024.01.15</p>
            </div>
          </div>
          <h5 className="font-semibold text-gray-900 mb-2">
            "식품공장 설립 스마트 견적 시스템 도입... 비용 30% 절감 효과"
          </h5>
          <p className="text-gray-600 text-sm">
            오프로가 개발한 스마트 견적 시스템이 식품공장 건설 비용을 크게 절감시키고 있다는 보도...
          </p>
        </div>

        <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-3">
              <Newspaper className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">한국경제</h4>
              <p className="text-sm text-gray-600">2024.02.03</p>
            </div>
          </div>
          <h5 className="font-semibold text-gray-900 mb-2">
            "HACCP 인증률 98% 달성... 식품안전 관리 혁신"
          </h5>
          <p className="text-gray-600 text-sm">
            오프로의 전문적인 HACCP 인증 시스템으로 고객사의 인증 성공률이 크게 향상되었다는 보도...
          </p>
        </div>

        <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-3">
              <Video className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">KBS 뉴스</h4>
              <p className="text-sm text-gray-600">2024.02.10</p>
            </div>
          </div>
          <h5 className="font-semibold text-gray-900 mb-2">
            "식품공장 설립 원스톱 서비스... 중소기업의 든든한 파트너"
          </h5>
          <p className="text-gray-600 text-sm">
            중소기업의 식품공장 설립을 돕는 오프로의 원스톱 서비스가 업계의 주목을 받고 있다는 보도...
          </p>
        </div>

        <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mr-3">
              <Newspaper className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">식품저널</h4>
              <p className="text-sm text-gray-600">2024.02.18</p>
            </div>
          </div>
          <h5 className="font-semibold text-gray-900 mb-2">
            "식품공장 설립 전문 플랫폼 '오프로' 성공 사례 발표"
          </h5>
          <p className="text-gray-600 text-sm">
            식품공장 설립 전문 플랫폼 오프로의 성공 사례와 향후 계획에 대한 전문 매체 보도...
          </p>
        </div>
      </div>
    </div>
  ),

  // 수상 및 인정
  Awards: () => (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
          <Medal className="w-8 h-8 text-yellow-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">수상 및 인정</h3>
        <p className="text-gray-600">정부 및 기관으로부터 받은 영예로운 수상</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 border-l-4 border-yellow-500">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center mr-3">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">식품산업 발전 유공자 표창</h4>
              <p className="text-sm text-gray-600">식품의약품안전처</p>
            </div>
          </div>
          <p className="text-gray-700 text-sm mb-3">
            식품공장 설립 분야의 혁신적 서비스 개발과 산업 발전에 기여한 공로를 인정받아 수상
          </p>
          <div className="text-xs text-yellow-600 font-medium">2023.12.15 수상</div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-l-4 border-blue-500">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-3">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">건설산업 우수업체 선정</h4>
              <p className="text-sm text-gray-600">국토교통부</p>
            </div>
          </div>
          <p className="text-gray-700 text-sm mb-3">
            식품공장 설립 분야에서의 우수한 시공 실적과 품질관리를 인정받아 선정
          </p>
          <div className="text-xs text-blue-600 font-medium">2023.11.20 선정</div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border-l-4 border-green-500">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-3">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">품질경영 우수기업 인증</h4>
              <p className="text-sm text-gray-600">한국품질재단</p>
            </div>
          </div>
          <p className="text-gray-700 text-sm mb-3">
            ISO 9001 품질경영시스템 구축 및 지속적 품질개선 활동을 인정받아 인증
          </p>
          <div className="text-xs text-green-600 font-medium">2023.10.08 인증</div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border-l-4 border-purple-500">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mr-3">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">혁신기술 인증</h4>
              <p className="text-sm text-gray-600">중소벤처기업부</p>
            </div>
          </div>
          <p className="text-gray-700 text-sm mb-3">
            스마트 견적 시스템 개발 및 식품공장 설립 혁신 기술을 인정받아 인증
          </p>
          <div className="text-xs text-purple-600 font-medium">2023.09.25 인증</div>
        </div>
      </div>
    </div>
  ),

  // 파트너십 및 네트워크
  Partnerships: () => (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
          <Users2 className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">파트너십 및 네트워크</h3>
        <p className="text-gray-600">신뢰할 수 있는 협력 파트너와의 전략적 제휴</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        <div className="text-center p-4 bg-gray-50 rounded-xl">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <Building className="w-8 h-8 text-white" />
          </div>
          <h4 className="font-semibold text-gray-900 text-sm">한국식품공업협회</h4>
          <p className="text-xs text-gray-600 mt-1">정회원사</p>
        </div>

        <div className="text-center p-4 bg-gray-50 rounded-xl">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <Hammer className="w-8 h-8 text-white" />
          </div>
          <h4 className="font-semibold text-gray-900 text-sm">건설업협회</h4>
          <p className="text-xs text-gray-600 mt-1">정회원사</p>
        </div>

        <div className="text-center p-4 bg-gray-50 rounded-xl">
          <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <Cog className="w-8 h-8 text-white" />
          </div>
          <h4 className="font-semibold text-gray-900 text-sm">설비업체</h4>
          <p className="text-xs text-gray-600 mt-1">전략 파트너</p>
        </div>

        <div className="text-center p-4 bg-gray-50 rounded-xl">
          <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <Wrench className="w-8 h-8 text-white" />
          </div>
          <h4 className="font-semibold text-gray-900 text-sm">자재업체</h4>
          <p className="text-xs text-gray-600 mt-1">우선 공급업체</p>
        </div>

        <div className="text-center p-4 bg-gray-50 rounded-xl">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h4 className="font-semibold text-gray-900 text-sm">대학 연구기관</h4>
          <p className="text-xs text-gray-600 mt-1">기술 협력</p>
        </div>

        <div className="text-center p-4 bg-gray-50 rounded-xl">
          <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h4 className="font-semibold text-gray-900 text-sm">정부기관</h4>
          <p className="text-xs text-gray-600 mt-1">정책 협력</p>
        </div>
      </div>
    </div>
  )
}

// 기술적 전문성 강화 컴포넌트들
const TechnicalExpertise = {
  // 3D 설계 및 시뮬레이션
  Design3D: () => (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
          <Layers className="w-8 h-8 text-purple-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">3D 설계 및 시뮬레이션</h3>
        <p className="text-gray-600">최첨단 3D 기술로 식품공장을 미리 경험하세요</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex items-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl">
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mr-4">
              <Monitor className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">실시간 3D 시각화</h4>
              <p className="text-sm text-gray-600">설계 단계부터 완공까지 실시간 확인</p>
            </div>
          </div>

          <div className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
              <Workflow className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">BIM 통합 관리</h4>
              <p className="text-sm text-gray-600">Building Information Modeling 기술 적용</p>
            </div>
          </div>

          <div className="flex items-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-4">
              <GitBranch className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">동선 시뮬레이션</h4>
              <p className="text-sm text-gray-600">작업자 동선과 물류 흐름 최적화</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 text-center">
          <div className="w-full h-48 bg-gradient-to-br from-purple-200 to-blue-200 rounded-lg flex items-center justify-center mb-4">
            <div className="text-center">
              <Layers className="w-16 h-16 text-purple-600 mx-auto mb-2" />
              <p className="text-gray-600 font-medium">3D 설계 미리보기</p>
            </div>
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">실제 공장과 동일한 3D 모델</h4>
          <p className="text-sm text-gray-600">완공 전 실제 공장을 미리 체험</p>
        </div>
      </div>
    </div>
  ),

  // IoT 스마트 팩토리
  SmartFactory: () => (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
          <Zap className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">IoT 스마트 팩토리 시스템</h3>
        <p className="text-gray-600">4차 산업혁명 기술로 식품공장을 스마트하게</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Thermometer className="w-8 h-8 text-white" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">실시간 환경 모니터링</h4>
          <p className="text-sm text-gray-600">온도, 습도, 공기질 24시간 실시간 감시</p>
        </div>

        <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Database className="w-8 h-8 text-white" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">스마트 품질관리</h4>
          <p className="text-sm text-gray-600">머신러닝 기반 자동 품질 검사 시스템</p>
        </div>

        <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
          <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">데이터 분석</h4>
          <p className="text-sm text-gray-600">빅데이터 기반 생산성 최적화</p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
        <h4 className="font-semibold text-gray-900 mb-4 text-center">스마트 팩토리 혜택</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">40%</div>
            <div className="text-sm text-gray-600">에너지 절약</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">60%</div>
            <div className="text-sm text-gray-600">품질 향상</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">50%</div>
            <div className="text-sm text-gray-600">유지보수 비용 절감</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600 mb-1">30%</div>
            <div className="text-sm text-gray-600">생산성 증대</div>
          </div>
        </div>
      </div>
    </div>
  ),

  // 디지털 트윈 기술
  DigitalTwin: () => (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <Globe2 className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">디지털 트윈 기술</h3>
        <p className="text-gray-600">가상 공장으로 실제 운영을 미리 시뮬레이션</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="flex items-start p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center mr-4 mt-1">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">가상 시운전</h4>
              <p className="text-sm text-gray-600">실제 생산 전 모든 시나리오 테스트</p>
            </div>
          </div>

          <div className="flex items-start p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-1">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">최적화 시뮬레이션</h4>
              <p className="text-sm text-gray-600">생산라인 효율성 자동 최적화</p>
            </div>
          </div>

          <div className="flex items-start p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl">
            <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center mr-4 mt-1">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">예측 유지보수</h4>
              <p className="text-sm text-gray-600">스마트 장비 고장 예측 및 관리</p>
            </div>
          </div>

          <div className="flex items-start p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl">
            <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center mr-4 mt-1">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">성능 분석</h4>
              <p className="text-sm text-gray-600">실시간 성능 모니터링 및 분석</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6">
          <h4 className="font-semibold text-gray-900 mb-4 text-center">디지털 트윈 활용 사례</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-white rounded-lg">
              <span className="text-sm font-medium text-gray-700">설비 가동률</span>
              <span className="text-sm font-bold text-green-600">95% → 98%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white rounded-lg">
              <span className="text-sm font-medium text-gray-700">고장 예방율</span>
              <span className="text-sm font-bold text-blue-600">70% → 90%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white rounded-lg">
              <span className="text-sm font-medium text-gray-700">에너지 효율</span>
              <span className="text-sm font-bold text-purple-600">85% → 92%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white rounded-lg">
              <span className="text-sm font-medium text-gray-700">품질 일관성</span>
              <span className="text-sm font-bold text-orange-600">88% → 96%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })
  const [isMouseActive, setIsMouseActive] = useState(false)

  useEffect(() => {
    // 로딩 애니메이션 완전 제거 - 바로 페이지 표시
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100
      setScrollProgress(scrollPercent)
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      })
      setIsMouseActive(true)
    }

    const handleMouseLeave = () => {
      setIsMouseActive(false)
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  const features = [
    {
      icon: Cpu,
      title: "스마트 견적 시스템",
      description: "지역별 비용 데이터를 활용한 정확한 비용 계산 및 자동 저장",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: ShieldCheck,
      title: "HACCP 자동 관리",
      description: "식품안전관리인증기준 완벽 준수, 실시간 체크리스트 및 진행률 추적",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Factory,
      title: "실시간 프로젝트 관리",
      description: "로컬 저장 기반 프로젝트 추적, 일정 관리, 비용 모니터링",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Gauge,
      title: "데이터 시각화",
      description: "직관적인 대시보드와 차트로 프로젝트 현황을 한눈에 파악",
      color: "from-orange-500 to-orange-600"
    }
  ]

  const stats = [
    { number: "150+", label: "완료된 식품공장", icon: Building2 },
    { number: "98%", label: "HACCP 인증률", icon: Trophy },
    { number: "24/7", label: "전문가 지원", icon: Users2 },
    { number: "20년+", label: "식품공장 전문 경험", icon: TrendingUp }
  ]

  const processSteps = [
    { 
      step: "1", 
      title: "견적 및 상담", 
      description: "전문가 상담을 통한 맞춤형 견적 제공",
      icon: Calculator,
      color: "blue",
      duration: "1-2일"
    },
    { 
      step: "2", 
      title: "계약 체결", 
      description: "명확한 계약조건으로 안전한 프로젝트 시작",
      icon: FileText,
      color: "emerald",
      duration: "1일"
    },
    { 
      step: "3", 
      title: "설계 및 인허가", 
      description: "HACCP 기준 설계 및 각종 인허가 지원",
      icon: Settings,
      color: "purple",
      duration: "2-4주"
    },
    { 
      step: "4", 
      title: "건설 및 모니터링", 
      description: "전문 시공팀의 품질관리 및 진행상황 모니터링",
      icon: Building2,
      color: "orange",
      duration: "3-6개월"
    },
    { 
      step: "5", 
      title: "인증 및 완공", 
      description: "HACCP 인증 완료 및 공장 인수인계",
      icon: Award,
      color: "green",
      duration: "1-2주"
    }
  ]

  return (
    <div className="min-h-screen">
      
      {/* 스크롤 진행률 표시기 - 미묘하게 조정 */}
      <div className="fixed top-0 left-0 w-full h-0.5 bg-gray-100 z-40">
        <div 
          className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 transition-all duration-200 ease-out opacity-80"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-navy-900 to-slate-800 text-white overflow-hidden">
        {/* Enhanced Background with Mouse Interaction */}
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        {/* Mouse-following gradient overlay - 미묘하게 조정 */}
        <div 
          className={`absolute inset-0 transition-all duration-1000 ease-out ${isMouseActive ? 'opacity-20' : 'opacity-0'}`}
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255,255,255,0.05) 0%, transparent 70%)`
          }}
        />

        {/* 간단한 배경 패턴만 유지 */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white opacity-5 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>

        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white bg-opacity-10 rounded-full mb-6 backdrop-blur-sm">
              <Factory className="w-10 h-10 text-white" />
            </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
          <span className="block">식품공장 설립</span>
          <span className="text-emerald-400 block sm:inline">원스톱 플랫폼</span>
            </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-100 mb-6 max-w-3xl mx-auto leading-relaxed px-4">
          <span className="text-white font-semibold block sm:inline">견적·설계·시공·모니터링까지</span>
          <span className="block sm:inline sm:ml-1">한 번에 완성</span>
        </p>
        <p className="text-base sm:text-lg text-emerald-200 mb-8 max-w-2xl mx-auto leading-relaxed px-4">
          💡 <span className="font-medium">꿈의 식품공장을 현실로 만드는 특별한 여정</span><br />
          <span className="text-sm sm:text-base opacity-90">20년 이상의 노하우로 안전하고 확실하게, 여러분의 성공을 약속합니다</span>
        </p>
            
            {/* 3개 핵심 가치 - 간결화 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-12 px-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-3 mx-auto backdrop-blur-sm">
                  <DollarSign className="w-8 h-8 text-emerald-400" />
                </div>
                <div className="text-white font-semibold text-sm sm:text-base">솔직한 견적</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-3 mx-auto backdrop-blur-sm">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div className="text-white font-semibold text-sm sm:text-base">확실한 인증</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-3 mx-auto backdrop-blur-sm">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <div className="text-white font-semibold text-sm sm:text-base">끝까지 함께</div>
              </div>
            </div>

            {/* 주요 CTA 버튼 - 요구사항에 맞게 수정 */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 px-4">
              <Link
                href="/estimate"
                className="group relative inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-500 ease-out transform hover:scale-110 hover:-translate-y-2 ring-4 ring-emerald-300 ring-opacity-50 hover:ring-opacity-75 active:scale-95"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-300"></div>
                <Calculator className="w-7 h-7 mr-3" />
                <span className="relative z-10 whitespace-nowrap">무료로 견적받기</span>
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
              <button
                onClick={() => {
                  // 견적 시뮬레이션 섹션으로 스크롤
                  const element = document.querySelector('.bg-gradient-to-br.from-blue-50.to-white')
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                className="group inline-flex items-center justify-center px-10 py-5 bg-emerald-500 bg-opacity-90 hover:bg-opacity-100 text-white rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl transition-all duration-500 ease-out transform hover:scale-105 hover:-translate-y-1 border-2 border-emerald-400 border-opacity-50 hover:border-opacity-80 active:scale-95"
              >
                <Play className="w-7 h-7 mr-3" />
                <span className="whitespace-nowrap">바로 체험해보기</span>
              </button>
            </div>
            
            {/* 신뢰성 지표 - 즉시 신뢰 구축 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 max-w-4xl mx-auto px-4">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-emerald-400 mb-2">15+</div>
                <div className="text-xs sm:text-sm text-gray-200">년간 경험</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-emerald-400 mb-2">200+</div>
                <div className="text-xs sm:text-sm text-gray-200">완공 프로젝트</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-emerald-400 mb-2">100%</div>
                <div className="text-xs sm:text-sm text-gray-200">HACCP 인증</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-emerald-400 mb-2">24/7</div>
                <div className="text-xs sm:text-sm text-gray-200">실시간 모니터링</div>
              </div>
            </div>
            
        {/* 스크롤 인디케이터 */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-center">
          <div className="text-white text-sm mb-4 opacity-80">
            오프로의 전문 서비스를 확인해보세요
          </div>
          <div className="flex flex-col items-center">
            <div className="w-6 h-10 border-2 border-white border-opacity-50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white bg-opacity-70 rounded-full mt-2 animate-bounce"></div>
            </div>
            <div className="mt-2 text-white text-xs opacity-60">
              스크롤
            </div>
          </div>
        </div>

        {/* 전역 플로팅 상담 버튼 - 모든 페이지에서 표시 */}
        <div className="fixed bottom-6 right-6 z-50">
          <div 
            onClick={() => window.location.href = '/consultation'}
            className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-full p-4 md:p-5 shadow-2xl hover:shadow-3xl transition-all duration-500 ease-out transform hover:scale-110 hover:rotate-3 cursor-pointer group active:scale-95"
          >
            <MessageSquare className="w-6 h-6 md:w-7 md:h-7 text-white" />
            <div className="absolute -top-1 -left-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
              !
            </div>
            <div className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-sm">
              빠른 상담하기
            </div>
          </div>
        </div>
          </div>
        </div>
      </section>

      {/* 3D 조감도 섹션 */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-6">
              <Eye className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              <span className="block">오프로만의</span>
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                스마트 조감도
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              <span className="font-semibold text-gray-900">오프로만의 AI</span>가 생성하는 
              <span className="font-semibold text-indigo-600"> 현실적인 3D 공장 조감도</span>로 
              미래의 식품공장을 미리 만나보세요
            </p>
            
            {/* 특징 아이콘들 */}
            <div className="flex justify-center items-center space-x-8 mb-12">
              <div className="flex items-center text-indigo-600">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-2">
                  <span className="text-sm font-bold">AI</span>
                </div>
                <span className="text-sm font-medium">AI 생성</span>
              </div>
              <div className="flex items-center text-purple-600">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-2">
                  <Building className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">실제 규모</span>
              </div>
              <div className="flex items-center text-green-600">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-2">
                  <Zap className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">즉시 생성</span>
              </div>
            </div>

            {/* CTA 버튼 */}
            <Link
              href="/3d-visualization"
              className="group inline-flex items-center justify-center px-12 py-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-500 ease-out transform hover:scale-110 hover:-translate-y-2 ring-4 ring-indigo-300 ring-opacity-50 hover:ring-opacity-75 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-300"></div>
              <Eye className="w-7 h-7 mr-3" />
              <span className="relative z-10 whitespace-nowrap">지금 바로 사용해보세요</span>
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </div>

          {/* 미리보기 카드들 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl mb-4 flex items-center justify-center">
                <Building className="w-16 h-16 text-indigo-500" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">김치공장</h3>
              <p className="text-gray-600 text-sm">숙성실, 세척실, 절단실 등 업종별 특화된 레이아웃</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="w-full h-48 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl mb-4 flex items-center justify-center">
                <Building className="w-16 h-16 text-emerald-500" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">제빵공장</h3>
              <p className="text-gray-600 text-sm">혼합실, 발효실, 베이킹룸 등 완벽한 제빵 라인</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="w-full h-48 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl mb-4 flex items-center justify-center">
                <Building className="w-16 h-16 text-purple-500" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">음료공장</h3>
              <p className="text-gray-600 text-sm">혼합실, 여과실, 병입실 등 음료 제조 특화 설계</p>
            </div>
          </div>

          {/* 하단 텍스트 */}
          <div className="text-center mt-12">
            <p className="text-gray-500 text-sm">
              💡 <span className="font-medium">10개 업종 × 4가지 규모 = 무제한 조합</span>으로 
              여러분만의 이상적인 식품공장을 설계해보세요
            </p>
          </div>
        </div>
      </section>

      {/* Realtime Stats Section */}
      <section className="py-16 bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
              <Activity className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              우리는 <span className="text-emerald-600">끊임없이</span> 일하고 있습니다
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              실시간으로 업데이트되는 오프로의 성과를 확인해보세요. 매일매일 고객님의 꿈을 현실로 만들어가고 있습니다.
            </p>
          </div>
          
          <RealtimeStats />
          
          {/* 추가 정보 */}
          <div className="mt-12 text-center">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm text-gray-500">
              <div className="flex items-center justify-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                실시간 업데이트 중
              </div>
              <div className="flex items-center justify-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                평균 응답시간 5분 이내
              </div>
              <div className="flex items-center justify-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                24시간 상담 가능
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <VisualEnhancements.AnimatedCard key={index} delay={index * 150}>
                <div className="text-center p-6">
                  <div className="relative mb-4">
                    <VisualEnhancements.IconBadge 
                      icon={stat.icon} 
                      color="blue" 
                      size="lg" 
                      animated={true}
                    />
                    <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <Sparkles className="w-4 h-4 text-yellow-500" />
                </div>
              </div>
                  <div className="text-3xl font-bold mb-2">
                    <VisualEnhancements.GradientText className="text-3xl font-bold inline-flex items-baseline">
                      {stat.number.includes('+') ? (
                        <span><CounterAnimation end={parseInt(stat.number.replace('+', ''))} id={`stat-${index}-plus`} />+</span>
                      ) : stat.number.includes('%') ? (
                        <span><CounterAnimation end={parseInt(stat.number.replace('%', ''))} id={`stat-${index}-percent`} />%</span>
                      ) : stat.number.includes('/') ? (
                        <span>{stat.number}</span>
                      ) : (
                        <span><CounterAnimation end={parseInt(stat.number.replace('년', ''))} id={`stat-${index}-year`} />년</span>
                      )}
                    </VisualEnhancements.GradientText>
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              </VisualEnhancements.AnimatedCard>
            ))}
          </div>
        </div>
        
        {/* 섹션 스크롤 인디케이터 */}
        <div className="text-center mt-12">
          <div className="text-gray-500 text-sm mb-4">
            더 많은 정보를 확인해보세요
          </div>
          <div className="flex justify-center">
            <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-bounce"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem-Solution Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              복잡하고 어려운 식품공장 설립 계획
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              오프로가 함께합니다. 데이터와 노하우로 공정하고 투명한 식품공장 건설시장을 만들어갑니다
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* 문제점들 */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-red-600 mb-6 flex items-center">
                <AlertTriangle className="w-6 h-6 mr-3" />
                식품공장 설립의 현실
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm border-l-4 border-red-400">
                  <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600 font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">예상치 못한 비용 폭증</h4>
                    <p className="text-gray-600 text-sm">초기 견적 대비 최대 300% 비용 증가, 예산 초과로 인한 프로젝트 중단</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm border-l-4 border-red-400">
                  <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600 font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">HACCP 인증 실패</h4>
                    <p className="text-gray-600 text-sm">설계 단계에서 미흡한 검토로 인한 인증 실패율 40%, 재시공으로 인한 추가 비용</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm border-l-4 border-red-400">
                  <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600 font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">진행상황 불투명</h4>
                    <p className="text-gray-600 text-sm">시공 과정에서 진행률 파악 어려움, 지연 발생 시 대응 불가</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm border-l-4 border-red-400">
                  <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600 font-bold text-sm">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">전문성 부족</h4>
                    <p className="text-gray-600 text-sm">식품공장 전문 지식 부족으로 인한 설계 오류 및 품질 문제</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 해결책들 */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-green-600 mb-6 flex items-center">
                <CheckCircle className="w-6 h-6 mr-3" />
                오프로의 전문 솔루션
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm border-l-4 border-green-400">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <DollarSign className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">데이터 기반 정확한 견적</h4>
                    <p className="text-gray-600 text-sm">지역별 데이터베이스 기반 예측으로 <span className="font-semibold text-green-600">견적 정확도 95%</span> 달성</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm border-l-4 border-green-400">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Shield className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">HACCP 인증 보장</h4>
                    <p className="text-gray-600 text-sm">전문 감리 시스템으로 <span className="font-semibold text-green-600">인증 성공률 98%</span> 보장</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm border-l-4 border-green-400">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <BarChart3 className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">실시간 모니터링</h4>
                    <p className="text-gray-600 text-sm">24/7 진행상황 추적으로 <span className="font-semibold text-green-600">지연 위험 사전 감지</span></p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm border-l-4 border-green-400">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">20년 이상 전문 경험</h4>
                    <p className="text-gray-600 text-sm">식품공장 전문가 팀이 <span className="font-semibold text-green-600">전 과정 직접 관리</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 핵심 가치 제안 */}
          <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">결과적으로, 오프로를 선택하는 이유는?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4">
                  <Target className="w-8 h-8" />
                </div>
                <div className="text-3xl font-bold mb-2">30%</div>
                <div className="text-blue-100">비용 절감</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4">
                  <Zap className="w-8 h-8" />
                </div>
                <div className="text-3xl font-bold mb-2">50%</div>
                <div className="text-blue-100">공사 기간 단축</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4">
                  <Lock className="w-8 h-8" />
                </div>
                <div className="text-3xl font-bold mb-2">100%</div>
                <div className="text-blue-100">품질 보장</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              전문적인 식품공장 설립 서비스
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              식품안전을 최우선으로 하는 전문가들이 HACCP 기준에 맞는 완벽한 식품공장을 건설해드립니다
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <VisualEnhancements.AnimatedCard key={index} delay={index * 100}>
                <div className="p-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl mb-6 group-hover:scale-105 group-hover:rotate-3 transition-all duration-300 relative`}>
                    <feature.icon className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <Sparkles className="w-4 h-4 text-yellow-500" />
                </div>
              </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                    <VisualEnhancements.GradientText className="text-xl font-semibold">
                      {feature.title}
                    </VisualEnhancements.GradientText>
                  </h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">{feature.description}</p>
                </div>
              </VisualEnhancements.AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Tool Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6">
              <BarChart3 className="w-8 h-8 text-purple-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              정말 30% 절약되는지 직접 확인해보세요
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              투자 금액을 입력하면 기존 방식과 오프로 방식을 정확히 비교할 수 있습니다
            </p>
          </div>
          
          <ComparisonTool />
          
          {/* 추가 혜택 */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">비용 보장</h3>
              <p className="text-gray-600">계약 금액 초과 시 100% 부담</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">기간 보장</h3>
              <p className="text-gray-600">계약 기간 내 완공 보장</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">품질 보장</h3>
              <p className="text-gray-600">완공 후 2년간 품질 보증</p>
            </div>
          </div>
        </div>
      </section>

      {/* Estimate Enhancement Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-6">
              <Calculator className="w-8 h-8 text-indigo-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              더욱 정확하고 편리한 견적 시스템
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              견적 과정부터 완료 후까지, 모든 단계를 투명하게 공개합니다
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 견적 프로세스 가이드 */}
            <EstimateProcessGuide />
            
            {/* 견적 정확성 입증 */}
            <EstimateAccuracyProof />
            
            {/* 견적 후 액션 플로우 */}
            <EstimateActionFlow />
          </div>

          {/* 통합 견적 시작 버튼 */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">지금 바로 견적을 시작해보세요</h3>
              <p className="text-blue-100 mb-6">6분이면 정확한 견적서를 받을 수 있습니다</p>
              <Link
                href="/estimate"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Calculator className="w-5 h-5 mr-2" />
                무료 견적 시작하기
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Selection Flow Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6">
              <Users className="w-8 h-8 text-purple-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              식품공장 설립 참여자 <span className="text-purple-600">모두와 함께하는</span> 오프로
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              오프로는 건축주, 파트너사, 전문가에게 다양한 서비스를 제공합니다
            </p>
          </div>

          {/* 파트너사 선정 플로우 */}
          <div className="max-w-6xl mx-auto mb-16">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">설계부터 공사까지 <span className="text-purple-600">맞춤으로 제공하는 솔루션</span></h3>
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">1. 식품공장 계획</h4>
                  <p className="text-sm text-gray-600">원하는 목표에 맞는 실현가능한 사업계획서를 오프로와 만들 수 있습니다</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Eye className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">2. 파트너사 선정 및 설계</h4>
                  <p className="text-sm text-gray-600">검증된 전문 파트너사 선정부터 설계까지 원스톱 지원</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-8 h-8 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">3. 건설사 선정</h4>
                  <p className="text-sm text-gray-600">도급액과 신용평가 기준으로 검증된 건설사 선정</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-orange-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">4. 공사관리</h4>
                  <p className="text-sm text-gray-600">실시간 현장 모니터링과 투명한 공사 관리</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-red-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">5. HACCP 인증</h4>
                  <p className="text-sm text-gray-600">식품안전관리인증원 인증부터 완공까지 전문 지원</p>
                </div>
              </div>
            </div>
          </div>

          {/* 등급 시스템 설명 */}
          <div className="max-w-6xl mx-auto mb-16">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">데이터와 노하우로 <span className="text-purple-600">특별한 서비스</span></h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calculator className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-bold text-blue-900 mb-2">스마트 견적 시스템</h4>
                  <p className="text-sm text-blue-700">물량산출 + 3D BIM + 공사관리까지 한 번에</p>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-bold text-purple-900 mb-2">검증된 파트너사 연결</h4>
                  <p className="text-sm text-purple-700">건축주와 전문가를 연결하는 식품공장 오픈마켓</p>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl border-2 border-green-200">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Monitor className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-bold text-green-900 mb-2">실시간 현장 모니터링</h4>
                  <p className="text-sm text-green-700">무료로 받아보는 3D 현장 모니터링 시스템</p>
                </div>
              </div>
            </div>
          </div>

          {/* 파트너사 등록 CTA */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">공정하고 투명한 식품공장 건설시장</h3>
              <p className="text-purple-100 mb-6">오프로와 함께 많은 기업들이 성공했습니다</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/partners"
                  className="inline-flex items-center px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Users className="w-5 h-5 mr-2" />
                  검증된 파트너사 보기
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  href="/consultation"
                  className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-purple-600 transition-all duration-300 transform hover:scale-105"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  오프로와 건축 상담하기
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              식품공장 설립 프로세스
            </h2>
            <p className="text-lg text-gray-600">
              체계적이고 전문적인 5단계 프로세스로 안전한 식품공장을 건설합니다
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            {/* 데스크톱: 가로 플로우, 모바일: 세로 플로우 */}
            <div className="hidden lg:block">
              <div className="flex items-center justify-between relative">
                {/* 연결선 */}
                <div className="absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-emerald-500 via-purple-500 via-orange-500 to-green-500"></div>
                
                {processSteps.map((process, index) => {
                  const IconComponent = process.icon;
                  const colorClasses = {
                    blue: "bg-blue-500 border-blue-500",
                    emerald: "bg-emerald-500 border-emerald-500", 
                    purple: "bg-purple-500 border-purple-500",
                    orange: "bg-orange-500 border-orange-500",
                    green: "bg-green-500 border-green-500"
                  };
                  
                  return (
                    <div key={index} className="flex flex-col items-center text-center relative z-10">
                      <div className={`w-16 h-16 ${colorClasses[process.color as keyof typeof colorClasses]} rounded-full flex items-center justify-center text-white font-bold text-lg mb-4 border-4 border-white shadow-lg`}>
                        <IconComponent className="w-8 h-8" />
                    </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{process.title}</h3>
                      <p className="text-sm text-gray-600 mb-2 max-w-48">{process.description}</p>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{process.duration}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* 모바일/태블릿: 세로 플로우 */}
            <div className="lg:hidden space-y-6">
              {processSteps.map((process, index) => {
                const IconComponent = process.icon;
                const colorClasses = {
                  blue: "bg-blue-500",
                  emerald: "bg-emerald-500",
                  purple: "bg-purple-500", 
                  orange: "bg-orange-500",
                  green: "bg-green-500"
                };
                
                return (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm border-l-4 border-gray-200 hover:border-gray-300 transition-colors">
                    <div className={`w-12 h-12 ${colorClasses[process.color as keyof typeof colorClasses]} rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
                      <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-lg font-semibold text-gray-900">{process.title}</h3>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{process.duration}</span>
                  </div>
                      <p className="text-gray-600 text-sm">{process.description}</p>
                </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* New Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              🚀 새로운 기능
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              최신 기술로 식품공장 설립을 더욱 스마트하고 효율적으로 만들어보세요
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 md:p-8 border border-blue-100">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">실시간 자동 계산</h3>
              <p className="text-sm md:text-base text-gray-600 mb-4 leading-relaxed">
                입력하는 즉시 비용이 자동으로 계산되고 로컬에 저장됩니다. 언제든지 수정하고 비교해보세요.
              </p>
              <div className="space-y-2">
                <div className="text-xs md:text-sm text-blue-600 font-medium">✓ 지역별 비용 데이터 기반</div>
                <div className="text-xs md:text-sm text-blue-600 font-medium">✓ 실시간 저장 및 동기화</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 md:p-8 border border-green-100">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-4">
                <Monitor className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">실시간 프로젝트 대시보드</h3>
              <p className="text-sm md:text-base text-gray-600 mb-4 leading-relaxed">
                24/7 프로젝트 현황 모니터링, 실시간 알림, 진행률 추적을 한 곳에서 관리하세요.
              </p>
              <div className="space-y-2">
                <div className="text-xs md:text-sm text-green-600 font-medium">✓ 실시간 진행률 표시</div>
                <div className="text-xs md:text-sm text-green-600 font-medium">✓ 모바일 알림 서비스</div>
                <div className="text-xs md:text-sm text-green-600 font-medium">✓ 시공 현장 CCTV 연동</div>
            </div>

              {/* 대시보드 미리보기 */}
              <div className="mt-6 bg-white rounded-xl p-4 shadow-sm border border-green-100">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-700">프로젝트 진행률</span>
                  <span className="text-sm font-bold text-green-600">75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: '75%'}}></div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
                  <div className="text-center">
                    <div className="font-bold text-green-600">3</div>
                    <div>완료</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-orange-500">1</div>
                    <div>진행중</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-gray-400">1</div>
                    <div>대기</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-4 md:p-8 border border-purple-100">
              <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">수익성 분석</h3>
              <p className="text-sm md:text-base text-gray-600 mb-4 leading-relaxed">
                투자 회수 기간, ROI, 손익분기점을 자동으로 계산하여 사업성을 분석합니다.
              </p>
              <div className="space-y-2">
                <div className="text-xs md:text-sm text-purple-600 font-medium">✓ ROI 자동 계산</div>
                <div className="text-xs md:text-sm text-purple-600 font-medium">✓ 비용 절감 제안</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 섹션 스크롤 인디케이터 */}
        <div className="text-center mt-12">
          <div className="text-gray-500 text-sm mb-4">
            더 많은 정보를 확인해보세요
          </div>
          <div className="flex justify-center">
            <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-bounce"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Guarantee Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full mb-6">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              검증된 신뢰성
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              20년 이상 축적된 전문성과 완벽한 보장 시스템으로 여러분의 투자를 안전하게 보호합니다
            </p>
          </div>


          {/* 인증 배지 섹션 */}
          <div className="bg-white rounded-3xl p-8 md:p-12 mb-16 shadow-xl border border-gray-100">
            <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">공식 인증 및 보장</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-green-200 transition-colors">
                  <Award className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-1">HACCP 인증</h4>
                <p className="text-xs text-gray-600">100% 성공률</p>
              </div>
              <div className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-200 transition-colors">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-1">ISO 9001</h4>
                <p className="text-xs text-gray-600">품질관리시스템</p>
              </div>
              <div className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-purple-200 transition-colors">
                  <Building2 className="w-8 h-8 text-purple-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-1">건설업 등록</h4>
                <p className="text-xs text-gray-600">정식 등록업체</p>
              </div>
              <div className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-orange-200 transition-colors">
                  <Lock className="w-8 h-8 text-orange-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-1">완공보장</h4>
                <p className="text-xs text-gray-600">계약기간 준수</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* 인증 및 보장 */}
            <div className="text-center group">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors duration-300">
                <Award className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">ISO 인증</h3>
              <p className="text-gray-600 text-sm">ISO 9001, 14001, 45001 인증으로 품질 관리 체계 보장</p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors duration-300">
                <Lock className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">완공 보장</h3>
              <p className="text-gray-600 text-sm">계약 기간 내 완공 보장, 지연 시 일정 연장료 지급</p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors duration-300">
                <DollarSign className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">비용 보장</h3>
              <p className="text-gray-600 text-sm">계약 금액 초과 시 초과 비용 100% 부담 보장</p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors duration-300">
                <Shield className="w-10 h-10 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">품질 보장</h3>
              <p className="text-gray-600 text-sm">공장 완공 후 2년간 품질 보증 및 A/S 무상 제공</p>
            </div>
          </div>

          {/* 리스크 관리 시스템 */}
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">통합 리스크 관리 시스템</h3>
              <p className="text-gray-600">예상 가능한 모든 리스크를 사전에 분석하고 대응합니다</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">사전 리스크 분석</h4>
                <p className="text-gray-600 text-sm">지역별, 업종별 리스크 데이터베이스 기반 사전 분석</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-yellow-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">실시간 모니터링</h4>
                <p className="text-gray-600 text-sm">24/7 진행상황 추적으로 이상 징후 즉시 감지</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">즉시 대응 시스템</h4>
                <p className="text-gray-600 text-sm">문제 발생 시 전문팀 즉시 투입으로 손실 최소화</p>
              </div>
            </div>
          </div>

          {/* 보험 및 보상 */}
          <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4">완벽한 보험 및 보상 시스템</h3>
              <p className="text-blue-100">모든 가능한 위험에 대한 포괄적인 보장을 제공합니다</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-lg font-bold">공</span>
                </div>
                <h4 className="font-semibold mb-1">공사보험</h4>
                <p className="text-blue-100 text-sm">20억원</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-lg font-bold">배</span>
                </div>
                <h4 className="font-semibold mb-1">배상보험</h4>
                <p className="text-blue-100 text-sm">10억원</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-lg font-bold">품</span>
                </div>
                <h4 className="font-semibold mb-1">품질보증</h4>
                <p className="text-blue-100 text-sm">2년간</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-lg font-bold">완</span>
                </div>
                <h4 className="font-semibold mb-1">완공보장</h4>
                <p className="text-blue-100 text-sm">100%</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Systems */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-6">
              <Microscope className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              식품공장 설립 전문 시스템
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              HACCP 인증부터 법규 준수까지, 식품공장 설립의 모든 과정을 체계적으로 관리하는 전문 시스템
            </p>
          </div>

          <div className="space-y-16">
            <ProfessionalSystems.HACCPCertification />
            <ProfessionalSystems.LegalCompliance />
            <ProfessionalSystems.TechnicalStandards />
            <ProfessionalSystems.ExpertCertification />
          </div>
        </div>
      </section>

      {/* Technical Expertise */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full mb-6">
              <Layers className="w-8 h-8 text-purple-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              4차 산업혁명 기술 활용
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              3D 설계, IoT, 스마트 기술, 디지털 트윈 등 최첨단 기술로 식품공장 설립의 새로운 패러다임을 제시합니다
            </p>
          </div>

          <div className="space-y-16">
            <TechnicalExpertise.Design3D />
            <TechnicalExpertise.SmartFactory />
            <TechnicalExpertise.DigitalTwin />
          </div>
        </div>
      </section>

      {/* Credibility Elements */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-100 to-red-100 rounded-full mb-6">
              <Trophy className="w-8 h-8 text-yellow-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              신뢰성과 전문성의 증명
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              공식 인증서부터 고객 후기, 언론 보도까지, 오프로의 신뢰성을 입증하는 모든 것들
            </p>
          </div>

          <div className="space-y-16">
            <CredibilityElements.Certifications />
            <CredibilityElements.CustomerReviews />
            <CredibilityElements.MediaCoverage />
            <CredibilityElements.Awards />
            <CredibilityElements.Partnerships />
          </div>
        </div>
      </section>

      {/* User Authentication System */}
      <section id="signup" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-100 to-teal-100 rounded-full mb-6">
              <UserPlus className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              🎉 <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">무료 회원가입</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
              <strong>지금 가입하고 모든 서비스를 무료로 이용하세요!</strong>
            </p>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 max-w-2xl mx-auto">
              <p className="text-green-800 font-semibold">
                ✨ 가입 즉시 혜택: 무료 견적서 + 전문가 상담 + HACCP 가이드북
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* 회원가입 섹션 */}
            <div>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">회원가입</h3>
                <p className="text-gray-600">오프로의 모든 서비스를 이용하세요</p>
              </div>
              <AuthSystem.SignUpForm />
            </div>

            {/* 로그인 섹션 */}
            <div>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">로그인</h3>
                <p className="text-gray-600">이미 계정이 있으신가요?</p>
              </div>
              <AuthSystem.LoginForm />
            </div>
          </div>

          {/* 본인 인증 섹션 */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">본인 인증 시스템</h3>
              <p className="text-gray-600">프로젝트 접근 및 중요 서비스 이용을 위한 본인 확인</p>
            </div>
            <AuthSystem.IdentityVerification />
          </div>

          {/* 보안 정보 */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                <Lock className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">데이터 암호화</h4>
              <p className="text-sm text-gray-600">모든 개인정보는 256-bit SSL로 암호화됩니다</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">정보 보호</h4>
              <p className="text-sm text-gray-600">개인정보보호법에 따라 안전하게 관리됩니다</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
                <UserCheck className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">본인 확인</h4>
              <p className="text-sm text-gray-600">다중 인증을 통해 신원을 확인합니다</p>
            </div>
          </div>
        </div>
      </section>

      {/* Expert Testimonials & Success Stories */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-6">
              <Star className="w-8 h-8 text-yellow-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              전문가들이 인정하는 오프로
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              식품공장 설립 분야 최고 전문가들과 성공한 기업들이 증명하는 오프로의 실력
            </p>
          </div>

          {/* 전문가 추천 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">김영수 대표</h3>
                  <p className="text-gray-600">한국식품공업협회 회장</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 italic">
                "20년 이상 식품공장 설립 분야에서 이렇게 체계적이고 전문적인 서비스를 본 적이 없습니다. 
                특히 HACCP 인증 성공률 98%는 업계 최고 수준입니다."
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <Award className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">박미영 박사</h3>
                  <p className="text-gray-600">식품안전연구원 선임연구원</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 italic">
                "오프로의 스마트 견적 시스템은 정말 놀랍습니다. 기존 방식 대비 30% 비용 절감과 
                50% 공사 기간 단축은 업계 혁신이라 할 수 있습니다."
              </p>
            </div>
          </div>

          {/* 성공 사례 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">주요 성공 사례</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Factory className="w-10 h-10 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">ABC식품공장</h4>
                <p className="text-gray-600 text-sm mb-3">경기도 용인시</p>
                <div className="bg-green-50 rounded-lg p-3">
                  <div className="text-sm text-green-600 font-semibold">성과</div>
                  <div className="text-xs text-gray-600">예산 15% 절감</div>
                  <div className="text-xs text-gray-600">공기 2개월 단축</div>
                  <div className="text-xs text-gray-600">HACCP 1차 통과</div>
                </div>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Factory className="w-10 h-10 text-green-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">DEF제과공장</h4>
                <p className="text-gray-600 text-sm mb-3">충청남도 천안시</p>
                <div className="bg-green-50 rounded-lg p-3">
                  <div className="text-sm text-green-600 font-semibold">성과</div>
                  <div className="text-xs text-gray-600">예산 25% 절감</div>
                  <div className="text-xs text-gray-600">공기 1.5개월 단축</div>
                  <div className="text-xs text-gray-600">품질인증 완료</div>
                </div>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Factory className="w-10 h-10 text-purple-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">GHI유제품공장</h4>
                <p className="text-gray-600 text-sm mb-3">강원도 춘천시</p>
                <div className="bg-green-50 rounded-lg p-3">
                  <div className="text-sm text-green-600 font-semibold">성과</div>
                  <div className="text-xs text-gray-600">예산 20% 절감</div>
                  <div className="text-xs text-gray-600">공기 3개월 단축</div>
                  <div className="text-xs text-gray-600">안전인증 획득</div>
                </div>
              </div>
            </div>
          </div>

          {/* 통계 요약 */}
          <div className="mt-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-8">누적 성과</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-3xl font-bold mb-2">150+</div>
                <div className="text-green-100">완공된 공장</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">98%</div>
                <div className="text-green-100">HACCP 인증률</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">30%</div>
                <div className="text-green-100">평균 비용 절감</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">100%</div>
                <div className="text-green-100">고객 만족도</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* YouTube Channel & CEO Profile Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
              <Youtube className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              실제 모습으로 확인하는 오프로의 전문성
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              대표님이 직접 운영하는 유튜브 채널에서 식품공장 설립의 모든 과정을 생생하게 확인해보세요
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* 대표님 프로필 */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">전영로</h3>
                  <p className="text-blue-600 font-semibold">오프로 대표이사</p>
                  <p className="text-gray-600 text-sm">식품공장 설립 전문가</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Award className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">20년 이상 식품공장 전문 경험</h4>
                    <p className="text-gray-600 text-sm">150개 이상의 식품공장 설립 프로젝트 완료</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <BookOpen className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">HACCP 전문가 자격</h4>
                    <p className="text-gray-600 text-sm">식품안전관리인증기준(HACCP) 전문가 자격 보유</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Mic className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">교육 및 강연 활동</h4>
                    <p className="text-gray-600 text-sm">식품공업협회, 대학 등에서 정기 강연 및 교육 진행</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 유튜브 채널 정보 */}
            <div className="bg-gradient-to-br from-red-50 to-pink-100 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mr-4">
                  <Youtube className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">FoodUS 채널</h3>
                  <p className="text-red-600 font-semibold">@foodus</p>
                  <p className="text-gray-600 text-sm">식품공장 설립 전문 채널</p>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">구독자 수</span>
                  <span className="font-bold text-gray-900">5,000+ 명</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">총 영상 수</span>
                  <span className="font-bold text-gray-900">100+ 개</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">총 조회수</span>
                  <span className="font-bold text-gray-900">500,000+ 회</span>
                </div>
              </div>

              <a 
                href="https://www.youtube.com/@foodus/videos" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group inline-flex items-center w-full justify-center px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all duration-300 transform hover:scale-105"
              >
                <Youtube className="w-5 h-5 mr-2" />
                채널 바로가기
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
          </div>

          {/* 인기 영상 섹션 */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">인기 영상</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="aspect-video rounded-lg mb-4 overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/EhgnmbbMQnU"
                    title="식품공장 설립의 모든 것"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg"
                  ></iframe>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">HACCP공장 천장 높이와 하중</h4>
                <p className="text-gray-600 text-sm mb-3">공사비와 운영비를 동시에 절약하는 천장 높이 설계</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>조회수 25,000회</span>
                  <span>2주 전</span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="aspect-video rounded-lg mb-4 overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/9dJKQ50wCtk"
                    title="HACCP 인증 완벽 가이드"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg"
                  ></iframe>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">HACCP공장 설계 필수 원칙</h4>
                <p className="text-gray-600 text-sm mb-3">HACCP 공장에 반드시 지켜야 할 6가지 원칙</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>조회수 18,000회</span>
                  <span>1개월 전</span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="aspect-video rounded-lg mb-4 overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/dtCf5mZsSD4"
                    title="식품공장 비용 절감의 비밀"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg"
                  ></iframe>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">HACCP공장 설계사무소 선정</h4>
                <p className="text-gray-600 text-sm mb-3">정말 중요한 HACCP 설계 방법과 절차</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>조회수 32,000회</span>
                  <span>3주 전</span>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <a 
                href="https://www.youtube.com/@foodus/videos" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-900 transition-all duration-300 transform hover:scale-105"
              >
                <Youtube className="w-5 h-5 mr-2" />
                더 많은 영상 보기
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>

          {/* 영상 시청 후 혜택 */}
          <div className="mt-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">영상 시청 후 추가 혜택</h3>
            <p className="text-yellow-100 mb-6">유튜브 채널을 구독하고 영상을 시청하신 분들에게 특별 혜택을 드립니다</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <div className="w-12 h-12 bg-white bg-opacity-30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold mb-2">무료 상담</h4>
                <p className="text-yellow-100 text-sm">1시간 무료 전문가 상담</p>
              </div>
              
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <div className="w-12 h-12 bg-white bg-opacity-30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold mb-2">추가 할인</h4>
                <p className="text-yellow-100 text-sm">견적서 5% 추가 할인</p>
              </div>
              
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <div className="w-12 h-12 bg-white bg-opacity-30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold mb-2">전문 자료</h4>
                <p className="text-yellow-100 text-sm">HACCP 가이드북 무료 제공</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Urgency & Lead Generation Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-6">
              <Gift className="w-8 h-8 text-orange-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              지금만의 특별한 혜택을 놓치지 마세요
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              한정된 기회와 무료 혜택으로 식품공장 설립을 시작해보세요
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* 긴급성/희소성 요소 */}
            <UrgencyScarcity />
            
            {/* 리드 생성 요소 */}
            <LeadGeneration />
          </div>

          {/* 즉시 연락 요소 */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">지금 바로 연락하세요</h3>
            <p className="text-gray-600 mb-8">원하는 방식으로 즉시 상담받을 수 있습니다</p>
          </div>
          <ImmediateContact />
        </div>
      </section>

      {/* Tech Advantage Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
              <Cog className="w-10 h-10 text-blue-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              기술적 <span className="text-blue-600">차별화</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              최첨단 기술로 식품공장 설립의 모든 과정을 혁신합니다
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 견적 시뮬레이션 엔진 */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 shadow-xl border border-blue-100">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <Calculator className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">견적 시뮬레이션 엔진</h3>
                  <p className="text-gray-600">스마트 실시간 견적 시스템</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">전국 단가 DB 기반 자동 견적</h4>
                    <p className="text-sm text-gray-600">지역별, 업종별 실시간 단가 데이터로 정확한 견적 제공</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">3D 조감도 자동 생성</h4>
                    <p className="text-sm text-gray-600">입력 정보 기반 실시간 3D 설계 시각화</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">95% 정확도 보장</h4>
                    <p className="text-sm text-gray-600">머신러닝 알고리즘으로 지속적인 정확도 향상</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 설계 관리 시스템 */}
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl p-8 shadow-xl border border-emerald-100">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
                  <FileText className="w-8 h-8 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">설계 관리 시스템</h3>
                  <p className="text-gray-600">클라우드 기반 협업 플랫폼</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">버전 관리 & 실시간 피드백</h4>
                    <p className="text-sm text-gray-600">모든 설계 변경사항 추적 및 즉시 피드백 반영</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">3D 시뮬레이션 지원</h4>
                    <p className="text-sm text-gray-600">가상현실로 완공 후 모습 미리 체험</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">HACCP 기준 자동 검증</h4>
                    <p className="text-sm text-gray-600">설계 단계에서부터 위생 기준 자동 체크</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 건설 진행 모니터링 */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 shadow-xl border border-purple-100">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                  <Monitor className="w-8 h-8 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">건설 진행 모니터링</h3>
                  <p className="text-gray-600">실시간 현장 관리 시스템</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">단계별 사진·영상 업로드</h4>
                    <p className="text-sm text-gray-600">착공부터 완공까지 모든 과정 기록</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">실시간 대시보드</h4>
                    <p className="text-sm text-gray-600">24시간 언제든 진행상황 확인 가능</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">품질 관리 자동화</h4>
                    <p className="text-sm text-gray-600">스마트 품질 검사 및 이상 징후 감지</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 전자계약 & 보안 */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-8 shadow-xl border border-orange-100">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                  <Shield className="w-8 h-8 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">전자계약 & 보안</h3>
                  <p className="text-gray-600">법적 효력과 보안성 보장</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">법적 효력 있는 전자서명</h4>
                    <p className="text-sm text-gray-600">공인인증서 기반 안전한 계약 체결</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">계약서 자동 생성</h4>
                    <p className="text-sm text-gray-600">프로젝트 정보 기반 맞춤형 계약서</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">개인정보 보호</h4>
                    <p className="text-sm text-gray-600">ISO 27001 보안 인증 및 데이터 암호화</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 자재 추천 알고리즘 */}
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-3xl p-8 shadow-xl border border-teal-100">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mr-4">
                  <Package className="w-8 h-8 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">자재 추천 알고리즘</h3>
                  <p className="text-gray-600">HACCP 규정 준수 자동 추천</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-teal-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">규정 준수 자재 자동 추천</h4>
                    <p className="text-sm text-gray-600">HACCP 기준에 맞는 자재만 선별</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-teal-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">비용 최적화</h4>
                    <p className="text-sm text-gray-600">품질 대비 최적 가격 자재 추천</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-teal-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">공급망 관리</h4>
                    <p className="text-sm text-gray-600">신뢰할 수 있는 공급업체 자동 매칭</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 데이터 축적 & 확장성 */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-3xl p-8 shadow-xl border border-indigo-100">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                  <TrendingUp className="w-8 h-8 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">데이터 축적 & 확장성</h3>
                  <p className="text-gray-600">지속적인 서비스 확장 가능성</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-indigo-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">빅데이터 축적</h4>
                    <p className="text-sm text-gray-600">공장·자재·인증 데이터 기반 인사이트</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-indigo-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">SaaS 서비스 확장</h4>
                    <p className="text-sm text-gray-600">클라우드 기반 공장 관리 솔루션</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-indigo-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">글로벌 확장</h4>
                    <p className="text-sm text-gray-600">해외 시장 진출을 위한 기술 기반 구축</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">기술 혁신으로 미래를 준비합니다</h3>
              <p className="text-lg mb-6 opacity-90">
                오프로는 단순한 건설 서비스를 넘어 식품공장 산업의 디지털 혁신을 선도합니다
              </p>
              <button className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                <Cog className="w-5 h-5 mr-2" />
                기술 상세보기
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Expert Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-6">
              <Users className="w-10 h-10 text-emerald-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              전문가 <span className="text-emerald-600">팀 소개</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              20년 이상 경력의 식품공장 전문가들과 검증된 시공 파트너들이 함께합니다
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* 컨설턴트 팀 */}
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl p-8 shadow-xl border border-emerald-100">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-10 h-10 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">오프로 컨설턴트 팀</h3>
                <p className="text-gray-600">식품공장 설립 전문 컨설턴트</p>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center mr-4">
                      <span className="text-white text-xl font-bold">김</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">김영수 대표 컨설턴트</h4>
                      <p className="text-emerald-600 font-semibold">식품공장 설립 20년 이상 경력</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">전문 분야</span>
                      <span className="font-semibold">HACCP 인증</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">완공 프로젝트</span>
                      <span className="font-semibold">150+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">HACCP 성공률</span>
                      <span className="font-semibold text-emerald-600">98%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">평균 기간</span>
                      <span className="font-semibold">4개월</span>
                    </div>
                  </div>
                  
                  {/* HACCP 경험 지표 */}
                  <div className="mt-4 p-3 bg-emerald-50 rounded-lg">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-emerald-700 font-medium">HACCP 인증 경험</span>
                      <div className="flex items-center space-x-1">
                        <Award className="w-4 h-4 text-emerald-600" />
                        <span className="font-bold text-emerald-600">20년+</span>
                      </div>
                    </div>
                    <div className="mt-2 flex justify-between text-xs text-emerald-600">
                      <span>식품위생법 전문</span>
                      <span>ISO 22000 인증</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mr-4">
                      <span className="text-white text-xl font-bold">이</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">이민호 설계 전문가</h4>
                      <p className="text-blue-600 font-semibold">식품공장 설계 12년 경력</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">전문 분야</span>
                      <span className="font-semibold">위생 설계</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">설계 프로젝트</span>
                      <span className="font-semibold">200+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">설계 정확도</span>
                      <span className="font-semibold text-blue-600">99%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">평균 설계기간</span>
                      <span className="font-semibold">2주</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 시공 파트너 */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 shadow-xl border border-blue-100">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">시공 파트너 네트워크</h3>
                <p className="text-gray-600">검증된 전문 시공업체</p>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mr-4">
                      <span className="text-white text-xl font-bold">A</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">(주)에이스건설</h4>
                      <p className="text-blue-600 font-semibold">식품공장 시공 전문</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">설립</span>
                      <span className="font-semibold">2010년</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">완공 프로젝트</span>
                      <span className="font-semibold">80+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">HACCP 경험</span>
                      <span className="font-semibold text-blue-600">100%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">평균 기간</span>
                      <span className="font-semibold">3.5개월</span>
                    </div>
                  </div>
                  
                  {/* HACCP 실적 지표 */}
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-blue-700 font-medium">HACCP 인증 실적</span>
                      <div className="flex items-center space-x-1">
                        <Shield className="w-4 h-4 text-blue-600" />
                        <span className="font-bold text-blue-600">80개</span>
                      </div>
                    </div>
                    <div className="mt-2 flex justify-between text-xs text-blue-600">
                      <span>식품공장 전용</span>
                      <span>위생 설계 전문</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mr-4">
                      <span className="text-white text-xl font-bold">B</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">(주)베스트건설</h4>
                      <p className="text-purple-600 font-semibold">대형 공장 시공 전문</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">설립</span>
                      <span className="font-semibold">2008년</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">완공 프로젝트</span>
                      <span className="font-semibold">120+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">HACCP 경험</span>
                      <span className="font-semibold text-purple-600">100%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">평균 기간</span>
                      <span className="font-semibold">4개월</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 팀 성과 요약 */}
          <div className="bg-gradient-to-r from-emerald-600 to-green-600 rounded-3xl p-8 text-white">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">350+</div>
                <div className="text-emerald-100">완공 프로젝트</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">98%</div>
                <div className="text-emerald-100">HACCP 인증 성공률</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">20년+</div>
                <div className="text-emerald-100">누적 경험</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">24시간</div>
                <div className="text-emerald-100">상담 지원</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-6">
              <HelpCircle className="w-8 h-8 text-emerald-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">궁금한 게 있으시죠?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              식품공장 설립, 이 정도는 미리 알아두세요
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                question: "공장 짓는데 얼마나 걸려요?",
                answer: "보통 3-6개월 정도 걸려요. 공장 크기와 복잡도에 따라 달라지는데, 저희가 꼼꼼히 관리해서 약속한 날짜에 완성시켜드려요.",
                icon: Clock
              },
              {
                question: "견적은 어떻게 나와요?",
                answer: "지역별 데이터와 공장 크기, 용도 등을 종합해서 계산해요. 정확도는 95% 이상이니까 걱정 마세요.",
                icon: Calculator
              },
              {
                question: "HACCP 인증은 어떻게 받아요?",
                answer: "처음부터 HACCP 기준에 맞게 설계하고 짓기 때문에 인증 받기 쉬워요. 성공률 98%니까 거의 확실하다고 보시면 됩니다.",
                icon: Shield
              },
              {
                question: "비용은 얼마나 아껴요?",
                answer: "평균 30% 정도 아껴드려요. 투명한 견적과 효율적인 자재 관리로 쓸데없는 비용은 안 나가게 해드립니다.",
                icon: DollarSign
              },
              {
                question: "완공 후 A/S는 괜찮아요?",
                answer: "2년간 무상 A/S 해드려요. 24시간 모니터링해서 문제 생기면 바로 고쳐드리고, 추가 관리도 해드립니다.",
                icon: Wrench
              },
              {
                question: "어디든 가능해요?",
                answer: "네, 전국 어디든 가능해요. 지역별 전문 파트너들과 함께 같은 품질로 서비스해드립니다.",
                icon: MapPin
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                      <faq.icon className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">더 궁금한 게 있어요?</p>
            <Link
              href="/consultation"
              className="inline-flex items-center px-8 py-4 bg-emerald-500 text-white rounded-xl font-semibold hover:bg-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              직접 물어보기
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            지금 시작하세요
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            스마트 견적 시스템으로 프로젝트 비용을 정확하게 계산하고, 전문가와 상담해보세요
          </p>
          
          {/* 비용 절감 계산기 */}
          <div className="bg-white bg-opacity-10 rounded-2xl p-8 mb-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-4">간단한 비용 절감 계산</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div>
                <label className="block text-blue-100 text-sm font-medium mb-2">예상 투자금액</label>
                <div className="bg-white bg-opacity-20 rounded-lg p-3">
                  <span className="text-white font-bold text-lg">10억원</span>
                  <span className="text-blue-200 text-sm ml-2">(기본 예시)</span>
                </div>
              </div>
              <div>
                <label className="block text-blue-100 text-sm font-medium mb-2">오프로 선택 시</label>
                <div className="bg-green-500 bg-opacity-30 rounded-lg p-3">
                  <span className="text-white font-bold text-lg">7억원</span>
                  <span className="text-green-200 text-sm ml-2">(30% 절감)</span>
                </div>
              </div>
            </div>
            <div className="mt-4 p-4 bg-yellow-500 bg-opacity-20 rounded-lg">
              <div className="text-yellow-200 text-sm font-medium">💰 절감 효과</div>
              <div className="text-white font-bold text-xl">3억원 절약</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/estimate"
              className="group inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105"
            >
              <Calculator className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
              무료 견적 받기
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link
              href="/consultation"
              className="group inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              <MessageSquare className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
              전문가 상담 신청
            </Link>
          </div>

          {/* 추가 혜택 */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div className="text-white font-semibold mb-1">무료 상담</div>
              <div className="text-blue-100 text-sm">전문가 1:1 상담 무료</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="text-white font-semibold mb-1">완공 보장</div>
              <div className="text-blue-100 text-sm">계약 기간 내 완공 보장</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div className="text-white font-semibold mb-1">인증 보장</div>
              <div className="text-blue-100 text-sm">HACCP 인증 성공률 98%</div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Marketing Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
              <FileText className="w-10 h-10 text-blue-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              전문 <span className="text-blue-600">콘텐츠</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              식품공장 설립에 필요한 모든 정보를 한 곳에서 확인하세요
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* HACCP 인증 가이드 */}
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl p-8 shadow-xl border border-emerald-100 hover:shadow-2xl transition-all duration-300">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">HACCP 인증 가이드</h3>
                <p className="text-gray-600 text-sm">완벽한 인증을 위한 단계별 가이드</p>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm text-gray-700">인증 절차 상세 설명</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm text-gray-700">필수 서류 체크리스트</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm text-gray-700">심사 기준 및 준비사항</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm text-gray-700">실패 사례 및 대응방안</span>
                </div>
              </div>
              
              <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl py-3 font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                가이드 다운로드
              </button>
            </div>

            {/* 설립 체크리스트 */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 shadow-xl border border-blue-100 hover:shadow-2xl transition-all duration-300">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">설립 체크리스트</h3>
                <p className="text-gray-600 text-sm">놓치지 말아야 할 필수 사항들</p>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-gray-700">사전 준비사항 체크</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-gray-700">인허가 절차 가이드</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-gray-700">자금 조달 방법</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-gray-700">리스크 관리 방안</span>
                </div>
              </div>
              
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-xl py-3 font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                체크리스트 받기
              </button>
            </div>

            {/* 성공 사례집 */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 shadow-xl border border-purple-100 hover:shadow-2xl transition-all duration-300">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">성공 사례집</h3>
                <p className="text-gray-600 text-sm">실제 고객들의 성공 스토리</p>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-purple-600" />
                  <span className="text-sm text-gray-700">업종별 성공 사례</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-purple-600" />
                  <span className="text-sm text-gray-700">비용 절감 노하우</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-purple-600" />
                  <span className="text-sm text-gray-700">기간 단축 전략</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-purple-600" />
                  <span className="text-sm text-gray-700">고객 인터뷰 영상</span>
                </div>
              </div>
              
              <button className="w-full bg-purple-500 hover:bg-purple-600 text-white rounded-xl py-3 font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                사례집 보기
              </button>
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">더 많은 정보가 필요하세요?</h3>
              <p className="text-lg mb-6 opacity-90">
                전문가와 1:1 상담으로 맞춤형 솔루션을 받아보세요
              </p>
              <button className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                <MessageSquare className="w-5 h-5 mr-2" />
                전문가 상담 신청
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-6">
              <Users className="w-10 h-10 text-emerald-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              전문가 <span className="text-emerald-600">커뮤니티</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              예비 창업자와 전문가가 함께하는 식품공장 설립 커뮤니티
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Q&A 섹션 */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">전문가 Q&A</h3>
                <p className="text-gray-600">궁금한 것을 바로 물어보세요</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">Q</span>
                    </div>
                    <div>
                      <p className="text-gray-800 font-medium mb-2">제과제빵 공장 설립 시 가장 중요한 것은?</p>
                      <div className="flex items-center space-x-2 text-sm text-blue-600">
                        <Users className="w-4 h-4" />
                        <span>김영수 전문가</span>
                        <span>•</span>
                        <span>2시간 전</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">A</span>
                    </div>
                    <div>
                      <p className="text-gray-800 mb-2">HACCP 기준 위생 설계가 가장 중요합니다. 단방향 흐름과 온습도 관리가 핵심이에요.</p>
                      <div className="flex items-center space-x-2 text-sm text-green-600">
                        <Award className="w-4 h-4" />
                        <span>인증 전문가</span>
                        <span>•</span>
                        <span>1시간 전</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">Q</span>
                    </div>
                    <div>
                      <p className="text-gray-800 font-medium mb-2">예산 3억원으로 가능한 규모는?</p>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>예비창업자</span>
                        <span>•</span>
                        <span>30분 전</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-xl py-3 font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                <MessageSquare className="w-5 h-5 mr-2 inline" />
                질문하기
              </button>
            </div>

            {/* 웨비나 섹션 */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Youtube className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">전문가 웨비나</h3>
                <p className="text-gray-600">매주 새로운 주제로 진행됩니다</p>
              </div>

              <div className="space-y-6 mb-8">
                <div className="border border-gray-200 rounded-xl p-4 hover:border-purple-300 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
                      <Calendar className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-1">HACCP 인증 완벽 가이드</h4>
                      <p className="text-sm text-gray-600 mb-2">김영수 전문가와 함께하는 실전 인증 노하우</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          <span>2024.03.15 (금) 14:00</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="w-3 h-3 mr-1" />
                          <span>1,234명 신청</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-xl p-4 hover:border-purple-300 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center">
                      <Calculator className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-1">비용 절감 전략 워크샵</h4>
                      <p className="text-sm text-gray-600 mb-2">평균 30% 비용 절감을 위한 실전 방법론</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          <span>2024.03.22 (금) 14:00</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="w-3 h-3 mr-1" />
                          <span>856명 신청</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-xl p-4 hover:border-purple-300 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-green-500 rounded-lg flex items-center justify-center">
                      <Building2 className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-1">성공 사례 분석 세미나</h4>
                      <p className="text-sm text-gray-600 mb-2">실제 고객 사례를 통한 성공 요인 분석</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          <span>2024.03.29 (금) 14:00</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="w-3 h-3 mr-1" />
                          <span>1,567명 신청</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button className="w-full bg-purple-500 hover:bg-purple-600 text-white rounded-xl py-3 font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                <Youtube className="w-5 h-5 mr-2 inline" />
                웨비나 신청하기
              </button>
            </div>
          </div>

          {/* 커뮤니티 통계 */}
          <div className="mt-16 bg-gradient-to-r from-emerald-600 to-green-600 rounded-3xl p-8 text-white">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">2,500+</div>
                <div className="text-emerald-100">활성 멤버</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">1,200+</div>
                <div className="text-emerald-100">완료된 Q&A</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">48</div>
                <div className="text-emerald-100">월간 웨비나</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">95%</div>
                <div className="text-emerald-100">만족도</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Logos Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
              <Building className="w-10 h-10 text-blue-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              신뢰할 수 있는 <span className="text-blue-600">파트너 네트워크</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              정부기관, 협회, 설비 제조사와 함께하는 검증된 파트너십
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 정부기관 */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 shadow-xl border border-blue-100">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">정부기관</h3>
                <p className="text-gray-600 text-sm">공식 인증 및 지원기관</p>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 shadow-sm text-center">
                  <div className="text-lg font-bold text-blue-600 mb-1">식품의약품안전처</div>
                  <div className="text-sm text-gray-600">HACCP 인증 기관</div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm text-center">
                  <div className="text-lg font-bold text-blue-600 mb-1">중소벤처기업부</div>
                  <div className="text-sm text-gray-600">창업 지원 기관</div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm text-center">
                  <div className="text-lg font-bold text-blue-600 mb-1">한국농수산식품유통공사</div>
                  <div className="text-sm text-gray-600">식품산업 지원</div>
                </div>
              </div>
            </div>

            {/* 협회 */}
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl p-8 shadow-xl border border-emerald-100">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">전문 협회</h3>
                <p className="text-gray-600 text-sm">업계 전문 기관</p>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 shadow-sm text-center">
                  <div className="text-lg font-bold text-emerald-600 mb-1">한국식품공업협회</div>
                  <div className="text-sm text-gray-600">식품산업 대표기관</div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm text-center">
                  <div className="text-lg font-bold text-emerald-600 mb-1">한국건설기술연구원</div>
                  <div className="text-sm text-gray-600">건설 기술 연구</div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm text-center">
                  <div className="text-lg font-bold text-emerald-600 mb-1">한국위생환경연구원</div>
                  <div className="text-sm text-gray-600">위생 환경 전문</div>
                </div>
              </div>
            </div>

            {/* 설비 제조사 */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 shadow-xl border border-purple-100">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Cog className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">설비 제조사</h3>
                <p className="text-gray-600 text-sm">전문 장비 공급업체</p>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 shadow-sm text-center">
                  <div className="text-lg font-bold text-purple-600 mb-1">대한식품기계</div>
                  <div className="text-sm text-gray-600">식품 가공 장비</div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm text-center">
                  <div className="text-lg font-bold text-purple-600 mb-1">한국냉동기계</div>
                  <div className="text-sm text-gray-600">냉동 냉장 설비</div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm text-center">
                  <div className="text-lg font-bold text-purple-600 mb-1">글로벌위생시스템</div>
                  <div className="text-sm text-gray-600">위생 설비 전문</div>
                </div>
              </div>
            </div>
          </div>

          {/* 파트너십 강조 메시지 */}
          <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-white">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">신뢰할 수 있는 파트너십</h3>
              <p className="text-lg mb-6 opacity-90">
                정부기관부터 전문 설비 제조사까지, 검증된 파트너들과 함께 안전하고 확실한 식품공장을 건설합니다
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold mb-2">100%</div>
                  <div className="text-blue-100">검증된 파트너</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">20년+</div>
                  <div className="text-blue-100">파트너십 유지</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">24시간</div>
                  <div className="text-blue-100">기술 지원</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Expansion Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-6">
              <Globe className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">
              글로벌 <span className="text-cyan-400">확장</span>
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              해외 식품공장 설립과 수출을 위한 글로벌 네트워크를 구축합니다
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* 해외 진출 현황 */}
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-3xl p-8 border border-white border-opacity-20">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">해외 진출 현황</h3>
                <p className="text-blue-100">글로벌 식품공장 설립 네트워크</p>
              </div>

              <div className="space-y-6">
                <div className="bg-white bg-opacity-5 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-semibold">동남아시아</span>
                    <span className="text-cyan-400 font-bold">15개 프로젝트</span>
                  </div>
                  <div className="text-blue-100 text-sm">
                    베트남, 태국, 인도네시아 식품공장 설립
                  </div>
                </div>

                <div className="bg-white bg-opacity-5 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-semibold">중국</span>
                    <span className="text-cyan-400 font-bold">8개 프로젝트</span>
                  </div>
                  <div className="text-blue-100 text-sm">
                    중국 내 한식 공장 및 수출 기지 구축
                  </div>
                </div>

                <div className="bg-white bg-opacity-5 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-semibold">미국/유럽</span>
                    <span className="text-cyan-400 font-bold">5개 프로젝트</span>
                  </div>
                  <div className="text-blue-100 text-sm">
                    FDA, EU 기준 식품공장 설립
                  </div>
                </div>
              </div>
            </div>

            {/* 수출 지원 서비스 */}
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-3xl p-8 border border-white border-opacity-20">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">수출 지원 서비스</h3>
                <p className="text-blue-100">글로벌 진출을 위한 종합 솔루션</p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">국제 인증 지원</h4>
                    <p className="text-blue-100 text-sm">FDA, EU, HACCP 국제 인증 취득 지원</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">현지 파트너 연결</h4>
                    <p className="text-blue-100 text-sm">각국 현지 건설업체 및 설비업체 연결</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">수출 기지 구축</h4>
                    <p className="text-blue-100 text-sm">해외 진출을 위한 생산 기지 설립</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">시장 분석</h4>
                    <p className="text-blue-100 text-sm">글로벌 식품시장 트렌드 및 기회 분석</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 글로벌 비전 */}
          <div className="mt-16 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-3xl p-8 text-white">
            <div className="text-center">
              <h3 className="text-3xl font-bold mb-4">글로벌 식품공장 네트워크</h3>
              <p className="text-xl mb-8 opacity-90">
                한국의 식품 제조 기술을 세계로, 세계의 시장을 한국으로 연결합니다
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold mb-2">28개</div>
                  <div className="text-cyan-100">완료 프로젝트</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">15개국</div>
                  <div className="text-cyan-100">진출 국가</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">95%</div>
                  <div className="text-cyan-100">성공률</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">24시간</div>
                  <div className="text-cyan-100">글로벌 지원</div>
                </div>
              </div>

              <div className="mt-8">
                <button className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                  <Globe className="w-5 h-5 mr-2" />
                  글로벌 진출 상담하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
