import { YoutubeTranscript } from '@danielxceron/youtube-transcript';
import { getSubtitles } from 'youtube-caption-extractor';

/**
 * Trich xuat Video ID tu moi loai link YouTube (Standard, Short, Mobile, Embed)
 */
export const extractVideoId = (url) => {
  if (!url) return null;
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const match = url.match(regex);
  const id = match ? match[1] : url.trim();
  return (id && id.length === 11) ? id : null;
};

/**
 * Format giay thanh chuoi mm:ss hoac hh:mm:ss
 */
const formatDuration = (seconds) => {
  if (!seconds || isNaN(seconds)) return "00:00";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  if (h > 0) {
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

/**
 * Trich xuat phu de tu YouTube
 */
export const getYoutubeTranscript = async (videoUrlOrId) => {
  const videoId = extractVideoId(videoUrlOrId);
  console.log(`[YouTube Service] Bat dau trich xuat cho ID: ${videoId}`);

  if (!videoId) {
    console.error("[YouTube Service] Video ID khong hop le");
    return { transcript: [], duration: "00:00" };
  }

  let rawSubtitles = [];

  // PHUONG PHAP 1: youtube-caption-extractor 
  try {
    console.log(`[YouTube Service] Thu cach 1: youtube-caption-extractor (lang: en)...`);
    const subtitles = await getSubtitles({
      videoID: videoId,
      lang: 'en'
    });

    if (subtitles && subtitles.length > 0) {
      rawSubtitles = subtitles.map(item => ({
        start: parseFloat(item.start),
        dur: parseFloat(item.dur),
        text: item.text
      }));
    }
  } catch (err) {
    console.warn(`[YouTube Service] Cach 1 that bai: ${err.message}`);
  }

  // PHUONG PHAP 2: @danielxceron/youtube-transcript (Du phong)
  if (rawSubtitles.length === 0) {
    const configs = [undefined, { lang: 'en' }, { lang: 'en-US' }, { lang: 'a.en' }];
    for (const config of configs) {
      try {
        const data = await YoutubeTranscript.fetchTranscript(videoId, config);
        if (data && data.length > 0) {
          rawSubtitles = data.map(item => ({
            start: item.offset / 1000, // Neu la ms thi chia 1000, tuy thu vien. YoutubeTranscript thuong tra ve giay
            dur: item.duration / 1000,
            text: item.text
          }));
          // Fix: YoutubeTranscript doi khi tra ve giay truc tiep
          if (rawSubtitles[0].start > 10000) {
             rawSubtitles = data.map(item => ({ start: item.offset / 1000, dur: item.duration / 1000, text: item.text }));
          } else {
             rawSubtitles = data.map(item => ({ start: item.offset, dur: item.duration, text: item.text }));
          }
          break;
        }
      } catch (error) { continue; }
    }
  }

  if (rawSubtitles.length > 0) {
    // Tinh duration tong: thoi gian bat dau cau cuoi + do dai cau cuoi
    const lastItem = rawSubtitles[rawSubtitles.length - 1];
    const totalSeconds = lastItem.start + (lastItem.dur || 0);
    const formattedDuration = formatDuration(totalSeconds);

    const cleanTranscript = rawSubtitles.map(item => ({
      start: item.start,
      duration: item.dur,
      text: item.text
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/>+/g, '')
        .replace(/\[[^\]]*\]/g, '')
        .replace(/\([^)]*\)/g, '')
        .replace(/\n/g, ' ')
        .trim()
    }));

    return { transcript: cleanTranscript, duration: formattedDuration };
  }

  console.error(`[YouTube Service] Khong the lay bat ky phu de nao cho video: ${videoId}`);
  return { transcript: [], duration: "00:00" };
};
