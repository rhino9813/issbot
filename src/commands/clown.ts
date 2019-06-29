import * as Discord from "discord.js";
import {IBotCommand} from "../api";

export default class clown implements IBotCommand{
   
    private readonly _command = "clown"

    help(): string {
        return "This command does nothing :(";
    }   
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }
    
    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        
        msgObject.channel.send("https://cdn.discordapp.com/emojis/592892258869575680.png?v=1");
    }
}