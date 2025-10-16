"use client";

import React, { useMemo, useState } from "react";

// Recharts가 설치된 경우에만 그래프를 안전하게 렌더링
let Recharts: any = {};
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  Recharts = require("recharts");
} catch (_) {
  Recharts = null;
}

type Num = number | "";

function toNumber(n: Num) {
  const v = typeof n === "string" ? n.replaceAll(",", "") : n;
  const f = Number(v);
  return isFinite(f) ? f : 0;
}

function fmtKRW(n: number) {
  return n.toLocaleString("ko-KR");
}

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

/**
 * ROI 계산 로직
 * - 입력:
 *   capex: 총 공사 예정 금액
 *   haccpInit: HACCP 초기 인증 비용
 *   monthlyRevenue: 월평균 예상 매출
 *   monthlyOpCost: 월평균 기존 운영비
 *   capexSaveRate: 공사비 절감률 (오프로 적용)
 *   opSaveRate: 운영비 절감률 (오프로 적용)
 *   revenueLiftRate: 매출 향상률 (선택, 보수적으로 0~5%)
 *
 * - 산출:
 *   • 공사비 절감액/적용 후 CAPEX
 *   • 기존/적용 후 월 이익
 *   • 월 이익 증가분
 *   • 투자 회수 기간(개월)
 *   • 12개월 ROI(%)
 */
function computeROI(params: {
  capex: number;
  haccpInit: number;
  monthlyRevenue: number;
  monthlyOpCost: number;
  capexSaveRate: number; // 0.2 = 20%
  opSaveRate: number;     // 0.15 = 15%
  revenueLiftRate: number;// 0.00~0.05 추천
}) {
  const {
    capex,
    haccpInit,
    monthlyRevenue,
    monthlyOpCost,
    capexSaveRate,
    opSaveRate,
    revenueLiftRate,
  } = params;

  // 공사비 절감
  const capexSavings = capex * capexSaveRate;                  // 절감액
  const capexAfter = capex - capexSavings;                     // 절감 반영 CAPEX
  const initialInvestment = capexAfter + haccpInit;            // 초기 총 투자

  // 운영비/매출 보정
  const monthlyOpAfter = monthlyOpCost * (1 - opSaveRate);
  const monthlyRevenueAfter = monthlyRevenue * (1 + revenueLiftRate);

  // 월 이익 (Before/After)
  const monthlyProfitBefore = monthlyRevenue - monthlyOpCost;
  const monthlyProfitAfter = monthlyRevenueAfter - monthlyOpAfter;
  const monthlyProfitDelta = monthlyProfitAfter - monthlyProfitBefore;

  // 회수기간(개월): 증가분으로 초기 투자 회수
  const paybackMonths =
    monthlyProfitDelta > 0
      ? Math.ceil(initialInvestment / monthlyProfitDelta)
      : Infinity;

  // 12개월 ROI: (12개월 수익 - 초기투자) / 초기투자
  const twelveMonthProfit = monthlyProfitAfter * 12;
  const roi12m =
    initialInvestment > 0
      ? ((twelveMonthProfit - initialInvestment) / initialInvestment) * 100
      : 0;

  return {
    capexSavings,
    capexAfter,
    initialInvestment,
    monthlyOpAfter,
    monthlyRevenueAfter,
    monthlyProfitBefore,
    monthlyProfitAfter,
    monthlyProfitDelta,
    paybackMonths,
    roi12m,
  };
}

export default function ROICalculator() {
  // 입력값 상태
  const [capex, setCapex] = useState<Num>("");
  const [haccpInit, setHaccpInit] = useState<Num>("");
  const [monthlyRevenue, setMonthlyRevenue] = useState<Num>("");
  const [monthlyOpCost, setMonthlyOpCost] = useState<Num>("");

  // 오프로 효과(조정 가능)
  const [capexSaveRate, setCapexSaveRate] = useState(0.2);   // 20% (보수적: 0.2~0.3)
  const [opSaveRate, setOpSaveRate] = useState(0.15);        // 15% (보수적: 0.15~0.25)
  const [revenueLiftRate, setRevenueLiftRate] = useState(0); // 0~0.05 추천

  const ready =
    toNumber(capex) > 0 &&
    toNumber(monthlyRevenue) > 0 &&
    toNumber(monthlyOpCost) > 0;

  const result = useMemo(
    () =>
      computeROI({
        capex: toNumber(capex),
        haccpInit: toNumber(haccpInit),
        monthlyRevenue: toNumber(monthlyRevenue),
        monthlyOpCost: toNumber(monthlyOpCost),
        capexSaveRate: clamp(capexSaveRate, 0, 0.5),
        opSaveRate: clamp(opSaveRate, 0, 0.6),
        revenueLiftRate: clamp(revenueLiftRate, 0, 0.5),
      }),
    [capex, haccpInit, monthlyRevenue, monthlyOpCost, capexSaveRate, opSaveRate, revenueLiftRate]
  );

  const {
    capexSavings,
    capexAfter,
    initialInvestment,
    monthlyProfitBefore,
    monthlyProfitAfter,
    monthlyProfitDelta,
    paybackMonths,
    roi12m,
  } = result;

  const Chart =
    Recharts && Recharts.BarChart
      ? () => (
          <div className="mt-6">
            <Recharts.ResponsiveContainer width="100%" height={220}>
              <Recharts.BarChart
                data={[
                  { name: "적용 전", profit: Math.max(0, monthlyProfitBefore) },
                  { name: "적용 후", profit: Math.max(0, monthlyProfitAfter) },
                ]}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <Recharts.CartesianGrid strokeDasharray="3 3" />
                <Recharts.XAxis dataKey="name" />
                <Recharts.YAxis />
                <Recharts.Tooltip />
                <Recharts.Bar dataKey="profit" barSize={48} />
              </Recharts.BarChart>
            </Recharts.ResponsiveContainer>
          </div>
        )
      : () => null;

  return (
    <section className="px-6 md:px-12 py-16 bg-gradient-to-br from-indigo-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        {/* 헤더 섹션 */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold mb-6">
            💰 ROI 투자 회수 시뮬레이터
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            언제 수익 전환이 가능할까?<br />
            <span className="text-indigo-600">오프로로 투자 회수 속도를 확인하세요</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            AI 견적 + HACCP 컨설팅 + 스마트 관리 시스템으로 공사비 20% 절감, 운영비 15% 절감을 동시에 실현하여 투자 회수 기간을 단축합니다
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* 입력 패널 */}
          <div className="p-8 rounded-2xl border bg-white shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-2">ROI 계산기</h3>
            <p className="text-gray-600 mb-6">
              오프로의 <b>AI 견적·HACCP 컨설팅·스마트 운영</b> 효과를 반영하여 투자 회수 속도를 추정합니다.
            </p>

            {/* 기본 입력 */}
            <div className="grid md:grid-cols-2 gap-4">
              <FieldMoney
                label="총 공사 예정 금액 (CAPEX)"
                value={capex}
                onChange={setCapex}
                placeholder="예: 1,000,000,000"
              />
              <FieldMoney
                label="HACCP 초기 인증 비용"
                value={haccpInit}
                onChange={setHaccpInit}
                placeholder="예: 20,000,000"
              />
              <FieldMoney
                label="월평균 예상 매출"
                value={monthlyRevenue}
                onChange={setMonthlyRevenue}
                placeholder="예: 150,000,000"
              />
              <FieldMoney
                label="월평균 기존 운영비(인건비·에너지·재고손실 등)"
                value={monthlyOpCost}
                onChange={setMonthlyOpCost}
                placeholder="예: 100,000,000"
              />
            </div>

            {/* 절감/향상 가정 */}
            <div className="mt-6 grid md:grid-cols-3 gap-4">
              <FieldRate
                label="공사비 절감률"
                value={capexSaveRate}
                onChange={setCapexSaveRate}
                min={0}
                max={0.3}
                step={0.01}
                hint="(권장 0.20~0.30)"
              />
              <FieldRate
                label="운영비 절감률"
                value={opSaveRate}
                onChange={setOpSaveRate}
                min={0}
                max={0.25}
                step={0.01}
                hint="(권장 0.15~0.25)"
              />
              <FieldRate
                label="매출 향상률"
                value={revenueLiftRate}
                onChange={setRevenueLiftRate}
                min={0}
                max={0.05}
                step={0.005}
                hint="(선택 0~5%)"
              />
            </div>

            <div className="mt-6 text-sm text-gray-500">
              ※ 결과는 가정에 따른 예시입니다. 실제 성과는 사업장 환경·범위에 따라 달라질 수 있습니다.
            </div>
          </div>

          {/* 결과 패널 */}
          <div className="p-8 rounded-2xl border bg-white shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">결과 요약</h3>

            {!ready ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <p className="text-gray-500">
                  상단의 입력값을 채우면 투자 회수 기간과 ROI가 계산됩니다.
                </p>
              </div>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 gap-4">
                  <StatCard
                    title="공사비 절감액"
                    value={`${fmtKRW(Math.max(0, capexSavings))} 원`}
                    sub="(오프로 적용)"
                    color="text-green-600"
                  />
                  <StatCard
                    title="적용 후 초기 투자"
                    value={`${fmtKRW(Math.max(0, initialInvestment))} 원`}
                    sub="CAPEX 절감 + HACCP 초기비 합산"
                    color="text-blue-600"
                  />

                  <StatCard
                    title="월 이익(적용 전)"
                    value={`${fmtKRW(Math.max(0, monthlyProfitBefore))} 원`}
                    sub="월매출 - 기존 운영비"
                    color="text-gray-600"
                  />
                  <StatCard
                    title="월 이익(적용 후)"
                    value={`${fmtKRW(Math.max(0, monthlyProfitAfter))} 원`}
                    sub="(스마트 운영·절감 반영)"
                    color="text-indigo-600"
                  />

                  <StatCard
                    title="월 이익 증가분"
                    value={`${fmtKRW(Math.max(0, monthlyProfitDelta))} 원`}
                    sub="적용 후 - 적용 전"
                    color="text-green-600"
                  />
                  <StatCard
                    title="투자 회수 기간"
                    value={
                      paybackMonths === Infinity
                        ? "산출 불가"
                        : `${paybackMonths} 개월`
                    }
                    sub="월 이익 증가분으로 초기 투자 회수"
                    color="paybackMonths === Infinity ? 'text-red-600' : 'text-orange-600'"
                  />

                  <StatCard
                    title="12개월 ROI"
                    value={`${isFinite(roi12m) ? roi12m.toFixed(1) : 0}%`}
                    sub="(12개월 기준)"
                    color="text-purple-600"
                  />
                </div>

                {/* 그래프 (선택) */}
                <Chart />

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="/contact"
                    className="px-6 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 font-semibold transition-colors"
                    aria-label="나의 공장 투자 회수 기간 계산 결과 상담"
                  >
                    나의 공장 투자 회수 기간 상담 연결
                  </a>
                  <a
                    href="/signup"
                    className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold transition-colors"
                    aria-label="결과 저장을 위해 회원가입"
                  >
                    결과 저장 & 회원가입
                  </a>
                </div>

                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800">
                    <strong>💡 오프로의 가치:</strong> "오프로를 통해 공사비와 운영비를 동시에 절감하면, 기존 대비 더 빠르게 투자금을 회수할 수 있습니다."
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function FieldMoney({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: Num;
  onChange: (v: Num) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <input
        inputMode="numeric"
        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          const raw = e.target.value.replace(/[^\d,]/g, "");
          onChange(raw as Num);
        }}
      />
    </label>
  );
}

function FieldRate({
  label,
  value,
  onChange,
  min,
  max,
  step,
  hint,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
  hint?: string;
}) {
  return (
    <label className="block">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm text-indigo-600 font-semibold">{(value * 100).toFixed(0)}%</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step ?? 0.01}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
        style={{
          background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((value - min) / (max - min)) * 100}%, #e5e7eb ${((value - min) / (max - min)) * 100}%, #e5e7eb 100%)`
        }}
      />
      {hint && <div className="text-xs text-gray-500 mt-1">{hint}</div>}
    </label>
  );
}

function StatCard({
  title,
  value,
  sub,
  color = "text-gray-900",
}: {
  title: string;
  value: string;
  sub?: string;
  color?: string;
}) {
  return (
    <div className="p-4 rounded-xl border border-gray-200 bg-gray-50">
      <div className="text-sm text-gray-500 mb-1">{title}</div>
      <div className={`text-xl font-bold ${color}`}>{value}</div>
      {sub && <div className="text-xs text-gray-500 mt-1">{sub}</div>}
    </div>
  );
}
