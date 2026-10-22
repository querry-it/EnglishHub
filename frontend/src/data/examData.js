// Dữ liệu đề thi thật và bài tập luyện thi chuẩn IELTS & TOEIC
// Trích xuất từ chuẩn đề ETS (TOEIC) và Cambridge Academic (IELTS)

export const TOEIC_DATA = {
  collections: [
    {
      id: 'toeic-2026',
      title: 'Bộ đề TOEIC 2026 Mới Nhất',
      tags: ['ETS Format', '2026'],
      testsCount: 10,
      attempts: '139,888',
      iconColor: 'bg-amber-500',
      description: 'Tổng hợp các dạng câu hỏi Part 5 & Part 7 xuất hiện trong các kỳ thi TOEIC gần đây kèm giải thích chi tiết.'
    },
    {
      id: 'toeic-vol-1',
      title: 'EnglishHub TOEIC Practice Vol. 1',
      tags: ['Intensive', 'Full Test'],
      testsCount: 10,
      attempts: '55,751',
      iconColor: 'bg-sky-500',
      description: 'Bộ đề luyện tập toàn diện giúp bứt phá từ mốc 550 lên 750+ TOEIC.'
    },
    {
      id: 'toeic-part5-focus',
      title: 'Chuyên đề TOEIC Part 5: Ngữ pháp & Từ vựng',
      tags: ['Part 5', 'Grammar'],
      testsCount: 15,
      attempts: '82,410',
      iconColor: 'bg-indigo-600',
      description: 'Tuyển tập 100+ câu hỏi bẫy ngữ pháp thường gặp nhất trong đề thi Part 5.'
    },
    {
      id: 'toeic-part7-focus',
      title: 'Chuyên đề TOEIC Part 7: Đọc hiểu văn bản thương mại',
      tags: ['Part 7', 'Reading'],
      testsCount: 12,
      attempts: '41,200',
      iconColor: 'bg-emerald-600',
      description: 'Rèn kỹ năng đọc nhanh (Skim & Scan) email công sở, thư báo giá và bản thông báo nội bộ.'
    }
  ],

  tests: {
    'toeic-2026': {
      id: 'toeic-2026-test-1',
      title: 'Đề thi thử TOEIC 2026 — Test 01 (Part 5 & Part 7)',
      timeLimitMinutes: 45,
      part5Questions: [
        {
          id: 101,
          part: 5,
          question: 'Ms. Brenda has requested that the financial summary report be delivered ______ Friday afternoon at the latest.',
          options: [
            'A. by',
            'B. at',
            'C. to',
            'D. on'
          ],
          correct: 'A',
          category: 'Giới từ chỉ thời gian (Prepositions)',
          explanation: 'Dùng giới từ "by" với mốc thời gian để mang nghĩa "trước hoặc chậm nhất vào lúc nào" (thường đi kèm cụm "at the latest"). Đáp án A là chính xác.'
        },
        {
          id: 102,
          part: 5,
          question: 'All employees are encouraged to review the updated safety guidelines ______ to the inspection scheduled for next Monday.',
          options: [
            'A. prior',
            'B. previous',
            'C. earlier',
            'D. ahead'
          ],
          correct: 'A',
          category: 'Cụm giới từ cố định (Collocations)',
          explanation: 'Cụm cố định "prior to + danh từ/thời điểm" = "before" mang nghĩa "trước khi". Các từ previous, earlier, ahead không kết hợp với "to" trong ngữ cảnh này.'
        },
        {
          id: 103,
          part: 5,
          question: 'The committee members voted ______ to approve the expansion of the manufacturing plant into Southeast Asia.',
          options: [
            'A. unanimity',
            'B. unanimous',
            'C. unanimously',
            'D. unanimities'
          ],
          correct: 'C',
          category: 'Từ loại (Parts of Speech)',
          explanation: 'Chỗ trống đứng sau nội động từ "voted" cần một trạng từ (adverb) để bổ nghĩa cho hành động bỏ phiếu. "unanimously" (một cách nhất trí, đồng lòng) là trạng từ có đuôi -ly.'
        },
        {
          id: 104,
          part: 5,
          question: 'Neither the department manager ______ the team leaders were satisfied with the initial prototype results.',
          options: [
            'A. or',
            'B. nor',
            'C. and',
            'D. but'
          ],
          correct: 'B',
          category: 'Liên từ tương quan (Correlative Conjunctions)',
          explanation: 'Cặp liên từ tương quan chuẩn: "Neither ... nor ..." (không ... cũng không ...). Đáp án B là chính xác.'
        },
        {
          id: 105,
          part: 5,
          question: 'Due to unexpected logistical delays, the shipment of semiconductors will arrive ______ than originally anticipated.',
          options: [
            'A. late',
            'B. later',
            'C. latest',
            'D. lateness'
          ],
          correct: 'B',
          category: 'So sánh hơn (Comparative Adverbs)',
          explanation: 'Có từ "than" ở phía sau nên ta phải dùng hình thức so sánh hơn của trạng từ "late" là "later".'
        },
        {
          id: 106,
          part: 5,
          question: 'Mr. Tanaka is regarded as one of the most ______ negotiators in the international renewable energy sector.',
          options: [
            'A. persuades',
            'B. persuasively',
            'C. persuasive',
            'D. persuasion'
          ],
          correct: 'C',
          category: 'Từ loại (Adjectives)',
          explanation: 'Cấu trúc "the most + Tính từ + Danh từ (negotiators)". Cần một tính từ để bổ nghĩa cho danh từ "negotiators". "persuasive" (có sức thuyết phục) là tính từ chính xác.'
        }
      ],
      part7Passage: {
        title: 'Bản ghi nhớ nội bộ công ty (Internal Memorandum)',
        content: `TO: All Staff Members, Nexus Logistics Inc.
FROM: Marcus Vance, Vice President of Human Resources
DATE: October 14, 2026
SUBJECT: Scheduled IT Infrastructure & Cloud Migration Maintenance

Please be advised that our central data center will undergo a scheduled system-wide upgrade from 10:00 PM on Friday, October 18, through 6:00 AM on Sunday, October 20. 

During this 32-hour maintenance window:
• Remote email access via the corporate web portal will be temporarily unavailable.
• The internal warehouse inventory database will be switched to read-only backup mode.
• Customer-facing order tracking services will remain operational, hosted on our secondary cloud cluster.

We strongly urge all department heads to finalize and submit their weekly operational summaries before 5:00 PM on Friday, October 18. Any urgent system inquiries during the weekend should be directed to the on-call IT helpdesk at extension 4402 or via mobile at 555-0198.

We apologize for any temporary inconvenience and appreciate your cooperation in facilitating this critical system modernization.`,
        questions: [
          {
            id: 107,
            part: 7,
            question: 'What is the main purpose of the memorandum?',
            options: [
              'A. To announce new office hours for the weekend shift',
              'B. To notify staff about an upcoming IT system upgrade',
              'C. To introduce a newly appointed Human Resources executive',
              'D. To inform clients of delivery schedule modifications'
            ],
            correct: 'B',
            explanation: 'Dẫn chứng ngay câu đầu: "Please be advised that our central data center will undergo a scheduled system-wide upgrade...". Mục đích là thông báo về đợt nâng cấp hệ thống kỹ thuật.'
          },
          {
            id: 108,
            part: 7,
            question: 'According to the memo, what will continue functioning normally during the maintenance?',
            options: [
              'A. Remote email access for employees',
              'B. Warehouse inventory modifications',
              'C. Customer-facing order tracking services',
              'D. The central HR payroll portal'
            ],
            correct: 'C',
            explanation: 'Dẫn chứng tại gạch đầu dòng thứ 3: "Customer-facing order tracking services will remain operational, hosted on our secondary cloud cluster."'
          },
          {
            id: 109,
            part: 7,
            question: 'What are department heads asked to do before Friday at 5:00 PM?',
            options: [
              'A. Shut down all office computers manually',
              'B. Submit their weekly operational summaries',
              'C. Contact on-call IT technicians via mobile',
              'D. Backup their personal smartphone data'
            ],
            correct: 'B',
            explanation: 'Dẫn chứng: "We strongly urge all department heads to finalize and submit their weekly operational summaries before 5:00 PM on Friday, October 18."'
          }
        ]
      }
    }
  }
};

export const IELTS_DATA = {
  collections: [
    {
      id: 'cam-20',
      title: 'Cambridge IELTS 20 (Mới Nhất)',
      tags: ['Cambridge', 'Academic'],
      testsCount: 4,
      attempts: '24,820',
      iconColor: 'bg-rose-500',
      description: 'Bộ đề thi mới nhất từ Nhà xuất bản Đại học Cambridge, chuẩn 100% format đề thi thật hiện nay.'
    },
    {
      id: 'cam-19',
      title: 'Cambridge IELTS 19 Academic',
      tags: ['Cambridge', 'Academic'],
      testsCount: 4,
      attempts: '45,150',
      iconColor: 'bg-indigo-600',
      description: 'Đề thi chọn lọc bao gồm bài đọc học thuật, bài viết Task 1 & 2 kèm bài mẫu Band 8.5+.'
    },
    {
      id: 'vol-9',
      title: 'IELTS Practice Tests Recent Actual Vol. 9',
      tags: ['Recent Actual', 'Reading'],
      testsCount: 6,
      attempts: '32,754',
      iconColor: 'bg-purple-600',
      description: 'Tuyển tập đề thi thật tại phòng thi IDP & British Council trong các quý vừa qua.'
    },
    {
      id: 'ielts-writing-master',
      title: 'Chuyên đề IELTS Writing: Task 1 & Task 2',
      tags: ['Writing', 'Band 8.0+'],
      testsCount: 8,
      attempts: '18,920',
      iconColor: 'bg-emerald-600',
      description: 'Luyện viết theo cấu trúc chuẩn kèm kho bài mẫu điểm cao và phân tích từ vựng đắt giá.'
    }
  ],

  tests: {
    'cam-20': {
      id: 'cam-20-test-1',
      title: 'Cambridge IELTS 20 — Reading & Writing Academic Test 01',
      readingPassage: {
        title: 'Reading Passage: The Science of Sleep and Cognitive Recovery',
        content: `Paragraph A
For centuries, sleep was regarded as a passive state of dormancy, an unavoidable biological downtime during which the brain essentially ceased meaningful activity. However, groundbreaking neuroimaging advances over the past two decades have dramatically shattered this antiquated notion. Contemporary neuroscience demonstrates that during sleep, the human brain enters an intensely active, highly choreographed metabolic state dedicated to memory consolidation, neural synaptic pruning, and the systematic flushing of accumulated biochemical toxins.

Paragraph B
A pivotal mechanism driving these nocturnal processes is the glymphatic system, discovered by researchers at the University of Rochester. While the body relies on the lymphatic network to clear waste products from tissues, the brain—owing to the blood-brain barrier—requires an alternative cleansing mechanism. During slow-wave non-REM (NREM) sleep, glial cells shrink by up to sixty percent, enabling cerebrospinal fluid to surge through intercellular spaces, rapidly expelling metabolic byproducts such as beta-amyloid plaques. The chronic accumulation of beta-amyloid has long been implicated in the pathogenesis of neurodegenerative conditions, notably Alzheimer’s disease.

Paragraph C
Beyond biochemical detoxification, sleep plays an irreplaceable role in memory architecture. As subjects experience rapid eye movement (REM) sleep, neural oscillations facilitate the transfer of episodic memories from the temporary, short-term reservoir of the hippocampus into the permanent cortical architecture of the neocortex. Depriving individuals of adequate sleep not only impairs the immediate retention of newly acquired information but also weakens creative problem-solving abilities, which depend heavily on associative connections established during REM dreaming states.`,
        questions: [
          {
            id: 201,
            type: 'TFNG',
            question: 'Early scientific theories regarded sleep as a state where the brain was largely inactive.',
            options: ['TRUE', 'FALSE', 'NOT GIVEN'],
            correct: 'TRUE',
            evidence: 'Paragraph A: "For centuries, sleep was regarded as a passive state of dormancy, an unavoidable biological downtime during which the brain essentially ceased meaningful activity."',
            explanation: 'Đoạn A nêu rõ trong nhiều thế kỷ trước đây, giấc ngủ được xem là trạng thái thụ động và não bộ hầu như ngừng các hoạt động có ý nghĩa. Do đó câu khẳng định là TRUE.'
          },
          {
            id: 202,
            type: 'TFNG',
            question: 'The glymphatic system clears cellular waste from both the brain and the peripheral muscular system.',
            options: ['TRUE', 'FALSE', 'NOT GIVEN'],
            correct: 'FALSE',
            evidence: 'Paragraph B: "While the body relies on the lymphatic network to clear waste products from tissues, the brain... requires an alternative cleansing mechanism [the glymphatic system]."',
            explanation: 'Đoạn B chỉ ra hệ thống glymphatic chuyên phục vụ cho não bộ (the brain), còn các mô cơ thể dùng hệ bạch huyết (lymphatic network). Do đó câu trên là FALSE.'
          },
          {
            id: 203,
            type: 'MCQ',
            question: 'According to Paragraph B, what happens to glial cells during slow-wave NREM sleep?',
            options: [
              'A. They multiply exponentially to reinforce the blood-brain barrier',
              'B. They decrease in physical volume by as much as 60%',
              'C. They absorb toxic beta-amyloid plaques directly into their membranes',
              'D. They convert episodic memories into permanent cortical structures'
            ],
            correct: 'B',
            evidence: 'Paragraph B: "During slow-wave non-REM (NREM) sleep, glial cells shrink by up to sixty percent..."',
            explanation: 'Dẫn chứng ghi rõ tế bào thần kinh đệm (glial cells) co lại (shrink) tới 60%, tạo không gian cho dịch não tủy lưu thông và làm sạch độc tố. Đáp án B là chính xác.'
          },
          {
            id: 204,
            type: 'MCQ',
            question: 'What is the primary function of REM sleep described in Paragraph C?',
            options: [
              'A. Regulating body temperature and decreasing cardiovascular strain',
              'B. Transferring memories from the hippocampus to the neocortex',
              'C. Reconstructing damaged glial cell membranes across the brain',
              'D. Increasing the production of cerebrospinal fluid'
            ],
            correct: 'B',
            evidence: 'Paragraph C: "...facilitate the transfer of episodic memories from the temporary, short-term reservoir of the hippocampus into the permanent cortical architecture of the neocortex."',
            explanation: 'Dẫn chứng chỉ ra vai trò chính của giấc ngủ REM là chuyển đổi ký ức từ vùng hải mã (hippocampus) sang vùng vỏ não mới (neocortex). Đáp án B là chính xác.'
          }
        ]
      },
      writingTask: {
        taskNumber: 2,
        prompt: `Write about the following topic:

Some people argue that technological advances, particularly in artificial intelligence and automation, will inevitably increase social inequality and unemployment. Others believe that these innovations will create superior career opportunities and enhance human prosperity.

Discuss both views and give your own opinion.

Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.`,
        sampleBandScore: '8.5',
        sampleEssay: `The rapid acceleration of artificial intelligence and automation has sparked a contentious global debate regarding the future of employment and societal wealth distribution. While critics contend that algorithmic technologies threaten to displace substantial segments of the workforce and exacerbate wealth disparity, proponents maintain that technological innovation has historically catalyzed novel industries and elevated human living standards. In my view, while structural disruptions are unavoidable in the short term, prudent regulatory governance and educational modernization will enable automation to unlock unprecedented human prosperity.

On the one hand, apprehensions regarding job obsolescence are grounded in legitimate economic realities. Unlike previous industrial revolutions that primarily automated repetitive physical labor, modern artificial intelligence possesses cognitive processing capabilities capable of executing complex analytical tasks. Consequently, entry-level white-collar positions in sectors such as financial accounting, legal research, and software testing are increasingly vulnerable to automation. Without proactive retraining initiatives, displaced workers face protracted unemployment, which threatens to concentrate capital within a tech-elite demographic and widen socio-economic polarization.

On the other hand, technological advancement intrinsically drives productivity growth and engenders high-value professions that were previously unimaginable. The proliferation of automated systems inevitably creates surging demand for AI ethicists, prompt engineers, cyber-defense strategists, and robotics maintenance specialists. Furthermore, by delegating mundane administrative duties to intelligent software, human professionals can redirect their cognitive capacity toward inherently creative, empathetic, and strategic endeavors—attributes that remain fundamentally beyond synthetic replication.

In conclusion, although the transition toward an automated economy poses tangible threats to conventional employment structures, categorizing automation as inherently detrimental is reductive. Provided that governments and academic institutions prioritize dynamic reskilling frameworks, technological progress will ultimately serve as an engine of long-term economic empowerment.`,
        lexicalHighlights: [
          { word: 'catalyze novel industries', meaning: 'kích hoạt, thúc đẩy các ngành công nghiệp mới phát triển' },
          { word: 'exacerbate wealth disparity', meaning: 'làm trầm trọng thêm sự chênh lệch giàu nghèo' },
          { word: 'proactive retraining initiatives', meaning: 'các sáng kiến chủ động đào tạo lại tay nghề cho người lao động' },
          { word: 'socio-economic polarization', meaning: 'sự phân cực hóa sâu sắc về mặt kinh tế - xã hội' },
          { word: 'inherently beyond synthetic replication', meaning: 'vốn dĩ vượt ngoài khả năng sao chép của máy móc nhân tạo' }
        ]
      }
    }
  }
};
