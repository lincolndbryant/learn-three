import React, { useRef, useState } from "react";
import { useFrame, extend } from "react-three-fiber";
import * as THREE from "three";
import * as meshline from "threejs-meshline";

extend(meshline);

const Box = (props) => {
  // This reference will give us direct access to the mesh
  const mesh = useRef();

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));

  console.log(mesh);
  const vertices = [
    [0, 0],
    [500, 500],
  ];

  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-100, -100, 300),
    new THREE.Vector3(100, -100, 300),
    new THREE.Vector3(100, 100, 300),
    new THREE.Vector3(-100, 100, 100),
    new THREE.Vector3(-100, -100, 300),
  ]).getPoints(4);

  return (
    <>
      <mesh
        {...props}
        ref={mesh}
        scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
        onClick={(e) => setActive(!active)}
        onPointerOver={(e) => setHover(true)}
        onPointerOut={(e) => setHover(false)}
      >
        <boxGeometry attach="geometry" args={[100, 100, 100]} />
        <meshStandardMaterial
          attach="material"
          color={hovered ? "hotpink" : "orange"}
        />
      </mesh>
      <mesh>
        <meshLine attach="geometry" vertices={curve} />
        <meshLineMaterial
          attach="material"
          depthTest={true}
          lineWidth={10}
          color={"red"}
          sizeAttenuation={1}
        />
      </mesh>
    </>
  );
};

export default Box;
