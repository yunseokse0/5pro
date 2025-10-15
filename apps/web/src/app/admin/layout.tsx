'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  FileText, 
  Box, 
  FolderKanban, 
  FileSignature, 
  Users, 
  UserPlus, 
  Package, 
  Settings, 
  LogOut,
  UserCog
} from 'lucide-react';
import { Button } from '@5pro/ui';

const navItems = [
  { href: '/admin', label: '대시보드', icon: LayoutDashboard },
  { href: '/admin/users', label: '사용자 관리', icon: UserCog },
  { href: '/admin/estimates', label: '견적', icon: FileText },
  { href: '/admin/visual3d', label: '3D 시각화', icon: Box },
  { href: '/admin/projects', label: '프로젝트', icon: FolderKanban },
  { href: '/admin/contracts', label: '계약', icon: FileSignature },
  { href: '/admin/partners', label: '파트너', icon: Users },
  { href: '/admin/leads', label: '리드', icon: UserPlus },
  { href: '/admin/catalog', label: '카탈로그', icon: Package },
  { href: '/admin/settings', label: '설정', icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">로딩 중...</div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    router.push('/auth/signin');
    return null;
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-4 border-b border-gray-800">
          <h1 className="text-xl font-bold">5PRO</h1>
          <p className="text-sm text-gray-400">{session?.user?.name}</p>
          <p className="text-xs text-gray-500">{session?.user?.role?.name}</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-gray-800">
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
            onClick={() => signOut({ callbackUrl: '/auth/signin' })}
          >
            <LogOut className="w-5 h-5 mr-3" />
            로그아웃
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-50">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}

