import { video, reading, quiz, assignment, chapter } from './builders';

// KHÓA 1: IELTS FOUNDATION 4.5+ — Giảng viên Nguyen Van An
export const ieltsFoundation = {
  id: 'course-ielts-1',
  title: 'Khóa học IELTS cho người mới bắt đầu (Foundation 4.5+)',
  category: 'IELTS',
  gradingCategory: 'IELTS',
  level: 'Beginner (A2 - B1)',
  instructor: 'Nguyen Van An',
  instructorEmail: 'nguyenvanan@englishhub.edu.vn',
  instructorTitle: 'ThS. Giảng viên IELTS Lead (IELTS 8.5)',
  description:
    'Xây nền tảng phát âm, ngữ pháp, 600 từ vựng học thuật và chiến thuật cơ bản cho cả 4 kỹ năng Nghe – Đọc – Viết – Nói.',
  modules: [
    // ───────────────────────── CHƯƠNG 1 ─────────────────────────
    chapter('ielts1-m1', 'Làm quen bài thi IELTS & Phát âm chuẩn IPA',
      'Hiểu cấu trúc bài thi, cách tính band điểm và luyện 44 âm IPA để nghe – nói chuẩn ngay từ đầu.', [
      video('ielts1-m1-l1', 'Cấu trúc bài thi IELTS Academic & cách tính Overall Band', '15 phút', '2r7kEF70Afs', {
        overview: 'Tổng quan 4 phần thi, thời gian từng phần, cách quy đổi số câu đúng sang band điểm và lộ trình 3 tháng lên 4.5+.',
        keyPoints: [
          'Listening 30 phút (40 câu) – Reading 60 phút (40 câu) – Writing 60 phút (2 task) – Speaking 11-14 phút.',
          'Overall Band = trung bình cộng 4 kỹ năng, làm tròn đến 0.5 gần nhất.',
          'Mục tiêu 4.5: Listening ~13/40, Reading ~15/40, Writing & Speaking band 4.5–5.0.',
          'Học đều mỗi ngày 60–90 phút hiệu quả hơn học dồn cuối tuần.',
        ],
        vocabulary: [['assessment', '/əˈsesmənt/', 'sự đánh giá'], ['band score', '/bænd skɔː/', 'thang điểm'], ['academic', '/ˌækəˈdemɪk/', 'học thuật']],
        resources: [{ name: 'Lo_trinh_IELTS_Foundation_12_tuan.pdf', size: '2.5 MB' }],
      }),
      video('ielts1-m1-l2', 'Nguyên âm đơn & đôi trong bảng IPA', '22 phút', '9E6F57s-V7U', {
        overview: 'Phân biệt nguyên âm ngắn – dài (/ɪ/ – /iː/, /ʊ/ – /uː/) và 8 nguyên âm đôi thường gặp.',
        keyPoints: [
          'ship /ʃɪp/ ≠ sheep /ʃiːp/ — độ dài nguyên âm thay đổi nghĩa của từ.',
          'Nguyên âm đôi /eɪ/ (day), /aɪ/ (time), /əʊ/ (go) cần lướt từ âm đầu sang âm sau.',
          'Âm /ə/ (schwa) là âm phổ biến nhất trong tiếng Anh, xuất hiện ở âm tiết không nhấn.',
        ],
        vocabulary: [['vowel', '/ˈvaʊəl/', 'nguyên âm'], ['diphthong', '/ˈdɪfθɒŋ/', 'nguyên âm đôi']],
        resources: [{ name: 'Bang_IPA_44_am_kem_vi_du.pdf', size: '3.1 MB' }],
      }),
      video('ielts1-m1-l3', 'Phụ âm khó với người Việt & âm cuối (ending sounds)', '18 phút', '34ryce0LZCU', {
        overview: 'Luyện /θ/ – /ð/, /ʃ/ – /ʒ/ và cách bật âm cuối /s/, /t/, /d/ để không bị mất điểm Pronunciation.',
        keyPoints: [
          'Người Việt hay bỏ âm cuối: "like" đọc thành "lai" → giám khảo khó hiểu.',
          'Đuôi -ed có 3 cách đọc: /t/ (worked), /d/ (played), /ɪd/ (wanted).',
          'Đuôi -s có 3 cách đọc: /s/ (books), /z/ (dogs), /ɪz/ (watches).',
        ],
        vocabulary: [['consonant', '/ˈkɒnsənənt/', 'phụ âm'], ['ending sound', '/ˈendɪŋ saʊnd/', 'âm cuối']],
      }),
      reading('ielts1-m1-l4', 'Quy tắc trọng âm từ & ngữ điệu câu', '20 phút', {
        overview: 'Bài đọc tổng hợp các quy tắc nhấn trọng âm giúp bạn nói tự nhiên và nghe nhận diện từ nhanh hơn.',
        sections: [
          {
            heading: '1. Vì sao trọng âm quan trọng?',
            body: 'Trong tiếng Anh, đặt sai trọng âm có thể khiến người nghe hiểu sai hoàn toàn từ bạn nói. Ví dụ "DEsert" (sa mạc) và "deSERT" (bỏ rơi). Trong IELTS Speaking, tiêu chí Pronunciation chiếm 25% điểm, và trọng âm là một phần lớn của tiêu chí này.',
          },
          {
            heading: '2. Quy tắc với từ 2 âm tiết',
            bullets: [
              'Danh từ và tính từ thường nhấn âm thứ nhất: STUdent, HAPpy, TAble.',
              'Động từ thường nhấn âm thứ hai: deCIDE, beGIN, preSENT (trình bày).',
              'Một từ vừa là danh từ vừa là động từ: REcord (n) – reCORD (v), PREsent (n) – preSENT (v).',
            ],
            examples: [['She will preSENT the PREsent.', 'Cô ấy sẽ trao món quà.'], ['They reCORD a new REcord.', 'Họ thu âm một đĩa nhạc mới.']],
          },
          {
            heading: '3. Đuôi từ quyết định trọng âm',
            bullets: [
              'Nhấn ngay trước đuôi -tion, -sion, -ic, -ical, -ity: eduCAtion, ecoNOmic, uniVERsity.',
              'Nhấn vào chính đuôi -ee, -eer, -ese, -ique: employEE, engiNEER, VietnamESE, uNIQUE.',
              'Đuôi -ful, -less, -ness, -ment không làm thay đổi trọng âm gốc: CAREful, HAPpiness, deVELopment.',
            ],
          },
          {
            heading: '4. Ngữ điệu câu (Intonation)',
            body: 'Câu hỏi Yes/No thường lên giọng ở cuối (↗), câu hỏi Wh- và câu trần thuật thường xuống giọng (↘). Khi liệt kê, lên giọng ở các mục đầu và xuống giọng ở mục cuối cùng.',
            examples: [['Do you like reading? ↗', 'Bạn có thích đọc sách không?'], ['I like reading, cooking ↗ and travelling. ↘', 'Tôi thích đọc sách, nấu ăn và du lịch.']],
            tip: 'Luyện tập bằng cách shadowing (nói đuổi) 5 phút mỗi ngày với audio Cambridge — bắt chước cả trọng âm lẫn ngữ điệu.',
          },
        ],
        resources: [{ name: 'Bai_tap_trong_am_200_tu.pdf', size: '1.4 MB' }],
      }),
      quiz('ielts1-m1-l5', 'Kiểm tra: Cấu trúc bài thi & Phát âm', '12 phút', [
        ['Phần thi Reading IELTS kéo dài bao lâu?', ['30 phút', '40 phút', '60 phút', '90 phút'], 2, 'Reading gồm 3 passage, 40 câu trong 60 phút, không có thời gian chép đáp án.'],
        ['Từ nào được nhấn trọng âm ở âm tiết thứ hai?', ['student', 'decide', 'table', 'happy'], 1, 'Động từ 2 âm tiết thường nhấn âm thứ hai: deCIDE.'],
        ['Đuôi -ed trong "wanted" được đọc là:', ['/t/', '/d/', '/ɪd/', 'Không đọc'], 2, 'Sau âm /t/ hoặc /d/, đuôi -ed đọc là /ɪd/.'],
        ['Trọng âm của "education" rơi vào âm tiết nào?', ['e-', '-du-', '-ca-', '-tion'], 2, 'Đuôi -tion: nhấn ngay âm tiết trước nó → eduCAtion.'],
        ['Câu hỏi Yes/No thường có ngữ điệu:', ['Xuống giọng ở cuối', 'Lên giọng ở cuối', 'Giữ nguyên', 'Lên ở đầu câu'], 1, 'Yes/No question → lên giọng ở cuối câu.'],
      ]),
      assignment('ielts1-m1-l6', 'Bài tập Chương 1: Giới thiệu bản thân & mục tiêu IELTS', '30 phút', {
        assignmentType: 'Writing – Giới thiệu bản thân',
        minWords: 120,
        prompt: 'Viết một đoạn văn 120–150 từ bằng tiếng Anh giới thiệu bản thân: tên, công việc/học tập, lý do bạn học IELTS, band điểm mục tiêu và kế hoạch học tập cụ thể trong 3 tháng tới.',
        requirements: [
          'Sử dụng ít nhất 1 câu thì hiện tại hoàn thành (I have studied…).',
          'Sử dụng ít nhất 3 từ vựng trong chương: assessment, academic, band score…',
          'Chia đoạn rõ ràng: mở đầu – thân bài – kết luận.',
        ],
      }),
    ]),

    // ───────────────────────── CHƯƠNG 2 ─────────────────────────
    chapter('ielts1-m2', 'Ngữ pháp cốt lõi & 600 từ vựng học thuật',
      'Nắm chắc các thì quan trọng, câu ghép – câu phức và bộ từ vựng chủ đề Education, Work, Environment.', [
      video('ielts1-m2-l1', 'Hiện tại hoàn thành vs Quá khứ đơn', '20 phút', 'vM5trdispow', {
        overview: 'Phân biệt hai thì dễ nhầm nhất và cách dùng chúng trong Writing Task 1 & Speaking.',
        keyPoints: [
          'Quá khứ đơn: hành động kết thúc, thời gian xác định (in 2010, last year, ago).',
          'Hiện tại hoàn thành: kéo dài đến hiện tại hoặc không rõ thời điểm (since, for, ever, already).',
          'Writing Task 1 có mốc thời gian quá khứ → dùng quá khứ đơn.',
        ],
        vocabulary: [['tense', '/tens/', 'thì'], ['duration', '/djuˈreɪʃn/', 'khoảng thời gian']],
      }),
      video('ielts1-m2-l2', 'Luyện tập: Present Perfect hay Past Simple?', '16 phút', 'T09u75kiKGc', {
        overview: 'Bài giảng thực hành với hàng loạt ví dụ đối chiếu giúp phản xạ chọn thì đúng.',
        keyPoints: ['"I have lived here for 5 years" (vẫn đang sống) ≠ "I lived there for 5 years" (đã chuyển đi).', 'Không dùng hiện tại hoàn thành với mốc thời gian cụ thể trong quá khứ.'],
      }),
      reading('ielts1-m2-l3', 'Câu ghép, câu phức & liên từ ăn điểm Grammar', '25 phút', {
        overview: 'Tiêu chí Grammatical Range yêu cầu bạn dùng đa dạng cấu trúc câu. Bài đọc này hướng dẫn 3 loại câu nâng điểm.',
        sections: [
          {
            heading: '1. Câu đơn, câu ghép, câu phức',
            body: 'Band 4–5 thường chỉ dùng câu đơn. Để đạt band 5.5+, bạn cần kết hợp linh hoạt câu ghép (compound) và câu phức (complex).',
            bullets: [
              'Câu ghép: nối 2 mệnh đề độc lập bằng FANBOYS (for, and, nor, but, or, yet, so).',
              'Câu phức: 1 mệnh đề chính + 1 mệnh đề phụ bắt đầu bằng because, although, when, if, which…',
            ],
            examples: [
              ['Technology is useful, but it can be addictive.', 'Công nghệ hữu ích, nhưng có thể gây nghiện.'],
              ['Although technology is useful, it can be addictive.', 'Mặc dù công nghệ hữu ích, nó có thể gây nghiện.'],
            ],
          },
          {
            heading: '2. Mệnh đề quan hệ (Relative clauses)',
            body: 'Dùng who (người), which (vật), where (nơi chốn), whose (sở hữu) để gộp 2 câu ngắn thành 1 câu dài, mạch lạc hơn.',
            examples: [['Hanoi, which is the capital of Vietnam, has a population of 8 million.', 'Hà Nội, thủ đô của Việt Nam, có dân số 8 triệu người.']],
          },
          {
            heading: '3. Câu điều kiện loại 1 và 2',
            bullets: [
              'Loại 1 (có thể xảy ra): If + hiện tại đơn, will + V.',
              'Loại 2 (giả định trái hiện tại): If + quá khứ đơn, would + V.',
            ],
            examples: [['If governments invest more in public transport, traffic will decrease.', 'Nếu chính phủ đầu tư thêm vào giao thông công cộng, ùn tắc sẽ giảm.']],
            tip: 'Mỗi đoạn Writing nên có ít nhất 1 câu phức. Đừng cố nhồi câu dài nếu chưa chắc ngữ pháp — câu đúng quan trọng hơn câu khó.',
          },
        ],
        resources: [{ name: 'Grammar_for_IELTS_Unit1-5.pdf', size: '4.2 MB' }],
      }),
      reading('ielts1-m2-l4', 'Từ vựng chủ đề Education & Work', '20 phút', {
        overview: 'Học 40 từ vựng và collocation xuất hiện nhiều nhất trong đề thi chủ đề Giáo dục và Công việc.',
        sections: [
          {
            heading: 'Chủ đề Education',
            bullets: [
              'acquire knowledge — tiếp thu kiến thức',
              'compulsory education — giáo dục bắt buộc',
              'tuition fees — học phí',
              'vocational training — đào tạo nghề',
              'academic performance — thành tích học tập',
            ],
            examples: [['Students should acquire practical skills alongside academic knowledge.', 'Học sinh nên tiếp thu kỹ năng thực tế song song với kiến thức học thuật.']],
          },
          {
            heading: 'Chủ đề Work',
            bullets: [
              'job satisfaction — sự hài lòng trong công việc',
              'work-life balance — cân bằng công việc và cuộc sống',
              'career prospects — triển vọng nghề nghiệp',
              'flexible working hours — giờ làm việc linh hoạt',
            ],
            tip: 'Học từ theo cụm (collocation), không học từ đơn lẻ. Ghi lại 1 câu ví dụ của chính bạn cho mỗi cụm từ.',
          },
        ],
        resources: [{ name: '600_Academic_Words_Flashcards.pdf', size: '5.0 MB' }],
      }),
      quiz('ielts1-m2-l5', 'Kiểm tra: Ngữ pháp & Từ vựng Chương 2', '15 phút', [
        ['"The number of students ___ steadily since 2020."', ['increased', 'has increased', 'increases', 'was increasing'], 1, '"since 2020" → hiện tại hoàn thành.'],
        ['"In 2015, the company ___ 200 employees."', ['has had', 'had', 'has', 'have had'], 1, 'Mốc thời gian quá khứ cụ thể → quá khứ đơn.'],
        ['Chọn liên từ đúng: "___ it was raining, we went out."', ['Because', 'Although', 'So', 'If'], 1, 'Hai mệnh đề đối lập → Although.'],
        ['Collocation đúng là:', ['make knowledge', 'acquire knowledge', 'do knowledge', 'take knowledge'], 1, 'acquire knowledge = tiếp thu kiến thức.'],
        ['"Hanoi, ___ is the capital, is crowded."', ['who', 'where', 'which', 'whose'], 2, 'Chỉ vật/địa danh làm chủ ngữ → which.'],
      ]),
      assignment('ielts1-m2-l6', 'Bài tập Chương 2: Viết 8 câu học thuật với cấu trúc nâng cao', '30 phút', {
        assignmentType: 'Grammar & Vocabulary',
        minWords: 100,
        prompt: 'Viết 8 câu hoàn chỉnh về chủ đề "Education" hoặc "Work". Mỗi câu phải dùng một cấu trúc khác nhau: (1) hiện tại hoàn thành, (2) quá khứ đơn, (3) câu ghép, (4) câu phức với although, (5) mệnh đề quan hệ which, (6) mệnh đề quan hệ who, (7) câu điều kiện loại 1, (8) câu điều kiện loại 2.',
        requirements: ['Đánh số từng câu và ghi chú cấu trúc đã dùng.', 'Dùng ít nhất 5 collocation trong bài đọc từ vựng.'],
      }),
    ]),

    // ───────────────────────── CHƯƠNG 3 ─────────────────────────
    chapter('ielts1-m3', 'Listening Foundation — Part 1 & 2',
      'Chiến thuật nghe điền form, bắt chính tả tên riêng – con số và xử lý bẫy thông tin bị sửa đổi.', [
      video('ielts1-m3-l1', 'Listening Part 1: Bắt tên riêng, con số & địa chỉ', '20 phút', 'JeKiaAWQXcM', {
        overview: 'Kỹ thuật làm Form Completion, phân biệt chữ cái dễ nhầm và các cặp số 13/30, 14/40.',
        keyPoints: [
          'Đọc trước câu hỏi trong 30 giây, gạch chân từ khóa và dự đoán loại từ cần điền.',
          'Cặp số dễ nhầm: thirTEEN (nhấn cuối) vs THIRty (nhấn đầu).',
          'Chú ý bẫy tự sửa: "It\'s 15... oh sorry, 50 pounds".',
        ],
        resources: [{ name: 'Listening_Part1_Numbers_Drill.pdf', size: '2.1 MB' }],
      }),
      video('ielts1-m3-l2', 'Nghe âm cuối & nối âm trong bài thi thật', '18 phút', '34ryce0LZCU', {
        overview: 'Luyện nghe các hiện tượng nối âm, nuốt âm khiến bạn bỏ lỡ đáp án.',
        keyPoints: ['"turn it off" → /tɜːnɪtɒf/', 'Chú ý số nhiều: "two bedrooms" — thiếu -s là sai đáp án.'],
      }),
      video('ielts1-m3-l3', 'Luyện nghe Mindset for IELTS — Unit 2', '25 phút', 'RCuvLzqdBZ8', {
        overview: 'Thực hành với audio giáo trình Cambridge Mindset Foundation, làm bài song song.',
        keyPoints: ['Nghe lần 1 làm bài, lần 2 dò transcript, lần 3 shadowing.'],
      }),
      reading('ielts1-m3-l4', 'Chiến thuật Listening Part 2: Map & Multiple choice', '20 phút', {
        overview: 'Part 2 là độc thoại về chủ đề xã hội. Bài đọc hướng dẫn cách xử lý dạng bản đồ và trắc nghiệm.',
        sections: [
          {
            heading: '1. Dạng Map Labelling',
            body: 'Trước khi nghe, xác định điểm bắt đầu (You are here), hướng Bắc và các địa danh đã có tên. Người nói luôn dẫn đường theo trình tự.',
            bullets: ['Từ chỉ hướng: opposite, next to, behind, at the end of, on your left.', 'Vẽ mũi tên lên bản đồ khi nghe để không bị lạc.'],
          },
          {
            heading: '2. Dạng Multiple Choice',
            body: 'Các phương án thường đều được nhắc đến trong bài, nhưng chỉ có 1 phương án khớp với câu hỏi. Đừng chọn ngay khi nghe thấy từ giống trong phương án.',
            tip: 'Paraphrase là chìa khóa: đề nói "inexpensive", bài nghe có thể nói "it won\'t cost you much".',
          },
        ],
      }),
      quiz('ielts1-m3-l5', 'Kiểm tra: Kỹ năng Listening Part 1-2', '12 phút', [
        ['Khi nghe "fifteen... sorry, fifty", đáp án là:', ['15', '50', 'Cả hai', 'Không xác định'], 1, 'Luôn lấy thông tin cuối cùng sau khi người nói tự sửa.'],
        ['"opposite the bank" nghĩa là:', ['Cạnh ngân hàng', 'Đối diện ngân hàng', 'Sau ngân hàng', 'Trong ngân hàng'], 1, 'opposite = đối diện.'],
        ['Thời gian đọc trước câu hỏi nên dùng để:', ['Nghỉ ngơi', 'Gạch chân từ khóa & dự đoán loại từ', 'Chép đáp án cũ', 'Đọc Reading'], 1, 'Dự đoán giúp bạn tập trung nghe đúng thông tin.'],
        ['"It won\'t cost much" là paraphrase của:', ['expensive', 'inexpensive', 'free', 'valuable'], 1, 'Không tốn nhiều tiền = inexpensive.'],
      ]),
      assignment('ielts1-m3-l6', 'Bài tập Chương 3: Nhật ký nghe chép chính tả (Dictation)', '35 phút', {
        assignmentType: 'Listening Dictation',
        minWords: 100,
        prompt: 'Nghe lại video bài 3.3 (Mindset Unit 2) và chép chính tả một đoạn dài khoảng 1 phút. Sau đó viết 3–5 câu tiếng Anh tự nhận xét: những từ/âm bạn nghe sai, nguyên nhân, và cách bạn sẽ cải thiện.',
        requirements: ['Đánh dấu [?] vào những chỗ không nghe được.', 'Phần nhận xét tối thiểu 50 từ.'],
      }),
    ]),

    // ───────────────────────── CHƯƠNG 4 ─────────────────────────
    chapter('ielts1-m4', 'Reading Foundation — Skimming, Scanning & T/F/NG',
      'Đọc nhanh nắm ý chính, tìm thông tin chi tiết và chinh phục dạng True/False/Not Given.', [
      video('ielts1-m4-l1', 'Skimming & Scanning — đọc nhanh không cần hiểu từng từ', '22 phút', '86omRdX_TZQ', {
        overview: 'Skimming để nắm ý chính, Scanning để tìm số liệu – tên riêng – từ khóa.',
        keyPoints: ['Skim: đọc tiêu đề, câu đầu và câu cuối mỗi đoạn.', 'Scan: tìm chữ in hoa, con số, ngày tháng trước.'],
      }),
      video('ielts1-m4-l2', 'Chiến thuật True / False / Not Given', '20 phút', 'WYl9PX7Ua_Q', {
        overview: 'Phân biệt rạch ròi FALSE (mâu thuẫn) và NOT GIVEN (không đề cập).',
        keyPoints: ['FALSE: bài đọc nói ngược lại thông tin trong câu hỏi.', 'NOT GIVEN: không đủ thông tin để khẳng định đúng hay sai.', 'Câu hỏi đi theo thứ tự của bài đọc.'],
      }),
      video('ielts1-m4-l3', 'Luyện tập T/F/NG với đề thật Band 9', '24 phút', 'JkWwZt8UwA4', {
        overview: 'Giải chi tiết từng câu hỏi theo phương pháp đối chiếu từ khóa.',
      }),
      reading('ielts1-m4-l4', 'Kỹ thuật nhận diện Paraphrase trong Reading', '20 phút', {
        overview: 'Hơn 80% câu hỏi Reading dùng paraphrase. Nắm 4 kỹ thuật dưới đây để tìm đáp án nhanh hơn.',
        sections: [
          { heading: '1. Đồng nghĩa', examples: [['significant → considerable', 'đáng kể'], ['children → youngsters', 'trẻ em']] },
          { heading: '2. Đổi từ loại', examples: [['to develop → development', 'phát triển'], ['economic growth → the economy grew', 'tăng trưởng kinh tế']] },
          { heading: '3. Chủ động ↔ Bị động', examples: [['Scientists discovered the virus. → The virus was discovered.', 'Virus được phát hiện.']] },
          { heading: '4. Khái quát hóa', body: 'Bài đọc liệt kê "apples, bananas and oranges", câu hỏi có thể viết "fruit".', tip: 'Lập sổ paraphrase: mỗi lần làm đề, ghi lại cặp từ đề bài – bài đọc.' },
        ],
      }),
      quiz('ielts1-m4-l5', 'Kiểm tra: Reading T/F/NG', '15 phút', [
        ['Bài đọc: "Temperatures have risen by 1.5°C since 1900." Câu hỏi: "Temperatures have fallen since 1900."', ['TRUE', 'FALSE', 'NOT GIVEN'], 1, 'Mâu thuẫn trực tiếp → FALSE.'],
        ['Bài đọc không nhắc lượng mưa Sahara. Câu hỏi: "The Sahara receives less rain than the Amazon."', ['TRUE', 'FALSE', 'NOT GIVEN'], 2, 'Không có thông tin → NOT GIVEN.'],
        ['"considerable" là paraphrase của:', ['small', 'significant', 'recent', 'similar'], 1, 'considerable ≈ significant.'],
        ['Skimming dùng để:', ['Tìm con số', 'Nắm ý chính', 'Dịch từng câu', 'Học từ vựng'], 1, 'Skimming = đọc lướt lấy ý chính.'],
      ]),
      assignment('ielts1-m4-l6', 'Bài tập Chương 4: Tóm tắt bài đọc học thuật', '35 phút', {
        assignmentType: 'Reading Summary',
        minWords: 120,
        prompt: 'Chọn một bài báo tiếng Anh ngắn (BBC Learning English, VOA…) về chủ đề Môi trường. Viết bản tóm tắt 120–150 từ bằng lời văn của bạn (paraphrase), sau đó liệt kê 5 cặp paraphrase bạn đã dùng (từ gốc → từ thay thế).',
        requirements: ['Ghi rõ nguồn bài báo.', 'Không chép nguyên văn quá 5 từ liên tiếp.'],
      }),
    ]),

    // ───────────────────────── CHƯƠNG 5 ─────────────────────────
    chapter('ielts1-m5', 'Writing Task 1 Foundation — Biểu đồ',
      'Bố cục 4 đoạn chuẩn, cách viết Overview và từ vựng mô tả xu hướng tăng – giảm.', [
      video('ielts1-m5-l1', 'Cấu trúc bài Writing Task 1 Band 9', '25 phút', 'qhxzCiwX11o', {
        overview: 'Introduction – Overview – Body 1 – Body 2: chức năng của từng đoạn và lỗi thường gặp.',
        keyPoints: ['Introduction: paraphrase đề bài, không copy.', 'Overview: 2 đặc điểm nổi bật nhất, KHÔNG có số liệu.', 'Body: nhóm số liệu theo logic, so sánh.'],
      }),
      video('ielts1-m5-l2', 'Biểu đồ tròn (Pie chart) trong vài phút', '18 phút', 'tgwibVefUKk', {
        overview: 'Cách so sánh tỷ lệ phần trăm và dùng từ vựng chỉ phân số.',
        vocabulary: [['account for', '/əˈkaʊnt fɔː/', 'chiếm'], ['a quarter', '/ə ˈkwɔːtə/', 'một phần tư'], ['the majority', '/məˈdʒɒrəti/', 'phần lớn']],
      }),
      video('ielts1-m5-l3', 'Tổng hợp 6 dạng Task 1 cùng Huy Forum 9.0', '30 phút', 'Ft4Lduu83-0', {
        overview: 'Line, Bar, Pie, Table, Map, Process — cách tiếp cận cho từng dạng.',
      }),
      reading('ielts1-m5-l4', 'Từ vựng mô tả xu hướng & số liệu', '20 phút', {
        overview: 'Bảng từ vựng đầy đủ để mô tả biểu đồ đường và biểu đồ cột.',
        sections: [
          { heading: 'Tăng', bullets: ['rise / increase / grow / climb', 'surge / soar (tăng mạnh)', 'a steady rise / a sharp increase'] },
          { heading: 'Giảm', bullets: ['fall / decrease / decline / drop', 'plummet / plunge (giảm mạnh)', 'a gradual decline / a dramatic fall'] },
          { heading: 'Ổn định & dao động', bullets: ['remain stable / level off / plateau', 'fluctuate (dao động)', 'peak at / hit a low of'] },
          {
            heading: 'Câu mẫu',
            examples: [
              ['The number of tourists rose sharply from 2 million to 5 million.', 'Lượng khách du lịch tăng mạnh từ 2 triệu lên 5 triệu.'],
              ['Coal consumption declined gradually, reaching a low of 10% in 2020.', 'Tiêu thụ than giảm dần, chạm đáy 10% năm 2020.'],
            ],
            tip: 'Kết hợp 2 cấu trúc: "S + V + adv" và "There was a + adj + N" để tránh lặp.',
          },
        ],
      }),
      quiz('ielts1-m5-l5', 'Kiểm tra: Writing Task 1', '10 phút', [
        ['Đoạn Overview KHÔNG nên có:', ['Xu hướng chính', 'Số liệu cụ thể', 'So sánh tổng quát', 'Đặc điểm nổi bật'], 1, 'Overview chỉ nêu xu hướng chung, không đưa số liệu.'],
        ['"plummet" nghĩa là:', ['Tăng nhẹ', 'Giảm mạnh', 'Ổn định', 'Dao động'], 1, 'plummet = giảm mạnh, đột ngột.'],
        ['Task 1 yêu cầu tối thiểu bao nhiêu từ?', ['100', '150', '200', '250'], 1, 'Task 1: tối thiểu 150 từ.'],
        ['"account for 25%" nghĩa là:', ['Giảm 25%', 'Chiếm 25%', 'Tăng 25%', 'Đạt đỉnh 25%'], 1, 'account for = chiếm (tỷ lệ).'],
      ]),
      assignment('ielts1-m5-l6', 'Bài tập Chương 5: Writing Task 1 — Biểu đồ cột', '40 phút', {
        assignmentType: 'Writing Task 1',
        minWords: 150,
        prompt: 'The bar chart shows the number of international students enrolled in three Australian universities (A, B, C) between 2015 and 2020. University A rose from 5,000 to 9,000; University B remained stable at around 6,000; University C fell from 7,000 to 4,000.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
        requirements: ['Đủ 4 đoạn: Introduction, Overview, Body 1, Body 2.', 'Dùng ít nhất 4 từ vựng xu hướng khác nhau.', 'Có ít nhất 2 câu so sánh.'],
      }),
    ]),

    // ───────────────────────── CHƯƠNG 6 ─────────────────────────
    chapter('ielts1-m6', 'Speaking Foundation — Part 1 & Part 2',
      'Trả lời Part 1 tự nhiên theo công thức A.R.E.A và tận dụng 1 phút chuẩn bị cho Part 2.', [
      video('ielts1-m6-l1', '5 mẹo vàng cho IELTS Speaking Part 1', '15 phút', 'Xp7IJ-fKc-4', {
        overview: 'Cách mở rộng câu trả lời 2–3 câu, tránh trả lời cụt "Yes/No".',
        keyPoints: ['Answer – Reason – Example – Alternative.', 'Dùng filler tự nhiên: "Well, to be honest…", "Actually…".'],
      }),
      video('ielts1-m6-l2', 'Bài mẫu Band 9: Topic Family', '12 phút', 'F_uurVYWYFs', {
        overview: 'Phân tích từ vựng và cấu trúc trong câu trả lời band 9.',
      }),
      video('ielts1-m6-l3', 'Tận dụng 1 phút chuẩn bị Part 2', '14 phút', 'rWBrbXrNHwk', {
        overview: 'Ghi chú từ khóa theo sơ đồ để nói đủ 2 phút.',
        keyPoints: ['Chỉ ghi từ khóa, không viết câu.', 'Trả lời theo thứ tự gợi ý trên cue card.'],
      }),
      video('ielts1-m6-l4', 'Part 2 mẫu Band 8+: Describe something special', '16 phút', 'yuuTVPCbasE', {
        overview: 'Học cách kể chuyện có cảm xúc và chi tiết.',
      }),
      quiz('ielts1-m6-l5', 'Kiểm tra: Speaking Part 1 & 2', '10 phút', [
        ['Công thức A.R.E.A gồm:', ['Answer, Reason, Example, Alternative', 'Ask, Read, Explain, Answer', 'Agree, Refuse, End, Add', 'Answer, Repeat, Explain, Add'], 0, 'A.R.E.A giúp mở rộng câu trả lời.'],
        ['Part 2 cho bao nhiêu thời gian chuẩn bị?', ['30 giây', '1 phút', '2 phút', '3 phút'], 1, '1 phút chuẩn bị, nói 1–2 phút.'],
        ['Khi chuẩn bị Part 2, bạn nên:', ['Viết câu hoàn chỉnh', 'Ghi từ khóa', 'Im lặng', 'Hỏi giám khảo'], 1, 'Ghi từ khóa giúp nói tự nhiên.'],
      ]),
      assignment('ielts1-m6-l6', 'Bài tập Chương 6: Kịch bản Speaking Part 2', '35 phút', {
        assignmentType: 'Speaking Script',
        minWords: 180,
        prompt: 'Cue card: "Describe a person who has influenced you." You should say: who this person is, how you know them, what they have done, and explain why they have influenced you.\n\nViết kịch bản bài nói 180–220 từ (tương đương 2 phút nói). Giảng viên sẽ chấm như bài Speaking và gợi ý từ vựng nâng band.',
        requirements: ['Trả lời đủ 4 ý của cue card.', 'Dùng ít nhất 2 thì khác nhau.', 'Có 1 câu kết luận nêu cảm xúc.'],
      }),
    ]),
  ],
};
