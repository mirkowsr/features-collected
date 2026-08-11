export enum ContentTypes {
  html = 'text/html',
}

export interface UploadTemplateDTO {
  buffer: Buffer
  storageKey: string
  contentType: ContentTypes
  metadata?: Record<string, string>
}
