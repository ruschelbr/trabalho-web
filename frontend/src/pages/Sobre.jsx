const membros = [
  { img: '/Sérgio.png', nome: 'Sérgio Justen', papel: 'Tecladista' },
  { img: '/Fábio.png', nome: 'Fábio Serpe', papel: 'Guitarrista' },
  { img: '/Lincoln.png', nome: 'Lincoln Fabrício', papel: 'Vocalista' },
  { img: '/Ricardo.png', nome: 'Ricardo Bastos', papel: 'Baixista' },
  { img: '/Emanuel.png', nome: 'Emanuel Moon', papel: 'Baterista' },
]

function Sobre() {
  return (
    <>
      <div className="container-sobre-1 py-5 d-flex flex-column">
        <div className="box-central">
          <div className="row px-5 row-top-1">
            <p id="container-sobre-1-p1" className="mb-4 texto-escuro">
              “Algumas coisas acontecem porque queremos que aconteçam. Outras, simplesmente acontecem.
            </p>
          </div>
          <div className="row px-5 row-mid-1">
            <p id="container-sobre-1-p2" className="mb-4 texto-escuro">
              A Splippleman foi assim...
            </p>
          </div>
          <div className="row px-5 row-bottom-1">
            <p id="container-sobre-1-p3" className="mb-4 texto-escuro">
              Surgiu em setembro de 2010 porque surgiu e... porque queríamos que surgisse.”
            </p>
          </div>
        </div>
      </div>

      <div className="container-sobre-2">
        <div className="container-fluid h-100 d-flex align-items-center">
          <div className="row w-100">
            <div className="col-md-3 d-flex flex-column justify-content-between google-sans container-2-esquerda">
              <div id="texto-esquerda-splippleman">
                <p id="texto-esquerda-splipple" className="d-block texto-esquerda">
                  SPLIPPLE
                </p>
                <p id="texto-esquerda-man" className="d-block texto-esquerda">
                  MAN.
                </p>
              </div>
              <img
                src="/splipple_rock.png"
                alt="Splipple Rock"
                className="img-fluid imagem-container-2"
              />
            </div>

            <div className="col-md-2 d-flex justify-content-center">
              <div className="linha-divisoria"></div>
            </div>

            <div className="col-md-6 d-flex flex-column align-items-center justify-content-center container-2-direita">
              <p id="titulo-texto-direita" className="texto-direita d-block google-sans">
                Nome de banda sempre precisa ter várias versões. São elas:
              </p>
              <ol id="topicos-texto-direita" className="texto-direita d-block google-sans">
                <li>
                  Aquele que splipple. Verbo inexistente, do inglês “to splipple”: fazer algo de
                  qualidade para impactar alguém de qualidade. Verbo transdisciplinar simples, mais
                  que direto.
                </li>
                <li>Aquele que vem da Splippleland (espaço virtual dos sonhadores reais).</li>
                <li>
                  Das brincadeiras de luta dos meninos Brunão e Rá com o pai: Spli POW! - te peguei
                  (gotcha!)
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="container-sobre-3 py-4 px-5 google-sans">
        <div className="titulo-sobre-3 animacao-titulo-sobre-3">
          <p id="container-sobre-3-texto">A BANDA.</p>
        </div>
        <div className="texto-e-imagem-sobre-3">
          {membros.map((m) => (
            <div key={m.nome}>
              <img
                id="img-membros-da-banda"
                src={m.img}
                alt={m.nome}
                className="img-fluid"
              />
              <p id="texto-sobre-3">{m.nome}</p>
              <p id="subtexto-sobre-3">{m.papel}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Sobre
