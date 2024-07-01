import React, { useEffect, useRef } from 'react';
import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';

const BabylonComponent = ({ imageUrl }) => {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const engine = new BABYLON.Engine(canvas, true);
    engineRef.current = engine;

    const createScene = () => {
      const scene = new BABYLON.Scene(engine);
      const camera = new BABYLON.ArcRotateCamera("camera1", 0, 0, 10, BABYLON.Vector3.Zero(), scene);
      camera.setPosition(new BABYLON.Vector3(0, 5, -10));
      camera.attachControl(canvas, true);

      const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

      const box = BABYLON.MeshBuilder.CreateBox("box", { size: 2 }, scene);

      if (imageUrl) {
        const material = new BABYLON.StandardMaterial("texture1", scene);
        material.diffuseTexture = new BABYLON.Texture(imageUrl, scene);
        box.material = material;
      }

      return scene;
    };

    const scene = createScene();
    engine.runRenderLoop(() => {
      scene.render();
    });

    return () => {
      engine.dispose();
    };
  }, [imageUrl]);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '400px' }} />;
};

export default BabylonComponent;
