import React from "react";
import Phaser, { Physics } from "phaser";
import GameComponents from "./GameComponents";
import GameArea from "./GamerArea";

const Home = () => {
  const config = {
    type: Phaser.AUTO,
    scene: GameArea,
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 0 },
      },
    },
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: window.innerWidth * window.devicePixelRatio,
      height: window.innerHeight * window.devicePixelRatio,
    },
    pixelArt: false, // Set to true if using pixel art style graphics
    antialias: true, // Enable antialiasing for smoother edges
    render: {
      pixelArt: false, // Set to true if using pixel art style graphics
      antialias: true, // Enable antialiasing for smoother edges
      antialiasGL: true, // Enable WebGL antialiasing
      roundPixels: true, // Round pixel positions for crisp rendering
      powerPreference: "high-performance", // Prefer high-performance GPU
      mipmapFilter: "LINEAR_MIPMAP_LINEAR", // Enable mipmapping with linear filtering
    },
  };

  return <GameComponents config={config} />;
};

export default Home;
