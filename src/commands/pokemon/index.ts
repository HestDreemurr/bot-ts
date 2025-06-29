import {
  SlashCommandBuilder,
  CommandInteraction,
  ComponentType
} from "discord.js";
import { row } from "./select";

const command = {
  data: new SlashCommandBuilder()
    .setName("pokemon")
    .setDescription("Escolha um pokemon inicial"),
  
  async execute(i: CommandInteraction) {
    const response = await i.reply({
      content: "Escolha seu inicial!",
      components: [row],
      withResponse: true
    });
    
    const collector = response.resource.message.createMessageComponentCollector({ componentType: ComponentType.StringSelect });
    
    collector.on("collect", async selectInteraction => {
      await selectInteraction.reply(`Você selecionou ${selectInteraction.values[0]}!`);
    });
  }
};

export { command };