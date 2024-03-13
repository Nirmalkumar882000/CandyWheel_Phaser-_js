import { useEffect } from "react";


const GameComponents = ({config }:any) => {
    useEffect(() => {
        const game = new Phaser.Game(config);
        return () => {
          game.destroy();
        };
      });
  return ;
}

export default GameComponents
