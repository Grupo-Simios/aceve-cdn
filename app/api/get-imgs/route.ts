import dbConnect from '@/app/config/mongodb/mongoconnect'
import { NewUploadSchema } from '@/app/model/uploadmodel'

export async function GET() {
  try {
    await dbConnect()
    const getallimgs = await NewUploadSchema.find()
    return new Response(JSON.stringify({ getallimgs }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error: any) {
    console.error('Falha ao obter Imagens', error)
    return new Response(
      JSON.stringify({
        msg: 'Falha ao obter imagens',
        errorMsg: error.message
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}
