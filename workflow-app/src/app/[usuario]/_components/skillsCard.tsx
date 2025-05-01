// components/SkillsCard.tsx
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Skill } from "@/types/user"

interface SkillsCardProps {
    skills: Skill[]; 
}

export default function SkillsCard({ skills }: SkillsCardProps) {
    return (
        <Card className="w-1/3 mt-10">
            <CardTitle className="text-heading text-md ml-5">Habilidades</CardTitle>
            <CardContent className="text-secondary text-sm">
                {skills.length === 0 ? (
                    <p>No tiene habilidades registradas.</p>
                ) : (
                    skills.map((skill) => (
                        <Badge key={skill.id_skill} className="mr-2 mb-2">
                            {skill.nombre}
                        </Badge>
                    ))
                )}
            </CardContent>
        </Card>
    );
}
