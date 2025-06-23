import { SlashCommandBuilder, CommandInteraction } from "discord.js";

const command = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Responde com Pong!"),
  async execute(interaction: CommandInteraction) {
    await interaction.reply("Pong!");
  }
};

export { command };