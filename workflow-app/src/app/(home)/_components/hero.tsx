"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import locale from "@/locale/landing.json"
import { Button } from "@/components/ui/button"
import { ArrowRight, Briefcase, Building } from "lucide-react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { WorkspaceScene } from "@/components/workspace-scene"

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const { scrollY } = useScroll()
  const totalJobs = "1,000"
  const totalCompanies = "500"

  const y = useTransform(scrollY, [0, 300], [0, -50])
  const opacity = useTransform(scrollY, [0, 200], [1, 0])

  return (
    <section className="w-full relative overflow-hidden bg-gradient-to-br from-default-500 to-default min-h-[90vh]">
      {/* Círculos decorativos con animación */}
      <motion.div
        className="absolute -top-24 -right-24 w-64 h-64 rounded-full opacity-20 bg-variant-1"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute top-40 -left-20 w-40 h-40 rounded-full opacity-10 bg-button-primary"
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, -90, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute bottom-10 right-1/4 w-32 h-32 rounded-full opacity-15 bg-variant-1"
        animate={{
          scale: [1, 1.4, 1],
          rotate: [0, 180, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <div className="container mx-auto px-4 py-15 md:py-10 relative z-10" ref={containerRef}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-6 pl-4 md:pl-8 lg:pl-12"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="inline-flex items-center px-4 py-1.5 rounded-full bg-default-400/10 text-tertiary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-sm font-medium">Encuentra tu empleo ideal</span>
            </motion.div>
            <motion.h1
              className="text-4xl md:text-5xl lg:text-5xl font-bold leading-tight text-heading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Tu próxima{" "}
              <motion.span
                className="relative inline-block"
                whileHover={{ scale: 1.05 }}
              >
                <span className="relative z-10">oportunidad</span>
                <motion.span
                  className="absolute bottom-1 left-0 w-full h-3 -z-10"
                  style={{ background: "rgba(9, 121, 176, 0.2)" }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
              </motion.span>{" "}
              profesional te espera
            </motion.h1>
            <motion.p
              className="text-lg md:text-lg text-primary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Workflow conecta profesionales talentosos con las mejores empresas. Encuentra el trabajo de tus sueños o
              el candidato perfecto para tu equipo.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="text-white px-8 py-6" variant="default">
                  <Link href={locale.HERO.TEXT_BUTTON[0].LINK}>{locale.HERO.TEXT_BUTTON[0].TEXT}</Link>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" className="px-8 py-6 border-button-primary text-button-primary">
                  <Link href={locale.HERO.TEXT_BUTTON[1].LINK}>{locale.HERO.TEXT_BUTTON[1].TEXT}</Link>
                </Button>
              </motion.div>
            </motion.div>
            <motion.div
              className="flex items-center gap-6 pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="flex -space-x-2">
                {locale.HERO.IMAGES.map(({ id, SRC, ALT, WIDTH, HEIGHT }) => (
                  <motion.div
                    key={id}
                    className="w-10 h-10 rounded-full border-2 border-button-primary overflow-hidden bg-default-200"
                    whileHover={{ scale: 1.1, zIndex: 10 }}
                  >
                    <Image
                      src={SRC}
                      width={WIDTH}
                      height={HEIGHT}
                      alt={ALT}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
              </div>
              <p className="text-sm text-primary">
                <span className="font-bold">+10,000</span> profesionales contratados
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative h-[600px] -mr-4 md:-mr-8 lg:-mr-12"
            style={{ y, opacity }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            <Canvas
              shadows
              camera={{ position: [4, 3, 4], fov: 40 }}
              className="w-full h-full"
            >
              <ambientLight intensity={0.7} />
              <directionalLight
                position={[5, 5, 5]}
                intensity={1.2}
                castShadow
                shadow-mapSize={[1024, 1024]}
              />
              <WorkspaceScene isHovered={isHovered} />
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                minPolarAngle={Math.PI / 3}
                maxPolarAngle={Math.PI / 2}
                minAzimuthAngle={-Math.PI / 4}
                maxAzimuthAngle={Math.PI / 4}
              />
            </Canvas>

            <motion.div
              className="absolute -bottom-6 -left-6 p-4 bg-white rounded-lg shadow-lg border border-default-200"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-default-500"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Briefcase className="h-5 w-5 text-variant-1" />
                </motion.div>
                <div>
                  <p className="text-sm font-medium text-[#112D4E]">Empleos</p>
                  <p className="text-xs text-[#8E8E8E]">+{totalJobs} vacantes</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute top-32 right-6 p-4 bg-white rounded-lg shadow-lg border border-default-200"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-default-500"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Building className="h-5 w-5 text-variant-1" />
                </motion.div>
                <div>
                  <p className="text-sm font-medium text-[#112D4E]">Empresas</p>
                  <p className="text-xs text-tertiary">+{totalCompanies} contratando</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="w-full h-16 bg-white"
        style={{ clipPath: "polygon(0 0, 100% 100%, 100% 100%, 0% 100%)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.4 }}
      />
    </section>
  )
}