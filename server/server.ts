import express, { Request, Response } from "express";
import next from "next";
import http from "http";
import dotenv from "dotenv";
import { Server } from "socket.io";

import router from "./routers/rest.router";
import socketRouter from "./routers/socket.router";

dotenv.config();
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT;

function ioPromise(io:any):Promise<any[]> {
    return new Promise((resolve, rejecct) => {
        io.on("connection", (socket:any) => {
            console.log("One user connected!");
            socket.on("disconnect", () => {
                console.log("User disconnected!");
            });
            resolve([socket,io]);
        });
    });
}

(async () => {
    try {
        await app.prepare();
        const server = express();
        const httpServer = http.createServer(server);
        const io = new Server(httpServer);
        ioPromise(io)
        .then(async (socketPromise:any[]) => {
            socketRouter(socketPromise);
        });

        // socketController(socketPromise);

        server.use(express.json());
        server.use(express.urlencoded({
            extended: true
        }));
        server.use("/api", router);
        server.all("/*", (req: Request, res: Response) => {
            return handle(req, res);
        });
        httpServer.listen(port, (err?: any) => {
            if (err) throw err;
            console.log(`>Server ready on: http://localhost:${port} - env ${process.env.NODE_ENV}`);
        });
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
})();