'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import API from '@/lib/axios';
import Image from 'next/image';
import LoginLogo from '@/public/images/loginlogo.png';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function Register() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [interests, setInterests] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const interest = ['정치', '경제', '사회', '생활/문화', 'IT/과학', '스포츠', '세계', '연예'];

  const validateStep1 = () => {
    if (password.length < 8) {
      toast.error('비밀번호는 8자 이상이어야 합니다');
      return false;
    }
    if (password !== confirmPassword) {
      toast.error('비밀번호가 일치하지 않습니다');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!nickname.trim()) {
      toast.error('닉네임을 입력해주세요');
      return false;
    }
    if (!interests) {
      toast.error('관심 분야를 선택해주세요');
      return false;
    }
    return true;
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;

    setIsSubmitting(true);
    try {
      await API.post('/api/auth/signup', {
        email,
        password,
        nickname: nickname.trim(),
        interests
      });
      toast.success('회원가입이 완료되었습니다! 로그인해주세요.');
      router.push('/login');
    } catch (err: any) {
      toast.error('회원가입에 실패했습니다');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <form onSubmit={step === 1 ? handleNext : handleSubmit} className="w-105 bg-white border border-gray-300 py-12.5 px-10 shadow-lg rounded-[20px] flex flex-col items-center gap-10">
        <Image src={LoginLogo} alt="logo" className="w-auto h-26.5 select-none" />

        {step === 1 ? (
          <>
            <div className="w-full flex flex-col">
              <label className="text-[#333333] text-xs font-medium">이메일</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full h-10 bg-white border-b border-gray-300 outline-none text-sm duration-300 px-1 focus:border-[#800020]" />
            </div>
            <div className="w-full flex flex-col">
              <label className="text-[#333333] text-xs font-medium">비밀번호</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full h-10 bg-white border-b border-gray-300 outline-none text-sm duration-300 px-1 focus:border-[#800020]" />
            </div>
            <div className="w-full flex flex-col">
              <label className="text-[#333333] text-xs font-medium">비밀번호 확인</label>
              <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required className="w-full h-10 bg-white border-b border-gray-300 outline-none text-sm duration-300 px-1 focus:border-[#800020]" />
            </div>
          </>
        ) : (
          <>
            <div className="w-full flex flex-col">
              <label className="text-[#333333] text-xs font-medium">닉네임</label>
              <input type="text" value={nickname} onChange={e => setNickname(e.target.value)} required className="w-full h-10 bg-white border-b border-gray-300 outline-none text-sm duration-300 px-1 focus:border-[#800020]" />
            </div>
            <div className="w-full flex flex-col">
              <label className="text-[#333333] text-xs font-medium">관심 분야</label>
              <select value={interests} onChange={e => setInterests(e.target.value)} required className="w-full h-10 bg-white border border-gray-300 rounded-lg outline-none text-sm duration-300 px-1 focus:border-[#800020] mt-2">
                <option value="">관심 분야를 선택하세요</option>
                {interest.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        <div className="w-full flex flex-col items-center">
          <button type="submit" disabled={isSubmitting} className="w-full h-10 bg-[#800020] text-white text-sm font-bold rounded-lg cursor-pointer">
            {step === 1 ? '다음' : isSubmitting ? '가입 중...' : '회원가입'}
          </button>
          <p className="text-xs font-semibold text-gray-400 mt-5">이미 회원이신가요?</p>
          <Link href="/login" className="text-xs font-medium text-[#0088FF] underline">
            New Cracker 로그인
          </Link>
        </div>
      </form>
    </div>
  );
}
