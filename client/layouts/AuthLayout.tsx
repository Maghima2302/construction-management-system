import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import loginHero from "@/assets/login-hero.svg";

export default function AuthLayout() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[hsl(213,65%,12%)]">
      {/* Dynamic Background Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[hsl(25,99%,55%)]/25 blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -120, 0],
            y: [0, 80, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-orange-400/15 blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 50, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-amber-300/10 blur-[80px]"
        />

        {/* Construction visual in the background for auth pages */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="pointer-events-none absolute inset-0 flex items-center justify-center px-6"
        >
          <img
            src={loginHero}
            alt="Construction analytics dashboard"
            className="w-full max-w-6xl opacity-20 sm:opacity-30"
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(213,65%,12%)]/85 via-[hsl(213,65%,15%)]/70 to-[hsl(25,99%,18%)]/80" />
        
        {/* Subtle Dots Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="relative z-10 w-full flex items-center justify-center p-6">
        <Outlet />
      </div>
    </div>
  );
}
