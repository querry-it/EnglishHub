import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, BookOpen, FileText, Bell, TrendingUp, DollarSign, 
  UserPlus, ShoppingBag, ArrowUpRight, ArrowDownRight, 
  ChevronRight, Star, ShieldCheck, Activity
} from 'lucide-react';

function DashboardOverview({ stats, monthlyRevenue, topCourses, recentOrders, statusColors, statusLabels }) {
  return (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-lg hover:border-indigo-200 transition-all animate-fade-in-up" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl ${stat.bg} border flex items-center justify-center ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-xs font-bold flex items-center gap-0.5 ${stat.up ? 'text-emerald-600' : 'text-rose-500'}`}>
                  {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.change}
                </span>
              </div>
              <div className="text-2xl font-black text-slate-900">{stat.value}</div>
              <div className="text-xs text-slate-500 font-medium">{stat.label}</div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-500" /> Doanh thu 6 tháng gần nhất
            </h3>
            <span className="text-xs text-slate-500 font-medium">Đơn vị: Triệu VNĐ</span>
          </div>
          <div className="flex items-end gap-4 h-48">
            {monthlyRevenue.map((m, i) => {
              const heightPercent = (m.value / 50) * 100;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-xs font-bold text-slate-600">{m.value}M</span>
                  <div className="w-full relative" style={{ height: '150px' }}>
                    <div className="absolute bottom-0 w-full rounded-xl bg-slate-100" style={{ height: '100%' }} />
                    <div className="absolute bottom-0 w-full rounded-xl bg-gradient-to-t from-indigo-600 to-indigo-400 transition-all duration-700 hover:from-indigo-700 hover:to-indigo-500"
                      style={{ height: `${heightPercent}%` }} />
                  </div>
                  <span className="text-xs font-bold text-slate-500">{m.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Courses */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-500" /> Khóa học bán chạy
          </h3>
          <div className="space-y-3">
            {topCourses.map((course, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-indigo-50/50 transition-colors cursor-pointer">
                <span className="text-xl">{course.icon}</span>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 truncate">{course.title}</h4>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <span>{course.students} học viên</span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5"><Star className="w-2.5 h-2.5 text-amber-400 fill-amber-400" /> {course.rating}</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-600">{course.revenue}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="mt-6 bg-white rounded-2xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-slate-900 flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-indigo-500" /> Giao dịch gần đây
          </h3>
          <button className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
            Xem tất cả <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left py-3 px-2 text-xs font-bold text-slate-500 uppercase tracking-wider">Mã đơn</th>
                <th className="text-left py-3 px-2 text-xs font-bold text-slate-500 uppercase tracking-wider">Học viên</th>
                <th className="text-left py-3 px-2 text-xs font-bold text-slate-500 uppercase tracking-wider hidden md:table-cell">Khóa học</th>
                <th className="text-right py-3 px-2 text-xs font-bold text-slate-500 uppercase tracking-wider">Số tiền</th>
                <th className="text-center py-3 px-2 text-xs font-bold text-slate-500 uppercase tracking-wider">Trạng thái</th>
                <th className="text-right py-3 px-2 text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Ngày</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, i) => (
                <tr key={i} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-2 font-bold text-indigo-600 text-xs">{order.id}</td>
                  <td className="py-3 px-2 font-medium text-slate-800 text-xs">{order.user}</td>
                  <td className="py-3 px-2 text-slate-600 text-xs hidden md:table-cell truncate max-w-[200px]">{order.course}</td>
                  <td className="py-3 px-2 font-bold text-slate-900 text-xs text-right">{order.amount}</td>
                  <td className="py-3 px-2 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${statusColors[order.status]}`}>
                      {statusLabels[order.status]}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-slate-500 text-xs text-right hidden sm:table-cell">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default function AdminDashboard() {
  const stats = [
    { label: 'Tổng học viên', value: '12,543', change: '+12.5%', up: true, icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50 border-indigo-200 dark:bg-indigo-950/50 dark:border-indigo-800' },
    { label: 'Doanh thu tháng', value: '45.2M₫', change: '+8.3%', up: true, icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200 dark:bg-emerald-950/50 dark:border-emerald-800' },
    { label: 'Khóa học active', value: '85', change: '+3', up: true, icon: BookOpen, color: 'text-sky-600', bg: 'bg-sky-50 border-sky-200 dark:bg-sky-950/50 dark:border-sky-800' },
    { label: 'Đăng ký mới (7d)', value: '234', change: '-2.1%', up: false, icon: UserPlus, color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200 dark:bg-amber-950/50 dark:border-amber-800' },
  ];

  const recentOrders = [
    { id: 'ORD-2501', user: 'Trần Minh Anh', course: 'IELTS 7.0+ Masterclass', amount: '1,490,000₫', status: 'completed', date: '21/09/2026' },
    { id: 'ORD-2500', user: 'Lê Đức Huy', course: 'TOEIC 900+ Intensive', amount: '990,000₫', status: 'completed', date: '21/09/2026' },
    { id: 'ORD-2499', user: 'Phạm Thu Hà', course: 'English Communication', amount: '690,000₫', status: 'pending', date: '20/09/2026' },
    { id: 'ORD-2498', user: 'Hoàng Văn Khôi', course: 'Grammar Complete', amount: '490,000₫', status: 'completed', date: '20/09/2026' },
    { id: 'ORD-2497', user: 'Vũ Thị Lan', course: 'IELTS Writing Task 2', amount: '590,000₫', status: 'refunded', date: '19/09/2026' },
  ];

  const topCourses = [
    { title: 'IELTS Band 7.0+ Masterclass', students: 1250, revenue: '18.6M₫', rating: 4.8, icon: '🎓' },
    { title: 'TOEIC 900+ Intensive', students: 2100, revenue: '20.8M₫', rating: 4.9, icon: '💼' },
    { title: 'Tiếng Anh Giao Tiếp', students: 890, revenue: '6.1M₫', rating: 4.7, icon: '💬' },
    { title: 'Ngữ Pháp Toàn Tập', students: 1560, revenue: '7.6M₫', rating: 4.5, icon: '📝' },
  ];

  const monthlyRevenue = [
    { month: 'T4', value: 28 }, { month: 'T5', value: 35 }, { month: 'T6', value: 32 },
    { month: 'T7', value: 40 }, { month: 'T8', value: 38 }, { month: 'T9', value: 45 },
  ];

  const statusColors = {
    completed: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800',
    pending: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800',
    refunded: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800',
  };
  const statusLabels = { completed: 'Thành công', pending: 'Đang xử lý', refunded: 'Hoàn tiền' };

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header / Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 rounded-3xl text-white border-2 border-indigo-900/50 shadow-md">
        <div className="space-y-1">
          <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-indigo-400" />
            <span>Trang Quản trị Hệ thống (Admin)</span>
          </h1>
          <p className="text-xs text-slate-300 font-semibold">
            Quản lý người dùng, khóa học, nội dung blog và theo dõi doanh thu tổng quan của hệ thống.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/admin/users"
            className="px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md transition-transform hover:scale-105"
          >
            <Users className="w-4 h-4" />
            <span>QUẢN LÝ USERS</span>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between space-y-3 hover:border-indigo-300 transition-all">
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-2xl ${stat.bg} border flex items-center justify-center ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-xs font-extrabold flex items-center gap-0.5 ${stat.up ? 'text-emerald-600' : 'text-rose-500'}`}>
                  {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.change}
                </span>
              </div>
              <div>
                <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">{stat.value}</div>
                <div className="text-xs font-bold text-slate-400 mt-0.5">{stat.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-500" /> Doanh thu 6 tháng gần nhất
            </h3>
            <span className="text-xs text-slate-500 font-medium">Đơn vị: Triệu VNĐ</span>
          </div>
          <div className="flex items-end gap-4 h-48">
            {monthlyRevenue.map((m, i) => {
              const heightPercent = (m.value / 50) * 100;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{m.value}M</span>
                  <div className="w-full relative" style={{ height: '150px' }}>
                    <div className="absolute bottom-0 w-full rounded-xl bg-slate-100 dark:bg-slate-800" style={{ height: '100%' }} />
                    <div className="absolute bottom-0 w-full rounded-xl bg-gradient-to-t from-indigo-600 to-indigo-400 transition-all duration-700 hover:from-indigo-700 hover:to-indigo-500"
                      style={{ height: `${heightPercent}%` }} />
                  </div>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{m.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Courses */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 p-6">
          <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-500" /> Khóa học bán chạy
          </h3>
          <div className="space-y-3">
            {topCourses.map((course, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/40 transition-colors cursor-pointer border border-slate-100 dark:border-slate-800">
                <span className="text-xl">{course.icon}</span>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">{course.title}</h4>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                    <span>{course.students} học viên</span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5"><Star className="w-2.5 h-2.5 text-amber-400 fill-amber-400" /> {course.rating}</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{course.revenue}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-indigo-500" /> Giao dịch gần đây
          </h3>
          <button className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
            Xem tất cả <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <th className="text-left py-3 px-2 text-xs font-bold text-slate-500 uppercase tracking-wider">Mã đơn</th>
                <th className="text-left py-3 px-2 text-xs font-bold text-slate-500 uppercase tracking-wider">Học viên</th>
                <th className="text-left py-3 px-2 text-xs font-bold text-slate-500 uppercase tracking-wider hidden md:table-cell">Khóa học</th>
                <th className="text-right py-3 px-2 text-xs font-bold text-slate-500 uppercase tracking-wider">Số tiền</th>
                <th className="text-center py-3 px-2 text-xs font-bold text-slate-500 uppercase tracking-wider">Trạng thái</th>
                <th className="text-right py-3 px-2 text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Ngày</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, i) => (
                <tr key={i} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-2 font-bold text-indigo-600 dark:text-indigo-400 text-xs">{order.id}</td>
                  <td className="py-3 px-2 font-medium text-slate-800 dark:text-slate-200 text-xs">{order.user}</td>
                  <td className="py-3 px-2 text-slate-600 dark:text-slate-400 text-xs hidden md:table-cell truncate max-w-[200px]">{order.course}</td>
                  <td className="py-3 px-2 font-bold text-slate-900 dark:text-white text-xs text-right">{order.amount}</td>
                  <td className="py-3 px-2 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${statusColors[order.status]}`}>
                      {statusLabels[order.status]}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-slate-500 dark:text-slate-400 text-xs text-right hidden sm:table-cell">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

