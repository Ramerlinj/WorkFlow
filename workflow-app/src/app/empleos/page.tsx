import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input"

export default function Empleos() {
  const empleos = [
    {
      titulo: "Desarrollador Frontend React",
      empresa: "TechSolutions Inc.",
      ubicacion: "Samaná",
      descripcion:
        "Estoy buscando el desarrollo de una interfaz frontend utilizando React que refleje las habilidades de un desarrollador profesional...",
      publicado: "Publicado hace 6 días",
      salario: "$ 1200 - 1800",
      tipo: "Tiempo Completo",
    },
    {
      titulo: "Diseñador UX/UI",
      empresa: "CreativeMinds",
      ubicacion: "Monseñor Nouel",
      descripcion:
        "Estoy buscando el desarrollo de una propuesta de diseño UX/UI que refleje las capacidades de un diseñador profesional...",
      publicado: "Publicado hace 2 días",
      salario: "$ 1000 - 1600",
      tipo: "Tiempo Parcial",
    },
    {
      titulo: "Desarrollador Backend Node.js",
      empresa: "ServerPro",
      ubicacion: "Romana",
      descripcion:
        "Estoy buscando el desarrollo de una solución backend utilizando Node.js, representando el trabajo de un desarrollador backend profesional para ServerPro.",
      publicado: "Publicado hace 10 días",
      salario: "$ 2500 - 2900",
      tipo: "Tiempo Completo",
    },
  ];

  return (
    <div className="flex bg-gray-100 min-h-screen p-6 gap-6">
      {/* Sidebar Filters */}
      <div className="bg-white shadow-lg rounded-xl p-5 w-80">
        <h1 className="text-2xl font-semibold mb-4">Filtros</h1>
        {["Ubicación", "Tipo de Empleo", "Categoría", "Rango Salarial"].map(
          (label) => (
            <div className="mb-4" key={label}>
              <label className="block text-gray-700 font-medium mb-1">
                {label}
              </label>
              <select
                className="w-full bg-gray-100 text-gray-500 border border-gray-300 rounded-md px-3 py-2 cursor-not-allowed"
                
              >
                <option>
                  {label === "Ubicación"
                    ? "Todas las Ciudades"
                    : label === "Tipo de Empleo"
                    ? "Todos los Tipos"
                    : label === "Categoría"
                    ? "Todas las categorías"
                    : "Cualquier Rango"}
                </option>
              </select>
            </div>
          )
        )}
        <button
          className="w-full bg-blue-800 text-white font-semibold py-2 rounded-lg opacity-60 cursor-not-allowed"
          
        >
          Aplicar Filtros
        </button>
      </div>

      {/* Main job list */}
      <div className="flex-1">
        <div className="flex items-center mb-6 gap-4">
          <input
            type="text"
            placeholder="Buscar por título, empresa o ubicación"
            className="flex-1 bg-gray-100 px-4 py-2 rounded-full text-sm text-gray-600"
          />
          <Button className="bg-blue-800">Agregar</Button>
        </div>

        <div className="flex gap-4 mb-4">
          <Button variant="outline">Más Recientes</Button>
          <Button variant="outline">Más Antigua</Button>
        </div>

        <div className="flex flex-col gap-4">
          {empleos.map((empleo, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-lg shadow-md flex justify-between items-start flex-wrap"
            >
              <div className="w-full md:w-2/3">
                <h2 className="text-lg font-bold">{empleo.titulo}</h2>
                <p className="text-gray-700">{empleo.empresa}</p>
                <p className="text-gray-500 text-sm mt-1">
                  📍 {empleo.ubicacion}
                </p>
                <p className="text-gray-600 text-sm mt-2">
                  <strong>Descripción:</strong> {empleo.descripcion.slice(0, 100)}...
                </p>
              </div>

              <div className="w-full md:w-1/3 text-right mt-4 md:mt-0">
                <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-semibold mb-2">
                  {empleo.tipo}
                </span>
                <p className="text-sm text-gray-500">{empleo.publicado}</p>
                <p className="font-semibold text-gray-800 mt-1">{empleo.salario}</p>
                <div className="flex flex-col gap-2 items-end">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-blue-800">Ver Detalles</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{empleo.titulo}</DialogTitle>
                      </DialogHeader>
                      <p>
                        <strong>Empresa:</strong> {empleo.empresa}
                      </p>
                      <p>
                        <strong>Ubicación:</strong> {empleo.ubicacion}
                      </p>
                      <p>
                        <strong>Tipo:</strong> {empleo.tipo}
                      </p>
                      <p>
                        <strong>Salario:</strong> {empleo.salario}
                      </p>
                      <p className="mt-2">
                        <strong>Descripción completa:</strong> {empleo.descripcion}
                      </p>
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="secondary">Aplicar</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Aplicar a {empleo.titulo}</DialogTitle>
                      </DialogHeader>
                      <form className="flex flex-col gap-3">
                        <Input
                          type="text"
                          placeholder="Teléfono"
                          className="border px-3 py-2 rounded-md"
                        />
                        <textarea
                          placeholder="Carta de presentación"
                          className="border px-3 py-2 rounded-md"
                        ></textarea>
                        <Input
                          type="text"
                          placeholder="Enlace a CV"
                          className="border px-3 py-2 rounded-md"
                        />
                        <Input
                          type="text"
                          placeholder="LinkedIn o Portafolio"
                          className="border px-3 py-2 rounded-md"
                        />
                        <Button type="submit" className="bg-blue-800">
                          Enviar Aplicación
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}