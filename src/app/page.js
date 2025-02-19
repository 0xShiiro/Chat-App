'use client'
import Image from "next/image";
import React,{useState , useEffect,useContext} from 'react'
// import { ChatAppContext } from "../context/ChatAppContext";
import Filter from '../components/Filter/Filter';
import Friend from '../components/Friend/Friend';
export default function Home() {
  // const {} = useContext(ChatAppContext);
  return (
    <>
      <Filter/>
      <Friend/>
    </>
  );
}
