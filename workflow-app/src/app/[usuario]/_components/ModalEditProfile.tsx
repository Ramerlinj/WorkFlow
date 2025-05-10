import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import avatarColors from './ColorAvatar';
import { Textarea } from "@/components/ui/textarea";


type ModalEditProfileProps = {
  avatar: string | null;
  firstName: string | null;
  isOpen: boolean;
  username: string | null;
  firstSurname: string | null;
  aboutMe: string | null;
  setIsOpen: (value: boolean) => void;
  onAvatarChange: (newAvatar: string) => void; // Prop para manejar el cambio de avatar
};

export function ModalEditProfile({
  avatar,
  firstName,
  isOpen,
  username,
  firstSurname,
  aboutMe,
  setIsOpen,
  onAvatarChange,
}: ModalEditProfileProps) {
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(avatar);
  const [showPopover, setShowPopover] = useState(false);





  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const imageUrl = reader.result as string;
      setPreviewAvatar(imageUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    // Llamar a la función que actualizará el avatar en el componente principal
    onAvatarChange(previewAvatar || "");
    setIsOpen(false);
  };
  const initial = firstName ? firstName.charAt(0).toUpperCase() : ""
  const backgroundColor = avatarColors[initial] || "#999"

  const handleClose = () => {
    setIsOpen(false);
    setPreviewAvatar(avatar);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-3xl max-h-[500px] overflow-y-auto p-4">
        <DialogHeader>
          <DialogTitle>Editar perfil</DialogTitle>
          <DialogDescription>Edita el perfil a tu gusto.</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center">
            <h4 className="font-semibold text-sm">Contenido adicional</h4>
            <div className="flex flex-col gap-2 mt-2">
              <form action="">
                <div className="flex flex-col">
                  <label htmlFor="firstName" className="text-sm text-secondary">Nombre</label>
                  <Input
                    id="username"
                    type="text"
                    defaultValue={firstName || ""}
                    className="w-72"
                  />
                  </div>
                  <div className="flex flex-col mt-2">
                  <label htmlFor="firstSurname" className="text-sm text-secondary">Sobre mí</label>
                  <Textarea
                  id="aboutMe"
                  defaultValue={aboutMe || ""}
                  className="w-72 h-32 resize-none"
                  placeholder="Escribe algo sobre ti..."
                  onChange={(e) => setPreviewAvatar(e.target.value)}
                  />
                  <h4 className="text-sm text-secondary">Color del banner</h4>
                    <div className="bg-amber-100 rounded-4xl w-12 h-12 cursor-pointer"></div>
                    
                  </div>
                
              </form>
              
              </div>
          </div>

          <div className="flex flex-col items-center">
            <h4 className="font-semibold text-sm">Vista previa</h4>
            <div className="w-72 h-72 bg-default-50 mt-2 rounded-lg shadow-lg">
              <div className="bg-red-300 w-full h-32 rounded-t-lg relative">
                <div className="absolute rounded-full h-24 w-24 bg-default-50 mb-10 top-18 ml-5">
                        <Avatar onClick={() => setShowPopover(!showPopover)} className="w-22 h-22 mt-1 mx-auto cursor-pointer hover:shadow-lg hover:opacity-80 transition-all duration-200 ease-in-out">
                          <AvatarImage
                          src={previewAvatar ?? undefined}
                          className="w-full h-full object-cover"
                          />
                          <AvatarFallback style={{ backgroundColor }} className="text-3xl text-default-50 w-full h-full object-cover">
                          {initial}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col items-center mt-5">
                          <div className="ml-15 flex gap-2 font-semibold text-lg text-default-400">
                          <span>{firstName}</span>
                          <span>{firstSurname}</span>
                          </div>
                          <span className="mr-14 text-sm text-gray-500">{username}</span>
                          <div className="flex flex-col items-center ml-27 justify-center">
                          <p className="text-sm text-gray-600 justify-center truncate overflow-hidden max-w-xs">
                          {aboutMe && aboutMe.length > 30 ? `${aboutMe.slice(0, 30)}...` : aboutMe}
                          </p>

                          </div>
                        </div>
                  {showPopover && (
                    <div className="absolute left-10 top-20 w-72 p-4 bg-default-100 shadow-lg rounded-lg z-50">
                      <div className="flex flex-col gap-2">
                        <h4 className="text-heading text-md">Cambiar foto de perfil</h4>
                        <p className="text-secondary text-sm">
                          Sube una nueva foto de perfil para actualizar tu imagen.
                        </p>
                        <Input
                          className="cursor-pointer"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSave}>Guardar cambios</Button>
          <DialogClose asChild>
            <Button variant="outline" onClick={handleClose}>
              Cerrar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
