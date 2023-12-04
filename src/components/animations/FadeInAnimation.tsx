'use client'

import { motion } from "framer-motion"
import React from "react"

const FadeInAnimation: React.FC<{
  children: React.ReactNode,
  startOpacity?: number,
  endOpacity?: number,
  duration?: number,
  index?: number
}> = ({
  children,
  startOpacity = 0,
  endOpacity = 1,
  duration = .5,
  index = 0
}) => {
    return (
      <>
        <motion.div
          initial={{
            opacity: startOpacity
          }}
          animate={{
            opacity: endOpacity
          }}
          transition={{
            duration: duration,
            delay: index * .2
          }}
        >
          {children}
        </motion.div>
        <noscript>{children}</noscript>
      </>
    )
  }

export default FadeInAnimation