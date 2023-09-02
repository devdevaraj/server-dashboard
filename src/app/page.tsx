"use client"
import { useEffect } from "react";
import axios, { AxiosResponse } from "axios";

import { socket } from "@/socket";

export default function Home() {

  const cliclHandler = () => {
    console.log("click handler");
    socket.emit("command", "Command resiverd!");
  }

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
      socket.disconnect();
    };
  },[]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <button onClick={cliclHandler}>Command</button>
    </main>
  )
}
