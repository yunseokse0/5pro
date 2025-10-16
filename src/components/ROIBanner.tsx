'use client';

import Link from 'next/link';
import { TrendingUp, Calculator, ArrowRight } from 'lucide-react';

export default function ROIBanner() {
  return (
    <section className="px-6 md:px-12 py-16 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-700">
      <div className="max-w-6xl mx-auto">
        <div className="text-center text-white">
          <div className="inline-block px-4 py-2 bg-white/20 dark:bg-white/30 backdrop-blur-sm rounded-full text-sm font-semibold mb-6">
            💰 투자 회수 시뮬레이터
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            공사비·운영비 절감을 반영한<br />
            <span className="text-yellow-300 dark:text-yellow-200">투자 회수 기간 예측</span>
          </h2>
          <p className="text-xl text-indigo-100 dark:text-indigo-200 mb-8 max-w-3xl mx-auto">
            200+ 완공 사례의 실제 데이터를 바탕으로 정확한 투자 회수 기간을 계산합니다.<br />
            AI 견적과 HACCP 검증 데이터를 연동하여 신뢰할 수 있는 결과를 제공합니다.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/estimate"
              className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-xl hover:bg-gray-100 transition-all transform hover:-translate-y-1 shadow-lg flex items-center"
            >
              <Calculator className="w-5 h-5 mr-2" />
              나의 공장 투자 회수 기간 확인하기
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            
            <div className="flex items-center space-x-6 text-indigo-100 dark:text-indigo-200">
              <div className="flex items-center">
                <TrendingUp className="w-4 h-4 mr-2" />
                <span className="text-sm">실제 프로젝트 데이터 기반</span>
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-yellow-300 dark:bg-yellow-200 rounded-full mr-2"></span>
                <span className="text-sm">20년 경력 전문가 검증</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
