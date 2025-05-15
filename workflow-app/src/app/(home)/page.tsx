import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Award,
  Building,
  FileText,
  Layers,
  MessageSquare,
  Search,
  Star,
  Users,
} from "lucide-react"
import Hero from "./_components/hero_seccion"

export default function Home() {
  return (
    <main className="flex flex-col items-center">
     <Hero/>
      

      {/* Sobre Nosotros */}
      <section className="w-full py-20" style={{ background: "#F8F9FC" }}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div
              className="inline-flex items-center px-4 py-2 rounded-full mb-4"
              style={{ background: "#DDE6F6", color: "#3F72AF" }}
            >
              <span className="text-sm font-medium">Sobre Workflow</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: "#112D4E" }}>
              Conectamos talento con oportunidades laborales excepcionales
            </h2>
            <p className="text-lg" style={{ color: "#415771" }}>
              En Workflow, nos dedicamos a transformar la manera en que las personas encuentran empleo y las empresas
              descubren talento.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm" style={{ border: "1px solid #EDECEE" }}>
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
                style={{ background: "#DDE6F6" }}
              >
                <Search className="h-6 w-6" style={{ color: "#0979b0" }} />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: "#112D4E" }}>
                Misión
              </h3>
              <p style={{ color: "#415771" }}>
                Nuestra misión es conectar a profesionales talentosos con las mejores oportunidades laborales,
                facilitando el crecimiento profesional y empresarial.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm" style={{ border: "1px solid #EDECEE" }}>
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
                style={{ background: "#DDE6F6" }}
              >
                <Layers className="h-6 w-6" style={{ color: "#0979b0" }} />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: "#112D4E" }}>
                Visión
              </h3>
              <p style={{ color: "#415771" }}>
                Ser la plataforma líder en la conexión de talento y oportunidades, transformando positivamente el
                mercado laboral global.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm" style={{ border: "1px solid #EDECEE" }}>
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
                style={{ background: "#DDE6F6" }}
              >
                <Star className="h-6 w-6" style={{ color: "#0979b0" }} />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: "#112D4E" }}>
                Valores
              </h3>
              <p style={{ color: "#415771" }}>
                Excelencia, transparencia, innovación y compromiso con el éxito de candidatos y empresas son los valores
                que guían cada acción que tomamos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section className="w-full py-20" style={{ background: "#FFFFFF" }}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div
              className="inline-flex items-center px-4 py-2 rounded-full mb-4"
              style={{ background: "#DDE6F6", color: "#3F72AF" }}
            >
              <span className="text-sm font-medium">Nuestros Servicios</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: "#112D4E" }}>
              Soluciones completas para tu carrera profesional
            </h2>
            <p className="text-lg" style={{ color: "#415771" }}>
              Ofrecemos servicios integrales tanto para candidatos como para empresas que buscan talento.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Search className="h-6 w-6" style={{ color: "#0979b0" }} />,
                title: "Búsqueda de Empleo",
                description:
                  "Accede a miles de ofertas laborales filtradas según tus habilidades y preferencias profesionales.",
              },
              {
                icon: <FileText className="h-6 w-6" style={{ color: "#0979b0" }} />,
                title: "Optimización de CV",
                description: "Mejora tu currículum para destacar entre los candidatos y aumentar tus posibilidades.",
              },
              {
                icon: <Award className="h-6 w-6" style={{ color: "#0979b0" }} />,
                title: "Evaluación de Habilidades",
                description: "Evalúa y certifica tus competencias para demostrar tu valía a potenciales empleadores.",
              },
              {
                icon: <Users className="h-6 w-6" style={{ color: "#0979b0" }} />,
                title: "Reclutamiento",
                description: "Servicios especializados para empresas que buscan el mejor talento para sus equipos.",
              },
              {
                icon: <Building className="h-6 w-6" style={{ color: "#0979b0" }} />,
                title: "Employer Branding",
                description: "Ayudamos a las empresas a construir una marca empleadora atractiva para el talento.",
              },
              {
                icon: <MessageSquare className="h-6 w-6" style={{ color: "#0979b0" }} />,
                title: "Coaching Profesional",
                description: "Asesoramiento personalizado para impulsar tu carrera y alcanzar tus metas profesionales.",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                style={{ border: "1px solid #EDECEE" }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
                  style={{ background: "#DDE6F6" }}
                >
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: "#112D4E" }}>
                  {service.title}
                </h3>
                <p style={{ color: "#415771" }}>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proceso de Trabajo */}
      <section className="w-full py-20" style={{ background: "#F5F5F5" }}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div
              className="inline-flex items-center px-4 py-2 rounded-full mb-4"
              style={{ background: "#DDE6F6", color: "#3F72AF" }}
            >
              <span className="text-sm font-medium">Nuestro Proceso</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: "#112D4E" }}>
              Cómo te ayudamos a encontrar tu empleo ideal
            </h2>
            <p className="text-lg" style={{ color: "#415771" }}>
              Nuestro enfoque metódico garantiza resultados excepcionales en tu búsqueda de empleo.
            </p>
          </div>

          <div className="relative">
            <div
              className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1"
              style={{ background: "#DDE6F6", transform: "translateX(-50%)" }}
            ></div>

            <div className="space-y-12 relative">
              {[
                {
                  number: "01",
                  title: "Registro y Perfil",
                  description: "Crea tu perfil profesional destacando tus habilidades, experiencia y objetivos.",
                },
                {
                  number: "02",
                  title: "Búsqueda Personalizada",
                  description: "Accede a ofertas laborales filtradas según tus preferencias y cualificaciones.",
                },
                {
                  number: "03",
                  title: "Aplicación Simplificada",
                  description: "Postúlate a empleos con un solo clic y gestiona todas tus aplicaciones.",
                },
                {
                  number: "04",
                  title: "Entrevistas y Seguimiento",
                  description: "Recibe preparación para entrevistas y seguimiento durante todo el proceso.",
                },
                {
                  number: "05",
                  title: "Contratación y Onboarding",
                  description: "Celebra tu nueva posición y recibe apoyo durante tu incorporación.",
                },
              ].map((step, index) => (
                <div
                  key={index}
                  className={`flex flex-col ${index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-8`}
                >
                  <div className="md:w-1/2 relative">
                    <div
                      className="hidden md:block absolute top-1/2 w-12 h-1"
                      style={{
                        background: "#DDE6F6",
                        [index % 2 === 1 ? "right" : "left"]: "0",
                        transform: `translateY(-50%) translateX(${index % 2 === 1 ? "" : "-"}100%)`,
                      }}
                    ></div>
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold relative z-10 mx-auto md:mx-0"
                      style={{
                        background: "#0979b0",
                        color: "white",
                        [index % 2 === 1 ? "marginRight" : "marginLeft"]: "0",
                      }}
                    >
                      {step.number}
                    </div>
                  </div>
                  <div className="md:w-1/2 bg-white p-8 rounded-xl shadow-sm" style={{ border: "1px solid #EDECEE" }}>
                    <h3 className="text-xl font-bold mb-3" style={{ color: "#112D4E" }}>
                      {step.title}
                    </h3>
                    <p style={{ color: "#415771" }}>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categorías de Empleo */}
      <section className="w-full py-20" style={{ background: "#FFFFFF" }}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div
              className="inline-flex items-center px-4 py-2 rounded-full mb-4"
              style={{ background: "#DDE6F6", color: "#3F72AF" }}
            >
              <span className="text-sm font-medium">Categorías</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: "#112D4E" }}>
              Explora oportunidades por sector
            </h2>
            <p className="text-lg" style={{ color: "#415771" }}>
              Encuentra empleos en las industrias más demandadas y con mejores perspectivas de crecimiento.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { name: "Tecnología", count: 1240 },
              { name: "Marketing", count: 850 },
              { name: "Finanzas", count: 620 },
              { name: "Salud", count: 540 },
              { name: "Educación", count: 480 },
              { name: "Ingeniería", count: 390 },
              { name: "Diseño", count: 320 },
              { name: "Ventas", count: 290 },
            ].map((category, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
                style={{ border: "1px solid #EDECEE" }}
              >
                <h3 className="text-lg font-bold mb-2" style={{ color: "#112D4E" }}>
                  {category.name}
                </h3>
                <p style={{ color: "#3F72AF" }}>{category.count} empleos disponibles</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="w-full py-20" style={{ background: "#F5F5F5" }}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div
              className="inline-flex items-center px-4 py-2 rounded-full mb-4"
              style={{ background: "#DDE6F6", color: "#3F72AF" }}
            >
              <span className="text-sm font-medium">Testimonios</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: "#112D4E" }}>
              Historias de éxito
            </h2>
            <p className="text-lg" style={{ color: "#415771" }}>
              Descubre cómo Workflow ha transformado la vida profesional de miles de personas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "Gracias a Workflow encontré mi trabajo ideal en menos de un mes. El proceso fue sencillo y el equipo me apoyó en cada paso.",
                name: "Carlos Méndez",
                position: "Desarrollador Frontend",
                company: "TechSolutions",
              },
              {
                quote:
                  "Como reclutadora, Workflow ha revolucionado nuestra forma de encontrar talento. Hemos reducido nuestro tiempo de contratación en un 40%.",
                name: "Laura Sánchez",
                position: "Directora de RRHH",
                company: "Innovatech",
              },
              {
                quote:
                  "El coaching profesional de Workflow me ayudó a reorientar mi carrera. Ahora tengo un trabajo que realmente disfruto y con mejor salario.",
                name: "Miguel Rodríguez",
                position: "Analista de Datos",
                company: "DataCorp",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm" style={{ border: "1px solid #EDECEE" }}>
                <div className="mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-yellow-400">
                      ★
                    </span>
                  ))}
                </div>
                <p className="mb-6 italic" style={{ color: "#415771" }}>
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                    <Image
                      src={`/placeholder.svg?height=48&width=48&text=${testimonial.name.charAt(0)}`}
                      width={48}
                      height={48}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium" style={{ color: "#112D4E" }}>
                      {testimonial.name}
                    </p>
                    <p className="text-sm" style={{ color: "#8E8E8E" }}>
                      {testimonial.position}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Empresas Destacadas */}
      <section className="w-full py-20" style={{ background: "#FFFFFF" }}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div
              className="inline-flex items-center px-4 py-2 rounded-full mb-4"
              style={{ background: "#DDE6F6", color: "#3F72AF" }}
            >
              <span className="text-sm font-medium">Empresas Destacadas</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: "#112D4E" }}>
              Conectamos con las mejores empresas
            </h2>
            <p className="text-lg" style={{ color: "#415771" }}>
              Miles de empresas líderes confían en Workflow para encontrar el mejor talento.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex justify-center">
                <Image
                  src={`/placeholder.svg?height=60&width=120&text=Logo+${i}`}
                  width={120}
                  height={60}
                  alt={`Logo empresa ${i}`}
                  className="opacity-70 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="w-full py-20" style={{ background: "linear-gradient(135deg, #112D4E 0%, #144C8E 100%)" }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              ¿Listo para dar el siguiente paso en tu carrera?
            </h2>
            <p className="text-lg mb-8 text-white/80">
              Únete a los miles de profesionales que han encontrado su empleo ideal con Workflow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="text-white px-8 py-6 bg-white hover:bg-white/90" style={{ color: "#112D4E" }}>
                Buscar empleo ahora
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="px-8 py-6 border-white text-white hover:bg-white/10">
                Para empresas
              </Button>
            </div>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: "10,000+", label: "Profesionales contratados" },
                { number: "5,000+", label: "Empleos activos" },
                { number: "1,200+", label: "Empresas asociadas" },
                { number: "95%", label: "Tasa de satisfacción" },
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
    </main>
  )
}
