'use client'

import { SingleImageDropzone } from '@/components/singleImageDropzone'
import { useEdgeStore } from '@/lib/edgestore'
import { Files } from 'lucide-react'
import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { z } from 'zod'

export default function Page() {
  const [file, setFile] = useState<File>()
  const [progress, setProgress] = useState(0)
  const [urls, setUrls] = useState<{
    url: string
    thumbnailUrl: string | null
  }>()
  const { edgestore } = useEdgeStore()

  const schemaUpload = z.object({
    name: z.string().min(1, 'Campo Obrigatório'),
    imgType: z.enum(['padrão', 'logo', 'postagem', 'miniatura', 'icon']),
    url: z.string().url('URL inválida'),
    author: z.enum(['dinho', 'davi'])
  })

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schemaUpload)
  })

  const onSubmitImg = (data: any) => {
    console.log(data)
  }

  const [fieldValues, setFieldValues] = useState({})

  const handleinputValue = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target
    setFieldValues(prevState => ({
      ...prevState,
      [name]: value
    }))
  }
  console.log(fieldValues)

  return (
    <div className="flex items-center justify-center h-screen gap-8">
      <div className="flex flex-col items-center m-6 gap-2">
        <SingleImageDropzone
          width={256}
          height={256}
          value={file}
          dropzoneOptions={{
            maxSize: 1024 * 1024 * 1 // 1MB
          }}
          onChange={file => {
            setFile(file)
          }}
        />
        <div className="h-[6px] w-64 border rounded overflow-hidden">
          <div
            className="h-full bg-white transition-all duration-150"
            style={{
              width: `${progress}%`
            }}
          />
        </div>
        <button
          className="bg-white text-black rounded px-2 hover:opacity-80"
          onClick={async () => {
            if (file) {
              const res = await edgestore.publicImages.upload({
                file,
                input: { type: 'post' },
                onProgressChange: progress => {
                  setProgress(progress)
                }
              })
              setUrls({
                url: res.url,
                thumbnailUrl: res.thumbnailUrl
              })
            }
          }}
        >
          Upload
        </button>
      </div>

      <div className="w-[30%]">
        <form
          onSubmit={handleSubmit(onSubmitImg)}
          className="flex flex-col gap-2"
        >
          <fieldset className="flex flex-col gap-2">
            <label htmlFor="author" className="text-[12px]">
              Administrador
            </label>
            <Controller
              name="author"
              control={control}
              render={({ field }) => (
                <select
                  id="author"
                  {...field}
                  className="bg-black text-white"
                  value={urls?.url}
                  onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                    handleinputValue(event)
                  }
                >
                  <option value="">Selecione</option>
                  <option value="Dinho">Dinho</option>
                  <option value="Davi">Davi</option>
                </select>
              )}
            />
            {errors.author && (
              <span className="text-red-500">{errors.author.message}</span>
            )}
          </fieldset>

          <fieldset className="flex flex-col gap-2">
            <label htmlFor="titulo" className="text-[12px]">
              Titulo da Imagem
      
                <input
                  id="titulo"
                  type="text"
                  value={setFieldValues.imgName}
                  className="bg-black ring-1 ring-slate-100 px-2 py-2 rounded-md"
                  placeholder="Titulo da imagem"
                  {...register("titulo")}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleinputValue(event)
                  }
                />
         
            {errors.imgName && (
              <span className="text-red-500">{errors.imgName.message}</span>
            )}
          </fieldset>

          <fieldset className="flex flex-col gap-2">
            <label htmlFor="urlimg" className="text-[12px]">
              Url da Imagem
            </label>
            <Controller
              name="url"
              control={control}
              render={({ field }) => (
                <input
                  id="urlimg"
                  type="text"
                  className="bg-black ring-1 ring-slate-100 px-2 py-2 rounded-md"
                  placeholder="Url da Imagem"
                  value={urls?.url} // Valor controlado externamente
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    field.onChange(event.target.value) // Atualiza o valor no react-hook-form
                    handleinputValue(event) // Controla o valor manualmente
                  }}
                />
              )}
            />
            {errors.url && (
              <span className="text-red-500">{errors.url.message}</span>
            )}
          </fieldset>

          <fieldset className="flex flex-col gap-2">
            <label htmlFor="imgtype" className="text-[12px]">
              Tipo
            </label>

            <Controller
              name="imgType"
              control={control}
              value={setFieldValues.imgType}
              render={({ field }) => (
                <select
                  id="imgtype"
                  {...field}
                  className="bg-black text-white"
                  value={setFieldValues.imgType}
                  onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                    handleinputValue(event)
                  }
                >
                  <option value="">Selecione</option>
                  <option value="padrão">Padrão</option>
                  <option value="logo">Logo</option>
                  <option value="postagem">Postagem</option>
                  <option value="miniatura">Miniatura</option>
                  <option value="icon">Icon</option>
                  <option value="fundo">Fundo</option>
                </select>
              )}
            />

            {errors.imgType && (
              <span className="text-red-500">{errors.imgType.message}</span>
            )}
          </fieldset>

          <button
            type="submit"
            className="bg-green-700 text-white rounded-lg py-2 px-2 my-6"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  )
}
