'use client'
import { useState } from 'react'
import CanvasGrid from '../_components/canvas';
import P1hud from '../_components/playeronehud';
import Navbar from '../_components/navbar';

export default function Home() {
  const [data, setData] = useState(null);
  return (
    <>
      <Navbar></Navbar>
      <CanvasGrid onDataUpdate={setData}></CanvasGrid >
      <P1hud data={data}></P1hud>
    </>
  );
}
