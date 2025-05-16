import Hero from "./_components/hero"
import AboutUs from "./_components/aboutUs"
import Services from "./_components/services"
import WorkProcess from "./_components/workProcess"
import Category from "./_components/category"
import FeaturedCompany from "./_components/featuredCompany"
import Testimonials from "./_components/testimonials"
import CTA from "./_components/cta"

export default function Home() {
  return (
    <main className="flex flex-col items-center">
     <Hero />
     <AboutUs />
      <Services />
      <WorkProcess/>
      <Category/>
      <Testimonials/>
      <FeaturedCompany />
      <CTA/>
    </main>
  )
}
