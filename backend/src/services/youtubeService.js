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

const createZenRowsUrl = (url, apiKey, useCustomHeaders = false) => {
  const requestUrl = new URL('https://api.zenrows.com/v1/');
  requestUrl.searchParams.set('apikey', apiKey);
  requestUrl.searchParams.set('url', url);
  requestUrl.searchParams.set('premium_proxy', 'true');
  if (useCustomHeaders) requestUrl.searchParams.set('custom_headers', 'true');
  return requestUrl;
};

const fetchWithZenRows = async (url, apiKey, options = {}) => {
  const requestUrl = createZenRowsUrl(url, apiKey, Boolean(options.headers));
  const response = await fetch(requestUrl, {
    ...options,
    signal: AbortSignal.timeout(60000)
  });
  if (!response.ok) {
    throw new Error(`ZenRows request failed with status ${response.status}`);
  }

  return response.text();
};

const getTranscriptWithZenRows = async (videoId) => {
  const apiKey = process.env.ZENROWS_API_KEY;
  if (!apiKey) return [];

  console.log('[YouTube Service] Thu phuong an du phong ZenRows...');
  const client = {
    name: 'IOS',
    version: '20.10.4',
    header: '5',
    userAgent: 'com.google.ios.youtube/20.10.4 (iPhone16,2; U; CPU iOS 18_3_2 like Mac OS X;)',
    context: {
      deviceMake: 'Apple',
      deviceModel: 'iPhone16,2',
      platform: 'MOBILE',
      osName: 'iOS',
      osVersion: '18.3.2.22D82'
    }
  };
  const playerResponseText = await fetchWithZenRows(
    'https://youtubei.googleapis.com/youtubei/v1/player?prettyPrint=false',
    apiKey,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        'User-Agent': client.userAgent,
        'X-YouTube-Client-Name': client.header,
        'X-YouTube-Client-Version': client.version,
        Origin: 'https://www.youtube.com'
      },
      body: JSON.stringify({
        context: {
          client: {
            clientName: client.name,
            clientVersion: client.version,
            hl: 'en',
            gl: 'US',
            ...client.context
          },
          user: { lockedSafetyMode: false },
          request: { useSsl: true }
        },
        videoId,
        contentCheckOk: true,
        racyCheckOk: true
      })
    }
  );
  const playerResponse = JSON.parse(playerResponseText);
  const captionTracks = playerResponse?.captions?.playerCaptionsTracklistRenderer?.captionTracks || [];
  const englishTracks = captionTracks
    .filter(track => /^en(?:-|$)/i.test(track.languageCode || ''))
    .sort((a, b) => {
      const priority = track => track.vssId === '.en' ? 0 : track.vssId === 'a.en' ? 1 : 2;
      return priority(a) - priority(b);
    });
  const seenTrackUrls = new Set();

  for (const track of englishTracks) {
    if (!track.baseUrl || seenTrackUrls.has(track.baseUrl)) continue;
    seenTrackUrls.add(track.baseUrl);

    const captionUrl = new URL(track.baseUrl);
    captionUrl.searchParams.set('fmt', 'json3');
    const captionData = await fetchWithZenRows(captionUrl.toString(), apiKey);
    const events = JSON.parse(captionData).events || [];
    const subtitles = events.flatMap(event => {
      const text = (event.segs || []).map(segment => segment.utf8 || '').join('');
      if (!text.trim() || event.tStartMs == null) return [];

      return [{
        start: Number(event.tStartMs) / 1000,
        dur: Number(event.dDurationMs || 0) / 1000,
        text
      }];
    });

    if (subtitles.length > 0) return subtitles;
  }

  return [];
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

  if (rawSubtitles.length === 0 && process.env.ZENROWS_API_KEY) {
    try {
      rawSubtitles = await getTranscriptWithZenRows(videoId);
    } catch (error) {
      console.warn(`[YouTube Service] ZenRows that bai: ${error.message}`);
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
