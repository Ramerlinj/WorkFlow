import * as Icons from "lucide-react"
import locale from "@/locale/landing.json"
import type { FC } from "react"

const ServicesList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {locale.SERVICES.ITEMS.map(({ ID, ICON, TITLE, DESCRIPTION }) => {
        const IconComponent = Icons[ICON as keyof typeof Icons] as FC<{ size?: number, className?: string }>;

        return (
          <div
            key={ID}
            className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-secondary-200"
          >
            <div className="w-14 h-14 rounded-full flex items-center justify-center mb-6 bg-default-500">
              {IconComponent ? <IconComponent size={24} className="text-variant-1" /> : null}
            </div>
            <h3 className="text-xl font-bold mb-3 text-primary">{TITLE}</h3>
            <p className="text-tertiary">{DESCRIPTION}</p>
          </div>
        )
      })}
    </div>
  )
}

export default function Services() {
  return (
    <section className="w-full py-20 bg-default">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div
            className="inline-flex items-center px-4 py-2 rounded-full mb-4 bg-default-500 text-tertiary"
          >
            <span className="text-sm font-medium">{locale.SERVICES.DATA[0].BADGE}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-heading">
            {locale.SERVICES.DATA[0].TITLE}
          </h2>
          <p className="text-lg text-primary">
            {locale.SERVICES.DATA[0].DESCRIPTION}
          </p>
        </div>

        <ServicesList />
      </div>
    </section>
  )
}