import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import {
  CloudArrowUpIcon,
  TableCellsIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  TrashIcon,
  BookOpenIcon,
  SpeakerWaveIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const AdminVocabPage = () => {
  const [file, setFile] = useState(null);
  const [previewData, setPreviewData] = useState([]);
  const [existingDecks, setExistingDecks] = useState([]);
  const [showExistingDecks, setShowExistingDecks] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [deckInfo, setDeckInfo] = useState({
    title: '4000 Essential English Words - Book 1',
    category: '4000 Essential Words'
  });

  useEffect(() => {
    fetchDecks();
  }, []);

  const fetchDecks = async () => {
    setFetching(true);
    try {
      const response = await api.get('/vocabulary/decks');
      setExistingDecks(response.data);
    } catch (err) {
      console.error("Lỗi lấy danh sách bộ từ:", err);
    } finally {
      setFetching(false);
    }
  };

  const handleDeleteDeck = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa bộ từ vựng này không? Dữ liệu từ vựng trong bộ cũng sẽ bị xóa.')) return;
    try {
      await api.delete(`/admin/vocab/decks/${id}`);
      setExistingDecks(prev => prev.filter(d => d.id !== id));
      setSuccess('Đã xóa bộ từ vựng thành công!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Lỗi khi xóa: ' + (err.response?.data?.message || err.message));
      setTimeout(() => setError(''), 5000);
    }
  };

  const playAudio = (url, word) => {
    if (!url && !word) return;

    // Tạo đối tượng audio và cấu hình
    const audio = new Audio();
    // Ưu tiên dùng URL từ database, nếu không có dùng fallback Youdao ngay
    audio.src = url || `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(word)}&type=2`;

    audio.play().catch(e => {
      console.warn("Nguồn âm thanh gốc lỗi, đang thử nguồn dự phòng...", e);
      if (word) {
        // Fallback sang Youdao TTS nếu nguồn gốc (Dictionary API) bị lỗi định dạng
        const fallbackUrl = `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(word)}&type=2`;
        const retryAudio = new Audio(fallbackUrl);
        retryAudio.play().catch(err => console.error("Tất cả các nguồn âm thanh đều thất bại:", err));
      }
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.name.endsWith('.csv')) {
      setFile(selectedFile);
      setError('');
    } else {
      setError('Vui lòng chọn file định dạng .csv');
      setFile(null);
    }
  };

  const handlePreview = async () => {
    if (!file) return;
    setLoading(true);
    setError('');
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const text = e.target.result;
        try {
          const response = await api.post('/admin/vocab/preview', { csvData: text });
          setPreviewData(response.data);
          setLoading(false);
        } catch (err) {
          setError('Lỗi khi gửi dữ liệu lên server: ' + (err.response?.data?.message || err.message));
          setLoading(false);
        }
      };
      reader.readAsText(file);
    } catch (err) {
      setError('Lỗi khi đọc file: ' + err.message);
      setLoading(false);
    }
  };

  const handleImport = async () => {
    if (previewData.length === 0) return;
    setLoading(true);
    setError('');
    try {
      await api.post('/admin/vocab/commit', {
        deckTitle: deckInfo.title,
        category: deckInfo.category,
        words: previewData
      });
      setSuccess('Đã nhập thành công bộ từ vựng!');
      setPreviewData([]);
      setFile(null);
      fetchDecks();
    } catch (err) {
      setError('Lỗi khi lưu dữ liệu: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-slate-50 dark:bg-slate-900 min-h-screen">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Quản lý Từ vựng</h1>
          <p className="text-slate-500 dark:text-slate-400">Nhập bộ từ mới và quản lý dữ liệu hiện có</p>
        </div>
        <button
          onClick={() => setShowExistingDecks(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-200 font-semibold hover:bg-slate-50 transition-all shadow-sm"
        >
          <BookOpenIcon className="w-5 h-5 text-indigo-500" />
          Các bộ đã đăng
        </button>
      </div>

      {/* Import Section */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden mb-8">
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-slate-100 dark:border-slate-700">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Tên Bộ từ vựng</label>
            <input
              type="text"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
              value={deckInfo.title}
              onChange={(e) => setDeckInfo({...deckInfo, title: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Thể loại</label>
            <input
              type="text"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
              value={deckInfo.category}
              onChange={(e) => setDeckInfo({...deckInfo, category: e.target.value})}
            />
          </div>
        </div>

        <div className="p-6 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 w-full">
            <label className="flex items-center justify-center w-full h-32 border-2 border-slate-200 dark:border-slate-700 border-dashed rounded-2xl cursor-pointer hover:border-blue-400 transition-colors">
              <div className="flex flex-col items-center space-y-2">
                <CloudArrowUpIcon className="w-8 h-8 text-slate-400" />
                <span className="font-medium text-slate-600 dark:text-slate-300">{file ? file.name : "Chọn file CSV"}</span>
              </div>
              <input type="file" className="hidden" accept=".csv" onChange={handleFileChange} />
            </label>
          </div>
          <div className="flex flex-col gap-3 w-full md:w-auto min-w-[200px]">
            <button
              onClick={handlePreview}
              disabled={!file || loading}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition-all"
            >
              {loading ? <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <TableCellsIcon className="w-5 h-5" />}
              Xem trước
            </button>
            {previewData.length > 0 && (
              <button
                onClick={handleImport}
                disabled={loading}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all"
              >
                <CheckCircleIcon className="w-5 h-5" />
                Lưu vào hệ thống
              </button>
            )}
          </div>
        </div>
      </div>

      {error && <div className="mb-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl flex items-center gap-3"><ExclamationCircleIcon className="w-6 h-6" />{error}</div>}
      {success && <div className="mb-6 p-4 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl flex items-center gap-3"><CheckCircleIcon className="w-6 h-6" />{success}</div>}

      {/* Bảng Preview Full-width */}
      {previewData.length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex justify-between items-center">
            <h2 className="font-bold text-slate-800 dark:text-white tracking-tight">Dữ liệu Preview ({previewData.length} từ)</h2>
            <button onClick={() => setPreviewData([])} className="text-red-500 hover:text-red-600"><TrashIcon className="w-5 h-5" /></button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                  <th className="px-6 py-4 font-bold">ẢNH & TỪ</th>
                  <th className="px-6 py-4 font-bold">NGHĨA & PHIÊN ÂM</th>
                  <th className="px-6 py-4 font-bold">ĐỊNH NGHĨA & VÍ DỤ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {previewData.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="px-6 py-6 min-w-[250px]">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.imageUrl}
                          alt={item.word}
                          className="w-20 h-20 rounded-xl object-cover border border-slate-200 dark:border-slate-600 bg-slate-100 shadow-sm"
                          onError={(e) => {
                            if (!e.target.src.includes('placehold.co')) {
                              e.target.src = `https://placehold.co/320x240?text=${item.word}`;
                            }
                          }}
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-black text-blue-600 dark:text-blue-400 text-xl">{item.word}</span>
                            {item.audioUrl && (
                              <button onClick={() => playAudio(item.audioUrl, item.word)} className="p-1.5 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100">
                                <SpeakerWaveIcon className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                          <div className="text-xs text-slate-400 mt-1 font-medium">#{idx + 1}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6 min-w-[180px]">
                      <div className="font-bold text-slate-800 dark:text-slate-200 text-lg">{item.meaning}</div>
                      <div className="text-sm text-slate-500 dark:text-slate-400 font-mono mt-1 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded w-fit">{item.phonetic}</div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="text-slate-700 dark:text-slate-300 leading-relaxed mb-2">{item.definition}</div>
                      <div className="text-sm text-slate-500 dark:text-slate-400 italic bg-amber-50/50 dark:bg-amber-900/10 p-2 rounded-lg border-l-2 border-amber-400">
                        <span className="font-bold text-amber-600 dark:text-amber-400 mr-1">Ex:</span>
                        {item.example}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Existing Decks */}
      {showExistingDecks && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
            <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-800 dark:text-white">Bộ từ vựng đã đăng</h2>
              <button onClick={() => setShowExistingDecks(false)} className="p-2 hover:bg-slate-100 rounded-full">
                <XMarkIcon className="w-6 h-6 text-slate-500" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {fetching ? (
                <div className="py-20 text-center text-slate-400">Đang tải...</div>
              ) : existingDecks.map((deck) => (
                <div key={deck.id} className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-slate-800 dark:text-white">{deck.title}</h3>
                    <div className="text-xs text-slate-500 mt-1">{deck.category} • {deck.cardsCount} từ</div>
                  </div>
                  <button onClick={() => handleDeleteDeck(deck.id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminVocabPage;
