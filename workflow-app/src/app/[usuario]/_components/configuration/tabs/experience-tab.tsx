"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { X, Save, Plus, Loader2, CheckCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import type { WorkExperience } from "@/types/interfaces";
import { DatePicker } from "@/components/ui/datepicker";
import {
  getUserExperiences,
  createExperience,
  deleteExperience,
} from "@/lib/experienceServices";

// Formatea Date a YYYY-MM-DD
const formatDate = (d: Date | null): string =>
  d ? d.toISOString().split("T")[0] : "";

interface ExperienceTabProps {
  userId: number;
}

export function ExperienceTab({ userId }: ExperienceTabProps) {
  const [previewExps, setPreviewExps] = useState<WorkExperience[]>([]);
  const [deletedIds, setDeletedIds] = useState<number[]>([]);

  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState({
    title: "",
    company: "",
    startDate: null as Date | null,
    endDate: null as Date | null,
    currentJob: false,
    description: "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Carga inicial
  useEffect(() => {
    (async () => {
      const exps = await getUserExperiences(userId);
      setPreviewExps(exps);
    })();
  }, [userId]);

  // Agregar local
  const handleAdd = () => {
    if (!form.title || !form.company || !form.startDate) return;
    setPreviewExps((p) => [
      ...p,
      {
        id_experience: 0,
        id_user: userId,
        title: form.title,
        company: form.company,
        start_date: formatDate(form.startDate),
        end_date: form.currentJob ? null : formatDate(form.endDate),
        description: form.description || null,
      },
    ]);
    setForm({ title: "", company: "", startDate: null, endDate: null, currentJob: false, description: "" });
    setIsAdding(false);
  };

  // Marcar para borrar local
  const handleRemoveLocal = (exp: WorkExperience) => {
    setPreviewExps((p) => p.filter((e) => e.id_experience !== exp.id_experience));
    if (exp.id_experience > 0) {
      setDeletedIds((d) => [...d, exp.id_experience]);
    }
  };

  // Guardar en API
  const handleSave = async () => {
    setIsSaving(true);
    try {
      await Promise.all(deletedIds.map((id) => deleteExperience(id)));
      const toCreate = previewExps.filter((e) => e.id_experience === 0);
      const created = await Promise.all(toCreate.map((e) => createExperience(e)));
      const kept = previewExps.filter((e) => e.id_experience > 0);
      const updated = [...kept, ...created];
      setPreviewExps(updated);
      setDeletedIds([]);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      alert("Error al guardar experiencias.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Experiencia Laboral</h3>
        <Button variant="outline" size="sm" onClick={() => setIsAdding(true)} disabled={isAdding}>
          <Plus className="h-4 w-4 mr-2" /> Agregar Experiencia
        </Button>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {previewExps.map((exp) => (
            <motion.div
              key={exp.id_experience || exp.start_date + exp.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="border rounded-lg p-4 relative"
            >
              <div className="flex justify-between">
                <div>
                  <h4 className="font-medium">{exp.title}</h4>
                  <p className="text-sm text-muted-foreground">{exp.company}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(exp.start_date).toLocaleDateString("es-ES", { year: "numeric", month: "long" })} - {exp.end_date ? new Date(exp.end_date).toLocaleDateString("es-ES", { year: "numeric", month: "long" }) : "Actual"}
                  </p>
                  {exp.description && <p className="mt-2 text-sm">{exp.description}</p>}
                </div>
                <Button variant="ghost" size="icon" onClick={() => handleRemoveLocal(exp)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isAdding && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="border rounded-lg p-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Puesto</Label>
              <Input id="title" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="Desarrollador Frontend" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Empresa</Label>
              <Input id="company" value={form.company} onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))} placeholder="Tech Corp" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Fecha inicio</Label>
                <DatePicker value={form.startDate || undefined} onChange={(d) => setForm((f) => ({ ...f, startDate: d || null }))} placeholder="Fecha inicio" />
              </div>
              <div>
                <Label>Fecha fin</Label>
                <DatePicker value={form.endDate || undefined} onChange={(d) => setForm((f) => ({ ...f, endDate: d || null }))} placeholder={form.currentJob ? "Actual" : "Fecha fin"} />
                <label className="inline-flex items-center mt-1">
                  <input type="checkbox" checked={form.currentJob} onChange={(e) => setForm((f) => ({ ...f, currentJob: e.target.checked, endDate: null }))} className="mr-2" />
                  Trabajo actual
                </label>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="desc">Descripción</Label>
              <Textarea id="desc" value={form.description} onChange={(e) => setForm(( f) => ({ ...f, description: e.target.value }))} rows={3} />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsAdding(false)}>Cancelar</Button>
              <Button onClick={handleAdd} disabled={!form.title || !form.company || !form.startDate}>Agregar</Button>
            </div>
          </motion.div>
        )}
      </div>

      <div className="flex justify-end pt-4">
        <Button onClick={handleSave} disabled={isSaving || (previewExps.length === 0 && deletedIds.length === 0)} className="flex items-center gap-2">
          {isSaving ? (<><Loader2 className="h-4 w-4 animate-spin" /> Guardando...</>) : saveSuccess ? (<><CheckCircle className="h-4 w-4 text-green-500" /> ¡Guardado!</>) : (<><Save className="h-4 w-4" /> Guardar Cambios</>)}
        </Button>
      </div>
    </div>
  );
}
