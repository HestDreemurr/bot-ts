import {
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  ActionRowBuilder
} from "discord.js";

const select = new StringSelectMenuBuilder()
  .setCustomId("pokemon")
  .setPlaceholder("Selecione um pokemon inicial")
  .addOptions(
    new StringSelectMenuOptionBuilder()
      .setLabel("Charmander")
      .setDescription("O Pokémon Lagarto do tipo Fogo")
      .setValue("charmander")
      .setEmoji("🔥"),
    new StringSelectMenuOptionBuilder()
      .setLabel("Bulbassauro")
      .setDescription("O Pokémon de tipo duplo Grama/Semente Venenosa")
      .setValue("bulbassaur")
      .setEmoji("🌱"),
    new StringSelectMenuOptionBuilder()
      .setLabel("Squirtle")
      .setDescription("O Pokémon Tartaruga Minúsculo do tipo Água")
      .setValue("squirtle")
      .setEmoji("💧")
  );
  
export const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(select);