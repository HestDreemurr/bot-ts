import {
  SlashCommandBuilder,
  CommandInteraction
} from "discord.js";

const command = {
  data: new SlashCommandBuilder()
    .setName("jokenpo")
    .setDescription("Escolha pedra, papel ou tesoura!")
    .addStringOption(option => 
      option
        .setName("escolha")
        .setDescription("Sua escolha")
        .setRequired(true)
        .addChoices(
          { name: "Pedra", value: "Pedra" },
          { name: "Papel", value: "Papel" },
          { name: "Tesoura", value: "Tesoura" }
        )
    ),
    
  async execute(i: CommandInteraction) {
    const choice = i.options.getString("escolha");
    
    await i.reply(`Você escolheu: ${choice}`);
  }
};

export { command };