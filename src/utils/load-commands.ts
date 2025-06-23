import fs from "node:fs";
import path from "node:path";

function loadCommands() {
  let commands = [];
  
  const commandsPath = path.join(__dirname, "../commands");
  const commandFiles = fs.readdirSync(commandsPath);
  
  commandFiles.forEach(commandFile => {
    const commandPath = path.join(commandsPath, commandFile);
    const { command } = require(commandPath);
    commands.push(command);
  });
  
  return commands;
}

export { loadCommands };