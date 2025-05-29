"use client"

import { Search, Layers, Star } from "lucide-react"
import locale from "@/locale/landing.json"
import { motion } from "framer-motion"

export default function AboutUs() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
    <section className="w-full py-20 bg-default" >
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
            <span className="text-sm font-medium">{locale.ABOUT_US.BADGE}</span>
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-heading" >
            {locale.ABOUT_US.TITLE}
          </h2>
          <p className="text-lg text-primary">
            {locale.ABOUT_US.DESCRIPTION}
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            className="bg-white p-8 rounded-xl shadow-sm border border-default-500 hover:shadow-lg transition-shadow duration-300"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              className="w-14 h-14 bg-default-500 rounded-full flex items-center justify-center mb-6"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Search className="h-6 w-6 text-variant-1" />
            </motion.div>
            <h3 className="text-xl font-bold mb-3 text-heading">
              {locale.ABOUT_US.MISION[0].TITLE}
            </h3>
            <p className="text-primary">
              {locale.ABOUT_US.MISION[0].TEXT}
            </p>
          </motion.div>
          <motion.div
            className="bg-white p-8 rounded-xl shadow-sm border border-default-500 hover:shadow-lg transition-shadow duration-300"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              className="w-14 h-14 rounded-full flex items-center justify-center mb-6 bg-default-500"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Layers className="h-6 w-6 text-variant-1" />
            </motion.div>
            <h3 className="text-xl font-bold mb-3 text-heading">
              {locale.ABOUT_US.VISION[0].TITLE}
            </h3>
            <p className='text-primary'>
              {locale.ABOUT_US.VISION[0].TEXT}
            </p>
          </motion.div>
          <motion.div
            className="bg-white p-8 rounded-xl shadow-sm border border-default-500 hover:shadow-lg transition-shadow duration-300"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              className="w-14 h-14 bg-default-500 rounded-full flex items-center justify-center mb-6"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Star className="h-6 w-6 text-variant-1" />
            </motion.div>
            <h3 className="text-xl font-bold mb-3 text-heading">
              {locale.ABOUT_US.VALUES[0].TITLE}
            </h3>
            <p className="text-primary">
              {locale.ABOUT_US.VALUES[0].TEXT}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
