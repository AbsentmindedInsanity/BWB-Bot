module.exports = {
    name: 'crowlove',
    description: 'Who *doesnt* love a crow?',
    execute(msg, args) {
        const axios = require('axios');

        const options = {
            hostname: 'api.giphy.com',
            path: '/v1/gifs/search?api_key=iS1pKK8SDpNbNupk17wGn4KQCJyP15ly&q=bird&limit=1&offset=0&rating=r&lang=en',
            method: 'GET'
        }
        
        let data;

        axios
            .get('https://api.giphy.com/v1/gifs/search?api_key=iS1pKK8SDpNbNupk17wGn4KQCJyP15ly&q=crow&limit=20&offset=0&rating=pg13&lang=en')
            .then(res => {

                let rand = Math.floor(Math.random() * 19);
                console.log(rand)

                if(rand == 8 || rand == 1 || rand == 17) {
                    rand = 15;
                }

                if (rand == 11 || rand == 9 || rand == 16) {
                    rand = 0;
                }

                if(rand == 10 || rand == 7 || rand == 12) {
                    rand = 18;
                }

                if (args[0]) {
                    data = res.data.data[args[0]];
                } else {
                    data = res.data.data[rand];
                }

                


                msg.reply(data.embed_url);
            }); 

    },
  };