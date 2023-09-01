"use client"
import { useEffect } from "react";
import axios, { AxiosResponse } from "axios";

import { socket } from "@/socket";

export default function Home() {
  useEffect(() => {
    axios.get("/api/get")
    .then((res:AxiosResponse) => {
      console.log(res.data);
    })
    .catch((error:any) => {
      console.log(error);
    });
  },[]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
     
    </main>
  )
}
