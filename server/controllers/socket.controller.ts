import { spawn } from "child_process";

type cmdObjType = {
    commandObj: string,
    io: any,
    socket: any
}

export async function commandController(props:cmdObjType) {
    const io = props.io;
    const socket = props.socket;
    const { command, options } = JSON.parse(props.commandObj);
    const cmd = spawn(command,options);
    cmd.stdout.on("data", (data:any) => {
        console.log("Strting exicution!");
        
        io.emit("stdio",`Child process: ${data.toString()}`);
    });
    // socket.on("kill",() => {
    //     cmd.kill();
    // });
}