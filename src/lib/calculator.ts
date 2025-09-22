// 식품공장 건설 비용 계산 엔진

import { ProjectData } from './storage';

export interface CalculationResult {
  baseCost: number;
  facilityCost: number;
  haccpCost: number;
  permitCost: number;
  contingencyCost: number;
  totalCost: number;
  breakdown: Array<{
    category: string;
    amount: number;
    percentage: number;
  }>;
}

export interface CostFactors {
  region: {
    [key: string]: {
      landCost: number; // 평당 토지비
      constructionCost: number; // 평당 건설비
      laborCost: number; // 평당 인건비
    };
  };
  purpose: {
    [key: string]: {
      multiplier: number; // 용도별 비용 배수
      specialRequirements: string[];
    };
  };
  facilities: {
    [key: string]: {
      baseCost: number; // 기본 비용
      sizeMultiplier: number; // 규모별 배수
    };
  };
}

const costFactors: CostFactors = {
  region: {
    '서울특별시': { landCost: 20000000, constructionCost: 2000000, laborCost: 800000 },
    '부산광역시': { landCost: 12000000, constructionCost: 1800000, laborCost: 700000 },
    '대구광역시': { landCost: 10000000, constructionCost: 1700000, laborCost: 650000 },
    '인천광역시': { landCost: 15000000, constructionCost: 1900000, laborCost: 750000 },
    '광주광역시': { landCost: 8000000, constructionCost: 1600000, laborCost: 600000 },
    '대전광역시': { landCost: 9000000, constructionCost: 1650000, laborCost: 620000 },
    '울산광역시': { landCost: 11000000, constructionCost: 1750000, laborCost: 680000 },
    '세종특별자치시': { landCost: 13000000, constructionCost: 1850000, laborCost: 720000 },
    '경기도': { landCost: 14000000, constructionCost: 1950000, laborCost: 780000 },
    '강원도': { landCost: 6000000, constructionCost: 1500000, laborCost: 550000 },
    '충청북도': { landCost: 5000000, constructionCost: 1400000, laborCost: 500000 },
    '충청남도': { landCost: 5500000, constructionCost: 1450000, laborCost: 520000 },
    '전라북도': { landCost: 4500000, constructionCost: 1350000, laborCost: 480000 },
    '전라남도': { landCost: 4000000, constructionCost: 1300000, laborCost: 450000 },
    '경상북도': { landCost: 5000000, constructionCost: 1400000, laborCost: 500000 },
    '경상남도': { landCost: 5500000, constructionCost: 1450000, laborCost: 520000 },
    '제주특별자치도': { landCost: 7000000, constructionCost: 1550000, laborCost: 580000 }
  },
  purpose: {
    '제과/제빵': { multiplier: 1.2, specialRequirements: ['온도조절시설', '습도조절시설', '발효시설'] },
    '육류가공': { multiplier: 1.4, specialRequirements: ['냉장시설', '냉동시설', '위생처리시설'] },
    '수산물가공': { multiplier: 1.3, specialRequirements: ['냉장시설', '냉동시설', '해수처리시설'] },
    '농산물가공': { multiplier: 1.1, specialRequirements: ['세척시설', '건조시설', '저장시설'] },
    '유제품가공': { multiplier: 1.5, specialRequirements: ['냉장시설', '살균시설', '발효시설'] },
    '음료제조': { multiplier: 1.0, specialRequirements: ['정수시설', '살균시설', '충진시설'] },
    '기타식품가공': { multiplier: 1.1, specialRequirements: ['위생시설', '저장시설'] }
  },
  facilities: {
    '냉장시설': { baseCost: 5000000, sizeMultiplier: 0.8 },
    '냉동시설': { baseCost: 8000000, sizeMultiplier: 1.0 },
    'HACCP 인증시설': { baseCost: 15000000, sizeMultiplier: 1.2 },
    '배수처리시설': { baseCost: 3000000, sizeMultiplier: 0.6 },
    '소방시설': { baseCost: 2000000, sizeMultiplier: 0.4 },
    '전력시설': { baseCost: 4000000, sizeMultiplier: 0.7 },
    '공기조화시설': { baseCost: 6000000, sizeMultiplier: 0.9 },
    '환기시설': { baseCost: 2500000, sizeMultiplier: 0.5 }
  }
};

export class ProjectCalculator {
  // 기본 건설비 계산
  calculateConstructionCost(project: ProjectData): number {
    const region = project.location.province;
    const size = project.size;
    const purpose = project.purpose;

    if (!region || !size || !purpose) return 0;

    const regionFactors = costFactors.region[region];
    const purposeFactors = costFactors.purpose[purpose];

    if (!regionFactors || !purposeFactors) return 0;

    const baseConstructionCost = regionFactors.constructionCost * size;
    const laborCost = regionFactors.laborCost * size;
    const purposeMultiplier = purposeFactors.multiplier;

    return Math.round((baseConstructionCost + laborCost) * purposeMultiplier);
  }

  // 시설비 계산
  calculateFacilityCost(project: ProjectData): number {
    let totalCost = 0;
    const size = project.size;

    project.facilities.forEach(facility => {
      const facilityData = costFactors.facilities[facility];
      if (facilityData) {
        const facilityCost = facilityData.baseCost + (facilityData.sizeMultiplier * size * 100000);
        totalCost += facilityCost;
      }
    });

    return Math.round(totalCost);
  }

  // HACCP 인증비 계산
  calculateHACCPCost(project: ProjectData): number {
    const baseCost = 5000000; // 기본 HACCP 인증비
    const sizeMultiplier = Math.max(1, project.size / 100); // 100평 기준 배수
    const purposeMultiplier = costFactors.purpose[project.purpose]?.multiplier || 1;

    return Math.round(baseCost * sizeMultiplier * purposeMultiplier);
  }

  // 인허가비 계산
  calculatePermitCost(project: ProjectData): number {
    const baseCost = 2000000; // 기본 인허가비
    const sizeMultiplier = Math.max(1, project.size / 50); // 50평 기준 배수
    const regionMultiplier = project.location.province === '서울특별시' ? 1.5 : 1.0;

    return Math.round(baseCost * sizeMultiplier * regionMultiplier);
  }

  // 예비비 계산 (총 비용의 10%)
  calculateContingencyCost(totalCost: number): number {
    return Math.round(totalCost * 0.1);
  }

  // 전체 비용 계산
  calculateTotalCost(project: ProjectData): CalculationResult {
    const constructionCost = this.calculateConstructionCost(project);
    const facilityCost = this.calculateFacilityCost(project);
    const haccpCost = this.calculateHACCPCost(project);
    const permitCost = this.calculatePermitCost(project);
    
    const subtotal = constructionCost + facilityCost + haccpCost + permitCost;
    const contingencyCost = this.calculateContingencyCost(subtotal);
    const totalCost = subtotal + contingencyCost;

    const breakdown = [
      { category: '건설비', amount: constructionCost, percentage: (constructionCost / totalCost) * 100 },
      { category: '시설비', amount: facilityCost, percentage: (facilityCost / totalCost) * 100 },
      { category: 'HACCP 인증비', amount: haccpCost, percentage: (haccpCost / totalCost) * 100 },
      { category: '인허가비', amount: permitCost, percentage: (permitCost / totalCost) * 100 },
      { category: '예비비', amount: contingencyCost, percentage: (contingencyCost / totalCost) * 100 }
    ];

    return {
      baseCost: constructionCost,
      facilityCost,
      haccpCost,
      permitCost,
      contingencyCost,
      totalCost,
      breakdown
    };
  }

  // 프로젝트 일정 계산
  calculateTimeline(project: ProjectData): Array<{
    name: string;
    duration: number;
    cost: number;
    status: 'pending' | 'in-progress' | 'completed';
  }> {
    const totalCost = this.calculateTotalCost(project).totalCost;
    const size = project.size;

    // 기본 일정 (규모에 따라 조정)
    const baseDuration = Math.max(90, size * 2); // 최소 90일, 평당 2일

    return [
      {
        name: '착공 및 기초공사',
        duration: Math.round(baseDuration * 0.2),
        cost: Math.round(totalCost * 0.15),
        status: 'pending' as const
      },
      {
        name: '골조공사',
        duration: Math.round(baseDuration * 0.3),
        cost: Math.round(totalCost * 0.25),
        status: 'pending' as const
      },
      {
        name: '설비공사',
        duration: Math.round(baseDuration * 0.25),
        cost: Math.round(totalCost * 0.3),
        status: 'pending' as const
      },
      {
        name: '마감공사',
        duration: Math.round(baseDuration * 0.15),
        cost: Math.round(totalCost * 0.2),
        status: 'pending' as const
      },
      {
        name: 'HACCP 인증',
        duration: 30,
        cost: Math.round(totalCost * 0.1),
        status: 'pending' as const
      }
    ];
  }

  // 비용 절감 제안
  getCostSavingSuggestions(project: ProjectData): Array<{
    category: string;
    suggestion: string;
    potentialSaving: number;
    impact: 'low' | 'medium' | 'high';
  }> {
    const suggestions = [];
    const totalCost = this.calculateTotalCost(project).totalCost;

    // 지역별 제안
    if (project.location.province === '서울특별시') {
      suggestions.push({
        category: '지역',
        suggestion: '경기도로 이전 시 토지비 30% 절감 가능',
        potentialSaving: Math.round(totalCost * 0.1),
        impact: 'high' as const
      });
    }

    // 시설 최적화 제안
    if (project.facilities.length > 5) {
      suggestions.push({
        category: '시설',
        suggestion: '불필요한 시설 제거로 비용 절감',
        potentialSaving: Math.round(totalCost * 0.05),
        impact: 'medium' as const
      });
    }

    // 규모 최적화 제안
    if (project.size > 200) {
      suggestions.push({
        category: '규모',
        suggestion: '단계별 건설로 초기 투자비 절감',
        potentialSaving: Math.round(totalCost * 0.15),
        impact: 'high' as const
      });
    }

    return suggestions;
  }

  // ROI 계산 (간단한 수익성 분석)
  calculateROI(project: ProjectData, monthlyRevenue: number): {
    paybackPeriod: number; // 회수 기간 (월)
    annualROI: number; // 연간 ROI (%)
    breakEvenPoint: number; // 손익분기점 (월)
  } {
    const totalCost = this.calculateTotalCost(project).totalCost;
    const monthlyOperatingCost = totalCost * 0.05; // 월 운영비 (총 비용의 5%)
    const monthlyProfit = monthlyRevenue - monthlyOperatingCost;

    const paybackPeriod = monthlyProfit > 0 ? totalCost / monthlyProfit : 0;
    const annualROI = monthlyProfit > 0 ? (monthlyProfit * 12 / totalCost) * 100 : 0;
    const breakEvenPoint = monthlyRevenue > monthlyOperatingCost ? 
      totalCost / (monthlyRevenue - monthlyOperatingCost) : 0;

    return {
      paybackPeriod: Math.round(paybackPeriod * 10) / 10,
      annualROI: Math.round(annualROI * 10) / 10,
      breakEvenPoint: Math.round(breakEvenPoint * 10) / 10
    };
  }
}

export const projectCalculator = new ProjectCalculator();
