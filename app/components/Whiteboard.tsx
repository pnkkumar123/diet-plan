// import { motion, useAnimation } from "framer-motion";
// import { useEffect, useRef, useState } from "react";

// function Whiteboard({ annotations }: { annotations: any[] }) {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const controls = useAnimation();
//   const [step, setStep] = useState(0);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     if (!annotations || annotations.length === 0) return;

//     // compute bounding box
//     let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
//     annotations.forEach((a) => {
//       const pts = a.points || [];
//       pts.forEach((p: any) => {
//         minX = Math.min(minX, p.x);
//         minY = Math.min(minY, p.y);
//         maxX = Math.max(maxX, p.x);
//         maxY = Math.max(maxY, p.y);
//       });
//       if (a.x !== undefined && a.y !== undefined) {
//         minX = Math.min(minX, a.x);
//         minY = Math.min(minY, a.y);
//         maxX = Math.max(maxX, a.x);
//         maxY = Math.max(maxY, a.y);
//       }
//     });

//     const width = Math.max(1, maxX - minX);
//     const height = Math.max(1, maxY - minY);
//     const scale = Math.min(canvas.width / (width + 40), canvas.height / (height + 40));
//     const offsetX = (canvas.width - width * scale) / 2 - minX * scale;
//     const offsetY = (canvas.height - height * scale) / 2 - minY * scale;

//     // draw visible annotations step-by-step
//     const visible = annotations.slice(0, step);
//     ctx.lineWidth = 2;
//     ctx.lineCap = "round";
//     ctx.strokeStyle = "#4f46e5";
//     ctx.font = "18px Poppins";
//     ctx.fillStyle = "#111";

//     visible.forEach((a) => {
//       const op = a.op || a.type;
//       if ((op === "drawLine" || op === "line") && Array.isArray(a.points)) {
//         ctx.beginPath();
//         const [start, ...rest] = a.points;
//         if (!start) return;
//         ctx.moveTo(start.x * scale + offsetX, start.y * scale + offsetY);
//         rest.forEach((pt: any) =>
//           ctx.lineTo(pt.x * scale + offsetX, pt.y * scale + offsetY)
//         );
//         ctx.stroke();
//       } else if ((op === "drawText" || op === "text") && a.text) {
//         ctx.fillText(a.text, a.x * scale + offsetX, a.y * scale + offsetY);
//       }
//     });
//   }, [annotations, step]);

//   // progressive reveal
//   useEffect(() => {
//     if (annotations.length > 0) {
//       setStep(0);
//       const interval = setInterval(() => {
//         setStep((prev) => (prev < annotations.length ? prev + 1 : prev));
//       }, 700);
//       return () => clearInterval(interval);
//     }
//   }, [annotations]);

//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.95 }}
//       animate={{ opacity: 1, scale: 1 }}
//       transition={{ duration: 0.8 }}
//       className="flex justify-center relative"
//     >
//       <motion.canvas
//         ref={canvasRef}
//         width={600}
//         height={400}
//         className="border-2 border-indigo-200 rounded-xl bg-white shadow-md"
//         animate={{
//           boxShadow: [
//             "0 0 10px rgba(99,102,241,0.2)",
//             "0 0 25px rgba(139,92,246,0.4)",
//             "0 0 10px rgba(99,102,241,0.2)",
//           ],
//         }}
//         transition={{
//           duration: 3,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//       />
//       <motion.div
//         className="absolute inset-0 bg-gradient-to-br from-indigo-50/10 to-purple-50/10 pointer-events-none rounded-xl"
//         animate={{
//           opacity: [0.2, 0.4, 0.2],
//         }}
//         transition={{
//           duration: 2,
//           repeat: Infinity,
//         }}
//       />
//     </motion.div>
//   );
// }
