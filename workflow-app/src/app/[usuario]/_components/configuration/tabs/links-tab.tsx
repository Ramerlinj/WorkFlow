import React, { useState, useEffect } from "react";
import {
  Label,
  Input,
  Button,
  DialogTitle,
  DialogDescription,
  Card,
  CardContent,
  Combobox,
} from "@/components/ui/";
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
  links: UserLink[];
  onSave: (links: UserLink[]) => Promise<void>;
}

export function LinksTab({ links, onSave }: LinksTabProps) {
  const [previewLinks, setPreviewLinks] = useState<UserLink[]>([]);
  const [newLinkUrl, setNewLinkUrl] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [linkTypes, setLinkTypes] = useState<LinkType[]>([]);
  const [selectedTypeId, setSelectedTypeId] = useState<number | null>(null);
  const [loadingTypes, setLoadingTypes] = useState(true);

  // Initialize preview links on mount
  useEffect(() => {
    setPreviewLinks(links);
  }, [links]);

  // Load link types
  useEffect(() => {
    (async () => {
      try {
        const types = await getAllLinkTypes();
        setLinkTypes(types);
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingTypes(false);
      }
    })();
  }, []);

  const validateUrl = (url: string) => {
    let candidate = url.trim();
    if (!/^https?:\/\//i.test(candidate)) {
      candidate = "https://" + candidate;
    }
    try {
      new URL(candidate);
      return candidate;
    } catch {
      return null;
    }
  };

  const handleAddLink = () => {
    if (selectedTypeId == null) {
      setError("Debes seleccionar un tipo de enlace");
      return;
    }
    const valid = validateUrl(newLinkUrl);
    if (!valid) {
      setError("La URL no es válida");
      return;
    }
    const type = linkTypes.find((lt) => lt.id_link_type === selectedTypeId);
    if (!type) {
      setError("Tipo de enlace inválido");
      return;
    }
    if (previewLinks.some((l) => l.id_link_type === selectedTypeId)) {
      setError(`Ya existe un enlace de tipo ${type.name}`);
      return;
    }
    setPreviewLinks((prev) => [
      ...prev,
      {
        id_link: Date.now(),
        id_user: previewLinks[0]?.id_user || 0,
        id_link_type: type.id_link_type,
        name: type.name,
        url: valid,
      },
    ]);
    setNewLinkUrl("");
    setSelectedTypeId(null);
    setError("");
  };

  const handleRemove = (id: number) => {
    setPreviewLinks((prev) => prev.filter((l) => l.id_link !== id));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await onSave(previewLinks);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <DialogTitle>Gestionar enlaces</DialogTitle>
        <DialogDescription>
          Añade o elimina tus enlaces profesionales.
        </DialogDescription>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Tipo de enlace</Label>
          {loadingTypes ? (
            <div className="py-2 flex items-center gap-2">
              <Loader2 className="animate-spin" />
              Cargando...
            </div>
          ) : (
            <Combobox
              options={linkTypes.map((t) => ({ value: t.id_link_type.toString(), label: t.name }))}
              value={selectedTypeId?.toString() || ""}
              onSelect={(v) => setSelectedTypeId(Number(v))}
              placeholder="Seleccione tipo"
            />
          )}
        </div>
        <div>
          <Label>URL</Label>
          <Input
            placeholder="https://ejemplo.com"
            value={newLinkUrl}
            onChange={(e) => setNewLinkUrl(e.target.value)}
          />
        </div>
      </div>

      {error && <p className="text-destructive">{error}</p>}

      <Button
       onClick={handleAddLink}
       className="flex items-center gap-2"
       disabled={!newLinkUrl || selectedTypeId == null}
        >
        <Plus /> Añadir
      </Button>

      <div className="border rounded p-4">
        {previewLinks.length === 0 ? (
          <p>No hay enlaces.</p>
        ) : (
          <AnimatePresence>
            {previewLinks.map((link) => (
              <motion.div
                key={link.id_link}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Card className="mb-2">
                  <CardContent className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Link2 />
                      <span>{link.link_type?.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <a href={link.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink />
                      </a>
                      <Button variant="ghost" onClick={() => handleRemove(link.id_link)}>
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

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : saveSuccess ? (
            <CheckCircle className="text-green-500" />
          ) : (
            <Save />
          )}
          {isLoading
            ? "Guardando..."
            : saveSuccess
            ? "Guardado"
            : "Guardar"}
        </Button>
      </div>
    </div>
  );
}



