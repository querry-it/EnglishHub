import React from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] w-full flex flex-col items-center justify-center p-8 text-center bg-white dark:bg-slate-900 rounded-3xl border-2 border-rose-200 dark:border-rose-900/50 space-y-4 my-6">
          <div className="w-14 h-14 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center shadow-inner">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <div className="space-y-1 max-w-md">
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              Đã xảy ra sự cố hiển thị bài học
            </h3>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {this.state.error?.message || "Hệ thống gặp sự cố tải phân đoạn bài học. Vui lòng tải lại trang."}
            </p>
          </div>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.reload();
            }}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-extrabold text-xs flex items-center gap-2 shadow-md hover:bg-indigo-700 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>TẢI LẠI TRANG</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
