import { video, reading, quiz, assignment, chapter } from './builders';

// KHÓA 2: IELTS BỨT PHÁ BAND 6.0 - 6.5+ — Giảng viên Nguyen Van An
export const ieltsBreakthrough = {
  id: 'course-ielts-2',
  title: 'Khóa học IELTS Bứt phá Band 6.0 - 6.5+ Chuyên sâu',
  category: 'IELTS',
  gradingCategory: 'IELTS',
  level: 'Intermediate (B2)',
  instructor: 'Nguyen Van An',
  instructorEmail: 'nguyenvanan@englishhub.edu.vn',
  instructorTitle: 'ThS. Giảng viên IELTS Lead (IELTS 8.5)',
  description:
    'Chiến thuật nâng cao cho Reading Passage 3, bài mẫu Writing Task 1 & Task 2 band 7.5+, cùng phản xạ Speaking tự nhiên với giám khảo.',
  modules: [
    // ───────────────────────── CHƯƠNG 1 ─────────────────────────
    chapter('ielts2-m1', 'Listening Section 3 & 4 — Nhận diện Paraphrase & Diễn giả nói nhanh',
      'Làm chủ hội thoại học thuật 3 người, kỹ thuật bám sát Signposting Language trong bài giảng độc thoại Section 4.', [
      video('ielts2-m1-l1', 'Chiến thuật Section 3: Bắt kịp cuộc tranh luận học thuật 3 người', '24 phút', 'JeKiaAWQXcM', {
        overview: 'Cách nhận diện sự đồng thuận, bất đồng và chuyển hướng chủ đề giữa nhóm sinh viên và giảng viên hướng dẫn.',
        keyPoints: [
          'Phân biệt quan điểm cá nhân vs kết luận chung của nhóm.',
          'Chú ý các từ chuyển ý bất ngờ: however, on the other hand, actually.',
          'Gạch chân từ khóa câu hỏi để không bị phân tâm bởi các thông tin nhiễu.'
        ],
        vocabulary: [['academic debate', '/ˌækəˈdemɪk dɪˈbeɪt/', 'tranh luận học thuật'], ['consensus', '/kənˈsensəs/', 'sự đồng thuận']],
      }),
      video('ielts2-m1-l2', 'Section 4: Signposting Language trong bài giảng khoa học', '26 phút', '2r7kEF70Afs', {
        overview: 'Mẹo bám sát cấu trúc bài giảng để không bao giờ bị trượt câu hỏi khi diễn giả nói tốc độ cao.',
        keyPoints: [
          'Dấu hiệu mở đoạn: "Turning now to...", "Let us consider...".',
          'Dấu hiệu phân tích nguyên nhân - kết quả: "As a consequence...", "This stems from...".',
          'Chú ý số ít / số nhiều và loại từ cần điền.'
        ],
        resources: [{ name: 'Signposting_Language_Vocabulary.pdf', size: '2.8 MB' }]
      }),
      reading('ielts2-m1-l3', 'Bộ từ vựng Academic Band 7.0+ chuyên đề Science & Research', '25 phút', {
        overview: 'Hơn 50 từ vựng và cụm Collocations cao cấp xuất hiện liên tục trong Section 3 & 4.',
        sections: [
          {
            heading: '1. Phương pháp nghiên cứu khoa học',
            bullets: [
              'empirical evidence — bằng chứng thực nghiệm',
              'methodological flaw — lỗ hổng phương pháp luận',
              'statistically significant — có ý nghĩa thống kê',
              'corroborate findings — chứng thực các phát hiện'
            ],
            examples: [
              ['The hypothesis was corroborated by empirical evidence.', 'Giả thuyết đã được chứng thực bởi bằng chứng thực nghiệm.']
            ]
          },
          {
            heading: '2. Tác động và hậu quả xã hội',
            bullets: [
              'unprecedented challenges — những thách thức chưa từng có',
              'mitigate risks — giảm thiểu rủi ro',
              'detrimental impact — tác động tiêu cực, gây hại'
            ]
          }
        ]
      }),
      quiz('ielts2-m1-l4', 'Kiểm tra: Section 3 & 4 Listening Concepts', '15 phút', [
        ['"empirical evidence" mang nghĩa là:', ['Bằng chứng lý thuyết', 'Bằng chứng thực nghiệm', 'Ý kiến chuyên gia', 'Bằng chứng gián tiếp'], 1, 'Empirical evidence = bằng chứng thu được qua thí nghiệm/thực nghiệm.'],
        ['Khi nghe thấy "Turning now to...", diễn giả chuẩn bị:', ['Kết thúc bài giảng', 'Chuyển sang ý/phần tiếp theo', 'Lặp lại ý cũ', 'Đưa ra ví dụ phủ định'], 1, '"Turning now to" là cụm từ chuyển ý báo hiệu sang nội dung mới.'],
        ['Từ nào đồng nghĩa với "detrimental"?', ['Harmful', 'Beneficial', 'Neutral', 'Insignificant'], 0, 'Detrimental = gây hại, có tác động tiêu cực.']
      ]),
      assignment('ielts2-m1-l5', 'Bài tập Chương 1: Nghe chép chính tả & Phân tích Paraphrase Section 4', '35 phút', {
        assignmentType: 'Listening Dictation & Analysis',
        minWords: 120,
        prompt: 'Hãy nghe đoạn bài giảng khoa học (video 1.2) và chép lại 8 câu quan trọng nhất chứa cụm từ chuyển ý (signposting). Sau đó, viết 1 đoạn nhận xét 100 từ về cách paraphrase giữa câu hỏi trong đề và lời thoại của diễn giả.',
        requirements: [
          'Chép chính xác 8 câu chứa signposting markers.',
          'Phân tích ít nhất 3 cặp paraphrase xuất hiện trong bài.',
          'Viết nhận xét cá nhân về độ khó của bài nghe.'
        ]
      })
    ]),

    // ───────────────────────── CHƯƠNG 2 ─────────────────────────
    chapter('ielts2-m2', 'Reading Passage 3 — Matching Headings & Đọc hiểu Lập luận triết học/khoa học',
      'Chiến lược đối phó với Passage 3 dài 1000 từ, vượt qua bẫy suy luận và kỹ thuật nối tiêu đề đoạn văn.', [
      video('ielts2-m2-l1', 'Matching Headings: Kỹ thuật Reversed Reading', '28 phút', '-JZGqRchRKI', {
        overview: 'Phương pháp đọc ngược và phân tích bản chất đoạn văn để chọn tiêu đề chính xác mà không bị lừa bởi từ đồng nghĩa đơn lẻ.',
        keyPoints: [
          'Đọc Heading list trước và gạch chân yếu tố cốt lõi.',
          'Đoạn văn thường có cấu trúc: Topic sentence -> Supporting detail -> Concluding thought.',
          'Tránh bẫy chọn heading chỉ vì nó chứa một từ xuất hiện trong đoạn.'
        ]
      }),
      video('ielts2-m2-l2', 'Matching Headings: Best Tips & Practice Tasks', '22 phút', 'SXdMpskBDmA', {
        overview: 'Thực hành giải trực tiếp dạng bài Matching Headings với đề thi thực tế Cambridge IELTS.',
      }),
      reading('ielts2-m2-l3', 'Phân tích cấu trúc đoạn văn học thuật phức tạp', '25 phút', {
        overview: 'Hiểu rõ các cấu trúc văn phong lập luận của tác giả trong Passage 3.',
        sections: [
          {
            heading: '1. Cấu trúc Đối lập (Contrast/Counter-argument)',
            body: 'Tác giả nêu quan điểm đối nghịch trước, sau đó dùng các từ nối phản biện (Nonetheless, On the contrary) để khẳng định quan điểm thực sự của mình.',
            examples: [
              ['Critics argue that AI will destroy jobs. Nonetheless, historical records prove that innovation creates new industries.', 'Những người chỉ trích cho rằng AI sẽ triệt tiêu việc làm. Tuy nhiên, lịch sử chứng minh đổi mới tạo ra ngành nghề mới.']
            ]
          },
          {
            heading: '2. Cấu trúc Vấn đề - Giải pháp (Problem - Solution)',
            body: 'Đoạn văn mở đầu bằng khủng hoảng/khó khăn, phần thân đoạn đưa ra giải pháp kèm theo đánh giá tính khả thi.',
            tip: 'Nếu đoạn văn dành phần lớn nội dung cho phương án khắc phục, Heading thường chứa từ: Measures, Solutions, Remedies.'
          }
        ]
      }),
      quiz('ielts2-m2-l4', 'Kiểm tra: Matching Headings & Passage 3 Logic', '15 phút', [
        ['Một Heading đúng cho đoạn văn phải:', ['Chứa nhiều từ vựng khó nhất', 'Bao quát ý chính của toàn bộ đoạn', 'Chỉ nói về câu đầu tiên', 'Có chứa từ xuất hiện nhiều lần nhất'], 1, 'Heading là tiêu đề khái quát toàn bộ nội dung của đoạn.'],
        ['Từ "Nonetheless" có chức năng gì trong đoạn văn?', ['Nêu nguyên nhân', 'Bày tỏ sự phản biện/đối lập', 'Kết thúc vấn đề', 'Thêm thông tin phụ trợ'], 1, 'Nonetheless = tuy nhiên, dùng để phản biện.']
      ]),
      assignment('ielts2-m2-l5', 'Bài tập Chương 2: Phân tích lập luận & Paraphrase Passage 3', '40 phút', {
        assignmentType: 'Reading Analysis',
        minWords: 150,
        prompt: 'Đọc đoạn văn học thuật chủ đề "Artificial Intelligence in Modern Medicine". Hãy tóm tắt ý chính của đoạn văn (khoảng 150 từ), chỉ rõ câu chủ đề (topic sentence), câu phản biện và liệt kê 4 cặp từ đồng nghĩa/paraphrase được tác giả sử dụng.',
        requirements: [
          'Chỉ ra chính xác câu chủ đề và câu kết luận.',
          'Trình bày mạch lạc theo chuẩn phong cách học thuật.',
          'Nêu nhận định về tính thuyết phục của tác giả.'
        ]
      })
    ]),

    // ───────────────────────── CHƯƠNG 3 ─────────────────────────
    chapter('ielts2-m3', 'Writing Task 2 — Luận điểm thuyết phục & Coherence Band 7.0+',
      'Công thức P.E.E.L triển khai thân bài chặt chẽ, xử lý dạng bài Discuss Both Views và Opinion Essays.', [
      video('ielts2-m3-l1', 'Cấu trúc bài viết Band 9 Writing Task 2', '30 phút', 'w9tVmGia0_c', {
        overview: 'Hệ thống triển khai bài viết Writing Task 2 chuẩn giám khảo: Mở bài ấn tượng, 2 đoạn thân bài logic và kết bài dứt khoát.',
        keyPoints: [
          'Introduction: Paraphrase đề bài (1 câu) + Thesis statement (1 câu).',
          'Body Paragraph: Topic sentence -> Explanation -> Concrete Example -> Link back.',
          'Không dùng các ví dụ bịa đặt mang tính cá nhân ("My brother did...").'
        ],
        resources: [{ name: 'Band9_Essay_Templates.pdf', size: '3.4 MB' }]
      }),
      video('ielts2-m3-l2', 'Dạng bài Positive or Negative Development — Sample Band 9', '25 phút', 'Tcrx3eLnrG4', {
        overview: 'Phân tích chi tiết bài mẫu phân loại xu hướng phát triển tích cực hay tiêu cực.',
      }),
      video('ielts2-m3-l3', 'Dạng bài Advantages & Disadvantages — Sample Band 9', '24 phút', 'SWVs5NYLuP8', {
        overview: 'Cách phân bổ luận điểm khi lợi ích vượt trội hơn tác hại (Do advantages outweigh disadvantages?).',
      }),
      reading('ielts2-m3-l4', 'Từ nối logic (Cohesive Devices) và Tránh lỗi Overuse', '20 phút', {
        overview: 'Tiêu chí Coherence & Cohesion yêu cầu liên kết ý tự nhiên, không lạm dụng các từ nối sáo rỗng.',
        sections: [
          {
            heading: '1. Liên kết bằng Đại từ thay thế & Danh từ quy chiếu',
            body: 'Thay vì dùng "Furthermore", hãy liên kết bằng cụm danh từ tóm tắt: "This trend...", "Such measures...", "These advancements...".',
            examples: [
              ['Governments are investing heavily in renewable energy. Such initiatives not only curb emissions but also foster green jobs.', 'Chính phủ đang đầu tư mạnh vào năng lượng tái tạo. Những sáng kiến như vậy không chỉ giảm khí thải mà còn tạo việc làm xanh.']
            ]
          },
          {
            heading: '2. Các liên từ chỉ điều kiện & Nhượng bộ nâng cao',
            bullets: [
              'Albeit (/ɔːlˈbiːɪt/) — mặc dù (dùng trước tính từ/cụm từ)',
              'In light of the fact that — xét đến thực tế là',
              'Provided that — với điều kiện là'
            ]
          }
        ]
      }),
      quiz('ielts2-m3-l5', 'Kiểm tra: Cấu trúc & Tiêu chí Writing Task 2', '12 phút', [
        ['Công thức PEEL trong viết đoạn thân bài gồm:', ['Point, Explanation, Example, Link', 'Prompt, Essay, Edit, Learn', 'Paragraph, Evidence, Evaluation, Length', 'Plan, Execute, Explain, Link'], 0, 'PEEL là khung sườn chuẩn mực giúp đoạn văn đạt điểm cao Coherence & Cohesion.'],
        ['Độ dài tối thiểu của bài viết IELTS Writing Task 2 là:', ['150 từ', '200 từ', '250 từ', '300 từ'], 2, 'Task 2 yêu cầu tối thiểu 250 từ, thông thường nên viết từ 260-280 từ.'],
        ['Thesis statement nằm ở vị trí nào trong bài viết?', ['Cuối đoạn mở bài', 'Đầu đoạn thân bài 1', 'Giữa đoạn kết bài', 'Không bắt buộc có'], 0, 'Thesis statement luôn đặt ở cuối đoạn mở bài để định hình quan điểm của tác giả.']
      ]),
      assignment('ielts2-m3-l6', 'Bài kiểm tra Writing Task 2 — Education & Technology (Nộp Giảng viên chấm)', '45 phút', {
        assignmentType: 'Writing Task 2',
        minWords: 250,
        prompt: 'Đề bài Writing Task 2:\nSome people believe that technology has made learning easier and more engaging, while others argue that it creates distractions and weakens interpersonal skills.\nDiscuss both views and give your own opinion.\n\nViết một bài luận hoàn chỉnh tối thiểu 250 từ. Thầy Nguyen Van An sẽ trực tiếp chấm điểm theo 4 tiêu chí IELTS và đưa ra nhận xét chi tiết giúp bạn bứt phá Band 6.5+!',
        requirements: [
          'Đủ 4 đoạn văn: Introduction, Body 1, Body 2, Conclusion.',
          'Thesis statement nêu rõ lập trường của bạn.',
          'Mỗi đoạn thân bài áp dụng mô hình PEEL đầy đủ.',
          'Độ dài tối thiểu 250 từ.'
        ]
      })
    ]),

    // ───────────────────────── CHƯƠNG 4 ─────────────────────────
    chapter('ielts2-m4', 'Speaking Part 2 & 3 — Phản xạ tự nhiên & Kỹ thuật trả lời trừu tượng',
      'Làm chủ 2 phút nói Part 2 không ngắt ngứ và mở rộng câu trả lời Part 3 đa góc nhìn (Xã hội, Kinh tế, Đạo đức).', [
      video('ielts2-m4-l1', 'Bí mật Speaking Part 2: Tận dụng 1 phút chuẩn bị', '20 phút', 'rWBrbXrNHwk', {
        overview: 'Cách vẽ nhánh tư duy (Mindmap) để ghi chú từ vựng đắt giá thay vì viết cả câu văn.',
        keyPoints: [
          'Chia sơ đồ theo 4 câu hỏi phụ trên Cue Card: Who, When, What, Why.',
          'Ghi chú các tính từ mạnh (phenomenal, picturesque, exhilarating).',
          'Sử dụng câu chuyện cá nhân thật để nói giàu cảm xúc.'
        ]
      }),
      video('ielts2-m4-l2', 'Speaking Part 2: Miêu tả đồ vật/kỷ niệm đặc biệt (Band 8+)', '22 phút', 'yuuTVPCbasE', {
        overview: 'Phân tích ngữ điệu, nhịp dừng tự nhiên và cách đưa idioms vào bài nói hợp ngữ cảnh.',
      }),
      video('ielts2-m4-l3', 'Speaking Part 3: Mở rộng luận điểm đa chiều', '24 phút', 'ELxGmf9f_ZM', {
        overview: 'Công thức trả lời Part 3: Nhận định chung -> Phân tích hai mặt -> Đưa ra dự đoán tương lai.',
      }),
      reading('ielts2-m4-l4', 'Bộ Collocations & Idioms chuẩn tự nhiên cho Speaking', '20 phút', {
        overview: 'Tránh dùng các thành ngữ cổ điển sáo rỗng (như "rain cats and dogs"), thay bằng các cụm diễn đạt hiện đại.',
        sections: [
          {
            heading: '1. Cụm từ diễn tả cảm xúc & trải nghiệm',
            bullets: [
              'over the moon — vô cùng hạnh phúc',
              'a breath of fresh air — một làn gió mới, trải nghiệm mới mẻ',
              'put things into perspective — nhìn nhận mọi việc một cách khách quan'
            ]
          },
          {
            heading: '2. Cụm từ dùng trong Part 3 bàn về xu thế',
            bullets: [
              'a double-edged sword — con dao hai lưỡi',
              'pave the way for — mở đường cho sự phát triển',
              'strike a balance — đạt được sự cân bằng'
            ]
          }
        ]
      }),
      quiz('ielts2-m4-l5', 'Kiểm tra: Speaking Part 2 & 3 Strategy', '10 phút', [
        ['Trong Speaking Part 3, bạn nên nói về:', ['Kinh nghiệm của bản thân bạn', 'Vấn đề mang tính xã hội và cộng đồng', 'Chỉ trả lời Có hoặc Không', 'Kể một câu chuyện cổ tích'], 1, 'Part 3 là thảo luận các vấn đề trừu tượng mang tính xã hội, không nên giới hạn ở câu chuyện cá nhân.'],
        ['Cụm từ "a double-edged sword" mang nghĩa là:', ['Một giải pháp tối ưu', 'Con dao hai lưỡi (có cả lợi lẫn hại)', 'Một tình huống vô hại', 'Một bước thụt lùi'], 1, 'Double-edged sword = con dao hai lưỡi.']
      ]),
      assignment('ielts2-m4-l6', 'Bài kiểm tra Speaking Part 2 & 3: Kịch bản hoàn chỉnh (Nộp Giảng viên chấm)', '40 phút', {
        assignmentType: 'Speaking Full Script',
        minWords: 220,
        prompt: 'Soạn kịch bản nói hoàn chỉnh cho đề thi Speaking:\nPart 2: Describe a major technological change that has affected your daily life.\nPart 3: Do you think modern people are becoming overly reliant on automated machines? Why or why not?\n\nViết kịch bản chi tiết tối thiểu 220 từ thể hiện rõ từ vựng chuyên ngành công nghệ, các cấu trúc câu phức và liên từ tự nhiên. Thầy Nguyen Van An sẽ đánh giá theo 4 tiêu chí Speaking và sửa phát âm/ngữ điệu cho bạn.',
        requirements: [
          'Part 2 trả lời đầy đủ: Công nghệ gì, bạn bắt đầu dùng từ khi nào, lợi ích và cảm xúc của bạn.',
          'Part 3 có tối thiểu 2 luận điểm đối chiếu.',
          'Sử dụng ít nhất 4 cụm collocation nâng cao.'
        ]
      })
    ]),

    // ───────────────────────── CHƯƠNG 5 ─────────────────────────
    chapter('ielts2-m5', 'Writing Task 1 Nâng cao — Bản đồ (Map) & Quy trình (Process)',
      'Chinh phục 2 dạng bài khó nhất của Writing Task 1: Ngôn ngữ biến đổi địa lý và chuỗi các bước sản xuất.', [
      video('ielts2-m5-l1', 'Dạng Map Comparison: Miêu tả sự quy hoạch và chuyển đổi đô thị', '28 phút', 'Ft4Lduu83-0', {
        overview: 'Cách chia đoạn thân bài theo thời gian hoặc theo khu vực địa lý, từ vựng chỉ phương hướng và sự mở rộng.',
        keyPoints: [
          'Từ vựng xây dựng: erect, construct, demolish, knock down, replace.',
          'Từ vựng mở rộng: expand, enlarge, extend, widen.',
          'Vị trí phương hướng: in the north-east, to the south of, adjacent to.'
        ]
      }),
      video('ielts2-m5-l2', 'Dạng Process: Chu trình nhân tạo (Man-made) vs Chu trình tự nhiên (Natural)', '25 phút', 'qTabvHYRDp4', {
        overview: 'Bí kíp sử dụng câu bị động (Passive Voice) và các liên từ chỉ thứ tự các bước (First of all, Subsequently, Finally).',
      }),
      reading('ielts2-m5-l3', 'Bộ từ vựng chuẩn xác cho Map & Process', '20 phút', {
        overview: 'Tổng hợp bảng từ vựng ăn điểm Lexical Resource trong Task 1 phi biểu đồ số liệu.',
        sections: [
          {
            heading: '1. Biến đổi cảnh quan & Công trình',
            bullets: [
              'be converted into — được chuyển đổi công năng thành',
              'make way for — nhường chỗ cho',
              'undergo significant transformation — trải qua sự biến đổi lớn'
            ],
            examples: [
              ['The old warehouse was demolished to make way for a modern shopping mall.', 'Nhà kho cũ bị dỡ bỏ để nhường chỗ cho trung tâm thương mại hiện đại.']
            ]
          },
          {
            heading: '2. Các bước trong quy trình sản xuất',
            bullets: [
              'be harvested and sorted — được thu hoạch và phân loại',
              'be transported to a processing facility — được vận chuyển đến cơ sở xử lý',
              'undergo purification — trải qua quá trình tinh chế'
            ]
          }
        ]
      }),
      quiz('ielts2-m5-l4', 'Kiểm tra: Map & Process Strategy', '10 phút', [
        ['Trong dạng bài Process nhân tạo, thể ngữ pháp nào chiếm ưu thế?', ['Thể chủ động thì hiện tại', 'Thể bị động (Passive voice)', 'Thể tương lai đơn', 'Câu mệnh lệnh'], 1, 'Quy trình nhân tạo tập trung vào hành động tác động lên đối tượng → dùng thể bị động.'],
        ['Từ nào đồng nghĩa với "demolish"?', ['Construct', 'Knock down/tear down', 'Expand', 'Renovate'], 1, 'Demolish = phá dỡ, san phẳng.']
      ]),
      assignment('ielts2-m5-l5', 'Bài kiểm tra cuối khóa: Writing Task 1 Map Comparison (Nộp Giảng viên chấm)', '40 phút', {
        assignmentType: 'Writing Task 1 Map',
        minWords: 150,
        prompt: 'Đề bài Writing Task 1:\nThe maps below show the development of the coastal village of Belltown from 2000 to the present day.\n(Năm 2000: Làng chài nhỏ, nhiều cây cối, bến thuyền thủ công. Hiện nay: Khu nghỉ dưỡng hiện đại, khách sạn 5 sao, bến du thuyền, đường cao tốc).\n\nHãy viết bài báo cáo Task 1 hoàn chỉnh khoảng 150 - 180 từ miêu tả các biến đổi nổi bật. Thầy Nguyen Van An sẽ chấm điểm chi tiết 4 tiêu chí IELTS Task 1.',
        requirements: [
          'Overview nêu bật 2 xu hướng chuyển đổi lớn nhất.',
          'Sử dụng chính xác ít nhất 5 động từ mô tả quy hoạch đô thị.',
          'Sử dụng chính xác giới từ chỉ phương hướng (North, South, East, West).'
        ]
      })
    ])
  ]
};
