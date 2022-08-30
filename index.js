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

bot.on('guildMemberAdd', member => {
  member.send("Check the primer in the pinned comment in this channel for the general sitch, add your character to Roll-Call if you want to be a Bard. Make sure to change your name to the format and heck yeah");
});

bot.on('message', msg => {
  if (msg.content.toLowerCase() == "im sorry" || msg.content.toLowerCase() == "i'm sorry" || msg.content.toLowerCase() == "i'm sorry." || msg.content.toLowerCase() == "im sorry." && angry && msg.guild.members.cache.get(msg.author.id) == baduser) {
    angry = false;
    baduser = null;
    msg.reply("Thank you, im sorry for snapping, things just get really overwheming sometimes");
  }

  if (msg.content.toLowerCase() == "we love you barb" || msg.content.toLowerCase() == "i love barb" || msg.content.toLowerCase() == "i love barb." || msg.content.toLowerCase() == "we love you barb." ) {
    msg.reply("Thank you!! I love you too!");
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
    } else if (command.toLowerCase() == "seagull") {
      msg.reply("Hi Seagull, im Sean!");
    }else if (command.toLowerCase() == "lovejoy") {
      var rand = Math.floor(Math.random() * 2)

      if (rand == 1) {
        msg.reply("Keep your eyes shut and remember");
      } else if (rand == 0) {
        msg.reply(":sparkling_heart: War & Peace :sparkling_heart:");
      }

    }else if (command.toLowerCase() == "baruke") {
      msg.reply("<:hornyLovejoy:992238540324872262>");
    }else if (command.toLowerCase() == "beckon") {
      msg.reply(":handshake: It is a pleasure to make your acquaintance");
    }else if (command.toLowerCase() == "hermia") {
      msg.reply("FIGHT or DIE");
    }else if (command.toLowerCase() == "jackie") {
      msg.reply("WE ARE THE TIDE");
    }else if (command.toLowerCase() == "berthold") {
      msg.reply("Please not the accounts, no hands OFF that ledger!!");
    }else if (command.toLowerCase() == "daeafae") {
      msg.reply("Curiosity CAN kill, though not always the curious");
    }else if (command.toLowerCase() == "nurse") {
      msg.channel.send("<@254782820017242124>")
    }else if (command.toLowerCase() == "rachel") {
      msg.reply(":raccoon:");
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
