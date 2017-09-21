const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./token.json');

const prefix = 'tcg:';

client.on('ready', () => {
  console.log('[>] I am ready!');
  client.user.setPresence({
    game: {
      name: 'For help: tcg:help',
      type: 0
    }
  });;
});

client.on('message', function(message) {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);

  if (command === 'help') {
    var embed = new Discord.RichEmbed()
      .addField('Commands for TheCoolGamer717 Bot\n',
        '**tcg:ping** Ping Pong!\n' +
        '**tcg:profile** Shows your profile picture!\n' +
        '**tcg:uinfo** It tells you your info.', true)
      .setFooter("TCG Bot 1.0.0 was made by Alee14 & TheCoolGamer717!")
      .setColor('#7af442')
    message.channel.sendEmbed(embed);
  }
  if (command === 'ping') {
    message.reply(':ping_pong: Pong!');
  }
  if (command === 'profile') {
    message.reply(message.author.avatarURL);
  }
  if (command === 'uinfo') {
    var embed = new Discord.RichEmbed()
      .setAuthor(message.author.username, message.author.avatarURL)
      .setThumbnail(message.author.avatarURL)
      .setDescription("Here's your info.")
      .addField("Names", "Username: " + message.author.username + "\nNickname: " + message.member.displayName)
      .addField("Identity", "User ID: " + message.author.id + "\nDiscriminator: " + message.author.discriminator)
      .addField("Create and Join Times", "Created account at: " + message.member.user.createdAt + "\nJoined server at: " + message.member.joinedAt)
      .setColor("#7af442")
    message.channel.sendEmbed(embed);
  }
  if (command === 'eval') {
    if (message.author.id !== config.ownerID) return;
    const clean = text => {
      if (typeof(text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
      else
        return text;
    }
    const argseval = message.content.split(" ").slice(1);
    try {
      var code = argseval.join(" ");
      var evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
      message.delete();

      message.channel.send({
        embed: {
          color: 3191350,
          author: {
            name: "Eval is working!",
            icon_url: message.author.displayAvatarURL
          },
          fields: [{
              name: '**:inbox_tray: Input**',
              value: `\`\`\`js\n${code}\n\`\`\``
            },
            {
              name: '**:outbox_tray: Output**',
              value: `\`\`\`js\n${clean(evaled)}\n\`\`\``
            }
          ],
        }
      })
    } catch (err) {
      message.delete();

      message.channel.send({
        embed: {
          color: 3191350,
          author: {
            name: "Error",
            icon_url: message.author.displayAvatarURL
          },
          fields: [{
              name: '**Please check your code.**',
              value: `\`\`\`xl\n${clean(err)}\n\`\`\``
            },
            {
              name: '**Output**',
              value: `\`\`\`js\n${clean(evaled)}\n\`\`\``
            }
          ],
        }
      })
    }
  }
  if(command === 'pingtime'){
	  message.channel.send("Pong! Response Time: " + client.ping + "mms");
  }

  
  
});

client.login(config.token);
