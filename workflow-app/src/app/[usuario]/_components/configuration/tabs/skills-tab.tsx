"use client"

import { useState, useEffect } from "react"
import { Label, Button, DialogTitle, DialogDescription, Badge, Combobox } from "@/components/ui/"
import { X, Save, ArrowUp, ArrowDown, Loader2, CheckCircle } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import type { Skill } from "@/types/user"
import { getAllSkills } from "@/lib/userServices"

interface SkillsTabProps {
  skills: Skill[] | null
  onSave: (skills: Skill[]) => void
}

export function SkillsTab({ skills = [], onSave }: SkillsTabProps) {
  const [previewSkills, setPreviewSkills] = useState<Skill[]>(skills || [])
  const [availableSkills, setAvailableSkills] = useState<Skill[]>([])
  const [selectedSkillId, setSelectedSkillId] = useState<string>("") 
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingSkills, setIsLoadingSkills] = useState(true)
  const [saveSuccess, setSaveSuccess] = useState(false)

  // Cargar todas las habilidades disponibles al inicio
  useEffect(() => {
    const loadSkills = async () => {
      setIsLoadingSkills(true)
      try {
        console.log('SkillsTab: Intentando cargar habilidades...')
        const allSkills = await getAllSkills()
        console.log(`SkillsTab: Habilidades cargadas: ${allSkills.length}`, allSkills)
        setAvailableSkills(allSkills)
      } catch (error) {
        console.error('SkillsTab: Error al cargar las habilidades:', error)
      } finally {
        setIsLoadingSkills(false)
      }
    }
    
    loadSkills()
  }, [])

  const handleSkillSelect = (value: string) => {
    setSelectedSkillId(value)
    
    if (value) {
      const skillId = parseInt(value)
      const selectedSkill = availableSkills.find(s => s.id_skill === skillId)
      
      if (selectedSkill) {
        // Verificar si la habilidad ya está en la lista
        const skillExists = previewSkills.some(s => s.id_skill === skillId)
        
        if (!skillExists) {
          setPreviewSkills([...previewSkills, selectedSkill])
        }
        
        // Limpiar la selección
        setSelectedSkillId("")
      }
    }
  }

  const handleRemoveSkill = (id: number) => {
    setPreviewSkills(previewSkills.filter(skill => skill.id_skill !== id))
  }

  const moveSkillUp = (index: number) => {
    if (index === 0) return
    
    const newSkills = [...previewSkills]
    const temp = newSkills[index]
    newSkills[index] = newSkills[index - 1]
    newSkills[index - 1] = temp
    
    setPreviewSkills(newSkills)
  }

  const moveSkillDown = (index: number) => {
    if (index === previewSkills.length - 1) return
    
    const newSkills = [...previewSkills]
    const temp = newSkills[index]
    newSkills[index] = newSkills[index + 1]
    newSkills[index + 1] = temp
    
    setPreviewSkills(newSkills)
  }

  const handleSaveSkills = async () => {
    setIsLoading(true)
    setSaveSuccess(false)
    
    try {
      await onSave(previewSkills)
      setSaveSuccess(true)
      
      // Ocultar el mensaje de éxito después de 3 segundos
      setTimeout(() => {
        setSaveSuccess(false)
      }, 3000)
    } catch (error) {
      console.error('Error al guardar las habilidades:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <DialogTitle className="text-xl font-semibold">Gestionar habilidades</DialogTitle>
        <DialogDescription>Añade, elimina y organiza tus habilidades profesionales.</DialogDescription>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="searchSkill">Seleccionar habilidad</Label>
          <div className="flex gap-2">
            {isLoadingSkills ? (
              <div className="w-full flex items-center justify-center py-2">
                <Loader2 className="h-4 w-4 animate-spin text-primary mr-2" />
                <span>Cargando habilidades...</span>
              </div>
            ) : (
              <Combobox
                options={availableSkills.map(skill => ({
                  value: skill.id_skill.toString(),
                  label: skill.nombre
                }))}
                value={selectedSkillId}
                onSelect={handleSkillSelect}
                placeholder="Seleccionar una habilidad"
                emptyMessage="No se encontraron habilidades"
                className="w-[300px]"
              />
            )}
          </div>
        </div>

        <div className="border rounded-md p-4 min-h-[200px]">
          <div className="space-y-4">
            
            <div className="space-y-2">
              <Label>Tus habilidades seleccionadas</Label>
              {previewSkills.length === 0 ? (
                <div className="text-sm text-muted-foreground py-4">No has seleccionado ninguna habilidad aún.</div>
              ) : (
                <div className="flex flex-wrap gap-2 mt-2">
                  <AnimatePresence>
                    {previewSkills.map((skill, index) => (
                      <motion.div
                        key={skill.id_skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-1"
                      >
                        <Badge className="px-3 py-1 flex items-center gap-1 select-none">
                          {skill.nombre}
                          <button
                            onClick={() => handleRemoveSkill(skill.id_skill)}
                            className="ml-1 hover:bg-primary-foreground rounded-full p-0.5"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                        <div className="flex flex-col">
                          <button 
                            onClick={() => moveSkillUp(index)}
                            className="hover:bg-primary-foreground rounded-full p-0.5"
                            disabled={index === 0}
                          >
                            <ArrowUp className="h-3 w-3" />
                          </button>
                          <button 
                            onClick={() => moveSkillDown(index)}
                            className="hover:bg-primary-foreground rounded-full p-0.5"
                            disabled={index === previewSkills.length - 1}
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
          </div>
        </div>

        <div className="flex justify-end">
          <Button 
            onClick={handleSaveSkills} 
            className="flex items-center gap-2"
            disabled={isLoading}
          >
            {isLoading ? (
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
    </div>
  )
}
