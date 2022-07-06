//puxando todas as páginas//
const paginaInicial = document.getElementById('pagina-inicial') as HTMLDivElement
const paginaEntrada = document.getElementById('pagina-entrada') as HTMLDivElement
const paginaConfirmacaoEntrada = document.getElementById('pagina-confirmacao-entrada') as HTMLDivElement
const paginaSaida = document.getElementById('pagina-saida') as HTMLDivElement
const paginaConfirmacaoSaida = document.getElementById('pagina-confirmacao-saida') as HTMLDivElement
const paginaHistorico = document.getElementById('pagina-historico') as HTMLDivElement
const paginaPatio = document.getElementById('pagina-patio') as HTMLDivElement
const paginaPrecos = document.getElementById('pagina-tabela-precos') as HTMLDivElement

//interface veículo//
interface iVeiculo{
    numeroId: number
    nome: string
    placa: string
    horaEntrada: Date | String
}

interface iVeiculoSaida extends iVeiculo{
    horaSaida?: Date | String
    Valor?: number
}

// auxiliar para páginas ativas //
let paginaConfirmacaoEntradaAtiva = false
let paginaConfirmacaoSaidaAtiva = false
let paginaHistoricoAtiva = false
let paginaPatioAtiva = false
let paginaPrecosAtiva = false


//declarações iniciais auxiliares//
let numeroId = 0 as number
let nome:string,placa:string;
let numeroIdAux = 0 as number
let idSaida=0 as number
let tempoEstacionado = "" as string
let precoFinal = 0 as number

    //página inicial - botão entrada//
        document.getElementById('botao-entrada')?.addEventListener('click',()=>{
            paginaInicial.classList.add('hidden')
            paginaEntrada.classList.remove('hidden')
        })

    //página inicial - botão entrada//
    document.getElementById('botao-saida')?.addEventListener('click',()=>{
        paginaInicial.classList.add('hidden')
        paginaSaida.classList.remove('hidden')
    })        

    //página inicial - botão historico//
    document.getElementById('botao-historico')?.addEventListener('click',()=>{
        paginaInicial.classList.add('hidden')
        paginaHistorico.classList.remove('hidden')
        paginaHistoricoAtiva = true
        voltarPaginaInicial()
    })

    //página inicial - botão patio//
    document.getElementById('botao-patio')?.addEventListener('click',()=>{
        paginaInicial.classList.add('hidden')
        paginaPatio.classList.remove('hidden')
        paginaPatioAtiva = true
        voltarPaginaInicial()
    })

    //página inicial - botão tabela precos//
    document.getElementById('botao-tabela-precos')?.addEventListener('click',()=>{
        paginaInicial.classList.add('hidden')
        paginaPrecos.classList.remove('hidden')
        paginaPrecosAtiva = true
        voltarPaginaInicial()
    })

    //página confirmação entrada, confirmação saída, histórico, ver pátio e tabela preços - botão voltar à página inicial//  
    function voltarPaginaInicial(){

        if (paginaConfirmacaoEntradaAtiva){
            let botao=document.getElementsByClassName('voltar-pagina-inicial')[0] as HTMLButtonElement
            botao.addEventListener('click',()=>{
                paginaInicial.classList.remove('hidden')
                paginaConfirmacaoEntradaAtiva = false
                paginaConfirmacaoEntrada.classList.add('hidden')
                document.getElementById('id-veiculo')!.innerHTML=""
            })
            return
            }

        else if (paginaConfirmacaoSaidaAtiva){
            let botao=document.getElementsByClassName('voltar-pagina-inicial')[1] as HTMLButtonElement
            botao.addEventListener('click',()=>{
                paginaInicial.classList.remove('hidden')
                paginaConfirmacaoSaidaAtiva = false
                paginaConfirmacaoSaida.classList.add('hidden')
            })
            return
            }

        else if (paginaHistoricoAtiva){
            let botao=document.getElementsByClassName('voltar-pagina-inicial')[2] as HTMLButtonElement
            botao.addEventListener('click',()=>{
                paginaInicial.classList.remove('hidden')
                paginaHistoricoAtiva = false
                paginaHistorico.classList.add('hidden')
            })
            return
            }

        else if (paginaPatioAtiva){
            let botao=document.getElementsByClassName('voltar-pagina-inicial')[3] as HTMLButtonElement
            botao.addEventListener('click',()=>{
                paginaInicial.classList.remove('hidden')
                paginaPatioAtiva = false
                paginaPatio.classList.add('hidden')
            })
            return
        }

        else if (paginaPrecosAtiva){
            let botao=document.getElementsByClassName('voltar-pagina-inicial')[4] as HTMLButtonElement
            botao.addEventListener('click',()=>{
                paginaInicial.classList.remove('hidden')
                paginaPrecosAtiva = false
                paginaPrecos.classList.add('hidden')
            })
            return
        }
    }

// Cadastrar veículos//
    //Etapa 1: preenchimento - página entrada//
        //Render Pátio e Histórico - construção na etapa 4 //
        renderPatio()
        renderHistorico()

    //Etapa 2: preenchimento - página entrada// 
        //Lê as entradas do botao cadastro
        const formEntrada = document.getElementById('entrada') as HTMLFormElement

            formEntrada.onsubmit = function(e){
                const nomeInput = document.getElementById('nome') as HTMLInputElement
                const placaInput = document.getElementById('placa') as HTMLInputElement

                e.preventDefault();
                nome = nomeInput.value;
                placa = placaInput.value;
                formEntrada.reset();
        
            //Caso o usuário não preencha, aparece um alerta
                if(!nome || !placa){
                            alert('Os campos nome e placa são obrigatórios');
                    return
                }

            //redireciona à página de confirmação da entrada
                paginaEntrada.classList.add('hidden')
                paginaConfirmacaoEntrada.classList.remove('hidden')
                paginaConfirmacaoEntradaAtiva = true
                voltarPaginaInicial()

                //Faz a conexão com a Etapa 3. 
                adicionarPatio({numeroId,nome,placa,horaEntrada: new Date()},true);

                adicionarHistorico({numeroId,nome,placa,horaEntrada: new Date()},true);

            // Mostra ID do carro//
                document.getElementById('id-veiculo')!.innerHTML=`${numeroId}`

                }
    
    //Etapa 3: preenchimento das tabelas nas páginas histórico e pátio//
        //Patio //
        function adicionarPatio(veiculoAdicionado:iVeiculo, salvarNovos?:boolean){
            numeroId = numeroIdAux

            numeroId++
            const criarRow=document.createElement('tr');
            criarRow.setAttribute('class','linhaTabelaPatio')

            
            criarRow.innerHTML = `
            <td>${numeroId}</td>
            <td>${veiculoAdicionado.nome}</td> 
            <td>${veiculoAdicionado.placa}</td> 
            <td>${veiculoAdicionado.horaEntrada}</td>`

            document.getElementById('tabela-patio')!.appendChild(criarRow);

            let veiculoAddPatio:iVeiculo = {horaEntrada:veiculoAdicionado.horaEntrada,numeroId:numeroId,nome:veiculoAdicionado.nome,placa:veiculoAdicionado.placa}
            
            if (salvarNovos){
                salvarPatio([... lerPatio(),veiculoAddPatio])
            }
        }

        //Historico //
        function adicionarHistorico(veiculoAdicionado:iVeiculoSaida, salvarNovos?:boolean){
            numeroIdAux++
            numeroId = numeroIdAux

            const criarRow=document.createElement('tr');
            
            criarRow.innerHTML = `
            <td>${numeroIdAux}</td>
            <td>${veiculoAdicionado.nome}</td> 
            <td>${veiculoAdicionado.placa}</td> 
            <td>${veiculoAdicionado.horaEntrada}</td>
            <td class="hora-saida">-</td>
            <td class = 'preco-final'>-</td>`

            document.getElementById('tabela-historico')!.appendChild(criarRow);

            if (salvarNovos){
                salvarHistorico([... lerHistorico(),veiculoAdicionado])
            }
        }

    //Etapa 4 - Salvar no local storage //
        // Lê o local storage para patio //
            function lerPatio():iVeiculo[]{
                return localStorage.patio?JSON.parse(localStorage.patio):[];
            }

        // Lê o local storage para histórico //
            function lerHistorico():iVeiculoSaida[]{
                return localStorage.historico?JSON.parse(localStorage.historico):[];
            }

        // Salva o que foi feito no local storage para patio // 
            function salvarPatio(veiculosASalvar: iVeiculo[]){
                localStorage.setItem('patio', JSON.stringify(veiculosASalvar))
            }

        // Salva o que foi feito no local storage para patio // 
        function salvarHistorico(veiculosASalvar: iVeiculoSaida[]){
            localStorage.setItem('historico', JSON.stringify(veiculosASalvar))
        }

        // Renderiza o patio //
        function renderPatio(){
            let tabelaPatio = document.getElementById('tabela-patio') as HTMLTableElement
            tabelaPatio.innerHTML=""

            const patioRender = lerPatio()
            if (patioRender.length){
                patioRender.forEach(veiculoRenderPatio => {
                    const criarRow=document.createElement('tr');
                    criarRow.setAttribute('class','linhaTabelaPatio')
        
                    criarRow.innerHTML = `
                    <td>${veiculoRenderPatio.numeroId}</td>
                    <td>${veiculoRenderPatio.nome}</td> 
                    <td>${veiculoRenderPatio.placa}</td> 
                    <td>${veiculoRenderPatio.horaEntrada}</td>`
        
                    document.getElementById('tabela-patio')!.appendChild(criarRow);
        
                })
            }
        }

        // Renderiza o historico //
        function renderHistorico(){
            let tabelaHistorico = document.getElementById('tabela-historico') as HTMLTableElement
            tabelaHistorico.innerHTML=""

            const historicoRender = lerHistorico()
            
            if (historicoRender.length){
                historicoRender.forEach(veiculoRenderHistorico => {
                    numeroIdAux++

                    const criarRow=document.createElement('tr');
                    let saida = veiculoRenderHistorico.horaSaida?veiculoRenderHistorico.horaSaida:"-"
                    let vFinal = veiculoRenderHistorico.Valor?veiculoRenderHistorico.Valor:"-"


                    criarRow.innerHTML = `
                    <td>${veiculoRenderHistorico.numeroId}</td>
                    <td>${veiculoRenderHistorico.nome}</td> 
                    <td>${veiculoRenderHistorico.placa}</td> 
                    <td>${veiculoRenderHistorico.horaEntrada}</td>
                    <td class = 'hora-saida'>${saida}</td>
                    <td class = 'preco-final'>${vFinal}</td>`
        
                    document.getElementById('tabela-historico')!.appendChild(criarRow);            })
            }
        }

//Etapa 5: Saída do veículo //
    //Lê o ID do carro a ser retirado a partir do botão de saída
    const formSaida = document.getElementById('saida') as HTMLFormElement

        formSaida.onsubmit = function(e){
            const idInput = document.getElementById('id-saida') as HTMLInputElement

            e.preventDefault();
            idSaida = parseInt(idInput.value);   
            formSaida.reset();

            //Caso o usuário não preencha, aparece um alerta
            if(!idSaida){
                alert('O campo ID é obrigatório');
            return
            }

            tiraPatio()
            
        }
    
    //Tira do Pátio//
    function tiraPatio(){
        let veiculoSaiu = false as boolean
        const patioAtual = lerPatio()

           //confere se esse veículo ainda está no pátio //
        let contador = 0 as number

        patioAtual.forEach(veiculoPatioAtual =>{
            contador++

            if(veiculoPatioAtual.numeroId==idSaida){
                veiculoSaiu = true
                let horaSaida = new Date //Anota o horário de saída no histórico//
                
                calcularPreco(veiculoPatioAtual,horaSaida)
                let valor = precoFinal

                saidaVeiculoPatio(veiculoPatioAtual,true,contador)
                saidaVeiculoHistorico(veiculoPatioAtual, horaSaida, valor, true)
            }

            else if ((contador == patioAtual.length)&&(!veiculoSaiu)){
                return alert('Esse veículo já foi retirado')
            }
        })

        //redireciona à página de confirmação da saída
        if(veiculoSaiu){
            paginaSaida.classList.add('hidden')
            paginaConfirmacaoSaida.classList.remove('hidden')
            paginaConfirmacaoSaidaAtiva = true
            voltarPaginaInicial()
        }
    }

    //Ativa a saída do painel de Históricos, com horário e valor
        function saidaVeiculoHistorico(veiculoSaida: iVeiculoSaida, horaSaida: Date, valor:number, salvarNovos:boolean){
            veiculoSaida.horaSaida = horaSaida
            veiculoSaida.Valor = valor

            let registroSaida=document.getElementsByClassName('hora-saida')[idSaida-1]
            registroSaida.innerHTML=`${veiculoSaida.horaSaida}`

            let registroPreco=document.getElementsByClassName('preco-final')[idSaida-1]
            registroPreco.innerHTML=`${veiculoSaida.Valor}`
            

            //Substitui o histórico antigo por novo, para que possa salvar o novo no local storage//
            let arrHistoricoAtual = lerHistorico() as Array<iVeiculoSaida>
            arrHistoricoAtual.splice(veiculoSaida.numeroId-1,1,veiculoSaida);

            if(salvarNovos){salvarHistorico(arrHistoricoAtual)}

            return 
        }

    //Retira o veículo do painel pátio //
        function saidaVeiculoPatio(veiculoPatioAtual:iVeiculo,salvarNovos:boolean,contador:number){
            let tabelaPatio = document.getElementById('tabela-patio') as HTMLTableElement
            let linhaRemovida = document.getElementsByClassName('linhaTabelaPatio')[contador-1] as HTMLTableRowElement

            tabelaPatio.removeChild(linhaRemovida)

            //Substitui o patio antigo por novo, para que possa salvar o novo no local storage//
            let arrPatioAtual = lerPatio() as Array<iVeiculo>
            arrPatioAtual.splice(contador-1,1);

            if(salvarNovos){salvarPatio(arrPatioAtual)}
        }

//Etapa 6: calcular o preço //
    // Render para a tabela de preços//
        renderPreco()

    //Interface Preco //
        interface iPreco{
            hora: number
            preco: number
        }

    //declarações do DOM //
        const botaoSalvarPreco = document.getElementById('salvar-tabela-preco') as HTMLButtonElement
        let quantPreco = 4 as number

        botaoSalvarPreco.addEventListener('click',()=>{
            let arrPreco:Array<iPreco> = []

            for(let i=0;i<quantPreco;i++){
                let inputPreco = document.getElementsByClassName('preco')[i] as HTMLInputElement
                let preco = parseInt(inputPreco.value)
                let teste = inputPreco.dataset.hora as string
                let hora = parseInt(teste)
                inputPreco.setAttribute('value',`${preco}`)
                arrPreco.push({hora, preco})
            }

            salvarPrecos(arrPreco)

            return 
        })

        function lerPrecos():Array<iPreco>{
            return localStorage.preco?JSON.parse(localStorage.preco):[];
        }

        function salvarPrecos(precosASalvar: Array<iPreco>){
            localStorage.setItem('preco', JSON.stringify(precosASalvar))
        }

        function renderPreco(){
            let precoCatalogo:iPreco = {hora:0, preco:0}
            const precosRender = lerPrecos()

            if (precosRender){
                for(let i=0; i<precosRender.length;i++){
                    precoCatalogo = precosRender[i]
                    document.getElementsByClassName('preco')[i]!.setAttribute("value",`${precoCatalogo.preco}`)
                }
            }
        }

    //Calcular preços//
        function calcularPreco(registroSaida:iVeiculo,horaSaida:Date){
            if(horaSaida){
                let entradaCalculoAux = registroSaida.horaEntrada as Date
                let saidaCalculoAux = horaSaida

                console.log(entradaCalculoAux)
                console.log(saidaCalculoAux)
                //Dados Entrada//
                let entradaCalculo = new Date(entradaCalculoAux).getTime()
                let saidaCalculo = new Date(saidaCalculoAux).getTime()

                console.log(entradaCalculo)
                console.log(saidaCalculo)
                let tempoEstacionadoTotalMin = Math.floor((saidaCalculo-entradaCalculo)/60000)
                
                console.log(tempoEstacionadoTotalMin)
                //Indica de forma amigável quanto tempo ficou estacionado
                let tempoEstacionadoHoras= tempoEstacionadoTotalMin>=60?Math.floor(tempoEstacionadoTotalMin/60):0;
                let tempoEstacionadoMin= Math.floor(tempoEstacionadoTotalMin%60)

                tempoEstacionado = `${tempoEstacionadoHoras}h e ${tempoEstacionadoMin}min`

                //Compara o tempo à tabela de preços - cada preço terá um if
                const tabelaPrecos = lerPrecos()

                    //Até 30min --> Indice 0 (primeiro da tabela)//
                    if (tempoEstacionadoTotalMin<=tabelaPrecos[0].hora){
                        precoFinal = tabelaPrecos[0].preco
                    }

                    //Até 1h --> Indice 1 (segundo da tabela)//
                    else if (tempoEstacionadoTotalMin<=tabelaPrecos[1].hora){
                        precoFinal = tabelaPrecos[1].preco
                    }

                    //Acima de 1h e abaixo de 12h --> Indice 2 (terceiro da tabela)//
                    else if (tempoEstacionadoTotalMin<=tabelaPrecos[3].hora){
                        precoFinal = tabelaPrecos[1].preco+(tempoEstacionadoHoras - 1)*tabelaPrecos[3].preco
                    }

                    else {
                        precoFinal = tabelaPrecos[4].preco
                    }

                console.log(tempoEstacionado)
                //Indica o tempo de permanência e o preço na página de saída//
                document.getElementById('saida-tempo-permanencia')!.innerHTML=`${tempoEstacionado}` 
                document.getElementById('saida-valor')!.innerHTML=`${precoFinal}` 

        }

    }



