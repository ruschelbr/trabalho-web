import { Link } from 'react-router-dom'

const albuns = [
  {
    id: 1,
    bloco: 'bloco-claro',
    linha: 'linha-azul',
    capaPrimeiro: true,
    capa: '/Albun1.png',
    capaAlt: 'Welcome to the Magic Room',
    titulo: 'Welcome to the Magic Room',
    tituloClasse: 'titulo-azul',
    tracklistClasse: 'tracklist-escuro',
    faixas: [
      'Intro',
      { label: 'X-Ray Riff Machine', to: '/musica-exemplo' },
      'Feel Sorry',
      'The lady is Going Down',
      'Call to Bolster',
      'Duofellow (Common Madness on Demand)',
      'Running to Say Goodbye',
      'Recnac',
      'Nobody Knows',
      'Me myself – Bonus Track',
    ],
  },
  {
    id: 2,
    bloco: 'bloco-escuro',
    linha: 'linha-amarela',
    capaPrimeiro: false,
    capa: '/Albun2.png',
    capaAlt: 'Lost, Now Found',
    titulo: 'Lost, Now Found',
    tituloClasse: 'titulo-amarelo',
    tracklistClasse: 'tracklist-claro',
    faixas: [
      'Lost, Now Found',
      'Tatto',
      'Here Comes the Moon Again',
      'A Snapshot in Time',
      'Too Much Nothing',
      'All I Need',
      'Can You Hear Me?',
      'You Were Playing with Both',
      'Schadenfreude',
      'Wishes Can Come True',
      'Super Bowie (I Make You Make)',
      "C'mon, C'mon",
      'You Tell Me',
      'Attitude is Everything',
      'Cahuenga Pass Breakdown',
      'Tatto Live at the Whiskey',
    ],
  },
  {
    id: 3,
    bloco: 'bloco-claro',
    linha: 'linha-azul',
    capaPrimeiro: true,
    capa: '/Albun3.png',
    capaAlt: 'Still Night Blue',
    titulo: 'Still Night Blue',
    tituloClasse: 'titulo-azul',
    tracklistClasse: 'tracklist-escuro',
    faixas: [
      'Goal',
      "Nothing's More Complete",
      'Morning Light',
      'Mr. Wellness',
      'Peep Toe',
      'Are you serious?',
      'Still Night Blue',
      'Breathless',
      'Trolling',
      'Crying Walls',
      'Love & War',
      'The Best Mistake of My Life',
    ],
  },
]

function Faixa({ faixa }) {
  if (typeof faixa === 'string') {
    return <li>{faixa}</li>
  }
  return (
    <li>
      <Link to={faixa.to} className="texto-escuro">
        {faixa.label}
      </Link>
    </li>
  )
}

function Capa({ src, alt }) {
  return (
    <div className="album-capa-wrap">
      <img src={src} alt={alt} className="capa-img" />
    </div>
  )
}

function InfoAlbum({ album }) {
  return (
    <div className="album-info">
      <h2 className={`album-titulo ${album.tituloClasse}`}>{album.titulo}</h2>
      <ol className={`album-tracklist ${album.tracklistClasse}`}>
        {album.faixas.map((faixa, i) => (
          <Faixa key={i} faixa={faixa} />
        ))}
      </ol>
    </div>
  )
}

function BlocoAlbum({ album }) {
  return (
    <div className={`bloco-album ${album.bloco}`}>
      <div className={`linha-lateral ${album.linha}`} />
      {album.capaPrimeiro ? (
        <>
          <Capa src={album.capa} alt={album.capaAlt} />
          <InfoAlbum album={album} />
        </>
      ) : (
        <>
          <InfoAlbum album={album} />
          <Capa src={album.capa} alt={album.capaAlt} />
        </>
      )}
    </div>
  )
}

function Discografia() {
  return (
    <>
      {albuns.map((album) => (
        <BlocoAlbum key={album.id} album={album} />
      ))}
    </>
  )
}

export default Discografia
