import * as Discord from "discord.js";
import {IBotCommand} from "../api";

export default class purge implements IBotCommand{
   
    private readonly _command = "purge"

    help(): string {
        return "Delets messages from current channel";
    }   
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }
    
    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        
        msgObject.delete(5000);

        if(!msgObject.member.hasPermission("MANAGE_MESSAGES")){
            msgObject.channel.send('You know you can\'t do that lol')
            .then(msg =>{
                (msg as Discord.Message).delete(60000);
            });
            return;
        }

        if(!args[0]){
            msgObject.channel.send(`Please provide number of messages to be purged`)
            .then(msg => {
                (msg as Discord.Message).delete(60000);
            });
            return;
        }
        let numberOfMessagesToDelete = Number(args[0]);

        if(isNaN(numberOfMessagesToDelete))
        {
            msgObject.channel.send(`That isn\'t a valid number`)
            .then(msg =>{
                (msg as Discord.Message).delete(60000);
            });
            return;  
        }

        numberOfMessagesToDelete = Math.round(numberOfMessagesToDelete + 1);

        msgObject.channel.bulkDelete(numberOfMessagesToDelete)
        .catch(console.error)
    }
}