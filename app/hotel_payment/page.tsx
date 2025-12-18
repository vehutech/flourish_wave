"use client"
import React, { useState } from 'react';

export default function MoniepointPayment() {
  const [showToast, setShowToast] = useState(false);
  
  const copyAccount = () => {
    const accountNumber = '5187779100';
    navigator.clipboard.writeText(accountNumber).then(() => {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    }).catch(() => {
      alert('Account number: ' + accountNumber);
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#f5d5c8] via-[#e8c4b8] to-[#d4b5a8]">
      <div className="absolute w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[600px] md:h-[600px] bg-[#e67844] rounded-full bottom-[-150px] sm:bottom-[-200px] left-[-150px] sm:left-[-100px] opacity-80"></div>
      <div className="absolute w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] border-2 border-white/30 rounded-full top-[-100px] sm:top-[-100px] left-[50px] sm:left-[100px]"></div>
      
      <div className="bg-white/95 p-6 sm:p-8 md:p-12 lg:p-16 rounded-3xl shadow-2xl text-center max-w-md w-[90%] relative z-10">
        <h1 className="text-lg sm:text-xl md:text-2xl font-black text-[#2c2c2c] mb-4 sm:mb-5 tracking-wide px-2">
          Oluwaseto Nigeria Enterprises
        </h1>
        
        <div 
          onClick={copyAccount}
          className="text-4xl sm:text-5xl md:text-6xl font-black text-black my-6 sm:my-8 tracking-wider leading-tight cursor-pointer p-4 sm:p-6 md:p-8 bg-gradient-to-br from-white to-gray-50 rounded-2xl transition-all duration-300 border-4 border-transparent hover:border-blue-600 hover:shadow-xl hover:scale-105 active:scale-95 select-none"
        >
          5187779100
        </div>
        
        <p className="text-sm sm:text-base md:text-lg font-bold text-blue-600 mt-3 sm:mt-4 uppercase tracking-wider px-2">
          Click to Copy Account Number
        </p>
        
        <div className="flex items-center justify-center mt-8 sm:mt-10 gap-2 sm:gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-xl flex items-center justify-center text-2xl sm:text-3xl font-black text-white">
            M
          </div>
          <div className="text-2xl sm:text-3xl font-black text-black">
            Monie<span className="font-normal">point</span>
          </div>
        </div>
        
        <div className="mt-8 sm:mt-10 pt-4 sm:pt-5 border-t-2 border-gray-200">
          <p className="text-sm sm:text-base font-bold text-[#2c2c2c] px-2">
            Flourish Wave Hotel & Suite
          </p>
        </div>
      </div>
      
      <div className={`fixed top-4 sm:top-8 left-1/2 -translate-x-1/2 sm:left-auto sm:right-8 sm:translate-x-0 bg-green-500 text-white px-6 sm:px-8 py-4 sm:py-5 rounded-xl text-sm sm:text-base font-bold shadow-2xl transition-all duration-300 z-50 ${showToast ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5 pointer-events-none'}`}>
        Account number copied! ✓
      </div>
    </div>
  );
}