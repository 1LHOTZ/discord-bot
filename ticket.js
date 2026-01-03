import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, PermissionFlagsBits } from "discord.js";

// ---------- POST TICKET PANEL ----------
export async function postTicketPanel(client) {
  const guild = client.guilds.cache.first();
  if (!guild) return console.log("⚠️ No guild found");

  const channel = guild.channels.cache.find(
    ch => ch.isTextBased() && ch.name.toLowerCase().includes("support")
  );

  if (!channel) {
    console.log("⚠️ Ticket channel not found");
    return;
  }

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId("ticket_open")
      .setLabel("🎫 Open Ticket")
      .setStyle(ButtonStyle.Primary)
  );

  await channel.send({
    content: "Click the button below to open a support ticket.",
    components: [row]
  });
  console.log("✅ Ticket panel sent");
}

// ---------- HANDLE TICKET BUTTONS ----------
export async function handleTicketInteraction(interaction) {
  const guild = interaction.guild;

  // OPEN TICKET
  if (interaction.customId === "ticket_open") {
    // Check if user already has a ticket
    const existing = guild.channels.cache.find(
      c => c.name === `ticket-${interaction.user.username.toLowerCase()}`
    );

    if (existing) {
      return interaction.editReply({ content: `💬 You already have a ticket: <#${existing.id}>` });
    }

    // Create new ticket channel
    const ticketChannel = await guild.channels.create({
      name: `ticket-${interaction.user.username}`.toLowerCase(),
      type: ChannelType.GuildText,
      parent: process.env.TICKET_CATEGORY_ID || undefined,
      permissionOverwrites: [
        { id: guild.id, deny: [PermissionFlagsBits.ViewChannel] },
        { id: interaction.user.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages] },
        { id: interaction.client.user.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ManageChannels] }
      ]
    });

    const closeRow = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("ticket_close")
        .setLabel("🔒 Close Ticket")
        .setStyle(ButtonStyle.Danger)
    );

    await ticketChannel.send({
      content: `👋 Hello ${interaction.user}, click below to close this ticket.`,
      components: [closeRow]
    });

    return interaction.editReply({ content: `✅ Ticket created: <#${ticketChannel.id}>` });
  }

  // CLOSE TICKET
  if (interaction.customId === "ticket_close") {
    await interaction.editReply({ content: "🔒 Closing ticket in 5 seconds..." });
    setTimeout(() => {
      interaction.channel.delete().catch(() => {});
    }, 5000);
  }
}
