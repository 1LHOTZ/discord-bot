import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kick a member from the server')
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
    .addUserOption(option =>
      option.setName('target')
        .setDescription('The member to kick')
        .setRequired(true)
    ),
  
  async execute(interaction) {
    const target = interaction.options.getMember('target');
    if (!target) return interaction.reply({ content: '⚠️ Member not found.', ephemeral: true });

    try {
      await target.kick();
      await interaction.reply({ content: `✅ ${target.user.tag} was kicked!` });
    } catch (err) {
      console.error(err);
      await interaction.reply({ content: '❌ I could not kick this member.', ephemeral: true });
    }
  },
};
