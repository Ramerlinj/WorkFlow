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

import { WorkExperience, UserConfig } from "@/types/user"
import { ProfileTab } from "./ProfileTab"

import ConfigurationTab  from "./ConfigurationTab"
interface WorkExperienceTabsProps {
    workexperience: WorkExperience[]; 
}
interface ConfigurationTabsProps {
    UserConfig: UserConfig; 
}

interface ConfigurationExperienceProps extends WorkExperienceTabsProps, ConfigurationTabsProps { }

export function TabsDemo({ UserConfig,workexperience }: ConfigurationExperienceProps) {
    return (
        <Tabs defaultValue="profile" className="w-3/4 ml-12" orientation="horizontal">
            <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger className="cursor-pointer " value="profile">Perfil</TabsTrigger>
                <TabsTrigger className="cursor-pointer" value="configuration">Configuracion</TabsTrigger>
                <TabsTrigger className="cursor-pointer" value="Planes">Planes</TabsTrigger>
                <TabsTrigger className="cursor-pointer" value="Pagos">Pagos</TabsTrigger>
            </TabsList>
            <TabsContent value="profile">
                <ProfileTab workexperience={workexperience}/>
            </TabsContent>
            <TabsContent value="configuration">
               <ConfigurationTab UserConfig={UserConfig}/>
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
