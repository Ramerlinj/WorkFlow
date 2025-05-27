import { professions } from "@/data/profession"


export default function Category(){
    return(
        <section className="w-full py-20" style={{ background: "#FFFFFF" }}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div
              className="inline-flex items-center px-4 py-2 rounded-full mb-4"
              style={{ background: "#DDE6F6", color: "#3F72AF" }}
            >
              <span className="text-sm font-medium">Categorías</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-heading">
              Explora oportunidades por sector
            </h2>
            <p className="text-lg text-tertiary">
              Encuentra empleos en las industrias más demandadas y con mejores perspectivas de crecimiento.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {professions.map((profesion, id_profession) => (
              <div
                key={id_profession}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
                style={{ border: "1px solid #EDECEE" }}
              >
                <h3 className="text-lg font-bold mb-2" style={{ color: "#112D4E" }}>
                  {profesion.name}
                </h3>
                <p style={{ color: "#3F72AF" }}>{profesion.id_profession} empleos disponibles</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
}