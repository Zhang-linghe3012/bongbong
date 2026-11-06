window.PART4_DEMO_PAYLOAD = {
  module: 'part3',
  version: '1.0.0',
  source: 'client-side-scan',
  url: 'https://demo-doanhnghiep.vn/',
  generatedAt: '2026-11-06T14:20:00+07:00',
  result: {
    url: 'https://demo-doanhnghiep.vn/',
    generatedAt: '2026-11-06T14:20:00+07:00',
    strengths: [
      {
        criterion: 'seo',
        title: 'Nền tảng SEO on-page tương đối đầy đủ',
        evidence: 'Title dài 58 ký tự, meta description 116 ký tự, đúng 1 thẻ H1 và 6 thẻ H2 mô tả rõ cấu trúc nội dung.',
        impact: 'Công cụ tìm kiếm hiểu đúng chủ đề trang, tăng khả năng hiển thị với truy vấn liên quan và cải thiện tỷ lệ nhấp.'
      },
      {
        criterion: 'trust',
        title: 'Thông tin doanh nghiệp và kênh liên hệ rõ ràng',
        evidence: 'Footer hiển thị tên công ty, mã số thuế, địa chỉ, hotline, email cùng liên kết Chính sách bảo mật và Điều khoản sử dụng.',
        impact: 'Giảm rào cản tin cậy ở bước ra quyết định, đặc biệt với khách hàng B2B lần đầu tiếp cận thương hiệu.'
      },
      {
        criterion: 'marketing',
        title: 'Value proposition và social proof được trình bày cụ thể',
        evidence: 'Trang nêu cam kết "Giảm 30% thời gian vận hành trong 30 ngày", có 4 CTA và 6 testimonial kèm số liệu 1.200+ doanh nghiệp.',
        impact: 'Người dùng hiểu ngay lợi ích cốt lõi và có thêm bằng chứng xã hội để tiếp tục hành trình chuyển đổi.'
      }
    ],
    improvements: [
      {
        criterion: 'performance',
        severity: 'high',
        title: 'LCP vượt ngưỡng khuyến nghị do tài nguyên hình ảnh nặng',
        evidence: 'LCP đo được 4,2 giây; tổng dung lượng trang khoảng 3.800 KB, trong đó ảnh chiếm 1.960 KB và chưa dùng định dạng WebP/AVIF.',
        consequence: 'Người dùng mobile phải chờ lâu trước khi thấy nội dung chính, làm tăng tỷ lệ thoát trang và kéo giảm hiệu quả SEO.',
        solution: 'Nén và chuyển ảnh hero sang WebP/AVIF, khai báo width/height, thêm fetchpriority="high" cho ảnh LCP và trì hoãn ảnh dưới màn hình đầu; đặt mục tiêu LCP dưới 2,5 giây.'
      },
      {
        criterion: 'security',
        severity: 'high',
        title: 'Thiếu các header bảo mật quan trọng và chính sách cookie',
        evidence: 'Trang dùng HTTPS với chứng chỉ hợp lệ nhưng không có HSTS, Content-Security-Policy, X-Frame-Options; chưa có cookie consent banner.',
        consequence: 'Tăng rủi ro tấn công chèn nội dung, clickjacking và vi phạm yêu cầu minh bạch dữ liệu khi thu thập thông tin người dùng.',
        solution: 'Bật HSTS, CSP và X-Frame-Options ở tầng máy chủ; bổ sung cookie consent banner kèm mô tả mục đích xử lý dữ liệu và liên kết chính sách bảo mật.'
      },
      {
        criterion: 'responsive',
        severity: 'medium',
        title: 'Tràn ngang và vùng chạm nhỏ trên màn hình 360px',
        evidence: 'Ở viewport 360x800, trang xuất hiện cuộn ngang; có 5 vùng chạm nhỏ hơn 44x44px và 1 trong 2 biểu mẫu thiếu label hiển thị.',
        consequence: 'Trải nghiệm mobile bị gián đoạn, người dùng khó thao tác chính xác và có thể rời trang trước khi hoàn thành biểu mẫu.',
        solution: 'Rà soát các khối có min-width cố định, dùng overflow-x: hidden đúng phạm vi, tăng vùng chạm tối thiểu 44x44px và bổ sung label hiển thị cho toàn bộ trường nhập.'
      }
    ],
    summary: 'Ưu tiên xử lý Performance trước vì LCP 4,2 giây đang ảnh hưởng trực tiếp đến cả trải nghiệm mobile lẫn SEO, trong khi chi phí tối ưu ảnh thường thấp và cho kết quả nhanh. Song song đó, bổ sung các header bảo mật cơ bản và cookie consent để giảm rủi ro pháp lý lẫn kỹ thuật. Nhóm Responsive nên gộp chung vào một vòng sửa giao diện mobile để tránh phải kiểm thử lại nhiều lần. Sau khi hoàn tất ba việc trên, hãy đo lại LCP, INP, CLS và chạy kiểm thử trên viewport 360px trước khi xuất báo cáo cho khách hàng.',
    limitations: [
      'Chưa có dữ liệu hành vi người dùng thực tế (analytics, heatmap, session replay) để đánh giá UX chuyên sâu.',
      'Không có thông tin về quy trình xử lý dữ liệu cá nhân và thỏa thuận xử lý dữ liệu để kết luận đầy đủ về Security.',
      'Chưa có dữ liệu A/B test hoặc phễu chuyển đổi để đánh giá hiệu quả Marketing sau tương tác.'
    ],
    meta: { demo: true, model: 'demo' }
  }
};
