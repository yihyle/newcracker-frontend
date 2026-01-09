'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/public/images/logo.png';
import { Icons } from '@/icons/index';

function LoginHeader() {
  return (
    <div className="flex flex-row justify-center items-center gap-3 sm:gap-12.5">
      <div className="relative hidden sm:block">
        <input className="w-64 lg:w-86.25 h-8.75 outline-none border border-gray-300 px-4 pr-10 rounded-full text-sm placeholder:text-sm duration-200 focus:border-[#800020]" placeholder="세계 뉴스 검색하기..." />
        <Image src={Icons.Search} alt="search" className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 select-none cursor-pointer" />
      </div>
      <div className="flex flex-row justify-center gap-2 sm:gap-6.25">
        <Link href={'/login'} className="w-8.75 h-8.75 bg-white border border-gray-300 rounded-full flex justify-center items-center cursor-pointer duration-200 hover:bg-[#f5f5f5]">
          <Image src={Icons.Login} alt="login" className="w-4 h-4 select-none" />
        </Link>
        <Link href={'/register'} className="w-8.75 h-8.75 bg-[#800020] rounded-full flex justify-center items-center cursor-pointer">
          <Image src={Icons.Register} alt="register" className="w-4 h-4 select-none" />
        </Link>
      </div>
    </div>
  );
}

function NotLoginHeader() {
  return (
    <div className="flex flex-row justify-center items-center gap-3 sm:gap-7.5">
      <div className="relative hidden sm:block">
        <input className="w-72 lg:w-106 h-8.75 outline-none border border-gray-300 px-4 pr-10 rounded-full text-sm placeholder:text-sm" placeholder="세계 뉴스 검색하기..." />
        <Image src={Icons.Search} alt="search" className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 select-none cursor-pointer" />
      </div>
      <div className="w-8.75 h-8.75 bg-[#800020] rounded-full flex justify-center items-center cursor-pointer">
        <Image src={Icons.User} alt="login" className="w-4 h-4 select-none" />
      </div>
    </div>
  );
}

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('accessToken'));
  }, []);

  const hideHeaderPages = ['/login', '/register'];
  if (hideHeaderPages.includes(pathname)) {
    return null;
  }

  return (
    <div className="w-full h-17.5 bg-white border-b border-gray-300 flex flex-row items-center justify-between fixed px-4 sm:px-8 lg:px-25 z-50">
      <Link href={'/'}>
        <Image src={Logo} alt="logo" className="w-auto h-8 sm:h-10" />
      </Link>

      <div className="hidden md:flex flex-row justify-center items-center gap-8 lg:gap-17.5">
        <Link href={'/'} className="text-sm lg:text-[16px] font-medium text-gray-900 whitespace-nowrap">
          오늘의 뉴스
        </Link>
        <Link href={'/'} className="text-sm lg:text-[16px] font-medium text-gray-900 whitespace-nowrap">
          뉴스 트렌드
        </Link>
        <Link href={'/'} className="text-sm lg:text-[16px] font-medium text-gray-900 whitespace-nowrap">
          마이 뉴스
        </Link>
      </div>

      {isLoggedIn ? <NotLoginHeader /> : <LoginHeader />}
    </div>
  );
}
