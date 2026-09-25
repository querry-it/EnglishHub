import React, { useState } from 'react';
import { 
  ShoppingBag, Gem, Snowflake, Check, Sparkles, Filter, 
  Package, Crown, Award, ArrowRight, ShieldCheck, CheckCircle2, Diamond
} from 'lucide-react';
import AppLayout from '../components/AppLayout';
import { useAuth } from '../context/AuthContext';

export default function Shop() {
  const { user } = useAuth();
  
  // Navigation & Filter state
  const [activeTab, setActiveTab] = useState('shop'); // 'shop' | 'inventory'
  const [selectedCategory, setSelectedCategory] = useState('Tất cả'); // 'Tất cả' | '# Khung avatar' | '# Ảnh nền'
  
  // Diamond Balance & Inventory state
  const [diamonds, setDiamonds] = useState(52);
  const [purchasedItems, setPurchasedItems] = useState([]);
  const [activeEquippedItem, setActiveEquippedItem] = useState(null);
  const [streakFreezes, setStreakFreezes] = useState(0);

  // Success Notice Toast State
  const [notice, setNotice] = useState(null);

  // Shop Items Dataset (Matching Screenshots 1 & 2)
  const storeItems = [
    {
      id: 'item-30-4',
      title: '30-4',
      category: '# Ảnh nền',
      type: 'wallpaper',
      badge: 'RARE',
      badgeBg: 'bg-sky-500',
      discount: '-100%',
      originalPrice: 5000,
      price: 1,
      thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'item-hust',
      title: 'HUST chờ tôi nhé',
      category: '# Ảnh nền',
      type: 'wallpaper',
      badge: 'EPIC',
      badgeBg: 'bg-purple-600',
      price: 5000,
      thumbnail: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'item-neu',
      title: 'NEU chờ tôi nhé',
      category: '# Ảnh nền',
      type: 'wallpaper',
      badge: 'EPIC',
      badgeBg: 'bg-purple-600',
      price: 5000,
      thumbnail: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'item-harvard',
      title: "Harvard I'm coming!",
      category: '# Ảnh nền',
      type: 'wallpaper',
      badge: 'EPIC',
      badgeBg: 'bg-purple-600',
      price: 5000,
      thumbnail: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'item-oxford',
      title: 'Oxford University',
      category: '# Ảnh nền',
      type: 'wallpaper',
      badge: 'EPIC',
      badgeBg: 'bg-purple-600',
      price: 5000,
      thumbnail: 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'item-vnu',
      title: 'VNU chờ tôi nhé',
      category: '# Ảnh nền',
      type: 'wallpaper',
      badge: 'EPIC',
      badgeBg: 'bg-purple-600',
      price: 5000,
      thumbnail: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'item-dragon-frame',
      title: 'Khung Rồng Vàng Hoàng Gia',
      category: '# Khung avatar',
      type: 'frame',
      badge: 'LEGENDARY',
      badgeBg: 'bg-amber-500',
      price: 10000,
      thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'item-pro-frame',
      title: 'Khung Kim Cương Pro',
      category: '# Khung avatar',
      type: 'frame',
      badge: 'EPIC',
      badgeBg: 'bg-purple-600',
      price: 8000,
      thumbnail: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=500&q=80'
    }
  ];

  // Purchase Handler
  const handleBuyItem = (item) => {
    if (purchasedItems.some(i => i.id === item.id)) {
      setNotice({ type: 'warning', text: 'Bạn đã sở hữu vật phẩm này rồi!' });
      setTimeout(() => setNotice(null), 3000);
      return;
    }

    if (diamonds < item.price) {
      setNotice({ type: 'error', text: `Bạn cần thêm 💎 ${(item.price - diamonds).toLocaleString()} kim cương nữa!` });
      setTimeout(() => setNotice(null), 3000);
      return;
    }

    setDiamonds(prev => prev - item.price);
    setPurchasedItems(prev => [...prev, item]);
    setNotice({ type: 'success', text: `🎉 Mua thành công vật phẩm "${item.title}"!` });
    setTimeout(() => setNotice(null), 3000);
  };

  // Buy Streak Freeze
  const handleBuyStreakFreeze = () => {
    if (streakFreezes >= 7) {
      setNotice({ type: 'warning', text: 'Bạn đã đạt tối đa 7/7 Streak Freeze!' });
      setTimeout(() => setNotice(null), 3000);
      return;
    }

    if (diamonds < 5000) {
      setNotice({ type: 'error', text: 'Bạn không đủ 💎 5,000 kim cương!' });
      setTimeout(() => setNotice(null), 3000);
      return;
    }

    setDiamonds(prev => prev - 5000);
    setStreakFreezes(prev => prev + 1);
    setNotice({ type: 'success', text: '🎉 Mua thành công 1 Streak Freeze!' });
    setTimeout(() => setNotice(null), 3000);
  };

  // Equip Item
  const handleEquipItem = (itemId) => {
    setActiveEquippedItem(itemId);
    setNotice({ type: 'success', text: '✨ Đã trang bị vật phẩm thành công!' });
    setTimeout(() => setNotice(null), 3000);
  };

  // Filter Items
  const filteredStoreItems = storeItems.filter(item => {
    if (selectedCategory === 'Tất cả') return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="w-full min-h-screen pb-16 select-none">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 space-y-6">
          
          {/* Toast Notification */}
          {notice && (
            <div className={`fixed top-20 right-6 z-50 px-5 py-3 rounded-2xl font-black text-xs shadow-2xl animate-fade-in flex items-center gap-2 border ${
              notice.type === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-300' :
              notice.type === 'warning' ? 'bg-amber-50 text-amber-700 border-amber-300' :
              'bg-rose-50 text-rose-700 border-rose-300'
            }`}>
              <span>{notice.text}</span>
            </div>
          )}

          {/* ================= 1. HEADER SECTION & DIAMOND BALANCE ================= */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Cửa hàng
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 max-w-2xl">
                Học tập chăm chỉ và luyện tập thường xuyên để thu thập kim cương! 💎 Mở khóa các vật phẩm vui nhộn và thú vị như phần thưởng cho sự cống hiến của bạn.
              </p>
            </div>

            {/* Diamond Balance Counter Box */}
            <div className="px-5 py-2.5 rounded-full bg-amber-50 dark:bg-amber-950/80 border-2 border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-200 font-mono font-black text-sm flex items-center gap-2 shrink-0 shadow-xs self-start sm:self-auto">
              <Diamond className="w-4 h-4 text-sky-500 fill-sky-500" />
              <span>{diamonds.toLocaleString()}</span>
            </div>
          </div>

          {/* ================= 2. TOP SUB-TABS (CỬA HÀNG | KHO ĐỒ) ================= */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('shop')}
              className={`px-5 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 ${
                activeTab === 'shop'
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border-2 border-slate-300 dark:border-slate-700 shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              <ShoppingBag className="w-4 h-4 text-sky-500" />
              <span>Cửa hàng</span>
            </button>

            <button
              onClick={() => setActiveTab('inventory')}
              className={`px-5 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 ${
                activeTab === 'inventory'
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border-2 border-slate-300 dark:border-slate-700 shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              <Package className="w-4 h-4 text-purple-500" />
              <span>Kho đồ</span>
            </button>
          </div>

          {/* ================= 3. TAB 1: CỬA HÀNG (SHOP VIEW) ================= */}
          {activeTab === 'shop' ? (
            <div className="space-y-6 animate-fade-in">
              
              {/* FEATURED BANNER CARD: Mua Streak Freeze */}
              <div className="p-5 sm:p-6 rounded-3xl bg-sky-50 dark:bg-sky-950/60 border-2 border-sky-200 dark:border-sky-800/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 border-2 border-sky-200 dark:border-sky-800 text-sky-500 flex items-center justify-center shrink-0 shadow-xs">
                    <Snowflake className="w-6 h-6 text-sky-500" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-black text-base text-slate-900 dark:text-white">
                      Mua streak freeze
                    </h3>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      Streak freeze tự động cứu chuỗi học khi bạn bỏ lỡ một ngày.
                    </p>
                    <div className="flex items-center gap-3 text-xs font-black pt-0.5">
                      <span className="text-sky-600 dark:text-sky-400 flex items-center gap-1">
                        <Snowflake className="w-3.5 h-3.5" /> {streakFreezes} / 7
                      </span>
                      <span className="text-amber-600 dark:text-amber-400 flex items-center gap-1">
                        <Diamond className="w-3.5 h-3.5 text-sky-500 fill-sky-500" /> 5,000
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleBuyStreakFreeze}
                  className="px-6 py-3 rounded-2xl bg-[#1E2540] dark:bg-indigo-600 hover:bg-[#151a2e] text-white font-black text-xs uppercase tracking-wider shadow-md transition-all active:scale-98 shrink-0 self-end sm:self-auto flex items-center gap-1.5"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>MUA</span>
                </button>

              </div>

              {/* CATEGORY FILTER TABS */}
              <div className="flex items-center gap-2">
                {['Tất cả', '# Khung avatar', '# Ảnh nền'].map((cat, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-2xl text-xs font-black transition-all border ${
                      selectedCategory === cat
                        ? 'bg-[#1E2540] dark:bg-indigo-600 text-white border-[#1E2540] dark:border-indigo-600 shadow-xs'
                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* STORE ITEMS GRID (4 COLUMNS) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {filteredStoreItems.map((item) => {
                  const isOwned = purchasedItems.some(i => i.id === item.id);
                  return (
                    <div
                      key={item.id}
                      className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs hover:border-indigo-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                    >
                      {/* Top Thumbnail Box */}
                      <div className="relative aspect-video bg-slate-950 overflow-hidden">
                        <img 
                          src={item.thumbnail} 
                          alt={item.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                        />

                        {/* Top Badges */}
                        <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 z-10">
                          {item.discount && (
                            <span className="px-2 py-0.5 rounded-lg bg-rose-500 text-white font-black text-[10px] shadow-sm">
                              {item.discount}
                            </span>
                          )}
                          <span className={`px-2.5 py-0.5 rounded-lg ${item.badgeBg || 'bg-purple-600'} text-white font-black text-[10px] shadow-sm uppercase tracking-wider`}>
                            {item.badge}
                          </span>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                        <div className="space-y-1">
                          <h4 className="font-extrabold text-sm text-slate-900 dark:text-white leading-snug">
                            {item.title}
                          </h4>

                          {/* Price Tag */}
                          <div className="flex items-center gap-2 pt-1 font-mono font-black text-xs">
                            <span className="text-amber-500 flex items-center gap-1">
                              <Diamond className="w-3.5 h-3.5 text-sky-500 fill-sky-500 inline" /> {item.price.toLocaleString()}
                            </span>
                            {item.originalPrice && (
                              <span className="line-through text-slate-400 text-[11px]">
                                {item.originalPrice.toLocaleString()}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Buy / Owned Button */}
                        <button
                          onClick={() => handleBuyItem(item)}
                          disabled={isOwned}
                          className={`w-full py-3 rounded-2xl font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-98 ${
                            isOwned 
                              ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-300 dark:border-slate-700' 
                              : 'bg-[#1E2540] dark:bg-indigo-600 hover:bg-[#151a2e] text-white'
                          }`}
                        >
                          {isOwned ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                              <span>ĐÃ SỞ HỮU</span>
                            </>
                          ) : (
                            <span>MUA</span>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          ) : (
            /* ================= 4. TAB 2: KHO ĐỒ (INVENTORY VIEW) ================= */
            <div className="space-y-6 animate-fade-in">
              
              <div className="space-y-1">
                <h2 className="text-lg font-black text-slate-900 dark:text-white">
                  Kho đồ của bạn
                </h2>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Vật phẩm bạn đã mua. Chọn để sử dụng cho hồ sơ.
                </p>
              </div>

              {purchasedItems.length === 0 ? (
                /* SCREENSHOT 2: EMPTY INVENTORY CANVAS */
                <div className="py-20 px-6 max-w-3xl mx-auto text-center rounded-3xl border-2 border-dashed border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
                  <div className="w-16 h-16 rounded-3xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto border-2 border-slate-200 dark:border-slate-700 shadow-xs">
                    <Package className="w-8 h-8 text-purple-500" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                      Bạn chưa sở hữu vật phẩm nào
                    </h3>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      Hãy ghé cửa hàng để mua những vật phẩm thú vị nhé!
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('shop')}
                    className="px-6 py-3 rounded-2xl bg-[#1E2540] dark:bg-indigo-600 hover:bg-[#151a2e] text-white font-black text-xs uppercase tracking-wider shadow-md transition-transform active:scale-98 inline-flex items-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>ĐẾN CỬA HÀNG</span>
                  </button>
                </div>
              ) : (
                /* OWNED ITEMS GRID */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {purchasedItems.map((item) => {
                    const isEquipped = activeEquippedItem === item.id;
                    return (
                      <div
                        key={item.id}
                        className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs flex flex-col justify-between"
                      >
                        <div className="relative aspect-video bg-slate-950 overflow-hidden">
                          <img 
                            src={item.thumbnail} 
                            alt={item.title} 
                            className="w-full h-full object-cover opacity-90"
                          />
                        </div>

                        <div className="p-4 space-y-3">
                          <h4 className="font-extrabold text-sm text-slate-900 dark:text-white leading-snug">
                            {item.title}
                          </h4>

                          <button
                            onClick={() => handleEquipItem(item.id)}
                            className={`w-full py-3 rounded-2xl font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-md ${
                              isEquipped 
                                ? 'bg-emerald-600 text-white' 
                                : 'bg-[#1E2540] dark:bg-indigo-600 hover:bg-[#151a2e] text-white'
                            }`}
                          >
                            {isEquipped ? 'ĐANG SỬ DỤNG' : 'SỬ DỤNG'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

            </div>
          )}

        </div>
      </div>
  );
}
