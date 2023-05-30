// const axios = require('axios');
// const { json } = require('body-parser');
// const router = require('../routes/songRouter');
// let parseString = require('xml2js').parseString;

// module.exports = {
// //searchsong이라는 이름의 비동기 함수를 내보냄
// searchsong: async (req, res) => {
//   const artist = req.body.artist;

//   try {
//     const response = await axios.get('https://www.maniadb.com/api/search/' + artist, {
//       params: {
//         sr: 'artist',
//         display: 10,
//         key: 'example',
//         v: '0.5',
//       },
//     });

//     const xmlData = response.data;

//     const jsonData = await new Promise((resolve, reject) => {
//       parseString(xmlData, (err, result) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(result);
//         }
//       });
//     });

//     const items = jsonData.rss.channel[0].item;


// const songs = jsonData.rss.channel[0].item;
// songs.forEach((item) => {
//   const allSong = item['maniadb:majorsongs'][0];
//   const everySong = allSong.song;
//   everySong.forEach((song) => {
//     res.setHeader('Content-Type', 'application/json');
// res.send(JSON.stringify(song.name));
// res.json(JSON.stringify(song.name));
//   });
// });

//   } catch (error) {
//     console.error('Error:', error);
//   }

// }

// }

const axios = require('axios');
const { json } = require('body-parser');
const router = require('../routes/songRouter');
let parseString = require('xml2js').parseString;

module.exports = {
  searchsong3: async (req, res) => {
    const artist = req.body.artist;

    try {
      const response = await axios.get('https://www.maniadb.com/api/search/' + artist, {
        params: {
          sr: 'artist',
          display: 10,
          key: 'example',
          v: '0.5',
        },
      });

      const xmlData = response.data;

      const jsonData = await new Promise((resolve, reject) => {
        parseString(xmlData, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });

      const items = jsonData.rss.channel[0].item;
      const songs = [];
      
      items.forEach((item) => {
        const allSong = item['maniadb:majorsongs'][0];
        const everySong = allSong.song;
        everySong.forEach((song) => {
          songs.push(song.name);
        });
      });

      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(songs));
      
    } catch (error) {
      console.error('Error:', error);
    }
  }
};