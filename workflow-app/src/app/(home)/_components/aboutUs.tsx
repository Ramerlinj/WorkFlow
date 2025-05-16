import { Search, Layers, Star } from "lucide-react"
import locale from "@/locale/landing.json"

export default function AboutUs(){
    return(
        <section className="w-full py-20 bg-default" >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div
              className="inline-flex items-center px-4 py-2 rounded-full mb-4 bg-default-500 text-tertiary"
            >
              <span className="text-sm font-medium">{locale.ABOUT_US.BADGE}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-heading" >
              {locale.ABOUT_US.TITLE}
            </h2>
            <p className="text-lg text-primary">
              {locale.ABOUT_US.DESCRIPTION}
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
                {locale.ABOUT_US.MISION[0].TITLE}
              </h3>
              <p className="text-primary">
                {locale.ABOUT_US.MISION[0].TEXT}
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-default-500">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-6 bg-default-500"
              >
                <Layers className="h-6 w-6 text-variant-1" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-heading">
                {locale.ABOUT_US.VISION[0].TITLE}
              </h3>
              <p className='text-primary'>
                {locale.ABOUT_US.VISION[0].TEXT}
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-default-500">
              <div
                className="w-14 h-14 bg-default-500 rounded-full flex items-center justify-center mb-6"
              >
                <Star className="h-6 w-6 text-variant-1" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-heading">
                {locale.ABOUT_US.VALUES[0].TITLE}
              </h3>
              <p className="text-primary">
                {locale.ABOUT_US.VALUES[0].TEXT}
              </p>
            </div>
          </div>
        </div>
      </section>
    )
}
