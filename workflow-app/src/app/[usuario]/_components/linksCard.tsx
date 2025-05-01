// Importa la interfaz 'Link' desde 'user.ts' o donde la hayas definido
import { Link } from '@/types/user';
import { Card, CardContent, CardTitle } from "@/components/ui/card";

interface LinksCardProps {
    links: Link[]; 
}

export function LinksCard({ links }: LinksCardProps) {
    return (
        <Card className="mt-10">
            <CardTitle className="text-heading text-md ml-5">Enlaces</CardTitle>
            <CardContent className="text-secondary text-sm">
                {links.length === 0 ? (
                    <p>No tiene enlaces registrados.</p>
                ) : (
                    <ul className="list-disc ml-5">
                        {links.map((link) => (
                            <li key={link.id_links}>
                                <a
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-secondary hover:underline"
                                >
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
            </CardContent>
        </Card>
    );
}
