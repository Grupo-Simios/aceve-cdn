import mongoose from 'mongoose'
import type { IupLoadImg } from '../@types/uploadtypes'
const { Schema, model, models } = mongoose

const uploadImgSchema = new Schema<IupLoadImg>(
  {
    imgName: { type: String, required: false },
    imgType: {
      type: String,
      required: true
    },
    url: { type: String, required: true },

    author: {
      type: String,
      required: false
    }
  },
  {
    timestamps: true
  }
)

export const NewUploadSchema =
  models.aceveUpload || model<IupLoadImg>('aceveUpload', uploadImgSchema)
