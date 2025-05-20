"use client";

import { useState, useEffect } from "react";
import {
  Label,
  Button,
  DialogTitle,
  DialogDescription,
  Badge,
} from "@/components/ui/";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  X,
  Save,
  ArrowUp,
  ArrowDown,
  Loader2,
  CheckCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import type { SkillResponse } from "@/types/interfaces";
import { getAllSkills } from "@/lib/userServices";
import { assignSkillToUser, removeUserSkill } from "@/lib/ServicesSkill";

interface SkillsTabProps {
  skills: SkillResponse[];               // Habilidades iniciales del usuario
  onSave: (skills: SkillResponse[]) => void;
  userId: number;
}

export function SkillsTab({
  skills: initialSkills,
  onSave,
  userId,
}: SkillsTabProps) {
  const [previewSkills, setPreviewSkills] = useState<SkillResponse[]>([]);
  const [availableSkills, setAvailableSkills] = useState<SkillResponse[]>([]);
  const [selectedSkillId, setSelectedSkillId] = useState<string>("");
  const [isLoadingSkills, setIsLoadingSkills] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  // Carga inicial: previewSkills + availableSkills filtrado
  useEffect(() => {
    setPreviewSkills(initialSkills);
    (async () => {
      setIsLoadingSkills(true);
      try {
        const all = await getAllSkills();
        setAvailableSkills(
          all.filter((s) => !initialSkills.some((us) => us.id_skill === s.id_skill))
        );
      } catch (err) {
        console.error("SkillsTab: fallo al cargar todas las skills", err);
      } finally {
        setIsLoadingSkills(false);
      }
    })();
  }, [initialSkills]);

  // Añadir
  const handleSkillSelect = (value: string) => {
    const id = Number(value);
    const skill = availableSkills.find((s) => s.id_skill === id);
    if (skill) {
      setPreviewSkills((prev) => [...prev, skill]);
      setAvailableSkills((prev) => prev.filter((s) => s.id_skill !== id));
      setSelectedSkillId("");
    }
  };

  // Eliminar (local)
  const handleRemoveSkill = (skill: SkillResponse) => {
    setPreviewSkills((prev) => prev.filter((s) => s.id_skill !== skill.id_skill));
    setAvailableSkills((prev) => [...prev, skill]);
  };

  // Reordenar
  const moveSkillUp = (idx: number) => {
    if (idx === 0) return;
    setPreviewSkills((prev) => {
      const arr = [...prev];
      [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]];
      return arr;
    });
  };
  const moveSkillDown = (idx: number) => {
    if (idx === previewSkills.length - 1) return;
    setPreviewSkills((prev) => {
      const arr = [...prev];
      [arr[idx], arr[idx + 1]] = [arr[idx + 1], arr[idx]];
      return arr;
    });
  };

  // Guardar: borra en backend y luego asigna
  const handleSaveSkills = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      // Detectar eliminadas
      const toRemove = initialSkills
        .filter((orig) => !previewSkills.some((s) => s.id_skill === orig.id_skill))
        .map((s) => s.id_skill);
      await Promise.all(
        toRemove.map((id_skill) =>
          removeUserSkill({ id_user: userId, id_skill })
        )
      );

      // Detectar nuevas
      const toAdd = previewSkills
        .filter((s) => !initialSkills.some((orig) => orig.id_skill === s.id_skill))
        .map((s) => s.id_skill);
      await Promise.all(
        toAdd.map((id_skill) =>
          assignSkillToUser({ id_user: userId, id_skill })
        )
      );

      onSave(previewSkills); // informar al padre

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: unknown) {
      console.error("Error guardando skills:", err);
      alert("Error: " + (err as Error).message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <DialogTitle className="text-xl font-semibold">
          Gestionar habilidades
        </DialogTitle>
        <DialogDescription>
          Añade, elimina y organiza tus habilidades profesionales.
        </DialogDescription>
      </div>

      {/* Selector */}
      <div className="space-y-2">
        <Label htmlFor="selectSkill">Seleccionar habilidad</Label>
        {isLoadingSkills ? (
          <div className="flex items-center gap-2 py-2">
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
            <span>Cargando habilidades...</span>
          </div>
        ) : (
          <Select value={selectedSkillId} onValueChange={handleSkillSelect}>
            <SelectTrigger>
              <SelectValue placeholder="Elige una habilidad" />
            </SelectTrigger>
            <SelectContent>
              {availableSkills.map((skill) => (
                <SelectItem
                  key={skill.id_skill}
                  value={skill.id_skill.toString()}
                >
                  {skill.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Preview */}
      <div className="border rounded-md p-4 min-h-[200px]">
        <Label>Tus habilidades seleccionadas</Label>
        {previewSkills.length === 0 ? (
          <div className="text-sm text-muted-foreground py-4">
            No has seleccionado ninguna aún.
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 mt-2">
            <AnimatePresence>
              {previewSkills.map((skill, idx) => (
                <motion.div
                  key={`${skill.id_skill}-${idx}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-1"
                >
                  <Badge
                    variant="default"
                    className="px-3 py-1 flex items-center gap-1 select-none"
                  >
                    {skill.name}
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="ml-1 hover:bg-primary-foreground rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                  <div className="flex flex-col">
                    <button
                      onClick={() => moveSkillUp(idx)}
                      disabled={idx === 0}
                      className="hover:bg-primary-foreground rounded-full p-0.5"
                    >
                      <ArrowUp className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => moveSkillDown(idx)}
                      disabled={idx === previewSkills.length - 1}
                      className="hover:bg-primary-foreground rounded-full p-0.5"
                    >
                      <ArrowDown className="h-3 w-3" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Guardar */}
      <div className="flex justify-end">
        <Button
          onClick={handleSaveSkills}
          disabled={isSaving}
          className="flex items-center gap-2"
        >
          {isSaving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Guardando...
            </>
          ) : saveSuccess ? (
            <>
              <CheckCircle className="h-4 w-4 text-green-500" />
              Guardado
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Guardar habilidades
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
