const { AttachmentBuilder: discordAttachmentBuilder, EmbedBuilder: discordEmbedBuilder, Events: discordEvents, PermissionsBitField } = require('discord.js');

module.exports = {
    name: discordEmbedBuilder,
    name: discordAttachmentBuilder,
    name: discordEvents.MessageCreate,

    async execute(interaction) {
        if (!interaction.author.bot) {

            const lowerCaseContent = interaction.content.toLowerCase();
            const currentTime = new Date().toLocaleString();
            let regEx;

            // regEx = /^-urban /;
            // if ((lowerCaseContent.match(regEx) !== null)) {
            //     const searchTerm = lowerCaseContent.split('-urban ')[1];
            //     try {
            //         const response = await fetch(`https://api.urbandictionary.com/v0/define?term=${searchTerm}`);
            //         const data = await response.json();
            //         if (data.list.length > 0) {
            //             const topDefinition = data.list[0];
            //             const embed = {
            //                 title: topDefinition.word,
            //                 description: topDefinition.definition,
            //                 color: 0x0099ff,
            //                 footer: {
            //                     text: `Example: ${topDefinition.example}`
            //                 }
            //             };
            //             interaction.channel.send({ embeds: [embed] });
            //         } else {
            //             interaction.channel.send("No definition found for that term.");
            //         }
            //     } catch (error) {
            //         console.error(error);
            //         interaction.channel.send("An error occurred while fetching the definition.");
            //     }
            // }
        }
    }
}