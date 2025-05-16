export default function WorkProcess(){
    return(
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
    )
}