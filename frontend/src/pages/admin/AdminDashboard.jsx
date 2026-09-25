import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, BookOpen, FileText, Bell, Settings, BarChart3, TrendingUp, DollarSign, UserPlus, ShoppingBag, Eye, ArrowUpRight, ArrowDownRight, Sparkles, ChevronRight, Star, Activity, LogOut, Menu, X } from 'lucide-react';
import AppMascot from '../../components/AppMascot';

function AdminSidebar({ mobileOpen, onClose }) {
  const location = useLocation();
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Users, label: 'Quản lý Users', path: '/admin/users' },
    { icon: BookOpen, label: 'Quản lý Khóa học', path: '/admin/courses' },
    { icon: FileText, label: 'Quản lý Blog', path: '/admin/blog' },
    { icon: Bell, label: 'Thông báo', path: '/admin/notifications' },
  ];

  return (
    <aside className={`admin-sidebar ${mobileOpen ? 'open' : ''}`}>
      <div className="px-6 mb-8 flex items-center justify-between">
        <Link to="/admin" className="flex items-center gap-3">
          <AppMascot className="w-9 h-9" />
          <div>
            <span className="text-sm font-extrabold text-white block">EnglishHub</span>
            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">Admin Panel</span>
          </div>
        </Link>
        <button onClick={onClose} className="md:hidden text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
      </div>
      <nav className="space-y-0.5">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path} onClick={onClose}
              className={`admin-nav-item ${isActive ? 'active' : ''}`}>
              <Icon className="w-4 h-4" /> {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto px-6 pt-8 border-t border-slate-700/50 mt-8">
        <Link to="/" className="admin-nav-item text-slate-500 hover:text-white px-0">
          <LogOut className="w-4 h-4" /> Về trang chính
        </Link>
      </div>
    </aside>
  );
}

export default function AdminDashboard() {
  const [mobileMenu, setMobileMenu] = useState(false);

  const stats = [
    { label: 'Tổng học viên', value: '12,543', change: '+12.5%', up: true, icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50 border-indigo-200' },
    { label: 'Doanh thu tháng', value: '45.2M₫', change: '+8.3%', up: true, icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200' },
    { label: 'Khóa học active', value: '85', change: '+3', up: true, icon: BookOpen, color: 'text-sky-600', bg: 'bg-sky-50 border-sky-200' },
    { label: 'Đăng ký mới (7d)', value: '234', change: '-2.1%', up: false, icon: UserPlus, color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200' },
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
    completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    pending: 'bg-amber-50 text-amber-700 border-amber-200',
    refunded: 'bg-rose-50 text-rose-700 border-rose-200',
  };
  const statusLabels = { completed: 'Thành công', pending: 'Đang xử lý', refunded: 'Hoàn tiền' };

  return (
    <div className="admin-layout">
      <AdminSidebar mobileOpen={mobileMenu} onClose={() => setMobileMenu(false)} />

      <main className="admin-main">
        {/* Top Bar */}
        <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileMenu(true)} className="md:hidden p-2 rounded-lg hover:bg-slate-100">
              <Menu className="w-5 h-5 text-slate-600" />
            </button>
            <h1 className="text-lg font-black text-slate-900">Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 relative">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">3</span>
            </button>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm">👑</div>
          </div>
        </div>

        <div className="p-6">
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
        </div>
      </main>
    </div>
  );
}
