const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'bird',
    description: 'b i r d',
    execute(msg, args) {
        const axios = require('axios');

        const options = {
            hostname: 'api.giphy.com',
            path: '/v1/gifs/search?api_key=iS1pKK8SDpNbNupk17wGn4KQCJyP15ly&q=bird&limit=1&offset=0&rating=r&lang=en',
            method: 'GET'
        }
        
        let data;

        axios
            .get('https://api.giphy.com/v1/gifs/search?api_key=iS1pKK8SDpNbNupk17wGn4KQCJyP15ly&q=bird&limit=20&offset=0&rating=r&lang=en')
            .then(res => {

                let rand = Math.floor(Math.random() * 19);

                data = res.data.data[rand];


                msg.reply(data.embed_url);
            }); 

    },
  };