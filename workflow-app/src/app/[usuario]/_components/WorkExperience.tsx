import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building, Clock, Calendar } from "lucide-react"
import type { WorkExperience } from "@/types/interfaces"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

interface WorkExperienceTabsProps {
  workexperience: WorkExperience[]
}

export function ProfileTab({ workexperience }: WorkExperienceTabsProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
    })
  }

  const calculateDuration = (startDate: string, endDate: string | null) => {
    const start = new Date(startDate)
    const end = endDate ? new Date(endDate) : new Date()

    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())

    const years = Math.floor(months / 12)
    const remainingMonths = months % 12

    if (years > 0 && remainingMonths > 0) {
      return `${years} año${years > 1 ? "s" : ""}, ${remainingMonths} mes${remainingMonths > 1 ? "es" : ""}`
    } else if (years > 0) {
      return `${years} año${years > 1 ? "s" : ""}`
    } else {
      return `${remainingMonths} mes${remainingMonths > 1 ? "es" : ""}`
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Experiencia Laboral</CardTitle>
        <CardDescription>Historial profesional y experiencia laboral</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {workexperience && workexperience.length > 0 ? (
          workexperience.map((experience, index) => (
            <div key={experience.id_experience}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Building className="h-5 w-5 text-primary" />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <h3 className="font-semibold text-base">{experience.title}</h3>
                    <Badge variant="outline" className="w-fit">
                      <Clock className="mr-1 h-3 w-3" />
                      {calculateDuration(experience.start_date, experience.end_date)}
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground mt-1">{experience.company}</p>

                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <Calendar className="mr-1 h-3 w-3" />
                    <span>
                      {formatDate(experience.start_date)} -{" "}
                      {experience.end_date ? formatDate(experience.end_date) : "Actualidad"}
                    </span>
                  </div>

                  <p className="mt-3 text-sm">{experience.description}</p>
                </div>
              </div>

              {index < workexperience.length - 1 && <Separator className="my-4" />}
            </div>
          ))
        ) : (
          <div className="text-center py-6">
            <p className="text-muted-foreground">No hay experiencia laboral registrada.</p>
            <Button variant="outline" className="mt-4">
              Añadir experiencia
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
