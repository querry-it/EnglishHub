import { video, reading, quiz, assignment, chapter } from './builders';

// KHÓA 4: GIAO TIẾP THỰC CHIẾN & CÔNG SỞ — Giảng viên Le Hoang Nam
export const dailyCommunication = {
  id: 'course-daily-1',
  title: 'Tiếng Anh Giao Tiếp Thực Chiến & Kỹ Năng Đàm Phán Công Sở',
  category: 'GIAO TIẾP',
  gradingCategory: 'GIAOTIEP',
  level: 'All Levels',
  instructor: 'Le Hoang Nam',
  instructorEmail: 'lehoangnam@englishhub.edu.vn',
  instructorTitle: 'Giảng viên Giao tiếp Quốc tế & Thạc sĩ TESOL',
  description:
    'Luyện phản xạ giao tiếp tự nhiên như người bản xứ, kỹ năng Small Talk, thuyết trình họp nhóm và viết email thương mại chuẩn mực.',
  modules: [
    // ───────────────────────── CHƯƠNG 1 ─────────────────────────
    chapter('daily-m1', 'Phản xạ Small Talk tự nhiên & Giao lưu văn hóa công sở',
      'Cách bắt đầu một cuộc trò chuyện hấp dẫn trong thang máy, tiệc chào mừng và trước giờ họp với đồng nghiệp nước ngoài.', [
      video('daily-m1-l1', 'Bắt đầu cuộc trò chuyện (Icebreakers) và duy trì sự hào hứng', '22 phút', 'henIVlCPVIY', {
        overview: 'Các chủ đề an toàn: Thời tiết, kỳ nghỉ cuối tuần, các sự kiện thể thao và cách đặt câu hỏi mở (Open-ended questions).',
        keyPoints: [
          'Tránh các chủ đề nhạy cảm: Lương thưởng, tuổi tác, tôn giáo, quan điểm chính trị.',
          'Nguyên tắc 3 bước: Quan sát (Comment) -> Chia sẻ ngắn (Share) -> Đặt câu hỏi mở (Ask).',
          'Dùng các câu đệm tự nhiên: "How was your weekend?", "Have you tried that new cafe nearby?"'
        ]
      }),
      video('daily-m1-l2', 'Luyện 30 phút giao tiếp phản xạ thực tế (A2 - B2)', '25 phút', 'v07kPyPkLYw', {
        overview: 'Hội thoại người bản xứ về đời sống thường ngày, nối âm và ngữ điệu biểu cảm.',
      }),
      reading('daily-m1-l3', 'Nghệ thuật khen ngợi và đáp lại lời khen trong văn hóa phương Tây', '20 phút', {
        overview: 'Người bản xứ đánh giá cao sự chân thành khi khen ngợi trang phục, công việc hoặc ý tưởng của người khác.',
        sections: [
          {
            heading: '1. Khen ngợi diện mạo / phong cách',
            examples: [
              ['That color looks great on you! — Thank you, that\'s very kind of you.', 'Màu áo đó rất hợp với bạn! — Cảm ơn bạn, bạn thật tử tế.']
            ]
          },
          {
            heading: '2. Khen ngợi phần thuyết trình hoặc công việc',
            examples: [
              ['Impressive presentation earlier, Mark! — I appreciate the feedback. It was a team effort.', 'Bài thuyết trình lúc nãy rất ấn tượng, Mark! — Cảm ơn phản hồi của bạn. Đó là công sức của cả nhóm.']
            ]
          }
        ]
      }),
      quiz('daily-m1-l4', 'Kiểm tra: Quy tắc ứng xử Small Talk', '10 phút', [
        ['Chủ đề nào dưới đây là PHÙ HỢP trong cuộc trò chuyện Small Talk với đồng nghiệp mới gặp?', ['Mức lương hàng tháng của họ', 'Kế hoạch kỳ nghỉ cuối tuần', 'Quan điểm chính trị cá nhân', 'Lịch sử bệnh lý gia đình'], 1, 'Kế hoạch cuối tuần là chủ đề nhẹ nhàng, thân thiện và an toàn nhất.'],
        ['Khi ai đó khen: "Your presentation was amazing!", câu đáp lại lịch thiệp nhất là:', ['Yes, of course, I am very smart.', 'Thank you, I really appreciate your feedback.', 'No, it was terrible.', 'Why do you care?'], 1, 'Thể hiện sự cảm kích và khiêm tốn là văn hóa giao tiếp chuẩn mực.']
      ]),
      assignment('daily-m1-l5', 'Bài tập Chương 1: Kịch bản Small Talk tình huống giao lưu (Nộp Giảng viên)', '30 phút', {
        assignmentType: 'Roleplay Dialogue',
        minWords: 120,
        prompt: 'Tình huống: Bạn vừa gặp một chuyên gia nước ngoài (Mr. David Evans) tại quầy cà phê trong giờ giải lao của một hội thảo quốc tế. Hãy viết một đoạn hội thoại 2 người (khoảng 120 - 150 từ):\n1. Lời chào và mở đầu câu chuyện bằng một câu bình luận về hội thảo.\n2. Tự giới thiệu bản thân và hỏi thăm về lĩnh vực chuyên môn của ông ấy.\n3. Kết thúc câu chuyện lịch thiệp và trao đổi danh thiếp.\n\nThầy Le Hoang Nam sẽ chấm điểm độ tự nhiên và chỉnh sửa phát âm/từ vựng giao tiếp cho bạn.',
        requirements: [
          'Đoạn thoại có ít nhất 6 lượt trao đổi qua lại.',
          'Sử dụng các từ nối tự nhiên (By the way, Actually, As a matter of fact).',
          'Văn phong lịch sự, ấm áp.'
        ]
      })
    ]),

    // ───────────────────────── CHƯƠNG 2 ─────────────────────────
    chapter('daily-m2', 'Kỹ năng Viết Email thương mại & Thuyết trình cuộc họp',
      'Soạn thảo email xin phép, báo cáo tiến độ, giải quyết khiếu nại và kỹ thuật bày tỏ ý kiến trong cuộc họp nhóm.', [
      video('daily-m2-l1', 'Cấu trúc Email tiếng Anh chuyên nghiệp từ A - Z', '25 phút', 'adN2Pi1wwtw', {
        overview: 'Lời chào trang trọng, cách dẫn dắt lý do viết thư, các mẫu câu yêu cầu khéo léo và câu kết thư chuyên nghiệp.',
        keyPoints: [
          'Tiêu đề (Subject Line): Ngắn gọn, có mục đích rõ ràng (Ví dụ: "Request for Budget Approval - Q3").',
          'Mở đầu: "I am writing to inquire about...", "Further to our meeting yesterday...".',
          'Yêu cầu: Dùng "Could you please...", "I would appreciate it if you could...".',
          'Kết thư: "Best regards,", "Sincerely,".'
        ]
      }),
      video('daily-m2-l2', 'Tham gia cuộc họp tiếng Anh công sở: Cách bày tỏ quan điểm', '28 phút', 'sPiWBXxnvpc', {
        overview: 'Cách đồng thuận, bất đồng khéo léo và ngắt lời lịch thiệp: "Pardon the interruption, but may I add something here?".',
      }),
      reading('daily-m2-l3', 'Bộ 50 mẫu câu thông dụng nhất trong cuộc họp quốc tế', '25 phút', {
        overview: 'Tổng hợp các mẫu câu dẫn dắt, giải thích và tổng kết biểu quyết.',
        sections: [
          {
            heading: '1. Đưa ra ý kiến và đề xuất',
            bullets: [
              'From my perspective, we should focus on...',
              'I would recommend looking into...',
              'How about we test this in a small pilot group?'
            ]
          },
          {
            heading: '2. Bất đồng quan điểm một cách khéo léo (Diplomatic disagreement)',
            bullets: [
              'I see your point, but have we considered the cost?',
              'That is a valid observation; however, my concern is...',
              'I agree in principle, but the timeline might be unrealistic.'
            ]
          }
        ]
      }),
      quiz('daily-m2-l4', 'Kiểm tra: Email & Kỹ năng họp nhóm', '10 phút', [
        ['Cách mở đầu email trang trọng nào chuẩn nhất khi liên hệ với đối tác chưa quen?', ['Hey buddy, what\'s up?', 'Dear Mr. Henderson, I hope this email finds you well.', 'Hi there Henderson, listen up.', 'Yo Henderson!'], 1, '"Dear Mr. [Họ]" là lời chào trang trọng chuẩn mực.'],
        ['Để ngắt lời ai đó một cách lịch sự trong cuộc họp, bạn nên nói:', ['Shut up and listen to me.', 'Excuse me for interrupting, but could I just add a quick point?', 'You are totally wrong.', 'Stop talking now.'], 1, 'Excuse me for interrupting... thể hiện sự tôn trọng người đang nói.']
      ]),
      assignment('daily-m2-l5', 'Bài tập Chương 2: Viết email đàm phán dời lịch họp dự án (Nộp Giảng viên)', '35 phút', {
        assignmentType: 'Business Email Writing',
        minWords: 130,
        prompt: 'Tình huống:\nBạn là Trưởng nhóm dự án (Project Manager). Bạn cần viết một email khoảng 130 - 160 từ gửi cho Giám đốc đối tác (Mr. Robert Vance):\n1. Trình bày lý do phải dời cuộc họp tiến độ dự án từ thứ Hai sang thứ Năm tuần tới lúc 10:00 sáng (do chuyến bay công tác đột xuất).\n2. Gửi trước bản tóm tắt tiến độ đính kèm để ông ấy xem qua.\n3. Thể hiện sự xin lỗi về sự bất tiện và đề nghị xác nhận lịch mới.\n\nThầy Le Hoang Nam sẽ sửa văn phong, ngữ pháp và chấm điểm theo tiêu chí giao tiếp công sở chuyên nghiệp.',
        requirements: [
          'Đầy đủ tiêu đề Subject Line chuyên nghiệp.',
          'Có lời xin lỗi chân thành nhưng không tự ti.',
          'Dùng ít nhất 3 cấu trúc email trang trọng đã học.'
        ]
      })
    ]),

    // ───────────────────────── CHƯƠNG 3 ─────────────────────────
    chapter('daily-m3', 'Đàm phán thương mại & Xử lý tình huống khủng hoảng',
      'Chiến lược thương lượng giá cả, điều khoản hợp đồng và cách ứng biến khi xảy ra sự cố với đối tác quốc tế.', [
      video('daily-m3-l1', 'Nghệ thuật đàm phán hợp đồng thương mại quốc tế', '30 phút', 'Wb6Oc1_SdJw', {
        overview: 'Nguyên tắc Win - Win, cách đưa ra đề xuất có điều kiện: "If you can increase the order volume, we might consider a 5% discount".',
        keyPoints: [
          'Không bao giờ nhượng bộ mà không đòi hỏi lại điều kiện đối ứng.',
          'Dùng ngôn từ mềm mỏng (Hedging language): might, possibly, open to discussion.',
          'Kỹ thuật trì hoãn để xin ý kiến ban giám đốc: "I will need to run this by our executive board".'
        ]
      }),
      reading('daily-m3-l2', 'Cẩm nang xử lý khiếu nại khách hàng theo mô hình L.A.S.T', '20 phút', {
        overview: 'Listen (Lắng nghe) -> Apologize (Xin lỗi chân thành) -> Solve (Giải quyết triệt để) -> Thank (Cảm ơn vì đã phản hồi).',
        sections: [
          {
            heading: 'Áp dụng mô hình L.A.S.T',
            body: 'Khi đối tác giận dữ, điều đầu tiên là công nhận cảm xúc của họ: "I completely understand your frustration and we take this matter very seriously". Không đổ lỗi cho nhân viên cấp dưới hay đối tác vận chuyển.'
          }
        ]
      }),
      quiz('daily-m3-l3', 'Kiểm tra: Kỹ năng đàm phán & Xử lý khủng hoảng', '10 phút', [
        ['Trong đàm phán, câu nói: "If you increase the order by 20%, we can offer a 5% rebate" là ví dụ của:', ['Nhượng bộ một chiều', 'Đàm phán có điều kiện (Conditional bargaining)', 'Từ chối thẳng thừng', 'Bỏ cuộc'], 1, 'Đàm phán có điều kiện giúp bạn luôn bảo toàn lợi ích.'],
        ['Bước đầu tiên khi đối tác giận dữ phàn nàn về dịch vụ là:', ['Tranh cãi xem ai đúng ai sai', 'Lắng nghe và công nhận sự bức xúc của họ', 'Cúp điện thoại', 'Đổ lỗi cho đơn vị giao hàng'], 1, 'Lắng nghe và thấu hiểu là bước quyết định hạ nhiệt căng thẳng.']
      ]),
      assignment('daily-m3-l4', 'Bài tập cuối khóa: Bức thư thương lượng hợp đồng & Xử lý sự cố (Nộp Giảng viên)', '45 phút', {
        assignmentType: 'Negotiation Case Study',
        minWords: 160,
        prompt: 'Tình huống đàm phán thực tế:\nĐối tác của bạn (Global Logistics Corp) yêu cầu tăng phí vận chuyển lên 15% trong quý tới do biến động nhiên liệu. Hãy viết một bức thư đàm phán 160 - 200 từ gửi cho Trưởng bộ phận kinh doanh của họ:\n1. Công nhận khó khăn về chi phí nhiên liệu hiện nay.\n2. Giải thích rằng mức tăng 15% vượt quá ngân sách đã được phê duyệt của công ty bạn.\n3. Đề xuất phương án thỏa hiệp: Chấp nhận mức tăng tối đa 6% nếu họ cam kết giữ nguyên đơn giá này trong 12 tháng tiếp theo.\n4. Đề nghị một buổi gặp trực tiếp hoặc cuộc gọi Zoom để chốt điều khoản.\n\nThầy Le Hoang Nam sẽ chấm điểm nghệ thuật thương lượng, văn phong thuyết phục và phong thái đàm phán chuẩn quốc tế.',
        requirements: [
          'Thể hiện rõ tinh thần hợp tác Win - Win.',
          'Sử dụng ngôn ngữ đàm phán mềm mỏng (Hedging phrases).',
          'Độ dài tối thiểu 160 từ.'
        ]
      })
    ])
  ]
};
