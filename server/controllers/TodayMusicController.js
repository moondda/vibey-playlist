const axios = require('axios');

module.exports = {
    random: async (req, res) => {
        try {
            const trackIds = [];
            const numOfMusic = 3;
            const minTrackId = 1;
            const maxTrackId = 1999999999;
            let fetchedMusic = 0;
    
            // 트랙 ID에 할당된 음악이 numOfMusic 개수 이상이 될 때까지 검색
            while (fetchedMusic < numOfMusic) {
                const trackId = getRandomInt(minTrackId, maxTrackId);
                const response = await axios.get(`https://itunes.apple.com/lookup?id=${trackId}`);
                const data = response.data.results;
    
                // kind가 "song"이고 wrapperType이 "track"인 음악만 추가
                const filteredData = data.filter(item => item.wrapperType === 'track' && item.kind === 'song');
                if (filteredData.length > 0) {
                    trackIds.push(trackId);
                    fetchedMusic++;
                }
            }
    
            // trackIds 배열을 콤마로 구분하여 쿼리 스트링 생성
            const query = trackIds.join(',');
    
            // iTunes API에 한 번의 요청으로 numOfMusic 개의 트랙 음악 검색
            const response = await axios.get(`https://itunes.apple.com/lookup?id=${query}`);
            const data = response.data.results;
    
            // kind가 "song"인 정보만 필터링하여 filteredData에 저장
            const filteredData = data.filter(item => item.wrapperType === 'track' && item.kind === 'song');
    
            // numOfMusic 개의 랜덤한 팝 음악 반환
            res.json(filteredData.slice(0, numOfMusic));
    
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
}

// 최소값과 최대값 사이에서 무작위 정수를 반환하는 함수
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
