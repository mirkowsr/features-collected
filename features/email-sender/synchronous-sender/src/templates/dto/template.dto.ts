export interface CreateTemplateDTO {
  name: string
  file: Express.Multer.File
}

export interface CreatedDraftDTO {
  storageKey: string
}
