import { REST, Routes } from 'discord.js';
import 'dotenv/config';
import warn from './warn.js';
import kick from './kick.js';

const commands = [
  warn.data.toJSON(),
  kick.data.toJSON(),
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log('🔄 Refreshing slash commands...');

    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands },
    );

    console.log('✅ Slash commands registered globally!');
  } catch (error) {
    console.error(error);
  }
})();
