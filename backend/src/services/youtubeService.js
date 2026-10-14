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
 * Trich xuat phu de tu YouTube 
 */
export const getYoutubeTranscript = async (videoUrlOrId) => {
  const videoId = extractVideoId(videoUrlOrId);
  console.log(`[YouTube Service] Bat dau trich xuat cho ID: ${videoId}`);

  if (!videoId) {
    console.error("[YouTube Service] Video ID khong hop le");
    return [];
  }

  // PHUONG PHAP 1: youtube-caption-extractor 
  try {
    console.log(`[YouTube Service] Thu cach 1: youtube-caption-extractor (lang: en)...`);
    const subtitles = await getSubtitles({
      videoID: videoId,
      lang: 'en'
    });

    if (subtitles && subtitles.length > 0) {
      console.log(`[YouTube Service] Thanh cong voi cach 1! (${subtitles.length} cau)`);
      return subtitles.map(item => ({
        start: parseFloat(item.start),
        duration: parseFloat(item.dur),
        text: item.text
          .replace(/&amp;/g, '&')
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/>+/g, '') // Xóa >> hoặc >>>
          .replace(/\[[^\]]*\]/g, '') // Xóa [Music], [Laughter], v.v.
          .replace(/\([^)]*\)/g, '') // Xóa (Music), (Laughter), v.v.
          .replace(/\n/g, ' ')
          .trim()
      }));
    }
  } catch (err) {
    console.warn(`[YouTube Service] Cach 1 that bai: ${err.message}`);
  }

  // PHUONG PHAP 2: @danielxceron/youtube-transcript (Du phong)
  const configs = [
    undefined,
    { lang: 'en' },
    { lang: 'en-US' },
    { lang: 'a.en' } // Ma cho phu de tu dong trong youtube-transcript
  ];

  for (const config of configs) {
    try {
      console.log(`[YouTube Service] Thu cach 2 voi config:`, config || 'default');
      const data = await YoutubeTranscript.fetchTranscript(videoId, config);

      if (data && data.length > 0) {
        console.log(`[YouTube Service] Thanh cong voi cach 2!`);
        return data.map(item => ({
          start: item.offset,
          duration: item.duration,
          text: item.text
            .replace(/&amp;/g, '&')
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/>+/g, '') // Xoa cac dau >> hoac >>>
            .replace(/<[^>]*>/g, '')
            .trim()
        }));
      }
    } catch (error) {
      continue;
    }
  }

  console.error(`[YouTube Service] Khong the lay bat ky phu de nao cho video: ${videoId}`);
  return [];
};
