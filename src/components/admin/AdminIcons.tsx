// Admin 시스템용 Heroicons 매핑
import {
  // 대시보드 및 메인
  HomeIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  
  // 프로젝트 및 견적
  DocumentTextIcon,
  BuildingOfficeIcon,
  CalculatorIcon,
  
  // 사용자 및 권한
  UsersIcon,
  UserCircleIcon,
  ShieldCheckIcon,
  
  // 상태 및 알림
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  XCircleIcon,
  
  // 액션 버튼
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  
  // 네비게이션
  ChevronRightIcon,
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
  
  // HACCP 관련
  ShieldCheckIcon as HaccpIcon,
  DocumentCheckIcon,
  ClipboardDocumentListIcon,
  
  // 통계 및 분석
  ChartPieIcon,
  TrendingUpIcon,
  CurrencyDollarIcon,
  
  // 기타
  BellIcon,
  ArrowRightOnRectangleIcon,
  CalendarIcon,
  FolderIcon,
  DocumentIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';

import {
  // Solid 버전 (버튼, 활성 상태용)
  HomeIcon as HomeIconSolid,
  ChartBarIcon as ChartBarIconSolid,
  Cog6ToothIcon as Cog6ToothIconSolid,
  DocumentTextIcon as DocumentTextIconSolid,
  BuildingOfficeIcon as BuildingOfficeIconSolid,
  CalculatorIcon as CalculatorIconSolid,
  UsersIcon as UsersIconSolid,
  UserCircleIcon as UserCircleIconSolid,
  ShieldCheckIcon as ShieldCheckIconSolid,
  CheckCircleIcon as CheckCircleIconSolid,
  PlusIcon as PlusIconSolid,
  PencilIcon as PencilIconSolid,
  TrashIcon as TrashIconSolid,
  EyeIcon as EyeIconSolid,
  HaccpIcon as HaccpIconSolid,
  DocumentCheckIcon as DocumentCheckIconSolid,
  ClipboardDocumentListIcon as ClipboardDocumentListIconSolid,
  ChartPieIcon as ChartPieIconSolid,
  TrendingUpIcon as TrendingUpIconSolid,
  CurrencyDollarIcon as CurrencyDollarIconSolid,
} from '@heroicons/react/24/solid';

// 아이콘 카테고리별 매핑
export const adminIcons = {
  // 메인 네비게이션
  navigation: {
    dashboard: HomeIcon,
    estimates: CalculatorIcon,
    projects: BuildingOfficeIcon,
    haccp: HaccpIcon,
    users: UsersIcon,
    analytics: ChartBarIcon,
    settings: Cog6ToothIcon,
  },
  
  // 액션 버튼
  actions: {
    add: PlusIcon,
    edit: PencilIcon,
    delete: TrashIcon,
    view: EyeIcon,
    download: ArrowDownTrayIcon,
    search: MagnifyingGlassIcon,
    filter: FunnelIcon,
    save: DocumentCheckIcon,
    refresh: ArrowRightOnRectangleIcon,
  },
  
  // 상태 표시
  status: {
    success: CheckCircleIcon,
    warning: ExclamationTriangleIcon,
    error: XCircleIcon,
    pending: ClockIcon,
    completed: CheckCircleIcon,
    inProgress: ClockIcon,
    draft: PencilIcon,
  },
  
  // HACCP 관련
  haccp: {
    main: HaccpIcon,
    document: DocumentCheckIcon,
    checklist: ClipboardDocumentListIcon,
    approval: ShieldCheckIcon,
  },
  
  // 통계 및 분석
  analytics: {
    chart: ChartBarIcon,
    pie: ChartPieIcon,
    trending: TrendingUpIcon,
    revenue: CurrencyDollarIcon,
  },
  
  // UI 요소
  ui: {
    menu: Bars3Icon,
    close: XMarkIcon,
    chevronRight: ChevronRightIcon,
    chevronDown: ChevronDownIcon,
    bell: BellIcon,
    calendar: CalendarIcon,
    folder: FolderIcon,
    document: DocumentIcon,
    wrench: WrenchScrewdriverIcon,
  }
};

// Solid 버전 (활성 상태, 버튼용)
export const adminIconsSolid = {
  navigation: {
    dashboard: HomeIconSolid,
    estimates: CalculatorIconSolid,
    projects: BuildingOfficeIconSolid,
    haccp: HaccpIconSolid,
    users: UsersIconSolid,
    analytics: ChartBarIconSolid,
    settings: Cog6ToothIconSolid,
  },
  
  actions: {
    add: PlusIconSolid,
    edit: PencilIconSolid,
    delete: TrashIconSolid,
    view: EyeIconSolid,
    download: ArrowDownTrayIcon,
    search: MagnifyingGlassIcon,
    filter: FunnelIcon,
    save: DocumentCheckIconSolid,
  },
  
  status: {
    success: CheckCircleIconSolid,
    completed: CheckCircleIconSolid,
  }
};

// 아이콘 스타일 상수
export const iconStyles = {
  // 크기
  size: {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4', 
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8',
  },
  
  // 색상 (Tailwind 클래스)
  colors: {
    primary: 'text-indigo-600',
    secondary: 'text-gray-600',
    success: 'text-green-600',
    warning: 'text-yellow-600',
    error: 'text-red-600',
    muted: 'text-gray-400',
    white: 'text-white',
  },
  
  // 배경 색상
  backgrounds: {
    primary: 'bg-indigo-50',
    success: 'bg-green-50',
    warning: 'bg-yellow-50',
    error: 'bg-red-50',
    muted: 'bg-gray-50',
  }
};

// 자주 사용되는 아이콘 조합
export const commonIconSets = {
  // 사이드바 메뉴
  sidebar: [
    { name: '대시보드', icon: HomeIcon, href: '/admin' },
    { name: '견적 관리', icon: CalculatorIcon, href: '/admin/estimates' },
    { name: '프로젝트 관리', icon: BuildingOfficeIcon, href: '/admin/projects' },
    { name: 'HACCP 관리', icon: HaccpIcon, href: '/admin/haccp' },
    { name: '사용자 관리', icon: UsersIcon, href: '/admin/users' },
    { name: '통계 분석', icon: ChartBarIcon, href: '/admin/analytics' },
    { name: '시스템 설정', icon: Cog6ToothIcon, href: '/admin/settings' },
  ],
  
  // 테이블 액션
  tableActions: [
    { name: '보기', icon: EyeIcon, color: 'text-blue-600' },
    { name: '편집', icon: PencilIcon, color: 'text-gray-600' },
    { name: '삭제', icon: TrashIcon, color: 'text-red-600' },
  ],
  
  // 상태 배지
  statusBadges: {
    completed: { icon: CheckCircleIcon, color: 'bg-green-100 text-green-800' },
    inProgress: { icon: ClockIcon, color: 'bg-blue-100 text-blue-800' },
    pending: { icon: ClockIcon, color: 'bg-yellow-100 text-yellow-800' },
    draft: { icon: PencilIcon, color: 'bg-gray-100 text-gray-800' },
    error: { icon: XCircleIcon, color: 'bg-red-100 text-red-800' },
  }
};
