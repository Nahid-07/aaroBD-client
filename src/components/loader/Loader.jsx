import { motion } from "motion/react"

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <motion.div
        className="relative flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {/* Outer glowing ring */}
        <motion.div
          className="absolute w-24 h-24 border-4 border-white border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        {/* Inner rotating gradient dot */}
        <motion.div
          className="w-10 h-10 rounded-full bg-linear-to-r from-yellow-400 to-pink-400 shadow-lg"
          animate={{ rotate: -360 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>

      <motion.h1
        className="absolute bottom-20 text-2xl font-semibold tracking-wider"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        AaroShop Loading...
      </motion.h1>
    </div>
  );
};

export default Loader;
