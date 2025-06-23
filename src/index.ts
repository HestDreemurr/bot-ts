import "dotenv/config";
import { 
  Client, 
  Events, 
  Collection, 
  GatewayIntentBits,
  CommandInteraction,
  MessageFlags
} from "discord.js";
import { deployCommands } from "./deploy"
import { loadCommands } from "./utils/load-commands"
import chalk from "chalk";

const token = process.env.BOT_TOKEN;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

loadCommands().forEach(command => {
  client.commands.set(command.data.name, command);
})

client.once(Events.ClientReady, (readyClient: Client<true>) => {
  console.log(
    chalk.green.bold(`[+] O bot ${readyClient.user.tag} está on-line!`)
  );
});

client.on(Events.InteractionCreate, async (interaction: CommandInteraction) => {
  if (!interaction.isChatInputCommand()) return;
  
  const command = interaction.client.commands.get(interaction.commandName);
  
  if (!command) {
    console.error(
      chalk.red.bold(`[-] O comando ${interaction.commandName} não foi encontrado.`)
    );
    return;
  }
  
  try {
    await command.execute(interaction);
  } catch (err) {
    console.error(err);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ content: "Houve um erro ao executar o comando.", flags: MessageFlags.Ephemeral });
    } else {
      await interaction.reply({ content: "Houve um erro ao executar o comando.", flags: MessageFlags.Ephemeral });
    }
  }
});

deployCommands();
client.login(token);