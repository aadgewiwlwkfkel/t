const Discord = require('discord.js');
const client = new Discord.Client();
const disbut = require('discord-buttons')(client);
const inlinereply = require('discord-reply');
const {
  Client,
  MessageEmbed,
  Collection,
  Guild,
  Intents
} = require('discord.js');
const fs = require('fs');
let { readdirSync } = require('fs');
const config = require('./config.js');
client.config = config;
client.commands = new Collection();

require('dotenv').config();
const keepAlive = require('./server.js');

keepAlive();

client.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync('./comandos')
  .filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./comandos/${file}`);
  client.commands.set(command.name, command);
}

client.slashcommands = new Discord.Collection();
const slashcommandsFiles = fs
  .readdirSync('./slashcmd')
  .filter(file => file.endsWith('js'));

for (const file of slashcommandsFiles) {
  const slash = require(`./slashcmd/${file}`);
  client.slashcommands.set(slash.data.name, slash);
}

// This code is made by vykg#7777

//asd
client.on('ready', message => {
  const array = [
    {
      name: 'Bots Status.',
      type: 'WATCHING'
    },
    {
      name: 'Bots Status..',
      type: 'WATCHING'
    },
    {
      name: 'Bots Status...',
      type: 'WATCHING'
    }
  ];

  setInterval(() => {
    function presence() {
      client.user.setPresence({
        status: 'dnd',
        activity: array[Math.floor(Math.random() * array.length)]
      });
    }

    presence();
  }, 2000);
  console.log(`${client.user.tag} ✅`);
});
  
client.on('message', async message => {
  let prefix = config.prefix;

  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.content.startsWith(prefix)) return;
  if (!message.member)
    message.member = await message.guild.fetchMember(message);

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();

  let cmd = client.commands.find(
    c => c.name === command || (c.alias && c.alias.includes(command))
  );

  if (cmd) {
    cmd.execute(message, client, args);
  }
});
client.login(require('./config.js').token);
  