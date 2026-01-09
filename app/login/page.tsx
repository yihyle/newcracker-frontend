'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import API from '@/lib/axios';
import Image from 'next/image';
import LoginLogo from '@/public/images/loginlogo.png';
import Link from 'next/link';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await API.post('/api/auth/login', {
        email: email,
        password: password
      });

      const accessToken = response.data.data.accessToken;
      const refreshToken = response.data.data.refreshToken;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      router.push('/');
    } catch (err: unknown) {
      setError((err as Error).message || '로그인 실패');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit} className="w-105 bg-white border border-gray-300 py-12.5 px-10 shadow-lg rounded-[20px] flex flex-col items-center gap-10">
        {error && <p className="text-red-500 text-">{error}</p>}
        <Image src={LoginLogo} alt="logo" className="w-auto h-26.5 select-none" />

        <div className="w-full flex flex-col">
          <label className="text-[#333333] text-xs font-medium">이메일</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full h-10 bg-white border-b border-gray-300 outline-none text-sm duration-300 px-1 focus:border-[#800020]" />
        </div>
        <div className="w-full flex flex-col">
          <label className="text-[#333333] text-xs font-medium">비밀번호</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full h-10 bg-white border-b border-gray-300 outline-none text-sm duration-300 px-1 focus:border-[#800020]" />
        </div>

        <div className="w-full flex flex-col items-center">
          <button type="submit" disabled={isSubmitting} className="w-full h-10 bg-[#800020] text-white text-sm font-bold rounded-lg cursor-pointer">
            {isSubmitting ? '로그인 중...' : '로그인'}
          </button>
          <p className="text-xs font-semibold text-gray-400 mt-5">계정이 없으신가요?</p>
          <Link href="/register" className="text-xs font-medium text-[#0088FF] underline">
            New Cracker 가입하기
          </Link>
        </div>
      </form>
    </div>
  );
}
