// "use client";
// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";

// export default function TypingText({ text }: { text: string }) {
//   const [display, setDisplay] = useState("");

//   useEffect(() => {
//     if (!text) return;
//     setDisplay("");
//     let i = 0;
//     const interval = setInterval(() => {
//       setDisplay(text.slice(0, i++));
//       if (i > text.length) clearInterval(interval);
//     }, 25);
//     return () => clearInterval(interval);
//   }, [text]);

//   return (
//     <motion.div
//       className="leading-relaxed whitespace-pre-wrap text-gray-800"
//       initial={{ opacity: 0, scale: 0.97, y: 10 }}
//       animate={{ opacity: 1, scale: 1, y: 0 }}
//       transition={{ duration: 0.6, ease: "easeOut" }}
//     >
//       {display}
//     </motion.div>
//   );
// }
