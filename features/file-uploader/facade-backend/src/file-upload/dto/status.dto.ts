import { UploadStatusTypes } from '../../db/schema'

export type FileUploadResponseDto = {
  status: UploadStatusTypes
  fileId: string
}
