var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _a, _b, _c, _d, _e;
//puxando todas as páginas//
var paginaInicial = document.getElementById('pagina-inicial');
var paginaEntrada = document.getElementById('pagina-entrada');
var paginaConfirmacaoEntrada = document.getElementById('pagina-confirmacao-entrada');
var paginaSaida = document.getElementById('pagina-saida');
var paginaConfirmacaoSaida = document.getElementById('pagina-confirmacao-saida');
var paginaHistorico = document.getElementById('pagina-historico');
var paginaPatio = document.getElementById('pagina-patio');
var paginaPrecos = document.getElementById('pagina-tabela-precos');
// auxiliar para páginas ativas //
var paginaConfirmacaoEntradaAtiva = false;
var paginaConfirmacaoSaidaAtiva = false;
var paginaHistoricoAtiva = false;
var paginaPatioAtiva = false;
var paginaPrecosAtiva = false;
//declarações iniciais auxiliares//
var numeroId = 0;
var nome, placa;
var numeroIdAux = 0;
var idSaida = 0;
var tempoEstacionado = "";
var precoFinal = 0;
//página inicial - botão entrada//
(_a = document.getElementById('botao-entrada')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
    paginaInicial.classList.add('hidden');
    paginaEntrada.classList.remove('hidden');
});
//página inicial - botão entrada//
(_b = document.getElementById('botao-saida')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
    paginaInicial.classList.add('hidden');
    paginaSaida.classList.remove('hidden');
});
//página inicial - botão historico//
(_c = document.getElementById('botao-historico')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function () {
    paginaInicial.classList.add('hidden');
    paginaHistorico.classList.remove('hidden');
    paginaHistoricoAtiva = true;
    voltarPaginaInicial();
});
//página inicial - botão patio//
(_d = document.getElementById('botao-patio')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', function () {
    paginaInicial.classList.add('hidden');
    paginaPatio.classList.remove('hidden');
    paginaPatioAtiva = true;
    voltarPaginaInicial();
});
//página inicial - botão tabela precos//
(_e = document.getElementById('botao-tabela-precos')) === null || _e === void 0 ? void 0 : _e.addEventListener('click', function () {
    paginaInicial.classList.add('hidden');
    paginaPrecos.classList.remove('hidden');
    paginaPrecosAtiva = true;
    voltarPaginaInicial();
});
//página confirmação entrada, confirmação saída, histórico, ver pátio e tabela preços - botão voltar à página inicial//  
function voltarPaginaInicial() {
    if (paginaConfirmacaoEntradaAtiva) {
        var botao = document.getElementsByClassName('voltar-pagina-inicial')[0];
        botao.addEventListener('click', function () {
            paginaInicial.classList.remove('hidden');
            paginaConfirmacaoEntradaAtiva = false;
            paginaConfirmacaoEntrada.classList.add('hidden');
            document.getElementById('id-veiculo').innerHTML = "";
        });
        return;
    }
    else if (paginaConfirmacaoSaidaAtiva) {
        var botao = document.getElementsByClassName('voltar-pagina-inicial')[1];
        botao.addEventListener('click', function () {
            paginaInicial.classList.remove('hidden');
            paginaConfirmacaoSaidaAtiva = false;
            paginaConfirmacaoSaida.classList.add('hidden');
        });
        return;
    }
    else if (paginaHistoricoAtiva) {
        var botao = document.getElementsByClassName('voltar-pagina-inicial')[2];
        botao.addEventListener('click', function () {
            paginaInicial.classList.remove('hidden');
            paginaHistoricoAtiva = false;
            paginaHistorico.classList.add('hidden');
        });
        return;
    }
    else if (paginaPatioAtiva) {
        var botao = document.getElementsByClassName('voltar-pagina-inicial')[3];
        botao.addEventListener('click', function () {
            paginaInicial.classList.remove('hidden');
            paginaPatioAtiva = false;
            paginaPatio.classList.add('hidden');
        });
        return;
    }
    else if (paginaPrecosAtiva) {
        var botao = document.getElementsByClassName('voltar-pagina-inicial')[4];
        botao.addEventListener('click', function () {
            paginaInicial.classList.remove('hidden');
            paginaPrecosAtiva = false;
            paginaPrecos.classList.add('hidden');
        });
        return;
    }
}
// Cadastrar veículos//
//Etapa 1: preenchimento - página entrada//
//Render Pátio e Histórico - construção na etapa 4 //
renderPatio();
renderHistorico();
//Etapa 2: preenchimento - página entrada// 
//Lê as entradas do botao cadastro
var formEntrada = document.getElementById('entrada');
formEntrada.onsubmit = function (e) {
    var nomeInput = document.getElementById('nome');
    var placaInput = document.getElementById('placa');
    e.preventDefault();
    nome = nomeInput.value;
    placa = placaInput.value;
    formEntrada.reset();
    //Caso o usuário não preencha, aparece um alerta
    if (!nome || !placa) {
        alert('Os campos nome e placa são obrigatórios');
        return;
    }
    //redireciona à página de confirmação da entrada
    paginaEntrada.classList.add('hidden');
    paginaConfirmacaoEntrada.classList.remove('hidden');
    paginaConfirmacaoEntradaAtiva = true;
    voltarPaginaInicial();
    //Faz a conexão com a Etapa 3. 
    adicionarPatio({ numeroId: numeroId, nome: nome, placa: placa, horaEntrada: new Date() }, true);
    adicionarHistorico({ numeroId: numeroId, nome: nome, placa: placa, horaEntrada: new Date() }, true);
    // Mostra ID do carro//
    document.getElementById('id-veiculo').innerHTML = "".concat(numeroId);
};
//Etapa 3: preenchimento das tabelas nas páginas histórico e pátio//
//Patio //
function adicionarPatio(veiculoAdicionado, salvarNovos) {
    numeroId = numeroIdAux;
    numeroId++;
    var criarRow = document.createElement('tr');
    criarRow.setAttribute('class', 'linhaTabelaPatio');
    criarRow.innerHTML = "\n            <td>".concat(numeroId, "</td>\n            <td>").concat(veiculoAdicionado.nome, "</td> \n            <td>").concat(veiculoAdicionado.placa, "</td> \n            <td>").concat(veiculoAdicionado.horaEntrada, "</td>");
    document.getElementById('tabela-patio').appendChild(criarRow);
    var veiculoAddPatio = { horaEntrada: veiculoAdicionado.horaEntrada, numeroId: numeroId, nome: veiculoAdicionado.nome, placa: veiculoAdicionado.placa };
    if (salvarNovos) {
        salvarPatio(__spreadArray(__spreadArray([], lerPatio(), true), [veiculoAddPatio], false));
    }
}
//Historico //
function adicionarHistorico(veiculoAdicionado, salvarNovos) {
    numeroIdAux++;
    numeroId = numeroIdAux;
    var criarRow = document.createElement('tr');
    criarRow.innerHTML = "\n            <td>".concat(numeroIdAux, "</td>\n            <td>").concat(veiculoAdicionado.nome, "</td> \n            <td>").concat(veiculoAdicionado.placa, "</td> \n            <td>").concat(veiculoAdicionado.horaEntrada, "</td>\n            <td class=\"hora-saida\">-</td>\n            <td class = 'preco-final'>-</td>");
    document.getElementById('tabela-historico').appendChild(criarRow);
    if (salvarNovos) {
        salvarHistorico(__spreadArray(__spreadArray([], lerHistorico(), true), [veiculoAdicionado], false));
    }
}
//Etapa 4 - Salvar no local storage //
// Lê o local storage para patio //
function lerPatio() {
    return localStorage.patio ? JSON.parse(localStorage.patio) : [];
}
// Lê o local storage para histórico //
function lerHistorico() {
    return localStorage.historico ? JSON.parse(localStorage.historico) : [];
}
// Salva o que foi feito no local storage para patio // 
function salvarPatio(veiculosASalvar) {
    localStorage.setItem('patio', JSON.stringify(veiculosASalvar));
}
// Salva o que foi feito no local storage para patio // 
function salvarHistorico(veiculosASalvar) {
    localStorage.setItem('historico', JSON.stringify(veiculosASalvar));
}
// Renderiza o patio //
function renderPatio() {
    var tabelaPatio = document.getElementById('tabela-patio');
    tabelaPatio.innerHTML = "";
    var patioRender = lerPatio();
    if (patioRender.length) {
        patioRender.forEach(function (veiculoRenderPatio) {
            var criarRow = document.createElement('tr');
            criarRow.setAttribute('class', 'linhaTabelaPatio');
            criarRow.innerHTML = "\n                    <td>".concat(veiculoRenderPatio.numeroId, "</td>\n                    <td>").concat(veiculoRenderPatio.nome, "</td> \n                    <td>").concat(veiculoRenderPatio.placa, "</td> \n                    <td>").concat(veiculoRenderPatio.horaEntrada, "</td>");
            document.getElementById('tabela-patio').appendChild(criarRow);
        });
    }
}
// Renderiza o historico //
function renderHistorico() {
    var tabelaHistorico = document.getElementById('tabela-historico');
    tabelaHistorico.innerHTML = "";
    var historicoRender = lerHistorico();
    if (historicoRender.length) {
        historicoRender.forEach(function (veiculoRenderHistorico) {
            numeroIdAux++;
            var criarRow = document.createElement('tr');
            var saida = veiculoRenderHistorico.horaSaida ? veiculoRenderHistorico.horaSaida : "-";
            var vFinal = veiculoRenderHistorico.Valor ? veiculoRenderHistorico.Valor : "-";
            criarRow.innerHTML = "\n                    <td>".concat(veiculoRenderHistorico.numeroId, "</td>\n                    <td>").concat(veiculoRenderHistorico.nome, "</td> \n                    <td>").concat(veiculoRenderHistorico.placa, "</td> \n                    <td>").concat(veiculoRenderHistorico.horaEntrada, "</td>\n                    <td class = 'hora-saida'>").concat(saida, "</td>\n                    <td class = 'preco-final'>").concat(vFinal, "</td>");
            document.getElementById('tabela-historico').appendChild(criarRow);
        });
    }
}
//Etapa 5: Saída do veículo //
//Lê o ID do carro a ser retirado a partir do botão de saída
var formSaida = document.getElementById('saida');
formSaida.onsubmit = function (e) {
    var idInput = document.getElementById('id-saida');
    e.preventDefault();
    idSaida = parseInt(idInput.value);
    formSaida.reset();
    //Caso o usuário não preencha, aparece um alerta
    if (!idSaida) {
        alert('O campo ID é obrigatório');
        return;
    }
    tiraPatio();
};
//Tira do Pátio//
function tiraPatio() {
    var veiculoSaiu = false;
    var patioAtual = lerPatio();
    //confere se esse veículo ainda está no pátio //
    var contador = 0;
    patioAtual.forEach(function (veiculoPatioAtual) {
        contador++;
        if (veiculoPatioAtual.numeroId == idSaida) {
            veiculoSaiu = true;
            var horaSaida = new Date; //Anota o horário de saída no histórico//
            calcularPreco(veiculoPatioAtual, horaSaida);
            var valor = precoFinal;
            saidaVeiculoPatio(veiculoPatioAtual, true, contador);
            saidaVeiculoHistorico(veiculoPatioAtual, horaSaida, valor, true);
        }
        else if ((contador == patioAtual.length) && (!veiculoSaiu)) {
            return alert('Esse veículo já foi retirado');
        }
    });
    //redireciona à página de confirmação da saída
    if (veiculoSaiu) {
        paginaSaida.classList.add('hidden');
        paginaConfirmacaoSaida.classList.remove('hidden');
        paginaConfirmacaoSaidaAtiva = true;
        voltarPaginaInicial();
    }
}
//Ativa a saída do painel de Históricos, com horário e valor
function saidaVeiculoHistorico(veiculoSaida, horaSaida, valor, salvarNovos) {
    veiculoSaida.horaSaida = horaSaida;
    veiculoSaida.Valor = valor;
    var registroSaida = document.getElementsByClassName('hora-saida')[idSaida - 1];
    registroSaida.innerHTML = "".concat(veiculoSaida.horaSaida);
    var registroPreco = document.getElementsByClassName('preco-final')[idSaida - 1];
    registroPreco.innerHTML = "".concat(veiculoSaida.Valor);
    //Substitui o histórico antigo por novo, para que possa salvar o novo no local storage//
    var arrHistoricoAtual = lerHistorico();
    arrHistoricoAtual.splice(veiculoSaida.numeroId - 1, 1, veiculoSaida);
    if (salvarNovos) {
        salvarHistorico(arrHistoricoAtual);
    }
    return;
}
//Retira o veículo do painel pátio //
function saidaVeiculoPatio(veiculoPatioAtual, salvarNovos, contador) {
    var tabelaPatio = document.getElementById('tabela-patio');
    var linhaRemovida = document.getElementsByClassName('linhaTabelaPatio')[contador - 1];
    tabelaPatio.removeChild(linhaRemovida);
    //Substitui o patio antigo por novo, para que possa salvar o novo no local storage//
    var arrPatioAtual = lerPatio();
    arrPatioAtual.splice(contador - 1, 1);
    if (salvarNovos) {
        salvarPatio(arrPatioAtual);
    }
}
//Etapa 6: calcular o preço //
// Render para a tabela de preços//
renderPreco();
//declarações do DOM //
var botaoSalvarPreco = document.getElementById('salvar-tabela-preco');
var quantPreco = 4;
botaoSalvarPreco.addEventListener('click', function () {
    var arrPreco = [];
    for (var i = 0; i < quantPreco; i++) {
        var inputPreco = document.getElementsByClassName('preco')[i];
        var preco = parseInt(inputPreco.value);
        var teste = inputPreco.dataset.hora;
        var hora = parseInt(teste);
        inputPreco.setAttribute('value', "".concat(preco));
        arrPreco.push({ hora: hora, preco: preco });
    }
    salvarPrecos(arrPreco);
    return;
});
function lerPrecos() {
    return localStorage.preco ? JSON.parse(localStorage.preco) : [];
}
function salvarPrecos(precosASalvar) {
    localStorage.setItem('preco', JSON.stringify(precosASalvar));
}
function renderPreco() {
    var precoCatalogo = { hora: 0, preco: 0 };
    var precosRender = lerPrecos();
    if (precosRender) {
        for (var i = 0; i < precosRender.length; i++) {
            precoCatalogo = precosRender[i];
            document.getElementsByClassName('preco')[i].setAttribute("value", "".concat(precoCatalogo.preco));
        }
    }
}
//Calcular preços//
function calcularPreco(registroSaida, horaSaida) {
    if (horaSaida) {
        var entradaCalculoAux = registroSaida.horaEntrada;
        var saidaCalculoAux = horaSaida;
        console.log(entradaCalculoAux);
        console.log(saidaCalculoAux);
        //Dados Entrada//
        var entradaCalculo = new Date(entradaCalculoAux).getTime();
        var saidaCalculo = new Date(saidaCalculoAux).getTime();
        console.log(entradaCalculo);
        console.log(saidaCalculo);
        var tempoEstacionadoTotalMin = Math.floor((saidaCalculo - entradaCalculo) / 60000);
        console.log(tempoEstacionadoTotalMin);
        //Indica de forma amigável quanto tempo ficou estacionado
        var tempoEstacionadoHoras = tempoEstacionadoTotalMin >= 60 ? Math.floor(tempoEstacionadoTotalMin / 60) : 0;
        var tempoEstacionadoMin = Math.floor(tempoEstacionadoTotalMin % 60);
        tempoEstacionado = "".concat(tempoEstacionadoHoras, "h e ").concat(tempoEstacionadoMin, "min");
        //Compara o tempo à tabela de preços - cada preço terá um if
        var tabelaPrecos = lerPrecos();
        //Até 30min --> Indice 0 (primeiro da tabela)//
        if (tempoEstacionadoTotalMin <= tabelaPrecos[0].hora) {
            precoFinal = tabelaPrecos[0].preco;
        }
        //Até 1h --> Indice 1 (segundo da tabela)//
        else if (tempoEstacionadoTotalMin <= tabelaPrecos[1].hora) {
            precoFinal = tabelaPrecos[1].preco;
        }
        //Acima de 1h e abaixo de 12h --> Indice 2 (terceiro da tabela)//
        else if (tempoEstacionadoTotalMin <= tabelaPrecos[3].hora) {
            precoFinal = tabelaPrecos[1].preco + (tempoEstacionadoHoras - 1) * tabelaPrecos[3].preco;
        }
        else {
            precoFinal = tabelaPrecos[4].preco;
        }
        console.log(tempoEstacionado);
        //Indica o tempo de permanência e o preço na página de saída//
        document.getElementById('saida-tempo-permanencia').innerHTML = "".concat(tempoEstacionado);
        document.getElementById('saida-valor').innerHTML = "".concat(precoFinal);
    }
}
