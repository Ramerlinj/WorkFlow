import Image from "next/image"
import locale from "@/locale/landing.json"
export default function FeaturedCompany() {
    return(
        <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div
              className="inline-flex items-center px-4 py-2 rounded-full mb-4 bg-default-500 text-tertiary"
            >
              <span className="text-sm font-medium">{locale.FEATURE_COMPANY.BADGE}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-heading">
              {locale.FEATURE_COMPANY.TITLE}
            </h2>
            <p className="text-lg text-tertiary">
              {locale.FEATURE_COMPANY.SUBTITLE}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
            {locale.FEATURE_COMPANY.IMAGES.map(({SRC, ALT, WIDTH, HEIGHT}) => (
              <div className="flex justify-center mx-5" key={SRC}>
                <Image
                  src={SRC}
                  width={WIDTH}
                  height={HEIGHT}
                  alt={ALT}
                  className="opacity-70 hover:opacity-100 transition-opacity cursor-pointer duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

    )
}