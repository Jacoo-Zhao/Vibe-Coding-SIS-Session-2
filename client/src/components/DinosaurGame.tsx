import React, { useRef, useEffect, useState } from 'react';
import { Game } from '../lib/dinosaur-game/Game';
import { useGameLoop } from '../hooks/useGameLoop';

interface DinosaurGameProps {
  width?: number;
  height?: number;
}

export const DinosaurGame: React.FC<DinosaurGameProps> = ({ 
  width = 800, 
  height = 400 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<Game | null>(null);
  const [isGameStarted, setIsGameStarted] = useState(false);

  // Initialize game
  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        gameRef.current = new Game(ctx, width, height);
        console.log('Dinosaur game initialized');
      }
    }

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy();
      }
    };
  }, [width, height]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault();
        if (!isGameStarted) {
          setIsGameStarted(true);
          gameRef.current?.start();
          console.log('Game started!');
        } else if (gameRef.current?.isGameOverState()) {
          // 游戏结束时重新开始
          gameRef.current?.start();
          console.log('Game restarted!');
        } else {
          gameRef.current?.jump();
          console.log('Jump triggered!');
        }
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isGameStarted]);

  // Game loop
  useGameLoop((deltaTime) => {
    if (gameRef.current && isGameStarted) {
      gameRef.current.update(deltaTime);
      gameRef.current.render();
    }
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-300 to-blue-100">
      <div className="mb-4 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">谷歌恐龙游戏</h1>
        {!isGameStarted ? (
          <p className="text-lg text-gray-600">按空格键开始游戏</p>
        ) : (
          <p className="text-lg text-gray-600">按空格键跳跃，避开仙人掌障碍物！</p>
        )}
      </div>
      
      <div className="border-4 border-gray-800 rounded-lg shadow-lg">
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className="block bg-white"
          style={{ imageRendering: 'pixelated' }}
        />
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">
          简单的恐龙跑酷游戏 - 跳跃避开仙人掌障碍物！
        </p>
      </div>
    </div>
  );
};
