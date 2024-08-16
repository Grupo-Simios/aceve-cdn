import type { Document } from 'mongoose'

export interface IupLoadImg extends Document {
  imgName?: string
  imgType?: String
  url: string
  author?: string
  createdAt?: Date
  updatedAt?: Date
}
