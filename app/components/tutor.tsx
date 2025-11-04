// "use client";

// import { useState, useEffect, useRef } from "react";
// import { Send, Mic, Volume2, Lightbulb } from "lucide-react";
// import { motion, AnimatePresence, useAnimation } from "framer-motion";
// import dynamic from "next/dynamic";
// const ThreeTutor = dynamic(() => import("./components/ThreeTutor"), { ssr: false });

// /* 🎭 Interactive Avatar Component */
// function Avatar({ speaking, thinking }: { speaking: boolean; thinking: boolean }) {
//   return (
//     <motion.div
//       className="relative"
//       animate={{
//         scale: speaking ? [1, 1.08, 1] : 1,
//         rotate: speaking ? [0, 3, -3, 0] : 0,
//       }}
//       transition={{
//         duration: 1.2,
//         ease: "easeInOut",
//         repeat: speaking ? Infinity : 0,
//       }}
//     >
//       <motion.div
//         className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center relative"
//         animate={{
//           boxShadow: speaking
//             ? [
//                 "0 0 15px rgba(147,51,234,0.5)",
//                 "0 0 30px rgba(147,51,234,0.8)",
//                 "0 0 15px rgba(147,51,234,0.5)",
//               ]
//             : "0 4px 15px rgba(99,102,241,0.2)",
//         }}
//         transition={{
//           duration: 1.5,
//           repeat: speaking ? Infinity : 0,
//           ease: "easeInOut",
//         }}
//       >
//         <div className="w-[72px] h-[72px] rounded-full bg-gradient-to-br from-blue-300 to-purple-400 flex flex-col items-center justify-center relative">
//           {/* Eyes */}
//           <div className="flex gap-2 mb-1.5">
//             <motion.div
//               className="w-2 h-2 rounded-full bg-gray-800"
//               animate={{
//                 scaleY: speaking ? [1, 0.3, 1] : thinking ? [1, 0.1, 1] : 1,
//               }}
//               transition={{
//                 duration: speaking ? 0.4 : 2,
//                 repeat: speaking || thinking ? Infinity : 0,
//                 repeatDelay: thinking ? 1 : 0,
//               }}
//             />
//             <motion.div
//               className="w-2 h-2 rounded-full bg-gray-800"
//               animate={{
//                 scaleY: speaking ? [1, 0.3, 1] : thinking ? [1, 0.1, 1] : 1,
//               }}
//               transition={{
//                 duration: speaking ? 0.4 : 2,
//                 delay: speaking ? 0.1 : 0.2,
//                 repeat: speaking || thinking ? Infinity : 0,
//                 repeatDelay: thinking ? 1 : 0,
//               }}
//             />
//           </div>
//           {/* Mouth */}
//           <motion.div
//             className="w-5 h-1.5 rounded-full bg-gray-800"
//             animate={{
//               scaleX: speaking ? [1, 1.3, 0.9, 1] : 1,
//               y: speaking ? [0, 1, 0] : 0,
//             }}
//             transition={{
//               duration: 0.6,
//               repeat: speaking ? Infinity : 0,
//               ease: "easeInOut",
//             }}
//           />
//         </div>
//       </motion.div>

//       {/* Speaking Indicator */}
//       <AnimatePresence>
//         {speaking && (
//           <motion.div
//             initial={{ scale: 0, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0, opacity: 0 }}
//             className="absolute -right-1 -top-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
//           >
//             <Volume2 className="w-3.5 h-3.5 text-white" />
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Thinking Indicator */}
//       <AnimatePresence>
//         {thinking && (
//           <motion.div
//             initial={{ scale: 0, y: -10, opacity: 0 }}
//             animate={{ scale: 1, y: -25, opacity: 1 }}
//             exit={{ scale: 0, y: -10, opacity: 0 }}
//             className="absolute left-1/2 -translate-x-1/2 -top-8 bg-yellow-400 rounded-full p-2 shadow-lg"
//           >
//             <Lightbulb className="w-4 h-4 text-yellow-900" />
//             <motion.div
//               className="absolute inset-0 bg-yellow-300 rounded-full"
//               animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
//               transition={{ duration: 1.5, repeat: Infinity }}
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Ambient particles when speaking */}
//       {speaking && (
//         <>
//           {[...Array(3)].map((_, i) => (
//             <motion.div
//               key={i}
//               className="absolute w-1 h-1 bg-purple-400 rounded-full"
//               initial={{ x: 0, y: 0, opacity: 0 }}
//               animate={{
//                 x: [0, (Math.random() - 0.5) * 40],
//                 y: [0, -30 - Math.random() * 20],
//                 opacity: [0, 1, 0],
//               }}
//               transition={{
//                 duration: 1.5,
//                 delay: i * 0.2,
//                 repeat: Infinity,
//                 ease: "easeOut",
//               }}
//               style={{ left: "50%", top: "50%" }}
//             />
//           ))}
//         </>
//       )}
//     </motion.div>
//   );
// }

// /* 🧮 Interactive Whiteboard Component */
// function Whiteboard({ annotations }: { annotations: any[] }) {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const [step, setStep] = useState(0);
//   const [pointerPos, setPointerPos] = useState({ x: 0, y: 0, visible: false });

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     if (!annotations || annotations.length === 0) return;

//     // Compute bounding box
//     let minX = Infinity,
//       minY = Infinity,
//       maxX = -Infinity,
//       maxY = -Infinity;
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
//     const scale = Math.min(canvas.width / (width + 80), canvas.height / (height + 80));
//     const offsetX = (canvas.width - width * scale) / 2 - minX * scale;
//     const offsetY = (canvas.height - height * scale) / 2 - minY * scale;

//     // Draw visible annotations with progressive reveal
//     const visible = annotations.slice(0, step);
//     ctx.lineWidth = 3;
//     ctx.lineCap = "round";
//     ctx.lineJoin = "round";
//     ctx.font = "20px system-ui, -apple-system, sans-serif";
//     ctx.fillStyle = "#1f2937";

//     visible.forEach((a, idx) => {
//       const op = a.op || a.type;
//       const isLastStep = idx === step - 1;

//       if ((op === "drawLine" || op === "line") && Array.isArray(a.points)) {
//         // Gradient stroke for lines
//         const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
//         gradient.addColorStop(0, "#4f46e5");
//         gradient.addColorStop(1, "#7c3aed");
//         ctx.strokeStyle = gradient;

//         ctx.beginPath();
//         const [start, ...rest] = a.points;
//         if (!start) return;
//         ctx.moveTo(start.x * scale + offsetX, start.y * scale + offsetY);
//         rest.forEach((pt: any) => ctx.lineTo(pt.x * scale + offsetX, pt.y * scale + offsetY));
//         ctx.stroke();

//         // Update pointer position for animation
//         if (isLastStep && rest.length > 0) {
//           const lastPt = rest[rest.length - 1];
//           setPointerPos({
//             x: lastPt.x * scale + offsetX,
//             y: lastPt.y * scale + offsetY,
//             visible: true,
//           });
//         }
//       } else if ((op === "drawText" || op === "text") && a.text) {
//         const x = a.x * scale + offsetX;
//         const y = a.y * scale + offsetY;

//         // Text with shadow
//         ctx.shadowColor = "rgba(79, 70, 229, 0.3)";
//         ctx.shadowBlur = 8;
//         ctx.fillText(a.text, x, y);
//         ctx.shadowBlur = 0;

//         // Update pointer position
//         if (isLastStep) {
//           setPointerPos({ x, y, visible: true });
//         }
//       }
//     });
//   }, [annotations, step]);

//   // Progressive reveal animation
//   useEffect(() => {
//     if (annotations.length > 0) {
//       setStep(0);
//       setPointerPos({ x: 0, y: 0, visible: false });
      
//       const interval = setInterval(() => {
//         setStep((prev) => {
//           if (prev < annotations.length) {
//             return prev + 1;
//           } else {
//             // Hide pointer when done
//             setPointerPos((p) => ({ ...p, visible: false }));
//             clearInterval(interval);
//             return prev;
//           }
//         });
//       }, 900);
      
//       return () => clearInterval(interval);
//     }
//   }, [annotations]);

//   if (!annotations || annotations.length === 0) {
//     return (
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="h-[400px] border-2 border-dashed border-indigo-200 rounded-xl bg-gradient-to-br from-indigo-50/50 to-purple-50/50 flex items-center justify-center"
//       >
//         <p className="text-gray-400 text-sm">Whiteboard ready for visual explanations...</p>
//       </motion.div>
//     );
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.95 }}
//       animate={{ opacity: 1, scale: 1 }}
//       transition={{ duration: 0.8 }}
//       className="relative flex justify-center"
//     >
//       {/* Animated pointer/cursor */}
//       <AnimatePresence>
//         {pointerPos.visible && (
//           <motion.div
//             initial={{ scale: 0, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0, opacity: 0 }}
//             className="absolute pointer-events-none z-10"
//             style={{
//               left: pointerPos.x,
//               top: pointerPos.y,
//               transform: "translate(-50%, -50%)",
//             }}
//           >
//             <motion.div
//               className="w-4 h-4 bg-red-500 rounded-full shadow-lg"
//               animate={{
//                 scale: [1, 1.3, 1],
//               }}
//               transition={{
//                 duration: 0.8,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//               }}
//             />
//             <motion.div
//               className="absolute inset-0 w-4 h-4 bg-red-400 rounded-full"
//               animate={{
//                 scale: [1, 2, 1],
//                 opacity: [0.6, 0, 0.6],
//               }}
//               transition={{
//                 duration: 1.5,
//                 repeat: Infinity,
//                 ease: "easeOut",
//               }}
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Canvas */}
//       <motion.canvas
//         ref={canvasRef}
//         width={600}
//         height={400}
//         className="border-2 border-indigo-200 rounded-xl bg-white shadow-lg relative"
//         animate={{
//           boxShadow: [
//             "0 4px 20px rgba(99,102,241,0.15)",
//             "0 8px 30px rgba(139,92,246,0.25)",
//             "0 4px 20px rgba(99,102,241,0.15)",
//           ],
//         }}
//         transition={{
//           duration: 3,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//       />

//       {/* Ambient glow overlay */}
//       <motion.div
//         className="absolute inset-0 bg-gradient-to-br from-indigo-100/20 via-transparent to-purple-100/20 pointer-events-none rounded-xl"
//         animate={{
//           opacity: [0.3, 0.5, 0.3],
//         }}
//         transition={{
//           duration: 4,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//       />

//       {/* Progress indicator */}
//       <motion.div
//         className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-indigo-600 shadow-md"
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: 10 }}
//       >
//         Step {step} of {annotations.length}
//       </motion.div>
//     </motion.div>
//   );
// }

// /* 🧠 Main Component */
// export default function Home() {
//   const [question, setQuestion] = useState("");
//   const [answer, setAnswer] = useState("");
//   const [annotations, setAnnotations] = useState<any[]>([]);
//   const [speaking, setSpeaking] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   async function handleAsk(q: string) {
//     if (!q.trim()) return;
//     setIsLoading(true);
//     setAnswer("");
//     setAnnotations([]);

//     try {
//       const res = await fetch("/api/solve", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ question: q }),
//       });
//       const data = await res.json();
      
//       // Simulate typing effect
//       const fullAnswer = data.answer;
//       let currentAnswer = "";
//       const words = fullAnswer.split(" ");
      
//       for (let i = 0; i < words.length; i++) {
//         currentAnswer += (i > 0 ? " " : "") + words[i];
//         setAnswer(currentAnswer);
//         await new Promise((resolve) => setTimeout(resolve, 80));
//       }
      
//       setAnnotations(data.annotations || []);

//       // TTS
//       const u = new SpeechSynthesisUtterance(fullAnswer);
//       u.lang = "en-US";
//       u.rate = 0.9;
//       setSpeaking(true);
//       u.onend = () => setSpeaking(false);
//       speechSynthesis.speak(u);
//     } catch (error) {
//       setAnswer("Sorry, something went wrong. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   function startMic() {
//     const SR = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
//     if (!SR) {
//       alert("Speech recognition is not supported in your browser");
//       return;
//     }
//     const rec = new SR();
//     rec.lang = "en-US";
//     rec.interimResults = false;
//     rec.onresult = (e: any) => {
//       const text = e.results[0][0].transcript;
//       setQuestion(text);
//       handleAsk(text);
//     };
//     rec.onerror = () => alert("Speech recognition error. Please try again.");
//     rec.start();
//   }

//   useEffect(() => {
//     const id = setInterval(() => setSpeaking(window.speechSynthesis.speaking), 300);
//     return () => clearInterval(id);
//   }, []);

//   return (
//     <motion.div
//       className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 overflow-hidden relative"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.8 }}
//     >
//       {/* Floating background elements */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <motion.div
//           className="absolute top-20 left-10 w-32 h-32 bg-indigo-200/30 rounded-full blur-3xl"
//           animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
//           transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
//         />
//         <motion.div
//           className="absolute bottom-20 right-10 w-40 h-40 bg-purple-200/30 rounded-full blur-3xl"
//           animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
//           transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
//         />
//       </div>

//       <div className="mx-auto max-w-5xl p-6 md:p-8 space-y-6 relative z-10">
//         {/* Header */}
//         <motion.div
//           className="text-center space-y-2 pt-8"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           <motion.div
//             className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-lg border border-indigo-100"
//             whileHover={{ scale: 1.05 }}
//             transition={{ type: "spring", stiffness: 300 }}
//           >
//             <motion.span
//               className="text-2xl"
//               animate={{ rotate: [0, 10, -10, 0] }}
//               transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
//             >
//               🧮
//             </motion.span>
//             <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//               Tutree AI Tutor
//             </h1>
//           </motion.div>
//           <p className="text-gray-600 max-w-2xl mx-auto">
//             Ask any math question by voice or text. Get instant explanations with interactive visual aids.
//           </p>
//         </motion.div>

//         {/* Input Section */}
//         <motion.div
//           className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-indigo-100 p-6"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//         >
//           <div className="flex gap-2">
//             <motion.input
//               value={question}
//               onChange={(e) => setQuestion(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && !isLoading && handleAsk(question)}
//               placeholder="Type your math question here..."
//               className="flex-1 border-2 border-indigo-200 focus:border-indigo-400 outline-none px-4 py-3 rounded-xl bg-white/50 backdrop-blur-sm placeholder:text-gray-400 transition-all"
//               disabled={isLoading}
//               whileFocus={{ scale: 1.01 }}
//             />
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => handleAsk(question)}
//               disabled={isLoading || !question.trim()}
//               className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-3 rounded-xl font-medium shadow-md disabled:cursor-not-allowed flex items-center gap-2"
//             >
//               <Send className="w-4 h-4" />
//               Ask
//             </motion.button>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={startMic}
//               disabled={isLoading}
//               className="bg-white hover:bg-gray-50 border-2 border-indigo-200 px-6 py-3 rounded-xl shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
//             >
//               <Mic className="w-4 h-4 text-indigo-600" />
//               <span className="hidden sm:inline text-gray-700">Speak</span>
//             </motion.button>
//           </div>
//         </motion.div>

//         {/* Response Section */}
//         <AnimatePresence>
//           {(answer || isLoading) && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.5 }}
//               className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-indigo-100 p-6"
//             >
//               <div className="flex items-start gap-4">
//                 <Avatar speaking={speaking} thinking={isLoading} />
//                 <div className="flex-1">
//                   <div className="flex items-center gap-2 mb-3">
//                     <span className="text-sm font-semibold text-gray-700">AI Tutor</span>
//                     {isLoading && (
//                       <div className="flex gap-1">
//                         {[0, 1, 2].map((i) => (
//                           <motion.div
//                             key={i}
//                             className="w-1.5 h-1.5 bg-indigo-600 rounded-full"
//                             animate={{ y: [0, -8, 0] }}
//                             transition={{
//                               duration: 0.6,
//                               repeat: Infinity,
//                               delay: i * 0.15,
//                             }}
//                           />
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                   <motion.div
//                     className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 0.2 }}
//                   >
//                     <p className="whitespace-pre-wrap text-gray-800 leading-relaxed">
//                       {answer || <span className="text-gray-400 italic">Thinking...</span>}
//                     </p>
//                   </motion.div>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Whiteboard Section */}
//         <AnimatePresence>
//           {annotations.length > 0 && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.6 }}
//               className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-indigo-100 p-6"
//             >
//               <div className="flex items-center gap-2 mb-4">
//                 <motion.span
//                   className="w-2.5 h-2.5 bg-indigo-600 rounded-full"
//                   animate={{
//                     scale: [1, 1.3, 1],
//                     opacity: [1, 0.5, 1],
//                   }}
//                   transition={{
//                     duration: 2,
//                     repeat: Infinity,
//                     ease: "easeInOut",
//                   }}
//                 />
//                 <h2 className="text-lg font-semibold text-gray-700">Visual Explanation</h2>
//               </div>
//               <Whiteboard annotations={annotations} />
//             </motion.div>
//           )}
//         </AnimatePresence>
//         {/* 🎥 3D AI Tutor Section */}
// <motion.div
//   initial={{ opacity: 0, y: 30 }}
//   animate={{ opacity: 1, y: 0 }}
//   transition={{ duration: 0.8, delay: 0.4 }}
//   className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-indigo-100 p-6 mt-6"
// >
//   <div className="flex items-center gap-2 mb-4">
//     <motion.span
//       className="w-2.5 h-2.5 bg-purple-600 rounded-full"
//       animate={{
//         scale: [1, 1.3, 1],
//         opacity: [1, 0.5, 1],
//       }}
//       transition={{
//         duration: 2,
//         repeat: Infinity,
//         ease: "easeInOut",
//       }}
//     />
//     <h2 className="text-lg font-semibold text-gray-700">
//       AI 3D Tutor Classroom
//     </h2>
//   </div>

//   {/* The 3D Environment */}
//   <ThreeTutor text={answer} speaking={speaking} />
// </motion.div>

//       </div>
//     </motion.div>
//   );
// }