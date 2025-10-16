export default function Section3D() {
  return (
    <section className="px-6 md:px-12 py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">3D 조감도 & 동선 시뮬레이션</h2>
          <p className="mt-3 text-gray-600 dark:text-gray-300">
            시공 전에 생산 동선, HACCP 구역, 물류 라인을 3D로 검증합니다. 
            설계 변경 비용을 줄이고, 완공 후 운영 효율을 미리 확인하세요.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="/3d-visualization" className="px-5 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 dark:hover:bg-indigo-500">3D 조감도 생성하기</a>
            <a href="/estimate" className="px-5 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700">투자 회수 시뮬레이터</a>
          </div>
        </div>
        <div className="rounded-xl overflow-hidden bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 aspect-video">
          {/* 5PROLINE.PNG 이미지 표시 */}
          <img 
            src="/imgs/5PROLINE.png" 
            alt="오프로 3D 조감도" 
            className="w-full h-full object-contain bg-gray-50 dark:bg-gray-600" 
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
