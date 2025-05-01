import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

import { WorkExperience } from "@/types/user"

interface WorkExperienceTabsProps {
    workexperience: WorkExperience[]; 
}

export function Configuracion({ workexperience }: WorkExperienceTabsProps) {
    return (
        <Tabs defaultValue="Perfil" className="w-3/4 ml-12" orientation="horizontal">
            <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger className="cursor-pointer" value="Perfil">Perfil</TabsTrigger>
                <TabsTrigger className="cursor-pointer" value="Configuracion">Configuracion</TabsTrigger>
                <TabsTrigger className="cursor-pointer" value="Planes">Planes</TabsTrigger>
                <TabsTrigger className="cursor-pointer" value="Pagos">Pagos</TabsTrigger>
            </TabsList>
            <TabsContent value="Perfil">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl text-heading font-semibold">Experiencia Laboral</CardTitle>
                        <CardDescription>
                            {workexperience.length === 0 ? (
                                <p>No tiene experiencia laboral registrada.</p>
                            ) : (
                                workexperience.map((experience) => (
                                    <div key={experience.id_experience}>
                                        <h2 className="text-sm text-heading">{experience.title}</h2>
                                        <h3 className="text-sm ">{experience.company} • {new Date(experience.start_date).getFullYear()} - {experience.end_date ? experience.end_date : 'Presente' }</h3>
                                        <p className="text-primary">{experience.description}</p>
                                        
                                    </div>
                                ))
                            )}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                       <div className=""></div>
                    </CardContent>
                    <CardFooter>
                        <Button>Save changes</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
            <TabsContent value="Configuracion">
                <Card>
                    <CardHeader>
                        <CardTitle>Password</CardTitle>
                        <CardDescription>
                            Change your password here. After saving, youll be logged out.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="current">Current password</Label>
                            <Input id="current" type="password" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="new">New password</Label>
                            <Input id="new" type="password" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Save password</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
            <TabsContent value="planes">
                <Card>
                    <CardHeader>
                        <CardTitle>Password</CardTitle>
                        <CardDescription>
                            Change your password here. After saving, youll be logged out.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="current">Current password</Label>
                            <Input id="current" type="password" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="new">New password</Label>
                            <Input id="new" type="password" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Save password</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
            <TabsContent value="pagos">
                <Card>
                    <CardHeader>
                        <CardTitle>Password</CardTitle>
                        <CardDescription>
                            Change your password here. After saving, youll be logged out.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="current">Current password</Label>
                            <Input id="current" type="password" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="new">New password</Label>
                            <Input id="new" type="password" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Save password</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>
        
    )
}
