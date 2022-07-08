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
let baduser = '';

bot.on('message', msg => {
  if (msg.content.toLowerCase() == "im sorry" || msg.content.toLowerCase() == "i'm sorry"  && angry && msg.guild.members.cache.get(msg.author.id) == baduser) {
    angry = false;
    baduser = '';
    msg.reply("Thank you, im sorry for snapping, things just get really overwheming sometimes");
  }

  if (msg.content.charAt(0) == '.') {

	  const args = msg.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
	  const command = args.shift().toLowerCase();

    if (!bot.commands.has(command)) {
      //msg.reply('eeeeyy im not programmed here!')
      return;
    };

    if (angry) {
      msg.reply("When " + msg.author.username +  " apoligizes ill come back");
      return;
    }

    console.info(`Called command: ${command}`);

    try {
      let value = bot.commands.get(command).execute(msg, args, botCommands);
      if (value) {
        console.log("ping was mad");
        angry = true;
        baduser = msg.guild.members.cache.get(msg.author.id);
      }
    } catch (error) {
      console.error(error);
      msg.reply('there was an error trying to execute that command!');
    }
}
else {}
});