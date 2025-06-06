"use client"

import * as Icons from "lucide-react"
import locale from "@/locale/landing.json"
import type { FC } from "react"
import { motion } from "framer-motion"

const ServicesList = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {locale.SERVICES.ITEMS.map(({ ID, ICON, TITLE, DESCRIPTION }) => {
        const IconComponent = Icons[ICON as keyof typeof Icons] as FC<{ size?: number, className?: string }>;

        return (
          <motion.div
            key={ID}
            className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-secondary-200"
            variants={itemVariants}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 10px 30px -10px rgba(17, 45, 78, 0.1)"
            }}
          >
            <motion.div
              className="w-14 h-14 rounded-full flex items-center justify-center mb-6 bg-default-500"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              {IconComponent ? <IconComponent size={24} className="text-variant-1" /> : null}
            </motion.div>
            <h3 className="text-xl font-bold mb-3 text-primary">{TITLE}</h3>
            <p className="text-tertiary">{DESCRIPTION}</p>
          </motion.div>
        )
      })}
    </motion.div>
  )
}

export default function Services() {
  return (
    <section className="w-full py-20 bg-default">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="inline-flex items-center px-4 py-2 rounded-full mb-4 bg-default-500 text-tertiary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-sm font-medium">{locale.SERVICES.DATA[0].BADGE}</span>
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-heading">
            {locale.SERVICES.DATA[0].TITLE}
          </h2>
          <p className="text-lg text-primary">
            {locale.SERVICES.DATA[0].DESCRIPTION}
          </p>
        </motion.div>

        <ServicesList />
      </div>
    </section>
  )
}