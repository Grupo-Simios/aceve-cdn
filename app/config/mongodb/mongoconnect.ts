import mongoose from 'mongoose'

const connection: { isConnected?: number } = {}

async function dbConnect() {
  try {
    if (!process.env.MONGODB_URI) {
      console.error('String de Conexão Inválida')
      return
    }

    // Verifica se já existe uma conexão ativa
    if (connection.isConnected) {
      console.log('Já está conectado ao MongoDB')
      return
    }

    const connectDb = await mongoose.connect(process.env.MONGODB_URI as string)
    connection.isConnected = connectDb.connections[0].readyState

    if (connection.isConnected === 1) {
      // 1 indica que a conexão está aberta
      console.log('Conexão Estabelecida com Sucesso')
    } else {
      console.error('Conexão Falhou')
    }
  } catch (error: any) {
    console.error('Erro ao Conectar ao MongoDB:', error.message)
    throw new Error(`Falha na Conexão: ${error.message}`)
  }
}

export default dbConnect
