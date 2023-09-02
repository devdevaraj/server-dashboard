"use client"
import { useEffect } from "react";
import axios, { AxiosResponse } from "axios";

import { socket } from "@/socket";

export default function Home() {

  const cliclHandler = () => {
    console.log("click handler");
    const cmdWOptions = JSON.stringify({
      command: "ping",
      options: ["localhost"]
    });
    socket.emit("command", cmdWOptions);
  }

  // const kill

  useEffect(() => {
    axios.get("/api/get")
    .then((res:AxiosResponse) => {
      console.log(res.data);
    })
    .catch((error:any) => {
      console.log(error);
    });

    
    socket.connect();
    console.log("Socket connected!");
    
    return () => {
      // socket.emit("kill", "Kill process");
      socket.disconnect();
      console.log("Socket disconnected!");
    };
  },[]);
  
  console.log("Executiong");
  useEffect(() => {
    const setStdio = (stdio:string) => {
      
      const text = document.getElementById("stdio")?.innerHTML;
      const div = document.getElementById("stdio")!;
      div.textContent = text + stdio;
    }
    
    socket.on("stdio",setStdio)
    
    return () => {
      socket.off("stdio",setStdio);
    }
  });
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <button onClick={cliclHandler}>Command</button>
      <div id="stdio"></div>
      <button>Kill process</button>
    </main>
  )
}
