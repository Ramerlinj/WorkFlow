import { Button } from "@/components/ui/button"
import {ArrowRight, Briefcase, Building} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import locale from "@/locale/landing.json"

function Hero(){
    return(
        <section

        className="w-full relative overflow-hidden bg-gradient-to-br from-default-500 to-default"
      >
        <div
          className="absolute -top-24 -right-24 w-64 h-64 rounded-full opacity-20 bg-variant-1"
        ></div>
        <div
          className="absolute top-40 -left-20 w-40 h-40 rounded-full opacity-10 bg-button-primary"
        ></div>
        <div
          className="absolute bottom-10 right-1/4 w-32 h-32 rounded-full opacity-15 bg-variant-1"
        ></div>

        <div className="container mx-auto px-4 py-15 md:py-10 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div
                className="inline-flex items-center px-4 py-2 rounded-full bg-default-400/10 text-tertiary"
              >
                <span className="text-sm font-medium">Encuentra tu empleo ideal</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold leading-tight text-heading">
                Tu próxima{" "}
                <span className="relative">
                  <span className="relative z-10">oportunidad</span>
                  <span
                    className="absolute bottom-1 left-0 w-full h-3 -z-10 text-5xl"
                    style={{ background: "rgba(9, 121, 176, 0.2)" }}
                  ></span>
                </span>{" "}
                profesional te espera
              </h1>
              <p className="text-lg md:text-lg text-primary">
                Workflow conecta profesionales talentosos con las mejores empresas. Encuentra el trabajo de tus sueños o
                el candidato perfecto para tu equipo.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="text-white px-8 py-6" variant="default" >
                  <Link href={locale.HERO.TEXT_BUTTON[0].LINK}>{locale.HERO.TEXT_BUTTON[0].TEXT}</Link>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" className="px-8 py-6 border-button-primary text-button-primary">
                <Link href={locale.HERO.TEXT_BUTTON[1].LINK}>{locale.HERO.TEXT_BUTTON[1].TEXT}</Link>
                </Button>
              </div>
              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-2">
                  {locale.HERO.IMAGES.map(({id ,SRC, ALT, WIDTH, HEIGHT}) => (
                    <div
                      key={id}
                      className="w-10 h-10 rounded-full border-2 border-button-primary overflow-hidden bg-default-200"
                    >
                      <Image
                        src={SRC}
                        width={WIDTH}
                        height={HEIGHT}
                        alt={ALT}
                        className="w-full h-full object-cover"
                      /> 
                    </div>
                  ))}
                </div>
                <p className="text-sm text-primary">
                  <span className="font-bold">+10,000</span> profesionales contratados
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/50 rounded-2xl transform rotate-3 scale-95"></div>
              <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
                <Image
                  src='/images/heroi.jpg'
                  width={500}
                  height={500}
                  alt="Plataforma de búsqueda de empleo"
                  className="object-cover"
                />
              </div>
              <div
                className="absolute -bottom-6 -left-6 p-4 bg-white rounded-lg shadow-lg border border-default-200"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-default-500"
                  >
                    <Briefcase className="h-5 w-5 text-variant-1" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#112D4E]">
                      Empleos
                    </p>
                    <p className="text-xs text-[#8E8E8E]">
                      +5,000 vacantes
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="absolute -top-6 -right-6 p-4 bg-white rounded-lg shadow-lg border border-default-200"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-default-500"
                  >
                    <Building className="h-5 w-5 text-variant-1" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#112D4E]">
                      Empresas
                    </p>
                    <p className="text-xs text-tertiary">
                      +1,200 contratando
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-16 bg-white" style={{ clipPath: "polygon(0 0, 100% 100%, 100% 100%, 0% 100%)" }}></div>
      </section>
    )
}

export default Hero