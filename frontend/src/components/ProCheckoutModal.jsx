import React, { useState } from 'react';
import { X, Crown, Copy, Check, MessageCircle, RefreshCw, CreditCard, Building2, Sparkles, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function ProCheckoutModal({ isOpen, onClose }) {
  const { user } = useAuth();
  const [selectedMethod, setSelectedMethod] = useState('bank'); // 'card' | 'bank'
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedAmount, setCopiedAmount] = useState(false);

  if (!isOpen) return null;

  const transferCode = `PA50BABAC5`;
  const amount = promoApplied ? '449.000' : '499.000';
  const rawAmount = promoApplied ? 449000 : 499000;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(transferCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyAmount = () => {
    navigator.clipboard.writeText(rawAmount.toString());
    setCopiedAmount(true);
    setTimeout(() => setCopiedAmount(false), 2000);
  };

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'ENGLISHHUB' || promoCode.trim().toUpperCase() === 'PRO50') {
      setPromoApplied(true);
    } else {
      alert('Mã giới thiệu không hợp lệ hoặc đã hết hạn.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in select-none overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col md:flex-row">
        
        {/* Top Close Button (Visible on mobile & desktop) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
          title="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ================= LEFT COLUMN: ORDER SUMMARY & PAYMENT METHOD ================= */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 bg-slate-50 dark:bg-slate-900/60 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 space-y-6 flex flex-col justify-between overflow-y-auto">
          
          <div className="space-y-6">
            {/* Payment Method Selector Tabs */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSelectedMethod('card')}
                className={`py-3 px-3 rounded-2xl text-xs font-black flex items-center justify-center gap-2 transition-all border-2 ${
                  selectedMethod === 'card'
                    ? 'border-indigo-600 bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Thẻ quốc tế</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMethod('bank')}
                className={`py-3 px-3 rounded-2xl text-xs font-black flex items-center justify-center gap-2 transition-all border-2 ${
                  selectedMethod === 'bank'
                    ? 'border-amber-400 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                }`}
              >
                <Building2 className="w-4 h-4 text-amber-500" />
                <span>Chuyển khoản nội địa</span>
              </button>
            </div>

            {/* Order Summary Header */}
            <div className="space-y-3">
              <h3 className="font-black text-lg text-slate-900 dark:text-white">
                Tóm tắt đơn hàng
              </h3>

              {/* Package Card */}
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-start gap-3 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-amber-400 text-amber-950 flex items-center justify-center font-black shrink-0 shadow-xs">
                  <Crown className="w-6 h-6 fill-current" />
                </div>
                <div>
                  <h4 className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                    EnglishHub Premium 1 năm
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                    Thanh toán một lần cho 1 năm học không giới hạn
                  </p>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 text-xs font-semibold text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-200 dark:border-slate-800">
                <div className="flex justify-between">
                  <span>Tổng phụ</span>
                  <span className="font-bold font-mono">949.000 đ</span>
                </div>
                <div className="flex justify-between">
                  <span>Thuế</span>
                  <span className="font-bold font-mono">0 đ</span>
                </div>
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-extrabold">
                  <span>Giảm giá</span>
                  <span>-47%</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-indigo-600 dark:text-indigo-400 font-extrabold">
                    <span>Mã ưu đãi (ENGLISHHUB)</span>
                    <span>-50.000 đ</span>
                  </div>
                )}
                <div className="flex justify-between items-baseline pt-2 border-t border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white">
                  <span className="text-sm font-black">Tổng cộng</span>
                  <div className="text-right">
                    <span className="text-xl font-black font-mono text-slate-900 dark:text-white">
                      {amount}.000 đ
                    </span>
                    <p className="text-[11px] text-slate-400 font-medium">
                      Tương đương {promoApplied ? '37.416' : '41.583'} đ/tháng
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                Bạn sẽ không bị tính phí cho đến khi thanh toán hoàn tất. Nếu bạn gặp bất kỳ vấn đề nào với quá trình thanh toán, vui lòng liên hệ với chúng tôi.
              </p>
            </div>
          </div>

          {/* Blue Contact Help Box */}
          <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800 space-y-3">
            <p className="text-xs font-semibold text-sky-900 dark:text-sky-200">
              Nếu bạn gặp vấn đề về thanh toán, hãy liên hệ với chúng tôi qua Messenger để được hỗ trợ.
            </p>

            <a
              href="https://m.me/englishhub"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-[#1E2540] hover:bg-[#161a2e] text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
            >
              <MessageCircle className="w-4 h-4 text-sky-400 fill-current" />
              <span>Liên hệ hỗ trợ</span>
            </a>
          </div>

        </div>

        {/* ================= RIGHT COLUMN: BANK QR CODE & PROMO INPUT ================= */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 bg-white dark:bg-slate-900 space-y-6 flex flex-col justify-between overflow-y-auto">
          
          <div className="space-y-5">
            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="space-y-1.5">
              <label className="text-[11px] font-black uppercase tracking-wider text-slate-400 block">
                Mã giới thiệu
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="NHẬP MÃ GIỚI THIỆU"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider focus:outline-none focus:border-indigo-600"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-black text-xs transition-colors shrink-0"
                >
                  Áp dụng
                </button>
              </div>
            </form>

            {/* Instruction Header */}
            <div className="space-y-1">
              <h4 className="font-black text-sm text-slate-900 dark:text-white">
                Chuyển khoản ngân hàng nội địa
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                Thanh toán qua chuyển khoản ngân hàng nội địa Việt Nam. Quét mã QR hoặc chuyển khoản với nội dung bên dưới để hoàn tất.
              </p>
            </div>

            {/* SePay QR Code Frame Card */}
            <div className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border-2 border-slate-200 dark:border-slate-700 text-center space-y-4 shadow-sm">
              
              {/* SePay Header Logo Banner */}
              <div className="flex items-center justify-center gap-2">
                <div className="px-3 py-1 bg-indigo-600 text-white rounded-lg font-black text-xs tracking-wider flex items-center gap-1 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5" /> SePay
                </div>
              </div>

              {/* QR Image Box */}
              <div className="w-48 h-48 mx-auto p-2 bg-white rounded-2xl border border-slate-200 dark:border-slate-700 shadow-md relative group flex items-center justify-center">
                <img
                  src={`https://api.vietqr.io/image/970422-933618618-compact.png?amount=${rawAmount}&addInfo=${transferCode}`}
                  alt="VietQR Payment Code"
                  className="w-full h-full object-contain rounded-xl"
                  onError={(e) => {
                    // Fallback if image network error
                    e.target.onerror = null;
                    e.target.src = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=MBBank_933618618_PA50BABAC5";
                  }}
                />
              </div>

              {/* Logos at bottom of QR (napas247 | MB | VietQR) */}
              <div className="flex items-center justify-center gap-3 text-[10px] font-black text-slate-400 uppercase tracking-widest border-t border-b border-slate-200 dark:border-slate-700 py-1.5">
                <span className="text-sky-600">napas247</span>
                <span>•</span>
                <span className="text-blue-700">MB</span>
                <span>•</span>
                <span className="text-rose-600">VietQR</span>
              </div>

              {/* Bank & Account Details */}
              <div className="space-y-2 text-xs font-bold text-slate-800 dark:text-slate-200">
                <div className="text-slate-600 dark:text-slate-400 font-mono">
                  MBBank - <span className="text-slate-900 dark:text-white font-extrabold font-mono text-sm">933618618</span>
                </div>

                <div className="text-lg font-black font-mono text-slate-900 dark:text-white">
                  {amount}.000 đ
                </div>

                {/* Transfer Code Box with Copy Button */}
                <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-2">
                  <div className="text-left min-w-0">
                    <span className="text-[10px] font-black text-slate-400 uppercase block">Nội dung chuyển khoản:</span>
                    <span className="font-mono font-black text-indigo-600 dark:text-indigo-400 text-sm tracking-wider">
                      {transferCode}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 text-slate-700 dark:text-slate-200 font-extrabold text-xs flex items-center gap-1.5 transition-colors shrink-0"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                    <span>{copiedCode ? 'Đã chép' : 'Sao chép'}</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Waiting Payment Animation Footer */}
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 pt-1">
              <RefreshCw className="w-4 h-4 text-indigo-500 animate-spin" />
              <span>Đang chờ thanh toán...</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
