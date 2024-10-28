'use client'
import { useState } from 'react'
import CanvasGrid from './_components/canvas';
import P1hud from './_components/playeronehud';
import Navbar from './_components/navbar';
import MainMenu from './_components/mainMenu';

export default function Home() {
  const [data, setData] = useState(null);
  return (
    <>
      <MainMenu></MainMenu>
    </>
  );
}
