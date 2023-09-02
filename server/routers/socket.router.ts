import { commandController } from "../controllers/socket.controller";

export default function socketRouter(socketPromise:any[]) {
    const [socket,io] = socketPromise;
    socket.on("command", (commandObj:string) => {commandController({commandObj,io,socket})});
}