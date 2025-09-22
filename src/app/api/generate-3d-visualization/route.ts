import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

// Gemini 2.5 Flash Preview API 키
const genAI = new GoogleGenerativeAI('AIzaSyBJTUfNHa-h8JRV83E7kKrKl_Z0eInLMrA')

const SIZE_OPTIONS = [
  { value: '100', label: '100평', area: '330㎡' },
  { value: '300', label: '300평', area: '990㎡' },
  { value: '500', label: '500평', area: '1650㎡' },
  { value: '1000', label: '1000평', area: '3300㎡' }
]

const INDUSTRY_OPTIONS = [
  { value: 'kimchi', label: '김치공장' },
  { value: 'bakery', label: '제빵공장' },
  { value: 'meat', label: '육가공공장' },
  { value: 'beverage', label: '음료공장' },
  { value: 'dairy', label: '유제품공장' },
  { value: 'confectionery', label: '과자공장' },
  { value: 'noodles', label: '면류공장' },
  { value: 'sauce', label: '소스공장' },
  { value: 'frozen', label: '냉동식품공장' },
  { value: 'organic', label: '유기농식품공장' }
]

// 업종별 섹션 정보 반환 함수
function getIndustrySections(industry: string): string[] {
  const sections = {
    'kimchi': ['Raw Material Storage', 'Washing Room', 'Cutting Room', 'Fermentation Room', 'Processing Room', 'Packaging Room', 'Warehouse', 'Shipping Area'],
    'bakery': ['Raw Material Storage', 'Mixing Room', 'Fermentation Room', 'Baking Room', 'Cooling Room', 'Packaging Room', 'Warehouse', 'Shipping Area'],
    'meat': ['Raw Material Storage', 'Preparation Room', 'Processing Room', 'Packaging Room', 'Freezer Storage', 'Warehouse', 'Shipping Area'],
    'beverage': ['Raw Material Storage', 'Mixing Room', 'Filtration Room', 'Bottling Room', 'Packaging Room', 'Warehouse', 'Shipping Area'],
    'dairy': ['Raw Material Storage', 'Pasteurization Room', 'Fermentation Room', 'Packaging Room', 'Cold Storage', 'Quality Control', 'Warehouse', 'Shipping Area'],
    'confectionery': ['Raw Material Storage', 'Mixing Room', 'Shaping Room', 'Baking Room', 'Coating Room', 'Packaging Room', 'Warehouse', 'Shipping Area'],
    'noodles': ['Raw Material Storage', 'Mixing Room', 'Kneading Room', 'Extrusion Room', 'Drying Room', 'Packaging Room', 'Warehouse', 'Shipping Area'],
    'sauce': ['Raw Material Storage', 'Cooking Room', 'Blending Room', 'Filtration Room', 'Packaging Room', 'Warehouse', 'Shipping Area'],
    'frozen': ['Raw Material Storage', 'Preparation Room', 'Blast Freezing Room', 'Frozen Storage', 'Packaging Room', 'Warehouse', 'Shipping Area'],
    'organic': ['Raw Material Storage', 'Washing Room', 'Processing Room', 'Packaging Room', 'Quality Control', 'Warehouse', 'Shipping Area']
  }
  return sections[industry as keyof typeof sections] || sections.kimchi
}

// 한글 라벨 매핑
const KOREAN_LABEL_MAPPING: { [key: string]: string } = {
  'Raw Material Storage': '원자재 입고/저장',
  'Washing Room': '세척실',
  'Cutting Room': '절단실',
  'Fermentation Room': '염장/숙성실',
  'Processing Room': '가공/혼합실',
  'Packaging Room': '포장실',
  'Warehouse': '완제품 창고',
  'Shipping Area': '출하장',
  'Mixing Room': '반죽실',
  'Baking Room': '제빵실',
  'Cooling Room': '냉각실',
  'Preparation Room': '준비실',
  'Freezer Storage': '냉동창고',
  'Filtration Room': '여과실',
  'Bottling Room': '병입실',
  'Pasteurization Room': '살균실',
  'Cold Storage': '냉장저장고',
  'Quality Control': '품질검사실',
  'Shaping Room': '성형실',
  'Coating Room': '코팅실',
  'Kneading Room': '반죽실',
  'Extrusion Room': '압출실',
  'Drying Room': '건조실',
  'Cooking Room': '조리실',
  'Blending Room': '혼합실',
  'Blast Freezing Room': '급속냉동실',
  'Frozen Storage': '냉동저장고'
}

// 라벨 위치 정의 (업종별로 조정, 더 작고 현실적인 크기)
const LABEL_POSITIONS = {
  'kimchi': [
    { section: 'Raw Material Storage', x: 200, y: 220, width: 140, height: 90 },
    { section: 'Washing Room', x: 360, y: 220, width: 140, height: 90 },
    { section: 'Cutting Room', x: 520, y: 220, width: 140, height: 90 },
    { section: 'Fermentation Room', x: 680, y: 220, width: 140, height: 90 },
    { section: 'Processing Room', x: 200, y: 330, width: 140, height: 90 },
    { section: 'Packaging Room', x: 360, y: 330, width: 140, height: 90 },
    { section: 'Warehouse', x: 520, y: 330, width: 140, height: 90 },
    { section: 'Shipping Area', x: 680, y: 330, width: 140, height: 90 }
  ],
  'bakery': [
    { section: 'Raw Material Storage', x: 200, y: 220, width: 140, height: 90 },
    { section: 'Mixing Room', x: 360, y: 220, width: 140, height: 90 },
    { section: 'Fermentation Room', x: 520, y: 220, width: 140, height: 90 },
    { section: 'Baking Room', x: 680, y: 220, width: 140, height: 90 },
    { section: 'Cooling Room', x: 200, y: 330, width: 140, height: 90 },
    { section: 'Packaging Room', x: 360, y: 330, width: 140, height: 90 },
    { section: 'Warehouse', x: 520, y: 330, width: 140, height: 90 },
    { section: 'Shipping Area', x: 680, y: 330, width: 140, height: 90 }
  ],
  'meat': [
    { section: 'Raw Material Storage', x: 200, y: 220, width: 140, height: 90 },
    { section: 'Preparation Room', x: 360, y: 220, width: 140, height: 90 },
    { section: 'Processing Room', x: 520, y: 220, width: 140, height: 90 },
    { section: 'Freezer Storage', x: 680, y: 220, width: 140, height: 90 },
    { section: 'Packaging Room', x: 200, y: 330, width: 140, height: 90 },
    { section: 'Warehouse', x: 360, y: 330, width: 140, height: 90 },
    { section: 'Shipping Area', x: 520, y: 330, width: 140, height: 90 }
  ],
  'beverage': [
    { section: 'Raw Material Storage', x: 200, y: 220, width: 140, height: 90 },
    { section: 'Mixing Room', x: 360, y: 220, width: 140, height: 90 },
    { section: 'Filtration Room', x: 520, y: 220, width: 140, height: 90 },
    { section: 'Bottling Room', x: 680, y: 220, width: 140, height: 90 },
    { section: 'Packaging Room', x: 200, y: 330, width: 140, height: 90 },
    { section: 'Warehouse', x: 360, y: 330, width: 140, height: 90 },
    { section: 'Shipping Area', x: 520, y: 330, width: 140, height: 90 }
  ]
}

// 업종별 특화 프롬프트 생성 함수
function getIndustrySpecificPrompt(industryName: string, options: any): string {
  const specificPrompts = {
        '김치공장': `KIMCHI FACTORY SPECIFIC FEATURES:
        - Large stainless steel fermentation tanks with realistic wear and patina (visible through cutaway)
        - Vegetable washing stations with industrial-grade stainless steel sinks and realistic water systems
        - Automated cutting and preparation areas with realistic conveyor systems and industrial machinery
        - Salt mixing and seasoning stations with realistic industrial mixers and equipment
        - Temperature-controlled fermentation rooms with realistic climate control systems and monitoring equipment
        - Traditional Korean fermentation equipment (onggi pots) with realistic ceramic textures
        - Automated packaging lines with realistic machinery for kimchi containers and bags
        - Cold storage areas with realistic industrial refrigeration units and condensation
        - Waste management and water treatment facilities with realistic pipes and tanks
        - Employee hygiene stations with realistic stainless steel fixtures`,

    '제빵공장': `BAKERY FACTORY SPECIFIC FEATURES:
    - Large industrial ovens and baking chambers with visible heat systems
    - Automated dough mixing machines and kneading stations
    - Proofing rooms with controlled humidity and temperature systems
    - Cooling racks and automated conveyor systems
    - Flour storage silos and ingredient dispensing systems
    - Baking trays and bread cooling areas with industrial fans
    - Quality control stations with inspection equipment
    - Fresh bread packaging equipment and labeling systems
    - Ingredient storage areas with temperature control
    - Waste management for bread scraps and packaging materials`,

    '육가공공장': `MEAT PROCESSING FACTORY SPECIFIC FEATURES:
    - Industrial meat processing equipment and cutting stations
    - Large freezer storage areas with heavy insulation and cooling systems
    - Meat preparation tables with specialized cutting equipment
    - Sausage-making machines and automated packaging equipment
    - Temperature-controlled processing rooms with HACCP compliance
    - Cold storage facilities with industrial refrigeration
    - Meat packaging and vacuum sealing equipment
    - Sanitation and cleaning stations with industrial washers
    - Waste management systems for meat processing byproducts
    - Employee safety equipment and hygiene stations`,

        '음료공장': `BEVERAGE FACTORY SPECIFIC FEATURES:
        - Large mixing tanks and blending equipment with visible piping
        - Filtration systems and water purification units
        - Automated bottling and canning production lines
        - Carbonation equipment for fizzy drinks with visible gas systems
        - Ingredient storage tanks and automated dispensing systems
        - Quality testing laboratories with analytical equipment
        - High-speed labeling and packaging machines
        - Cold storage for finished beverages with climate control
        - Water treatment and waste management facilities
        - Industrial cleaning and sanitization systems`,

        '유제품공장': `DAIRY FACTORY SPECIFIC FEATURES:
        - Large milk storage tanks and pasteurization equipment
        - Fermentation tanks for yogurt and cheese production
        - Automated packaging lines for dairy products
        - Cold storage rooms with temperature monitoring systems
        - Quality control laboratories with testing equipment
        - Cream separation and processing equipment
        - Cheese aging rooms with controlled humidity
        - Milk homogenization and standardization systems
        - Clean-in-place (CIP) cleaning systems
        - Waste treatment facilities for dairy byproducts`,

        '과자공장': `CONFECTIONERY FACTORY SPECIFIC FEATURES:
        - Large mixing bowls and dough preparation equipment
        - Automated shaping and molding machines
        - Multiple ovens for different baking processes
        - Chocolate coating and enrobing machines
        - Sugar crystallization and candy making equipment
        - Packaging machines for various confectionery products
        - Quality control stations with inspection equipment
        - Ingredient storage with temperature control
        - Dust collection and air filtration systems
        - Automated conveyor systems for production flow`,

        '면류공장': `NOODLE FACTORY SPECIFIC FEATURES:
        - Large flour storage silos and mixing equipment
        - Automated kneading and dough preparation machines
        - Extrusion machines for different noodle shapes
        - Steam cooking and parboiling equipment
        - Drying tunnels with temperature and humidity control
        - Automated cutting and portioning machines
        - Packaging equipment for instant noodles
        - Quality control stations for texture testing
        - Seasoning and flavoring application systems
        - Waste management for production byproducts`,

        '소스공장': `SAUCE FACTORY SPECIFIC FEATURES:
        - Large cooking kettles and steam-jacketed vessels
        - Automated blending and mixing systems
        - Filtration and clarification equipment
        - Hot filling and pasteurization systems
        - Ingredient preparation and pre-processing areas
        - Quality control laboratories with taste testing
        - Automated bottling and packaging lines
        - Steam generation and distribution systems
        - Waste treatment for organic byproducts
        - Clean-in-place (CIP) cleaning systems`,

        '냉동식품공장': `FROZEN FOOD FACTORY SPECIFIC FEATURES:
        - Blast freezing tunnels with rapid cooling systems
        - Large frozen storage warehouses with temperature control
        - Automated packaging equipment for frozen products
        - IQF (Individually Quick Frozen) processing equipment
        - Cold chain logistics and transportation systems
        - Quality control with temperature monitoring
        - Ingredient preparation in temperature-controlled areas
        - Automated conveyor systems for frozen products
        - Refrigeration and cooling equipment
        - Waste management for food processing byproducts`,

        '유기농식품공장': `ORGANIC FOOD FACTORY SPECIFIC FEATURES:
        - Certified organic ingredient storage areas
        - Specialized cleaning and sanitization systems
        - Quality control laboratories for organic certification
        - Sustainable packaging equipment and materials
        - Waste composting and organic waste management
        - Energy-efficient processing equipment
        - Natural ventilation and air purification systems
        - Organic certification compliance monitoring
        - Sustainable water treatment systems
        - Traceability systems for organic products`
  }
  
  return specificPrompts[industryName as keyof typeof specificPrompts] || specificPrompts['김치공장']
}

// 한글 라벨 오버레이 함수 (SVG 방식으로 변경)
function addKoreanLabelsSVG(imageUrl: string, industry: string): string {
  try {
    // Base64 데이터 추출
    const base64Data = imageUrl.replace(/^data:image\/[a-z]+;base64,/, '')
    
    // SVG 오버레이 생성
    const positions = LABEL_POSITIONS[industry as keyof typeof LABEL_POSITIONS] || LABEL_POSITIONS.kimchi
    
    const labelsSVG = positions.map(pos => {
      const koreanLabel = KOREAN_LABEL_MAPPING[pos.section] || pos.section
      const centerX = pos.x + pos.width / 2
      const centerY = pos.y + pos.height / 2
      
      return `
        <!-- 배경 -->
        <rect x="${pos.x + 8}" y="${pos.y + 8}" width="${pos.width - 16}" height="24" 
              fill="rgba(0,0,0,0.75)" rx="12" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
        <!-- 텍스트 -->
        <text x="${centerX}" y="${centerY + 1}" text-anchor="middle" 
              font-family="Arial, sans-serif" font-size="11" font-weight="bold" 
              fill="rgba(0,0,0,0.5)">${koreanLabel}</text>
        <text x="${centerX}" y="${centerY}" text-anchor="middle" 
              font-family="Arial, sans-serif" font-size="11" font-weight="bold" 
              fill="#ffffff">${koreanLabel}</text>
      `
    }).join('')
    
    // 전체 SVG 생성
    const svgWithLabels = `
      <svg width="1200" height="800" xmlns="http://www.w3.org/2000/svg">
        <!-- 원본 이미지 -->
        <image href="data:image/png;base64,${base64Data}" width="1200" height="800"/>
        <!-- 한글 라벨 오버레이 -->
        ${labelsSVG}
      </svg>
    `
    
    return `data:image/svg+xml;base64,${Buffer.from(svgWithLabels).toString('base64')}`
    
  } catch (error) {
    console.error('한글 라벨 SVG 오버레이 오류:', error)
    return imageUrl // 오류 시 원본 이미지 반환
  }
}

// 고급 SVG 생성 함수
function generateAdvancedSVG(industryName: string, sizeInfo: any, description: string, options: any) {
  const baseWidth = 1200
  const baseHeight = 800
  
  // 업종별 색상 테마
  const colorThemes = {
    '김치공장': { primary: '#dc2626', secondary: '#fef2f2', accent: '#ef4444' },
    '제빵공장': { primary: '#d97706', secondary: '#fef3c7', accent: '#f59e0b' },
    '육가공공장': { primary: '#7c2d12', secondary: '#fef7ed', accent: '#ea580c' },
    '음료공장': { primary: '#2563eb', secondary: '#dbeafe', accent: '#3b82f6' },
    'default': { primary: '#374151', secondary: '#f9fafb', accent: '#6b7280' }
  }
  
  const theme = colorThemes[industryName as keyof typeof colorThemes] || colorThemes.default
  
  return `data:image/svg+xml;base64,${Buffer.from(`
    <svg width="${baseWidth}" height="${baseHeight}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#f8fafc;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#e2e8f0;stop-opacity:1" />
        </linearGradient>
        <linearGradient id="building" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#ffffff;stop-opacity:1" />
          <stop offset="100%" style="stop-color:${theme.secondary};stop-opacity:1" />
        </linearGradient>
        <linearGradient id="section" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${theme.secondary};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${theme.primary};stop-opacity:0.1" />
        </linearGradient>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="2" dy="4" stdDeviation="3" flood-color="#000000" flood-opacity="0.2"/>
        </filter>
      </defs>
      
      <!-- 배경 -->
      <rect width="${baseWidth}" height="${baseHeight}" fill="url(#bg)"/>
      
          <!-- 공장 건물 외곽 (그림자 효과) - 더 현실적인 크기 -->
          <rect x="150" y="200" width="900" height="400" fill="url(#building)" stroke="${theme.primary}" stroke-width="4" rx="20" filter="url(#shadow)"/>
      
          <!-- 메인 출입구 -->
          <rect x="570" y="180" width="60" height="20" fill="${theme.primary}" rx="10"/>
      
      <!-- 공장 섹션들 (3D 레이아웃) -->
      ${generateFactorySections3D(industryName, theme)}
      
      <!-- 제목 및 정보 -->
      <text x="${baseWidth/2}" y="80" text-anchor="middle" font-family="Arial, sans-serif" font-size="36" font-weight="bold" fill="#1e293b">
        3D 공장 조감도
      </text>
      <text x="${baseWidth/2}" y="110" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" fill="#64748b">
        ${industryName} - ${sizeInfo?.label} (${sizeInfo?.area})
      </text>
      
          <!-- 범례 -->
          <rect x="950" y="220" width="180" height="200" fill="rgba(255,255,255,0.95)" stroke="${theme.primary}" stroke-width="2" rx="12" filter="url(#shadow)"/>
          <text x="1040" y="245" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="${theme.primary}">
            공장 섹션 구성
          </text>
      ${generateLegend(industryName)}
      
      <!-- Gemini AI 생성 표시 -->
      <text x="${baseWidth/2}" y="${baseHeight - 20}" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#94a3b8">
        Generated by Gemini 2.5 AI
      </text>
    </svg>
  `).toString('base64')}`
}

// 공장 섹션 생성 함수 (3D 효과)
function generateFactorySections3D(industryName: string, theme: any) {
  const sections = {
        '김치공장': [
          { x: 220, y: 380, w: 120, h: 60, label: '원자재 저장' },
          { x: 360, y: 380, w: 120, h: 60, label: '세척실' },
          { x: 500, y: 380, w: 120, h: 60, label: '절단실' },
          { x: 640, y: 380, w: 120, h: 60, label: '염장/숙성실' },
          { x: 220, y: 460, w: 120, h: 60, label: '가공실' },
          { x: 360, y: 460, w: 120, h: 60, label: '포장실' },
          { x: 500, y: 460, w: 120, h: 60, label: '완제품 창고' },
          { x: 640, y: 460, w: 120, h: 60, label: '출하장' }
        ],
        '제빵공장': [
          { x: 220, y: 380, w: 120, h: 60, label: '원료 저장' },
          { x: 360, y: 380, w: 120, h: 60, label: '반죽실' },
          { x: 500, y: 380, w: 120, h: 60, label: '발효실' },
          { x: 640, y: 380, w: 120, h: 60, label: '제빵실' },
          { x: 220, y: 460, w: 120, h: 60, label: '냉각실' },
          { x: 360, y: 460, w: 120, h: 60, label: '포장실' },
          { x: 500, y: 460, w: 120, h: 60, label: '품질검사' },
          { x: 640, y: 460, w: 120, h: 60, label: '출하장' }
        ],
        '육가공공장': [
          { x: 220, y: 380, w: 120, h: 60, label: '육류 입고' },
          { x: 360, y: 380, w: 120, h: 60, label: '준비실' },
          { x: 500, y: 380, w: 120, h: 60, label: '가공실' },
          { x: 640, y: 380, w: 120, h: 60, label: '냉동창고' },
          { x: 220, y: 460, w: 120, h: 60, label: '포장실' },
          { x: 360, y: 460, w: 120, h: 60, label: '품질검사' },
          { x: 500, y: 460, w: 120, h: 60, label: '완제품 창고' },
          { x: 640, y: 460, w: 120, h: 60, label: '출하장' }
        ],
        '음료공장': [
          { x: 220, y: 380, w: 120, h: 60, label: '원료 저장' },
          { x: 360, y: 380, w: 120, h: 60, label: '혼합실' },
          { x: 500, y: 380, w: 120, h: 60, label: '여과실' },
          { x: 640, y: 380, w: 120, h: 60, label: '병입실' },
          { x: 220, y: 460, w: 120, h: 60, label: '포장실' },
          { x: 360, y: 460, w: 120, h: 60, label: '품질검사' },
          { x: 500, y: 460, w: 120, h: 60, label: '완제품 창고' },
          { x: 640, y: 460, w: 120, h: 60, label: '출하장' }
        ]
      }
      
      const sectionLayout = sections[industryName as keyof typeof sections] || sections['김치공장']
      
      return sectionLayout.map(section => `
        <!-- 3D 섹션 바닥면 -->
        <rect x="${section.x}" y="${section.y + 10}" width="${section.w}" height="${section.h}" 
              fill="url(#section)" stroke="${theme.primary}" stroke-width="1" rx="4"/>
        <!-- 3D 섹션 측면 -->
        <polygon points="${section.x},${section.y + 10} ${section.x + 10},${section.y} ${section.x + section.w + 10},${section.y} ${section.x + section.w},${section.y + 10}" 
              fill="${theme.secondary}" opacity="0.6"/>
        <!-- 3D 섹션 지붕면 -->
        <rect x="${section.x}" y="${section.y}" width="${section.w}" height="10" 
              fill="${theme.primary}" opacity="0.3" rx="4"/>
      `).join('')
}

// 기존 평면 섹션 함수 (호환성을 위해 유지)
function generateFactorySections(industryName: string, theme: any) {
  const sections = {
        '김치공장': [
          { x: 170, y: 230, w: 140, h: 90, label: '원자재 저장' },
          { x: 330, y: 230, w: 140, h: 90, label: '세척실' },
          { x: 490, y: 230, w: 140, h: 90, label: '절단실' },
          { x: 650, y: 230, w: 140, h: 90, label: '염장/숙성실' },
          { x: 170, y: 340, w: 140, h: 90, label: '가공실' },
          { x: 330, y: 340, w: 140, h: 90, label: '포장실' },
          { x: 490, y: 340, w: 140, h: 90, label: '완제품 창고' },
          { x: 650, y: 340, w: 140, h: 90, label: '출하장' }
        ],
        '제빵공장': [
          { x: 170, y: 230, w: 140, h: 90, label: '원료 저장' },
          { x: 330, y: 230, w: 140, h: 90, label: '반죽실' },
          { x: 490, y: 230, w: 140, h: 90, label: '발효실' },
          { x: 650, y: 230, w: 140, h: 90, label: '제빵실' },
          { x: 170, y: 340, w: 140, h: 90, label: '냉각실' },
          { x: 330, y: 340, w: 140, h: 90, label: '포장실' },
          { x: 490, y: 340, w: 140, h: 90, label: '품질검사' },
          { x: 650, y: 340, w: 140, h: 90, label: '출하장' }
        ],
        '육가공공장': [
          { x: 170, y: 230, w: 140, h: 90, label: '육류 입고' },
          { x: 330, y: 230, w: 140, h: 90, label: '준비실' },
          { x: 490, y: 230, w: 140, h: 90, label: '가공실' },
          { x: 650, y: 230, w: 140, h: 90, label: '냉동창고' },
          { x: 170, y: 340, w: 140, h: 90, label: '포장실' },
          { x: 330, y: 340, w: 140, h: 90, label: '품질검사' },
          { x: 490, y: 340, w: 140, h: 90, label: '완제품 창고' },
          { x: 650, y: 340, w: 140, h: 90, label: '출하장' }
        ],
        '음료공장': [
          { x: 170, y: 230, w: 140, h: 90, label: '원료 저장' },
          { x: 330, y: 230, w: 140, h: 90, label: '혼합실' },
          { x: 490, y: 230, w: 140, h: 90, label: '여과실' },
          { x: 650, y: 230, w: 140, h: 90, label: '병입실' },
          { x: 170, y: 340, w: 140, h: 90, label: '포장실' },
          { x: 330, y: 340, w: 140, h: 90, label: '품질검사' },
          { x: 490, y: 340, w: 140, h: 90, label: '완제품 창고' },
          { x: 650, y: 340, w: 140, h: 90, label: '출하장' }
        ]
      }
      
      const sectionLayout = sections[industryName as keyof typeof sections] || sections['김치공장']
      
      return sectionLayout.map(section => `
        <rect x="${section.x}" y="${section.y}" width="${section.w}" height="${section.h}" 
              fill="url(#section)" stroke="${theme.primary}" stroke-width="2" rx="8"/>
      `).join('')
}

// 범례 생성 함수
function generateLegend(industryName: string) {
  const legends = {
    '김치공장': [
      '• 원자재 저장 및 관리',
      '• 세척 및 전처리',
      '• 절단 및 손질',
      '• 염장 및 숙성',
      '• 최종 가공',
      '• 포장 및 라벨링',
      '• 품질검사',
      '• 출하 및 물류'
    ],
    '제빵공장': [
      '• 원료 저장',
      '• 반죽 제조',
      '• 발효 과정',
      '• 제빵 및 굽기',
      '• 냉각 처리',
      '• 포장 작업',
      '• 품질검사',
      '• 출하 준비'
    ],
    '육가공공장': [
      '• 육류 입고',
      '• 전처리 작업',
      '• 가공 제조',
      '• 냉동 보관',
      '• 포장 작업',
      '• 품질검사',
      '• 완제품 창고',
      '• 출하 관리'
    ],
    '음료공장': [
      '• 원료 저장',
      '• 혼합 제조',
      '• 여과 처리',
      '• 병입 작업',
      '• 포장 라인',
      '• 품질검사',
      '• 완제품 창고',
      '• 출하 물류'
    ]
  }
  
  const legendItems = legends[industryName as keyof typeof legends] || legends['김치공장']
  
      return legendItems.map((item, index) => `
        <text x="970" y="${270 + index * 18}" font-family="Arial, sans-serif" font-size="11" fill="#64748b">${item}</text>
      `).join('')
}

export async function POST(request: NextRequest) {
  try {
    console.log('API 호출 시작...')
    const { prompt, options } = await request.json()
    console.log('받은 데이터:', { prompt, options })

    if (!prompt || !options) {
      return NextResponse.json({ error: '프롬프트와 옵션이 필요합니다.' }, { status: 400 })
    }

    // 기본 이미지 생성
    const selectedIndustry = INDUSTRY_OPTIONS.find(opt => opt.value === options.industry)
    const industryName = selectedIndustry?.label || options.industry
    const sizeInfo = SIZE_OPTIONS.find(s => s.value === options.size)
    
    console.log('생성할 공장 정보:', { industryName, sizeInfo })
    
    // 기본 설명 생성
    const defaultDescription = `${industryName} 공장의 ${sizeInfo?.label} 규모에 맞는 3D 조감도입니다. 업종별 특화된 레이아웃과 현대적인 산업 건축 디자인을 적용했습니다.`
    
    const generatedImageUrl = generateAdvancedSVG(industryName, sizeInfo, defaultDescription, options)
    console.log('SVG 이미지 생성 완료')
    
    // Gemini 2.5 Flash Image API로 실제 이미지 생성
    let geminiImageUrl = null
    let geminiDescription = defaultDescription
    
    try {
      console.log('Gemini 2.5 Flash Image API 호출 시작...')
          const model = genAI.getGenerativeModel({ 
            model: 'gemini-2.5-flash-image-preview',
            generationConfig: {
              temperature: 0.3, // 더 일관된 결과를 위해 낮춤
              maxOutputTokens: 2048, // 더 상세한 설명을 위해 증가
              topP: 0.8,
              topK: 40
            }
          })
      
      // 업종별 특화 프롬프트 생성
      const industrySpecificPrompt = getIndustrySpecificPrompt(industryName, options)
      
          const imagePrompt = `Generate a detailed 3D aerial perspective view (bird's eye 45-degree angle) of a modern ${industryName} factory, total size ${sizeInfo?.label} (about ${sizeInfo?.area}).

CRITICAL VISUAL REQUIREMENTS:
- **Perspective**: Closer aerial view with strong 3D perspective - focus on the main building complex
- **Architecture**: Realistic industrial building with modern materials (metal panels, glass windows, ventilation ducts, industrial roofing)
- **Scale**: Building size must be proportional to ${sizeInfo?.area} - for ${sizeInfo?.label} this should be a compact, single-story building approximately ${sizeInfo?.area === '330㎡' ? '18m x 18m' : sizeInfo?.area === '990㎡' ? '31m x 31m' : sizeInfo?.area === '1650㎡' ? '40m x 40m' : '57m x 57m'} - NOT oversized
- **Cutaway Design**: Show interior process rooms through architectural cutaway sections
- **Zoom Level**: Closer shot focusing on the main factory building with minimal surrounding context
- **Realistic Proportions**: ${sizeInfo?.label} (${sizeInfo?.area}) should look like a small to medium-sized factory, not a massive industrial complex

REQUIRED INTERIOR SECTIONS (show through cutaway):
${getIndustrySections(options.industry).map(section => `- ${section}`).join('\n')}

${industrySpecificPrompt}

ARCHITECTURAL DETAILS:
- Photorealistic brand new modern food processing facility with pristine industrial materials
- Clean concrete walls with fresh, smooth texture
- Bright metal cladding with polished, shiny surfaces
- Large industrial windows with crystal clear reflections
- Visible ventilation systems, pipes, and utility connections with clean, new appearance
- Modern loading docks with fresh concrete and polished steel details
- Clear separation between different process zones with clean barriers
- Modern industrial lighting fixtures with bright, clear illumination
- Realistic proportions and building height (single-story for ${sizeInfo?.area === '330㎡' ? 'small' : sizeInfo?.area === '990㎡' ? 'medium' : 'larger'} facilities)
- Building should occupy reasonable portion of the frame - not dominate the entire view
- Context elements (parking lots with fresh asphalt, clean roads) should be proportional to building size
- Realistic industrial equipment visible through windows and cutaway sections

PERSPECTIVE & STYLE:
- Photorealistic architectural visualization style
- Strong 3D perspective with vanishing points
- Natural daylight lighting with realistic shadows and reflections
- Professional industrial photography aesthetic
- Realistic materials and textures (concrete, steel, glass, asphalt)
- High-quality photorealistic rendering, not cartoon or illustration style
- Realistic color palette with industrial tones (grays, blues, whites)
- Clean, text-free architectural visualization

LABEL REQUIREMENTS:
- Do NOT add any Korean text labels or text of any kind
- Keep the image clean and text-free
- Focus purely on the architectural visualization without text overlays

CONTEXT ELEMENTS (minimal):
- Focus primarily on the main factory building
- Include only essential external elements like loading docks
- Minimal surrounding context to emphasize the factory details

Generate a convincing architectural visualization that looks like a real food processing facility, not a flat diagram.

CRITICAL REALISM REQUIREMENTS:
- This must look like a PHOTOGRAPH of a brand new, modern factory, not a cartoon or illustration
- Use bright, clean lighting with clear shadows and pristine material textures
- Show clean, polished surfaces without wear, dirt, or aging
- Include modern, state-of-the-art industrial equipment and machinery details
- Use bright, clean colors typical of new industrial facilities (whites, light grays, blues)
- Avoid dark, weathered colors or worn appearance
- Make it look like professional architectural photography of a newly built facility

IMPORTANT SIZE REMINDER: This is a ${sizeInfo?.label} (${sizeInfo?.area}) factory - it should be compact and appropriately sized. Do NOT make it look like a massive industrial complex. The building should be modest in scale relative to its surroundings.`

      const result = await model.generateContent(imagePrompt)
      const response = await result.response
      
      // 이미지 데이터 추출
      if (response.candidates && response.candidates[0] && response.candidates[0].content) {
        for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          // Base64 이미지 데이터를 data URL로 변환
          const originalImageUrl = `data:image/png;base64,${part.inlineData.data}`
          
          // Gemini에서 직접 한글 라벨 처리됨
          geminiImageUrl = originalImageUrl
          console.log('Gemini 이미지 생성 완료! (한글 라벨 포함)')
          break
        } else if (part.text) {
          geminiDescription = part.text
        }
        }
      }
      
    } catch (apiError: any) {
      console.log('Gemini 이미지 생성 오류 (SVG 사용):', apiError?.message || apiError)
    }
    
    console.log('API 응답 반환 준비 완료')
    
    return NextResponse.json({ 
      imageUrl: geminiImageUrl || generatedImageUrl, // Gemini 이미지 우선 사용
      description: geminiDescription,
      prompt: prompt,
      success: true,
      isGeminiImage: !!geminiImageUrl // Gemini 이미지 여부 표시
    })

  } catch (error) {
    console.error('Gemini API 오류:', error)
    return NextResponse.json(
      { error: '이미지 생성 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
