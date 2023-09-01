import { Request, Response } from "express";
import { spawn } from "child_process";

export function executer(req: Request, res: Response) {
    try {
        const command = spawn("ping", ["localhost"]);
        command.stdout.on("data", (output) => {
            console.log(output.toString());
        });
        // command.stdin.write("^c");
        // command.stdin.end();
        setTimeout(() => {
            command.kill();
        }, 5000);
        return res.json("Working");
    } catch (error:any) {
        return res.json(error);
    }
}