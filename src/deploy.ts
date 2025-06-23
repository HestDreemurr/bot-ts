import "dotenv/config";
import { REST, Routes } from "discord.js";
import { loadCommands } from "./utils/load-commands";
import chalk from "chalk";

const token = process.env.BOT_TOKEN;
const clientId = process.env.CLIENT_ID;

const commands = loadCommands().map(command => command.data.toJSON());

const rest = new REST().setToken(token);

async function deployCommands() {
  try {
    console.log(
      chalk.blue.bold(`[+] Recarregando ${commands.length} comandos slash...`)
    );
    
    const data = await rest.put(
      Routes.applicationCommands(clientId),
      { body: commands }
    );
    
    console.log(
      chalk.green.bold(`[+] ${data.length} comandos slash foram recarregados com sucesso!`)
    );
  } catch (err) {
    console.error(err);
  }
}

export { deployCommands };