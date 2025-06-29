import { 
  SlashCommandBuilder,
  EmbedBuilder,
  CommandInteraction
} from "discord.js";

const command = {
  data: new SlashCommandBuilder()
    .setName("embed")
    .setDescription("Testando o envio de embeds"),
  
  async execute(i: CommandInteraction) {
    const exampleEmbed = new EmbedBuilder()
      .setTitle("Embed de Teste")
      .setDescription("Testando o envio de embeds com TypeScript e Discord.js")
      .setColor("#0339fc")
      .setAuthor({ name: "Bot TS", iconURL: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcROLDkJZhvjOipC6s2bt5eNg4piHWh7sblCu83jUAisevZNq08VSUNLuSTYnahHm05cx4AhBwBW-Pai62AuBgje3xiZ5soCZR2OUWBe1g" })
      .setThumbnail("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQawS92blVPPe6Wt-pHMYAgUmTG648xPH3VZk4DoxwGyPbcwmUP0OWtSwg&s=10")
      .addFields(
        { name: "Campo 01", value: "Descrição do campo 01" },
        { name: "\u200B", value: "\u200B" },
        { name: "Campo 02", value: "Descrição do campo 02" },
        { name: "Campo 03", value: "Descrição do campo 03" }
      )
      .setImage("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRphxd9RsT9Sf1FNaSzzPSKKH_woY1G09AF_qVKsOsguYAS62gD6ljLPyk&s=10")
      .setFooter({ text: i.user.username, iconURL: i.user.avatarURL() })
      .setTimestamp();
      
      await i.reply({ embeds: [exampleEmbed] });
  }
};

export { command };