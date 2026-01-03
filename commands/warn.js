import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('warn')
    .setDescription('Warn a member')
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .addUserOption(option =>
      option.setName('target')
        .setDescription('The member to warn')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('Reason for the warning')
        .setRequired(false)
    ),
  
  async execute(interaction) {
    const target = interaction.options.getMember('target');
    const reason = interaction.options.getString('reason') || 'No reason provided.';

    if (!target) return interaction.reply({ content: '⚠️ Member not found.', ephemeral: true });

    await interaction.reply({ content: `⚠️ ${target.user.tag} has been warned. Reason: ${reason}` });

    try {
      await target.send(`⚠️ You’ve been warned in **${interaction.guild.name}**. Reason: ${reason}`);
    } catch {
      console.log(`Couldn’t DM ${target.user.tag}`);
    }
  },
};
