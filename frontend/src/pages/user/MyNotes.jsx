import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileEdit, Trash2, Edit3, Sparkles, Crown, Search, 
  BookOpen, CheckCircle2, Volume2, Plus, Check, X
} from 'lucide-react';
import AppLayout from '../../components/AppLayout';
import { useAuth } from '../../context/AuthContext';

export default function MyNotes() {
  const { user } = useAuth();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  // Sample Saved Notes Dataset (Matching Reference Screenshot)
  const [notesList, setNotesList] = useState([
    {
      id: 1,
      lessonTitle: 'My Perfect Bath Time',
      lessonLink: '/listening?lessonId=1',
      sentence: 'One of my favorite times of the day is bath time.',
      phonetics: '\\wʌn ʌv maɪ ˈfeɪvərɪt ˈtaɪmz ʌv ðə ˈdeɪ ɪz `bæθ `taɪm\\',
      translation: 'Một trong những khoảng thời gian yêu thích của tôi trong ngày là giờ tắm bồn.',
      userNote: 'hi',
      date: 'Sep 23, 2026 19:49'
    },
    {
      id: 2,
      lessonTitle: 'Ordering Coffee at Starbucks',
      lessonLink: '/listening?lessonId=5',
      sentence: 'Could I get an iced caramel macchiato with oat milk, please?',
      phonetics: '\\kʊd aɪ ɡɛt ən aɪst ˈkærəməl ˌmækiˈɑːtoʊ wɪð oʊt mɪlk pliːz\\',
      translation: 'Cho tôi một ly caramel macchiato đá dùng sữa yến mạch được không?',
      userNote: 'Mẫu câu đặt đồ uống lịch sự: Could I get [tên món] + [yêu cầu thay đổi]...',
      date: 'Sep 21, 2026 14:20'
    },
    {
      id: 3,
      lessonTitle: 'Job Interview Tips — Introduce Yourself',
      lessonLink: '/listening?lessonId=6',
      sentence: 'I am confident that my skills and experience align with your core values.',
      phonetics: '\\aɪ æm ˈkɒnfɪdənt ðæt maɪ skɪlz ænd ɪkˈspɪəriəns əˈlaɪn wɪð jɔːr kɔːr ˈvæljuːz\\',
      translation: 'Tôi tự tin rằng kỹ năng và kinh nghiệm của mình phù hợp với các giá trị cốt lõi của công ty.',
      userNote: 'Cụm từ hay dùng trong phỏng vấn: align with core values (phù hợp giá trị cốt lõi).',
      date: 'Sep 18, 2026 09:15'
    }
  ]);

  // Start editing a note
  const handleStartEdit = (note) => {
    setEditingId(note.id);
    setEditingText(note.userNote);
  };

  // Save edited note
  const handleSaveEdit = (id) => {
    setNotesList(notesList.map(n => n.id === id ? { ...n, userNote: editingText } : n));
    setEditingId(null);
  };

  // Delete note
  const handleDeleteNote = (id) => {
    setNotesList(notesList.filter(n => n.id !== id));
  };

  // Filter notes search
  const filteredNotes = notesList.filter(n => 
    n.sentence.toLowerCase().includes(searchTerm.toLowerCase()) ||
    n.userNote.toLowerCase().includes(searchTerm.toLowerCase()) ||
    n.lessonTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="w-full min-h-screen pb-16 select-none">
        <div className="max-w-4xl mx-auto px-2 sm:px-4 space-y-6">
          
          {/* ================= 1. HEADER WITH MASCOT ================= */}
          <div className="text-center space-y-2 py-4">
            <div className="w-16 h-16 rounded-3xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto shadow-xs border-2 border-indigo-200 dark:border-indigo-800">
              <span className="text-3xl">🦜</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Ghi chú của tôi
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400">
              Tất cả ghi chú của bạn ở một nơi
            </p>
          </div>

          {/* ================= 2. FREE PLAN LIMIT STORAGE BANNER ================= */}
          <div className="p-4 sm:p-5 rounded-3xl bg-sky-50 dark:bg-sky-950/60 border-2 border-sky-200 dark:border-sky-800/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-extrabold text-sky-900 dark:text-sky-200">
              <Sparkles className="w-4 h-4 text-sky-500 shrink-0" />
              <span>Gói miễn phí: bạn được lưu tối đa 100 ghi chú. Nâng cấp Premium để lưu lên đến 5000 ghi chú.</span>
            </div>

            <Link
              to="/pricing"
              className="px-5 py-2.5 rounded-2xl bg-[#1E2540] dark:bg-indigo-600 hover:bg-[#151a2e] text-white font-black text-xs uppercase tracking-wider shadow-md transition-transform active:scale-98 shrink-0 flex items-center gap-1.5 self-end sm:self-auto"
            >
              <Crown className="w-4 h-4 text-amber-300 fill-current" />
              <span>NÂNG CẤP</span>
            </Link>
          </div>

          {/* Search Filter Box */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm trong ghi chú của bạn..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 transition-colors shadow-xs"
            />
          </div>

          {/* ================= 3. NOTES CARDS STREAM ================= */}
          <div className="space-y-5">
            {filteredNotes.length === 0 ? (
              <div className="py-16 text-center rounded-3xl border-2 border-dashed border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
                <FileEdit className="w-12 h-12 text-slate-400 mx-auto" />
                <p className="text-sm font-extrabold text-slate-700 dark:text-slate-300">
                  Chưa tìm thấy ghi chú nào
                </p>
                <p className="text-xs text-slate-400">
                  Hãy ghi lại những câu từ vựng hoặc bài học trong lúc luyện tập nhé!
                </p>
              </div>
            ) : (
              filteredNotes.map((note) => (
                <div
                  key={note.id}
                  className="bg-amber-50/70 dark:bg-amber-950/40 p-5 sm:p-6 rounded-3xl border-2 border-amber-300 dark:border-amber-700/80 shadow-xs space-y-4 transition-all"
                >
                  {/* Lesson Title Link Header */}
                  <Link 
                    to={note.lessonLink}
                    className="text-xs sm:text-sm font-extrabold text-sky-600 hover:text-sky-700 underline block"
                  >
                    {note.lessonTitle}
                  </Link>

                  {/* Target English Sentence */}
                  <h3 className="text-sm sm:text-base font-black text-amber-950 dark:text-amber-100 leading-snug">
                    {note.sentence}
                  </h3>

                  {/* Phonetic IPA */}
                  <p className="text-xs font-mono font-medium text-amber-800/80 dark:text-amber-300/80 tracking-wide">
                    {note.phonetics}
                  </p>

                  {/* Vietnamese Meaning Pill Box */}
                  <div className="p-3 rounded-2xl bg-amber-100/60 dark:bg-amber-900/40 border border-amber-200 dark:border-amber-800 text-xs font-semibold text-amber-900 dark:text-amber-200 leading-relaxed">
                    {note.translation}
                  </div>

                  {/* User Note Section */}
                  <div className="pt-2 border-t border-amber-200 dark:border-amber-800/60 flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-1">
                      <span className="text-[11px] font-black uppercase text-amber-900/70 dark:text-amber-300/70 block">
                        Ghi chú:
                      </span>

                      {editingId === note.id ? (
                        <div className="flex items-center gap-2 pt-1">
                          <input 
                            type="text"
                            value={editingText}
                            onChange={(e) => setEditingText(e.target.value)}
                            className="flex-1 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-amber-400 text-xs font-bold text-slate-900 dark:text-white"
                          />
                          <button
                            onClick={() => handleSaveEdit(note.id)}
                            className="p-1.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="p-1.5 rounded-xl bg-slate-300 text-slate-700 hover:bg-slate-400"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <p className="text-xs font-bold text-amber-950 dark:text-amber-100 leading-relaxed">
                          {note.userNote}
                        </p>
                      )}

                      <span className="text-[10px] font-semibold text-amber-800/60 dark:text-amber-400/60 block pt-1 font-mono">
                        {note.date}
                      </span>
                    </div>

                    {/* Action Buttons (Edit & Delete Icons) */}
                    <div className="flex items-center gap-2 shrink-0 pt-1">
                      <button
                        onClick={() => handleStartEdit(note)}
                        title="Chỉnh sửa ghi chú"
                        className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 border border-amber-300 dark:border-amber-700 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-amber-100 transition-colors shadow-2xs"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDeleteNote(note.id)}
                        title="Xóa ghi chú"
                        className="w-8 h-8 rounded-full bg-rose-50 dark:bg-rose-950 border border-rose-200 dark:border-rose-800 flex items-center justify-center text-rose-600 dark:text-rose-400 hover:bg-rose-100 transition-colors shadow-2xs"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </AppLayout>
  );
}
