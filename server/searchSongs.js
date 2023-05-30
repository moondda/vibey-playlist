const axios = require('axios');
const { json } = require('body-parser');
let parseString = require('xml2js').parseString;

//https://www.maniadb.com/api/search/gee/?sr=song&display=10&key=example&v=0.5


async function searchSongbyTitle(title) {
  try {
    const response = await axios.get('https://www.maniadb.com/api/search/' + title, {
      params: {
        sr: 'song',
        display: 10,
        key: 'example',
        v: '0.5'
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
    console.log(JSON.stringify(jsonData));
  }
  catch {
    console.error("Error",error);
  }
}

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

searchSongbyTitle('gee')
  .then(() => {
    console.log('Success!');
  })
  .catch((error) => {
    console.error('Error:', error);
  });