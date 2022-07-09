require('dotenv').config();
const { Client, Intents, Collection } = require('discord.js');
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
bot.commands = new Collection();
const botCommands = require('./commands');

Object.keys(botCommands).map(key => {
  bot.commands.set(botCommands[key].name, botCommands[key]);
});

const TOKEN = process.env.DISCORD_TOKEN;

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
  bot.user.setActivity(".help")
});

let angry = false;
let baduser;

bot.on('message', msg => {
  if (msg.content.toLowerCase() == "im sorry" || msg.content.toLowerCase() == "i'm sorry"  && angry && msg.guild.members.cache.get(msg.author.id) == baduser) {
    angry = false;
    baduser = null;
    msg.reply("Thank you, im sorry for snapping, things just get really overwheming sometimes");
  }

  if (msg.content.charAt(0) == '.') {

	  const args = msg.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
	  const command = args.shift().toLowerCase();

    if (angry) {
      let user = bot.users.cache.get(baduser);

      msg.reply("When " + user.username +  " apoligizes ill come back");
      return;
    }

    if (command.toLowerCase() == "grigori") {
      msg.reply("Come back with whiskey or dont come back");
    } else if (command.toLowerCase() == "saeval") {
      msg.reply("Got any secrets?");
    } else if (command.toLowerCase() == "holtz") {
      msg.reply("DEMOCRACYYYYYYYYYYYY!!");
    } else if (command.toLowerCase() == "nine") {
      msg.reply("Nine isnt home right now, please leave a message after the beep");
    } else if (command.toLowerCase() == "anguillo") {
      msg.reply("Who do you need removed?");
    } else if (command.toLowerCase() == "emile") {
      msg.reply("Caw caw motherfucker");
    }

    if (!bot.commands.has(command)) {
      //msg.reply('eeeeyy im not programmed here!')
      return;
    };

    console.info(`Called command: ${command}`);

    try {
      let value = bot.commands.get(command).execute(msg, args, botCommands);
      if (value) {
        console.log("ping was mad");
        angry = true;
        baduser = msg.author.id;
      }
    } catch (error) {
      console.error(error);
      msg.reply('there was an error trying to execute that command!');
    }
}
else {}
});
