'use client'

import { motion } from "framer-motion"
import React from "react"

const ScaleAnimation: React.FC<{
    children: React.ReactNode,
    startScale?: number,
    endScale?: number,
    duration?: number,
    index?: number
}> = ({
    children,
    startScale = 0,
    endScale = 1,
    duration = .5,
    index = 0
}) => {
        return (
            <>
                <motion.div
                    initial={{
                        scale: startScale
                    }}
                    animate={{
                        scale: endScale
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

export default ScaleAnimation