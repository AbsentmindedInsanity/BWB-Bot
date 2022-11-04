module.exports = {
  name: 'ping',
  description: 'Replys with pong, warning bot can be a bit touchy',
  execute(msg, args) {
    var rand = Math.random() * 100;

    if (msg.guild.members.cache.get(msg.author.id) == 245024147674103809 && rand >= 50) {
      msg.reply('I am *pretty* sure you are trying to anagonize me, but sure. Pong!')

      if (rand >= 90) {
        msg.reply('You know what nevermind. Fuck this im out, not going to deal with this today.');
        return true;
      }

    } else {
      if (rand >= 90) {
        msg.reply('You know what? fuck this im out');
        return true;
      }

      msg.reply('pong!');
    }
    return;
  },
};

//245024147674103809
