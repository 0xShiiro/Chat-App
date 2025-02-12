'use client'
import Image from "next/image";
import React,{useState , useEffect,useContext} from 'react'
import { ChatAppContext } from "../context/ChatAppContext";
export default function Home() {
  const {} = useContext(ChatAppContext);
  return (
    <>
      <h1>{}</h1>
    </>
  );
}
