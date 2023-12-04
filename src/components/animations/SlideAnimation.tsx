'use client'

import { motion } from "framer-motion"
import React from "react"

const SlideAnimation: React.FC<{
    children: React.ReactNode,
    duration?: number,
    index?: number,
    direction?: 'left' | 'right'
}> = ({
    children,
    duration = .5,
    index = 0,
    direction = 'right'
}) => {
        return (
            <>
                <motion.div
                    initial={{
                        x: direction === 'right' ? -100 : 100
                    }}
                    animate={{
                        x: 0
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

export default SlideAnimation