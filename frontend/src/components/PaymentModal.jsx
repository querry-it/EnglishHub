import React, { useState } from 'react';
import { 
  X, CreditCard, Landmark, Check, Plus, 
  MessageCircle, Copy, RotateCw, Crown, ShieldCheck
} from 'lucide-react';

export default function PaymentModal({ isOpen, onClose, selectedPlan, onSuccess }) {
  const [activeTab, setActiveTab] = useState('domestic'); // 'international' | 'domestic'
  
  if (!isOpen || !selectedPlan) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col md:flex-row relative">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LEFT COLUMN: Order Summary */}
        <div className="w-full md:w-1/2 bg-slate-50 p-6 md:p-8 border-r border-slate-200 flex flex-col">
          <h2 className="text-xl font-black text-slate-900 mb-6">Tóm tắt đơn hàng</h2>
          
          <div className="flex gap-4 mb-8">
            <div className="w-10 h-10 rounded-full bg-amber-400 text-amber-950 flex items-center justify-center shrink-0 shadow-sm shadow-amber-200">
              <Crown className="w-5 h-5 text-white fill-white" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-[15px]">EnglishHub Premium {selectedPlan.title}</h3>
              <p className="text-sm text-slate-500 font-medium mt-0.5">Thanh toán một lần cho {selectedPlan.title}</p>
            </div>
          </div>

          <div className="space-y-4 text-sm font-semibold mb-6">
            <div className="flex justify-between text-slate-600">
              <span>Tổng phụ</span>
              <span>{selectedPlan.price}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Thuế</span>
              <span>0 đ</span>
            </div>
            {selectedPlan.discount && (
              <div className="flex justify-between text-emerald-600">
                <span>Giảm giá</span>
                <span>{selectedPlan.discount}</span>
              </div>
            )}
          </div>

          <div className="border-t border-slate-200 pt-6 mb-6">
            <div className="flex justify-between items-end mb-1">
              <span className="font-bold text-slate-900">Tổng cộng</span>
              <span className="text-2xl font-black text-slate-900">{selectedPlan.price}</span>
            </div>
            {selectedPlan.monthly && (
              <p className="text-right text-xs text-slate-500 font-medium">Tương đương {selectedPlan.monthly.replace('~ ', '')}</p>
            )}
          </div>

          <p className="text-[11px] text-slate-500 font-medium leading-relaxed mb-6">
            Bạn sẽ không bị tính phí cho đến khi thanh toán hoàn tất. Nếu bạn gặp bất kỳ vấn đề nào với quá trình thanh toán, vui lòng liên hệ với chúng tôi.
          </p>

          <div className="bg-blue-50/80 border border-blue-100 rounded-2xl p-5 mt-auto">
            <p className="text-xs text-blue-800 font-semibold mb-3 leading-relaxed">
              Nếu bạn gặp vấn đề về thanh toán, hãy liên hệ với chúng tôi qua Messenger để được hỗ trợ.
            </p>
            <button className="w-full py-2.5 bg-[#1E2540] hover:bg-[#161a2e] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors">
              <MessageCircle className="w-4 h-4 fill-white" /> Liên hệ hỗ trợ
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Payment Details */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col min-h-[600px] md:h-[650px] overflow-y-auto">
          
          {/* Tabs */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setActiveTab('international')}
              className={`flex-1 py-3 px-2 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-all ${
                activeTab === 'international' 
                  ? 'border-amber-400 bg-amber-50/30' 
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <CreditCard className={`w-5 h-5 ${activeTab === 'international' ? 'text-amber-500' : 'text-slate-400'}`} />
              <span className={`text-xs font-bold ${activeTab === 'international' ? 'text-slate-800' : 'text-slate-500'}`}>
                Thẻ quốc tế
              </span>
            </button>

            <button
              onClick={() => setActiveTab('domestic')}
              className={`flex-1 py-3 px-2 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-all ${
                activeTab === 'domestic' 
                  ? 'border-amber-400 bg-amber-50/30' 
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <Landmark className={`w-5 h-5 ${activeTab === 'domestic' ? 'text-amber-500' : 'text-slate-400'}`} />
              <span className={`text-xs font-bold ${activeTab === 'domestic' ? 'text-slate-800' : 'text-slate-500'}`}>
                Chuyển khoản nội địa
              </span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1">
            
            {/* Referral Code (Shared) */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-slate-700 mb-2">Mã giới thiệu</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="NHẬP MÃ GIỚI THIỆU" 
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 text-sm font-semibold uppercase"
                />
                <button className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-colors">
                  Áp dụng
                </button>
              </div>
            </div>

            {activeTab === 'domestic' ? (
              /* Domestic Transfer Content */
              <div className="flex flex-col items-center text-center animate-fade-in pb-4">
                <h3 className="font-bold text-slate-900 text-[15px] mb-2">Chuyển khoản ngân hàng nội địa</h3>
                <p className="text-[13px] text-slate-500 font-medium mb-6 px-4">
                  Thanh toán qua chuyển khoản ngân hàng nội địa Việt Nam. Quét mã QR hoặc chuyển khoản với nội dung bên dưới để hoàn tất.
                </p>

                {/* QR Box */}
                <div className="border border-slate-200 rounded-2xl p-4 w-[240px] mb-6 relative bg-white shadow-sm">
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center gap-1">
                    <span className="text-[#0052A3] font-black text-lg italic tracking-tighter">Se</span>
                    <span className="text-[#00B4D8] font-black text-lg italic tracking-tighter">Pay</span>
                  </div>
                  <div className="mt-8 mb-2 flex justify-center">
                    <img 
                      src={`https://img.vietqr.io/image/MB-933618618-compact.png?amount=${selectedPlan.price.replace(/\\D/g, '')}&addInfo=PA50BABAC5&accountName=SEPAY`} 
                      alt="VietQR" 
                      className="w-48 h-48 object-contain"
                    />
                  </div>
                  <div className="flex justify-center items-center gap-3 mt-2 h-6">
                    <img src="https://img.vietqr.io/image/napas247.png" alt="Napas" className="h-4 object-contain opacity-70 grayscale" />
                    <div className="w-px h-3 bg-slate-300"></div>
                    <img src="https://img.vietqr.io/image/MB.png" alt="MB" className="h-4 object-contain opacity-70 grayscale" />
                    <div className="w-px h-3 bg-slate-300"></div>
                    <img src="https://img.vietqr.io/image/vietqr.png" alt="VietQR" className="h-4 object-contain opacity-70 grayscale" />
                  </div>
                </div>

                {/* Account Details */}
                <div className="space-y-1 mb-6">
                  <p className="text-sm font-bold text-slate-700">MBBank - 933618618</p>
                  <p className="text-lg font-black text-slate-900">{selectedPlan.price}</p>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <span className="text-[11px] text-slate-500 font-semibold">Nội dung chuyển khoản:</span>
                    <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg">
                      <span className="text-xs font-black text-slate-800">PA50BABAC5</span>
                      <button className="text-slate-400 hover:text-slate-600 transition-colors">
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 text-slate-500 mb-3">
                  <RotateCw className="w-4 h-4 animate-spin" />
                  <span className="text-[13px] font-semibold">Đang chờ thanh toán...</span>
                </div>

                <button 
                  onClick={() => {
                    if (onSuccess) onSuccess(selectedPlan);
                    onClose();
                  }}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>XÁC NHẬN ĐÃ CHUYỂN KHOẢN (KÍCH HOẠT)</span>
                </button>
              </div>
            ) : (
              /* International Card Content */
              <div className="space-y-5 animate-fade-in">
                
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Name on card</label>
                  <input 
                    type="text" 
                    placeholder="Cardholder name" 
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Card details</label>
                  <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                    <div className="flex items-center px-4 py-3 border-b border-slate-200">
                      <input 
                        type="text" 
                        placeholder="xxxx xxxx xxxx xxxx" 
                        className="flex-1 focus:outline-none text-sm font-semibold"
                      />
                      <div className="flex items-center gap-1 shrink-0 ml-2">
                        {/* Generic Card Icons */}
                        <div className="w-8 h-5 bg-[#1434CB] rounded border border-slate-100 flex items-center justify-center">
                          <span className="text-[10px] font-black text-white italic">VISA</span>
                        </div>
                        <div className="w-8 h-5 bg-[#252525] rounded border border-slate-100 flex items-center justify-center relative overflow-hidden">
                           <div className="w-5 h-5 rounded-full bg-[#EB001B] absolute -left-1"></div>
                           <div className="w-5 h-5 rounded-full bg-[#F79E1B] absolute -right-1 mix-blend-screen"></div>
                        </div>
                        <div className="w-8 h-5 bg-[#006FCF] rounded border border-slate-100 flex items-center justify-center">
                          <span className="text-[9px] font-black text-white">AMEX</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex">
                      <input 
                        type="text" 
                        placeholder="MM / YY" 
                        className="w-1/2 px-4 py-3 border-r border-slate-200 focus:outline-none text-sm font-semibold"
                      />
                      <div className="w-1/2 px-4 py-3 flex items-center">
                        <input 
                          type="text" 
                          placeholder="CVV" 
                          className="w-full focus:outline-none text-sm font-semibold"
                        />
                        <CreditCard className="w-4 h-4 text-slate-400 shrink-0" />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Country</label>
                  <select className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 text-sm font-semibold text-slate-800 appearance-none bg-white">
                    <option>Viet Nam</option>
                  </select>
                  <p className="text-[11px] text-slate-500 font-medium mt-2 leading-relaxed">
                    We collect this information to prevent fraud and secure your payment.
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-2 space-y-1">
                  <button className="w-full flex items-center justify-between py-2 text-sm font-bold text-slate-700 hover:text-indigo-600 transition-colors group">
                    <span>Add VAT number</span>
                    <Plus className="w-4 h-4 text-slate-400 group-hover:text-indigo-600" />
                  </button>
                  <button className="w-full flex items-center justify-between py-2 text-sm font-bold text-slate-700 hover:text-indigo-600 transition-colors group">
                    <span>Add discount code</span>
                    <Plus className="w-4 h-4 text-slate-400 group-hover:text-indigo-600" />
                  </button>
                </div>

                <label className="flex items-start gap-3 py-2 cursor-pointer">
                  <input type="checkbox" className="mt-1 w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                  <span className="text-[11px] font-medium text-slate-500 leading-relaxed">
                    EnglishHub Company Limited may send me product updates and offers via email. It is possible to opt-out at any time.
                  </span>
                </label>

                <button 
                  onClick={() => {
                    if (onSuccess) onSuccess(selectedPlan);
                    onClose();
                  }}
                  className="w-full py-3.5 bg-[#1E2540] hover:bg-[#161a2e] text-white rounded-xl text-sm font-black transition-colors shadow-md mt-2"
                >
                  Thanh toán {selectedPlan.price}
                </button>

                <div className="text-center pt-2">
                  <p className="text-[10px] text-slate-500 font-medium">
                    Sold by <span className="font-bold text-slate-700">paddle</span> 30 Old Bailey, London, EC4M 7AU, UK.<br/>
                    Provided by EnglishHub Company Limited. <a href="#" className="underline">Support</a> <a href="#" className="underline">Terms</a> <a href="#" className="underline">Privacy</a>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
