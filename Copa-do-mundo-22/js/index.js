// botao irTopo
document.querySelector('#irTopo').addEventListener('click', () => window.scrollTo({
    top: 0,
    behavior: 'smooth',
}))

// console.log('Tabela da Copa')

let tabelaJogos = document.querySelector('.tabelaJogos')
// console.log(tabelaJogos)

//ler  o arquivo json
fetch('jogos-fase1.json')
.then(response => (response.json ()))
.then(data => data.forEach(jogo => {
    // console.log(data)

    //criar uma linha de tabela, colocar na linha de tabela
    let linha = document.createElement('tr')
    tabelaJogos.appendChild(linha)

    // preencher os dados do jogo em cada linha de tabela
    linha.innerHTML = `
    <td>${jogo.diaSemana}</td>
    <td>${jogo.data}</td>
    <td>${jogo.hora}</td>
    <td>${jogo.grupo}</td>
    <td class='centralizar'>
        <img class='imagemP' src='./images/bandeiras/${jogo.mandante}' atl=''/>
        
        <span class='gols'>${jogo.gols_mandante}</span>

        <span class='partida'>${jogo.partida}</span>

       <span class='gols'>${jogo.gols_visitante}</span>

        <img class='imagemP' src='./images/bandeiras/${jogo.visitante}' atl=''/>
    </td>
    <td class='esquerda'>${jogo.estadio}</td>
    `
})
)

let tabelaClassificacao = document.querySelector('.tabelaClassificacao')
// console.log(tabelaClassificacao)
let linhas = document.querySelectorAll('.corpoClassificacao tr')
// console.log(linhas)

exibirTabelaClassificacao('A')

function exibirTabelaClassificacao (letraGrupo) {
    // atualizar lera do grupo no index.html
    document.querySelector('.letra').innerHTML = letraGrupo

    // ler json das clasificações
    fetch(`classificacaoGrupo${letraGrupo}.json`)
    .then(resposta => resposta.json())
    .then(dados => {
        //ordenar os dados do array com objetos 
        dados.sort(function compararNumeros (a, b) {
            return a.posicao - b.posicao
        })

        dados.forEach( (selecao, indice) =>  {
        // console.log(dados)
        // console.log(selecao)

        // criar linhas tr
        // let linha = document.createElement('tr')

        //colocar ela como filho dentro da tabela 
        // tabelaClassificacao.appendChild(linha)

        //preencher os dados
        linhas[indice].innerHTML = `
            <td>${selecao.posicao}</td>
            <td>${selecao.selecao}</td>
            <td>${selecao.pontos}</td>
            <td>${selecao.jogos}</td>
            <td>${selecao.triunfos}</td>
            <td>${selecao.empates}</td>
            <td>${selecao.derrotas}</td>
            <td>${selecao.gols_pro}</td>
            <td>${selecao.gols_contra}</td>
            <td>${selecao.saldo_de_gols}</td>
        `
    })
    }
    )  
}
// exibirTabelaClassificacao('G')

// controlar a escolha da letra do grupo para exibir na tabela de classificação
let selectLetra = document.querySelector('.letrasDosGrupos')
// console.log(selectLetra)

// uar um escutador de eventos para a nossa caixa select
selectLetra.addEventListener('change',  (event) => {
    // console.log('mudou')
    // console.log(event.target.value)
    exibirTabelaClassificacao(event.target.value)
})

// OITAVAS DE FINAL
let divOitavas = document.querySelector('.divOitavas')
console.log(divOitavas)

fetch('oitavas-de-final.json')
.then(resposta => resposta.json())
.then(dados => {
    console.log(dados)

    dados.forEach(jogo => {
        // criar uma nova divisoria
        let divisoria = document.createElement('div')

        // colocar  ele como filho de divOitavas
        divOitavas.appendChild(divisoria)

        // preencher os dados de cada jogo
        divisoria.innerHTML = `
            <h3 class='jogo'>Oitavas ${jogo.id}</h3>
            <h4>
                <span class='dia'>${jogo.diaSemana}</span>
                ${jogo.data}
                <span class='hora'>${jogo.hora}</span>
            </h4>
            <h4 class='centralizar jogo'>
                <img  class='imagemP' src='./images/bandeiras/${jogo.img_mandante}' />
                <span class='gols'>${jogo.gols_mandante}</span>
                ${jogo.partida}
                <span class='gols'>${jogo.gols_visitante}</span>
                <img class='imagemP' src='./images/bandeiras/${jogo.img_visitante}' />
            </h4>
            <h5>${jogo.estadio}</h5>
            <h6>Prorrogação: ${jogo.prorrogacao}</h6>
            <h6>Pênaltis: ${jogo.penaltis}</h6>
            <h6>Placar dos Pênaltis: ${jogo.placar_penaltis}</h6>
            <h6>Classificado: ${jogo.classificado}</h6>
        `
    })

})

// consummir dados json externos de uma API
fetch('https://worldcupjson.net/matches/today/?by_date=DESC')
.then(respostas => respostas.json() )
.then(dados => {
    // console.log(dados)
    dados.forEach(jogo => {
        // console.log(jogo)
        console.log(jogo.home_team_country + " x " + jogo.away_team_country)
    })

})

// QUARTAS DE FINAL
let divQuartas = document.querySelector('.divQuartas')
// console.log(divQuartas)
// const selecoes = [
//     {
//         mandante: 'Cróacia',
//         visitante: 'Brasil'
//     },
//     {
//         mandante: 'Holanda',
//         visitante: 'Argentina'
//     },
//     {
//         mandante: 'Marrocos',
//         visitante: 'Portugal'
//     },
//     {
//         mandante: 'Inglaterra',
//         visitante: 'França'
//     }

// ]


fetch('quartas-de-final.json')
.then(resposta => resposta.json())
.then(dados => {
    // console.log(dados)

    dados.forEach(jogo => {
        // criar uma nova divisoria
        let divisoria = document.createElement('div')

        // colocar  ele como filho de divQuartas
        divQuartas.appendChild(divisoria)

        // preencher os dados de cada jogo
        divisoria.innerHTML = `
            <h3 class='jogo'>Quartas ${jogo.id}</h3>
            <h4>
                <span class='dia'>${jogo.diaSemana}</span>
                ${jogo.data}
                <span class='hora'>${jogo.hora}</span>
            </h4>
            <h4 class='centralizar jogo'>
                <img  class='imagemP' src='./images/bandeiras/${jogo.img_mandante}' />
                <span class='gols'>${jogo.gols_mandante}</span>
                ${jogo.partida}
                <span class='gols'>${jogo.gols_visitante}</span>
                <img class='imagemP' src='./images/bandeiras/${jogo.img_visitante}' />
            </h4>
            <h5>${jogo.estadio}</h5>
            <h6>Prorrogação: ${jogo.prorrogacao}</h6>
            <h6>Pênaltis: ${jogo.penaltis}</h6>
            <h6>Placar dos Pênaltis: ${jogo.placar_penaltis}</h6>
            <h6>Classificado: ${jogo.classificado}</h6>
        `
        // let inputGolsMandantes = document.querySelectorAll('.golsMandantes')
        // let inputGolsVisitantes = document.querySelectorAll('.golsVisitantes')
        // let golsM = 0
        // let golsV = 0


        // // pegar os valores dos inputs quando houver uma mudança neles
        // inputGolsMandantes.forEach((jogo, posicao) => {
        //     inputGolsMandantes[posicao].addEventListener('change', (e) => {
        //         console.log(e.target.value)
        //         golsM = e.target.value

        //     })
        // })
        // inputGolsVisitantes.forEach((jogo, posicao) => {
        //     inputGolsVisitantes[posicao].addEventListener('change', (e) => {
        //         console.log(e.target.value)
        //         golsV = e.target.value
        //         //ver o resultado da partida
        //         resultado(golsM, golsV, posicao)

        //     })
        // })


    })//fim do forEach
})

// function resultado (golsM, golsV, posicao) {
//     if(golsM > golsV) {
//         console.log('Triunfo do Mandante'  + selecoes[posicao].mandante)
//     }
//     if(golsM < golsV) {
//         console.log('Triunfo do Visitante' + selecoes[posicao].visitante)
//     }
//     if(golsM == golsV) {
//         console.log('Empate')
//     }

// }

// SEMIFINAL
let divSemifinais = document.querySelector('.divSemifinais')
// console.log(divQuartas)

fetch('semifinais.json')
.then(resposta => resposta.json())
.then(dados => {
    // console.log(dados)

    dados.forEach(jogo => {
        // criar uma nova divisoria
        let divisoria = document.createElement('div')

        // colocar  ele como filho de divQuartas
        divSemifinais.appendChild(divisoria)

        // preencher os dados de cada jogo
        divisoria.innerHTML = `
            <h3 class='jogo'>Semifinal ${jogo.id}</h3>
            <h4>
                <span class='dia'>${jogo.diaSemana}</span>
                ${jogo.data}
                <span class='hora'>${jogo.hora}</span>
            </h4>
            <h4 class='centralizar jogo'>
                <img  class='imagemP' src='./images/bandeiras/${jogo.img_mandante}' />
                <span class='gols'>
                ${jogo.gols_mandante}
                </span>
                ${jogo.partida}
                <span class='gols'>
                ${jogo.gols_visitante}
                </span>
                <img class='imagemP' src='./images/bandeiras/${jogo.img_visitante}' />
            </h4>
            <h5>${jogo.estadio}</h5>
            <h6>Prorrogação: ${jogo.prorrogacao}</h6>
            <h6>Pênaltis: ${jogo.penaltis}</h6>
            <h6>Placar dos Pênaltis: ${jogo.placar_penaltis}</h6>
            <h6>Classificado: ${jogo.classificado}</h6>
            `

    })//fim do forEach

})

//TERCEIRO LUGAR
let divTerceirolugar = document.querySelector('.divTerceirolugar')
// console.log(divQuartas)

fetch('terceiro_lugar.json')
.then(resposta => resposta.json())
.then(dados => {
    // console.log(dados)

    dados.forEach(jogo => {
        // criar uma nova divisoria
        let divisoria = document.createElement('div')

        // colocar  ele como filho de divQuartas
        divTerceirolugar.appendChild(divisoria)

        // preencher os dados de cada jogo
        divisoria.innerHTML = `
            <h3 class='jogo'>Terceiro Lugar</h3>
            <h4>
                <span class='dia'>${jogo.diaSemana}</span>
                ${jogo.data}
                <span class='hora'>${jogo.hora}</span>
            </h4>
            <h4 class='centralizar jogo'>
                <img  class='imagemP' src='./images/bandeiras/${jogo.img_mandante}' />
                <span class='gols'>
                ${jogo.gols_mandante}
                </span>
                ${jogo.partida}
                <span class='gols'>
                ${jogo.gols_visitante}
                </span>
                <img class='imagemP' src='./images/bandeiras/${jogo.img_visitante}' />
            </h4>
            <h5>${jogo.estadio}</h5>
            <h6>Prorrogação: ${jogo.prorrogacao}</h6>
            <h6>Pênaltis: ${jogo.penaltis}</h6>
            <h6>Placar dos Pênaltis: ${jogo.placar_penaltis}</h6>
            <h6>Terceiro Lugar: ${jogo.terceiro_lugar}</h6>
            <h6>Quarto Lugar: ${jogo.quarto_lugar}</h6>
            `

    })//fim do forEach

})

//FINAL
let divFinal = document.querySelector('.divFinal')
// console.log(divQuartas)

fetch('final.json')
.then(resposta => resposta.json())
.then(dados => {
    // console.log(dados)

    dados.forEach(jogo => {
        // criar uma nova divisoria
        let divisoria = document.createElement('div')

        // colocar  ele como filho de divQuartas
        divFinal.appendChild(divisoria)

        // preencher os dados de cada jogo
        divisoria.innerHTML = `
            <h3 class='jogo'>Final</h3>
            <h4>
                <span class='dia'>${jogo.diaSemana}</span>
                ${jogo.data}
                <span class='hora'>${jogo.hora}</span>
            </h4>
            <h4 class='centralizar jogo'>
                <img  class='imagemP' src='./images/bandeiras/${jogo.img_mandante}' />
                <span class='gols'>
                ${jogo.gols_mandante}
                </span>
                ${jogo.partida}
                <span class='gols'>
                ${jogo.gols_visitante}
                </span>
                <img class='imagemP' src='./images/bandeiras/${jogo.img_visitante}' />
            </h4>
            <h5>${jogo.estadio}</h5>
            <h6>Prorrogação: ${jogo.prorrogacao}</h6>
            <h6>Pênaltis: ${jogo.penaltis}</h6>
            <h6>Placar dos Pênaltis: ${jogo.placar_penaltis}</h6>
            <h5>Campeão: ${jogo.primeiro_lugar}</h5>
            <h5>Segundo lugar: ${jogo.segundo_lugar}</h5>
            <h5>Artilheiro: ${jogo.artilheiro}</h5>
            <h5>Melhor da Copa: ${jogo.melhor_da_copa}</h5>
            `

    })//fim do forEach

})
