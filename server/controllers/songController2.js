const axios = require('axios');
const router = require('../routes/songRouter');

module.exports = {
    searchsong: async (req, res) => {
        const searchTerm = req.query.term;

        try {
          const response = await axios.get(`http://itunes.apple.com/search?limit=5&term=${searchTerm}&media=music`);
          const data = response.data.results;
          res.json(data);
        } catch (error) {
          console.error('Error:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      },

    postsong: async(req,res) => {

    }
    

    }

 