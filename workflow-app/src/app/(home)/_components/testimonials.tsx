import  Image from "next/image"
import Link from "next/link"

export default function Testimonials(){
    return (
        <section className="bg-f5f5f5 py-20">
                <div className="container mx-auto px-4">
                  <div className="max-w-3xl mx-auto text-center mb-16">
                    <div
                      className="inline-flex items-center px-4 py-2 rounded-full mb-4 bg-default-500 text-tertiary"
                    >
                      <span className="text-sm font-medium">Testimonios</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-112d4e">
                      Historias de éxito
                    </h2>
                    <p className="text-lg text-415771">
                      Descubre cómo Workflow ha transformado la vida profesional de miles de personas.
                    </p>
                  </div>
        
                  <Link className="text-blue-500 hover:underline flex justify-end ml-5" href='/testimonials'>Ver más.</Link>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                      {
                        src:"/avatars/avatar-1.jpg",
                        quote:
                          "Gracias a Workflow encontré mi trabajo ideal en menos de un mes. El proceso fue sencillo y el equipo me apoyó en cada paso.",
                        name: "Carlos Méndez",
                        position: "Desarrollador Frontend",
                        company: "TechSolutions",
                      },
                      {
                        src:"/avatars/avatar-2.jpg",
                        quote:
                          "Como reclutadora, Workflow ha revolucionado nuestra forma de encontrar talento. Hemos reducido nuestro tiempo de contratación en un 40%.",
                        name: "Laura Sánchez",
                        position: "Directora de RRHH",
                        company: "Innovatech",
                      },
                      {
                        src:"/avatars/avatar-3.jpg",
                        quote:
                          "El coaching profesional de Workflow me ayudó a reorientar mi carrera. Ahora tengo un trabajo que realmente disfruto y con mejor salario.",
                        name: "Miguel Rodríguez",
                        position: "Analista de Datos",
                        company: "DataCorp",
                      },
                    ].map((testimonial, index) => (
                      <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-edeeee">
                        <div className="mb-6">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span key={star} className="text-yellow-400">
                              ★
                            </span>
                          ))}
                        </div>
                        <p className="mb-6 italic text-415771">
                          &quot;{testimonial.quote}&quot;
                        </p>
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                            <Image
                              src={testimonial.src}
                              width={48}
                              height={48}
                              alt={testimonial.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium text-112d4e">
                              {testimonial.name}
                            </p>
                            <p className="text-sm text-8e8e8e">
                              {testimonial.position}, {testimonial.company}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
    )
}