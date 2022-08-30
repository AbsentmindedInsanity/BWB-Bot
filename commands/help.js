const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Lists commands and descriptions',
    execute(msg, args, botCommands) {
        let keys = Object.keys(botCommands);
        let description = '';
        for(let i = 0; i < keys.length; i++) {
            console.log(botCommands[keys[i]].name);
            description += '\n' + '**Command**: ' + capitalizeFirstLetter(botCommands[keys[i]].name) + '\n' + '**Description**: ' + capitalizeFirstLetter(botCommands[keys[i]].description) +'\n';
        }

        let people = "\nGrigori\nSaeval\nHoltz\nNine\nAnguillo\nEmile\nSeagull\nLovejoy\nBaruke\nBeckon\nHermia\nJackie\nBerthold\nDaeafae\nRachel\n";
        description += '\n' + "**Command:** " + "The Person" + "\n" + "**People**" + "" + people

        const baseEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Bard Bot Commands')
            .setDescription(description)
        
        msg.reply({ embeds: [baseEmbed]});
    },
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  