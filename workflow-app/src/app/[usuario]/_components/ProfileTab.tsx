
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Building, Clock } from "lucide-react"
import { WorkExperience } from "@/types/user"

interface WorkExperienceTabsProps {
    workexperience: WorkExperience[];
}



export function ProfileTab({ workexperience }: WorkExperienceTabsProps) {
    return (
        
        <Card>
            <CardHeader>
                <CardTitle className="text-xl text-heading font-semibold">Experiencia Laboral</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                    Aquí puedes ver tu experiencia laboral registrada.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                {workexperience.length === 0 ? (
                    <p>No tiene experiencia laboral registrada.</p>
                ) : (
                    workexperience.map((experience) => (
                        <div key={experience.id_experience}>
                            <div className="flex items-center space-x-2 ">
                                <Building width={24} height={24} className="bg-default-500 rounded-full p-1 text-variant-1" />
                                <h2 className="text-sm text-heading font-semibold">{experience.title}</h2>
                            </div>
                            <div className="flex items-start space-x-4 ml-3">
                                <div className="w-[1px] h-20 bg-default-500"></div>
                                <div className="flex flex-col">
                                    <h3 className="text-sm flex items-center text-secondary">
                                        {experience.company} • <Clock className="w-3 h-auto mr-1 ml-1" /> {new Date(experience.start_date).getFullYear()} - {experience.end_date ? `${new Date(experience.end_date).getFullYear()}-${new Date(experience.end_date).getMonth() + 1}` : 'Actualidad'}
                                    </h3>
                                    <p className="text-primary text-sm">{experience.description}</p>
                                </div>
                            </div>
                        </div>

                    ))
                )}
            </CardContent>
        </Card>
    )
}
