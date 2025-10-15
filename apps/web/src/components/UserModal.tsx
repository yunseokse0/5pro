'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@5pro/ui';
import { Button, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@5pro/ui';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const userSchema = z.object({
  name: z.string().min(1, '이름을 입력하세요'),
  email: z.string().email('올바른 이메일을 입력하세요'),
  phone: z.string().optional(),
  roleId: z.string().min(1, '역할을 선택하세요'),
  status: z.string().min(1, '상태를 선택하세요'),
});

type UserFormData = z.infer<typeof userSchema>;

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UserFormData) => void;
  user?: any;
  isEdit?: boolean;
}

const roles = [
  { id: '1', name: 'admin', label: '관리자' },
  { id: '2', name: 'manager', label: '매니저' },
  { id: '3', name: 'user', label: '사용자' },
];

const statuses = [
  { value: 'active', label: '활성' },
  { value: 'pending', label: '대기중' },
  { value: 'inactive', label: '비활성' },
];

export default function UserModal({ isOpen, onClose, onSubmit, user, isEdit = false }: UserModalProps) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      roleId: '',
      status: 'active',
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (isEdit && user) {
        reset({
          name: user.name || '',
          email: user.email || '',
          phone: user.phone || '',
          roleId: user.role?.id || '',
          status: user.status || 'active',
        });
      } else {
        reset({
          name: '',
          email: '',
          phone: '',
          roleId: '',
          status: 'active',
        });
      }
    }
  }, [isOpen, isEdit, user, reset]);

  const handleFormSubmit = async (data: UserFormData) => {
    setLoading(true);
    try {
      await onSubmit(data);
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? '사용자 수정' : '새 사용자 생성'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">이름 *</Label>
            <Input
              id="name"
              {...register('name')}
              placeholder="사용자 이름을 입력하세요"
            />
            {errors.name && (
              <p className="text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">이메일 *</Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              placeholder="user@example.com"
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">전화번호</Label>
            <Input
              id="phone"
              {...register('phone')}
              placeholder="010-1234-5678"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="roleId">역할 *</Label>
            <Select onValueChange={(value) => register('roleId').onChange({ target: { value } })}>
              <SelectTrigger>
                <SelectValue placeholder="역할을 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role.id} value={role.id}>
                    {role.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.roleId && (
              <p className="text-sm text-red-600">{errors.roleId.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">상태 *</Label>
            <Select onValueChange={(value) => register('status').onChange({ target: { value } })}>
              <SelectTrigger>
                <SelectValue placeholder="상태를 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.status && (
              <p className="text-sm text-red-600">{errors.status.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              취소
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? '처리 중...' : (isEdit ? '수정' : '생성')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
