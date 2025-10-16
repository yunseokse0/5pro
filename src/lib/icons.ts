// 프로페셔널 아이콘 세트 정의
import {
  // 프로젝트 관리
  ClipboardList,
  FileText,
  FolderOpen,
  Calendar,
  Clock,
  
  // 계약 및 문서
  FileSignature,
  FileCheck,
  FileSpreadsheet,
  PenTool,
  
  // 진행 상황 및 분석
  Gauge,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  
  // 설정 및 관리
  Settings,
  Wrench,
  Cog,
  Shield,
  
  // 견적 및 재무
  Calculator,
  DollarSign,
  Receipt,
  CreditCard,
  
  // 3D 및 설계
  Box,
  Building2,
  Factory,
  Layout,
  
  // 파트너 및 네트워크
  Users2,
  Network,
  UserCheck,
  
  // HACCP 및 품질
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Award,
  
  // 스마트 팩토리
  Cpu,
  Wifi,
  Zap,
  Database,
  
  // 일반
  Home,
  Phone,
  Mail,
  ArrowRight,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Eye,
  Edit,
  Trash2,
  Save,
  RefreshCw
} from 'lucide-react';

// 카테고리별 아이콘 매핑
export const iconCategories = {
  // 프로젝트 관리
  project: {
    list: ClipboardList,
    folder: FolderOpen,
    calendar: Calendar,
    clock: Clock,
    file: FileText
  },
  
  // 계약 및 문서
  contract: {
    signature: FileSignature,
    check: FileCheck,
    spreadsheet: FileSpreadsheet,
    edit: PenTool,
    document: FileText
  },
  
  // 진행 상황 및 분석
  progress: {
    gauge: Gauge,
    trending: TrendingUp,
    bar: BarChart3,
    pie: PieChart,
    activity: Activity
  },
  
  // 설정 및 관리
  settings: {
    gear: Settings,
    wrench: Wrench,
    cog: Cog,
    shield: Shield
  },
  
  // 견적 및 재무
  finance: {
    calculator: Calculator,
    dollar: DollarSign,
    receipt: Receipt,
    credit: CreditCard
  },
  
  // 3D 및 설계
  design: {
    box: Box,
    building: Building2,
    factory: Factory,
    layout: Layout
  },
  
  // 파트너 및 네트워크
  partner: {
    users: Users2,
    network: Network,
    userCheck: UserCheck
  },
  
  // HACCP 및 품질
  quality: {
    check: CheckCircle2,
    alert: AlertTriangle,
    shield: ShieldCheck,
    award: Award
  },
  
  // 스마트 팩토리
  smartFactory: {
    cpu: Cpu,
    wifi: Wifi,
    zap: Zap,
    database: Database
  },
  
  // 일반
  common: {
    home: Home,
    phone: Phone,
    mail: Mail,
    arrow: ArrowRight,
    plus: Plus,
    search: Search,
    filter: Filter,
    download: Download,
    upload: Upload,
    eye: Eye,
    edit: Edit,
    trash: Trash2,
    save: Save,
    refresh: RefreshCw
  }
};

// 아이콘 스타일 상수
export const iconStyles = {
  strokeWidth: 2.2,
  size: {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-10 h-10'
  },
  colors: {
    primary: 'text-blue-700',
    secondary: 'text-gray-600',
    success: 'text-green-600',
    warning: 'text-orange-600',
    error: 'text-red-600',
    muted: 'text-gray-400'
  }
};

// 자주 사용되는 아이콘 조합
export const commonIcons = {
  // 네비게이션
  home: Home,
  estimate: Calculator,
  visualization: Box,
  smartFactory: Cpu,
  haccp: ShieldCheck,
  partners: Users2,
  contract: FileSignature,
  progress: Gauge,
  login: UserCheck,
  
  // 액션
  add: Plus,
  edit: Edit,
  delete: Trash2,
  save: Save,
  refresh: RefreshCw,
  download: Download,
  upload: Upload,
  search: Search,
  filter: Filter,
  
  // 상태
  success: CheckCircle2,
  warning: AlertTriangle,
  error: AlertTriangle,
  info: Eye
};
