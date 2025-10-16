'use client';

import { Building2, MapPin, Calendar } from 'lucide-react';
import projects from '@/../../content/projects.json';

export default function ProjectShowcase() {
  return (
    <section className="px-6 md:px-12 py-16 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            완공 사례
          </h2>
          <p className="text-lg text-gray-600">
            다양한 식품 제조 환경에서 검증된 5PRO의 솔루션
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((p) => (
            <div 
              key={p.id} 
              className="rounded-xl overflow-hidden border border-gray-200 bg-white hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48 bg-gradient-to-br from-indigo-100 to-purple-100">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Building2 className="w-16 h-16 text-indigo-400" strokeWidth={1.5} />
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-indigo-700">
                  {p.year}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg text-gray-900 mb-2">{p.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{p.summary}</p>
                <div className="flex items-center text-sm text-gray-500 space-x-4">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {p.location}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {p.year}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

