'use client'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function ImagemCollections() {
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [data, setData] = useState<any[]>([]) // Substitua `any[]` pelo tipo específico dos dados se conhecido

  useEffect(() => {
    const getAllImgs = async () => {
      try {
        const response = await axios.get('/api/get-imgs/')

        if (response.status >= 200 && response.status < 300) {
          console.log(response.data.getallimgs)
          setData(response.data.getallimgs)
          setIsError(false)
        } else {
          throw new Error(`Unexpected status code: ${response.status}`)
        }
      } catch (error) {
        console.error('Erro ao buscar imagens:', error)
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    }

    getAllImgs()
  }, [])

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Failed to load images.</p>
  }

  if (data.length === 0) {
    return <p>No images found.</p>
  }

  return (
    <div>
      <span>Collections</span>
      <div>
        {data.map(({ author, imgName, url, imgType }, index) => (
          <>
            <article key={index} className="text-white">
              <h2>{author}</h2>
              <h3>{imgName}</h3>
              <h4>{imgType}</h4>
              <p>{url}</p>
              <img src={url} alt={imgName || 'Image'} className="w-20" />
            </article>
          </>
        ))}
      </div>
    </div>
  )
}
