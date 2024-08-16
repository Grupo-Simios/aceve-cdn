import mongoose from 'mongoose'

const connection: { isConnected?: number } = {}

async function handleReconnect() {
  console.log('Tentando reconectar ao MongoDB...')
  try {
    await mongoose.connect(process.env.MONGODB_URI as string)
    console.log('Reconexão bem-sucedida!')
  } catch (error: any) {
    console.error('Erro ao reconectar ao MongoDB:', error.message)
  }
}

async function dbConnect() {
  try {
    const mongoUri = process.env.MONGODB_URI
    if (!mongoUri) {
      throw new Error('String de Conexão Inválida')
    }

    if (connection.isConnected) {
      console.log('Já está conectado ao MongoDB')
      return
    }

    const options = {
      connectTimeoutMS: 10000,
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10,
      useNewUrlParser: true,
      useUnifiedTopology: true
    }

    const { connection: dbConnection } = await mongoose.connect(
      mongoUri,
      options
    )
    connection.isConnected = dbConnection.readyState

    if (connection.isConnected === 1) {
      console.log('Conexão Estabelecida com Sucesso')
      if (dbConnection.db) {
        await dbConnection.db.admin().ping()
      } else {
        console.error('Banco de dados não está definido')
      }
    } else {
      console.error('Conexão Falhou')
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Erro ao Conectar ao MongoDB:', error.message)
      handleReconnect()
      throw new Error(`Falha na Conexão: ${error.message}`)
    } else {
      console.error('Erro desconhecido ao conectar ao MongoDB')
      throw new Error('Falha na Conexão: Erro desconhecido')
    }
  }
}

process.on('SIGINT', async () => {
  console.log('Desconectando do MongoDB...')
  await mongoose.disconnect()
  console.log('Desconectado com sucesso!')
  process.exit(0)
})

export default dbConnect
