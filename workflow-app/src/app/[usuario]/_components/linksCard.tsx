import type { Link as UserLink } from "@/types/interfaces"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import Link from "next/link"

interface LinksCardProps {
  links: UserLink[] | null
}

export function LinksCard({ links }: LinksCardProps) {

  if (!links) {
    return (
      <Card className="mt-10">
        <CardTitle className="text-heading text-md ml-5">Enlaces</CardTitle>
        <CardContent className="text-secondary text-sm">
          <p>No tiene enlaces registrados.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="mt-10">
      <CardTitle className="text-heading text-md ml-5">Enlaces</CardTitle>
      <CardContent className="text-secondary text-sm">
        {links.length === 0 ? (
          <p>No tiene enlaces registrados.</p>
        ) : (
          <ul className="list-disc ml-5">
            {links.map((link, index) => (
              <li key={link.id_link || `link-${index}`}>
                <Link href={link.url} target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">
                  {link.id_link_type === 1 ? 'Github' : link.id_link_type === 2 ? 'LinkedIn' : ''}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
