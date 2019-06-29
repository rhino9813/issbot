import * as Discord from "discord.js";
import {IBotCommand} from "../api";
import { gunzip } from "zlib";

export default class serverinfo implements IBotCommand{
   
    private readonly _command = "serverinfo"

    help(): string {
        return "This command does nothing :(";
    }   
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }
    
    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        
        let embed = new Discord.RichEmbed()
                        .setColor(0xFF0000)
                        .setTitle("Server Info")
                        .setFooter("Everyone is poor")
                        .setThumbnail(msgObject.guild.iconURL)
                        .setDescription("We got the best cat pics around")
                        .addField("Owner: ", msgObject.guild.owner)
                        .addField("Member Count: ", `${msgObject.guild.memberCount}`)
                        .addField("Region: ", msgObject.guild.region)
                        .addField("Website", "https://www.ninjasmarketplace.com")

        msgObject.channel.send(embed)
            .catch(console.error);                
    }
}