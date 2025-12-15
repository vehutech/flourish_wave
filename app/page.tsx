"use client"

import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Plus, Minus, ChevronDown, Search, X } from 'lucide-react';
import Image from 'next/image';

interface MenuItem {
  name: string;
  price: number;
}

interface MenuCategory {
  title: string;
  items: MenuItem[];
}

interface CartItem extends MenuItem {
  quantity: number;
}

interface SearchableItem extends MenuItem {
  category: string;
}

const FlourishWaveFoods: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  const [tableNumber, setTableNumber] = useState<string>('');
  const [specialInstructions, setSpecialInstructions] = useState<string>('');
  const [showCheckout, setShowCheckout] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isScrollingProgrammatically = useRef<boolean>(false);

  const restaurantWhatsApp = '2349035011663';

  const menuCategories: MenuCategory[] = [
    {
      title: "Hot Tea & Coffee",
      items: [
        { name: "Arabian Tea (Big Jug)", price: 5000 },
        { name: "Arabian Tea (Small Jug)", price: 3000 },
        { name: "Gorura Tea (Big Jug)", price: 5000 },
        { name: "Gorura Tea (Small Jug)", price: 3000 },
        { name: "Green Tea", price: 2000 },
        { name: "Tea (served with milk)", price: 2500 },
        { name: "Black Tea (Selection Flavor)", price: 2500 },
      ]
    },
    {
      title: "Oats Meal & Custard",
      items: [
        { name: "Custard (served with milk)", price: 3000 },
        { name: "Oats Meal (served with milk)", price: 3000 },
      ]
    },
    {
      title: "Fresh Juice & Smoothies",
      items: [
        { name: "Watermelon", price: 2500 },
        { name: "Orange", price: 2500 },
        { name: "Pineapple", price: 3000 },
        { name: "Sugarcane & Ginger Juice", price: 2500 },
        { name: "Smoothie Juice", price: 4000 },
        { name: "Fruit Salad", price: 4000 },
        { name: "Apple Juice", price: 5000 },
      ]
    },
    {
      title: "Local Drinks",
      items: [
        { name: "Zobo", price: 1000 },
        { name: "Tiger Nut Drink", price: 2000 },
      ]
    },
    {
      title: "Protein",
      items: [
        { name: "Gizzard", price: 2000 },
        { name: "Fried Sauce Beef", price: 2000 },
        { name: "Grilled Chicken", price: 4000 },
        { name: "Whole Bird", price: 15000 },
        { name: "Grilled Fish (Medium)", price: 10000 },
        { name: "Grilled Fish (Large)", price: 12000 },
        { name: "Fried Ice Fish", price: 3000 },
        { name: "Fried Goat Meat", price: 4000 },
        { name: "Turkey", price: 6000 },
        { name: "Beef (Grilled)", price: 5000 },
        { name: "Fried Chicken", price: 4000 },
        { name: "Goat Meat Pepper Soup", price: 4000 },
        { name: "Fresh Fish", price: 5000 },
        { name: "Liver Sauce", price: 4000 },
        { name: "Asun Goat Meat", price: 4000 },
      ]
    },
    {
      title: "Sea Foods",
      items: [
        { name: "Prawns", price: 14000 },
        { name: "Shrimps", price: 14000 },
        { name: "Lobsters", price: 14000 },
        { name: "Calamari", price: 14000 },
      ]
    },
    {
      title: "Extra Side Dishes",
      items: [
        { name: "Moi Moi", price: 2000 },
        { name: "Plantain", price: 1000 },
        { name: "Chips", price: 3000 },
        { name: "Egg Sauce", price: 2000 },
        { name: "Fried Yam", price: 2000 },
        { name: "Omelette", price: 2000 },
        { name: "Boil Yam", price: 2000 },
        { name: "Sausage", price: 2000 },
        { name: "Golden Yam", price: 2500 },
        { name: "Masa", price: 2000 },
        { name: "Coleslaw", price: 1000 },
      ]
    },
    {
      title: "Pastry, Snacks & Popcorn",
      items: [
        { name: "Sausage Roll", price: 1000 },
        { name: "Meat Pie", price: 1500 },
        { name: "Chicken Pie", price: 1500 },
        { name: "Doughnut", price: 1000 },
        { name: "Pop-Corn", price: 3500 },
      ]
    },
    {
      title: "Burger & Shawarma Sandwich",
      items: [
        { name: "Chicken Shawarma (Large)", price: 5000 },
        { name: "Chicken Shawarma (Small)", price: 4000 },
        { name: "Beef Shawarma (Large)", price: 4500 },
        { name: "Beef Shawarma (Small)", price: 3500 },
        { name: "Shawarma Without Sausage (Mini)", price: 3500 },
        { name: "Burger", price: 4000 },
        { name: "Sandwich", price: 4000 },
      ]
    },
    {
      title: "Yoghurt",
      items: [
        { name: "Farm Fresh (1LTR)", price: 6500 },
        { name: "Farm Fresh (500ML)", price: 3500 },
        { name: "Flourish Yoghurt (Big)", price: 4500 },
        { name: "Flourish Blended Yoghurt (1LTR)", price: 5500 },
        { name: "Flourish Yoghurt (500ML)", price: 2500 },
        { name: "Flourish Yoghurt (250ML)", price: 1500 },
        { name: "Flourish Blended Yoghurt (500ML)", price: 3500 },
        { name: "Vita Milk", price: 2500 },
      ]
    },
    {
      title: "Drinks",
      items: [
        { name: "Water", price: 500 },
        { name: "Red Bull", price: 3000 },
        { name: "Power Horse", price: 3000 },
        { name: "Lucozade/Ribena", price: 1500 },
        { name: "Guiness/Maltina/Amstel", price: 1000 },
        { name: "Pure Heaven", price: 2000 },
        { name: "Cranberry", price: 6000 },
        { name: "Blue Bullet", price: 2000 },
        { name: "Climax", price: 1500 },
        { name: "Monster", price: 2000 },
        { name: "Fayrouz/Coke/Fanta/Sprite", price: 1000 },
      ]
    },
    {
      title: "Non-Alcolic Wine",
      items: [
        { name: "Eva/Pure Heaven/Tomaveleta/Rendezvous", price: 10000 },
        { name: "Jazzy", price: 10000 },
        { name: "Eisberg/Light", price: 15000 },
      ]
    },
    {
      title: "Rice Meals",
      items: [
        { name: "Flourish Special Rice", price: 4000 },
        { name: "Special Fried Rice", price: 4000 },
        { name: "Asun Rice", price: 4000 },
        { name: "Chinese Rice", price: 4000 },
        { name: "Coconut Rice", price: 4000 },
        { name: "Jollof Rice", price: 2000 },
        { name: "Fried Rice", price: 2000 },
        { name: "White Rice", price: 2000 },
      ]
    },
    {
      title: "Pasta & Noodles",
      items: [
        { name: "Spaghetti", price: 3000 },
        { name: "Noodles", price: 3000 },
        { name: "Sea Foods Pasta", price: 10000 },
      ]
    },
    {
      title: "Swallow Serve with Soup",
      items: [
        { name: "Eba/Garri", price: 4000 },
        { name: "Tuwo Shinkafa", price: 4000 },
        { name: "Wheat", price: 4000 },
        { name: "Poundo Yam", price: 4000 },
      ]
    },
    {
      title: "Soups",
      items: [
        { name: "Egusi", price: 2500 },
        { name: "Vegetable", price: 2500 },
        { name: "Stew", price: 2500 },
        { name: "Ogbono", price: 2500 },
        { name: "Additional Soup", price: 2500 },
      ]
    }
  ];

  const allItems: SearchableItem[] = menuCategories.flatMap(cat => 
    cat.items.map(item => ({ ...item, category: cat.title }))
  );

  const filteredItems: SearchableItem[] | null = searchQuery
    ? allItems.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : null;

  useEffect(() => {
    const handleScroll = () => {
      if (showCart || searchQuery || isScrollingProgrammatically.current) return;
      
      const container = containerRef.current;
      if (!container) return;

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        const scrollTop = container.scrollTop;
        const pageHeight = window.innerHeight - 100;
        const newPage = Math.round(scrollTop / pageHeight);
        
        if (newPage !== currentPage && newPage >= 0 && newPage < menuCategories.length) {
          setCurrentPage(newPage);
        }
      }, 100);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [currentPage, menuCategories.length, showCart, searchQuery]);

  useEffect(() => {
    if (searchQuery || showCart) return;
    
    const container = containerRef.current;
    if (container) {
      isScrollingProgrammatically.current = true;
      const pageHeight = window.innerHeight - 100;
      
      container.scrollTo({
        top: currentPage * pageHeight,
        behavior: 'smooth'
      });

      setTimeout(() => {
        isScrollingProgrammatically.current = false;
      }, 600);
    }
  }, [currentPage, searchQuery, showCart]);

  const addToCart = (item: MenuItem): void => {
    setCart(prev => {
      const existing = prev.find(i => i.name === item.name);
      if (existing) {
        return prev.map(i =>
          i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (itemName: string, delta: number): void => {
    setCart(prev => {
      return prev.map(item =>
        item.name === itemName
          ? { ...item, quantity: Math.max(0, item.quantity + delta) }
          : item
      ).filter(item => item.quantity > 0);
    });
  };

  const totalAmount: number = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems: number = cart.reduce((sum, item) => sum + item.quantity, 0);

  const sendOrderViaWhatsApp = (): void => {
    if (!customerName.trim() || !tableNumber.trim()) {
      alert('Please enter your name and table number');
      return;
    }

    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
    const date = now.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    let message = `🍽️ *NEW ORDER - Flourish Wave Foods*\n\n`;
    message += `👤 *Customer:* ${customerName}\n`;
    message += `🪑 *Table:* ${tableNumber}\n`;
    message += `📅 *Date:* ${date}\n`;
    message += `⏰ *Time:* ${time}\n\n`;
    message += `📋 *ORDER DETAILS:*\n`;
    
    cart.forEach((item: CartItem, index: number) => {
      message += `${index + 1}. ${item.name} x${item.quantity} - ₦${(item.price * item.quantity).toLocaleString()}\n`;
    });
    
    message += `\n💰 *TOTAL: ₦${totalAmount.toLocaleString()}*\n`;
    
    if (specialInstructions.trim()) {
      message += `\n📝 *Special Instructions:*\n${specialInstructions}`;
    }

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${restaurantWhatsApp}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div ref={containerRef} className="h-screen bg-linear-to-br from-gray-900 via-black to-gray-900 text-white overflow-y-auto scroll-smooth" style={{scrollSnapType: 'y mandatory'}}>
      <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-orange-500/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className='flex items-center'>
            <Image
            src="/images/logo_.png"
            alt='logo'
            width={50}
            height={30}
            />
            <div>
              <h1 className="font-chicle text-2xl md:text-3xl font-bold bg-linear-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              Flourish Wave Foods
            </h1>
            <p className="text-xs text-gray-400">Delicious meals, delivered fresh</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-800/50 border border-orange-500/30 rounded-full px-4 py-2 pl-10 text-sm focus:outline-none focus:border-orange-500 w-48 md:w-64"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="w-4 h-4 text-gray-400 hover:text-white" />
                </button>
              )}
            </div>
            
            <button
              onClick={() => setShowCart(!showCart)}
              className="relative bg-linear-to-r from-orange-600 to-amber-600 p-3 rounded-full hover:from-orange-700 hover:to-amber-700 transition-all shadow-lg shadow-orange-500/50"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="pt-24 pb-8">
        {searchQuery && filteredItems ? (
          <div className="container mx-auto px-4 min-h-screen">
            <h2 className="text-2xl font-bold mb-6 text-orange-500">
              Search Results ({filteredItems.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-linear-to-br from-gray-800/50 to-gray-900/50 p-6 rounded-2xl border border-orange-500/20 hover:border-orange-500/50 transition-all hover:shadow-xl hover:shadow-orange-500/20"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {item.name}
                      </h3>
                      <p className="text-xs text-gray-400 mb-3">{item.category}</p>
                      <p className="text-2xl font-bold text-orange-500">
                        ₦{item.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => addToCart(item)}
                    className="w-full mt-4 bg-linear-to-r from-orange-600 to-amber-600 py-2 rounded-lg font-semibold hover:from-orange-700 hover:to-amber-700 transition-all flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            {menuCategories.map((category, catIdx) => (
              <div 
                key={catIdx} 
                className="min-h-screen flex items-center py-12"
                style={{scrollSnapAlign: 'start'}}
              >
                <div className="container mx-auto px-4 w-full">
                  <div className="mb-8 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-orange-500 via-amber-500 to-orange-500 bg-clip-text text-transparent">
                      {category.title}
                    </h2>
                    <div className="flex items-center justify-center gap-2">
                      {menuCategories.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            const container = containerRef.current;
                            if (!container) return;
                            
                            isScrollingProgrammatically.current = true;
                            const pageHeight = window.innerHeight - 100;
                            container.scrollTo({
                              top: idx * pageHeight,
                              behavior: 'smooth'
                            });
                            
                            setCurrentPage(idx);
                            
                            setTimeout(() => {
                              isScrollingProgrammatically.current = false;
                            }, 600);
                          }}
                          className={`h-2 rounded-full transition-all ${
                            idx === catIdx
                              ? 'w-8 bg-orange-500'
                              : 'w-2 bg-gray-700 hover:bg-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {category.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-linear-to-br from-gray-800/50 to-gray-900/50 p-6 rounded-2xl border border-orange-500/20 hover:border-orange-500/50 transition-all hover:shadow-xl hover:shadow-orange-500/20 hover:scale-105"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-white mb-3">
                              {item.name}
                            </h3>
                            <p className="text-3xl font-bold text-orange-500">
                              {category.title !== "Soups" && `₦${item.price.toLocaleString()}`}
                              {item.name === "Additional Soup" && "₦2,500"}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => addToCart(item)}
                          className="w-full bg-linear-to-r from-orange-600 to-amber-600 py-3 rounded-lg font-semibold hover:from-orange-700 hover:to-amber-700 transition-all flex items-center justify-center gap-2 shadow-lg"
                        >
                          <Plus className="w-5 h-5" />
                          Add to Cart
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="text-center">
                    <p className="text-gray-500 text-sm mb-2">
                      {catIdx < menuCategories.length - 1 ? 'Scroll down for more' : 'End of menu'}
                    </p>
                    {catIdx < menuCategories.length - 1 && (
                      <ChevronDown className="w-6 h-6 mx-auto text-orange-500 animate-bounce" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div
        className={`fixed top-0 right-0 h-full w-full md:w-96 bg-gray-900 border-l border-orange-500/30 transform transition-transform duration-300 z-50 ${
          showCart ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-orange-500/30">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-orange-500">Your Cart</h2>
              <button
                onClick={() => setShowCart(false)}
                className="p-2 hover:bg-gray-800 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {cart.length === 0 ? (
              <div className="text-center text-gray-500 mt-12">
                <ShoppingCart className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Your cart is empty</p>
              </div>
            ) : showCheckout ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-orange-500">Order Summary</h3>
                  <div className="space-y-2 mb-6">
                    {cart.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span>{item.name} x{item.quantity}</span>
                        <span className="text-orange-500">₦{(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t border-orange-500/30 pt-3">
                    <span>Total:</span>
                    <span className="text-orange-500">₦{totalAmount.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-300">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full bg-gray-800 border border-orange-500/30 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-300">
                      Table Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      placeholder="Enter table number"
                      className="w-full bg-gray-800 border border-orange-500/30 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-300">
                      Special Instructions (Optional)
                    </label>
                    <textarea
                      value={specialInstructions}
                      onChange={(e) => setSpecialInstructions(e.target.value)}
                      placeholder="Any special requests? (e.g., extra spicy, no onions)"
                      rows={3}
                      className="w-full bg-gray-800 border border-orange-500/30 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 text-white resize-none"
                    />
                  </div>
                </div>

                <button
                  onClick={() => setShowCheckout(false)}
                  className="w-full bg-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-all"
                >
                  ← Back to Cart
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-800/50 p-4 rounded-xl border border-orange-500/20"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-white">{item.name}</h3>
                        <p className="text-orange-500 font-bold">
                          ₦{item.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 bg-gray-700/50 rounded-lg p-1">
                        <button
                          onClick={() => updateQuantity(item.name, -1)}
                          className="p-2 hover:bg-gray-600 rounded-lg transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-bold w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.name, 1)}
                          className="p-2 hover:bg-gray-600 rounded-lg transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-lg font-bold text-orange-500">
                        ₦{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-6 border-t border-orange-500/30 bg-gray-900">
              {!showCheckout ? (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xl font-bold">Total:</span>
                    <span className="text-2xl font-bold text-orange-500">
                      ₦{totalAmount.toLocaleString()}
                    </span>
                  </div>
                  <button 
                    onClick={() => setShowCheckout(true)}
                    className="w-full bg-linear-to-r from-orange-600 to-amber-600 py-4 rounded-xl font-bold text-lg hover:from-orange-700 hover:to-amber-700 transition-all shadow-xl shadow-orange-500/50"
                  >
                    Proceed to Checkout
                  </button>
                </>
              ) : (
                <button 
                  onClick={sendOrderViaWhatsApp}
                  className="w-full bg-linear-to-r from-green-600 to-emerald-600 py-4 rounded-xl font-bold text-lg hover:from-green-700 hover:to-emerald-700 transition-all shadow-xl shadow-green-500/50 flex items-center justify-center gap-2"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  Send Order via WhatsApp
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {showCart && (
        <div
          onClick={() => setShowCart(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}
    </div>
  );
};

export default FlourishWaveFoods;