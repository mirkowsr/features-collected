export type FileDto = {
  url: string
  originalname: string
  fileId: string
}

export type FileProcessFinishDto = {
  fileId: string
}

export type FileProcessErrorDto = {
  fileId: string
  reason: string
}
