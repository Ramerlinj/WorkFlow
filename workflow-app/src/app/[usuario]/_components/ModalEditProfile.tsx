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
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type ModalEditProfileProps = {
  avatar: string | null;
  first_name: string | null;
  open: boolean;
  setOpen: (value: boolean) => void;
};

export function ModalEditProfile({
  avatar,
  first_name,
  open,
  setOpen,
}: ModalEditProfileProps) {
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(avatar);

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

    const handleClose = () => {
        setOpen(false);
        setPreviewAvatar(avatar);
    };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-3xl max-h-[500px] overflow-y-auto p-4">
        <DialogHeader>
          <DialogTitle>Editar perfil</DialogTitle>
          <DialogDescription>Edita el perfil a tu gusto.</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4>Contenido adicional</h4>
          </div>

          <div>
            <h4 className="font-semibold text-sm">Vista previa</h4>
            <div className="w-72 h-72 bg-default-50 mt-2 rounded-lg shadow-lg">
              <div className="bg-red-300 w-full h-32 rounded-t-lg relative">
                <div className="absolute rounded-full h-24 w-24 bg-default-50 mb-10 top-18 ml-5">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Avatar className="w-22 h-22 mt-1 mx-auto cursor-pointer hover:shadow-lg hover:opacity-80 transition-all duration-200 ease-in-out">
                        <AvatarImage
                          src={previewAvatar ?? undefined}
                          className="w-full h-full object-cover"
                        />
                        <AvatarFallback className="bg-amber-500 text-3xl w-full h-full object-cover">
                          {first_name ? first_name.charAt(0) : "?"}
                        </AvatarFallback>
                      </Avatar>
                    </PopoverTrigger>
                    <PopoverContent className="w-72 p-4 bg-default-100 shadow-lg rounded-lg">
                      <div className="flex flex-col gap-2">
                        <h4 className="text-heading text-md">
                          Cambiar foto de perfil
                        </h4>
                        <p className="text-secondary text-sm">
                          Sube una nueva foto de perfil para actualizar tu
                          imagen.
                        </p>
                        <Input
                          className="cursor-pointer"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
            <Button>Guadar cambios</Button>
          <DialogClose asChild>
            <Button variant="outline" onClick={handleClose}>Cerrar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
