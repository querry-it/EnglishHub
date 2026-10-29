const MAX_AUDIO_BASE64_LENGTH = 1_400_000;

export const assessPronunciation = async (req, res) => {
  const { audioBase64, sampleRate } = req.body || {};

  if (typeof audioBase64 !== 'string' || !audioBase64 || audioBase64.length > MAX_AUDIO_BASE64_LENGTH) {
    return res.status(400).json({
      success: false,
      message: 'Bản ghi không hợp lệ hoặc quá dài. Hãy thử đọc một câu ngắn hơn.'
    });
  }

  if (!Number.isInteger(sampleRate) || sampleRate !== 16000) {
    return res.status(400).json({
      success: false,
      message: 'Audio phải được chuyển về tần số lấy mẫu 16 kHz.'
    });
  }

  const serviceUrl = process.env.PRONUNCIATION_SERVICE_URL || 'http://127.0.0.1:8001';
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 60_000);

  try {
    const serviceResponse = await fetch(`${serviceUrl}/assess`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ audioBase64, sampleRate }),
      signal: controller.signal
    });
    const result = await serviceResponse.json();

    if (!serviceResponse.ok) {
      return res.status(serviceResponse.status).json({
        success: false,
        message: result.detail || 'Không thể đánh giá bản ghi.'
      });
    }

    return res.json({ success: true, data: result });
  } catch (error) {
    console.error('Pronunciation assessment service error:', error);
    return res.status(503).json({
      success: false,
      message: error.name === 'AbortError'
        ? 'Dịch vụ chấm phát âm phản hồi quá lâu. Hãy thử lại.'
        : 'Dịch vụ chấm phát âm chưa chạy. Hãy khởi động Python model service.'
    });
  } finally {
    clearTimeout(timeout);
  }
};
