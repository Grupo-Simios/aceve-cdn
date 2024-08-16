import type { Document } from 'mongoose'

export interface IupLoadImg extends Document {
  imgName?: string
  imgType?: 'padrão' | 'logo' | 'postagem' | 'miniatura' | 'icon' | 'fundo'
  url: string
  author: string
  createdAt?: Date
  updatedAt?: Date
}
