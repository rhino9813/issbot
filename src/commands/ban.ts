import * as Discord from "discord.js";
import {IBotCommand} from "../api";

export default class ban implements IBotCommand{
   
    private readonly _command = "ban"

    help(): string {
        return "Bans the mentioned user";
    }   
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }
    
    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        
        let mentionedUser = msgObject.mentions.users.first();
        let suppliedReason = args.slice(1).join(" ") || "";
        let banLog = `${msgObject.author.username}: ${suppliedReason}`;

        msgObject.delete(5000);
       
        if(!msgObject.member.hasPermission("BAN_MEMBERS")){
            msgObject.channel.send('You can\'t do that dummy lol')
            .then(msg => {
                (msg as Discord.Message).delete(5000);
            });
            return;
        }

        if(!mentionedUser){
            msgObject.channel.send(`Sorry ${msgObject.author.username}, I could not find that user`);
            return;
        }


        msgObject.guild.member(mentionedUser).ban(banLog)
            .then(console.log)
            .catch(console.error)

    }
}