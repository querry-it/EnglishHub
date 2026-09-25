import React, { useState, useEffect } from 'react';
import { 
  Crown, Star, CheckCircle2, Clock, Sparkles, Key, Zap, 
  Flame, ShieldCheck, ArrowRight, Check, Users, BookOpen
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Pricing() {
  const { openLoginModal } = useAuth();
  
  // Selected Duration Option ('1month' | '3months' | '1year' | 'lifetime')
  const [selectedDuration, setSelectedDuration] = useState('3months');
  const [activationCode, setActivationCode] = useState('');
  const [codeSuccess, setCodeSuccess] = useState(false);

  // Live Sale Countdown Timer (5 days, 14 hours, 50 mins, 37 secs)
  const [saleTime, setSaleTime] = useState({
    days: 5,
    hours: 14,
    minutes: 50,
    seconds: 37
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setSaleTime(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Duration Options Dataset (Matching Screenshots 1 & 2)
  const durationPlans = {
    '1month': {
      label: '1 THÁNG',
      badge: null,
      originalPrice: '120.000 đ',
      price: '99.000 đ',
      savings: 'TIẾT KIỆM 17%',
      perMonth: '99.000 đ / tháng',
      terms: 'Thanh toán hàng tháng'
    },
    '3months': {
      label: '3 THÁNG',
      badge: '-29%',
      badgeColor: 'bg-emerald-500',
      originalPrice: '237.000 đ',
      price: '169.000 đ',
      savings: 'TIẾT KIỆM 29%',
      perMonth: '56.333 đ / tháng',
      terms: 'Thanh toán một lần cho 3 tháng'
    },
    '1year': {
      label: '1 NĂM ★',
      badge: '-47%',
      badgeColor: 'bg-emerald-500',
      originalPrice: '750.000 đ',
      price: '399.000 đ',
      savings: 'TIẾT KIỆM 47%',
      perMonth: '33.250 đ / tháng',
      terms: 'Thanh toán một lần cho 12 tháng'
    },
    'lifetime': {
      label: 'TRỌN ĐỜI ★',
      badge: '-30%',
      badgeColor: 'bg-emerald-500',
      originalPrice: '1.420.000 đ',
      price: '990.000 đ',
      savings: 'TIẾT KIỆM 30%',
      perMonth: 'Dùng mãi mãi',
      terms: 'Thanh toán một lần dùng trọn đời'
    }
  };

  const currentPlan = durationPlans[selectedDuration];

  // Handle Code Activation
  const handleActivateCode = (e) => {
    e.preventDefault();
    if (!activationCode.trim()) return;
    setCodeSuccess(true);
    setTimeout(() => setCodeSuccess(false), 4000);
  };

  return (
    <div className="w-full min-h-screen pb-16 select-none">
      <div className="max-w-6xl mx-auto px-2 sm:px-4 space-y-8">

        {/* ================= 1. PAGE HERO HEADER ================= */}
        <div className="text-center space-y-3 py-4">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
            Chọn Gói Hoàn Hảo Của Bạn
          </h1>
          <p className="text-xs sm:text-sm font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider max-w-2xl mx-auto">
            HỌC TIẾNG ANH HIỆU QUẢ VỚI CÁC GÓI DỊCH VỤ ĐA DẠNG CỦA CHÚNG TÔI
          </p>

          {/* Social Proof Badges */}
          <div className="flex items-center justify-center gap-3 pt-1 text-xs font-black">
            <span className="px-4 py-1.5 rounded-full bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-800 flex items-center gap-1.5 shadow-2xs">
              <Users className="w-4 h-4" /> 500.000+ học viên
            </span>
            <span className="px-4 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800 flex items-center gap-1.5 shadow-2xs">
              <BookOpen className="w-4 h-4" /> 50 triệu+ bài học được làm
            </span>
          </div>
        </div>

        {/* ================= 2. TWO PLANS CARDS GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">

          {/* ----------------- LEFT CARD: MIỄN PHÍ (FREE PLAN) ----------------- */}
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xs hover:border-slate-300 transition-colors">
            
            <div className="space-y-6">
              {/* Header Icon & Title */}
              <div className="text-center space-y-2">
                <div className="w-14 h-14 rounded-full bg-sky-50 dark:bg-sky-950 text-sky-500 flex items-center justify-center mx-auto border border-sky-200 dark:border-sky-800 shadow-xs">
                  <Star className="w-6 h-6 text-sky-500 fill-sky-500" />
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  Miễn phí
                </h2>
                <p className="text-xs font-semibold text-slate-400">
                  Hoàn hảo cho người mới bắt đầu
                </p>
              </div>

              {/* Price Display */}
              <div className="text-center py-2">
                <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
                  Miễn phí
                </span>
              </div>

              {/* Benefits Checklist */}
              <div className="space-y-3 pt-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Truy cập không giới hạn hơn 1.000 bài học đa dạng</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Luyện chính tả không giới hạn</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Luyện Shadowing không giới hạn với chấm điểm phát âm cơ bản</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Theo dõi tiến độ học tập</span>
                </div>
              </div>
            </div>

            {/* Free CTA Button */}
            <div className="pt-6">
              <button
                onClick={() => openLoginModal()}
                className="w-full py-3.5 rounded-2xl bg-[#1E2540] dark:bg-slate-800 hover:bg-[#151a2e] text-white font-black text-xs uppercase tracking-wider shadow-md transition-transform active:scale-98"
              >
                TIẾP TỤC HỌC
              </button>
            </div>

          </div>

          {/* ----------------- RIGHT CARD: PREMIUM (PRO PLAN - GOLD BORDER) ----------------- */}
          <div className="bg-white dark:bg-slate-900 border-3 border-amber-400 dark:border-amber-500 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xl relative overflow-hidden">

            <div className="space-y-6">
              
              {/* Header Icon & Title */}
              <div className="text-center space-y-2">
                <div className="w-14 h-14 rounded-full bg-amber-50 dark:bg-amber-950 text-amber-500 flex items-center justify-center mx-auto border border-amber-300 dark:border-amber-700 shadow-xs">
                  <Crown className="w-6 h-6 text-amber-500 fill-amber-500" />
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  Premium
                </h2>
                <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                  CHỌN THỜI HẠN PHÙ HỢP VỚI BẠN
                </p>
              </div>

              {/* Mid-Autumn / Special Sale Banner Pill */}
              <div className="p-2.5 px-4 rounded-2xl bg-amber-500 text-amber-950 font-extrabold text-xs flex flex-wrap items-center justify-between gap-2 shadow-xs">
                <div className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 fill-current" />
                  <span>Mid-Autumn Sale • Tiết kiệm 25%</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-mono">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Kết thúc sau {saleTime.days}d {saleTime.hours}:{saleTime.minutes}:{saleTime.seconds}</span>
                </div>
              </div>

              {/* Duration Options Selector Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {Object.entries(durationPlans).map(([key, plan]) => {
                  const isSelected = selectedDuration === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedDuration(key)}
                      className={`relative py-2.5 px-2 rounded-2xl text-xs font-black transition-all flex flex-col items-center justify-center gap-1 border-2 ${
                        isSelected
                          ? 'bg-[#1E2540] dark:bg-indigo-600 text-white border-[#1E2540] dark:border-indigo-600 shadow-md'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {plan.badge && (
                        <span className="absolute -top-2.5 px-1.5 py-0.2 rounded-md bg-emerald-500 text-white text-[9px] font-black shadow-xs">
                          {plan.badge}
                        </span>
                      )}
                      <span>{plan.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Price Display */}
              <div className="text-center space-y-1 py-2">
                <div className="flex items-center justify-center gap-2">
                  <span className="line-through text-slate-400 font-mono text-sm font-bold">
                    {currentPlan.originalPrice}
                  </span>
                </div>

                <div className="flex items-center justify-center gap-3">
                  <span className="text-3xl sm:text-4xl font-black font-mono text-slate-900 dark:text-white">
                    {currentPlan.price}
                  </span>
                  <span className="px-2.5 py-1 rounded-xl bg-emerald-500 text-white font-black text-xs uppercase tracking-wider shadow-xs">
                    {currentPlan.savings}
                  </span>
                </div>

                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 font-mono">
                  {currentPlan.perMonth}
                </p>
                <p className="text-[11px] font-semibold text-slate-400">
                  {currentPlan.terms}
                </p>
              </div>

              {/* Premium Benefits List */}
              <div className="space-y-2.5 text-xs font-bold text-slate-700 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-800">
                <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  QUYỀN LỢI PREMIUM
                </p>

                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>Tất cả tính năng của gói Miễn phí</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>Truy cập không giới hạn toàn bộ các bài học</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>Tạo tối đa 35 bài học từ YouTube mỗi tháng</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>Mở khóa toàn bộ đề thi TOEIC</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>Mở khóa tất cả từ vựng</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>Lưu sổ tay từ vựng và ghi chú nhiều hơn</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>Hỗ trợ ưu tiên từ đội ngũ phát triển</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>Loại bỏ quảng cáo</span>
                </div>
              </div>

              {/* Activation Code Input Section */}
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1">
                  ✨ MÃ KÍCH HOẠT
                </span>

                <form onSubmit={handleActivateCode} className="flex gap-2">
                  <input
                    type="text"
                    value={activationCode}
                    onChange={(e) => setActivationCode(e.target.value)}
                    placeholder="Nhập mã kích hoạt của bạn"
                    className="flex-1 px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-600"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 font-extrabold text-xs border border-amber-300 dark:border-amber-700 hover:bg-amber-200 transition-colors shrink-0"
                  >
                    KÍCH HOẠT
                  </button>
                </form>

                {codeSuccess && (
                  <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-extrabold text-xs flex items-center gap-1.5 border border-emerald-300">
                    <Check className="w-4 h-4" />
                    <span>Mã kích hoạt hợp lệ! Gói Premium đã được mở khóa.</span>
                  </div>
                )}
              </div>

            </div>

            {/* Main Premium Register Button */}
            <div className="pt-4">
              <button
                onClick={() => openLoginModal()}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-sky-400 via-blue-600 to-purple-600 hover:opacity-95 text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-blue-500/25 transition-transform active:scale-98 flex items-center justify-center gap-2"
              >
                <Crown className="w-5 h-5 text-amber-300 fill-current" />
                <span>ĐĂNG KÝ NGAY</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
