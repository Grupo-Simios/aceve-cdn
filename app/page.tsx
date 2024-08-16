'use client'

import { SingleImageDropzone } from '@/components/singleImageDropzone'
import { useEdgeStore } from '@/lib/edgestore'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as yup from 'yup'

import { z } from 'zod'
import { yupResolver } from '@hookform/resolvers/yup'

export default function Page() {
  const [file, setFile] = useState<File>()
  const [progress, setProgress] = useState(0)
  const [urls, setUrls] = useState<{
    url: string
    thumbnailUrl: string | null
  }>()
  const { edgestore } = useEdgeStore()

  const schemaUpload = yup.object().shape({
    imgName: yup.string().required('Campo Obrigatório'),
    imgType: yup
      .string()
      .oneOf(
        ['padrão', 'logo', 'postagem', 'miniatura', 'icon'],
        'Escolha um Tipo Adequado'
      )
      .required('Campo Obrigatório'),
    url: yup.string().url('URL inválida'),
    author: yup.string().oneOf(['dinho', 'davi']).required('Campo Obrigatório')
  })

  const {
    handleSubmit,
    register,
    setValue,
    trigger,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schemaUpload)
  })

  const onSubmitImg = (data: any) => {
    console.log(data)
  }

  const [fieldValues, setFieldValues] = useState({
    imgName: '',
    imgType: '',
    url: '',
    author: ''
  })

  const handleinputValue = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target
    setFieldValues(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

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
              setFieldValues(prevState => ({
                ...prevState,
                url: res.url
              })),
                setFieldValues(prevState => ({
                  ...prevState,
                  url: res.url // Atualize o campo no estado
                }))
              setValue('url', res.url) // Atualize o campo no react-hook-form
              trigger('url') // Dispara a validação manualmente
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
            <select
              id="author"
              {...register('author', {
                onChange: (event: React.ChangeEvent<HTMLSelectElement>) =>
                  handleinputValue(event)
              })}
              className="bg-black text-white"
              value={fieldValues.author}
            >
              <option value="">Selecione</option>
              <option value="dinho">dinho</option>
              <option value="davi">davi</option>
            </select>
            {errors.author && (
              <span className="text-red-500">{errors.author.message}</span>
            )}
          </fieldset>

          <fieldset className="flex flex-col gap-2">
            <label htmlFor="titulo" className="text-[12px]">
              Titulo da Imagem
            </label>
            <input
              id="titulo"
              type="text"
              className="bg-black ring-1 ring-slate-100 px-2 py-2 rounded-md"
              placeholder="Titulo da imagem"
              {...register('imgName', {
                onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
                  handleinputValue(event)
              })}
              value={fieldValues.imgName}
            />
            {errors.imgName && (
              <span className="text-red-500">{errors.imgName.message}</span>
            )}
          </fieldset>

          <fieldset className="flex flex-col gap-2">
            <label htmlFor="url" className="text-[12px]">
              Url da Imagem
            </label>
            <input
              id="url"
              type="text"
              className="bg-black ring-1 ring-slate-100 px-2 py-2 rounded-md"
              placeholder="Url da Imagem"
              {...register('url')} // Registro correto do campo
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const { name, value } = event.target
                setValue(name, value) // Atualiza o valor do campo
                trigger('url') // Dispara a validação manualmente
              }}
              defaultValue={fieldValues.url} // Use defaultValue para valores iniciais
            />

            {errors.url && (
              <span className="text-red-500">{errors.url.message}</span>
            )}
          </fieldset>

          <fieldset className="flex flex-col gap-2">
            <label htmlFor="imgtype" className="text-[12px]">
              Tipo
            </label>
            <select
              id="imgtype"
              {...register('imgType', {
                onChange: (event: React.ChangeEvent<HTMLSelectElement>) =>
                  handleinputValue(event)
              })}
              className="bg-black text-white"
              value={fieldValues.imgType}
            >
              <option value="">Selecione</option>
              <option value="padrão">Padrão</option>
              <option value="logo">Logo</option>
              <option value="postagem">Postagem</option>
              <option value="miniatura">Miniatura</option>
              <option value="icon">Icon</option>
              <option value="fundo">Fundo</option>
            </select>
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
