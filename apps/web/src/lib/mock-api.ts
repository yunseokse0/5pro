// Mock API Client for Vercel demo (no backend needed)

import {
  mockUser,
  mockProjects,
  mockEstimates,
  mockVisual3D,
  mockContracts,
  mockPartners,
  mockLeads,
  mockCatalog,
  mockRegions,
  mockPresets,
  mockAuditLogs,
  mockStats,
} from './mock-data';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export class MockApiClient {
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
  }

  async get<T>(endpoint: string): Promise<T> {
    await delay(300); // Simulate network delay

    // Parse endpoint
    const [path, query] = endpoint.split('?');
    const segments = path.split('/').filter(Boolean);

    // Handle different endpoints
    if (path === '/projects') {
      return {
        data: mockProjects,
        pagination: { page: 1, limit: 10, total: mockProjects.length, totalPages: 1 },
      } as T;
    }

    if (path.startsWith('/projects/') && segments.length === 2) {
      const id = segments[1];
      const project = mockProjects.find((p) => p.id === id);
      return project as T;
    }

    if (path === '/estimates') {
      return {
        data: mockEstimates,
        pagination: { page: 1, limit: 10, total: mockEstimates.length, totalPages: 1 },
      } as T;
    }

    if (path === '/visual3d') {
      return {
        data: mockVisual3D,
        pagination: { page: 1, limit: 10, total: mockVisual3D.length, totalPages: 1 },
      } as T;
    }

    if (path === '/contracts') {
      return {
        data: mockContracts,
        pagination: { page: 1, limit: 10, total: mockContracts.length, totalPages: 1 },
      } as T;
    }

    if (path === '/partners') {
      return {
        data: mockPartners,
        pagination: { page: 1, limit: 10, total: mockPartners.length, totalPages: 1 },
      } as T;
    }

    if (path === '/leads') {
      return {
        data: mockLeads,
        pagination: { page: 1, limit: 10, total: mockLeads.length, totalPages: 1 },
      } as T;
    }

    if (path === '/catalog') {
      return {
        data: mockCatalog,
        pagination: { page: 1, limit: 10, total: mockCatalog.length, totalPages: 1 },
      } as T;
    }

    if (path === '/regions') {
      return mockRegions as T;
    }

    if (path === '/presets') {
      return mockPresets as T;
    }

    if (path === '/audit-logs') {
      return {
        data: mockAuditLogs,
        pagination: { page: 1, limit: 20, total: mockAuditLogs.length, totalPages: 1 },
      } as T;
    }

    return {} as T;
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    await delay(300);

    if (endpoint === '/auth/login') {
      if (data.email === 'admin@5pro.local' && data.password === 'Admin!234') {
        return {
          token: 'mock-jwt-token',
          user: mockUser,
        } as T;
      }
      throw new Error('Invalid credentials');
    }

    return { id: 'new-id', ...data } as T;
  }

  async put<T>(endpoint: string, data: any): Promise<T> {
    await delay(300);
    return data as T;
  }

  async delete<T>(endpoint: string): Promise<T> {
    await delay(300);
    return { message: 'Deleted successfully' } as T;
  }
}

// Use mock API in production/demo mode
const isMockMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';
export const apiClient = isMockMode ? new MockApiClient() : require('./api').apiClient;

