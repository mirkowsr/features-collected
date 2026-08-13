export interface CreatedDraftDTO {
  storageKey: string
  name: string
}

export interface TemplateBodyDTO {
  name: string
}

export interface TemplateUploadDTO {
  file: Express.Multer.File
  name: string
}
