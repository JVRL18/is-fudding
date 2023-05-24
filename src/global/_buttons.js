import { ButtonBuilder, ButtonStyle, ActionRowBuilder } from 'discord.js'

export const FudButtons = () => {
    return new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("reject_fud")
                .setLabel("Not fud")
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId("accept_fud")
                .setLabel("Is Fud")
                .setStyle(ButtonStyle.Danger)
        )
}