// "use client";
// import { useEffect, useState } from "react";

// export default function Avatar({ speaking }: { speaking: boolean }) {
//   const [blink, setBlink] = useState(false);

//   useEffect(() => {
//     const interval = setInterval(() => setBlink((b) => !b), 1500);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="w-32 h-32 rounded-full border-4 border-sky-400 bg-gradient-to-br from-sky-200 to-sky-400 flex items-center justify-center relative overflow-hidden shadow-lg">
//       {/* Eyes */}
//       <div
//         className={`absolute top-1/3 left-1/4 w-4 rounded-full bg-black transition-all ${
//           blink ? "h-1" : "h-4"
//         }`}
//       />
//       <div
//         className={`absolute top-1/3 right-1/4 w-4 rounded-full bg-black transition-all ${
//           blink ? "h-1" : "h-4"
//         }`}
//       />
//       {/* Mouth */}
//       <div
//         className={`absolute bottom-1/4 left-1/2 -translate-x-1/2 rounded-full bg-black transition-all ${
//           speaking ? "w-10 h-2" : "w-6 h-1"
//         }`}
//       />
//     </div>
//   );
// }
