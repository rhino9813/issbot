import * as Discord from "discord.js";
import * as ConfigFile from "./config";
import { IBotCommand } from "./api";

const client: Discord.Client = new Discord.Client();
require(`dotenv/config`);
const http = require('http');
const port = process.env.PORT || 3000;
const token = process.env.TOKEN;
http.createServer().listen(port);

let commands: IBotCommand[] = [];

loadCommands(`${__dirname}/commands`)

client.on("ready", () => {
    console.log("Bot = Online");
    client.user.setActivity("Ninja sleep", {type: "WATCHING"});
})

client.on("message", msg =>{
    if(msg.author.bot){ return; }
    if(msg.channel.type == "dm") { return; }
    if (!msg.content.startsWith(ConfigFile.config.prefix)){ return; }

    handleCommand(msg);
})

client.on(`error`, err =>{
    console.log(err);
});

async function handleCommand(msg: Discord.Message) {

    let command = msg.content.split(" ")[0].replace(ConfigFile.config.prefix, "").toLowerCase();
    let args = msg.content.split(" ").slice(1);

     for(const commandClass of commands){
        try{
            if(!commandClass.isThisCommand(command)){
                continue;
            }

            await commandClass.runCommand(args, msg, client);
        }
        catch(exception){

            console.log(exception);
        }
    }
} 
    
    

function loadCommands(commandsPath: string) {

    if(!ConfigFile.config || (ConfigFile.config.commands as string[]).length === 0) { return; }

    for(const commandName of ConfigFile.config.commands as string[]){
    
        const commandsClass = require(`${commandsPath}/${commandName}`).default;

        const command = new commandsClass() as IBotCommand;

        commands.push(command);

    }
}

client.login(ConfigFile.config.token);