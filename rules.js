import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import fs from "fs";
import path from "path";

const postedFlag = path.resolve("./.rulesPosted");

export async function postRules(client) {
  const channelId = "1428520594403491922"; // #rules channel
  const channel = await client.channels.fetch(channelId).catch(() => null);
  if (!channel) return console.error("⚠️ Rules channel not found.");

  // 🧹 1. Delete old bot messages
  const messages = await channel.messages.fetch({ limit: 20 }).catch(() => null);
  if (messages) {
    const botMessages = messages.filter(m => m.author.id === client.user.id);
    for (const msg of botMessages.values()) await msg.delete().catch(() => {});
  }

  // 📌 2. Unpin older rule messages
  const pinned = await channel.messages.fetchPinned().catch(() => null);
  if (pinned) {
    const oldPins = pinned.filter(m => m.author.id === client.user.id);
    for (const pin of oldPins.values()) {
      await pin.unpin().catch(() => {});
    }
  }

  // 🌿 3. Build updated embed
  const embed = new EmbedBuilder()
    .setColor("#57F287")
    .setTitle("📜 LHOTZ Community Rules")
    .setDescription(
      `
Welcome to **LHOTZ** 🌱 — a global community promoting sustainable, efficient, and smart way of fashion for everyone.

Before joining the chat, make sure you understand and agree to these:

---

### 🌿 1. Be Respectful  
Treat everyone kindly. Harassment, hate speech, or discrimination of any form is not tolerated.

### 💬 2. Stay on Topic  
Keep discussions related to agriculture, eco-tech, sustainability, or relevant innovation.

### 🚫 3. No Spam or Self-Promotion  
Don’t post links, ads, or unrelated content without staff approval.

### 🌾 4. Keep It Educational  
Support learning and collaboration. Avoid drama, trolling, or off-topic debates.

### 🔒 5. Protect Privacy  
Don’t share your or anyone’s personal information — safety first.

### ⚖️ 6. Respect Moderators  
Follow staff guidance. They help keep this place positive and safe.

---

Once you’ve read through everything, click the button below to finish verification and access the community.
      `
    )
    .setFooter({ text: "LHOTZ Moderation • Together We Grow 🌱" });

  // ✅ 4. Add verification button
  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId("rules_accept")
      .setLabel("✅ Finish Verification")
      .setStyle(ButtonStyle.Success)
  );

  // ✉️ 5. Send, then pin the message
  const sent = await channel.send({ embeds: [embed], components: [row] });

  await sent.pin().catch(() => console.warn("⚠️ Couldn't pin rules message (check permissions)."));

  // 🗂 6. Mark as posted
  fs.writeFileSync(postedFlag, "posted");
  console.log("✅ Rules embed posted, cleaned up, and pinned to top (old pins cleared).");
}
