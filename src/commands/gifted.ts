import * as Discord from "discord.js";
import {IBotCommand} from "../api";

export default class gifted implements IBotCommand{
   
    private readonly _command = "gifted"

    help(): string {
        return "This command does nothing :(";
    }   
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }
    
    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        
        msgObject.channel.send("Use code \"AlwaysGifted\" (;");
    }
}