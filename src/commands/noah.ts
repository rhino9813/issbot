import * as Discord from "discord.js";
import {IBotCommand} from "../api";

export default class noah implements IBotCommand{
   
    private readonly _command = "noah"

    help(): string {
        return "This command does nothing :(";
    }   
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }
    
    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        
        msgObject.channel.send("Use Code \"NoahBTW\"");
    }
}