const axios = require("axios");

module.exports = {
  random: async (req, res) => {
    try {
      let track;

      let recommendMusic = [
        "1680524008",
        "1635469851",
        "1680047366",
        "1481229017",
        "1464549844",
        "1031416179",
        "1031416185",
        "1677260541",
        "906620908",
        "1616649362",
        "879281074",
        "1531508507",
        "1574378625",
      ];

      while (true) {
        let trackId = Math.floor(Math.random() * recommendMusic.length);

        // iTunes API에 한 번의 요청으로 1 개의 트랙 음악 검색
        const response = await axios.get(
          `https://itunes.apple.com/lookup?id=${recommendMusic[trackId]}&entity=song`
        );
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
      const trackId = track.trackId;

      // 곡 정보 반환
      res.json({
        trackId,
        trackName,
        artistName,
        artwork,
        previewUrl,
        trackId,
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
