
export default async function socketController(socketPromise:Promise<any[]>) {
    const [socket,io] = await socketPromise;
    socket.on("command", (command:string) => {
        console.log(`Socket: ${command}`);
    });
    console.log("ok");
}