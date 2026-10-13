import React, { useState } from 'react';
import { 
  Crown, X, Users, BookOpen, Check, ShieldCheck, Zap, 
  Quote, Star
} from 'lucide-react';
import PaymentModal from './PaymentModal';

export default function PricingModal({ isOpen, onClose }) {
  const [selectedPlan, setSelectedPlan] = useState('1year');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const plans = [
    {
      id: '1month',
      title: '1 tháng',
      price: '79.000 đ',
      originalPrice: null,
      monthly: null,
      discount: null,
      best: false
    },
    {
      id: '3months',
      title: '3 tháng',
      price: '169.000 đ',
      originalPrice: '237.000 đ',
      monthly: '~ 56.333 đ/tháng',
      discount: '-29%',
      best: false
    },
    {
      id: '1year',
      title: '1 năm',
      price: '499.000 đ',
      originalPrice: '948.000 đ',
      monthly: '~ 41.583 đ/tháng',
      discount: '-47%',
      best: true
    },
    {
      id: 'lifetime',
      title: 'Trọn đời',
      price: '1.849.000 đ',
      originalPrice: '2.641.429 đ',
      monthly: null,
      discount: '-30%',
      best: true
    }
  ];

  const benefits = [
    "Truy cập không giới hạn hơn 1.000 bài học đa dạng",
    "Theo dõi tiến trình học tập",
    "Tạo tối đa 35 bài học từ YouTube mỗi tháng",
    "Mở khóa toàn bộ đề thi TOEIC",
    "Mở khóa toàn bộ từ vựng",
    "Lưu sổ tay từ vựng và ghi chú nhiều hơn",
    "Hỗ trợ ưu tiên từ đội ngũ phát triển",
    "Xóa quảng cáo"
  ];

  const selectedPlanObj = plans.find(p => p.id === selectedPlan);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in select-none">
      {!isPaymentModalOpen && (
        <div className="max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-2xl shadow-2xl relative flex flex-col border border-slate-200 dark:border-slate-800">

        
        {/* CLOSE BUTTON */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 z-10 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* HEADER SECTION (Light Orange BG) */}
        <div className="bg-indigo-50/50 dark:bg-indigo-950/20 pt-5 pb-4 px-4 text-center border-b border-indigo-100 dark:border-indigo-900/30 flex-shrink-0">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm shadow-indigo-500/30">
            <Crown className="w-5 h-5 text-white fill-white" />
          </div>
          <h1 className="text-xl font-black text-indigo-600 dark:text-indigo-400 mb-2">
            EnglishHub Premium
          </h1>
          
          <div className="flex flex-wrap items-center justify-center gap-2 mb-2">
            <div className="px-3 py-1 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 shadow-sm">
              <Users className="w-3.5 h-3.5 text-blue-500 fill-blue-500" />
              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">500.000+ học viên</span>
            </div>
            <div className="px-3 py-1 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 shadow-sm">
              <BookOpen className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">50 triệu+ bài học</span>
            </div>
          </div>
          
          <p className="text-[13px] font-semibold text-slate-700 dark:text-slate-300">
            Mở khóa toàn bộ - học gấp 10x
          </p>
        </div>

        {/* MAIN CONTENT (Split columns) */}
        <div className="flex flex-col md:flex-row p-4 md:p-5 gap-4">
          
          {/* LEFT COLUMN: Pricing Options */}
          <div className="flex-1 space-y-3">
            <div className="space-y-3">
              {plans.map((plan) => {
                const isSelected = selectedPlan === plan.id;
                return (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`relative cursor-pointer rounded-xl p-2.5 flex items-center transition-all ${
                      isSelected 
                        ? 'border-2 border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30'
                        : 'border border-slate-200 dark:border-slate-700 hover:border-indigo-300'
                    }`}
                  >
                    {plan.best && (
                      <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-indigo-600 text-white text-[9px] font-black rounded flex items-center gap-1 shadow-sm uppercase tracking-wider whitespace-nowrap">
                        <Star className="w-2.5 h-2.5 fill-white" /> TỐT NHẤT
                      </div>
                    )}
                    
                    {/* Radio Button */}
                    <div className="mr-3 flex-shrink-0">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center border-2 ${
                        isSelected 
                          ? 'border-indigo-600 bg-indigo-600' 
                          : 'border-slate-300 dark:border-slate-600'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 text-white stroke-[3]" />}
                      </div>
                    </div>

                    {/* Plan Details */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`font-black ${isSelected ? 'text-base' : 'text-sm'} text-slate-900 dark:text-white`}>
                          {plan.title}
                        </span>
                        {plan.discount && (
                          <span className="px-1.5 py-0.5 rounded bg-emerald-500 text-white text-[9px] font-bold">
                            {plan.discount}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-baseline gap-1.5 mt-0.5">
                        <span className={`font-black ${isSelected ? 'text-xl' : 'text-base'} text-slate-900 dark:text-white`}>
                          {plan.price}
                        </span>
                        {plan.originalPrice && (
                          <span className="text-[11px] font-semibold text-slate-400 line-through">
                            {plan.originalPrice}
                          </span>
                        )}
                      </div>
                      
                      {plan.monthly && (
                        <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                          {plan.monthly}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Button */}
            <div className="pt-1 space-y-2 text-center">
              <button 
                onClick={() => setIsPaymentModalOpen(true)}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-black text-sm flex items-center justify-center gap-2 shadow-md shadow-indigo-500/20 transition-transform active:scale-98"
              >
                <Crown className="w-4 h-4 fill-white" /> Mở khóa ngay
              </button>
              
              <div className="flex items-center justify-center gap-3 text-[10px] font-semibold text-slate-500">
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  Thanh toán bảo mật
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  Kích hoạt tức thì
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Benefits & Testimonial */}
          <div className="flex-1 space-y-3">
            
            <div>
              <h3 className="text-sm font-black text-indigo-600 dark:text-indigo-400 flex items-center gap-2 mb-3">
                <div className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center">
                  <Star className="w-3 h-3 text-white fill-white" />
                </div>
                Quyền lợi Premium
              </h3>
              
              <div className="space-y-2">
                {benefits.map((text, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <div className="mt-0.5 w-4 h-4 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                    </div>
                    <span className="text-[13px] font-semibold text-slate-700 dark:text-slate-300 leading-snug">
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial Card */}
            <div className="mt-4 p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 relative shadow-sm">
              <div className="absolute -top-2 left-3 text-indigo-500 bg-white dark:bg-slate-800 px-1">
                <Quote className="w-4 h-4 fill-indigo-100 dark:fill-indigo-950 stroke-indigo-500" />
              </div>
              <p className="text-[12px] font-semibold text-slate-600 dark:text-slate-300 italic pt-1 mb-1.5 leading-snug">
                App tốt nhất mình từng dùng để học tiếng Anh, tiến bộ rõ rệt chỉ sau 2 tháng.
              </p>
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <span className="text-[10px] font-semibold text-slate-500">— Linh, Hà Nội</span>
              </div>
            </div>

          </div>

        </div>
      </div>
      )}

      <PaymentModal 
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        selectedPlan={selectedPlanObj}
      />
    </div>
  );
}
