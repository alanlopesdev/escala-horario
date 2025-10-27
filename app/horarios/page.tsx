"use client"

import Image from "next/image";
import Logoraia from '@/public/imgs/logo-rd.png'
import { useState } from "react";

export default function Horarios(){
    return(
<div className="flex items-center justify-center flex-col bg-white h-screen">
  <header className="flex justify-center items-center flex-col">
    <div className="flex items-center flex-row">
        <Image
        src={Logoraia}
        width={75}
        height={75}
        alt="logo"
      />
      <p className="text-9x1 text-black">Planeja RD</p>
    </div>
  </header>
  <div className="grid-rol-20 w-350 h-150 border-black border-2 rounded-md">
    <div className="w-50 h-10 justify-content items-center"><h1 className={styles.textos}>oi</h1></div>

  </div>
</div>
    )
}

const styles = {
    textos : "capitalize text-black"
}