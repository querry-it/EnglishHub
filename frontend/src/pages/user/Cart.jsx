import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2, Tag, ArrowRight, ShieldCheck, CreditCard, Sparkles, X, ChevronRight } from 'lucide-react';

export default function Cart() {
  const [cartItems, setCartItems] = useState([
    { id: 1, title: 'IELTS Band 7.0+ Masterclass', instructor: 'Mr. David Wilson', price: 1490000, originalPrice: 2990000, icon: '🎓', color: 'from-indigo-500 to-purple-600' },
    { id: 2, title: 'TOEIC 900+ Intensive Course', instructor: 'Ms. Nguyễn Thu Hà', price: 990000, originalPrice: 1990000, icon: '💼', color: 'from-emerald-500 to-teal-600' },
  ]);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');

  const removeItem = (id) => setCartItems(prev => prev.filter(i => i.id !== id));

  const applyCoupon = () => {
    const coupons = {
      'WELCOME50': { type: 'percent', value: 50, label: 'Giảm 50%' },
      'SAVE100K': { type: 'fixed', value: 100000, label: 'Giảm 100,000₫' },
      'ENGLISHHUB2026': { type: 'percent', value: 30, label: 'Giảm 30%' },
    };
    const found = coupons[couponCode.toUpperCase()];
    if (found) {
      setAppliedCoupon({ code: couponCode.toUpperCase(), ...found });
      setCouponError('');
    } else {
      setCouponError('Mã giảm giá không hợp lệ');
      setAppliedCoupon(null);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const discount = appliedCoupon
    ? appliedCoupon.type === 'percent' ? Math.round(subtotal * appliedCoupon.value / 100) : Math.min(appliedCoupon.value, subtotal)
    : 0;
  const total = Math.max(0, subtotal - discount);

  const formatPrice = (p) => p.toLocaleString('vi-VN') + '₫';

  if (cartItems.length === 0) {
    return (
      <div className="py-20 text-center container max-w-lg">
        <div className="text-6xl mb-4 animate-bounce-in">🛒</div>
        <h2 className="text-2xl font-black text-slate-900 mb-2">Giỏ hàng trống</h2>
        <p className="text-sm text-slate-500 mb-6">Khám phá các khóa học tuyệt vời và bắt đầu hành trình học ngay!</p>
        <Link to="/courses" className="btn btn-primary px-8 py-3.5 text-sm font-extrabold">
          <Sparkles className="w-4 h-4" /> Xem khóa học
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8 bg-mesh-gradient min-h-screen">
      <div className="container max-w-5xl">
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
            <ShoppingCart className="w-7 h-7 text-indigo-500" /> Giỏ hàng
            <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">{cartItems.length} khóa học</span>
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, i) => (
              <div key={item.id} className="parroto-card p-5 flex items-center gap-4 animate-fade-in-up" style={{ animationDelay: `${i * 0.08}s` }}>
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-2xl shadow-lg shrink-0`}>
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-slate-900 text-sm truncate">{item.title}</h3>
                  <p className="text-xs text-slate-500">{item.instructor}</p>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-base font-black text-indigo-600">{formatPrice(item.price)}</div>
                  {item.originalPrice > item.price && (
                    <div className="text-xs text-slate-400 line-through">{formatPrice(item.originalPrice)}</div>
                  )}
                </div>
                <button onClick={() => removeItem(item.id)} className="w-9 h-9 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-500 flex items-center justify-center transition-colors shrink-0">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}

            {/* Coupon */}
            <div className="parroto-card p-5">
              <h3 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-2">
                <Tag className="w-4 h-4 text-indigo-500" /> Mã giảm giá
              </h3>
              <div className="flex gap-2">
                <input type="text" value={couponCode} onChange={e => setCouponCode(e.target.value)}
                  placeholder="Nhập mã giảm giá..." className="input-field flex-1" />
                <button onClick={applyCoupon} className="btn btn-secondary text-xs px-5 py-2.5 font-bold">Áp dụng</button>
              </div>
              {couponError && <p className="text-xs text-rose-500 mt-2 font-medium">{couponError}</p>}
              {appliedCoupon && (
                <div className="flex items-center justify-between mt-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm font-bold text-emerald-700">{appliedCoupon.code}</span>
                    <span className="text-xs text-emerald-600">({appliedCoupon.label})</span>
                  </div>
                  <button onClick={() => setAppliedCoupon(null)} className="text-slate-400 hover:text-rose-500">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
              <p className="text-[11px] text-slate-400 mt-2">💡 Thử mã: WELCOME50, SAVE100K, ENGLISHHUB2026</p>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="parroto-card p-6 sticky top-24 animate-fade-in-up stagger-3">
              <h3 className="text-lg font-black text-slate-900 mb-5">📋 Tóm tắt đơn hàng</h3>
              <div className="space-y-3 mb-5">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Tạm tính ({cartItems.length} khóa học)</span>
                  <span className="font-bold text-slate-900">{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-emerald-600">Giảm giá</span>
                    <span className="font-bold text-emerald-600">-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="border-t border-slate-200 pt-3 flex justify-between">
                  <span className="text-base font-bold text-slate-900">Tổng cộng</span>
                  <span className="text-xl font-black text-indigo-600">{formatPrice(total)}</span>
                </div>
              </div>

              <Link to="/checkout" className="btn btn-primary w-full py-3.5 text-sm font-extrabold mb-3 group">
                <CreditCard className="w-4 h-4" /> Thanh toán
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <div className="space-y-2 text-xs text-slate-500">
                <div className="flex items-center gap-2"><ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Hoàn tiền 100% trong 7 ngày</div>
                <div className="flex items-center gap-2"><ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Truy cập vĩnh viễn</div>
                <div className="flex items-center gap-2"><ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Chứng chỉ hoàn thành</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
