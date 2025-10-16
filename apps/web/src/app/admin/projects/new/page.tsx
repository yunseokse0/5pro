'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@5pro/ui';
import { Button } from '@5pro/ui';
import { Input } from '@5pro/ui';
import { Label } from '@5pro/ui';
import { Textarea } from '@5pro/ui';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@5pro/ui';
import { ArrowLeft, Save, X } from 'lucide-react';
import Link from 'next/link';

export default function NewProjectPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    industry: '',
    scale: '',
    budget: '',
    description: '',
    startDate: '',
    endDate: '',
    haccpRequired: false,
    smartFactoryRequired: false,
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 실제 API 호출 대신 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('새 프로젝트 생성:', formData);
      alert('프로젝트가 성공적으로 생성되었습니다!');
      router.push('/admin/projects');
    } catch (error) {
      console.error('프로젝트 생성 오류:', error);
      alert('프로젝트 생성 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const industries = [
    { value: 'kimchi', label: '김치공장' },
    { value: 'bakery', label: '제빵공장' },
    { value: 'meat', label: '육가공공장' },
    { value: 'beverage', label: '음료공장' },
    { value: 'dairy', label: '유제품공장' },
    { value: 'confectionery', label: '과자공장' },
    { value: 'noodles', label: '면류공장' },
    { value: 'sauce', label: '소스공장' },
    { value: 'frozen', label: '냉동식품공장' },
    { value: 'organic', label: '유기농식품공장' },
  ];

  const scales = [
    { value: '100', label: '100평 (330㎡)' },
    { value: '300', label: '300평 (990㎡)' },
    { value: '500', label: '500평 (1650㎡)' },
    { value: '1000', label: '1000평 (3300㎡)' },
    { value: '2000', label: '2000평 (6600㎡)' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link href="/admin/projects">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            뒤로가기
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">새 프로젝트 생성</h1>
          <p className="text-gray-600">새로운 식품공장 프로젝트를 시작하세요</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 기본 정보 */}
          <Card>
            <CardHeader>
              <CardTitle>기본 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">프로젝트명 *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="예: 서울 김치공장 신축"
                  required
                />
              </div>

              <div>
                <Label htmlFor="location">위치 *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="예: 서울시 강남구"
                  required
                />
              </div>

              <div>
                <Label htmlFor="industry">업종 *</Label>
                <Select value={formData.industry} onValueChange={(value) => handleInputChange('industry', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="업종을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem key={industry.value} value={industry.value}>
                        {industry.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="scale">규모 *</Label>
                <Select value={formData.scale} onValueChange={(value) => handleInputChange('scale', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="규모를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {scales.map((scale) => (
                      <SelectItem key={scale.value} value={scale.value}>
                        {scale.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="budget">예산 (원)</Label>
                <Input
                  id="budget"
                  type="number"
                  value={formData.budget}
                  onChange={(e) => handleInputChange('budget', e.target.value)}
                  placeholder="예: 1000000000"
                />
              </div>
            </CardContent>
          </Card>

          {/* 일정 및 옵션 */}
          <Card>
            <CardHeader>
              <CardTitle>일정 및 옵션</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="startDate">시작일</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="endDate">완료 예정일</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                />
              </div>

              <div className="space-y-3">
                <Label>추가 옵션</Label>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="haccpRequired"
                    checked={formData.haccpRequired}
                    onChange={(e) => handleInputChange('haccpRequired', e.target.checked)}
                    className="rounded"
                  />
                  <Label htmlFor="haccpRequired" className="text-sm">
                    HACCP 인증 포함
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="smartFactoryRequired"
                    checked={formData.smartFactoryRequired}
                    onChange={(e) => handleInputChange('smartFactoryRequired', e.target.checked)}
                    className="rounded"
                  />
                  <Label htmlFor="smartFactoryRequired" className="text-sm">
                    스마트팩토리 시스템 포함
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 프로젝트 설명 */}
        <Card>
          <CardHeader>
            <CardTitle>프로젝트 설명</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="프로젝트에 대한 상세한 설명을 입력하세요..."
              rows={4}
            />
          </CardContent>
        </Card>

        {/* 버튼 */}
        <div className="flex justify-end space-x-4">
          <Link href="/admin/projects">
            <Button variant="outline" type="button">
              <X className="w-4 h-4 mr-2" />
              취소
            </Button>
          </Link>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                생성 중...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                프로젝트 생성
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
