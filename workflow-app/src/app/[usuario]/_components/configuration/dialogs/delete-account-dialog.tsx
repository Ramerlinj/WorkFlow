"use client";

import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { deleteUser } from "@/lib/getUser";
import { useRouter } from "next/navigation";

interface DeleteAccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  username: string; // Asegúrate de pasar el username aquí
}

export function DeleteAccountDialog({
  open,
  onOpenChange,
  username,
}: DeleteAccountDialogProps) {
  const [confirmText, setConfirmText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const canDelete = confirmText.trim().toUpperCase() === "ELIMINAR";

  const handleDelete = async () => {
    if (!canDelete) return;
    setIsDeleting(true);
    const success = await deleteUser(username);
    setIsDeleting(false);

    if (success) {
      // Cierra el modal y redirige al home u otra página
      onOpenChange(false);
      router.push("/"); 
    } else {
      alert("Ocurrió un error al eliminar la cuenta. Intenta de nuevo.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Eliminar cuenta</DialogTitle>
          <DialogDescription>
            Esta acción es irreversible. Para confirmar, escribe <strong>ELIMINAR</strong>.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="delete-confirm">Confirmación</Label>
            <Input
              id="delete-confirm"
              placeholder='Escribe "ELIMINAR"'
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={!canDelete || isDeleting}
          >
            {isDeleting ? "Eliminando..." : "Eliminar cuenta"}
          </Button>
          <DialogClose asChild>
            <Button variant="outline" disabled={isDeleting}>
              Cancelar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
