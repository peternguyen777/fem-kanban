import React from "react";
import { motion } from "framer-motion";

function Underlay({ onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.5 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.2,
      }}
      className='absolute top-0 z-20 h-screen w-full bg-[#000000] opacity-50'
      onClick={onClick}
    ></motion.div>
  );
}

export default Underlay;
