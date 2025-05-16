import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function CTA(){
    return(
        <section className="w-full py-20 bg-gradient-to-br from-[#112D4E] to-[#144C8E]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              ¿Listo para dar el siguiente paso en tu carrera?
            </h2>
            <p className="text-lg mb-8 text-white/80">
              Únete a los miles de profesionales que han encontrado su empleo ideal con Workflow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className=" px-8 py-6 bg-white hover:bg-white/90 text-[#112D4E]">
                Buscar empleo ahora
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="px-10 py-6 bg-transparent border text-white">
                Registrate
              </Button>
            </div>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: "10,000+", label: "Profesionales contratados" },
                { number: "5,000+", label: "Empleos activos" },
                { number: "1,200+", label: "Empresas asociadas" },
                { number: "98%", label: "Tasa de satisfacción" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-white">{stat.number}</p>
                  <p className="text-white/70">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
}