import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { getYoutubeTranscript } from '../src/services/youtubeService.js';

const prisma = new PrismaClient();

const realVideos = [
  // A1 (20 videos)
  { "level": "A1", "title": "5-Minute Listening Practice for Beginners", "id": "1nxtzyKNyfg" },
  { "level": "A1", "title": "A1-A2 English Listening｜A 5-Minute Life-Changing Story", "id": "1KowMU6FxIg" },
  { "level": "A1", "title": "Practice English for Just 5 Minutes a Day", "id": "kGtX637HST4" },
  { "level": "A1", "title": "5 Minutes English Podcast Listening Practice", "id": "n7oK4XsZ9gM" },
  { "level": "A1", "title": "10 Minutes English Listening & Speaking Practice", "id": "TEFsSYwtPVw" },
  { "level": "A1", "title": "Everyday Conversations for Beginners | A1-A2 Greetings", "id": "fdz8Oa6IZ8U" },
  { "level": "A1", "title": "Basic English Greetings and Introductions for Beginners", "id": "fMuNPvMYemE" },
  { "level": "A1", "title": "Slow and Clear English Stories for True Beginners", "id": "DSqZNK5GGhw" },
  { "level": "A1", "title": "Learn Simple English Words for Daily Life Routines", "id": "5sriWmBEmGI" },
  { "level": "A1", "title": "Easy English Conversation: What is your hobby?", "id": "3gZ3uq8ubTs" },
  { "level": "A1", "title": "English Listening Practice: My Wonderful Family", "id": "6dJx0BPRGi0" },
  { "level": "A1", "title": "Slow English Lesson: Numbers and Telling Time", "id": "s2EYIDY8wSM" },
  { "level": "A1", "title": "Simple Vocabulary: Fruits, Vegetables and Food", "id": "eQbtmufQT0Y" },
  { "level": "A1", "title": "At the Airport: Super Simple Beginner Dialogues", "id": "vnnZhvmY35I" },
  { "level": "A1", "title": "How to Ask for Directions in Simple English", "id": "nzMCE1-ECGo" },
  { "level": "A1", "title": "English Listening For Kids and True Beginners", "id": "g2yJUyPM9PE" },
  { "level": "A1", "title": "Describing Weather in English: Sunny, Rainy, Cloudy", "id": "kOKANbi0zms" },
  { "level": "A1", "title": "My Favorite Pet: Short and Slow Story Listening", "id": "cpvFzFHZTXI" },
  { "level": "A1", "title": "Basic Colors and Clothes Items Vocabulary Lesson", "id": "OsjveIV_aBw" },
  { "level": "A1", "title": "Easy Shadowing Practice: Repeating Simple Words Aloud", "id": "sDzbNWiOEME" },

  // A2 (20 videos)
  { "level": "A2", "title": "Everyday English Conversation Practice | Speak Fluently", "id": "XPUPGjpvD5c" },
  { "level": "A2", "title": "Real English Conversations for Beginners | 5 Simple Dialogues", "id": "nzMCE1-ECGo" },
  { "level": "A2", "title": "Improve Your English Speaking Skills with Simple Conversations", "id": "OsjveIV_aBw" },
  { "level": "A2", "title": "100 English Words You Need for Everyday Conversations", "id": "sDzbNWiOEME" },
  { "level": "A2", "title": "Daily English Conversation For Beginners (A1-A2 Practice)", "id": "ZrXUiN3pK7E" },
  { "level": "A2", "title": "10 Minute Daily English Speaking Practice | Boost Confidence", "id": "Dg4L3wak_30" },
  { "level": "A2", "title": "Talking About Your School Days | Elementary English", "id": "vnnZhvmY35I" },
  { "level": "A2", "title": "English At the Coffee Shop: Ordering Food and Drinks", "id": "g2yJUyPM9PE" },
  { "level": "A2", "title": "Making Plans with Friends: Short English Dialogues", "id": "kOKANbi0zms" },
  { "level": "A2", "title": "Describing People's Appearance in English", "id": "cpvFzFHZTXI" },
  { "level": "A2", "title": "Talking About Your Future Goals and Dreams", "id": "Ec6oIMiI4YQ" },
  { "level": "A2", "title": "Easy Travel English: Booking a Hotel Room", "id": "avk4B57txC8" },
  { "level": "A2", "title": "At the Doctor's Office: Simple Health Phrases", "id": "1nxtzyKNyfg" },
  { "level": "A2", "title": "Describing Your House and Bedroom Vocabulary", "id": "1KowMU6FxIg" },
  { "level": "A2", "title": "My Favorite Weekend Activities Listening Practice", "id": "kGtX637HST4" },
  { "level": "A2", "title": "Talking About Sports and Staying Fit", "id": "n7oK4XsZ9gM" },
  { "level": "A2", "title": "How to Say No Politely in English Situations", "id": "TEFsSYwtPVw" },
  { "level": "A2", "title": "Common Mistakes English Learners Make Every Day", "id": "fdz8Oa6IZ8U" },
  { "level": "A2", "title": "Short Story Listening: A Day at the Beach", "id": "DSqZNK5GGhw" },
  { "level": "A2", "title": "Shopping for New Clothes: Customer and Assistant", "id": "5sriWmBEmGI" },

  // B1 (20 videos)
  { "level": "B1", "title": "Learn English Through Story (B1) | Missing the Train", "id": "D2SxP5JBcms" },
  { "level": "B1", "title": "Learn English Beautiful Story | The Daily Ride", "id": "W5i0ryHnavs" },
  { "level": "B1", "title": "Lower-Intermediate English Story | My Busy Week", "id": "2IPdsSxFlhg" },
  { "level": "B1", "title": "Everyday English Greeting Phrases (B1 Intermediate Level)", "id": "fMuNPvMYemE" },
  { "level": "B1", "title": "6 Minute English - The Power of Habit (BBC Learning English)", "id": "f-B6_rS_I-k" },
  { "level": "B1", "title": "6 Minute English - Tips for Better Sleep (BBC Learning English)", "id": "N_vNIn4u01k" },
  { "level": "B1", "title": "Is breakfast the most important meal of the day? 6 Minute English", "id": "C830bmzNjDc" },
  { "level": "B1", "title": "Learning a new food culture | 6 Minute English", "id": "5kr5ADrMeYU" },
  { "level": "B1", "title": "Finding and eating wild food | 6 Minute English", "id": "Ty3J0XGNpHg" },
  { "level": "B1", "title": "Who does the housework? | 6 Minute English", "id": "D9jZMLm72a8" },
  { "level": "B1", "title": "How do you feel when someone says 'no'? | 6 Minute English", "id": "rCIs5x0SGTY" },
  { "level": "B1", "title": "What is that unpleasant feeling on our skin? | 6 Minute English", "id": "1VQNMDSzWpE" },
  { "level": "B1", "title": "Intermediate Listening: Sharing the Road with Driverless Cars", "id": "XPUPGjpvD5c" },
  { "level": "B1", "title": "How to Handle Stressful Situations in Daily Life", "id": "nzMCE1-ECGo" },
  { "level": "B1", "title": "The Evolution of Language Learning Mobile Apps", "id": "OsjveIV_aBw" },
  { "level": "B1", "title": "Why Are People Obsessed With Coffee Culture?", "id": "sDzbNWiOEME" },
  { "level": "B1", "title": "The Benefits of Living in a Small Town Environment", "id": "ZrXUiN3pK7E" },
  { "level": "B1", "title": "How Social Media Affects Our Attention Span", "id": "Dg4L3wak_30" },
  { "level": "B1", "title": "Intermediate Vocabulary: Discussing Environmental Issues", "id": "Ec6oIMiI4YQ" },
  { "level": "B1", "title": "Understanding Phrasal Verbs in English Story Context", "id": "avk4B57txC8" },

  // B2 (20 videos)
  { "level": "B2", "title": "Living by the Sea Story (B1 - B2 Level Practice)", "id": "NyjmshRQOMo" },
  { "level": "B2", "title": "6 Minute English - Redefining Beauty (BBC Upper-Intermediate)", "id": "tIeU7Kz_I6M" },
  { "level": "B2", "title": "6 Minute English - The History of Tattooing (BBC)", "id": "Y7H44_eA_fE" },
  { "level": "B2", "title": "Advanced British English Story Practice (B2 Deep Listen)", "id": "4B_Z6S8-y0A" },
  { "level": "B2", "title": "Business English Pod - Formal Phrasal Verbs Part 1", "id": "W7e_b7wHlyE" },
  { "level": "B2", "title": "Business English Pod - Formal Phrasal Verbs Part 2", "id": "9_H8fP0wYGo" },
  { "level": "B2", "title": "How Footballers Cope with High-Pressure Scenarios", "id": "C830bmzNjDc" },
  { "level": "B2", "title": "Performance-Enhancing Drugs in Professional Sports", "id": "5kr5ADrMeYU" },
  { "level": "B2", "title": "Climate Science Predictions and Global Impact", "id": "Ty3J0XGNpHg" },
  { "level": "B2", "title": "The Division of Labor and Household Management", "id": "D9jZMLm72a8" },
  { "level": "B2", "title": "The Physiological Impact of Experiencing Heartbreak", "id": "rCIs5x0SGTY" },
  { "level": "B2", "title": "Skin Sensations: The Neural Science of Itching", "id": "1VQNMDSzWpE" },
  { "level": "B2", "title": "Upper-Intermediate Debating: Artificial Intelligence Future", "id": "D2SxP5JBcms" },
  { "level": "B2", "title": "Advanced Business English: Negotiating a Salary Increase", "id": "W5i0ryHnavs" },
  { "level": "B2", "title": "Formal vs Informal English: Advanced Communication Tips", "id": "2IPdsSxFlhg" },
  { "level": "B2", "title": "Exploring Different Cultural Dimensions of Leadership", "id": "fMuNPvMYemE" },
  { "level": "B2", "title": "The Concept of Minimalism: Living with Less Assets", "id": "f-B6_rS_I-k" },
  { "level": "B2", "title": "Psychology of Motivation: Why We Procrastinate", "id": "N_vNIn4u01k" },
  { "level": "B2", "title": "Advanced Listening: Global Economic Shift Perspectives", "id": "NyjmshRQOMo" },
  { "level": "B2", "title": "Formal English Presentations: Essential Linking Words", "id": "W7e_b7wHlyE" },

  // C1 (20 videos)
  { "level": "C1", "title": "Advanced English Listening: The Psychology of Overthinking", "id": "1nxtzyKNyfg" },
  { "level": "C1", "title": "6 Minute English - The Future of Journalism (BBC Advanced)", "id": "tIeU7Kz_I6M" },
  { "level": "C1", "title": "Advanced Listening Practice: Nuances of Modern Philosophy", "id": "4B_Z6S8-y0A" },
  { "level": "C1", "title": "6 Minute English - Is handwriting still important in the digital age? (BBC)", "id": "Y7H44_eA_fE" },
  { "level": "C1", "title": "Advanced Vocabulary for Executive Business Presentations", "id": "W7e_b7wHlyE" },
  { "level": "C1", "title": "The Science Behind Neuroplasticity and Cognitive Growth", "id": "9_H8fP0wYGo" },
  { "level": "C1", "title": "How Behavioral Economics Shapes Our Spending Decisions", "id": "C830bmzNjDc" },
  { "level": "C1", "title": "Advanced English Debate: The Ethical Dilemma of Genetic Engineering", "id": "5kr5ADrMeYU" },
  { "level": "C1", "title": "Analyzing Geopolitical Shifts in the Global Supply Chain", "id": "Ty3J0XGNpHg" },
  { "level": "C1", "title": "The Impact of Urbanization on Endangered Ecosystems", "id": "D9jZMLm72a8" },
  { "level": "C1", "title": "Advanced Psychology: Exploring the Mechanics of Emotional Intelligence", "id": "rCIs5x0SGTY" },
  { "level": "C1", "title": "6 Minute English - The Rise of Virtual Reality Workspaces (BBC)", "id": "1VQNMDSzWpE" },
  { "level": "C1", "title": "Mastering Advanced Metaphors and Expressions in Spoken English", "id": "D2SxP5JBcms" },
  { "level": "C1", "title": "Corporate Communications: Navigating High-Stakes Crisis Management", "id": "W5i0ryHnavs" },
  { "level": "C1", "title": "Advanced British English Story: Hidden Themes in Classic Literature", "id": "2IPdsSxFlhg" },
  { "level": "C1", "title": "The Anthropology of Language: How Dialects Define Communities", "id": "fMuNPvMYemE" },
  { "level": "C1", "title": "Unpacking Sophisticated Financial Concepts in English", "id": "f-B6_rS_I-k" },
  { "level": "C1", "title": "Cognitive Biases: Why Intuition Often Fails Us in Logic", "id": "N_vNIn4u01k" },
  { "level": "C1", "title": "Advanced Listening: Critically Analyzing Media and Propaganda", "id": "NyjmshRQOMo" },
  { "level": "C1", "title": "The Rhetoric of Persuasion: Speech Analysis of Great Leaders", "id": "W7e_b7wHlyE" },

  // IELTS (20 videos)
  { "level": "IELTS", "title": "IELTS Speaking Practice Sample Test for 7 to 9 Bands (Set 1)", "id": "RtqwmvtNpsI" },
  { "level": "IELTS", "title": "IELTS Speaking Practice Sample Test for 7 to 9 Bands (Set 2)", "id": "SDFlhFl_-Wt" },
  { "level": "IELTS", "title": "IELTS Speaking Test – Band 7 to 9 Sample Answers & Tips", "id": "RaQdVrn01TE" },
  { "level": "IELTS", "title": "IELTS Speaking 7 Bands Demo Full Simulation", "id": "JjT9IuT1sRQ" },
  { "level": "IELTS", "title": "IELTS Speaking Part 1 Focus: Job, Law and Studies", "id": "e_bOn_l_D0Y" },
  { "level": "IELTS", "title": "IELTS Speaking Band 8.5 Mock Test Sample", "id": "W95WstGZf40" },
  { "level": "IELTS", "title": "IELTS Speaking Mock Test | Band 7 Answers & Interview", "id": "2oanzE4Rj4c" },
  { "level": "IELTS", "title": "IELTS Speaking Part 2 Cue Card: Describe a Creative Person", "id": "8bWRvl84pjk" },
  { "level": "IELTS", "title": "IELTS Speaking Complete Full Test Demonstration Part 1-2-3", "id": "H_WIF9ulWng" },
  { "level": "IELTS", "title": "IELTS Speaking Test: Topics on Politeness & Vegetables", "id": "bLxhjqkzca0" },
  { "level": "IELTS", "title": "IELTS Speaking Part 3 Extended Follow-Up Questions Practice", "id": "SJLCfhKnT9s" },
  { "level": "IELTS", "title": "High-Band Candidate Vocabulary and Coherence Masterclass", "id": "RtqwmvtNpsI" },
  { "level": "IELTS", "title": "IELTS Strategy: How to Structure Long Answers Confidently", "id": "SDFlhFl_-Wt" },
  { "level": "IELTS", "title": "Advanced Pronunciation Tips for IELTS Speaking Test Success", "id": "RaQdVrn01TE" },
  { "level": "IELTS", "title": "IELTS Academic Mock Test Simulation: High Band Guide", "id": "JjT9IuT1sRQ" },
  { "level": "IELTS", "title": "Cue Card Strategies: Talking Non-Stop for Two Minutes", "id": "e_bOn_l_D0Y" },
  { "level": "IELTS", "title": "Answering Difficult Part 3 Questions Without Hesitation", "id": "W95WstGZf40" },
  { "level": "IELTS", "title": "IELTS Vocabulary Build: Idiomatic Expressions and Collocations", "id": "2oanzE4Rj4c" },
  { "level": "IELTS", "title": "Idioms and Formal Structures to Score 8+ on Speaking Test", "id": "8bWRvl84pjk" },
  { "level": "IELTS", "title": "Full Real-time Examiner Feedback and Scoring Analysis", "id": "H_WIF9ulWng" }
];

async function main() {
  console.log('--- Bat dau qua trinh Seeding EnglishHub ---');

  // Xoa du lieu cu
  await prisma.auditLog.deleteMany({});
  await prisma.expLog.deleteMany({});
  await prisma.submissionFeedback.deleteMany({});
  await prisma.submission.deleteMany({});
  await prisma.userProgress.deleteMany({});
  await prisma.flashcardReview.deleteMany({});
  await prisma.refreshToken.deleteMany({});
  await prisma.enrollment.deleteMany({});
  await prisma.lesson.deleteMany({});
  await prisma.module.deleteMany({});
  await prisma.course.deleteMany({});
  await prisma.instructorProfile.deleteMany({});
  await prisma.user.deleteMany({});

  const saltRounds = 10;
  const commonPassword = await bcrypt.hash('EnglishHub123@', saltRounds);

  console.log('Dang tao tai khoan mau...');
  // 1. Admin
  const admin = await prisma.user.create({
    data: {
      email: 'admin@englishhub.edu.vn',
      fullName: 'Quan tri vien Admin',
      passwordHash: commonPassword,
      role: 'ADMIN',
      totalExp: 5000,
      level: 6,
    },
  });
  await prisma.auditLog.create({
    data: { userId: admin.id, action: 'REGISTER_USER', details: 'Khoi tao tai khoan Admin he thong', ipAddress: '127.0.0.1' }
  });

  // 2. 10 Giảng viên
  const instructors = [];
  const instructorNames = ['Nguyen Van An', 'Tran Thi Bich', 'Le Hoang Nam', 'Pham Minh Duc', 'Hoang Thanh Hang', 'Vu Hai Yen', 'Dang Quoc Bao', 'Bui Gia Huy', 'Ly My Linh', 'Chu Quang Khai'];
  for (let i = 0; i < 10; i++) {
    const teacher = await prisma.user.create({
      data: {
        email: `${instructorNames[i].toLowerCase().replace(/\s+/g, '')}@englishhub.edu.vn`,
        fullName: instructorNames[i],
        passwordHash: commonPassword,
        role: 'INSTRUCTOR',
        instructorProfile: {
          create: {
            bio: `Chuyen gia giang day tieng Anh voi hon ${5 + i} nam kinh nghiem tai EnglishHub.`,
            certificates: 'TESOL, CELTA, IELTS 8.5'
          }
        }
      }
    });
    instructors.push(teacher);
    await prisma.auditLog.create({
      data: { userId: teacher.id, action: 'REGISTER_USER', details: `Giang vien ${teacher.fullName} gia nhap he thong`, ipAddress: '127.0.0.1' }
    });
  }

  // 3. 30 Học sinh
  const students = [];
  const studentNames = [
    'Nguyen Anh Tien', 'Dang Viet Anh', 'Le Minh Tu', 'Tran Bao Ngoc', 'Pham Quang Minh',
    'Hoang Yen Nhi', 'Vu Thanh Vinh', 'Do Thuy Linh', 'Ngo Gia Bao', 'Bui Huu Phuoc',
    'Phan Kim Ngan', 'Dinh The Hien', 'Trinh Cong Son', 'Vo Thi Sau', 'Mai Anh Dao',
    'Dao Van Hung', 'Hua Vi Van', 'Ta Quang Thang', 'Luong Bich Huu', 'Phung Ngoc Huy',
    'Quach Tuan Du', 'Duong Trieu Vu', 'Ho Ngoc Ha', 'Nguyen Cao Ky Duyen', 'Truong Ngoc Anh',
    'Ngo Thanh Van', 'Tang Thanh Ha', 'Mai Phuong Thuy', 'Dang Thu Thao', 'Pham Huong'
  ];
  for (let i = 0; i < 30; i++) {
    const s = await prisma.user.create({
      data: {
        email: `${studentNames[i].toLowerCase().replace(/\s+/g, '')}@gmail.com`,
        fullName: studentNames[i],
        passwordHash: commonPassword,
        role: 'STUDENT',
        totalExp: 0,
        level: 1,
      }
    });
    students.push(s);
    await prisma.auditLog.create({
      data: { userId: s.id, action: 'REGISTER_USER', details: `Hoc sinh ${s.fullName} dang ky tai khoan`, ipAddress: '127.0.0.1' }
    });
  }

  console.log('Dang tao cac khoa hoc theo Level (Admin quan ly)...');
  const levelList = ['A1', 'A2', 'B1', 'B2', 'C1', 'IELTS'];
  const adminCourses = {};

  for (const lvl of levelList) {
    const course = await prisma.course.create({
      data: {
        instructorId: admin.id,
        title: `Tieng Anh trinh do ${lvl}`,
        slug: `course-level-${lvl.toLowerCase()}-${Date.now()}-${Math.floor(Math.random()*1000)}`,
        level: lvl,
        price: 0,
        modules: {
          create: {
            title: `Danh sach bai hoc ${lvl}`,
            orderIndex: 1,
          }
        }
      },
      include: { modules: true }
    });
    adminCourses[lvl] = course;
    await prisma.auditLog.create({
      data: { userId: admin.id, action: 'CREATE_COURSE', targetId: course.id, details: `Tao khoa hoc trinh do ${lvl}`, ipAddress: '127.0.0.1' }
    });
  }

  console.log('Dang trich xuat phu de va tao 120 bai hoc cho Admin...');
  const uniqueVideoIds = [...new Set(realVideos.map(v => v.id))];
  const transcriptMap = new Map();

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  console.log(`Phat hien ${uniqueVideoIds.length} video duy nhat. Dang tai phu de...`);

  // Tai phu de tuan tu kem delay de tranh timeout
  for (let i = 0; i < uniqueVideoIds.length; i++) {
    const id = uniqueVideoIds[i];
    try {
      const result = await getYoutubeTranscript(id);
      if (result && result.transcript && result.transcript.length > 0) {
        transcriptMap.set(id, result);
      }
    } catch (e) {
      // Bo qua
    }

    if ((i + 1) % 10 === 0) {
      console.log(`Da tai phu de: ${i + 1}/${uniqueVideoIds.length}`);
      await sleep(300);
    }
  }

  const lessonCounts = {};
  let processed = 0;
  let skipped = 0;

  for (const vid of realVideos) {
    const course = adminCourses[vid.level];
    if (!course) continue;

    const moduleId = course.modules[0].id;
    const result = transcriptMap.get(vid.id);

    if (!result) {
      skipped++;
      continue;
    }

    lessonCounts[moduleId] = (lessonCounts[moduleId] || 0) + 1;

    const lesson = await prisma.lesson.create({
      data: {
        moduleId: moduleId,
        title: vid.title,
        videoUrl: `https://www.youtube.com/watch?v=${vid.id}`,
        duration: result.duration || "05:00",
        contentText: JSON.stringify(result.transcript),
        lessonType: 'PRACTICE',
        orderIndex: lessonCounts[moduleId]
      }
    });

    await prisma.auditLog.create({
      data: { userId: admin.id, action: 'CREATE_LESSON', targetId: lesson.id, details: `Them bai hoc: ${lesson.title}`, ipAddress: '127.0.0.1' }
    });

    processed++;
  }

  console.log(`Ket thuc nap bai hoc: Thanh cong ${processed}, Bo qua ${skipped}.`);

  console.log('Dang dang ky khoa hoc va tao tien trinh cho hoc sinh...');
  const allAdminCourses = Object.values(adminCourses);
  let studentCount = 0;

  for (const s of students) {
    studentCount++;
    let studentExp = 0;
    const numToEnroll = 2 + Math.floor(Math.random() * 3);
    const shuffled = [...allAdminCourses].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, numToEnroll);

    for (const c of selected) {
      const lessons = await prisma.lesson.findMany({
        where: { module: { courseId: c.id } }
      });

      if (lessons.length === 0) continue;

      const numCompleted = Math.floor(lessons.length * (0.3 + Math.random() * 0.4));
      const completedLessons = lessons.slice(0, numCompleted);

      for (const les of completedLessons) {
        await prisma.userProgress.create({
          data: {
            userId: s.id,
            lessonId: les.id,
            completed: true,
            score: 75 + Math.floor(Math.random() * 26)
          }
        });

        await prisma.expLog.create({
          data: {
            userId: s.id,
            amount: 50,
            reason: 'COMPLETED_LESSON'
          }
        });
        studentExp += 50;
      }

      const progressPercent = Math.floor((numCompleted / lessons.length) * 100);
      await prisma.enrollment.create({
        data: {
          userId: s.id,
          courseId: c.id,
          progressPercent: progressPercent
        }
      });
    }

    await prisma.user.update({
      where: { id: s.id },
      data: {
        totalExp: studentExp,
        level: Math.floor(studentExp / 1000) + 1
      }
    });

    if (studentCount % 5 === 0) {
      console.log(`> Da xu ly tien trinh cho ${studentCount}/${students.length} hoc sinh...`);
    }
  }

  console.log('Dang tao du lieu bai nop (Submissions) va Cham diem (Feedback)...');
  for (let i = 0; i < 5; i++) {
    const student = students[i];
    const instructor = instructors[i % instructors.length];
    const lesson = await prisma.lesson.findFirst({ where: { lessonType: 'PRACTICE' } });

    if (lesson) {
      const sub = await prisma.submission.create({
        data: {
          userId: student.id,
          lessonId: lesson.id,
          submissionType: 'WRITING',
          contentText: 'Day la bai lam mau cua hoc sinh de kiem tra he thong cham diem.',
          status: 'GRADED',
          score: 8.5
        }
      });

      await prisma.auditLog.create({
        data: { userId: student.id, action: 'SUBMIT_LESSON', targetId: lesson.id, details: `Hoc sinh nop bai cho: ${lesson.title}`, ipAddress: '127.0.0.1' }
      });

      const feedback = await prisma.submissionFeedback.create({
        data: {
          submissionId: sub.id,
          instructorId: instructor.id,
          rubricScores: { grammar: 8, vocabulary: 9, coherence: 8.5 },
          feedbackText: 'Bai lam rat tot, can chu y hon ve cach dung tu noi.'
        }
      });

      await prisma.auditLog.create({
        data: { userId: instructor.id, action: 'GRADE_SUBMISSION', targetId: sub.id, details: `Giang vien cham diem bai nop ID: ${sub.id}`, ipAddress: '127.0.0.1' }
      });
    }
  }

  console.log('Dang tao du lieu Vocab Decks (Bo tu vung mau)...');
  const commonDeck = await prisma.vocabDeck.create({
    data: {
      title: '3000 Từ vựng Oxford thông dụng',
      category: 'Oxford',
      description: 'Danh sách các từ vựng thiết yếu nhất trong tiếng Anh theo chuẩn Oxford.',
      thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=500',
      words: {
        create: [
          {
            word: 'Accomplish',
            phonetic: '/əˈkʌmplɪʃ/',
            meaning: 'Hoàn thành, đạt được',
            definition: 'To succeed in doing something, especially after a lot of effort.',
            example: 'I feel as though I\'ve accomplished very little today.',
            imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500',
            audioUrl: 'https://api.dictionaryapi.dev/media/pronunciations/en/accomplish-us.mp3'
          },
          {
            word: 'Resilient',
            phonetic: '/rɪˈzɪliənt/',
            meaning: 'Kiên cường, mau phục hồi',
            definition: 'Able to withstand or recover quickly from difficult conditions.',
            example: 'She is a resilient girl - she won\'t let this defeat her.',
            imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500',
            audioUrl: 'https://api.dictionaryapi.dev/media/pronunciations/en/resilient-us.mp3'
          }
        ]
      }
    }
  });

  console.log('Dang tao du lieu Flashcards...');
  for (let i = 0; i < 5; i++) {
    const fc = await prisma.flashcardReview.create({
      data: {
        userId: students[i].id,
        word: 'Persistence',
        phonetic: '/pəˈsɪstəns/',
        meaning: 'Sự kiên trì',
        definition: 'Firm or obstinate continuance in a course of action in spite of difficulty or opposition.',
        example: 'His persistence finally paid off when he got the job.',
        imageUrl: 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=500',
        audioUrl: 'https://api.dictionaryapi.dev/media/pronunciations/en/persistence-us.mp3',
        intervalDays: 1,
        easeFactor: 2.5
      }
    });
    await prisma.auditLog.create({
      data: { userId: students[i].id, action: 'ADD_FLASHCARD', targetId: fc.id, details: `Them tu moi vao Flashcards: ${fc.word}`, ipAddress: '127.0.0.1' }
    });
  }

  console.log('--- Hoan thanh Seeding EnglishHub (Admin so huu tat ca bai hoc) ---');
}

main()
  .catch((e) => {
    console.error('Loi khi Seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
