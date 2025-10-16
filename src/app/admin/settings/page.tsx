'use client'

import React, { useState, useEffect } from 'react'
import ThemeToggle from '@/components/ThemeToggle'
import { 
  Settings, 
  Save, 
  RefreshCw, 
  Database, 
  Shield, 
  Bell,
  Mail,
  Globe,
  Key,
  Users,
  AlertTriangle,
  CheckCircle,
  Info
} from 'lucide-react'

export default function SystemSettings() {
  const [settings, setSettings] = useState({
    // 일반 설정
    siteName: '오프로',
    siteDescription: '식품공장 설립 플랫폼',
    defaultLanguage: 'ko',
    timezone: 'Asia/Seoul',
    
    // 비용 설정
    baseConstructionCost: 1500000,
    facilityCostMultiplier: 1.0,
    haccpBaseCost: 5000000,
    permitBaseCost: 2000000,
    contingencyRate: 0.1,
    
    // 지역별 비용 설정
    regionalCosts: {
      '서울특별시': { multiplier: 1.3, description: '수도권 최고가 지역' },
      '경기도': { multiplier: 1.1, description: '수도권 외곽 지역' },
      '인천광역시': { multiplier: 1.2, description: '수도권 항만 지역' },
      '부산광역시': { multiplier: 1.15, description: '남부권 중심지' },
      '대구광역시': { multiplier: 1.05, description: '영남권 중심지' },
      '광주광역시': { multiplier: 1.0, description: '호남권 중심지' },
      '대전광역시': { multiplier: 1.0, description: '충청권 중심지' },
      '울산광역시': { multiplier: 1.1, description: '산업도시' },
      '세종특별자치시': { multiplier: 1.1, description: '신도시' },
      '강원도': { multiplier: 0.9, description: '산간 지역' },
      '충청북도': { multiplier: 0.95, description: '내륙 지역' },
      '충청남도': { multiplier: 0.95, description: '서해안 지역' },
      '전라북도': { multiplier: 0.9, description: '서해안 지역' },
      '전라남도': { multiplier: 0.9, description: '남해안 지역' },
      '경상북도': { multiplier: 0.95, description: '내륙 지역' },
      '경상남도': { multiplier: 0.95, description: '남해안 지역' },
      '제주특별자치도': { multiplier: 1.2, description: '도서 지역' }
    },
    
    // HACCP 설정
    haccpRequirements: [
      'HACCP 계획서 작성',
      '위해요소 분석',
      '중요관리점 설정',
      '모니터링 절차 수립',
      '시정조치 절차 수립',
      '검증 절차 수립',
      '기록유지 절차 수립'
    ],
    
    // 알림 설정
    emailNotifications: true,
    projectUpdates: true,
    haccpDeadlines: true,
    budgetAlerts: true,
    
    // 보안 설정
    sessionTimeout: 30,
    passwordPolicy: 'strong',
    twoFactorAuth: false,
    
    // 백업 설정
    autoBackup: true,
    backupFrequency: 'daily',
    backupRetention: 30
  })

  const [isLoading, setIsLoading] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = () => {
    // 실제로는 API에서 설정을 불러옴
    const savedSettings = localStorage.getItem('offro_settings')
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
  }

  const saveSettings = async () => {
    setIsLoading(true)
    setSaveStatus('saving')
    
    try {
      // 실제로는 API에 설정을 저장
      localStorage.setItem('offro_settings', JSON.stringify(settings))
      
      // 시뮬레이션을 위한 지연
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setSaveStatus('saved')
      setTimeout(() => setSaveStatus('idle'), 2000)
    } catch (error) {
      setSaveStatus('error')
      setTimeout(() => setSaveStatus('idle'), 2000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleArraySettingChange = (key: string, index: number, value: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: (prev[key as keyof typeof prev] as string[]).map((item: string, i: number) => i === index ? value : item)
    }))
  }

  const addArrayItem = (key: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: [...(prev[key as keyof typeof prev] as string[]), '']
    }))
  }

  const removeArrayItem = (key: string, index: number) => {
    setSettings(prev => ({
      ...prev,
      [key]: (prev[key as keyof typeof prev] as string[]).filter((_: any, i: number) => i !== index)
    }))
  }

  const handleRegionalCostChange = (region: string, field: 'multiplier' | 'description', value: string | number) => {
    setSettings(prev => ({
      ...prev,
      regionalCosts: {
        ...prev.regionalCosts,
        [region]: {
          ...(prev.regionalCosts as any)[region],
          [field]: value
        }
      }
    }))
  }

  const resetSettings = () => {
    if (confirm('모든 설정을 기본값으로 초기화하시겠습니까?')) {
      loadSettings()
    }
  }

  const exportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `offro_settings_${new Date().toISOString().split('T')[0]}.json`
    link.click()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">시스템 설정</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            플랫폼의 전반적인 설정을 관리하세요
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <ThemeToggle variant="button" />
          <div className="flex space-x-3">
            <button
              onClick={exportSettings}
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <Database className="h-4 w-4 mr-2" />
              설정 내보내기
            </button>
            <button
              onClick={resetSettings}
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              초기화
            </button>
            <button
              onClick={saveSettings}
              disabled={isLoading}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              {saveStatus === 'saving' ? '저장 중...' : 
               saveStatus === 'saved' ? '저장됨' : 
               saveStatus === 'error' ? '오류' : '저장'}
            </button>
          </div>
        </div>
      </div>

      {/* Save Status */}
      {saveStatus === 'saved' && (
        <div className="bg-green-50 border border-green-200 rounded-md p-4">
          <div className="flex">
            <CheckCircle className="h-5 w-5 text-green-400" />
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">설정이 성공적으로 저장되었습니다.</p>
            </div>
          </div>
        </div>
      )}

      {saveStatus === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            <div className="ml-3">
              <p className="text-sm font-medium text-red-800">설정 저장 중 오류가 발생했습니다.</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* 테마 설정 */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4 flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              테마 설정
            </h3>
            <ThemeToggle variant="dropdown" />
          </div>
        </div>

        {/* 일반 설정 */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4 flex items-center">
              <Globe className="h-5 w-5 mr-2" />
              일반 설정
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">사이트명</label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) => handleSettingChange('siteName', e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">사이트 설명</label>
                <textarea
                  value={settings.siteDescription}
                  onChange={(e) => handleSettingChange('siteDescription', e.target.value)}
                  rows={3}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">기본 언어</label>
                <select
                  value={settings.defaultLanguage}
                  onChange={(e) => handleSettingChange('defaultLanguage', e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="ko">한국어</option>
                  <option value="en">English</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">시간대</label>
                <select
                  value={settings.timezone}
                  onChange={(e) => handleSettingChange('timezone', e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="Asia/Seoul">Asia/Seoul</option>
                  <option value="UTC">UTC</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* 비용 설정 */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4 flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              비용 설정
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">기본 건설비 (평당)</label>
                <input
                  type="number"
                  value={settings.baseConstructionCost}
                  onChange={(e) => handleSettingChange('baseConstructionCost', parseInt(e.target.value))}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">시설비 배수</label>
                <input
                  type="number"
                  step="0.1"
                  value={settings.facilityCostMultiplier}
                  onChange={(e) => handleSettingChange('facilityCostMultiplier', parseFloat(e.target.value))}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">HACCP 기본비용</label>
                <input
                  type="number"
                  value={settings.haccpBaseCost}
                  onChange={(e) => handleSettingChange('haccpBaseCost', parseInt(e.target.value))}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">인허가 기본비용</label>
                <input
                  type="number"
                  value={settings.permitBaseCost}
                  onChange={(e) => handleSettingChange('permitBaseCost', parseInt(e.target.value))}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">예비비 비율 (%)</label>
                <input
                  type="number"
                  step="0.01"
                  value={settings.contingencyRate * 100}
                  onChange={(e) => handleSettingChange('contingencyRate', parseFloat(e.target.value) / 100)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 지역별 비용 설정 */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4 flex items-center">
              <Globe className="h-5 w-5 mr-2" />
              지역별 비용 배수 설정
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
              각 지역별 건설비 배수를 설정하여 정확한 견적을 제공합니다.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(settings.regionalCosts).map(([region, data]) => (
                <div key={region} className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900 dark:text-white">{region}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      data.multiplier >= 1.2 ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200' :
                      data.multiplier >= 1.1 ? 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200' :
                      data.multiplier >= 1.0 ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                      'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                    }`}>
                      {data.multiplier}x
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">비용 배수</label>
                      <input
                        type="number"
                        step="0.05"
                        value={data.multiplier}
                        onChange={(e) => handleRegionalCostChange(region, 'multiplier', parseFloat(e.target.value))}
                        className="w-full text-sm border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">설명</label>
                      <input
                        type="text"
                        value={data.description}
                        onChange={(e) => handleRegionalCostChange(region, 'description', e.target.value)}
                        className="w-full text-sm border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      예상 비용: {Math.round(settings.baseConstructionCost * data.multiplier).toLocaleString()}원/평
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* HACCP 설정 */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4 flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              HACCP 요구사항
            </h3>
            <div className="space-y-3">
              {settings.haccpRequirements.map((requirement, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={requirement}
                    onChange={(e) => handleArraySettingChange('haccpRequirements', index, e.target.value)}
                    className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  <button
                    onClick={() => removeArrayItem('haccpRequirements', index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                onClick={() => addArrayItem('haccpRequirements')}
                className="w-full inline-flex justify-center items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                + 요구사항 추가
              </button>
            </div>
          </div>
        </div>

        {/* 알림 설정 */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4 flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              알림 설정
            </h3>
            <div className="space-y-4">
              {[
                { key: 'emailNotifications', label: '이메일 알림', description: '중요한 업데이트를 이메일로 받습니다' },
                { key: 'projectUpdates', label: '프로젝트 업데이트', description: '프로젝트 진행 상황 업데이트를 받습니다' },
                { key: 'haccpDeadlines', label: 'HACCP 마감일', description: 'HACCP 관련 마감일 알림을 받습니다' },
                { key: 'budgetAlerts', label: '예산 알림', description: '예산 초과 시 알림을 받습니다' }
              ].map(({ key, label, description }) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{label}</div>
                    <div className="text-sm text-gray-500">{description}</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings[key as keyof typeof settings] as boolean}
                    onChange={(e) => handleSettingChange(key, e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 보안 설정 */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4 flex items-center">
              <Key className="h-5 w-5 mr-2" />
              보안 설정
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">세션 타임아웃 (분)</label>
                <input
                  type="number"
                  value={settings.sessionTimeout}
                  onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">비밀번호 정책</label>
                <select
                  value={settings.passwordPolicy}
                  onChange={(e) => handleSettingChange('passwordPolicy', e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="weak">약함</option>
                  <option value="medium">보통</option>
                  <option value="strong">강함</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-900">2단계 인증</div>
                  <div className="text-sm text-gray-500">추가 보안을 위해 2단계 인증을 활성화합니다</div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.twoFactorAuth}
                  onChange={(e) => handleSettingChange('twoFactorAuth', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 백업 설정 */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4 flex items-center">
              <Database className="h-5 w-5 mr-2" />
              백업 설정
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-900">자동 백업</div>
                  <div className="text-sm text-gray-500">정기적으로 데이터를 자동 백업합니다</div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.autoBackup}
                  onChange={(e) => handleSettingChange('autoBackup', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">백업 빈도</label>
                <select
                  value={settings.backupFrequency}
                  onChange={(e) => handleSettingChange('backupFrequency', e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="daily">매일</option>
                  <option value="weekly">매주</option>
                  <option value="monthly">매월</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">백업 보관 기간 (일)</label>
                <input
                  type="number"
                  value={settings.backupRetention}
                  onChange={(e) => handleSettingChange('backupRetention', parseInt(e.target.value))}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <div className="flex">
          <Info className="h-5 w-5 text-blue-400" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">설정 저장 안내</h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>설정을 변경한 후 반드시 저장 버튼을 클릭하여 변경사항을 적용하세요. 일부 설정은 시스템 재시작 후에 적용될 수 있습니다.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
