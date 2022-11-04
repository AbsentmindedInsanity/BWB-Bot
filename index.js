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

  BarbPersonality(msg);

  if (msg.content.charAt(0) == '.') {

	  const args = msg.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
	  const command = args.shift().toLowerCase();

    if (angry) {
      let user = bot.users.cache.get(baduser);

      msg.reply("When " + user.username +  " apoligizes ill come back");
      return;
    }

    CharacterResponses(msg, command);

    if (!bot.commands.has(command)) {
      return;
    };

    console.info(`Called command: ${command}`);

    try {
      let value = bot.commands.get(command).execute(msg, args, botCommands);
      if (value && !angry) {
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


function BarbPersonality(msg) {
  if ((msg.content.toLowerCase() == "im sorry" || msg.content.toLowerCase() == "i'm sorry" || msg.content.toLowerCase() == "i'm sorry." || msg.content.toLowerCase() == "im sorry.") && angry && msg.guild.members.cache.get(msg.author.id) == baduser) {
    console.log(angry)
    console.log(msg.guild.members.cache.get(msg.author.id) == baduser)
    
    angry = false;
    baduser = null;
    msg.reply("Thank you, im sorry for snapping, things just get really overwheming sometimes");
  }

  if (msg.content.toLowerCase() == "we love you barb" || msg.content.toLowerCase() == "i love barb" || msg.content.toLowerCase() == "i love barb." || msg.content.toLowerCase() == "we love you barb." || msg.content.toLowerCase() == "i love you barb" ) {
    msg.reply("Thank you!! I love you too!");
  }
}

function CharacterResponses(msg, command) {
  if (command.toLowerCase() == "grigori") {
    msg.reply("Come back with whiskey or dont come back");
  } else if (command.toLowerCase() == "saeval") {
    msg.reply("Got any secrets?");
  } else if (command.toLowerCase() == "holtz") {
    msg.reply("DEMOCRACYYYYYYYYYYYY!!");
  } else if (command.toLowerCase() == "nine") {
    msg.reply("Nine isnt home right now, please leave a message after the beep");
  } else if (command.toLowerCase() == "anguillo") {
    msg.reply(":anguillocat: *gay judgment* :anguillocat: ");
  } else if (command.toLowerCase() == "emile") {
    msg.reply("Caw caw motherfucker");
  } else if (command.toLowerCase() == "seagull") {
    msg.reply("Hi Seagull, im Sean!");
  } else if (command.toLowerCase() == "lovejoy") {
    var rand = Math.floor(Math.random() * 2)

    if (rand == 1) {
      msg.reply("Keep your eyes shut and remember");
    } else if (rand == 0) {
      msg.reply(":sparkling_heart: War & Peace :sparkling_heart:");
    }

  } else if (command.toLowerCase() == "baruke") {
    msg.reply("<:hornyLovejoy:992238540324872262>");
  } else if (command.toLowerCase() == "beckon") {
    msg.reply(":handshake: It is a pleasure to make your acquaintance");
  } else if (command.toLowerCase() == "hermia") {
    var rand = Math.floor(Math.random() * 2)

    if (rand == 1) {
      msg.reply("FIGHT or DIE");
    } else if (rand == 0) {
      msg.reply("HELLOOOOO NURSE!!");
    }
  } else if (command.toLowerCase() == "jackie") {
    msg.reply("WE ARE THE TIDE");
  } else if (command.toLowerCase() == "berthold") {
    msg.reply("Please not the accounts, no hands OFF that ledger!!");
  } else if (command.toLowerCase() == "daeafae") {
    msg.reply("Mischief and chaos = fun times");
  } else if (command.toLowerCase() == "nurse") {
    msg.channel.send("<@254782820017242124>")
  } else if (command.toLowerCase() == "rachel") {
    msg.reply(":raccoon:");
  } else if (command.toLowerCase() == "lorna") {
    msg.reply("Damn, you *really* pissed off your Emissary, its literally flipping you off right now");
  } else if (command.toLowerCase() == "melody") {
    msg.reply("You humans *must* really enjoy this dying thing, its ***so*** hard to stay in character!");
  } else if (command.toLowerCase() == "molly") {
    msg.reply("Did you hear?!?! I killed a ***DRAGON***!!!");
  } else if (command.toLowerCase() == "alastair") {
    var rand = Math.floor(Math.random() * 2)

    if (rand == 1) {
      msg.reply("What is the *point* of doing a thing if you cant do it with some flair? Sounds downright boring");
    } else if (rand == 0) {
      msg.reply("A is for Awesome \nL is for lovely \nA is now for Amazing\nS is for simply brilliant\nT is for... tremendously charming\nA is for... awesomer?\nI is for...\n\nYou know what, you get the point.");
    }
  } else if (command.toLowerCase() == "jasper") {
    var rand = Math.floor(Math.random() * 2)

    if (rand == 1) {
      msg.reply("The DEFINITION of 'If looks could kill'");
    } else if (rand == 0) {
      msg.reply("#gothbirdboy");
    }
  } else if (command.toLowerCase() == "eleanor") {
    msg.reply("You DARE impugn MY ***HONOR***?!?!");
  } 
}