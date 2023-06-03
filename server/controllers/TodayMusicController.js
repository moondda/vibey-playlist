const axios = require('axios');

module.exports = {
  random: async (req, res) => {
    try {
      let track;
      let trackId;

      while (true) {
        trackId = Math.floor(Math.random() * 1000000000) + 1;

        // iTunes API에 한 번의 요청으로 1 개의 트랙 음악 검색
        const response = await axios.get(`https://itunes.apple.com/lookup?id=${trackId}&entity=song`);
        const data = response.data;

        if (data.results && data.results.length === 1) {
          track = data.results[0];
          break;
        }
      }

      const trackName = track.trackName;
      const artistName = track.artistName;
      const artwork = track.artworkUrl100;
      const previewUrl = track.previewUrl;

      // 곡 정보 반환
      res.json({
        trackName,
        artistName,
        artwork,
        previewUrl
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};