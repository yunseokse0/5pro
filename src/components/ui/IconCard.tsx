'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface IconCardProps {
  title: string;
  description?: string;
  icon: LucideIcon;
  href?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'gradient' | 'outline';
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10', 
  lg: 'w-12 h-12'
};

const variantClasses = {
  default: 'bg-white border border-gray-200 shadow-sm hover:shadow-md',
  gradient: 'bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200 shadow-sm hover:shadow-md',
  outline: 'bg-transparent border-2 border-gray-300 hover:border-blue-500'
};

export default function IconCard({ 
  title, 
  description, 
  icon: Icon, 
  href, 
  className = '',
  size = 'md',
  variant = 'gradient'
}: IconCardProps) {
  const cardContent = (
    <div className={`flex flex-col items-center justify-center p-6 rounded-2xl transition-all duration-200 hover:scale-105 ${variantClasses[variant]} ${className}`}>
      <div className={`${sizeClasses[size]} rounded-xl flex items-center justify-center mb-3`}>
        <Icon 
          className="w-6 h-6 text-blue-700" 
          strokeWidth={2.2}
        />
      </div>
      <h3 className="font-semibold text-gray-800 text-base mb-1 text-center">{title}</h3>
      {description && (
        <p className="text-sm text-gray-500 text-center leading-relaxed">{description}</p>
      )}
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block">
        {cardContent}
      </a>
    );
  }

  return cardContent;
}
