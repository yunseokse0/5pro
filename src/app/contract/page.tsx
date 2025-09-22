'use client'

import React, { useState } from 'react'
import { FileText, CheckCircle, AlertCircle, Download, Eye, Shield, Clock, Award, Factory } from 'lucide-react'

export default function ContractPage() {
  const [agreed, setAgreed] = useState(false)
  const [signed, setSigned] = useState(false)
  const [loading, setLoading] = useState(false)
  const [contractId, setContractId] = useState<string | null>(null)

  const handleAgreementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgreed(e.target.checked)
  }

  const handleSignatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSigned(e.target.checked)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreed || !signed) return

    setLoading(true)
    try {
      const response = await fetch('http://localhost:3001/api/contract', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ signed: true }),
      })
      
      const data = await response.json()
      if (data.success) {
        setContractId(data.contractId)
      }
    } catch (error) {
      console.error('계약 체결 실패:', error)
    } finally {
      setLoading(false)
    }
  }

  const contractTerms = [
    {
      title: "제1조 (계약의 목적)",
      content: "갑은 을에게 식품공장 건설을 의뢰하고, 을은 HACCP 기준에 맞는 식품안전 공장을 건설하기로 한다."
    },
    {
      title: "제2조 (공사 범위)",
      content: "공사 범위는 HACCP 인증 기준에 맞는 설계도서에 명시된 바에 따른다. 공사 기간은 착공일로부터 6개월이며, HACCP 인증까지 포함하여 8개월로 한다."
    },
    {
      title: "제3조 (계약 금액)",
      content: "계약 금액은 견적서에 명시된 금액으로 하며, 계약금은 계약 체결 시 30%, 기초공사 완료 시 30%, 골조공사 완료 시 20%, 준공 시 20%를 지급한다."
    },
    {
      title: "제4조 (품질 보증 및 HACCP 인증)",
      content: "공사 완료 후 2년간 품질보증을 제공하며, HACCP 인증 완료까지 책임진다. 식품안전관리인증기준(HACCP) 미준수 시 재시공에 따른 모든 비용을 부담한다."
    },
    {
      title: "제5조 (위생시설 및 설비)",
      content: "식품공장 특화 위생시설(냉장/냉동시설, 배수처리시설, 공기조화시설) 설치를 포함하며, 모든 설비는 식품안전기준에 적합해야 한다."
    },
    {
      title: "제6조 (인허가 및 행정지원)",
      content: "식품제조업 신고, 위생업소 신고, 소방인허가 등 관련 인허가 취득을 지원하며, HACCP 인증 신청 및 심사 대응을 포함한다."
    },
    {
      title: "제7조 (손해배상)",
      content: "계약 위반 시 발생하는 손해에 대하여는 상대방에게 배상할 책임을 진다. 식품안전사고 발생 시 모든 법적 책임을 부담한다."
    }
  ]

  const projectDetails = {
    projectName: "서울 강남구 제과제빵 공장 신축",
    contractAmount: "15억원",
    constructionPeriod: "6개월",
    haccpPeriod: "8개월",
    facilities: ["냉장시설", "냉동시설", "HACCP 인증시설", "배수처리시설", "소방시설"],
    location: "서울특별시 강남구 테헤란로 123"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            식품공장 건설 계약 관리
          </h1>
          <p className="text-lg text-gray-600">
            HACCP 기준 식품공장 건설을 위한 전문 계약서 검토 및 체결
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {contractId ? (
            /* 계약 완료 상태 */
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-green-600 mb-4">
                계약이 성공적으로 체결되었습니다!
              </h2>
              <div className="bg-green-50 rounded-xl p-6 mb-8 max-w-md mx-auto">
                <p className="text-green-800 font-semibold text-lg">계약서 번호: {contractId}</p>
                <p className="text-green-700 text-sm mt-2">
                  계약서가 이메일로 발송되었으며, HACCP 인증 절차가 시작됩니다.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                  <Download className="w-5 h-5 mr-2" />
                  계약서 다운로드
                </button>
                <button className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-xl font-semibold hover:bg-gray-700 transition-colors">
                  <Eye className="w-5 h-5 mr-2" />
                  계약서 보기
                </button>
              </div>
            </div>
          ) : (
            /* 계약서 내용 및 서명 */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* 프로젝트 정보 */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                    <Factory className="w-6 h-6 mr-2 text-blue-600" />
                    프로젝트 정보
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">프로젝트명</label>
                      <p className="text-gray-900 font-semibold">{projectDetails.projectName}</p>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-gray-600">계약 금액</label>
                      <p className="text-2xl font-bold text-blue-600">{projectDetails.contractAmount}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">건설 기간</label>
                        <p className="text-gray-900 font-semibold">{projectDetails.constructionPeriod}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">HACCP 기간</label>
                        <p className="text-gray-900 font-semibold">{projectDetails.haccpPeriod}</p>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-gray-600">건설 위치</label>
                      <p className="text-gray-900">{projectDetails.location}</p>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-gray-600">포함 시설</label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {projectDetails.facilities.map((facility, index) => (
                          <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                            {facility}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 계약서 내용 */}
              <div className="lg:col-span-2 space-y-6">
                {/* 계약서 미리보기 */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                      <Shield className="w-8 h-8 mr-3 text-green-600" />
                      식품공장 건설 계약서
                    </h2>
                    <button className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                      <Download className="w-4 h-4 mr-2" />
                      PDF 다운로드
                    </button>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600"><strong>갑(발주자):</strong> [회사명]</p>
                        <p className="text-gray-600"><strong>을(수주자):</strong> 오프로 (식품공장 설립 플랫폼)</p>
                      </div>
                      <div>
                        <p className="text-gray-600"><strong>계약일:</strong> {new Date().toLocaleDateString('ko-KR')}</p>
                        <p className="text-gray-600"><strong>공사기간:</strong> {projectDetails.constructionPeriod}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {contractTerms.map((term, index) => (
                      <div key={index} className="border-l-4 border-blue-200 pl-6 py-4">
                        <h3 className="font-semibold text-gray-900 mb-3 text-lg">{term.title}</h3>
                        <p className="text-gray-700 leading-relaxed">{term.content}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 서명 섹션 */}
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <Award className="w-8 h-8 mr-3 text-purple-600" />
                    전자서명 및 계약 체결
                  </h2>
                  
                  <div className="space-y-6">
                    {/* 동의 체크박스 */}
                    <div className="space-y-4">
                      <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-xl">
                        <input
                          type="checkbox"
                          id="agreement"
                          checked={agreed}
                          onChange={handleAgreementChange}
                          className="w-6 h-6 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
                        />
                        <label htmlFor="agreement" className="text-gray-700">
                          <span className="font-semibold text-lg">계약서 내용을 충분히 검토하였으며,</span> 
                          <br />
                          <span className="text-sm">위 계약 조건에 동의합니다. 특히 HACCP 인증 기준 준수를 확인했습니다.</span>
                        </label>
                      </div>

                      <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-xl">
                        <input
                          type="checkbox"
                          id="signature"
                          checked={signed}
                          onChange={handleSignatureChange}
                          className="w-6 h-6 text-green-600 border-gray-300 rounded focus:ring-green-500 mt-1"
                        />
                        <label htmlFor="signature" className="text-gray-700">
                          <span className="font-semibold text-lg">전자서명을 통해 계약을 체결합니다.</span>
                          <br />
                          <span className="text-sm">전자서명은 서면서명과 동일한 법적 효력을 가집니다.</span>
                        </label>
                      </div>
                    </div>

                    {/* 서명 영역 */}
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-gray-50">
                      <div className="text-4xl mb-4">✍️</div>
                      <div className="text-lg font-semibold text-gray-700 mb-2">
                        전자서명 영역
                      </div>
                      <div className="text-sm text-gray-500">
                        실제 서비스에서는 디지털 서명이 여기에 표시됩니다
                      </div>
                    </div>

                    {/* 경고 메시지 */}
                    {!agreed || !signed ? (
                      <div className="flex items-center gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                        <AlertCircle className="text-yellow-600 flex-shrink-0" size={24} />
                        <span className="text-yellow-800">
                          계약 체결을 위해 위의 모든 항목에 동의해주세요.
                        </span>
                      </div>
                    ) : null}

                    {/* 제출 버튼 */}
                    <button
                      type="submit"
                      disabled={loading || !agreed || !signed}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <div className="flex items-center justify-center">
                          <Clock className="w-5 h-5 mr-2 animate-spin" />
                          계약 체결 중...
                        </div>
                      ) : (
                        '식품공장 건설 계약 체결하기'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
