import React from 'react';

/**
 * PageLayout — Layout chuẩn cho tất cả các trang trong Dashboard.
 *
 * Sử dụng:
 * <PageLayout
 *   title="Tiêu đề trang"
 *   subtitle="Mô tả ngắn"
 *   badge={{ label: 'MỚI', color: 'rose' }}   // optional
 *   action={<button>...</button>}              // optional
 * >
 *   {/* nội dung trang *}
 * </PageLayout>
 */
export default function PageLayout({
  title,
  subtitle,
  badge,        // { label: string, color: 'indigo'|'rose'|'amber'|'emerald'|'sky' }
  action,       // JSX element (button, link, v.v.)
  children,
  className = '',
}) {
  const badgeColors = {
    indigo: 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-700',
    rose:   'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-700',
    amber:  'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-700',
    emerald:'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700',
    sky:    'bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-300 dark:border-sky-700',
  };

  return (
    <div className={`space-y-6 w-full pb-12 ${className}`}>
      {/* ── Page Header ──────────────────────────────────────── */}
      {(title || subtitle || badge || action) && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Left: Title + Subtitle + Badge */}
          <div className="space-y-1.5 min-w-0">
            <div className="flex items-center gap-2.5 flex-wrap">
              {title && (
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  {title}
                </h1>
              )}
              {badge && (
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider shrink-0 ${badgeColors[badge.color] || badgeColors.indigo}`}>
                  {badge.label}
                </span>
              )}
            </div>
            {subtitle && (
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                {subtitle}
              </p>
            )}
          </div>

          {/* Right: Action slot */}
          {action && (
            <div className="shrink-0">
              {action}
            </div>
          )}
        </div>
      )}

      {/* ── Divider ──────────────────────────────────────────── */}
      {(title || subtitle) && (
        <div className="border-t-2 border-slate-200 dark:border-slate-800 -mt-2" />
      )}

      {/* ── Page Content ─────────────────────────────────────── */}
      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
}

/**
 * PageSection — Card wrapper chuẩn cho từng section trong trang.
 *
 * Sử dụng:
 * <PageSection title="Tiêu đề section" action={<Link>Xem tất cả</Link>}>
 *   ...nội dung
 * </PageSection>
 */
export function PageSection({ title, subtitle, icon: Icon, action, children, className = '' }) {
  return (
    <div className={`bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-xs space-y-4 ${className}`}>
      {(title || action) && (
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            {Icon && <Icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />}
            <div className="min-w-0">
              {title && (
                <h2 className="font-black text-base text-slate-900 dark:text-white truncate">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-xs font-semibold text-slate-400 mt-0.5">{subtitle}</p>
              )}
            </div>
          </div>
          {action && (
            <div className="shrink-0 text-xs font-extrabold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer">
              {action}
            </div>
          )}
        </div>
      )}
      {children}
    </div>
  );
}

/**
 * StatsGrid — Grid thống kê chuẩn (2 hoặc 4 cột).
 *
 * items: [{ label, value, change, up, icon: Icon, color, bg }]
 */
export function StatsGrid({ items, cols = 4 }) {
  const colClass = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  }[cols] || 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';

  return (
    <div className={`grid ${colClass} gap-4`}>
      {items.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between space-y-3"
          >
            <div className="flex items-center justify-between">
              {Icon && (
                <div className={`w-10 h-10 rounded-2xl ${stat.bg || 'bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800'} flex items-center justify-center ${stat.color || 'text-indigo-600'}`}>
                  <Icon className="w-5 h-5" />
                </div>
              )}
              {stat.change && (
                <span className={`text-xs font-extrabold ${stat.up ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {stat.change}
                </span>
              )}
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                {stat.value}
              </h3>
              <p className="text-xs font-bold text-slate-400 mt-0.5">{stat.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/**
 * EmptyState — Trạng thái rỗng chuẩn khi không có dữ liệu.
 */
export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center space-y-4">
      {Icon && (
        <div className="w-16 h-16 rounded-3xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
          <Icon className="w-8 h-8 text-slate-400" />
        </div>
      )}
      <div className="space-y-1">
        <h3 className="font-extrabold text-slate-700 dark:text-slate-200">{title}</h3>
        {description && (
          <p className="text-sm text-slate-400 font-medium max-w-xs">{description}</p>
        )}
      </div>
      {action && action}
    </div>
  );
}
