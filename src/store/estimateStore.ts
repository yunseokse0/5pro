import { create } from 'zustand';

export interface EstimateInput {
  region: string;
  size: number;
  factoryType: string;
  facilities: string[];
}

export interface EstimateResult {
  totalCost: number;
  breakdown: {
    construction: number;
    equipment: number;
    labor: number;
    misc: number;
  };
  savings: number;
  savingsPercentage: number;
}

interface EstimateStore {
  // Input state
  input: EstimateInput;
  setInput: (input: Partial<EstimateInput>) => void;
  
  // Result state
  result: EstimateResult | null;
  setResult: (result: EstimateResult) => void;
  
  // UI state
  currentStep: number;
  setCurrentStep: (step: number) => void;
  
  // Actions
  calculateEstimate: () => void;
  reset: () => void;
}

// 지역별 비용 지수
const REGION_INDEX: Record<string, number> = {
  '서울특별시': 1.2,
  '경기도': 1.1,
  '인천광역시': 1.05,
  '부산광역시': 0.95,
  '대구광역시': 0.9,
  '광주광역시': 0.88,
  '대전광역시': 0.92,
  '울산광역시': 0.93,
  '세종특별자치시': 0.95,
};

// 공장 타입별 기본 비용 (평당)
const FACTORY_TYPE_COST: Record<string, number> = {
  '김치공장': 2500000,
  '제빵공장': 3000000,
  '냉동식품': 3500000,
  '유제품': 3200000,
  '육류가공': 3800000,
  '음료제조': 3300000,
  '수산가공': 3400000,
  '건강기능식품': 4000000,
};

// 시설별 추가 비용
const FACILITY_COST: Record<string, number> = {
  '냉장시설': 50000000,
  '냉동시설': 80000000,
  'CCTV': 10000000,
  '공조시설': 40000000,
  '정수시설': 30000000,
};

export const useEstimateStore = create<EstimateStore>((set, get) => ({
  input: {
    region: '',
    size: 50,
    factoryType: '',
    facilities: [],
  },
  
  result: null,
  currentStep: 1,
  
  setInput: (newInput) =>
    set((state) => ({
      input: { ...state.input, ...newInput },
    })),
  
  setResult: (result) => set({ result }),
  
  setCurrentStep: (step) => set({ currentStep: step }),
  
  calculateEstimate: () => {
    const { input } = get();
    
    // 기본 건설 비용 계산
    const regionIndex = REGION_INDEX[input.region] || 1.0;
    const baseCostPerPyeong = FACTORY_TYPE_COST[input.factoryType] || 3000000;
    const constructionCost = input.size * baseCostPerPyeong * regionIndex;
    
    // 설비 비용 계산
    const equipmentCost = input.facilities.reduce((sum, facility) => {
      return sum + (FACILITY_COST[facility] || 0);
    }, 0);
    
    // 인건비 (건설비의 15%)
    const laborCost = constructionCost * 0.15;
    
    // 기타 비용 (건설비의 10%)
    const miscCost = constructionCost * 0.1;
    
    // 총 비용
    const totalCost = constructionCost + equipmentCost + laborCost + miscCost;
    
    // 기존 방식 대비 절감 (30%)
    const traditionalCost = totalCost / 0.7;
    const savings = traditionalCost - totalCost;
    const savingsPercentage = 30;
    
    const result: EstimateResult = {
      totalCost,
      breakdown: {
        construction: constructionCost,
        equipment: equipmentCost,
        labor: laborCost,
        misc: miscCost,
      },
      savings,
      savingsPercentage,
    };
    
    set({ result });
  },
  
  reset: () =>
    set({
      input: {
        region: '',
        size: 50,
        factoryType: '',
        facilities: [],
      },
      result: null,
      currentStep: 1,
    }),
}));

