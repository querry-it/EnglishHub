/**
 * Tiện ích xuất dữ liệu bảng & thống kê sang file CSV và Word (.DOC)
 * Hỗ trợ bảng mã UTF-8 có BOM (hiển thị tiếng Việt hoàn hảo trên Excel & Word)
 */

export function exportToCSV({ filename, headers, rows }) {
  const BOM = '\uFEFF';
  const csvContent = [
    headers.map(h => `"${String(h).replace(/"/g, '""')}"`).join(','),
    ...rows.map(row =>
      row.map(val => {
        const str = val === null || val === undefined ? '' : String(val);
        return `"${str.replace(/"/g, '""')}"`;
      }).join(',')
    )
  ].join('\r\n');

  const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename || 'export'}_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function exportToDOC({ filename, title, subtitle, statsSummary = [], headers, rows }) {
  const statsHtml = statsSummary.length > 0 
    ? `
      <div style="background-color: #f8fafc; border: 1px solid #cbd5e1; padding: 12px 16px; margin-bottom: 20px; border-radius: 6px;">
        <h3 style="margin: 0 0 8px 0; font-size: 11pt; color: #334155;">TỔNG KẾT CHỈ SỐ THỐNG KÊ:</h3>
        <p style="margin: 0; font-size: 10pt; color: #475569; line-height: 1.6;">
          ${statsSummary.map(s => `<strong>${s.label}:</strong> ${s.value}`).join(' &nbsp;&bull;&nbsp; ')}
        </p>
      </div>
    `
    : '';

  const docHtml = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset='utf-8'>
      <title>${title}</title>
      <style>
        body { font-family: 'Calibri', 'Segoe UI', Arial, sans-serif; font-size: 11pt; color: #0f172a; margin: 30px; }
        h1 { color: #4338ca; font-size: 20pt; margin: 0 0 6px 0; font-weight: bold; }
        .sub { color: #64748b; font-size: 10pt; margin: 0 0 16px 0; }
        table { width: 100%; border-collapse: collapse; margin-top: 15px; }
        th { background-color: #4f46e5; color: #ffffff; padding: 10px 12px; font-weight: bold; border: 1px solid #4338ca; text-align: left; font-size: 10pt; }
        td { padding: 8px 12px; border: 1px solid #cbd5e1; font-size: 9.5pt; vertical-align: top; }
        tr:nth-child(even) { background-color: #f8fafc; }
        .footer { margin-top: 30px; font-size: 9pt; color: #94a3b8; text-align: right; border-top: 1px solid #e2e8f0; padding-top: 10px; }
      </style>
    </head>
    <body>
      <h1>${title}</h1>
      <p class="sub">${subtitle || 'Hệ thống báo cáo quản trị EnglishHub'} &bull; Xuất lúc: ${new Date().toLocaleString('vi-VN')}</p>
      ${statsHtml}
      <table>
        <thead>
          <tr>
            ${headers.map(h => `<th>${h}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${rows.map(row => `<tr>${row.map(c => `<td>${c === null || c === undefined ? '' : c}</td>`).join('')}</tr>`).join('')}
        </tbody>
      </table>
      <div class="footer">
        Báo cáo được trích xuất tự động từ Hệ thống Đào tạo & Quản trị Anh ngữ EnglishHub Platform
      </div>
    </body>
    </html>
  `;

  const blob = new Blob(['\ufeff', docHtml], { type: 'application/msword;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename || 'bao_cao'}_${Date.now()}.doc`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
