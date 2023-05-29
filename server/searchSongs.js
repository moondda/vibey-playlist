// const express = require('express');
// const app = express();
// const axios = require('axios');
// const { json } = require('body-parser');
// const router = require('./routes/songRouter');
// let parseString = require('xml2js').parseString;


// app.get('http://localhost:5000/searchsong', async (req, res) => {
//   const artist = req.query.artist;

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
//     let allSongs = [];
//     items.forEach((item) => {
//       const allSong = item['maniadb:majorsongs'][0];
//       const everySong = allSong.song;
//       everySong.forEach((song) => {
//         allSongs.push({
//           name: song.name[0],
//           artist: song.artist[0],
//         });
//       });
//     });

//     res.json(allSongs);

//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'An error occurred' });
//   }
// });

const axios = require('axios');
const { json } = require('body-parser');
let parseString = require('xml2js').parseString;

async function searchSong(artist) {
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

    // const songs = jsonData.rss.channel[0].item[2]['maniadb:majorsongs'][0];
    const songs = jsonData.rss.channel[0].item;
    songs.forEach((item) => {
      const allSong = item['maniadb:majorsongs'][0];
      const everySong = allSong.song;
      everySong.forEach((song) => {
        console.log(JSON.stringify(song.name));
      });
    });

  } catch (error) {
    console.error('Error:', error);
  }
}

searchSong('소녀시대')
  .then(() => {
    console.log('Success!');
  })
  .catch((error) => {
    console.error('Error:', error);
  });