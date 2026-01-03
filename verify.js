import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";
import fs from "fs";
import path from "path";

const postedFile = path.resolve("./.verifyPosted");

export async function postVerify(client) {
  if (fs.existsSync(postedFile)) return;

  const verifyChannel = await client.channels.fetch("1428531042092056819");

  const embed = new EmbedBuilder()
    .setTitle("🌿 Welcome to LHOTZ!")
    .setDescription(
      "At **LHOTZ**, we take risk with fashion and give you a desire of clothing varieties, anywhere — **No Risk No Story**.\n\n" +
      "Click below to **verify** that you’re human and get started on your journey."
    )
    .setColor("Green");

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId("verify_user")
      .setLabel("✅ Verify Me")
      .setStyle(ButtonStyle.Success)
  );

  await verifyChannel.send({ embeds: [embed], components: [row] });
  fs.writeFileSync(postedFile, "posted");
  console.log("✅ Verify button posted!");
}
