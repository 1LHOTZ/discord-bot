import 'dotenv/config';
import { Client, GatewayIntentBits } from "discord.js";
import { postTicketPanel, handleTicketInteraction } from "./ticket.js";
import { postWelcome } from "./welcome.js";
import { postRules } from "./rules.js";
import { postVerify } from "./verify.js";

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]
});

// Bot ready
client.once("ready", async () => {
  console.log(`✅ Logged in as ${client.user.tag}`);

  try {
    // Post panels (only once)
    await postTicketPanel(client);
    await postWelcome(client);
    await postRules(client);
    await postVerify(client);
  } catch (err) {
    console.error("Startup error:", err);
  }
});

// ---------- BUTTON HANDLER ----------
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isButton()) return;

  try {
    // Defer reply for safety
    await interaction.deferReply({ ephemeral: true });

    // ---------- WELCOME BUTTON ----------
    if (interaction.customId === "welcome_continue") {
      const rulesChannel = await interaction.guild.channels.fetch(process.env.RULES_CHANNEL_ID);
      return interaction.editReply({
        content: `👉 Please go to <#${rulesChannel.id}>`
      });
    }

    // ---------- RULES BUTTON ----------
    if (interaction.customId === "rules_accept") {
      const verifyChannel = await interaction.guild.channels.fetch(process.env.VERIFY_CHANNEL_ID);
      return interaction.editReply({
        content: `👉 Please go to <#${verifyChannel.id}>`
      });
    }

    // ---------- VERIFY BUTTON ----------
    if (interaction.customId === "verify_user") {
      const role = await interaction.guild.roles.fetch(process.env.MEMBER_ROLE_ID);

      if (interaction.member.roles.cache.has(role.id)) {
        return interaction.editReply({
          content: "ℹ️ You are already verified."
        });
      }

      await interaction.member.roles.add(role);
      return interaction.editReply({
        content: "✅ You are now verified!"
      });
    }

    // ---------- TICKET BUTTONS ----------
    if (interaction.customId.startsWith("ticket_")) {
      return await handleTicketInteraction(interaction);
    }

  } catch (err) {
    console.error("Interaction error:", err);
    if (!interaction.replied) {
      await interaction.reply({ content: "❌ Something went wrong.", ephemeral: true });
    }
  }
});

// Login
client.login(process.env.BOT_TOKEN);
