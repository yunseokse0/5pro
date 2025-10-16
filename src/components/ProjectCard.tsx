import Link from 'next/link';
import { 
  BuildingOfficeIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  MapPinIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

interface ProjectCardProps {
  project: {
    id: number;
    name: string;
    type: string;
    location: string;
    area: string;
    budget: string;
    status: 'completed' | 'in_progress' | 'planning';
    startDate: string;
    endDate: string;
    haccpStatus: 'approved' | 'review' | 'preparation';
    image: string;
    description: string;
    savings: string;
    features: string[];
  };
}

const statusConfig = {
  completed: { label: '완료', color: 'bg-green-100 text-green-800', icon: CheckCircleIcon },
  in_progress: { label: '진행중', color: 'bg-blue-100 text-blue-800', icon: ClockIcon },
  planning: { label: '계획중', color: 'bg-yellow-100 text-yellow-800', icon: ExclamationTriangleIcon }
};

const haccpStatusConfig = {
  approved: { label: '인증완료', color: 'bg-green-100 text-green-800' },
  review: { label: '검토중', color: 'bg-yellow-100 text-yellow-800' },
  preparation: { label: '준비중', color: 'bg-gray-100 text-gray-800' }
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const StatusIcon = statusConfig[project.status].icon;
  const haccpStatus = haccpStatusConfig[project.haccpStatus];

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all group">
      <div className="aspect-video bg-gray-200 relative">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.currentTarget.src = '/imgs/placeholder-factory.jpg';
          }}
        />
        <div className="absolute top-4 right-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
            statusConfig[project.status].color
          }`}>
            <StatusIcon className="w-4 h-4 mr-1" />
            {statusConfig[project.status].label}
          </span>
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Link
              href={`/projects/${project.id}`}
              className="inline-flex items-center px-4 py-2 bg-white text-gray-900 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
            >
              상세 보기
              <ArrowRightIcon className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">
              {project.name}
            </h3>
            <p className="text-indigo-600 font-semibold">{project.type}</p>
          </div>
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            haccpStatus.color
          }`}>
            HACCP {haccpStatus.label}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <MapPinIcon className="w-5 h-5 text-indigo-600 mx-auto mb-1" />
            <div className="text-sm text-gray-600">위치</div>
            <div className="font-semibold text-gray-900 text-sm">{project.location}</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <BuildingOfficeIcon className="w-5 h-5 text-green-600 mx-auto mb-1" />
            <div className="text-sm text-gray-600">면적</div>
            <div className="font-semibold text-gray-900 text-sm">{project.area}</div>
          </div>
        </div>

        <div className="text-center p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg mb-4">
          <CurrencyDollarIcon className="w-6 h-6 text-green-600 mx-auto mb-2" />
          <div className="text-sm text-gray-600">절감액</div>
          <div className="text-2xl font-bold text-green-600">{project.savings}</div>
        </div>

        <div className="space-y-2 mb-6">
          {project.features.slice(0, 3).map((feature, idx) => (
            <div key={idx} className="flex items-center text-sm text-gray-600">
              <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2" />
              {feature}
            </div>
          ))}
        </div>

        <Link
          href={`/projects/${project.id}`}
          className="w-full flex items-center justify-center px-4 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors group-hover:shadow-lg"
        >
          상세 프로젝트 데이터 보기
          <ArrowRightIcon className="w-4 h-4 ml-2" />
        </Link>
      </div>
    </div>
  );
}
