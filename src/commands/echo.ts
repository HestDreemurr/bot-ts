import {
  SlashCommandBuilder,
  MessageFlags,
  CommandInteraction,
  ApplicationCommandOption
} from "discord.js";

const command = {
  data: new SlashCommandBuilder()
    .setName("echo")
    .setDescription("Faça o bot dizer algo!")
    .addStringOption((option: ApplicationCommandOption) => 
      option
        .setName("mensagem")
        .setDescription("Mensagem a ser enviada")
        .setRequired(true)
    )
    .addChannelOption((option: ApplicationCommandOption) =>
      option
        .setName("canal")
        .setDescription("Canal onde a mensagem será enviada")
    ),
  
  async execute(i: CommandInteraction) {
    const message = i.options.getString("mensagem");
    const channel = i.options.getChannel("canal") ?? i.channel;
    
    await channel.send(message);
    await i.reply({
      content: ":white_check_mark: | Mensagem enviada com sucesso!",
      flags: MessageFlags.Ephemeral
    });
  }
};

export { command };