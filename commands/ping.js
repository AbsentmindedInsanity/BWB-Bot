module.exports = {
  name: 'ping',
  description: 'Replys with pong, warning bot can be a bit touchy',
  execute(msg, args) {
    var rand = Math.random() * 100;

    if (rand >= 90) {
      msg.reply('You know what? fuck this im out');
      return true;
    }
    msg.reply('pong!');
  },
};
