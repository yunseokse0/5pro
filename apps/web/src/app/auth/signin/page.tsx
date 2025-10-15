'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button, Input, Label, Card, CardHeader, CardTitle, CardDescription, CardContent } from '@5pro/ui';

const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('이메일 또는 비밀번호가 올바르지 않습니다');
      } else {
        router.push('/admin');
      }
    } catch (error) {
      setError('로그인 중 오류가 발생했습니다');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">5PRO 로그인</CardTitle>
          <CardDescription>
            공장 건설 관리 시스템에 로그인하세요
          </CardDescription>
          {isDemoMode && (
            <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-sm text-blue-800">
              🎭 데모 모드 - Mock 데이터로 동작 중
            </div>
          )}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                placeholder={isDemoMode ? "admin@5pro.local 또는 demo@5pro.local" : "admin@5pro.local"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">비밀번호</Label>
              <Input
                id="password"
                type="password"
                placeholder={isDemoMode ? "아무거나 입력 (데모)" : "••••••••"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <div className="text-sm text-red-600">{error}</div>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? '로그인 중...' : '로그인'}
            </Button>
          </form>
          <div className="mt-4 text-sm text-gray-600">
            {isDemoMode ? (
              <>
                <p className="font-semibold mb-2">데모 계정:</p>
                <p>이메일: admin@5pro.local 또는 demo@5pro.local</p>
                <p>비밀번호: 아무거나 입력하세요</p>
                <p className="mt-2 text-xs text-gray-500">
                  * 데모 모드에서는 실제 인증 없이 바로 로그인됩니다
                </p>
              </>
            ) : (
              <>
                <p>테스트 계정:</p>
                <p>이메일: admin@5pro.local</p>
                <p>비밀번호: Admin!234</p>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
