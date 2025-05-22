// components/LinksTab.tsx
'use client'

import React, { useState, useEffect } from "react";
import {
  Label,
  Input,
  Button,
  DialogTitle,
  DialogDescription,
  Card,
  CardContent,
} from "@/components/ui/";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import {
  Plus,
  Trash2,
  Link2,
  Save,
  ExternalLink,
  Loader2,
  CheckCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import type { Link as UserLink, LinkType } from "@/types/interfaces";
import { getAllLinkTypes } from "@/lib/userServices";

interface LinksTabProps {
  idUser: number;
  links: UserLink[];
  onSave: (previewLinks: UserLink[], deletedLinks: number[]) => Promise<void>;
}

export function LinksTab({ idUser, links, onSave }: LinksTabProps) {
  const [previewLinks, setPreviewLinks] = useState<UserLink[]>([]);
  const [deletedLinks, setDeletedLinks] = useState<number[]>([]);
  const [newLinkUrl, setNewLinkUrl] = useState("");
  const [selectedTypeId, setSelectedTypeId] = useState<number | null>(null);
  const [linkTypes, setLinkTypes] = useState<LinkType[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [loadingTypes, setLoadingTypes] = useState(true);

  // Al montar o cambiar `links`, reiniciamos estados
  useEffect(() => {
    setPreviewLinks(links);
    setDeletedLinks([]);
  }, [links]);

  // Cargamos tipos de enlaces
  useEffect(() => {
    (async () => {
      try {
        setLinkTypes(await getAllLinkTypes());
      } catch {
        console.error("No se pudieron cargar los tipos");
      } finally {
        setLoadingTypes(false);
      }
    })();
  }, []);

  const validateUrl = (url: string) => {
    let candidate = url.trim();
    if (!/^https?:\/\//i.test(candidate)) candidate = "https://" + candidate;
    try {
      new URL(candidate);
      return candidate;
    } catch {
      return null;
    }
  };

  const handleAddLink = () => {
    if (selectedTypeId == null) {
      return setError("Debes seleccionar un tipo de enlace");
    }
    const valid = validateUrl(newLinkUrl);
    if (!valid) {
      return setError("La URL no es válida");
    }
    const type = linkTypes.find((t) => t.id_link_type === selectedTypeId)!;
    if (previewLinks.some((l) => l.id_link_type === selectedTypeId)) {
      return setError(`Ya existe un enlace de tipo ${type.name}`);
    }
    setPreviewLinks((prev) => [
      ...prev,
      {
        id_link: 0,          // 0 indica “nuevo”
        id_user: idUser,     // 🔑 usamos prop
        id_link_type: type.id_link_type,
        name: type.name,
        url: valid,
      },
    ]);
    setNewLinkUrl("");
    setSelectedTypeId(null);
    setError("");
  };

  const handleRemove = (link: UserLink) => {
    setPreviewLinks((prev) => prev.filter((l) => l.id_link !== link.id_link));
    if (link.id_link > 0) {
      setDeletedLinks((prev) => [...prev, link.id_link]);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Pasamos ambos arrays al padre
      await onSave(previewLinks, deletedLinks);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <DialogTitle>Gestionar enlaces</DialogTitle>
        <DialogDescription>Añade o elimina tus enlaces profesionales.</DialogDescription>
      </div>

      {/* Formulario de tipo + URL */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label>Tipo de enlace</Label>
          {loadingTypes ? (
            <div className="flex items-center gap-2 py-2">
              <Loader2 className="animate-spin" /> Cargando...
            </div>
          ) : (
            <Select
              value={selectedTypeId?.toString() || ""}
              onValueChange={(v) => setSelectedTypeId(Number(v))}
            >
              <SelectTrigger className="w-full mt-3">
                <SelectValue placeholder="Seleccione tipo" />
              </SelectTrigger>
              <SelectContent>
                {linkTypes.map((t) => (
                  <SelectItem key={t.id_link_type} value={t.id_link_type.toString()}>
                    {t.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
        <div>
          <Label>URL</Label>
          <Input
            className="mt-3"
            placeholder="https://ejemplo.com"
            value={newLinkUrl}
            onChange={(e) => setNewLinkUrl(e.target.value)}
          />
        </div>
      </div>
      {error && <p className="text-destructive">{error}</p>}

      <Button onClick={handleAddLink} disabled={!newLinkUrl || !selectedTypeId} className="flex items-center gap-2">
        <Plus /> Añadir
      </Button>

      {/* Lista de preview */}
      <div className="border rounded p-4">
        {previewLinks.length === 0 ? (
          <p>No hay enlaces.</p>
        ) : (
          <AnimatePresence>
            {previewLinks.map((link) => (
              <motion.div
                key={link.id_link > 0 ? link.id_link : link.url}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Card className="mb-2">
                  <CardContent className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Link2 />
                      <span>{link.id_link_type === 2 ? 'Github' : link.id_link_type === 1 ? 'LinkedIn' : link.id_link_type === 3 ? 'Portfolio' : ''}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <a href={link.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink />
                      </a>
                      <Button variant="ghost" onClick={() => handleRemove(link)}>
                        <Trash2 />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* Guardar */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isLoading} className="flex items-center gap-2">
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : saveSuccess ? (
            <CheckCircle className="text-green-500" />
          ) : (
            <Save />
          )}
          {isLoading ? "Guardando..." : saveSuccess ? "Guardado" : "Guardar"}
        </Button>
      </div>
    </div>
  );
}
