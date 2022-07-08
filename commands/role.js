module.exports = {
    name: 'role',
    description: 'Give a user a role!',
    execute(msg, args) {
        let roleName = args.join(' ');
        roleName.trimEnd();

        if (!roleName) {
            msg.reply('Please give a role to add');
            return;
        }

        if (roleName) {
            if (roleName.toLowerCase() == 'agent' || roleName.toLowerCase() == 'affiliate') {
            }else {
                msg.reply("No available role matches your request");
                return;
            }
        }

        let role = msg.guild.roles.cache.find((role) => {
            return role.name == roleName;
        });

        if (!role) {
            role = msg.guild.roles.cache.find((role) => {
                return role.name == capitalizeFirstLetter(roleName);
            });

            if(!role) {
                msg.reply("No role found with that name");
                return;
            }
        }

        let user = msg.guild.members.cache.get(msg.author.id);
        user.roles.add(role);

        msg.reply('Role added!');
    },
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }