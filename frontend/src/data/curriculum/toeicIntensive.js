import { video, reading, quiz, assignment, chapter } from './builders';

// KHÓA 3: TOEIC 750+ COMPREHENSIVE — Giảng viên Tran Thi Bich
export const toeicIntensive = {
  id: 'course-toeic-1',
  title: 'TOEIC 750+ Intensive Listening & Reading Comprehensive',
  category: 'TOEIC',
  gradingCategory: 'TOEIC',
  level: 'Intermediate (B1 - B2)',
  instructor: 'Tran Thi Bich',
  instructorEmail: 'tranthibich@englishhub.edu.vn',
  instructorTitle: 'ThS. Giảng viên TOEIC Master (TOEIC 990)',
  description:
    'Lộ trình 5 chương chuyên sâu toàn diện 7 phần thi TOEIC, bẫy âm thanh Listening và chiến thuật đọc lướt Part 7 đạt 750+ điểm.',
  modules: [
    // ───────────────────────── CHƯƠNG 1 ─────────────────────────
    chapter('toeic-m1', 'Listening Part 1 & 2 — Bắt gọn bẫy âm thanh & Câu trả lời gián tiếp',
      'Làm chủ 6 bức tranh Part 1 và 25 câu hỏi phản xạ nhanh Part 2, giải mã bẫy đồng âm và câu trả lời bất quy tắc.', [
      video('toeic-m1-l1', 'Part 1: 150 động từ miêu tả hành động người & vị trí đồ vật', '24 phút', 'ktlPP4hduQQ', {
        overview: 'Phân tích các bức tranh tả người, tranh tả cảnh tĩnh và phân biệt "is being done" vs "has been done".',
        keyPoints: [
          'Nếu trong tranh KHÔNG có người, loại ngay các đáp án có "being" (trừ "being displayed").',
          'Động từ hành động tay chân: holding, reaching, adjusting, examining.',
          'Vị trí đồ vật: arranged in a row, stacked on top of each other, overlooking the river.'
        ]
      }),
      video('toeic-m1-l2', 'Part 2: Chiến lược câu trả lời gián tiếp & Bẫy đồng âm (Similar Sound)', '26 phút', '7_BufVhGKcQ', {
        overview: 'Bí kíp loại trừ phương án lừa lặp từ và cách xử lý các câu trả lời thông minh không trực tiếp Yes/No.',
        keyPoints: [
          'Bẫy lặp âm: Đề bài nói "coffee", đáp án có "copy" -> 95% là bẫy.',
          'Câu trả lời gián tiếp ăn điểm: "Have they announced the winner yet?" -> "I was out of the office all morning".'
        ]
      }),
      reading('toeic-m1-l3', 'Bộ 100 câu hỏi - đáp Part 2 cạm bẫy kèm giải nghĩa chi tiết', '25 phút', {
        overview: 'Tổng hợp các mẫu câu hỏi Wh-, câu hỏi Yes/No, câu hỏi đuôi và câu đề nghị hay xuất hiện nhất.',
        sections: [
          {
            heading: '1. Câu hỏi người phụ trách (Who...)',
            examples: [
              ['Who is in charge of organizing the annual convention? — Ms. Peterson volunteered.', 'Ai phụ trách tổ chức hội nghị thường niên? — Cô Peterson đã xung phong.']
            ]
          },
          {
            heading: '2. Câu trả lời dạng chuyển giao trách nhiệm',
            body: 'Người trả lời không trực tiếp giải quyết mà chỉ sang người khác hoặc tài liệu:',
            examples: [
              ['When will the shipment arrive? — Check the tracking email.', 'Khi nào lô hàng đến? — Hãy kiểm tra email theo dõi.']
            ]
          }
        ]
      }),
      quiz('toeic-m1-l4', 'Kiểm tra: Bẫy âm thanh Part 1 & Part 2', '12 phút', [
        ['Trong Part 1, nếu bức tranh không có người, đáp án nào thường là sai?', ['The cars are parked outside.', 'The road is being paved.', 'The door is wide open.', 'Trees surround the building.'], 1, '"is being paved" ám chỉ có người đang thi công lát đường.'],
        ['Khi nghe câu hỏi Part 2 có từ "project" và một phương án có từ "protect", bạn nên:', ['Chọn ngay vì phát âm gần giống', 'Loại trừ vì đây là bẫy đồng âm (Similar Sound trap)', 'Dịch nghĩa cả hai từ xem có liên quan', 'Không làm gì'], 1, 'Bẫy lặp từ hoặc từ đồng âm là bẫy kinh điển trong Part 2.']
      ]),
      assignment('toeic-m1-l5', 'Bài tập Chương 1: Kịch bản phân tích bẫy nghe Part 2 (Nộp Giảng viên)', '30 phút', {
        assignmentType: 'Listening Analysis',
        minWords: 100,
        prompt: 'Hãy chọn 5 câu hỏi khó trong đề thi Part 2 (bao gồm câu hỏi Who, When, Why, Đề nghị và Câu hỏi gián tiếp). Với mỗi câu, hãy viết rõ: (1) Câu hỏi tiếng Anh, (2) Đáp án đúng gián tiếp, (3) Phương án bẫy đồng âm, và (4) Giải thích ngắn gọn bằng tiếng Anh vì sao học viên hay nhầm lẫn.',
        requirements: [
          'Trình bày đủ 5 tình huống hỏi đáp công sở.',
          'Chỉ rõ bẫy âm thanh trong phương án sai.',
          'Giảng viên Tran Thi Bich sẽ chữa chi tiết và chỉ ra lỗ hổng phản xạ.'
        ]
      })
    ]),

    // ───────────────────────── CHƯƠNG 2 ─────────────────────────
    chapter('toeic-m2', 'Listening Part 3 & 4 — Skimming 3 câu hỏi trong 8 giây & Bắt Keywords',
      'Phương pháp vừa nghe vừa đánh dấu đáp án, nắm bắt bối cảnh văn phòng, thông báo sân bay và hội thoại bán hàng.', [
      video('toeic-m2-l1', 'Part 3: Kỹ năng đọc trước câu hỏi & Bắt mạch hội thoại', '28 phút', 'ESECy3T0YaE', {
        overview: 'Cách tận dụng 8 giây giữa các đoạn băng để nắm trọn thông tin: Ai đang nói, ở đâu và người nam/nữ sẽ làm gì tiếp theo.',
        keyPoints: [
          'Câu hỏi 1: Mục đích chính / Nghề nghiệp (thường ở 1-2 câu đầu).',
          'Câu hỏi 2: Chi tiết vấn đề / Trở ngại (thường ở giữa đoạn thoại).',
          'Câu hỏi 3: Hành động tiếp theo (thường ở câu cuối: "I will call...", "Why don\'t you...").'
        ]
      }),
      video('toeic-m2-l2', 'Part 4: Độc thoại công sở — Thông báo, Quảng cáo & Tin nhắn thoại', '25 phút', '0D-vG9oiOvg', {
        overview: 'Nhận diện các dạng bài độc thoại đặc thù: Thông báo hoãn chuyến, quảng cáo khuyến mãi, hướng dẫn tham quan.',
      }),
      reading('toeic-m2-l3', 'Bộ từ vựng ngữ cảnh công sở Part 3 & 4', '22 phút', {
        overview: 'Hơn 60 từ vựng môi trường doanh nghiệp thường xuyên xuất hiện trong audio đề thi thật.',
        sections: [
          {
            heading: '1. Phòng ban & Chức danh',
            bullets: [
              'Human Resources (HR) Department — Phòng Nhân sự',
              'Maintenance Department — Bộ phận Bảo trì',
              'Board of Directors — Hội đồng quản trị'
            ]
          },
          {
            heading: '2. Tình huống phát sinh & Khắc phục',
            bullets: [
              'equipment malfunction — thiết bị gặp trục trặc',
              'reschedule an appointment — đổi lịch hẹn',
              'expedite shipping — đẩy nhanh tốc độ vận chuyển'
            ]
          }
        ]
      }),
      quiz('toeic-m2-l4', 'Kiểm tra: Kỹ năng Listening Part 3 & 4', '15 phút', [
        ['Câu hỏi "What will the man probably do next?" thường được trả lời ở:', ['Câu đầu tiên của đoạn băng', 'Giữa đoạn thoại', 'Những câu cuối cùng của đoạn thoại', 'Không có trong bài nghe'], 2, 'Hành động tiếp theo luôn xuất hiện ở phần kết thúc đoạn trò chuyện.'],
        ['Từ "malfunction" đồng nghĩa với:', ['Breakdown/Failure', 'Improvement', 'Celebration', 'Promotion'], 0, 'Malfunction = hỏng hóc, trục trặc kỹ thuật.']
      ]),
      assignment('toeic-m2-l5', 'Bài tập Chương 2: Tổng hợp từ vựng & Giải đề Part 3-4 (Nộp Giảng viên)', '35 phút', {
        assignmentType: 'Part 3-4 Vocabulary Drill',
        minWords: 120,
        prompt: 'Viết một đoạn văn tóm tắt lại 2 tình huống độc thoại công sở (Part 4) mà bạn đã nghe: (1) Một thông báo hoãn chuyến bay tại sân bay, (2) Một tin nhắn thoại dời lịch họp khách hàng. Hãy sử dụng ít nhất 6 từ vựng học thuật doanh nghiệp đã học trong chương.',
        requirements: [
          'Mô tả đầy đủ bối cảnh, lý do sự cố và giải pháp đưa ra.',
          'Gạch chân các từ vựng doanh nghiệp đã sử dụng.',
          'Cô Tran Thi Bich sẽ chấm điểm dùng từ và độ tự nhiên trong văn phong thương mại.'
        ]
      })
    ]),

    // ───────────────────────── CHƯƠNG 3 ─────────────────────────
    chapter('toeic-m3', 'Reading Part 5 — Ngữ pháp siêu tốc 10s & Phân loại câu hỏi',
      'Nhìn 4 đáp án phân biệt ngay câu hỏi từ loại vs câu hỏi ngữ nghĩa, các thì và dạng động từ hay gặp nhất.', [
      video('toeic-m3-l1', 'Part 5: Phân biệt dạng câu hỏi trong 5 giây đầu tiên', '26 phút', 'iHDQHtnf9JY', {
        overview: 'Cách nhìn đuôi 4 phương án để nhận biết câu hỏi cấu trúc ngữ pháp (Từ loại, đại từ, liên từ) mà không cần dịch câu.',
        keyPoints: [
          'Nếu 4 đáp án cùng gốc từ (care, careful, carefully, caring) -> Câu hỏi từ loại: Xét vị trí ngữ pháp trước & sau chỗ trống.',
          'Nếu 4 đáp án là các từ vựng khác nhau -> Câu hỏi ngữ nghĩa: Cần dịch các từ khóa then chốt.'
        ]
      }),
      video('toeic-m3-l2', 'Part 5: Xử lý câu hỏi Từ vựng & Collocation ETS', '28 phút', '4QnqpWLT5m4', {
        overview: 'Các cụm từ đi liền với nhau trong đề thi TOEIC: "conduct a survey", "meet the deadline", "strictly confidential".',
      }),
      reading('toeic-m3-l3', 'Quy tắc vàng chọn nhanh Từ loại (N, V, Adj, Adv)', '25 phút', {
        overview: 'Bí kíp xác định chính xác chỗ trống cần Danh từ, Tính từ hay Trạng từ.',
        sections: [
          {
            heading: '1. Vị trí của Trạng từ (Adverb)',
            bullets: [
              'Đứng giữa Trợ động từ và Động từ chính: have + [Adv] + V3/ed.',
              'Đứng giữa To be và Tính từ: be + [Adv] + Adj.',
              'Đứng đầu câu bổ nghĩa cho cả câu: [Adv], S + V + O.'
            ],
            examples: [
              ['The committee has [unanimously] approved the proposal.', 'Ủy ban đã nhất trí thông qua đề xuất.']
            ]
          },
          {
            heading: '2. Các đuôi từ loại thông dụng',
            bullets: [
              'Đuôi Danh từ: -tion, -sion, -ment, -ance, -ence, -ity, -ness.',
              'Đuôi Tính từ: -ful, -less, -ive, -ous, -able, -al, -ic.'
            ]
          }
        ]
      }),
      quiz('toeic-m3-l4', 'Kiểm tra: Ngữ pháp Part 5 thần tốc', '15 phút', [
        ['"Mr. Harrison has worked ___ with our overseas partners." — Chỗ trống cần:', ['close', 'closely', 'closeness', 'closer'], 1, 'Bổ nghĩa cho động từ "worked" cần một trạng từ: closely.'],
        ['Collocation nào đúng với "survey"?', ['Make a survey', 'Conduct a survey', 'Do a survey', 'Build a survey'], 1, 'Conduct a survey = tiến hành khảo sát.']
      ]),
      assignment('toeic-m3-l5', 'Bài tập Chương 3: Phân tích lỗi ngữ pháp 8 câu công sở (Nộp Giảng viên)', '35 phút', {
        assignmentType: 'Grammar Error Analysis',
        minWords: 150,
        prompt: 'Cho 5 câu văn công sở có lỗi sai ngữ pháp. Hãy chỉ ra vị trí sai, sửa lại thành câu hoàn chỉnh và giải thích ngắn gọn bằng tiếng Anh quy tắc ngữ pháp tương ứng:\n1. The new software enables employees completing reports much more faster.\n2. In spite of the manager was absent, the team finished the presentation on time.\n3. The committee has unanymous voted in favor of expanding the budget.\n4. Neither the director nor his assistants is available for the meeting.\n5. Customer satisfaction is high dependent on prompt after-sales service.',
        requirements: [
          'Chỉ ra chính xác từ sai và viết lại câu đúng.',
          'Giải thích quy tắc ngữ pháp rõ ràng.',
          'Giảng viên Tran Thi Bich sẽ nhận xét và cho điểm theo thang TOEIC.'
        ]
      })
    ]),

    // ───────────────────────── CHƯƠNG 4 ─────────────────────────
    chapter('toeic-m4', 'Reading Part 7 — Chiến thuật Đọc hiểu đoạn đơn & Đoạn đôi/ba',
      'Kỹ thuật quét thông tin nhanh không đọc từng chữ, phân tích email, hoá đơn, bài báo và xử lý câu hỏi suy luận.', [
      video('toeic-m4-l1', 'Bí kíp Max điểm TOEIC Reading Part 7', '30 phút', 'EP8ExxAT1rk', {
        overview: 'Cách phân bổ thời gian hợp lý cho 54 câu hỏi Part 7, thứ tự giải quyết các dạng đoạn văn.',
        keyPoints: [
          'Dành 50-55 phút cho Part 7.',
          'Đọc câu hỏi trước -> Khoanh vùng đoạn chứa thông tin -> Đọc đối chiếu.',
          'Dạng câu hỏi mục đích: "What is the purpose of this email?" -> Thường nằm ở 2 câu đầu tiên.'
        ]
      }),
      video('toeic-m4-l2', 'Chiến thuật xử lý đoạn đôi và đoạn ba (Double & Triple Passages)', '28 phút', 'fMWpfGet5-o', {
        overview: 'Kỹ thuật tìm thông tin liên kết giữa Đoạn 1 (Ví dụ: Email đặt hàng) và Đoạn 2 (Hóa đơn hoặc Chính sách đổi trả).',
      }),
      reading('toeic-m4-l3', 'Tổng hợp các mẫu văn bản thương mại thông dụng', '25 phút', {
        overview: 'Cách đọc nhanh các format: Memorandum (Thông báo nội bộ), Press Release (Thông cáo báo chí), Invoice (Hóa đơn).',
        sections: [
          {
            heading: '1. Cấu trúc một bản Memo',
            body: 'Gồm: TO (Gửi ai), FROM (Người gửi), DATE (Ngày), SUBJECT (Chủ đề). Luôn đọc Subject trước để nắm ngay 50% bối cảnh.'
          },
          {
            heading: '2. Các câu hỏi suy luận khó (Inference Questions)',
            body: 'Câu hỏi có dạng "What is implied about...?" hoặc "What is most likely true...?". Đáp án không bao giờ chép nguyên văn từ bài đọc mà luôn được diễn đạt lại bằng từ đồng nghĩa.'
          }
        ]
      }),
      quiz('toeic-m4-l4', 'Kiểm tra: Đọc hiểu văn bản Part 7', '15 phút', [
        ['Trong văn bản dạng Memorandum, thông tin quan trọng nhất cần đọc đầu tiên là:', ['Tên thư ký ghi chép', 'Dòng Subject (Chủ đề)', 'Số trang', 'Chữ ký cuối văn bản'], 1, 'Subject tóm tắt nội dung chính của toàn bộ thông báo.'],
        ['Trong câu hỏi đoạn đôi (Double passage), các câu hỏi cuối thường đòi hỏi:', ['Chỉ đọc đoạn 1', 'Kết hợp thông tin từ cả 2 đoạn văn', 'Không cần đọc đoạn nào', 'Tra từ điển'], 1, 'Câu hỏi liên kết (cross-referencing) yêu cầu tổng hợp dữ liệu từ cả 2 văn bản.']
      ]),
      assignment('toeic-m4-l5', 'Bài tập Chương 4: Đọc hiểu & Viết email phản hồi khách hàng (Nộp Giảng viên)', '40 phút', {
        assignmentType: 'Business Reading & Writing',
        minWords: 150,
        prompt: 'Đọc tình huống sau:\nKhách hàng (Ms. Jennifer Adams) gửi email phàn nàn về việc đơn hàng máy in văn phòng giao trễ 4 ngày và một kiện hàng bị rách hộp. \n\nHãy viết một email phản hồi chuyên nghiệp khoảng 150 từ thay mặt công ty: (1) Gửi lời xin lỗi chân thành, (2) Giải thích lý do do gián đoạn vận chuyển thời tiết, (3) Đưa ra giải pháp đền bù (gửi sản phẩm thay thế ngay trong 24h kèm voucher giảm giá 20% cho đơn sau).\n\nGiảng viên Tran Thi Bich sẽ chấm điểm theo tiêu chí giao tiếp thương mại và tính chuẩn xác ngữ pháp TOEIC.',
        requirements: [
          'Cấu trúc email thương mại chuẩn: Lời chào, lý do viết, giải pháp, lời kết lịch thiệp.',
          'Dùng từ ngữ lịch sự, mang tính giải quyết vấn đề.',
          'Độ dài tối thiểu 150 từ.'
        ]
      })
    ]),

    // ───────────────────────── CHƯƠNG 5 ─────────────────────────
    chapter('toeic-m5', 'Luyện giải Full Test TOEIC & Kỹ năng quản trị thời gian phòng thi',
      'Tổng kết toàn bộ 7 phần thi, áp dụng chiến thuật phân bổ 120 phút và tối ưu hóa từng câu hỏi đạt mốc 750+.', [
      video('toeic-m5-l1', 'Phân bổ 120 phút phòng thi: Bí quyết không bao giờ thiếu giờ tô đáp án', '25 phút', 'g9RVFRpm8QM', {
        overview: 'Phân tích chi tiết chiến lược làm bài: 45 phút Listening tô trực tiếp, 75 phút Reading chia 3 chặng nghiêm ngặt.',
        keyPoints: [
          'Chặng 1 (Part 5): 30 câu trong 12-15 phút.',
          'Chặng 2 (Part 6): 16 câu trong 8-10 phút.',
          'Chặng 3 (Part 7): 54 câu trong 50-55 phút.'
        ]
      }),
      reading('toeic-m5-l2', 'Cẩm nang 10 cạm bẫy tâm lý và thể lực trong phòng thi TOEIC', '20 phút', {
        overview: 'Cách giữ sự tập trung cao độ suốt 200 câu hỏi liên tục không bị mỏi mắt hay phân tâm.',
        sections: [
          {
            heading: 'Quy tắc "Bỏ qua ngay khi không nghe được"',
            body: 'Nếu lỡ một câu trong Part 2 hoặc Part 3, hãy chọn một đáp án theo trực giác và chuyển ngay mắt sang đọc câu tiếp theo. Nuối tiếc 1 câu sẽ làm hỏng cả chuỗi 3 câu sau đó.'
          }
        ]
      }),
      quiz('toeic-m5-l3', 'Kiểm tra: Chiến lược tổng thể phòng thi TOEIC', '10 phút', [
        ['Thời gian tối ưu cho 30 câu Part 5 là khoảng:', ['30 phút', '12 - 15 phút', '40 phút', '5 phút'], 1, 'Part 5 cần làm nhanh trong 12-15 phút để dành tối thiểu 50 phút cho Part 7.'],
        ['Nếu bỏ lỡ 1 câu trong bài nghe Part 3, bạn nên:', ['Dừng lại suy nghĩ cho đến khi nhớ ra', 'Tô nhanh 1 đáp án và đọc ngay 3 câu hỏi tiếp theo', 'Bỏ trống không tô', 'Hỏi giám thị'], 1, 'Không bao giờ để 1 câu lỡ làm ảnh hưởng đến các câu tiếp theo.']
      ]),
      assignment('toeic-m5-l4', 'Bài kiểm tra cuối kỳ: Full Test Mini & Bản kế hoạch thi (Nộp Giảng viên)', '45 phút', {
        assignmentType: 'Final Assessment & Strategy Plan',
        minWords: 150,
        prompt: 'Viết một bài tự đánh giá năng lực 150 từ trước kỳ thi TOEIC:\n1. Phần thi nào bạn tự tin nhất và phần nào bạn còn hay mất điểm nhất (Part 1, 2, 3, 4, 5, 6 hay 7)?\n2. Kế hoạch phân bổ thời gian cụ thể 75 phút cho bài thi Reading của bạn.\n3. Mục tiêu điểm số và cam kết ôn luyện trong 2 tuần cuối cùng.\n\nGiảng viên Tran Thi Bich sẽ đưa ra lời khuyên cá nhân hóa cho từng học viên.',
        requirements: [
          'Nêu rõ điểm mạnh, điểm yếu cụ thể.',
          'Kế hoạch thời gian thực tế theo từng phần.',
          'Viết hoàn toàn bằng tiếng Anh chuẩn mực.'
        ]
      })
    ])
  ]
};
