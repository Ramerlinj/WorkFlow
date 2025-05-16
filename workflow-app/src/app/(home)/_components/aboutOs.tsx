import { Search, Layers, Star } from "lucide-react"

export default function AboutOs(){
    return(
        <section className="w-full py-20 bg-default" >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div
              className="inline-flex items-center px-4 py-2 rounded-full mb-4 bg-default-500 text-tertiary"
            >
              <span className="text-sm font-medium">Sobre Workflow</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-heading" >
              Conectamos talento con oportunidades laborales excepcionales
            </h2>
            <p className="text-lg text-primary">
              En Workflow, nos dedicamos a transformar la manera en que las personas encuentran empleo y las empresas
              descubren talento.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-default-500">
              <div
                className="w-14 h-14 bg-default-500 rounded-full flex items-center justify-center mb-6"
              >
                <Search className="h-6 w-6 text-variant-1"/>
              </div>
              <h3 className="text-xl font-bold mb-3 text-heading">
                Misión
              </h3>
              <p className="text-primary">
                Nuestra misión es conectar a profesionales talentosos con las mejores oportunidades laborales,
                facilitando el crecimiento profesional y empresarial.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-default-500">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-6 bg-default-500"
              >
                <Layers className="h-6 w-6 text-variant-1" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-heading">
                Visión
              </h3>
              <p className='text-primary'>
                Ser la plataforma líder en la conexión de talento y oportunidades, transformando positivamente el
                mercado laboral global.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-default-500">
              <div
                className="w-14 h-14 bg-default-500 rounded-full flex items-center justify-center mb-6"
              >
                <Star className="h-6 w-6 text-variant-1" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-heading">
                Valores
              </h3>
              <p className="text-primary">
                Excelencia, transparencia, innovación y compromiso con el éxito de candidatos y empresas son los valores
                que guían cada acción que tomamos.
              </p>
            </div>
          </div>
        </div>
      </section>
    )
}
