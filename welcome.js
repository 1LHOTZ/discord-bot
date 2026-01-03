<<<<<<< HEAD
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";
import fs from "fs";
import path from "path";

const postedFile = path.resolve("./.welcomePosted");

export async function postWelcome(client) {
  if (fs.existsSync(postedFile)) return;

  const welcomeChannel = await client.channels.fetch("1429626923922755776");

  const embed = new EmbedBuilder()
    .setTitle("🌱 Welcome to LHOTZ!")
    .setDescription(
      "Welcome to LHOTZ 🌿\n" +
      "You’ve just stepped into a space where style meets courage. At LHOTZ, we take risks with fashion and turn bold ideas into statements.\n" +
      "\n" +
      "🧵 Explore new drops\n" +
      "\n" +
      "🔥 Connect with the culture\n" +
      "\n" +
      "🖤 Wear the story\n" +
      "\n" +
      "**No Risk No Story.**\n" +
      "\n" +
      "**Please make sure you’re verified to unlock the full server experience.**"
    )
    .setColor("Green");

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId("welcome_continue")
      .setLabel("➡️ Proceed to Verification")
      .setStyle(ButtonStyle.Primary)
  );

  await welcomeChannel.send({ embeds: [embed], components: [row] });
  fs.writeFileSync(postedFile, "posted");
  console.log("✅ Welcome message posted!");
}
=======
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";
import fs from "fs";
import path from "path";

const postedFile = path.resolve("./.welcomePosted");

export async function postWelcome(client) {
  if (fs.existsSync(postedFile)) return;

  const welcomeChannel = await client.channels.fetch("1429626923922755776");

  const embed = new EmbedBuilder()
    .setTitle("🌱 Welcome to LHOTZ!")
    .setDescription(
      "Welcome to LHOTZ 🌿\n" +
      "You’ve just stepped into a space where style meets courage. At LHOTZ, we take risks with fashion and turn bold ideas into statements.\n" +
      "\n" +
      "🧵 Explore new drops\n" +
      "\n" +
      "🔥 Connect with the culture\n" +
      "\n" +
      "🖤 Wear the story\n" +
      "\n" +
      "**No Risk No Story.**\n" +
      "\n" +
      "**Please make sure you’re verified to unlock the full server experience.**"
    )
    .setColor("Green");

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId("welcome_continue")
      .setLabel("➡️ Proceed to Verification")
      .setStyle(ButtonStyle.Primary)
  );

  await welcomeChannel.send({ embeds: [embed], components: [row] });
  fs.writeFileSync(postedFile, "posted");
  console.log("✅ Welcome message posted!");
}
>>>>>>> b8da2ce65e16a991abb6163370407e008afdfb08
