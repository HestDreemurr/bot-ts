import { 
  SlashCommandBuilder,
  CommandInteraction,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  PermissionFlagsBits
} from "discord.js";

const ONE_MINUTE = 60000;

const command = {
  data: new SlashCommandBuilder()
    .setName("banir")
    .setDescription("Banir um usuário do servidor")
    .addUserOption(option =>
      option.setName("usuário")
        .setDescription("Usuário a ser banido")
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName("motivo")
        .setDescription("Motivo pelo qual o usuário será banido")
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
  
  async execute(i: CommandInteraction) {
    const target = i.options.getUser("usuário");
    const reason = i.options.getString("motivo") ?? "Nenhum motivo especificado";
    
    const confirm = new ButtonBuilder()
      .setCustomId("confirm")
      .setLabel("Confirmar")
      .setStyle(ButtonStyle.Danger);
    
    const cancel = new ButtonBuilder()
      .setCustomId("cancel")
      .setLabel("Cancelar")
      .setStyle(ButtonStyle.Secondary);
      
    const row = new ActionRowBuilder<ButtonBuilder>()
      .addComponents(confirm, cancel);
      
    const response = await i.reply({
      content: `Você está prestes a banir o usuário ${target} pelo motivo: *${reason}*`,
      components: [row],
      withResponse: true
    });
    
    const filter = interaction => i.user.id === interaction.user.id;
    
    try {
      const confirmation = await response.resource.message.awaitMessageComponent({ filter, time: ONE_MINUTE });
      
      if (confirmation.customId === "cancel") {
        await confirmation.update({ content: "Banimento cancelado.", components: [] });
      } else if (confirmation.customId === "confirm") {
        await interaction.guild.members.ban(target);
        await confirmation.update({ content: ":white_check_mark: | Usuário banido com sucesso.", components: [] });
      }
    } catch {
      await i.editReply({ content: "Nenhuma interação foi recebida em 1 minuto. Banimento cancelado.", components: [] });
    }
  }
};

export { command };