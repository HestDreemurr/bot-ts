import "dotenv/config";
import { Client, Events, Collection, GatewayIntentBits } from "discord.js";
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

client.login(token);