// 로컬 스토리지 데이터 관리 시스템

export interface ProjectData {
  id: string;
  name: string;
  location: {
    province: string;
    city: string;
  };
  size: number; // 평수
  purpose: string;
  facilities: string[];
  budget: {
    total: number;
    construction: number;
    facilities: number;
    haccp: number;
    permits: number;
    contingency: number;
  };
  timeline: {
    startDate: string;
    expectedEndDate: string;
    phases: Array<{
      name: string;
      duration: number; // 일수
      cost: number;
      status: 'pending' | 'in-progress' | 'completed';
    }>;
  };
  haccp: {
    status: 'not-started' | 'preparation' | 'review' | 'approved';
    documents: string[];
    requirements: Array<{
      name: string;
      completed: boolean;
      required: boolean;
    }>;
  };
  createdAt: string;
  updatedAt: string;
}


class ProjectStorage {
  private readonly STORAGE_KEY = 'offro_projects';
  private readonly CURRENT_PROJECT_KEY = 'offro_current_project';

  // 모든 프로젝트 가져오기
  getAllProjects(): ProjectData[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('프로젝트 데이터 로드 실패:', error);
      return [];
    }
  }

  // 프로젝트 저장
  saveProject(project: ProjectData): void {
    if (typeof window === 'undefined') return;

    try {
      const projects = this.getAllProjects();
      const existingIndex = projects.findIndex(p => p.id === project.id);
      
      if (existingIndex >= 0) {
        projects[existingIndex] = { ...project, updatedAt: new Date().toISOString() };
      } else {
        projects.push(project);
      }
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(projects));
    } catch (error) {
      console.error('프로젝트 저장 실패:', error);
    }
  }

  // 프로젝트 가져오기
  getProject(id: string): ProjectData | null {
    const projects = this.getAllProjects();
    return projects.find(p => p.id === id) || null;
  }

  // 프로젝트 삭제
  deleteProject(id: string): void {
    if (typeof window === 'undefined') return;

    try {
      const projects = this.getAllProjects();
      const filteredProjects = projects.filter(p => p.id !== id);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredProjects));
    } catch (error) {
      console.error('프로젝트 삭제 실패:', error);
    }
  }

  // 현재 프로젝트 설정
  setCurrentProject(id: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.CURRENT_PROJECT_KEY, id);
  }

  // 현재 프로젝트 가져오기
  getCurrentProject(): ProjectData | null {
    if (typeof window === 'undefined') return null;
    
    try {
      const currentId = localStorage.getItem(this.CURRENT_PROJECT_KEY);
      return currentId ? this.getProject(currentId) : null;
    } catch (error) {
      console.error('현재 프로젝트 로드 실패:', error);
      return null;
    }
  }

  // 새 프로젝트 생성
  createNewProject(initialData: Partial<ProjectData>): ProjectData {
    const now = new Date().toISOString();
    const newProject: ProjectData = {
      id: `project_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: initialData.name || '새 프로젝트',
      location: initialData.location || { province: '', city: '' },
      size: initialData.size || 0,
      purpose: initialData.purpose || '',
      facilities: initialData.facilities || [],
      budget: {
        total: 0,
        construction: 0,
        facilities: 0,
        haccp: 0,
        permits: 0,
        contingency: 0,
        ...initialData.budget
      },
      timeline: {
        startDate: initialData.timeline?.startDate || '',
        expectedEndDate: initialData.timeline?.expectedEndDate || '',
        phases: initialData.timeline?.phases || []
      },
      haccp: {
        status: 'not-started',
        documents: [],
        requirements: [
          { name: 'HACCP 계획서 작성', completed: false, required: true },
          { name: '위해요소 분석', completed: false, required: true },
          { name: '중요관리점 설정', completed: false, required: true },
          { name: '모니터링 절차 수립', completed: false, required: true },
          { name: '시정조치 절차 수립', completed: false, required: true },
          { name: '검증 절차 수립', completed: false, required: true },
          { name: '기록유지 절차 수립', completed: false, required: true }
        ],
        ...initialData.haccp
      },
      createdAt: now,
      updatedAt: now
    };

    this.saveProject(newProject);
    this.setCurrentProject(newProject.id);
    return newProject;
  }

  // 프로젝트 통계
  getProjectStats() {
    const projects = this.getAllProjects();
    const totalProjects = projects.length;
    const completedProjects = projects.filter(p => 
      p.timeline.phases.every(phase => phase.status === 'completed')
    ).length;
    const totalBudget = projects.reduce((sum, p) => sum + p.budget.total, 0);
    const averageBudget = totalProjects > 0 ? totalBudget / totalProjects : 0;

    return {
      totalProjects,
      completedProjects,
      inProgressProjects: totalProjects - completedProjects,
      totalBudget,
      averageBudget
    };
  }
}

export const projectStorage = new ProjectStorage();
