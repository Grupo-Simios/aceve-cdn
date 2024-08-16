import { model, models, Schema } from 'mongoose'
import type { IupLoadImg } from '../@types/uploadtypes'

const uploadImgSchema = new Schema<IupLoadImg>(
  {
    imgName: { type: String, required: false },
    imgType: {
      type: String,
      required: true,
      enum: ['padrão', 'logo', 'postagem', 'miniatura', 'icon', 'fundo']
    },
    url: { type: String, required: true },
    author: {
      type: String,
      required: true,
      enum: ['Dinho', 'Davi']
    }
  },
  {
    timestamps: true
  }
)

// Verifique se o modelo já existe para evitar sobrescrever
export const NewUploadSchema =
  models.aceveUpload || model<IupLoadImg>('aceveUpload', uploadImgSchema)
