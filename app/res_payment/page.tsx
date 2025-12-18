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
      <div className="absolute w-[600px] h-[600px] bg-[#e67844] rounded-full bottom-[-200px] left-[-100px] opacity-80"></div>
      <div className="absolute w-[400px] h-[400px] border-2 border-white/30 rounded-full top-[-100px] left-[100px]"></div>
      
      <div className="bg-white/95 p-12 md:p-16 rounded-3xl shadow-2xl text-center max-w-md w-[90%] relative z-10">
        <h1 className="text-xl md:text-2xl font-black text-[#2c2c2c] mb-5 tracking-wide">
          Oluwaseto Nigeria Enterprises
        </h1>
        
        <div 
          onClick={copyAccount}
          className="text-5xl md:text-6xl font-black text-black my-8 tracking-wider leading-tight cursor-pointer p-6 md:p-8 bg-gradient-to-br from-white to-gray-50 rounded-2xl transition-all duration-300 border-4 border-transparent hover:border-blue-600 hover:shadow-xl hover:scale-105 active:scale-95"
        >
          5187779100
        </div>
        
        <p className="text-lg font-bold text-blue-600 mt-4 uppercase tracking-wider">
          Click to Copy Account Number
        </p>
        
        <div className="flex items-center justify-center mt-10 gap-3">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-3xl font-black text-white">
            M
          </div>
          <div className="text-3xl font-black text-black">
            Monie<span className="font-normal">point</span>
          </div>
        </div>
        
        <div className="mt-10 pt-5 border-t-2 border-gray-200">
          <p className="text-base font-bold text-[#2c2c2c]">
            Flourish Wave Hotel & Suite
          </p>
        </div>
      </div>

      <div className={`fixed top-8 right-8 bg-green-500 text-white px-8 py-5 rounded-xl text-base font-bold shadow-2xl transition-all duration-300 z-50 ${showToast ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5 pointer-events-none'}`}>
        Account number copied! ✓
      </div>
    </div>
  );
}