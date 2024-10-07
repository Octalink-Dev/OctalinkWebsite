import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useThree, useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import CanvasLoader from "./Loader";

const Earth = () => {
  const earthRef = useRef();
  const [scale, setScale] = useState([18, 18, 18]);
  const [modelLoaded, setModelLoaded] = useState(false);

  const gltf = useLoader(GLTFLoader, "./planet/scene.gltf", (loader) => {
    loader.setCrossOrigin("anonymous");
  });

  useEffect(() => {
    if (!gltf) return;

    const scene = gltf.scene;

    // Texture and material setup
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        if (child.material) {
          if (child.material.map) {
            child.material.map.anisotropy = 16;
            child.material.map.encoding = THREE.sRGBEncoding;
          }
          child.material.needsUpdate = true;
        }
      }
    });

    setModelLoaded(true);

    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setScale([70, 70, 70]);
      } else {
        setScale([70, 70, 70]);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [gltf]);

  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.001;
    }
  });

  if (!modelLoaded) {
    return <CanvasLoader />;
  }

  return (
    <primitive
      ref={earthRef}
      object={gltf.scene}
      scale={scale}
      position={[0, -5, 0]} // Adjusted position to move the Earth lower
    />
  );
};

const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <directionalLight position={[-5, 5, -5]} intensity={0.5} />
      <directionalLight position={[5, -5, 5]} intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.3} />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={0.5}
        castShadow
      />
    </>
  );
};

const EarthCanvas = () => {
  const cameraPosition = new THREE.Vector3(0, 10, 15); // Adjusted camera position

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full h-full max-w-full max-h-full">
        <Canvas
          shadows
          frameloop="demand"
          dpr={[1, 2]}
          gl={{ preserveDrawingBuffer: true }}
          camera={{
            fov: 45,
            near: 0.1,
            far: 200,
            position: cameraPosition,
          }}
        >
          <Suspense fallback={<CanvasLoader />}>
            <OrbitControls
              autoRotate
              enableZoom={false}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 3}
              makeDefault
            />
            <Earth />
            <Lights />
            <Preload all />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};

export default EarthCanvas;
