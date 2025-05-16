import { Search, FileText, Award, Users, Building, MessageSquare } from "lucide-react"


export default function Services() {
    return(
        <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div
              className="inline-flex items-center px-4 py-2 rounded-full mb-4 bg-secondary-100 text-secondary-500"
            >
              <span className="text-sm font-medium">Nuestros Servicios</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">
              Soluciones completas para tu carrera profesional
            </h2>
            <p className="text-lg text-tertiary">
              Ofrecemos servicios integrales tanto para candidatos como para empresas que buscan talento.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Search className="h-6 w-6 text-primary" />,
                title: "Búsqueda de Empleo",
                description:
                  "Accede a miles de ofertas laborales filtradas según tus habilidades y preferencias profesionales.",
              },
              {
                icon: <FileText className="h-6 w-6 text-primary" />,
                title: "Optimización de CV",
                description: "Mejora tu currículum para destacar entre los candidatos y aumentar tus posibilidades.",
              },
              {
                icon: <Award className="h-6 w-6 text-primary" />,
                title: "Evaluación de Habilidades",
                description: "Evalúa y certifica tus competencias para demostrar tu valía a potenciales empleadores.",
              },
              {
                icon: <Users className="h-6 w-6 text-primary" />,
                title: "Reclutamiento",
                description: "Servicios especializados para empresas que buscan el mejor talento para sus equipos.",
              },
              {
                icon: <Building className="h-6 w-6 text-primary" />,
                title: "Employer Branding",
                description: "Ayudamos a las empresas a construir una marca empleadora atractiva para el talento.",
              },
              {
                icon: <MessageSquare className="h-6 w-6 text-primary" />,
                title: "Coaching Profesional",
                description: "Asesoramiento personalizado para impulsar tu carrera y alcanzar tus metas profesionales.",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-secondary-200"
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-6 bg-secondary-100"
                >
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-primary">
                  {service.title}
                </h3>
                <p className="text-tertiary">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
}