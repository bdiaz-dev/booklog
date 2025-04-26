import { motion } from 'framer-motion'
import { ReactNode } from 'react';

export default function DeployBox({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className='deploy-box'
    >
      {children}
    </motion.div>
  )
}
