'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PlusCircle, Info, Building2, Mail, Phone, Hash, Users, Briefcase, MapPin, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { CreateModalProps } from '@/types/form-config'
import { toast } from 'sonner'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export function CreateModal({ 
  config, 
  onSubmit, 
  trigger, 
  onSuccess 
}: CreateModalProps) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm({
    resolver: zodResolver(config.schema as any),
    defaultValues: config.defaultValues,
  })

  async function handleSubmit(data: any) {
    setIsSubmitting(true)
    
    try {
      const result = await onSubmit(data)
      
      if (result.success) {
        toast.success(config.successMessage)
        setOpen(false)
        form.reset()
        onSuccess?.()
      } else {
        toast.error(result.error || config.errorMessage)
      }
    } catch (error) {
      toast.error(config.errorMessage)
      console.error('Erro:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getFieldIcon = (fieldName: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      tradingName: <Building2 className="h-3 w-3" />,
      legalName: <Building2 className="h-3 w-3" />,
      taxId: <Hash className="h-3 w-3" />,
      taxCountry: <MapPin className="h-3 w-3" />,
      email: <Mail className="h-3 w-3" />,
      phone: <Phone className="h-3 w-3" />,
      address: <MapPin className="h-3 w-3" />,
      description: <FileText className="h-3 w-3" />,
      industry: <Briefcase className="h-3 w-3" />,
      segment: <Briefcase className="h-3 w-3" />,
      status: <Users className="h-3 w-3" />,
      isActive: <Users className="h-3 w-3" />,
      isHeadquarter: <Users className="h-3 w-3" />,
      code: <Hash className="h-3 w-3" />,
      name: <Building2 className="h-3 w-3" />,
      managerId: <Users className="h-3 w-3" />,
    }
    return iconMap[fieldName] || null
  }

  const getSectionIcon = (sectionName: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      basic: <Building2 className="h-4 w-4 text-muted-foreground" />,
      contact: <Mail className="h-4 w-4 text-muted-foreground" />,
      classification: <Briefcase className="h-4 w-4 text-muted-foreground" />,
      status: <Users className="h-4 w-4 text-muted-foreground" />,
    }
    return iconMap[sectionName] || <Building2 className="h-4 w-4 text-muted-foreground" />
  }

  const renderField = (field: any) => {
    const commonProps = {
      disabled: isSubmitting,
      placeholder: field.placeholder,
      className: "h-10",
    }

    const fieldIcon = getFieldIcon(field.name)

    switch (field.type) {
      case 'text':
      case 'email':
      case 'tel':
        return (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name as any}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium flex items-center gap-2">
                  {fieldIcon}
                  {field.label}
                </FormLabel>
                <FormControl>
                  <Input
                    type={field.type}
                    {...commonProps}
                    {...formField}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )

      case 'select':
        return (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name as any}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium flex items-center gap-2">
                  {fieldIcon}
                  {field.label}
                </FormLabel>
                <Select onValueChange={formField.onChange} defaultValue={formField.value} disabled={isSubmitting}>
                  <FormControl>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder={field.placeholder || `Selecione ${field.label.toLowerCase()}`} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {field.options?.map((option: any) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )

      case 'switch':
        return (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name as any}
            render={({ field: formField }) => (
              <FormItem className="flex flex-row items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {fieldIcon}
                    <FormLabel className="text-sm font-medium">
                      {field.label}
                    </FormLabel>
                  </div>
                  {field.description && (
                    <p className="text-xs text-muted-foreground">{field.description}</p>
                  )}
                </div>
                <FormControl>
                  <Switch
                    checked={formField.value}
                    onCheckedChange={formField.onChange}
                    disabled={isSubmitting}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        )

      case 'textarea':
        return (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name as any}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium flex items-center gap-2">
                  {fieldIcon}
                  {field.label}
                </FormLabel>
                <FormControl>
                  <textarea
                    {...commonProps}
                    {...formField}
                    className="min-h-[80px] w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )

      default:
        return null
    }
  }

  const renderFieldWithTooltip = (field: any) => {
    const fieldElement = renderField(field)
    
    if (field.tooltip) {
      return (
        <div key={field.name} className="flex items-center space-x-2">
          {fieldElement}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>{field.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )
    }
    return fieldElement
  }

  const groupFieldsBySection = () => {
    const sections: Record<string, any[]> = {
      basic: [],
      contact: [],
      classification: [],
      status: [],
    }

    config.fields.forEach(field => {
      if (field.name.includes('tradingName') || field.name.includes('legalName') || field.name.includes('taxId') || field.name.includes('taxCountry') || field.name.includes('code') || field.name.includes('name')) {
        sections.basic.push(field)
      } else if (field.name.includes('email') || field.name.includes('phone') || field.name.includes('address') || field.name.includes('description')) {
        sections.contact.push(field)
      } else if (field.name.includes('industry') || field.name.includes('segment')) {
        sections.classification.push(field)
      } else if (field.name.includes('status') || field.name.includes('isActive') || field.name.includes('isHeadquarter') || field.name.includes('managerId')) {
        sections.status.push(field)
      } else {
        sections.basic.push(field)
      }
    })

    return sections
  }

  const sections = groupFieldsBySection()
  const sectionTitles = {
    basic: 'Informações Básicas',
    contact: 'Informações de Contato',
    classification: 'Classificação',
    status: 'Status e Configurações',
  }

  const defaultTrigger = (
    <Button>
      <PlusCircle className="mr-2 h-4 w-4" />
      Criar novo
    </Button>
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className={`max-w-4xl max-h-[90vh] overflow-y-auto ${config.className || ''}`}>
        <DialogHeader className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/20">
              <Building2 className="h-7 w-7 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-semibold">{config.title}</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                {config.description}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            {Object.entries(sections).map(([sectionKey, fields]) => {
              if (fields.length === 0) return null

              return (
                <Card key={sectionKey}>
                  <CardContent className="pt-8">
                    <div className="flex items-center gap-3 mb-6">
                      {getSectionIcon(sectionKey)}
                      <h3 className="font-medium text-lg">{sectionTitles[sectionKey as keyof typeof sectionTitles]}</h3>
                    </div>

                    <div className="grid gap-6">
                      {(() => {
                        const renderedFields: React.ReactNode[] = []
                        let currentGroup: any[] = []
                        
                        fields.forEach((field: any, index: number) => {
                          if (field.gridCols === 2) {
                            currentGroup.push(field)
                            
                            // Se temos 2 campos no grupo ou é o último campo, renderiza o grupo
                            if (currentGroup.length === 2 || index === fields.length - 1) {
                              renderedFields.push(
                                <div key={`group-${index}`} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {currentGroup.map((groupField) => renderFieldWithTooltip(groupField))}
                                </div>
                              )
                              currentGroup = []
                            }
                          } else {
                            // Se temos campos no grupo atual, renderiza eles primeiro
                            if (currentGroup.length > 0) {
                              renderedFields.push(
                                <div key={`group-${index}`} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {currentGroup.map((groupField) => renderFieldWithTooltip(groupField))}
                                </div>
                              )
                              currentGroup = []
                            }
                            
                            // Renderiza o campo individual
                            renderedFields.push(
                              <div key={field.name} className="space-y-2">
                                {renderFieldWithTooltip(field)}
                              </div>
                            )
                          }
                        })
                        
                        return renderedFields
                      })()}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </form>
        </Form>

        <Separator />

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button 
            onClick={form.handleSubmit(handleSubmit)} 
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Building2 className="h-4 w-4 mr-2" />
            {isSubmitting ? config.submittingLabel : config.submitLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 