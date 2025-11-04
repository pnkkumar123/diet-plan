// "use client";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { Environment, Html, OrbitControls, PerspectiveCamera, useGLTF } from "@react-three/drei";
// import { motion } from "framer-motion-3d";
// import * as THREE from "three";
// import * as Tone from "tone";
// import { useEffect, useRef, useState } from "react";

// // --- 3D Teacher Model ---
// function TeacherModel({ speaking }: { speaking: boolean }) {
//   const { scene } = useGLTF("/models/teacher.glb");
//   const ref = useRef<THREE.Group>(null);
//   const [volume, setVolume] = useState(0);

//   // Audio-reactive animation
//   useEffect(() => {
//     if (!speaking) return;
//     const mic = new Tone.UserMedia();
//     mic.open().then(() => {
//       const meter = new Tone.Meter();
//       mic.connect(meter);
//       const interval = setInterval(() => {
//         setVolume(Math.abs(meter.getValue()));
//       }, 100);
//       return () => {
//         mic.close();
//         clearInterval(interval);
//       };
//     });
//   }, [speaking]);

//   // Subtle animation + volume-based head movement
//   useFrame((state) => {
//     if (!ref.current) return;
//     const t = state.clock.elapsedTime;
//     ref.current.rotation.y = Math.sin(t * 0.6) * 0.1;
//     ref.current.position.y = Math.sin(t * 2) * 0.03;
//     if (speaking) {
//       const v = THREE.MathUtils.clamp(volume * 2, 0, 0.1);
//       ref.current.rotation.x = v; // Head tilt based on volume
//     }
//   });

//   return <primitive ref={ref} object={scene} scale={1.6} position={[0, -1, 0]} />;
// }

// // --- Subtitles ---
// function Subtitles({ text }: { text: string }) {
//   return (
//     <Html center>
//       <div className="text-center text-lg font-semibold bg-black/50 text-white px-4 py-2 rounded-lg backdrop-blur-md">
//         {text || "Listening..."}
//       </div>
//     </Html>
//   );
// }

// // --- Camera Animation synced with speech ---
// function AnimatedCamera({ speaking }: { speaking: boolean }) {
//   const ref = useRef<THREE.PerspectiveCamera>(null);
//   useFrame((state) => {
//     if (!ref.current) return;
//     const t = state.clock.elapsedTime;
//     const radius = 5 + (speaking ? Math.sin(t * 1.2) * 0.3 : 0);
//     const x = Math.sin(t * 0.3) * radius;
//     const z = Math.cos(t * 0.3) * radius;
//     ref.current.position.set(x, 2, z);
//     ref.current.lookAt(0, 1, 0);
//   });
//   return <PerspectiveCamera ref={ref} makeDefault fov={50} />;
// }

// // --- Main Scene ---
// export default function ThreeTutor({ text, speaking }: { text: string; speaking: boolean }) {
//   return (
//     <div className="h-[550px] w-full rounded-xl overflow-hidden shadow-lg">
//       <Canvas shadows>
//         {/* Lights */}
//         <ambientLight intensity={0.6} />
//         <directionalLight position={[3, 4, 3]} intensity={1.2} castShadow />
//         <pointLight position={[-5, 3, -3]} intensity={0.6} />

//         {/* 3D Model + Subtitles */}
//         <motion.group
//           initial={{ y: -0.2 }}
//           animate={{ y: [0, 0.05, 0] }}
//           transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
//         >
//           <TeacherModel speaking={speaking} />
//         </motion.group>

//         <Subtitles text={text} />

//         {/* Environment */}
//         <Environment preset="sunset" background blur={0.7} />

//         {/* Camera */}
//         <AnimatedCamera speaking={speaking} />

//         {/* Controls (for debugging only) */}
//         {/* <OrbitControls /> */}
//       </Canvas>
//     </div>
//   );
// }
