import { Message, Client } from 'discord.js'
import { FudButtons } from '../global/_buttons.js'
import { templateEmbed } from '../global/_embeds.js'
import { registerToAutoFud, registerToNotAutoFud } from '../utils/autoFud.js'
import { loadAutoBrain } from '../brain-auto/index.js'
import { loadBrain } from '../brain/index.js'

export const name = 'messageCreate'

/**
 * Basic command data
 * @param {Message} message 
 * @param {Client} client 
 */
export const execute = async (message, client) => {
    const watchList = process.env.watchList

    if (message.author.bot) return
    if (!message.content) return
    if (!watchList.includes(message.channelId)) return

    const ignore = ["https://", "0x"]
    
    for (const ig of ignore) {
        if(message.content.includes(ig)) return
    }

    const url = `https://discord.com/channels/${message.guildId}/${message.channelId}/${message.id}`

    const brain = await loadBrain(true)
    const autoBrain = await loadAutoBrain(true)

    const { content, author } = message
    const user = await client.users.fetch(author.id)

    const userMessage = `\`\`\`${content}\`\`\`\n`

    const aiResponse = brain.run(content.toLowerCase())

    if (aiResponse === 'ok') {
        const channel = await client.channels.fetch("1111041029357969541")

        const aiEvaluator = `AI: Don't seems to be fudding`

        await channel.send({
            components: [FudButtons()],
            embeds: [await templateEmbed(user, userMessage + aiEvaluator, false, url)]
        })
    } else {
        const channel = await client.channels.fetch("1111041001272905788")

        const aiEvaluator = `AI: May be fudding`

        await channel.send({
            components: [FudButtons()],
            embeds: [await templateEmbed(user, userMessage + aiEvaluator, true, url)]
        })
    }

    //Auto learning network -
    const autoAiResponse = autoBrain.run(content.toLowerCase())

    if (autoAiResponse === 'ok') {
        await registerToNotAutoFud(content)

        const channel = await client.channels.fetch("1111040973053628566")

        const aiEvaluator = `AI: Don't seems to be fudding`

        await channel.send({
            components: [FudButtons()],
            embeds: [await templateEmbed(user, userMessage + aiEvaluator, false, url)]
        })
    } else {
        await registerToAutoFud(content)

        const channel = await client.channels.fetch("1111040950534422680")

        const aiEvaluator = `AI: May be fudding`

        await channel.send({
            components: [FudButtons()],
            embeds: [await templateEmbed(user, userMessage + aiEvaluator, true, url)]
        })
    }
}