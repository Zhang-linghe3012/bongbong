(function (global) {
  'use strict';

  const VERSION = '1.0.0';
  const DEFAULT_EXPERT = 'Đội ngũ Audit BongBong';

  const CRITERIA_LABELS = {
    ui: 'UI — Giao diện',
    ux: 'UX — Trải nghiệm',
    content: 'Content — Nội dung',
    branding: 'Branding — Thương hiệu',
    marketing: 'Marketing — Tiếp thị',
    seo: 'SEO — Tối ưu tìm kiếm',
    performance: 'Performance — Hiệu suất',
    responsive: 'Responsive — Tương thích',
    security: 'Security — Bảo mật',
    trust: 'Trust — Độ tin cậy'
  };

  const CRITERIA_NAMES = {
    ui: 'giao diện',
    ux: 'trải nghiệm',
    content: 'nội dung',
    branding: 'thương hiệu',
    marketing: 'tiếp thị',
    seo: 'tối ưu tìm kiếm',
    performance: 'hiệu suất',
    responsive: 'tương thích',
    security: 'bảo mật',
    trust: 'độ tin cậy'
  };

  const SEVERITY_LABELS = {
    critical: 'Nghiêm trọng',
    high: 'Cao',
    medium: 'Trung bình',
    low: 'Thấp'
  };

  const DEFAULT_OPTIONS = {
    expertName: DEFAULT_EXPERT,
    autoSync: true,
    pollIntervalMs: 2200,
    reportTitle: 'BÁO CÁO ĐÁNH GIÁ & PHÂN TÍCH WEBSITE DOANH NGHIỆP'
  };

  const ICONS = {
    document: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z"/><path d="M14 3v5h5"/><path d="M9 13h6"/><path d="M9 17h4"/>',
    copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a1 1 0 0 1 1-1h9"/>',
    download: '<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    checkCircle: '<circle cx="12" cy="12" r="9"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4"/><path d="M8 3v4"/><path d="M3 11h18"/>',
    building: '<path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"/><path d="M16 9h2a2 2 0 0 1 2 2v10"/><path d="M2 21h20"/><path d="M8 7h4"/><path d="M8 11h4"/><path d="M8 15h4"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    sparkles: '<path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3Z"/><path d="M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15Z"/>',
    sync: '<path d="M20 11a8 8 0 1 0-2.3 5.7"/><path d="M20 5v6h-6"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><path d="M12 8h.01"/>',
    arrowLeft: '<path d="M19 12H5"/><path d="m11 18-6-6 6-6"/>'
  };

  function icon(name, className) {
    const body = ICONS[name] || ICONS.document;
    return '<svg class="' + (className || 'h-5 w-5') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + body + '</svg>';
  }

  function asString(value) {
    return typeof value === 'string' ? value.trim() : value === null || value === undefined ? '' : String(value).trim();
  }

  function unwrapAudit(payload) {
    if (!payload || typeof payload !== 'object') return null;
    const result = payload.result && typeof payload.result === 'object'
      ? payload.result
      : payload.data && typeof payload.data === 'object'
        ? payload.data
        : payload;

    const strengths = Array.isArray(result.strengths) ? result.strengths : [];
    const improvements = Array.isArray(result.improvements) ? result.improvements : [];
    const limitations = Array.isArray(result.limitations) ? result.limitations : [];
    const summary = asString(result.summary || result.strategicAdvice || result.advice || result.overview || payload.summary);
    const url = asString(payload.url || result.url);

    if (!strengths.length && !improvements.length && !limitations.length && !summary) return null;

    return {
      url: url,
      strengths: strengths,
      improvements: improvements,
      summary: summary,
      limitations: limitations,
      generatedAt: asString(result.generatedAt || payload.generatedAt),
      meta: result.meta || {}
    };
  }

  function domainOf(value) {
    const raw = asString(value);
    if (!raw) return '';
    try {
      const withScheme = /^https?:\/\//i.test(raw) ? raw : 'https://' + raw;
      return new URL(withScheme).hostname.replace(/^www\./, '');
    } catch (error) {
      return raw.replace(/^https?:\/\//i, '').split('/')[0].replace(/^www\./, '');
    }
  }

  function todayInputValue() {
    const now = new Date();
    const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 10);
  }

  function dateParts(value) {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(asString(value));
    if (match) return { day: match[3], month: match[2], year: match[1] };
    const now = new Date();
    return {
      day: String(now.getDate()).padStart(2, '0'),
      month: String(now.getMonth() + 1).padStart(2, '0'),
      year: String(now.getFullYear())
    };
  }

  function displayDate(value) {
    const parts = dateParts(value);
    return parts.day + '/' + parts.month + '/' + parts.year;
  }

  function fileDate(value) {
    const parts = dateParts(value);
    return parts.day + '-' + parts.month + '-' + parts.year;
  }

  function formatDateTime(value) {
    const date = new Date(value);
    if (isNaN(date.getTime())) return '';
    try {
      return date.toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' });
    } catch (error) {
      return date.toISOString();
    }
  }

  function criterionLabel(value) {
    const raw = asString(value);
    if (!raw) return '';
    const needle = raw.toLowerCase();
    const keys = Object.keys(CRITERIA_LABELS);
    for (const key of keys) {
      if (needle === key || needle.indexOf(key) !== -1 || needle.indexOf(CRITERIA_NAMES[key]) !== -1) return CRITERIA_LABELS[key];
    }
    return raw;
  }

  function severityLabel(value) {
    const needle = asString(value).toLowerCase();
    if (needle.indexOf('critical') !== -1 || needle.indexOf('nghiêm trọng') !== -1 || needle.indexOf('nghiem trong') !== -1) return SEVERITY_LABELS.critical;
    if (needle.indexOf('high') !== -1 || needle.indexOf('cao') !== -1) return SEVERITY_LABELS.high;
    if (needle.indexOf('low') !== -1 || needle.indexOf('thấp') !== -1 || needle.indexOf('thap') !== -1) return SEVERITY_LABELS.low;
    return SEVERITY_LABELS.medium;
  }

  function sanitizeSegment(value) {
    return asString(value)
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .replace(/[^a-zA-Z0-9.-]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 80) || 'website';
  }

  function bulletLine(prefix, value) {
    return '   • ' + prefix + ': ' + value;
  }

  function placeholderReport(title) {
    return [
      title,
      '════════════════════════════════════════════════════════════',
      '',
      'Chưa có dữ liệu phân tích từ Phần 3.',
      'Kết quả sẽ tự động xuất hiện tại đây ngay khi AI hoàn tất quá trình đối chiếu Ba-rem.',
      '',
      'Bạn vẫn có thể điền thông tin báo cáo ở phía trên trước khi dữ liệu được đồng bộ.'
    ].join('\n');
  }

  class Part4Report {
    constructor(container, options) {
      this.container = container;
      this.options = Object.assign({}, DEFAULT_OPTIONS, options || {});
      this.audit = null;
      this.fingerprint = '';
      this.companyTouched = false;
      this.mounted = false;
      this.pollTimer = null;
      this.abort = null;
    }

    mount() {
      if (this.mounted) return this;
      this.renderShell();
      this.abort = new AbortController();
      const options = { signal: this.abort.signal };

      this.companyInput.addEventListener('input', () => {
        this.companyTouched = true;
        this.renderPreview();
      }, options);
      this.expertInput.addEventListener('input', () => this.renderPreview(), options);
      this.dateInput.addEventListener('input', () => this.renderPreview(), options);
      this.copyBtn.addEventListener('click', () => this.copyReport(), options);
      this.downloadBtn.addEventListener('click', () => this.downloadReport(), options);

      this.expertInput.value = this.options.expertName || DEFAULT_EXPERT;
      this.dateInput.value = todayInputValue();

      if (this.options.autoSync !== false) {
        const handler = (event) => this.ingest(event.detail);
        document.addEventListener('part3:complete', handler, options);
        window.addEventListener('part3:complete', handler, options);
        this.syncFromGlobal();
        const interval = Math.max(800, Number(this.options.pollIntervalMs) || DEFAULT_OPTIONS.pollIntervalMs);
        this.pollTimer = setInterval(() => this.syncFromGlobal(), interval);
      }

      this.mounted = true;
      this.renderPreview();
      return this;
    }

    renderShell() {
      this.container.innerHTML = [
        '<section class="p4-root">',
        '<div class="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.35)]">',
        '<header class="relative overflow-hidden border-b border-slate-100 p-6 md:p-8">',
        '<div class="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-br from-indigo-600/10 via-sky-500/10 to-emerald-500/10"></div>',
        '<div class="relative flex flex-col gap-5 md:flex-row md:items-start md:justify-between">',
        '<div class="flex items-start gap-4">',
        '<div class="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-indigo-600 to-sky-500 text-white shadow-lg shadow-indigo-500/25">' + icon('document', 'h-6 w-6') + '</div>',
        '<div>',
        '<div class="flex flex-wrap items-center gap-2">',
        '<span class="rounded-full bg-indigo-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-indigo-700 ring-1 ring-indigo-200">Phần 4</span>',
        '<span class="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">Report Export</span>',
        '</div>',
        '<h2 class="mt-2 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">Xuất báo cáo đánh giá website</h2>',
        '<p class="mt-1 max-w-2xl text-sm leading-6 text-slate-500">Tự động đồng bộ kết quả phân tích từ Phần 3, cá nhân hóa thông tin và xuất báo cáo văn bản chỉ với một cú nhấp.</p>',
        '</div>',
        '</div>',
        '<div data-p4-sync class="flex min-w-[240px] items-start gap-3 rounded-2xl border border-slate-200 bg-white/80 p-4 backdrop-blur">',
        '<span data-p4-sync-dot class="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-slate-300"></span>',
        '<div>',
        '<p data-p4-sync-title class="text-sm font-semibold text-slate-800">Đang chờ dữ liệu Phần 3</p>',
        '<p data-p4-sync-sub class="mt-0.5 text-[11px] leading-5 text-slate-500">Kết quả sẽ tự động điền khi AI hoàn tất.</p>',
        '</div>',
        '</div>',
        '</div>',
        '</header>',
        '<div class="p-6 md:p-8">',
        '<div class="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 md:p-5">',
        '<div class="flex flex-wrap items-center justify-between gap-2">',
        '<p class="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Thông tin báo cáo</p>',
        '<span data-p4-data-badge class="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-500 ring-1 ring-slate-200">Chưa có dữ liệu</span>',
        '</div>',
        '<div class="mt-3 grid gap-3 md:grid-cols-3">',
        '<label class="block">',
        '<span class="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-700">' + icon('building', 'h-3.5 w-3.5 text-slate-400') + 'Tên doanh nghiệp / Website</span>',
        '<input data-p4-company type="text" placeholder="Tự động lấy từ URL Phần 1" class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100" />',
        '</label>',
        '<label class="block">',
        '<span class="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-700">' + icon('user', 'h-3.5 w-3.5 text-slate-400') + 'Chuyên gia / Đơn vị đánh giá</span>',
        '<input data-p4-expert type="text" placeholder="Đội ngũ Audit BongBong" class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100" />',
        '</label>',
        '<label class="block">',
        '<span class="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-700">' + icon('calendar', 'h-3.5 w-3.5 text-slate-400') + 'Ngày lập báo cáo</span>',
        '<input data-p4-date type="date" class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100" />',
        '</label>',
        '</div>',
        '</div>',
        '<div class="mt-5 overflow-hidden rounded-2xl border border-slate-200">',
        '<div class="flex flex-col gap-3 border-b border-slate-100 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">',
        '<div class="flex items-center gap-3">',
        '<span class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-slate-900 text-white">' + icon('document', 'h-5 w-5') + '</span>',
        '<div>',
        '<p class="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Report preview</p>',
        '<h3 class="text-sm font-semibold text-slate-900">Bản xem trước báo cáo</h3>',
        '<p data-p4-counts class="mt-0.5 text-[11px] text-slate-400">Chưa có dữ liệu phân tích</p>',
        '</div>',
        '</div>',
        '<div class="flex flex-wrap gap-2">',
        '<button data-p4-action="copy" type="button" disabled class="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-45">' + icon('copy', 'h-4 w-4') + 'Sao chép báo cáo</button>',
        '<button data-p4-action="download" type="button" disabled class="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-45">' + icon('download', 'h-4 w-4') + 'Tải xuống file .TXT</button>',
        '</div>',
        '</div>',
        '<pre data-p4-preview class="p4-scroll max-h-[560px] min-h-[280px] overflow-auto whitespace-pre-wrap break-words bg-slate-950 p-5 font-mono text-[12px] leading-6 text-slate-100"></pre>',
        '</div>',
        '<div class="mt-4 flex flex-col gap-2 text-[11px] text-slate-400 sm:flex-row sm:items-center sm:justify-between">',
        '<p class="flex items-center gap-1.5">' + icon('info', 'h-3.5 w-3.5') + 'Báo cáo được tạo tự động từ dữ liệu phân tích của Phần 3.</p>',
        '<p data-p4-timestamp></p>',
        '</div>',
        '</div>',
        '</div>',
        '</section>'
      ].join('');

      this.companyInput = this.container.querySelector('[data-p4-company]');
      this.expertInput = this.container.querySelector('[data-p4-expert]');
      this.dateInput = this.container.querySelector('[data-p4-date]');
      this.previewEl = this.container.querySelector('[data-p4-preview]');
      this.copyBtn = this.container.querySelector('[data-p4-action="copy"]');
      this.downloadBtn = this.container.querySelector('[data-p4-action="download"]');
      this.syncDot = this.container.querySelector('[data-p4-sync-dot]');
      this.syncTitle = this.container.querySelector('[data-p4-sync-title]');
      this.syncSub = this.container.querySelector('[data-p4-sync-sub]');
      this.dataBadge = this.container.querySelector('[data-p4-data-badge]');
      this.countsEl = this.container.querySelector('[data-p4-counts]');
      this.timestampEl = this.container.querySelector('[data-p4-timestamp]');
    }

    syncFromGlobal() {
      const value = global.currentAuditResult;
      if (!value) return false;
      return this.ingest(value);
    }

    ingest(payload) {
      const audit = unwrapAudit(payload);
      if (!audit) return false;

      const signature = JSON.stringify({
        url: audit.url,
        generatedAt: audit.generatedAt,
        summary: audit.summary,
        strengths: audit.strengths,
        improvements: audit.improvements,
        limitations: audit.limitations
      });
      if (signature === this.fingerprint) return false;
      this.fingerprint = signature;
      this.audit = audit;

      if (!this.companyTouched) {
        const name = domainOf(audit.url);
        this.companyInput.value = name || audit.url || '';
      }

      this.setSyncState(true);
      this.renderPreview();
      this.emit('part4:ready', { audit: this.audit, report: this.buildReport() });
      return true;
    }

    setAuditData(payload) {
      return this.ingest(payload);
    }

    setSyncState(hasData) {
      if (hasData) {
        this.syncDot.className = 'mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500';
        this.syncTitle.textContent = 'Đã đồng bộ từ Phần 3';
        const updated = this.audit && this.audit.generatedAt ? formatDateTime(this.audit.generatedAt) : '';
        this.syncSub.textContent = updated ? 'Cập nhật lúc ' + updated : 'Dữ liệu phân tích đã sẵn sàng để xuất báo cáo.';
        this.dataBadge.className = 'rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700 ring-1 ring-emerald-200';
        this.dataBadge.textContent = 'Đã đồng bộ';
        this.countsEl.textContent = this.audit.strengths.length + ' điểm mạnh · ' + this.audit.improvements.length + ' điểm cải thiện · ' + this.audit.limitations.length + ' hạn chế dữ liệu';
        this.copyBtn.disabled = false;
        this.downloadBtn.disabled = false;
        this.timestampEl.textContent = updated ? 'Dữ liệu phân tích: ' + updated : '';
      } else {
        this.syncDot.className = 'mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-slate-300';
        this.syncTitle.textContent = 'Đang chờ dữ liệu Phần 3';
        this.syncSub.textContent = 'Kết quả sẽ tự động điền khi AI hoàn tất.';
        this.dataBadge.className = 'rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-500 ring-1 ring-slate-200';
        this.dataBadge.textContent = 'Chưa có dữ liệu';
        this.countsEl.textContent = 'Chưa có dữ liệu phân tích';
        this.copyBtn.disabled = true;
        this.downloadBtn.disabled = true;
        this.timestampEl.textContent = '';
      }
    }

    renderPreview() {
      this.previewEl.textContent = this.buildReport();
    }

    buildReport() {
      if (!this.audit) return placeholderReport(this.options.reportTitle);

      const lines = [];
      const titleLine = '════════════════════════════════════════════════════════════';
      const sectionLine = '────────────────────────────────────────────────────────────';
      const audit = this.audit;
      const company = asString(this.companyInput && this.companyInput.value) || (audit && domainOf(audit.url)) || '—';
      const expert = asString(this.expertInput && this.expertInput.value) || DEFAULT_EXPERT;
      const reportDate = displayDate(this.dateInput && this.dateInput.value);

      lines.push(this.options.reportTitle);
      lines.push(titleLine);
      lines.push('');
      lines.push('THÔNG TIN CHUNG');
      lines.push(sectionLine);
      lines.push('• Website: ' + company);
      lines.push('• Đơn vị kiểm tra: ' + expert);
      lines.push('• Ngày thực hiện: ' + reportDate);
      lines.push('• Nguồn dữ liệu: Kết quả quét client-side và phân tích AI (Phần 3)');
      lines.push('');

      lines.push('I. ĐÁNH GIÁ TỔNG QUAN');
      lines.push(sectionLine);
      lines.push(audit.summary || 'Chưa có lời khuyên tổng quan từ AI.');

      lines.push('');
      lines.push('II. 03 ĐIỂM MẠNH NỔI BẬT');
      lines.push(sectionLine);
      if (!audit.strengths.length) {
        lines.push('Chưa xác định được điểm mạnh nào đủ bằng chứng từ dữ liệu quét.');
      } else {
        audit.strengths.forEach(function (item, index) {
          const entry = item && typeof item === 'object' ? item : { title: item };
          const criterion = criterionLabel(entry.criterion || entry.category || entry.group);
          lines.push('');
          lines.push((index + 1) + '. ' + (asString(entry.title || entry.name) || 'Chưa có tiêu đề'));
          if (criterion) lines.push(bulletLine('Tiêu chí', criterion));
          if (asString(entry.evidence || entry.observation || entry.proof)) lines.push(bulletLine('Bằng chứng', asString(entry.evidence || entry.observation || entry.proof)));
          if (asString(entry.impact || entry.meaning || entry.benefit || entry.significance)) lines.push(bulletLine('Ý nghĩa', asString(entry.impact || entry.meaning || entry.benefit || entry.significance)));
        });
      }

      lines.push('');
      lines.push('III. 03 ĐIỂM CẦN CẢI THIỆN VÀ GIẢI PHÁP');
      lines.push(sectionLine);
      if (!audit.improvements.length) {
        lines.push('Chưa xác định được điểm cần cải thiện nào đủ bằng chứng từ dữ liệu quét.');
      } else {
        audit.improvements.forEach(function (item, index) {
          const entry = item && typeof item === 'object' ? item : { title: item };
          const criterion = criterionLabel(entry.criterion || entry.category || entry.group);
          lines.push('');
          lines.push((index + 1) + '. ' + (asString(entry.title || entry.name) || 'Chưa có tiêu đề'));
          lines.push(bulletLine('Mức độ nghiêm trọng', severityLabel(entry.severity || entry.level || entry.priority)));
          if (criterion) lines.push(bulletLine('Tiêu chí', criterion));
          if (asString(entry.evidence || entry.observation || entry.proof)) lines.push(bulletLine('Bằng chứng', asString(entry.evidence || entry.observation || entry.proof)));
          if (asString(entry.consequence || entry.impact || entry.risk)) lines.push(bulletLine('Hậu quả', asString(entry.consequence || entry.impact || entry.risk)));
          if (asString(entry.solution || entry.recommendation || entry.fix || entry.action)) lines.push(bulletLine('Giải pháp', asString(entry.solution || entry.recommendation || entry.fix || entry.action)));
        });
      }

      lines.push('');
      lines.push('IV. GIỚI HẠN ĐÁNH GIÁ');
      lines.push(sectionLine);
      if (!audit.limitations.length) {
        lines.push('• Không có hạn chế đáng kể trong phạm vi dữ liệu đã quét.');
      } else {
        audit.limitations.forEach(function (item) {
          const text = asString(item);
          if (text) lines.push('• ' + text);
        });
      }

      lines.push('');
      lines.push(titleLine);
      lines.push('Báo cáo được tạo tự động bởi BongBong Audit AI · ' + reportDate);
      return lines.join('\n');
    }

    getReportText() {
      return this.buildReport();
    }

    getAudit() {
      return this.audit;
    }

    async copyReport() {
      if (!this.audit) return;
      const text = this.buildReport();
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(text);
        } else {
          throw new Error('Clipboard API unavailable');
        }
        this.toast('Đã sao chép báo cáo thành công!');
      } catch (error) {
        const area = document.createElement('textarea');
        area.value = text;
        area.setAttribute('readonly', 'readonly');
        area.style.position = 'fixed';
        area.style.opacity = '0';
        document.body.appendChild(area);
        area.select();
        try {
          document.execCommand('copy');
          this.toast('Đã sao chép báo cáo thành công!');
        } catch (fallbackError) {
          this.toast('Không thể sao chép tự động.');
        }
        area.remove();
      }
      this.emit('part4:copy', { format: 'txt', text: text });
    }

    downloadReport() {
      if (!this.audit) return;
      const text = this.buildReport();
      const domain = sanitizeSegment(domainOf(this.audit.url) || this.companyInput.value);
      const filename = 'Bao-Cao-Audit-' + domain + '-' + fileDate(this.dateInput.value) + '.txt';
      const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(function () { URL.revokeObjectURL(link.href); }, 1200);
      this.toast('Đã tải xuống file .TXT');
      this.emit('part4:download', { format: 'txt', filename: filename, text: text });
    }

    toast(message) {
      if (!this.container) return;
      const node = document.createElement('div');
      node.className = 'p4-toast fixed bottom-5 left-1/2 z-[9999] flex -translate-x-1/2 items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-xs font-medium text-white shadow-xl';
      node.setAttribute('role', 'status');
      node.innerHTML = '<span class="grid h-4 w-4 place-items-center rounded-full bg-emerald-500 text-white">' + icon('check', 'h-3 w-3') + '</span><span></span>';
      node.lastElementChild.textContent = message;
      document.body.appendChild(node);
      setTimeout(function () { node.remove(); }, 2400);
    }

    emit(name, detail) {
      try {
        this.container.dispatchEvent(new CustomEvent(name, { detail: detail, bubbles: true, composed: true }));
      } catch (error) {
        /* noop */
      }
    }

    destroy() {
      if (this.pollTimer) {
        clearInterval(this.pollTimer);
        this.pollTimer = null;
      }
      if (this.abort) {
        this.abort.abort();
        this.abort = null;
      }
      this.mounted = false;
      this.audit = null;
      this.fingerprint = '';
    }
  }

  function create(target, options) {
    const container = typeof target === 'string' ? document.querySelector(target) : target;
    if (!container) throw new Error('Part4Report: không tìm thấy container để mount.');
    return new Part4Report(container, options).mount();
  }

  const api = {
    version: VERSION,
    create: create,
    Part4Report: Part4Report,
    unwrapAudit: unwrapAudit
  };

  global.Part4Report = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
