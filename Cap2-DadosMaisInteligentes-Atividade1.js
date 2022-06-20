var textHtml = `<html><head><title>Gulliver Traveller - Roteiros</title></head><body><b>->1 - Roteiros para *São Paulo*</b><br>A Terra da Garoa!<br>Fundada em 25 de janeiro de 1554 a cidade tem hoje cerca de 12 milhões de habitantes e é considerada o centro financeiro do Brasil e aqui vão 3 dicas de roteiros obrigatórios para aqueles que passam pela capital paulista<br>#Roteiro A | Região: Avenida Paulista<br>MASP; Parque Trianon; Rua Augusta<br>#Roteiro B | Região: Centro<br>Catedral da Sé; Pátio do Colégio; Rua Augusta<br>#Roteiro C | Região: Vila Madalena<br>Beco do Batman; Feirinha da Benedito Calixto; Livraria da Vila<br> <b>->2 - Roteiros para *Las Vegas*</b><br>Viva Las Vegas!<br>       A cidade mais populosa e mais densamente povoada do estado de Nevada, Las Vegas foi fundada em 1905 e é considerada uma cidade, oficialmente, desde 1911 e conta com mais de meio milhão de habitantes. Venha conhecer a capital dos jogos de azar!<br>#Roteiro A | Região: Las Vegas Boulevard South<br>Fonte do Bellagio; Principais Cassinos; Madame Tussauds<br>#Roteiro B | Região: Downtown<br>; Fremont; Las Vegas Art Museum; Museu nacional do Crime Organizado; <br>#Roteiro C | Região: Las Vegas Boulevard North<br>Outlet Premium North; Stratosphere; Apple Fashion Show<br><b>->3 - Roteiros para *Moscou*</b><br>Privet!<br>A capital Russa fica situada às margens do Rio Moscou e apesar de ser a cidade mais cosmopolita da Rússia, conta com grande resguardo de sua história soviética<br>#Roteiro A | Região: Praça Vermelha<br>Museu Histórico do Estado; Catedral de São Basílico; Mausoléu de Lênin<br>#Roteiro B | Região: Centro<br>Teatro Bolshoi; Monumento a Karl Marx; Rio Moscou<br>#Roteiro C | Região: Obras pela cidade<br>Metrô de Moscou; As Sete Irmãs; Moscow Leningradsky Railway Station  <br>

</body>

</html>`;

var textoSemTag = textHtml
  .replace('/', '')
  .replace('<html>', '')
  .replace('<body>', '')
  .replace('<title>', '')
  .replace('<head>', '')
  .replace('</html>', '')
  .replace('</body>', '')
  .replace('</title>', '')
  .replace('</head>', '');

var ArrayBase = textoSemTag.split('->');
var cidades = [];

for (let i = 1; i < ArrayBase.length; i++) {
  var dados = ArrayBase[i].split('<br>');

  var cidade = {
    nome: '',
    comentario: '',
    historia: '',
    qtdRoteiros: '',
    roteiros: [],
  };

  for (let y = 0; y < dados.length; y++) {
    let posicaoInicial = dados[0].indexOf('*', 0) + 1;
    let posicaoFinal = dados[0].indexOf('*', posicaoInicial);

    //posição[0] nome
    cidade.nome = dados[0].substring(posicaoInicial, posicaoFinal);
    //posição[1] comentario
    cidade.comentario = dados[1].trim();
    //posição[2] história
    cidade.historia = dados[2].trim();
    //posição[3] roteiro | local
    if (y > 2) {
      var roteiro = {
        nome: '',
        regiao: '',
        qtdPontosTuristicos: '',
        pontosTuristicos: [],
      };

      if (dados[y].includes('|')) {
        let info = dados[y].split('|');

        roteiro.nome = info[0].replace('#Roteiro', '').trim();
        roteiro.regiao = info[1].replace('Região:', '').trim();
        var dadosPontosTuristicos = dados[y + 1].split(';');
        roteiro.pontosTuristicos = dadosPontosTuristicos.filter((item) => {
          let pontoT = item.trim();
          if (pontoT != undefined && pontoT != '') {
            return pontoT;
          }
        });
        roteiro.qtdPontosTuristicos = dados[y + 1].split(';').length;
        cidade.roteiros.push(roteiro);
      }
      cidade.qtdRoteiros = cidade.roteiros.length;
    }
  }

  cidades.push(cidade);
}
//Apresentação
let cidadeSP = cidades[0]?.nome;
let cidadeLA = cidades[1]?.nome;
let cidadeMo = cidades[2]?.nome;

let roteiroASP = cidades[0]?.roteiros[0]?.regiao;
let roteiroALA = cidades[1]?.roteiros[0]?.regiao;
let roteiroAMO = cidades[2]?.roteiros[0]?.regiao;

let roteiroSP = cidades[0]?.roteiros[0]?.pontosTuristicos;
let roteiroLA = cidades[1]?.roteiros[0]?.pontosTuristicos;
let roteiroMO = cidades[2]?.roteiros[0]?.pontosTuristicos;

let qtdRoteiroSP = cidades[0]?.roteiros[0]?.qtdPontosTuristicos;
let qtdRoteiroLA = cidades[1]?.roteiros[0]?.qtdPontosTuristicos;
let qtdRoteiroMO = cidades[2]?.roteiros[0]?.qtdPontosTuristicos;

let centroSP = cidades[0]?.roteiros.find((x) =>
  x.regiao.includes('Centro'),
)?.pontosTuristicos;
let downtownLA = cidades[1]?.roteiros.find((x) =>
  x.regiao.includes('Downtown'),
)?.pontosTuristicos;

var textoApresentacao = `
                         Cidade: ${cidadeSP}
                          -Roteiro A: ${roteiroASP};
                          -Quantidade de locais roteiro A: ${qtdRoteiroSP};
                          -Pontos turísticos: ${centroSP}; 
                         Cidade: ${cidadeLA}
                          -Roteiro A: ${roteiroLA};
                          -Quantidade de locais roteiro A: ${qtdRoteiroLA};
                          -Pontos turísticos: ${downtownLA}; 
                         Cidade: ${cidadeMo}
                          -Roteiro A: ${roteiroMO};
                          -Quantidade de locais roteiro A: ${qtdRoteiroMO}`;

console.log('json:', cidades);
console.log('texto:', textoApresentacao);
