import express, { Request, Response } from "express";
import next from "next";
import http from "http";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = 3000;

(async () => {
    try {
        await app.prepare();
        const server = express();
        const httpServer = http.createServer(server);
        server.use(express.json());
        server.use(express.urlencoded({
            extended: true
        }));
        server.all("/*", (req: Request, res: Response) => {
            return handle(req, res);
        });
        httpServer.listen(port, (err?: any) => {
            if (err) throw err;
            console.log(`>Server ready on port: ${port} - env ${process.env.NODE_ENV}`);
        });
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
})();