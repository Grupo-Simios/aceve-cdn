import { ImageUp } from 'lucide-react'
import Link from 'next/link'

export const Header = () => {
  return (
    <>
      <header className="text-white flex justify-between px-8 items-center h-32 bg-zinc-950">
        <article className="flex gap-2 items-center">
          <figure>
            <ImageUp size={56} strokeWidth={1} />
          </figure>

          <div>
            <h2>Sistema de Upload de Imagens para a ONG Violeta Eliz</h2>
            <h3 className="text-zinc-700">Equipe TDD - grupo símios</h3>
          </div>
        </article>

        <nav>
          <ul className="flex gap-4">
            <li>
              {' '}
              <Link href={'/'}>Fazer Upload</Link>{' '}
            </li>
            <li>
              {' '}
              <Link href={'/gallery'}>Galeria</Link>{' '}
            </li>
          </ul>
        </nav>
      </header>
    </>
  )
}
