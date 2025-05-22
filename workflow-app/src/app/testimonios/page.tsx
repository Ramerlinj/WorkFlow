import Testimonials from "@/app/testimonios/_components/testimonials"

export default function TestimonialsPage() {
  return (
    <main className="min-h-screen bg-[#F8F9FC] py-12">
      <div className="container mx-auto px-4">
        <h1 className="mb-8 text-center text-3xl font-bold text-[#112D4E] md:text-4xl">
          Opiniones de Nuestros Clientes
        </h1>
        <p className="mx-auto mb-12 max-w-2xl text-center text-[#415771]">
          Descubre lo que nuestros clientes dicen sobre nosotros. Nos enorgullece ofrecer un servicio excepcional y
          valoramos cada opinión.
        </p>

        <Testimonials authenticatedUserId={1} />
      </div>
    </main>
  )
}
