'use client'
import Image from "next/image";
import React from 'react'

import Filter from '../components/Filter/Filter';
import Friend from '../components/Friend/Friend';
export default function Home() {
  
  return (
    <>
      <Filter/>
      <Friend/>
    </>
  );
}
