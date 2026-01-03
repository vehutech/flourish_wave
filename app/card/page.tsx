'use client';

import Image from 'next/image';
import React from 'react';

// TypeScript interfaces
interface Employee {
  name: string;
  role: string;
  photo: string;
}

interface EmployeesData {
  [key: string]: Employee;
}

// Sample employees data - replace with your actual employees.json
const employeesData: EmployeesData = {
  "joseph-clement": {
    name: "Joseph Clement",
    role: "House Keeper",
    photo: "/api/placeholder/300/300"
  },
  "mary-johnson": {
    name: "Mary Johnson",
    role: "Front Desk Manager",
    photo: "/api/placeholder/300/300"
  }
};

export default function EmployeeCard() {
  // Get the employee ID from URL query parameter
  const params = typeof window !== 'undefined' 
    ? new URLSearchParams(window.location.search) 
    : new URLSearchParams();
  const id = params.get('id');
  
  // DEBUG: Log everything
  console.log('=== EMPLOYEE CARD DEBUG ===');
  console.log('Full URL:', typeof window !== 'undefined' ? window.location.href : 'Server-side');
  console.log('Search params:', typeof window !== 'undefined' ? window.location.search : 'Server-side');
  console.log('Extracted ID:', id);
  console.log('ID type:', typeof id);
  console.log('Available employee keys:', Object.keys(employeesData));
  console.log('Does employee exist?', id ? (id in employeesData) : 'No ID');
  console.log('Employee data:', id && employeesData[id] ? employeesData[id] : 'Not found');
  console.log('========================');
  
  // Get employee data directly - no need for state since it's derived from the URL
  const employee: Employee | null = id && employeesData[id] ? employeesData[id] : null;

  if (!employee) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Employee Not Found</h2>
          <p className="text-gray-600">Please check the QR code and try again.</p>
          <div className="mt-6 p-4 bg-white rounded-lg shadow text-left max-w-md">
            <h3 className="font-bold mb-2">Debug Info:</h3>
            <p className="text-sm text-gray-600 mb-1">
              <strong>ID from URL:</strong> {id || 'null/undefined'}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Available IDs:</strong> {Object.keys(employeesData).join(', ')}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Full URL:</strong> {typeof window !== 'undefined' ? window.location.href : 'Loading...'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden relative">
          
          {/* Background Pattern - inspired by the physical card */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-8 left-8 w-12 h-12 border-4 border-orange-500 rounded-full"></div>
            <div className="absolute top-20 right-12 w-8 h-8 border-4 border-orange-500 rounded-full"></div>
            <div className="absolute top-40 left-16 text-6xl text-orange-500">☎</div>
            <div className="absolute top-32 right-8 text-5xl text-orange-500">✉</div>
            <div className="absolute bottom-32 left-8 text-4xl text-orange-500">📧</div>
          </div>

          {/* Header with Logo */}
          <div className="relative pt-8 pb-6 px-6 text-center">
            <div className="inline-flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-500 rounded-md flex items-center justify-center text-white font-bold text-xl">
                R
              </div>
              <div className="text-left">
                <div className="text-orange-500 font-bold text-xl leading-none">Flourish Wave</div>
                <div className="text-gray-600 text-xs uppercase tracking-wider">Hotel & Suite</div>
              </div>
            </div>
          </div>

          {/* Photo Section */}
          <div className="relative px-6 pb-4 flex justify-center">
            <div className="relative">
              <div className="w-48 h-48 rounded-full overflow-hidden border-8 border-orange-500 bg-white shadow-xl">
                <Image 
                  src={employee.photo} 
                  alt={employee.name}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Orange Wave Section */}
          <div className="relative bg-orange-500 pt-8 pb-16">
            {/* Decorative dots */}
            <div className="absolute right-8 top-8 grid grid-cols-5 gap-1.5">
              {[...Array(15)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 bg-orange-700 rounded-full"></div>
              ))}
            </div>

            {/* Wave pattern overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-20 overflow-hidden">
              <svg viewBox="0 0 1200 120" className="w-full h-full">
                <pattern id="wave-pattern" x="0" y="0" width="60" height="10" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="5" x2="60" y2="5" stroke="#ea580c" strokeWidth="3"/>
                </pattern>
                <rect width="1200" height="120" fill="url(#wave-pattern)"/>
              </svg>
            </div>

            {/* Name and Role */}
            <div className="relative text-center px-6">
              <h1 className="text-3xl font-bold text-gray-900 uppercase tracking-wide mb-1">
                {employee.name}
              </h1>
              <p className="text-sm text-gray-800 uppercase tracking-widest font-semibold">
                {employee.role}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 py-12 text-center">
            <div className="text-lg font-semibold text-gray-700 mb-2">
              Flourish Wave Hotel & Suite
            </div>
            <div className="text-sm text-gray-500 italic">
              Your Comfort, Our Priority
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}