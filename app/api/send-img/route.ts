import dbConnect from '@/app/config/mongodb/mongoconnect'
import { NewUploadSchema } from '@/app/model/uploadmodel'
import { error } from 'console'

export async function POST(req: Request) {
  try {
    await dbConnect()
    const { imgName, imgType, url, author } = await req.json()
    console.log(author)

    if (!url) {
      console.log('Dados Obrigatórios')
      return new Response(JSON.stringify({ msg: 'Falha ao Obter Dados' }), {
        status: 400
      })
    }

    const newImageUpload = new NewUploadSchema({
      imgName,
      imgType,
      url,
      author
    })
    await newImageUpload.save()

    return Response.json({ msg: 'Imagem Salva Com Sucesso' })
  } catch (error: any) {
    console.error('Erro:', error)
    return Response.json(
      { msg: 'Falha ao Salvar Imagem', errorMsg: error.message },
      { status: 500 }
    )
  }
}
