import { Metadata } from 'next';
import FAQAccordion from '@/components/5pro/FAQAccordion';

export const metadata: Metadata = {
  title: 'FAQ - 오프로',
  description: '오프로에 대해 자주 묻는 질문과 답변을 확인하세요',
};

export default function FAQPage() {
  return (
    <main className="min-h-screen pt-16">
      {/* 히어로 */}
      <section className="pt-20 pb-16 bg-gray-50">
        <div className="max-w-container mx-auto px-5 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            자주 묻는 질문
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            궁금한 점이 있으신가요? 여기서 답을 찾아보세요
          </p>
        </div>
      </section>

      {/* FAQ 컴포넌트 */}
      <FAQAccordion />
    </main>
  );
}

