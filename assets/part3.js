(function (global) {
  'use strict';

  const VERSION = '1.0.0';

  const CRITERIA = [
    { key: 'ui', label: 'UI', name: 'Giao diện', icon: 'layout', accent: 'indigo' },
    { key: 'ux', label: 'UX', name: 'Trải nghiệm', icon: 'cursor', accent: 'sky' },
    { key: 'content', label: 'Content', name: 'Nội dung', icon: 'text', accent: 'violet' },
    { key: 'branding', label: 'Branding', name: 'Thương hiệu', icon: 'badge', accent: 'fuchsia' },
    { key: 'marketing', label: 'Marketing', name: 'Tiếp thị', icon: 'megaphone', accent: 'rose' },
    { key: 'seo', label: 'SEO', name: 'Tối ưu tìm kiếm', icon: 'search', accent: 'emerald' },
    { key: 'performance', label: 'Performance', name: 'Hiệu suất', icon: 'bolt', accent: 'amber' },
    { key: 'responsive', label: 'Responsive', name: 'Tương thích', icon: 'devices', accent: 'cyan' },
    { key: 'security', label: 'Security', name: 'Bảo mật', icon: 'shield', accent: 'slate' },
    { key: 'trust', label: 'Trust', name: 'Độ tin cậy', icon: 'checkCircle', accent: 'teal' }
  ];

  const CRITERION_CHIP = {
    ui: 'bg-indigo-50 text-indigo-700 ring-indigo-200',
    ux: 'bg-sky-50 text-sky-700 ring-sky-200',
    content: 'bg-violet-50 text-violet-700 ring-violet-200',
    branding: 'bg-fuchsia-50 text-fuchsia-700 ring-fuchsia-200',
    marketing: 'bg-rose-50 text-rose-700 ring-rose-200',
    seo: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    performance: 'bg-amber-50 text-amber-700 ring-amber-200',
    responsive: 'bg-cyan-50 text-cyan-700 ring-cyan-200',
    security: 'bg-slate-100 text-slate-700 ring-slate-300',
    trust: 'bg-teal-50 text-teal-700 ring-teal-200'
  };

  const CRITERION_DOT = {
    ui: 'bg-indigo-500',
    ux: 'bg-sky-500',
    content: 'bg-violet-500',
    branding: 'bg-fuchsia-500',
    marketing: 'bg-rose-500',
    seo: 'bg-emerald-500',
    performance: 'bg-amber-500',
    responsive: 'bg-cyan-500',
    security: 'bg-slate-500',
    trust: 'bg-teal-500'
  };

  const SEVERITY = {
    critical: {
      key: 'critical',
      label: 'Nghiêm trọng',
      badge: 'bg-red-50 text-red-700 ring-red-200',
      dot: 'bg-red-500',
      bar: 'from-red-500 to-rose-500'
    },
    high: {
      key: 'high',
      label: 'Cao',
      badge: 'bg-orange-50 text-orange-700 ring-orange-200',
      dot: 'bg-orange-500',
      bar: 'from-orange-500 to-amber-500'
    },
    medium: {
      key: 'medium',
      label: 'Trung bình',
      badge: 'bg-amber-50 text-amber-700 ring-amber-200',
      dot: 'bg-amber-500',
      bar: 'from-amber-500 to-yellow-500'
    },
    low: {
      key: 'low',
      label: 'Thấp',
      badge: 'bg-sky-50 text-sky-700 ring-sky-200',
      dot: 'bg-sky-500',
      bar: 'from-sky-500 to-cyan-500'
    }
  };

  const ICONS = {
    robot: '<path d="M12 8V5"/><rect x="4" y="8" width="16" height="11" rx="3"/><path d="M9 13h.01M15 13h.01"/><path d="M9 16h6"/>',
    sparkles: '<path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3Z"/><path d="M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15Z"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    checkCircle: '<circle cx="12" cy="12" r="9"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
    alert: '<path d="M12 9v4"/><path d="M12 17h.01"/><path d="M10.3 3.9 2.4 17.4A2 2 0 0 0 4.1 20.4h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/>',
    quote: '<path d="M10 11H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6a4 4 0 0 1-4 4"/><path d="M20 11h-4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6a4 4 0 0 1-4 4"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    trend: '<path d="M3 17l6-6 4 4 7-7"/><path d="M14 8h6v6"/>',
    wrench: '<path d="M14.7 6.3a4 4 0 0 0-5 5L4 17l3 3 5.7-5.7a4 4 0 0 0 5-5l-2.3 2.3-2.7-2.7 2.3-2.3Z"/>',
    lightbulb: '<path d="M9 18h6"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.4 1 1 1 1.7V16h5v-.4c0-.7.4-1.3 1-1.7A6 6 0 0 0 12 3Z"/>',
    warning: '<path d="M12 9v4"/><path d="M12 17h.01"/><path d="M10.3 3.9 2.4 17.4A2 2 0 0 0 4.1 20.4h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><path d="M12 8h.01"/>',
    copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a1 1 0 0 1 1-1h9"/>',
    download: '<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/>',
    refresh: '<path d="M20 11a8 8 0 1 0-2.3 5.7"/><path d="M20 5v6h-6"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    external: '<path d="M14 4h6v6"/><path d="m20 4-9 9"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
    layout: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/>',
    cursor: '<path d="m4 4 7.5 16 2.2-6.3L20 11.5 4 4Z"/>',
    text: '<path d="M4 6h16"/><path d="M4 12h10"/><path d="M4 18h14"/>',
    badge: '<circle cx="12" cy="9" r="5"/><path d="m8.5 13-1.5 8 5-2.5 5 2.5-1.5-8"/>',
    megaphone: '<path d="M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1Z"/><path d="M15 8a4 4 0 0 1 0 8"/><path d="M18 5a8 8 0 0 1 0 14"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    bolt: '<path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"/>',
    devices: '<rect x="3" y="4" width="13" height="12" rx="2"/><path d="M8 20h5"/><path d="M10.5 16v4"/><rect x="17" y="9" width="4" height="9" rx="1"/>',
    shield: '<path d="M12 3 5 6v5c0 4.5 3 8.5 7 10 4-1.5 7-5.5 7-10V6l-7-3Z"/><path d="m9.5 12 1.8 1.8 3.2-3.6"/>',
    link: '<path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c2.5 2.5 4 5.7 4 9s-1.5 6.5-4 9c-2.5-2.5-4-5.7-4-9s1.5-6.5 4-9Z"/>',
    arrow: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
    flag: '<path d="M5 21V4"/><path d="M5 4h10l-1.5 4L15 12H5"/>'
  };

  const DEFAULT_OPTIONS = {
    endpoint: '',
    apiKey: '',
    model: 'gpt-4o-mini',
    temperature: 0.2,
    maxTokens: 2600,
    timeoutMs: 90000,
    jsonMode: false,
    headers: null,
    fetcher: null
  };

  const OUTPUT_SCHEMA = [
    '{',
    '  "url": "string",',
    '  "strengths": [',
    '    {',
    '      "criterion": "ui|ux|content|branding|marketing|seo|performance|responsive|security|trust",',
    '      "title": "string",',
    '      "evidence": "string",',
    '      "impact": "string"',
    '    }',
    '  ],',
    '  "improvements": [',
    '    {',
    '      "criterion": "ui|ux|content|branding|marketing|seo|performance|responsive|security|trust",',
    '      "severity": "low|medium|high|critical",',
    '      "title": "string",',
    '      "evidence": "string",',
    '      "consequence": "string",',
    '      "solution": "string"',
    '    }',
    '  ],',
    '  "limitations": ["string"],',
    '  "strategicAdvice": "string",',
    '  "evaluatedCriteria": [',
    '    { "key": "ui", "status": "evaluated|limited", "note": "string" }',
    '  ]',
    '}'
  ].join('\n');

  const SYSTEM_PROMPT = [
    'Bạn là chuyên gia kiểm định và đánh giá website độc lập. Bạn đánh giá website doanh nghiệp theo Ba-rem gồm 10 nhóm tiêu chí:',
    '1. UI (Giao diện): bố cục, màu sắc, typography, hình ảnh, header, footer.',
    '2. UX (Trải nghiệm): điều hướng, khả năng sử dụng, biểu mẫu, khả năng tiếp cận.',
    '3. Content (Nội dung): chất lượng, độ chính xác, cấu trúc và tính hữu ích.',
    '4. Branding (Thương hiệu): logo, nhận diện, tính nhất quán và định vị thương hiệu.',
    '5. Marketing (Tiếp thị): Value Proposition, CTA, Social Proof, Customer Journey.',
    '6. SEO (Tối ưu tìm kiếm): Title, Meta Description, Heading, URL, liên kết, Technical SEO.',
    '7. Performance (Hiệu suất): tốc độ tải, LCP, INP, CLS và tối ưu tài nguyên.',
    '8. Responsive (Tương thích): hiển thị trên desktop, tablet và mobile.',
    '9. Security (Bảo mật): HTTPS, chính sách dữ liệu và cấu hình bảo mật.',
    '10. Trust (Độ tin cậy): thông tin doanh nghiệp, minh chứng năng lực, chính sách.',
    '',
    'NGUYÊN TẮC BẮT BUỘC:',
    '- Chỉ phân tích dựa trên dữ liệu client-side nằm trong khối <du_lieu_quet>. Không truy cập internet, không tự suy đoán, không bịa đặt số liệu hay quan sát.',
    '- Mỗi bằng chứng (evidence) phải trích dẫn giá trị hoặc quan sát cụ thể CÓ TRONG dữ liệu (ví dụ: "LCP = 4.2s", "thiếu thẻ meta description", "3/12 ảnh không có alt"). Nếu dữ liệu không có, tuyệt đối không kết luận và phải ghi hạng mục đó vào limitations.',
    '- Trả về đúng 03 strengths và đúng 03 improvements, chọn 03 nội dung có tác động lớn nhất và không trùng ý. Nếu dữ liệu không đủ bằng chứng cho đủ 3 mục, trả về ít hơn và ghi rõ lý do trong limitations; không được bịa thêm.',
    '- severity chỉ nhận một trong: low, medium, high, critical.',
    '- Viết tiếng Việt, ngắn gọn, chuyên nghiệp. title tối đa 90 ký tự. solution phải là hành động cụ thể, khả thi trong 1-2 câu.',
    '- strategicAdvice dài 3-5 câu, nêu thứ tự ưu tiên hành động dựa trên tác động và chi phí thực thi.',
    '- limitations liệt kê các hạng mục chưa đủ dữ liệu để đánh giá. Không được bịa.',
    '- evaluatedCriteria đánh dấu cả 10 nhóm: status "evaluated" nếu có dữ liệu, "limited" nếu thiếu dữ liệu.',
    '- Chỉ trả về DUY NHẤT một đối tượng JSON hợp lệ, không markdown, không giải thích ngoài JSON, không thêm trường ngoài schema.',
    '',
    'SCHEMA BẮT BUỘC:',
    OUTPUT_SCHEMA
  ].join('\n');

  function icon(name, className) {
    const body = ICONS[name] || ICONS.sparkles;
    return '<svg class="' + (className || 'h-5 w-5') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + body + '</svg>';
  }

  function esc(value) {
    return String(value === null || value === undefined ? '' : value).replace(/[&<>"']/g, function (char) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char];
    });
  }

  function delay(ms) {
    return new Promise(function (resolve) { setTimeout(resolve, ms); });
  }

  function normalizeUrl(value) {
    const raw = String(value || '').trim();
    if (!raw) return '';
    try {
      const withScheme = /^https?:\/\//i.test(raw) ? raw : 'https://' + raw;
      const parsed = new URL(withScheme);
      if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return '';
      return parsed.toString();
    } catch (error) {
      return '';
    }
  }

  function displayUrl(value) {
    try {
      const parsed = new URL(value);
      return parsed.hostname.replace(/^www\./, '') + (parsed.pathname === '/' ? '' : parsed.pathname);
    } catch (error) {
      return String(value || '');
    }
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

  function criterionMeta(value) {
    const raw = String(value || '').trim();
    const needle = raw.toLowerCase();
    const found = CRITERIA.find(function (item) {
      return needle === item.key || needle.indexOf(item.key) !== -1 || needle.indexOf(item.label.toLowerCase()) !== -1 || needle.indexOf(item.name.toLowerCase()) !== -1;
    });
    if (found) return found;
    return { key: 'overall', label: raw || 'Tổng thể', name: raw || 'Tổng thể', icon: 'target', accent: 'slate' };
  }

  function criterionChip(value) {
    const meta = criterionMeta(value);
    const chip = CRITERION_CHIP[meta.key] || 'bg-slate-100 text-slate-700 ring-slate-200';
    return '<span class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ' + chip + '"><span class="h-1.5 w-1.5 rounded-full ' + (CRITERION_DOT[meta.key] || 'bg-slate-400') + '"></span>' + esc(meta.label) + '</span>';
  }

  function severityMeta(value) {
    const needle = String(value || '').toLowerCase();
    if (needle.indexOf('critical') !== -1 || needle.indexOf('nghiêm trọng') !== -1 || needle.indexOf('nghiem trong') !== -1 || needle.indexOf('khẩn cấp') !== -1) return SEVERITY.critical;
    if (needle.indexOf('high') !== -1 || needle.indexOf('cao') !== -1 || needle.indexOf('major') !== -1) return SEVERITY.high;
    if (needle.indexOf('low') !== -1 || needle.indexOf('thấp') !== -1 || needle.indexOf('thap') !== -1 || needle.indexOf('minor') !== -1) return SEVERITY.low;
    return SEVERITY.medium;
  }

  function asString(value) {
    return typeof value === 'string' ? value.trim() : value === null || value === undefined ? '' : String(value).trim();
  }

  function asArray(value) {
    return Array.isArray(value) ? value : [];
  }

  function compactScanData(data) {
    if (data === null || data === undefined) return '{}';
    if (typeof data === 'string') {
      return data.length > 16000 ? data.slice(0, 16000) + '\n…[dữ liệu đã được lược bớt]' : data;
    }
    try {
      const seen = new WeakSet();
      const text = JSON.stringify(data, function (key, value) {
        if (typeof value === 'string' && value.length > 1200) return value.slice(0, 1200) + '…[lược bớt]';
        if (Array.isArray(value) && value.length > 40) return value.slice(0, 40).concat(['…[còn ' + (value.length - 40) + ' mục]']);
        if (value && typeof value === 'object') {
          if (seen.has(value)) return '[vòng lặp]';
          seen.add(value);
        }
        return value;
      }, 2);
      if (typeof text !== 'string' || !text) return '{}';
      return text.length > 16000 ? text.slice(0, 16000) + '\n…[dữ liệu đã được lược bớt do giới hạn]' : text;
    } catch (error) {
      return String(data).slice(0, 16000);
    }
  }

  function buildUserPrompt(url, dataText) {
    return [
      'URL doanh nghiệp cần đánh giá: ' + url,
      '',
      'DỮ LIỆU QUÉT CLIENT-SIDE TỪ PHẦN 1 (chỉ được dùng dữ liệu trong khối này):',
      '<du_lieu_quet>',
      dataText,
      '</du_lieu_quet>',
      '',
      'Hãy phân tích và trả về DUY NHẤT một đối tượng JSON hợp lệ theo schema đã quy định. Không markdown, không giải thích ngoài JSON.'
    ].join('\n');
  }

  function parseModelJson(text) {
    const raw = String(text || '').trim();
    if (!raw) throw new Error('AI trả về nội dung rỗng.');
    const candidates = [];
    const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)```/i);
    if (fenced && fenced[1]) candidates.push(fenced[1].trim());
    candidates.push(raw);
    const first = raw.indexOf('{');
    const last = raw.lastIndexOf('}');
    if (first !== -1 && last > first) candidates.push(raw.slice(first, last + 1));
    for (const candidate of candidates) {
      try {
        const parsed = JSON.parse(candidate);
        if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) return parsed;
      } catch (error) {
        continue;
      }
    }
    throw new Error('AI trả về JSON không hợp lệ.');
  }

  function extractModelText(data) {
    if (!data || typeof data !== 'object') return typeof data === 'string' ? data : '';
    if (Array.isArray(data.choices) && data.choices[0]) {
      const choice = data.choices[0];
      const content = choice.message && choice.message.content !== undefined ? choice.message.content : choice.text !== undefined ? choice.text : choice.delta && choice.delta.content;
      if (Array.isArray(content)) return content.map(function (part) { return part && (part.text || part.content) || ''; }).join('');
      if (typeof content === 'string') return content;
    }
    if (Array.isArray(data.candidates) && data.candidates[0]) {
      const parts = data.candidates[0].content && data.candidates[0].content.parts;
      if (Array.isArray(parts)) return parts.map(function (part) { return part && part.text || ''; }).join('');
    }
    if (data.message && typeof data.message.content === 'string') return data.message.content;
    if (typeof data.response === 'string') return data.response;
    if (typeof data.output_text === 'string') return data.output_text;
    if (typeof data.content === 'string') return data.content;
    return '';
  }

  async function callModel(messages, config, signal) {
    if (typeof config.fetcher === 'function') {
      const output = await config.fetcher({ messages: messages, config: config, signal: signal });
      if (typeof output === 'string') return output;
      if (output && typeof output === 'object') {
        const extracted = extractModelText(output);
        if (extracted) return extracted;
        return JSON.stringify(output);
      }
      throw new Error('fetcher không trả về nội dung hợp lệ.');
    }

    const headers = Object.assign({ 'Content-Type': 'application/json' }, config.headers || {});
    const hasAuth = Object.keys(headers).some(function (key) { return key.toLowerCase() === 'authorization'; });
    if (config.apiKey && !hasAuth) headers.Authorization = 'Bearer ' + config.apiKey;

    const body = {
      model: config.model,
      messages: messages,
      temperature: config.temperature,
      max_tokens: config.maxTokens
    };
    if (config.jsonMode) body.response_format = { type: 'json_object' };

    const response = await fetch(config.endpoint, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
      signal: signal
    });

    const text = await response.text();
    if (!response.ok) {
      let detail = text;
      try {
        const parsed = JSON.parse(text);
        detail = parsed.error && parsed.error.message ? parsed.error.message : parsed.message || text;
      } catch (error) {
        detail = text;
      }
      throw new Error('API trả về lỗi ' + response.status + ': ' + String(detail).slice(0, 300));
    }

    let data;
    try {
      data = JSON.parse(text);
    } catch (error) {
      return text;
    }
    const extracted = extractModelText(data);
    if (!extracted) throw new Error('Không đọc được nội dung phản hồi từ API.');
    return extracted;
  }

  function normalizeResult(raw, fallbackUrl) {
    const source = raw && typeof raw === 'object' ? raw : {};

    const strengths = asArray(source.strengths).slice(0, 3).map(function (item) {
      const entry = item && typeof item === 'object' ? item : { title: item };
      return {
        criterion: asString(entry.criterion || entry.category || entry.group),
        title: asString(entry.title || entry.name) || 'Chưa có tiêu đề',
        evidence: asString(entry.evidence || entry.observation || entry.proof),
        impact: asString(entry.impact || entry.meaning || entry.benefit || entry.significance)
      };
    });

    const improvements = asArray(source.improvements).slice(0, 3).map(function (item) {
      const entry = item && typeof item === 'object' ? item : { title: item };
      const severity = severityMeta(entry.severity || entry.level || entry.priority);
      return {
        criterion: asString(entry.criterion || entry.category || entry.group),
        severity: severity.key,
        title: asString(entry.title || entry.name) || 'Chưa có tiêu đề',
        evidence: asString(entry.evidence || entry.observation || entry.proof),
        consequence: asString(entry.consequence || entry.impact || entry.risk),
        solution: asString(entry.solution || entry.recommendation || entry.fix || entry.action)
      };
    });

    const limitations = asArray(source.limitations).map(asString).filter(Boolean);

    const evaluated = asArray(source.evaluatedCriteria).map(function (item) {
      if (typeof item === 'string') {
        const meta = criterionMeta(item);
        return { key: meta.key, label: meta.label, status: 'limited', note: '' };
      }
      const meta = criterionMeta(item && (item.key || item.criterion || item.label));
      return {
        key: meta.key,
        label: meta.label,
        status: item && item.status === 'evaluated' ? 'evaluated' : 'limited',
        note: asString(item && item.note)
      };
    });

    const result = {
      url: normalizeUrl(source.url) || normalizeUrl(fallbackUrl) || asString(source.url || fallbackUrl),
      generatedAt: new Date().toISOString(),
      strengths: strengths,
      improvements: improvements,
      limitations: limitations,
      strategicAdvice: asString(source.strategicAdvice || source.advice || source.summary),
      evaluatedCriteria: evaluated,
      meta: {
        demo: !!(source.meta && source.meta.demo),
        model: asString(source.meta && source.meta.model)
      }
    };

    if (result.strengths.length < 3) {
      result.limitations.push('AI chỉ xác định được ' + result.strengths.length + '/3 điểm mạnh đủ bằng chứng từ dữ liệu quét.');
    }
    if (result.improvements.length < 3) {
      result.limitations.push('AI chỉ xác định được ' + result.improvements.length + '/3 điểm cần cải thiện đủ bằng chứng từ dữ liệu quét.');
    }

    return result;
  }

  function statusTone(tone) {
    const tones = {
      idle: { dot: 'bg-emerald-500', badge: 'bg-emerald-50 text-emerald-700 ring-emerald-200', pulse: '' },
      loading: { dot: 'bg-indigo-500', badge: 'bg-indigo-50 text-indigo-700 ring-indigo-200', pulse: 'p3-pulse-dot' },
      success: { dot: 'bg-emerald-500', badge: 'bg-emerald-50 text-emerald-700 ring-emerald-200', pulse: '' },
      error: { dot: 'bg-rose-500', badge: 'bg-rose-50 text-rose-700 ring-rose-200', pulse: '' }
    };
    return tones[tone] || tones.idle;
  }

  function criteriaStrip() {
    return CRITERIA.map(function (item) {
      return '<span class="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-2.5 py-1 text-[11px] font-medium text-slate-600 ring-1 ring-slate-200" title="' + esc(item.name) + '"><span class="h-1.5 w-1.5 rounded-full ' + CRITERION_DOT[item.key] + '"></span>' + esc(item.label) + '</span>';
    }).join('');
  }

  function summaryRow(result) {
    const tone = result.meta && result.meta.demo;
    return [
      '<div class="flex min-w-0 items-center gap-3">',
      '<span class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-indigo-600 ring-1 ring-slate-200">' + icon('globe', 'h-5 w-5') + '</span>',
      '<div class="min-w-0">',
      '<p class="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Website đã phân tích</p>',
      '<p class="truncate text-sm font-semibold text-slate-800" title="' + esc(result.url) + '">' + esc(displayUrl(result.url)) + '</p>',
      '</div>',
      '</div>',
      '<div class="flex flex-wrap items-center gap-2">',
      '<span class="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-200">' + icon('check', 'h-3.5 w-3.5') + result.strengths.length + ' điểm sáng</span>',
      '<span class="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-700 ring-1 ring-amber-200">' + icon('alert', 'h-3.5 w-3.5') + result.improvements.length + ' cần cải thiện</span>',
      '<span class="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600 ring-1 ring-slate-200">' + icon('info', 'h-3.5 w-3.5') + result.limitations.length + ' hạn chế dữ liệu</span>',
      tone ? '<span class="inline-flex items-center gap-1.5 rounded-full bg-violet-50 px-2.5 py-1 text-[11px] font-semibold text-violet-700 ring-1 ring-violet-200">' + icon('sparkles', 'h-3.5 w-3.5') + 'Dữ liệu minh hoạ</span>' : '',
      '</div>'
    ].join('');
  }

  function strengthItem(item, index) {
    const meta = criterionMeta(item.criterion);
    return [
      '<li class="p3-fade-up relative overflow-hidden rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm" style="animation-delay:' + (index * 70) + 'ms">',
      '<span class="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-emerald-400 to-teal-500"></span>',
      '<div class="flex items-start gap-4">',
      '<span class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">' + icon(meta.icon, 'h-5 w-5') + '</span>',
      '<div class="min-w-0 flex-1">',
      '<div class="flex flex-wrap items-center justify-between gap-2">',
      criterionChip(item.criterion),
      '<span class="text-[11px] font-bold tracking-widest text-emerald-500">#' + String(index + 1).padStart(2, '0') + '</span>',
      '</div>',
      '<h4 class="mt-2 text-[15px] font-semibold leading-6 text-slate-900">' + esc(item.title) + '</h4>',
      item.evidence ? '<div class="mt-3 rounded-xl bg-emerald-50/70 p-3 ring-1 ring-emerald-100"><p class="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-emerald-700">' + icon('quote', 'h-3.5 w-3.5') + 'Bằng chứng quan sát</p><p class="mt-1.5 text-sm leading-6 text-slate-700">' + esc(item.evidence) + '</p></div>' : '',
      item.impact ? '<p class="mt-3 flex items-start gap-2 text-sm leading-6 text-slate-600">' + icon('trend', 'mt-0.5 h-4 w-4 shrink-0 text-emerald-500') + '<span><strong class="font-semibold text-slate-800">Ý nghĩa tích cực:</strong> ' + esc(item.impact) + '</span></p>' : '',
      '</div>',
      '</div>',
      '</li>'
    ].join('');
  }

  function improvementItem(item, index) {
    const meta = criterionMeta(item.criterion);
    const severity = severityMeta(item.severity);
    return [
      '<li class="p3-fade-up relative overflow-hidden rounded-2xl border border-amber-100 bg-white p-5 shadow-sm" style="animation-delay:' + (index * 70) + 'ms">',
      '<span class="absolute inset-y-0 left-0 w-1 bg-gradient-to-b ' + severity.bar + '"></span>',
      '<div class="flex items-start gap-4">',
      '<span class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-50 text-amber-600 ring-1 ring-amber-100">' + icon(meta.icon, 'h-5 w-5') + '</span>',
      '<div class="min-w-0 flex-1">',
      '<div class="flex flex-wrap items-center gap-2">',
      '<span class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ring-1 ' + severity.badge + '"><span class="h-1.5 w-1.5 rounded-full ' + severity.dot + '"></span>' + esc(severity.label) + '</span>',
      criterionChip(item.criterion),
      '<span class="ml-auto text-[11px] font-bold tracking-widest text-amber-500">#' + String(index + 1).padStart(2, '0') + '</span>',
      '</div>',
      '<h4 class="mt-2 text-[15px] font-semibold leading-6 text-slate-900">' + esc(item.title) + '</h4>',
      item.evidence ? '<div class="mt-3 rounded-xl bg-amber-50/70 p-3 ring-1 ring-amber-100"><p class="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-amber-700">' + icon('quote', 'h-3.5 w-3.5') + 'Bằng chứng</p><p class="mt-1.5 text-sm leading-6 text-slate-700">' + esc(item.evidence) + '</p></div>' : '',
      item.consequence ? '<div class="mt-2 rounded-xl bg-rose-50/70 p-3 ring-1 ring-rose-100"><p class="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-rose-700">' + icon('warning', 'h-3.5 w-3.5') + 'Hệ quả nếu bỏ qua</p><p class="mt-1.5 text-sm leading-6 text-slate-700">' + esc(item.consequence) + '</p></div>' : '',
      item.solution ? '<div class="mt-2 rounded-xl bg-white p-3 ring-1 ring-emerald-200"><p class="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-emerald-700">' + icon('wrench', 'h-3.5 w-3.5') + 'Giải pháp thực thi</p><p class="mt-1.5 text-sm leading-6 text-slate-700">' + esc(item.solution) + '</p></div>' : '',
      '</div>',
      '</div>',
      '</li>'
    ].join('');
  }

  function strengthsCard(result) {
    const items = result.strengths.length
      ? result.strengths.map(strengthItem).join('')
      : '<li class="rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/50 p-5 text-sm leading-6 text-slate-600">Chưa có điểm mạnh nào đủ bằng chứng từ dữ liệu quét.</li>';
    return [
      '<section class="rounded-3xl border border-emerald-200/80 bg-gradient-to-b from-emerald-50/90 to-white p-5 shadow-sm md:p-6">',
      '<div class="flex items-start justify-between gap-3">',
      '<div class="flex items-center gap-3">',
      '<span class="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/25">' + icon('checkCircle', 'h-6 w-6') + '</span>',
      '<div>',
      '<p class="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-700">Strengths</p>',
      '<h3 class="text-lg font-bold text-slate-900">03 điểm sáng nổi bật</h3>',
      '<p class="text-xs text-slate-500">Bằng chứng quan sát trực tiếp từ dữ liệu quét</p>',
      '</div>',
      '</div>',
      '<span class="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-700">' + result.strengths.length + '/3</span>',
      '</div>',
      '<ol class="mt-5 space-y-3">' + items + '</ol>',
      '</section>'
    ].join('');
  }

  function improvementsCard(result) {
    const items = result.improvements.length
      ? result.improvements.map(improvementItem).join('')
      : '<li class="rounded-2xl border border-dashed border-amber-200 bg-amber-50/50 p-5 text-sm leading-6 text-slate-600">Chưa có điểm cần cải thiện nào đủ bằng chứng từ dữ liệu quét.</li>';
    return [
      '<section class="rounded-3xl border border-amber-200/80 bg-gradient-to-b from-amber-50/90 to-white p-5 shadow-sm md:p-6">',
      '<div class="flex items-start justify-between gap-3">',
      '<div class="flex items-center gap-3">',
      '<span class="grid h-11 w-11 place-items-center rounded-2xl bg-amber-500 text-white shadow-lg shadow-amber-500/25">' + icon('alert', 'h-6 w-6') + '</span>',
      '<div>',
      '<p class="text-[10px] font-bold uppercase tracking-[0.18em] text-amber-700">Improvements</p>',
      '<h3 class="text-lg font-bold text-slate-900">03 điểm cần cải thiện</h3>',
      '<p class="text-xs text-slate-500">Ưu tiên theo mức độ nghiêm trọng và tác động</p>',
      '</div>',
      '</div>',
      '<span class="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-700">' + result.improvements.length + '/3</span>',
      '</div>',
      '<ol class="mt-5 space-y-3">' + items + '</ol>',
      '</section>'
    ].join('');
  }

  function adviceCard(advice) {
    const body = advice || 'Chưa có lời khuyên tổng kết từ AI cho lần phân tích này.';
    return [
      '<section class="relative overflow-hidden rounded-3xl bg-slate-950 p-6 text-slate-100 shadow-xl md:p-7">',
      '<div class="p3-advice-shine pointer-events-none absolute inset-0 opacity-90"></div>',
      '<div class="relative">',
      '<div class="flex items-center gap-3">',
      '<span class="grid h-10 w-10 place-items-center rounded-2xl bg-white/10 text-amber-300 ring-1 ring-white/15">' + icon('lightbulb', 'h-5 w-5') + '</span>',
      '<div>',
      '<p class="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-200/80">Expert insight</p>',
      '<h3 class="text-base font-semibold">Lời khuyên chiến lược từ chuyên gia AI</h3>',
      '</div>',
      '</div>',
      '<p class="mt-4 whitespace-pre-line text-sm leading-7 text-slate-200">' + esc(body) + '</p>',
      '<div class="mt-5 flex items-center gap-2 text-[11px] text-slate-400">' + icon('info', 'h-4 w-4') + 'Thứ tự ưu tiên dựa trên tác động × chi phí thực thi.</div>',
      '</div>',
      '</section>'
    ].join('');
  }

  function limitationsCard(limitations) {
    const items = limitations.length
      ? '<ul class="mt-4 space-y-2.5">' + limitations.map(function (item) {
        return '<li class="flex items-start gap-2.5 text-sm leading-6 text-slate-600"><span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400"></span><span>' + esc(item) + '</span></li>';
      }).join('') + '</ul>'
      : '<div class="mt-4 flex items-start gap-2.5 rounded-xl bg-emerald-50 p-3 text-sm leading-6 text-emerald-700 ring-1 ring-emerald-100">' + icon('checkCircle', 'mt-0.5 h-4 w-4 shrink-0') + '<span>Đủ dữ liệu để đánh giá toàn bộ 10 nhóm tiêu chí trong lần quét này.</span></div>';
    return [
      '<section class="rounded-3xl border border-slate-200 bg-slate-50/80 p-6">',
      '<div class="flex items-center justify-between gap-3">',
      '<div class="flex items-center gap-2.5">',
      '<span class="grid h-9 w-9 place-items-center rounded-xl bg-white text-slate-500 ring-1 ring-slate-200">' + icon('info', 'h-5 w-5') + '</span>',
      '<div>',
      '<p class="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Limitations</p>',
      '<h3 class="text-sm font-semibold text-slate-800">Hạng mục chưa đủ dữ liệu</h3>',
      '</div>',
      '</div>',
      '<span class="rounded-full bg-white px-2.5 py-1 text-[11px] font-bold text-slate-500 ring-1 ring-slate-200">' + limitations.length + '</span>',
      '</div>',
      items,
      '</section>'
    ].join('');
  }

  function actionsRow() {
    const secondary = 'inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50';
    const primary = 'inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-800';
    return [
      '<div class="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-3">',
      '<div class="flex items-center gap-2 text-xs text-slate-500">' + icon('arrow', 'h-4 w-4 text-indigo-500') + 'Sẵn sàng bàn giao sang Phần 4 · Xuất báo cáo</div>',
      '<div class="flex flex-wrap gap-2">',
      '<button type="button" data-p3-action="copy" class="' + secondary + '">' + icon('copy', 'h-4 w-4') + 'Sao chép JSON</button>',
      '<button type="button" data-p3-action="download" class="' + secondary + '">' + icon('download', 'h-4 w-4') + 'Tải JSON</button>',
      '<button type="button" data-p3-action="retry" class="' + primary + '">' + icon('refresh', 'h-4 w-4') + 'Phân tích lại</button>',
      '</div>',
      '</div>'
    ].join('');
  }

  function successBody(result) {
    return [
      '<div class="p3-fade-up space-y-5">',
      '<div class="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3.5">' + summaryRow(result) + '</div>',
      '<div class="grid gap-5 xl:grid-cols-2">' + strengthsCard(result) + improvementsCard(result) + '</div>',
      '<div class="grid gap-5 lg:grid-cols-[1.4fr_.6fr]">' + adviceCard(result.strategicAdvice) + limitationsCard(result.limitations) + '</div>',
      actionsRow(),
      '</div>'
    ].join('');
  }

  function idleBody() {
    const steps = [
      'Phần 1 gửi URL cùng dữ liệu quét client-side vào module.',
      'AI đối chiếu dữ liệu với 10 nhóm tiêu chí Ba-rem.',
      'AI xác minh bằng chứng, không suy đoán, không bịa số liệu.',
      'Kết quả trả về đúng cấu trúc 03 điểm sáng + 03 điểm cải thiện.'
    ];
    return [
      '<div class="p3-fade-up grid gap-5 lg:grid-cols-[1.15fr_.85fr]">',
      '<div class="relative overflow-hidden rounded-3xl border border-dashed border-indigo-200 bg-gradient-to-br from-indigo-50 via-white to-sky-50 p-7">',
      '<div class="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-indigo-200/40 blur-2xl"></div>',
      '<div class="relative">',
      '<span class="grid h-12 w-12 place-items-center rounded-2xl bg-white text-indigo-600 shadow-sm ring-1 ring-indigo-100">' + icon('sparkles', 'h-6 w-6') + '</span>',
      '<h3 class="mt-4 text-xl font-bold text-slate-900">Chờ dữ liệu từ Phần 1</h3>',
      '<p class="mt-2 max-w-xl text-sm leading-6 text-slate-600">Khi quá trình quét client-side hoàn tất, gọi <code class="rounded bg-slate-900 px-1.5 py-0.5 font-mono text-[11px] text-emerald-300">part3.analyze({ url, scanData })</code> để AI đối chiếu Ba-rem và tự động render kết quả tại đây.</p>',
      '<ol class="mt-5 space-y-3">',
      steps.map(function (step, index) {
        return '<li class="flex items-start gap-3"><span class="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white text-[11px] font-bold text-indigo-600 ring-1 ring-indigo-200">' + (index + 1) + '</span><span class="pt-0.5 text-sm leading-5 text-slate-600">' + esc(step) + '</span></li>';
      }).join(''),
      '</ol>',
      '</div>',
      '</div>',
      '<div class="rounded-3xl border border-slate-200 bg-white p-6">',
      '<div class="flex items-center justify-between gap-3">',
      '<p class="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Cam kết đầu ra</p>',
      '<span class="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">STRICT JSON</span>',
      '</div>',
      '<div class="mt-4 space-y-2.5">',
      '<div class="flex items-center gap-3 rounded-xl bg-emerald-50/70 p-3 ring-1 ring-emerald-100"><span class="grid h-8 w-8 place-items-center rounded-lg bg-emerald-500 text-white">' + icon('checkCircle', 'h-4 w-4') + '</span><div><p class="text-xs font-semibold text-slate-800">03 điểm sáng</p><p class="text-[11px] text-slate-500">Tiêu đề · bằng chứng · ý nghĩa tích cực</p></div></div>',
      '<div class="flex items-center gap-3 rounded-xl bg-amber-50/70 p-3 ring-1 ring-amber-100"><span class="grid h-8 w-8 place-items-center rounded-lg bg-amber-500 text-white">' + icon('alert', 'h-4 w-4') + '</span><div><p class="text-xs font-semibold text-slate-800">03 điểm cần cải thiện</p><p class="text-[11px] text-slate-500">Mức độ · hệ quả · giải pháp thực thi</p></div></div>',
      '<div class="flex items-center gap-3 rounded-xl bg-slate-50 p-3 ring-1 ring-slate-200"><span class="grid h-8 w-8 place-items-center rounded-lg bg-slate-500 text-white">' + icon('info', 'h-4 w-4') + '</span><div><p class="text-xs font-semibold text-slate-800">Hạn chế dữ liệu</p><p class="text-[11px] text-slate-500">Minh bạch các hạng mục chưa đánh giá được</p></div></div>',
      '</div>',
      '<div class="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-3">',
      '<p class="text-[10px] font-bold uppercase tracking-wide text-slate-400">Thang mức độ</p>',
      '<div class="mt-2 flex flex-wrap gap-1.5">',
      Object.keys(SEVERITY).map(function (key) {
        const severity = SEVERITY[key];
        return '<span class="inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[10px] font-semibold ring-1 ' + severity.badge + '"><span class="h-1.5 w-1.5 rounded-full ' + severity.dot + '"></span>' + severity.label + '</span>';
      }).join(''),
      '</div>',
      '</div>',
      '</div>',
      '</div>'
    ].join('');
  }

  function loadingBody() {
    function skeleton(accent) {
      const rows = [0, 1, 2].map(function () {
        return '<div class="rounded-xl border border-white/60 bg-white/70 p-3"><div class="p3-shimmer h-3 w-24 rounded"></div><div class="p3-shimmer mt-2 h-4 w-4/5 rounded"></div><div class="p3-shimmer mt-2 h-3 w-full rounded"></div></div>';
      }).join('');
      return [
        '<div class="rounded-3xl border ' + accent + ' bg-white/70 p-5">',
        '<div class="flex items-center gap-3"><div class="p3-shimmer h-11 w-11 rounded-2xl"></div><div class="flex-1 space-y-2"><div class="p3-shimmer h-2.5 w-20 rounded"></div><div class="p3-shimmer h-4 w-44 rounded"></div></div></div>',
        '<div class="mt-5 space-y-3">' + rows + '</div>',
        '</div>'
      ].join('');
    }
    return [
      '<div class="p3-fade-up">',
      '<div class="flex flex-col items-center gap-4 rounded-3xl border border-indigo-100 bg-gradient-to-b from-indigo-50/70 to-white p-8 text-center">',
      '<div class="relative grid h-16 w-16 place-items-center">',
      '<span class="absolute inset-0 rounded-full border-4 border-indigo-100"></span>',
      '<span class="p3-spin absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-600"></span>',
      '<span class="text-indigo-600">' + icon('robot', 'h-7 w-7') + '</span>',
      '</div>',
      '<div>',
      '<p class="text-lg font-bold text-slate-900">AI đang đối chiếu Ba-rem chuyên sâu...</p>',
      '<p data-p3-loading-text class="mt-1 text-sm text-slate-500">Đang chuẩn hoá dữ liệu quét từ Phần 1…</p>',
      '</div>',
      '<div class="p3-progress relative h-2 w-full max-w-md overflow-hidden rounded-full bg-indigo-100"></div>',
      '<div class="flex flex-wrap justify-center gap-1.5">' + criteriaStrip() + '</div>',
      '<button type="button" data-p3-action="cancel" class="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-500 transition hover:bg-slate-50">' + icon('close', 'h-4 w-4') + 'Huỷ phân tích</button>',
      '</div>',
      '<div class="mt-5 grid gap-5 xl:grid-cols-2">' + skeleton('border-emerald-100 bg-emerald-50/40') + skeleton('border-amber-100 bg-amber-50/40') + '</div>',
      '</div>'
    ].join('');
  }

  function errorBody(message, kind) {
    const configHint = kind === 'config'
      ? '<div class="mx-auto mt-4 max-w-xl rounded-2xl bg-white p-4 text-left text-xs leading-6 text-slate-600 ring-1 ring-rose-100"><p class="font-semibold text-slate-800">Cấu hình nhanh</p><pre class="mt-2 overflow-x-auto rounded-xl bg-slate-900 p-3 text-[11px] leading-5 text-slate-200"><code>const part3 = Part3Review.create(\'#part3\', {\n  endpoint: \'/api/ai-review\',\n  apiKey: \'***\',\n  model: \'gpt-4o-mini\'\n});</code></pre><p class="mt-2 text-[11px] text-slate-500">Khuyến nghị gọi qua backend proxy để không lộ API key trên trình duyệt.</p></div>'
      : '';
    const dataHint = kind === 'data'
      ? '<p class="mx-auto mt-3 max-w-xl text-xs leading-5 text-rose-600">Phần 1 cần truyền dữ liệu quét thực tế (object hoặc chuỗi) trong trường <code class="font-mono">scanData</code>. Module không tự tạo dữ liệu.</p>'
      : '';
    return [
      '<div class="p3-fade-up rounded-3xl border border-rose-200 bg-rose-50/60 p-8 text-center">',
      '<span class="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-white text-rose-500 shadow-sm ring-1 ring-rose-100">' + icon('warning', 'h-7 w-7') + '</span>',
      '<h3 class="mt-4 text-lg font-bold text-slate-900">Chưa thể hoàn tất phân tích</h3>',
      '<p class="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-600">' + esc(message) + '</p>',
      dataHint,
      configHint,
      '<div class="mt-5 flex justify-center"><button type="button" data-p3-action="retry" class="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-800">' + icon('refresh', 'h-4 w-4') + 'Thử lại</button></div>',
      '</div>'
    ].join('');
  }

  class Part3Review {
    constructor(container, options) {
      this.container = container;
      this.options = Object.assign({}, options || {});
      this.result = null;
      this.payload = null;
      this.controller = null;
      this.statusTimer = null;
      this.root = null;
      this.bodyEl = null;
      this.mounted = false;
      this.onClick = this.handleClick.bind(this);
    }

    config() {
      return Object.assign({}, DEFAULT_OPTIONS, global.PART3_CONFIG || {}, this.options);
    }

    configure(patch) {
      Object.assign(this.options, patch || {});
      return this;
    }

    mount() {
      if (this.mounted) return this;
      this.renderShell();
      this.container.addEventListener('click', this.onClick);
      this.mounted = true;
      this.renderIdle();
      return this;
    }

    renderShell() {
      this.container.innerHTML = [
        '<section class="p3-root" data-p3-root>',
        '<div class="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.35)]">',
        '<div class="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-br from-indigo-600/10 via-sky-500/10 to-emerald-500/10"></div>',
        '<header class="relative p-6 md:p-8">',
        '<div class="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">',
        '<div class="flex items-start gap-4">',
        '<div class="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-indigo-600 to-sky-500 text-white shadow-lg shadow-indigo-500/25">' + icon('robot', 'h-6 w-6') + '</div>',
        '<div>',
        '<div class="flex flex-wrap items-center gap-2">',
        '<span class="rounded-full bg-indigo-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-indigo-700 ring-1 ring-indigo-200">Phần 3</span>',
        '<span class="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">AI Review Engine</span>',
        '<span class="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-700 ring-1 ring-emerald-200">Ba-rem 10 tiêu chí</span>',
        '</div>',
        '<h2 class="mt-2 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">Đánh giá &amp; nhận xét website</h2>',
        '<p class="mt-1 max-w-2xl text-sm leading-6 text-slate-500">AI đối chiếu dữ liệu quét client-side với Ba-rem chuyên sâu, chỉ kết luận dựa trên bằng chứng quan sát được.</p>',
        '</div>',
        '</div>',
        '</div>',
        '<div data-p3-statusbar class="mt-6 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white/70 p-4 backdrop-blur sm:flex-row sm:items-center sm:justify-between">',
        '<div class="flex items-center gap-3">',
        '<span data-p3-statusdot class="h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500"></span>',
        '<div>',
        '<p data-p3-statustitle class="text-sm font-semibold text-slate-800">AI đối chiếu Ba-rem chuyên sâu</p>',
        '<p data-p3-statussub class="text-xs text-slate-500">Sẵn sàng nhận dữ liệu quét từ Phần 1.</p>',
        '</div>',
        '</div>',
        '<span data-p3-statusbadge class="inline-flex w-fit items-center rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700 ring-1 ring-emerald-200">Sẵn sàng</span>',
        '</div>',
        '<div class="mt-5 flex flex-wrap gap-1.5">' + criteriaStrip() + '</div>',
        '</header>',
        '<div data-p3-body class="relative border-t border-slate-100 p-6 md:p-8"></div>',
        '<footer class="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 px-6 py-4 text-[11px] text-slate-400 md:px-8">',
        '<p>Ba-rem 10 nhóm tiêu chí · Dữ liệu client-side từ Phần 1</p>',
        '<p>Part 3 · AI Review Engine v' + VERSION + '</p>',
        '</footer>',
        '</div>',
        '</section>'
      ].join('');

      this.root = this.container.querySelector('[data-p3-root]');
      this.bodyEl = this.container.querySelector('[data-p3-body]');
    }

    setStatus(tone, title, sub, badge) {
      const styles = statusTone(tone);
      const dot = this.container.querySelector('[data-p3-statusdot]');
      const titleEl = this.container.querySelector('[data-p3-statustitle]');
      const subEl = this.container.querySelector('[data-p3-statussub]');
      const badgeEl = this.container.querySelector('[data-p3-statusbadge]');
      if (dot) dot.className = 'h-2.5 w-2.5 shrink-0 rounded-full ' + styles.dot + ' ' + styles.pulse;
      if (titleEl) titleEl.textContent = title;
      if (subEl) subEl.textContent = sub;
      if (badgeEl) {
        badgeEl.className = 'inline-flex w-fit items-center rounded-full px-2.5 py-1 text-[11px] font-bold ring-1 ' + styles.badge;
        badgeEl.textContent = badge;
      }
      const loadingText = this.container.querySelector('[data-p3-loading-text]');
      if (loadingText && tone === 'loading') loadingText.textContent = sub;
    }

    renderIdle(options) {
      const cancelled = options && options.cancelled;
      this.result = null;
      this.setStatus('idle', 'AI đối chiếu Ba-rem chuyên sâu', cancelled ? 'Đã huỷ phân tích. Sẵn sàng nhận dữ liệu mới từ Phần 1.' : 'Sẵn sàng nhận dữ liệu quét từ Phần 1.', cancelled ? 'Đã huỷ' : 'Sẵn sàng');
      this.bodyEl.innerHTML = idleBody();
    }

    setLoading() {
      this.setStatus('loading', 'AI đang đối chiếu Ba-rem chuyên sâu...', 'Đang chuẩn hoá dữ liệu quét từ Phần 1…', 'Đang phân tích');
      this.bodyEl.innerHTML = loadingBody();
      this.startStatusRotation();
    }

    startStatusRotation() {
      this.stopStatusRotation();
      const messages = [
        'Đang chuẩn hoá dữ liệu quét từ Phần 1…',
        'Đang đối chiếu 10 nhóm tiêu chí Ba-rem…',
        'Đang kiểm chứng bằng chứng quan sát được…',
        'Đang tổng hợp 03 điểm sáng & 03 điểm cần cải thiện…'
      ];
      let index = 0;
      this.statusTimer = setInterval(() => {
        index = (index + 1) % messages.length;
        this.setStatus('loading', 'AI đang đối chiếu Ba-rem chuyên sâu...', messages[index], 'Đang phân tích');
      }, 2100);
    }

    stopStatusRotation() {
      if (this.statusTimer) {
        clearInterval(this.statusTimer);
        this.statusTimer = null;
      }
    }

    renderError(message, kind) {
      this.stopStatusRotation();
      this.setStatus('error', 'Đối chiếu Ba-rem chưa hoàn tất', message, 'Có lỗi');
      this.bodyEl.innerHTML = errorBody(message, kind);
    }

    renderSuccess(result) {
      const sub = result.strengths.length + ' điểm sáng · ' + result.improvements.length + ' điểm cải thiện · ' + result.limitations.length + ' hạn chế dữ liệu';
      this.setStatus('success', 'AI đã hoàn tất đối chiếu Ba-rem', sub, 'Hoàn tất');
      this.bodyEl.innerHTML = successBody(result);
    }

    async analyze(input) {
      const payload = input && typeof input === 'object' ? input : {};
      const url = normalizeUrl(payload.url);
      const scanData = payload.scanData !== undefined ? payload.scanData : payload.data !== undefined ? payload.data : payload.audit;

      if (!url) {
        const error = new Error('URL không hợp lệ. Cần truyền URL http(s) của website doanh nghiệp.');
        error.code = 'P3_BAD_URL';
        this.renderError(error.message, 'data');
        throw error;
      }

      const hasData = scanData !== null && scanData !== undefined && (typeof scanData !== 'string' || scanData.trim() !== '') && (typeof scanData !== 'object' || Array.isArray(scanData) || Object.keys(scanData).length > 0);
      if (!hasData) {
        const error = new Error('Thiếu dữ liệu quét client-side từ Phần 1. Module không tự tạo hoặc suy đoán dữ liệu.');
        error.code = 'P3_NO_DATA';
        this.renderError(error.message, 'data');
        throw error;
      }

      this.payload = { url: url, scanData: scanData };
      this.stopStatusRotation();
      if (this.controller) {
        const previous = this.controller;
        this.controller = null;
        try { previous.abort('replace'); } catch (error) { /* noop */ }
      }

      const config = this.config();
      if (!config.endpoint && typeof config.fetcher !== 'function') {
        const error = new Error('Chưa cấu hình API AI. Truyền endpoint OpenAI-compatible hoặc một fetcher riêng, hoặc gọi qua backend proxy của nhóm.');
        error.code = 'P3_NO_CONFIG';
        this.renderError(error.message, 'config');
        throw error;
      }

      const controller = new AbortController();
      this.controller = controller;
      let timedOut = false;
      const timer = setTimeout(function () {
        timedOut = true;
        try { controller.abort('timeout'); } catch (error) { /* noop */ }
      }, Math.max(5000, Number(config.timeoutMs) || DEFAULT_OPTIONS.timeoutMs));

      this.setLoading();
      this.emit('part3:start', { url: url });
      const startedAt = Date.now();

      try {
        const dataText = compactScanData(scanData);
        const messages = [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: buildUserPrompt(url, dataText) }
        ];
        const rawText = await callModel(messages, config, controller.signal);
        let parsed;
        try {
          parsed = parseModelJson(rawText);
        } catch (firstError) {
          const repairText = await callModel([
            { role: 'system', content: 'Bạn là bộ chuyển đổi định dạng. Chỉ trả về một đối tượng JSON hợp lệ theo schema, không markdown, không giải thích.' },
            { role: 'user', content: 'Chuyển nội dung dưới đây thành JSON đúng schema. Không thêm dữ kiện mới, không bịa.\n\nSCHEMA:\n' + OUTPUT_SCHEMA + '\n\nNỘI DUNG:\n' + String(rawText).slice(0, 18000) }
          ], config, controller.signal);
          parsed = parseModelJson(repairText);
        }

        const elapsed = Date.now() - startedAt;
        if (elapsed < 1100) await delay(1100 - elapsed);
        if (this.controller !== controller) return null;

        const result = normalizeResult(parsed, url);
        result.meta.demo = false;
        result.meta.model = config.model || '';
        this.result = result;
        this.renderSuccess(result);
        this.emit('part3:complete', this.getReportPayload());
        return result;
      } catch (error) {
        if (this.controller !== controller) return null;
        this.stopStatusRotation();
        const aborted = controller.signal.aborted;
        if (aborted && !timedOut) {
          this.renderIdle({ cancelled: true });
          this.emit('part3:cancel', { url: url });
          return null;
        }
        const message = timedOut || (error && error.name === 'AbortError')
          ? 'AI phản hồi quá lâu hoặc kết nối bị gián đoạn. Vui lòng thử lại.'
          : (error && error.message) || 'Không thể hoàn tất phân tích.';
        this.renderError(message, 'api');
        this.emit('part3:error', { url: url, message: message });
        throw error;
      } finally {
        clearTimeout(timer);
        if (this.controller === controller) {
          this.controller = null;
          this.stopStatusRotation();
        }
      }
    }

    renderResult(raw, options) {
      const fallbackUrl = this.payload && this.payload.url ? this.payload.url : '';
      const result = normalizeResult(raw, fallbackUrl);
      if (options && options.demo) result.meta.demo = true;
      if (options && options.model) result.meta.model = options.model;
      this.result = result;
      this.renderSuccess(result);
      this.emit('part3:complete', this.getReportPayload());
      return result;
    }

    getResult() {
      return this.result;
    }

    getReportPayload() {
      return {
        module: 'part3',
        version: VERSION,
        source: 'client-side-scan',
        url: this.result && this.result.url ? this.result.url : this.payload ? this.payload.url : '',
        generatedAt: this.result && this.result.generatedAt ? this.result.generatedAt : new Date().toISOString(),
        criteria: CRITERIA.map(function (item) { return { key: item.key, label: item.label, name: item.name }; }),
        result: this.result
      };
    }

    emit(name, detail) {
      try {
        this.container.dispatchEvent(new CustomEvent(name, { detail: detail, bubbles: true, composed: true }));
      } catch (error) {
        /* noop */
      }
    }

    handleClick(event) {
      const trigger = event.target.closest('[data-p3-action]');
      if (!trigger || !this.root || !this.root.contains(trigger)) return;
      const action = trigger.getAttribute('data-p3-action');
      if (action === 'cancel') {
        if (this.controller) {
          try { this.controller.abort('cancel'); } catch (error) { /* noop */ }
        }
        return;
      }
      if (action === 'retry') {
        if (this.payload) this.analyze(this.payload).catch(function () { /* handled in analyze */ });
        else this.renderIdle();
        return;
      }
      if (action === 'copy') this.copyResult();
      if (action === 'download') this.downloadResult();
    }

    toast(message) {
      const node = document.createElement('div');
      node.className = 'p3-toast fixed bottom-5 left-1/2 z-[9999] -translate-x-1/2 rounded-full bg-slate-900 px-4 py-2 text-xs font-medium text-white shadow-xl';
      node.setAttribute('role', 'status');
      node.textContent = message;
      document.body.appendChild(node);
      setTimeout(function () { node.remove(); }, 2200);
    }

    async copyResult() {
      if (!this.result) return;
      const text = JSON.stringify(this.getReportPayload(), null, 2);
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(text);
        } else {
          throw new Error('Clipboard API unavailable');
        }
        this.toast('Đã sao chép kết quả vào clipboard');
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
          this.toast('Đã sao chép kết quả vào clipboard');
        } catch (fallbackError) {
          this.toast('Không thể sao chép tự động');
        }
        area.remove();
      }
    }

    downloadResult() {
      if (!this.result) return;
      const json = JSON.stringify(this.getReportPayload(), null, 2);
      const blob = new Blob([json], { type: 'application/json;charset=utf-8' });
      const link = document.createElement('a');
      let host = 'website';
      try { host = new URL(this.result.url).hostname.replace(/^www\./, ''); } catch (error) { /* noop */ }
      link.href = URL.createObjectURL(blob);
      link.download = 'part3-ai-review-' + host + '-' + Date.now() + '.json';
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(function () { URL.revokeObjectURL(link.href); }, 1200);
      this.toast('Đã tải kết quả JSON');
    }

    destroy() {
      this.stopStatusRotation();
      if (this.controller) {
        const previous = this.controller;
        this.controller = null;
        try { previous.abort('destroy'); } catch (error) { /* noop */ }
      }
      if (this.container) this.container.removeEventListener('click', this.onClick);
      this.mounted = false;
      this.result = null;
      this.payload = null;
    }
  }

  function create(target, options) {
    const container = typeof target === 'string' ? document.querySelector(target) : target;
    if (!container) throw new Error('Part3Review: không tìm thấy container để mount.');
    return new Part3Review(container, options).mount();
  }

  const api = {
    version: VERSION,
    criteria: CRITERIA,
    create: create,
    Part3Review: Part3Review
  };

  global.Part3Review = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
