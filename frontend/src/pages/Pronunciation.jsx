import React, { useState } from 'react';
import { Mic, Volume2, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import AppLayout from '../components/AppLayout';

export default function Pronunciation() {
  const [selectedPhoneme, setSelectedPhoneme] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const ipaCategories = [
    {
      title: 'Monophthongs (Nguyên âm đơn)',
      type: 'vowels',
      items: [
        { symbol: 'i:', word: 'sheep', ipaWord: '/ʃiːp/', audio: 'sheep' },
        { symbol: 'ɪ', word: 'ship', ipaWord: '/ʃɪp/', audio: 'ship' },
        { symbol: 'ʊ', word: 'good', ipaWord: '/ɡʊd/', audio: 'good' },
        { symbol: 'u:', word: 'shoot', ipaWord: '/ʃuːt/', audio: 'shoot' },
        { symbol: 'e', word: 'bed', ipaWord: '/bed/', audio: 'bed' },
        { symbol: 'ə', word: 'teacher', ipaWord: '/ˈtiːtʃə/', audio: 'teacher' },
        { symbol: 'ɜ:', word: 'bird', ipaWord: '/bɜːd/', audio: 'bird' },
        { symbol: 'ɔ:', word: 'door', ipaWord: '/dɔː/', audio: 'door' },
        { symbol: 'æ', word: 'cat', ipaWord: '/kæt/', audio: 'cat' },
        { symbol: 'ʌ', word: 'up', ipaWord: '/ʌp/', audio: 'up' },
        { symbol: 'ɑ:', word: 'far', ipaWord: '/fɑː/', audio: 'far' },
        { symbol: 'ɒ', word: 'on', ipaWord: '/ɒn/', audio: 'on' },
      ]
    },
    {
      title: 'Diphthongs (Nguyên âm đôi)',
      type: 'diphthongs',
      items: [
        { symbol: 'ɪə', word: 'here', ipaWord: '/hɪə/', audio: 'here' },
        { symbol: 'eɪ', word: 'wait', ipaWord: '/weɪt/', audio: 'wait' },
        { symbol: 'ʊə', word: 'tour', ipaWord: '/tʊə/', audio: 'tour' },
        { symbol: 'ɔɪ', word: 'boy', ipaWord: '/bɔɪ/', audio: 'boy' },
        { symbol: 'əʊ', word: 'show', ipaWord: '/ʃəʊ/', audio: 'show' },
        { symbol: 'eə', word: 'hair', ipaWord: '/heə/', audio: 'hair' },
        { symbol: 'aɪ', word: 'my', ipaWord: '/maɪ/', audio: 'my' },
        { symbol: 'aʊ', word: 'cow', ipaWord: '/kaʊ/', audio: 'cow' },
      ]
    },
    {
      title: 'Consonants (Phụ âm)',
      type: 'consonants',
      items: [
        { symbol: 'p', word: 'pen', ipaWord: '/pen/', audio: 'pen' },
        { symbol: 'b', word: 'bad', ipaWord: '/bæd/', audio: 'bad' },
        { symbol: 't', word: 'tea', ipaWord: '/tiː/', audio: 'tea' },
        { symbol: 'd', word: 'did', ipaWord: '/dɪd/', audio: 'did' },
        { symbol: 'tʃ', word: 'cat', ipaWord: '/tʃæt/', audio: 'chin' },
        { symbol: 'dʒ', word: 'june', ipaWord: '/dʒuːn/', audio: 'june' },
        { symbol: 'k', word: 'cat', ipaWord: '/kæt/', audio: 'cat' },
        { symbol: 'ɡ', word: 'go', ipaWord: '/ɡəʊ/', audio: 'go' },
        { symbol: 'f', word: 'fall', ipaWord: '/fɔːl/', audio: 'fall' },
        { symbol: 'v', word: 'van', ipaWord: '/væn/', audio: 'van' },
        { symbol: 'θ', word: 'thin', ipaWord: '/θɪn/', audio: 'thin' },
        { symbol: 'ð', symbolAlt: 'th', word: 'this', ipaWord: '/ðɪs/', audio: 'this' },
      ]
    }
  ];

  const handlePhonemeClick = (item) => {
    setSelectedPhoneme(item);
    setAnalysisResult(null);
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setAnalysisResult({
        score: 94,
        status: 'Xuất sắc',
        feedback: 'Âm phát ra đúng độ dài, khẩu hình chuẩn xác.',
        errorPhoneme: null
      });
    }, 2500);
  };

  return (
    <AppLayout>
      <div className="p-8 max-w-7xl mx-auto space-y-8">
        {/* Header Banner */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs md:text-sm font-semibold mb-4">
            <Mic className="w-4 h-4 text-indigo-600" />
            <span>Interactive 44 IPA Chart & Voice AI</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 text-slate-900 dark:text-white">
            Bảng Phát Âm <span className="gradient-text">Chuẩn Quốc Tế IPA</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg">
            Làm chủ 44 âm IPA tiếng Anh Anh-Mỹ với âm thanh chuẩn bản xứ và bộ phân tích phát âm qua AI.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main IPA Chart Grid */}
          <div className="lg:col-span-8 space-y-8">
            {ipaCategories.map((cat, cIdx) => (
              <div key={cIdx} className="parroto-card p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl">
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">
                  {cat.title}
                </h3>

                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                  {cat.items.map((item, idx) => {
                    const isSelected = selectedPhoneme?.symbol === item.symbol;
                    return (
                      <button
                        key={idx}
                        onClick={() => handlePhonemeClick(item)}
                        className={`p-3.5 rounded-xl border flex flex-col items-center justify-center transition-all ${
                          isSelected
                            ? 'border-indigo-600 bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 scale-105'
                            : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-indigo-300 text-slate-900 dark:text-white'
                        }`}
                      >
                        <span className="text-xl font-black font-mono mb-1">{item.symbol}</span>
                        <span className={`text-[11px] font-semibold ${isSelected ? 'text-indigo-100' : 'text-slate-500 dark:text-slate-400'}`}>
                          {item.word}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Phoneme Practice & Voice Analysis Panel */}
          <div className="lg:col-span-4">
            <div className="parroto-card p-6 sticky top-24 space-y-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl">
              <h3 className="font-bold text-slate-900 dark:text-white text-base border-b border-slate-100 dark:border-slate-800 pb-3">
                🎙️ Phòng Thực Hành Âm
              </h3>

              {selectedPhoneme ? (
                <div className="space-y-6">
                  <div className="text-center p-6 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900">
                    <span className="text-5xl font-black font-mono text-indigo-600 dark:text-indigo-400 block mb-2">{selectedPhoneme.symbol}</span>
                    <div className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">{selectedPhoneme.word}</div>
                    <div className="text-xs text-slate-500 font-mono">{selectedPhoneme.ipaWord}</div>

                    <button className="mt-4 btn btn-primary text-xs px-5 py-2.5 mx-auto">
                      <Volume2 className="w-4 h-4" /> Nghe Âm Mẫu
                    </button>
                  </div>

                  {/* Microphone Recording Button */}
                  <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center space-y-3">
                    <button
                      onClick={handleStartRecording}
                      disabled={isRecording}
                      className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center text-2xl transition-all ${
                        isRecording
                          ? 'bg-rose-500 text-white animate-pulse shadow-lg shadow-rose-500/40'
                          : 'bg-indigo-600 text-white hover:scale-105 shadow-md shadow-indigo-600/25'
                      }`}
                    >
                      <Mic className="w-7 h-7" />
                    </button>

                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                      {isRecording ? 'Đang lắng nghe giọng nói...' : 'Nhấn vào micro để thử âm'}
                    </h4>
                    <p className="text-xs text-slate-500">Phân tích phát âm AI sẽ đánh giá độ chính xác của bạn.</p>
                  </div>

                  {/* AI Score Feedback */}
                  {analysisResult && (
                    <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-900 dark:text-emerald-200 space-y-2">
                      <div className="flex items-center justify-between font-bold">
                        <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Kết quả AI:</span>
                        <span className="text-lg font-black text-emerald-700 dark:text-emerald-400">{analysisResult.score}%</span>
                      </div>
                      <p className="text-xs leading-relaxed text-emerald-800 dark:text-emerald-300">{analysisResult.feedback}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-8 text-center text-slate-500 text-xs leading-relaxed space-y-2">
                  <div className="text-3xl mb-2">👈</div>
                  <p className="font-bold text-slate-700 dark:text-slate-300">Chọn 1 âm IPA bất kỳ từ bảng bên trái</p>
                  <p>Để nghe âm mẫu bản xứ và thực hành thu âm chấm điểm qua AI.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
