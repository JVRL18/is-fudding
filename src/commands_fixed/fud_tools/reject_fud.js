import { registerToNotFud } from "../../utils/FuddingUtils.js"

export const execute = async interaction => {
    const message = interaction.message.embeds[0].description.split("\`\`\`")[1]

    await interaction.message.delete()

    registerToNotFud(message)
}