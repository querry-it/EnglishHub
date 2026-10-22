import React, { useState, useEffect, useCallback } from 'react';
import { BookOpen, Search, Users, RefreshCw, Clock, XCircle, CheckCircle2, ChevronRight, GraduationCap } from 'lucide-react';
import api from '../../api/axios';

const DEFAULT_COURSES = [
  {
    id: 'course-1',
    title: 'Khóa học IELTS cho người mới bắt đầu (Foundation 4.5+)',
    level: 'IELTS',
    studentsCount: 512,
    modulesCount: 6,
    lessonsCount: 36,
    updatedAt: new Date().toISOString()
  },
  {
    id: 'course-2',
    title: 'Khóa học IELTS Bứt phá Band 6.0 - 6.5+',
    level: 'IELTS',
    studentsCount: 389,
    modulesCount: 8,
    lessonsCount: 42,
    updatedAt: new Date().toISOString()
  },
  {
    id: 'course-3',
    title: 'TOEIC 750+ Intensive Listening & Reading',
    level: 'B2',
    studentsCount: 347,
    modulesCount: 5,
    lessonsCount: 28,
    updatedAt: new Date().toISOString()
  }
];

const DEFAULT_STUDENTS = [
  {
    id: 'st-1',
    fullName: 'Trần Thu Hà',
    email: 'thuha@gmail.com',
    completedLessonsCount: 27,
    completedLessons: [
      { title: '1.1 Giới thiệu tổng quan lộ trình IELTS Foundation', at: new Date().toISOString() },
      { title: '1.2 Ngữ pháp: Các thì cơ bản trong tiếng Anh', at: new Date().toISOString() },
      { title: '1.3 Từ vựng: 100 Từ vựng học thuật cơ bản', at: new Date().toISOString() },
      { title: '1.4 Quiz: Kiểm tra Từ vựng & Ngữ pháp Chương 1', at: new Date().toISOString() },
    ]
  },
  {
    id: 'st-2',
    fullName: 'Nguyễn Văn Minh',
    email: 'minhielts@gmail.com',
    completedLessonsCount: 34,
    completedLessons: [
      { title: '2.1 Chiến thuật xử lý Writing Task 2', at: new Date().toISOString() },
      { title: '2.2 Phát triển ý tưởng và bố cục Coherence', at: new Date().toISOString() },
      { title: '2.3 Bài kiểm tra Writing Task 2 — Education & Technology', at: new Date().toISOString() },
    ]
  },
  {
    id: 'st-3',
    fullName: 'Vũ Quốc Khánh',
    email: 'khanhvu99@gmail.com',
    completedLessonsCount: 18,
    completedLessons: [
      { title: '1.1 Khởi động kỹ năng Reading', at: new Date().toISOString() },
      { title: '1.2 Bài kiểm tra giữa kỳ: Reading & Writing Task 1', at: new Date().toISOString() },
    ]
  }
];

export default function InstructorCourses() {
  const [searchTerm, setSearchTerm] = useState('');
  const [courses, setCourses] = useState(DEFAULT_COURSES);
  const [loading, setLoading] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [students, setStudents] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(false);

  // Chi tiết tiến độ học viên
  const [selectedStudent, setSelectedStudent] = useState(null);

  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/instructor/my-courses');
      if (response.data.success && response.data.courses?.length > 0) {
        setCourses(response.data.courses);
      } else {
        setCourses(DEFAULT_COURSES);
      }
    } catch (error) {
      console.warn('Sử dụng dữ liệu khóa học mẫu:', error.message);
      setCourses(DEFAULT_COURSES);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const fetchStudents = async (courseId) => {
    try {
      setLoadingStudents(true);
      const response = await api.get(`/instructor/courses/${courseId}/students`);
      if (response.data.success && response.data.students?.length > 0) {
        setStudents(response.data.students);
      } else {
        setStudents(DEFAULT_STUDENTS);
      }
    } catch (error) {
      console.warn('Sử dụng dữ liệu học viên mẫu:', error.message);
      setStudents(DEFAULT_STUDENTS);
    } finally {
      setLoadingStudents(false);
    }
  };

  const filteredCourses = courses.filter(c =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto w-full pb-20 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
            <div className="p-2 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-200 dark:shadow-none">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            Giảng Viên: Khóa Học
          </h1>
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 ml-1">
            Theo dõi tiến độ học tập của các học viên trong khóa học của bạn.
          </p>
        </div>

        <button
          onClick={fetchCourses}
          className="group flex items-center gap-2 px-5 py-3 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-black text-slate-600 dark:text-slate-300 hover:border-indigo-500 hover:text-indigo-600 transition-all shadow-sm"
        >
          <RefreshCw className={`w-4 h-4 transition-transform group-hover:rotate-180 ${loading ? 'animate-spin' : ''}`} />
          LÀM MỚI
        </button>
      </div>

      {/* Grid - Small & Refined Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="bg-slate-50 dark:bg-slate-800/50 rounded-[2.5rem] h-60 animate-pulse" />
          ))
        ) : filteredCourses.length === 0 ? (
          <div className="col-span-full py-24 text-center">
             <div className="flex flex-col items-center gap-3">
              <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-[2rem] flex items-center justify-center">
                <BookOpen className="w-10 h-10 text-slate-200" />
              </div>
              <p className="text-slate-400 font-bold text-sm">Bạn chưa có khóa học nào được gán</p>
            </div>
          </div>
        ) : (
          filteredCourses.map((course) => (
            <div
              key={course.id}
              className="group bg-white dark:bg-slate-900 border-2 border-slate-50 dark:border-slate-800 rounded-[2rem] p-6 hover:shadow-xl hover:shadow-indigo-500/5 transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-indigo-600" />
                </div>
                <span className="px-3 py-1 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-full text-[9px] font-black uppercase">{course.level}</span>
              </div>

              <h3 className="text-lg font-black text-slate-800 dark:text-white mb-2 line-clamp-1">{course.title}</h3>

              <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">
                <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> {course.studentsCount} Học viên</span>
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {course.lessonsCount} Bài học</span>
              </div>

              <button
                onClick={() => {
                  setSelectedCourse(course);
                  fetchStudents(course.id);
                }}
                className="w-full py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-black text-[10px] uppercase tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-2"
              >
                Xem học viên
              </button>
            </div>
          ))
        )}
      </div>

      {/* Students Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] w-full max-w-2xl p-8 shadow-2xl border border-slate-200 dark:border-slate-800 scale-in-center max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center mb-6 shrink-0">
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">Danh Sách Học Viên</h3>
                <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mt-1">{selectedCourse.title}</p>
              </div>
              <button onClick={() => setSelectedCourse(null)}><XCircle className="w-6 h-6 text-slate-300 hover:text-rose-500 transition-colors" /></button>
            </div>

            <div className="overflow-y-auto pr-2 custom-scrollbar flex-1">
              {loadingStudents ? (
                <div className="py-20 text-center"><RefreshCw className="w-8 h-8 text-indigo-500 animate-spin mx-auto" /></div>
              ) : students.length > 0 ? (
                <div className="space-y-3">
                  {students.map(student => (
                    <div
                      key={student.id}
                      className="group flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 hover:border-indigo-500 transition-all cursor-pointer"
                      onClick={() => setSelectedStudent(student)}
                    >
                      <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black">
                        {student.fullName.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="font-black text-sm text-slate-800 dark:text-white">{student.fullName}</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase">{student.email}</div>
                      </div>
                      <div className="text-right flex items-center gap-4">
                        <div>
                          <div className="text-[9px] font-black text-indigo-600 uppercase">Đã hoàn thành</div>
                          <div className="text-xs font-black text-slate-900 dark:text-white">{student.completedLessonsCount} / {selectedCourse.lessonsCount} bài</div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 transition-colors" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 text-slate-400 font-bold">Chưa có học viên tham gia.</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Student Progress Detail Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-[160] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] w-full max-w-lg p-8 shadow-2xl border border-slate-200 dark:border-slate-800 scale-in-center">
            <div className="flex justify-between items-start mb-8">
              <div className="flex gap-4">
                <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white text-xl font-black">
                  {selectedStudent.fullName.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">{selectedStudent.fullName}</h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{selectedStudent.email}</p>
                </div>
              </div>
              <button onClick={() => setSelectedStudent(null)} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl"><XCircle className="w-6 h-6 text-slate-400" /></button>
            </div>

            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-2xl mb-6">
              <div className="flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-indigo-600" />
                <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">Tiến độ chi tiết</span>
              </div>
              <div className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
                {selectedStudent.completedLessonsCount} <span className="text-sm text-slate-400 font-bold">bài học đã học xong</span>
              </div>
            </div>

            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Các bài đã hoàn thành:</h4>

            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar mb-8">
              {selectedStudent.completedLessons.length > 0 ? (
                selectedStudent.completedLessons.map((lesson, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{lesson.title}</span>
                    </div>
                    <span className="text-[9px] font-black text-slate-400 italic">
                      {new Date(lesson.at).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-slate-400 text-xs font-bold italic border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-2xl">
                  Chưa bắt đầu học bài nào
                </div>
              )}
            </div>

            <button
              onClick={() => setSelectedStudent(null)}
              className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-xs uppercase tracking-[0.2em]"
            >
              Đóng chi tiết
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
