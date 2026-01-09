'use client';

import { useState, useEffect } from 'react';
import NewsItem from '@/app/components/NewsItem';
import { slideImages, News1, News2 } from '@/data/mockData';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [key, setKey] = useState(0);

  const handleSlideClick = (index: number) => {
    setCurrentSlide(index);
    setKey(prev => prev + 1);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slideImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [key]);

  return (
    <div className="w-full min-h-screen flex flex-col items-center px-4 md:px-25 pt-8 md:pt-30 pb-8 md:pb-30">
      <div className="w-full h-48 md:h-62.5 bg-black rounded-2xl overflow-hidden relative">
        <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {slideImages.map((src, index) => (
            <img key={index} src={src} alt={`Slide ${index + 1}`} className="w-full h-48 md:h-62.5 object-cover shrink-0" />
          ))}
        </div>
      </div>

      <div className="flex flex-row justify-center mt-4 md:mt-6.25 gap-3">
        {slideImages.map((_, index) => (
          <button key={index} onClick={() => handleSlideClick(index)} className={`w-2 h-2 rounded-full transition-colors ${currentSlide === index ? 'bg-red-800' : 'bg-gray-300'}`} />
        ))}
      </div>

      <div className="w-full flex flex-col lg:flex-row justify-between gap-4 lg:gap-9 mt-8 md:mt-17">
        <div className="w-full flex flex-col gap-4 lg:gap-8">
          <h2 className="text-red-800 font-bold text-lg md:text-xl">이슈 트렌딩 요약</h2>
          <div className="w-full h-48 md:h-70 bg-white border border-gray-300 rounded-2xl"></div>
        </div>
        <div className="w-full flex flex-col gap-4 lg:gap-8">
          <h2 className="text-red-800 font-bold text-lg md:text-xl">이슈 트렌딩 요약</h2>
          <div className="w-full h-48 md:h-70 bg-white border border-gray-300 rounded-2xl"></div>
        </div>
      </div>

      <div className="w-full flex flex-col gap-8 md:gap-13 mt-8 md:mt-17">
        <h2 className="text-lg md:text-xl font-bold text-gray-800">username님을 위한 최신 뉴스</h2>
        <div className="w-full gap-6 md:gap-10 flex flex-col">
          {News1.map((news, index) => (
            <NewsItem key={index} source={news.source} title={news.title} content={news.content} />
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col gap-8 md:gap-13 mt-8 md:mt-17">
        <h2 className="text-lg md:text-xl font-bold text-gray-800">따끈따끈한 이슈</h2>
        <div className="w-full gap-6 md:gap-10 flex flex-col">
          {News2.map((news, index) => (
            <NewsItem key={index} source={news.source} title={news.title} content={news.content} />
          ))}
        </div>
      </div>
    </div>
  );
}
