import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import type { Skill } from "@/types/interfaces"

interface SkillsCardProps {
  skills: Skill[] | null
}

export default function SkillsCard({ skills }: SkillsCardProps) {
  if (!skills) {
    return (
      <Card className="mt-10">
        <CardTitle className="text-heading text-md ml-5">Habilidades</CardTitle>
        <CardContent className="text-secondary text-sm">
          <p>No tiene habilidades registradas.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="mt-10">
      <CardTitle className="text-heading text-md ml-5">Habilidades</CardTitle>
      <CardContent className="text-secondary text-sm">
        {skills.length === 0 ? (
          <p>No tiene habilidades registradas.</p>
        ) : (
          skills.map((skill) => (
            <Badge key={skill.id_skill} className="mr-2 mb-2">
              {skill.name}
            </Badge>
          ))
        )}
      </CardContent>
    </Card>
  )
}
