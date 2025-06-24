import {
  SlashCommandBuilder,
  MessageFlags,
  CommandInteraction
} from "discord.js";
import { setTimeout as wait } from "node:timers/promises";

const THREE_SECONDS = 3000;

const command = {
  data: new SlashCommandBuilder()
    .setName("reply")
    .setDescription("Métodos de resposta."),
    
  async execute(i: CommandInteraction) {
    await i.reply("Essa é a resposta principal!");
    
    await wait(THREE_SECONDS);
    
    await i.editReply("Resposta principal editada.");
    
    await i.followUp({
      content: "Mensagem adicional secreta.",
      flags: MessageFlags.Ephemeral
    });
    
    await i.deleteReply();
  }
};

export { command };