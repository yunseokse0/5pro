export default function Section3D() {
  return (
    <section className="px-6 md:px-12 py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">3D 조감도 & 동선 시뮬레이션</h2>
          <p className="mt-3 text-gray-600">
            시공 전에 생산 동선, HACCP 구역, 물류 라인을 3D로 검증합니다. 
            설계 변경 비용을 줄이고, 완공 후 운영 효율을 미리 확인하세요.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="/3d" className="px-5 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">3D 미리보기</a>
            <a href="/smart-factory" className="px-5 py-3 rounded-lg border hover:bg-white">운영 시뮬레이션 보기</a>
          </div>
        </div>
        <div className="rounded-xl overflow-hidden bg-white border aspect-video">
          {/* 여기에 캡처 이미지 or WebGL 뷰어 임베드 */}
          <img src="/imgs/3d-preview.jpg" alt="오프로 3D 조감도" className="w-full h-full object-cover" loading="lazy"/>
        </div>
      </div>
    </section>
  );
}
