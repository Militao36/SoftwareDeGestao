document.getElementById('btnSalvar').addEventListener('click', (e) => {
    e.preventDefault()

    const data = {
        idCliente: document.getElementById('idCliente').value,
        dataPedido: document.getElementById('dataPedido').value || null,
        idStatusPedido: document.getElementById('idStatusPedido').value || null,
        idFuncionario: document.getElementById('idFuncionario').value || null,
        observacao: document.getElementById('observacao').value
    }

    removeInvalidForm()
    const id = document.getElementById('uuid').value
    if (id === '')
        salvarProduto(data)
    else
        atualizarProduto(data, id)

})

document.getElementById('btnNovo').addEventListener('click', (e) => {
    e.preventDefault()
    limparForm()
})

document.getElementById('btnDeletar').addEventListener('click', (e) => {
    e.preventDefault()
    const uuid = document.getElementById('uuid').value
    deletarPedido(uuid)
})

document.getElementById('txtPesquisa').addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        let texto = document.getElementById('txtPesquisa').value || 'null';
        let coluna = document.getElementById('selectColuna').value;
        Grid(coluna, encodeURIComponent(texto));
    }

    $("#TableCliente tbody").empty()
})

function salvarProduto(data) {
    api.post('/Pedido', data)
        .then((response) => {
            document.getElementById('uuid').value = response.data.id
            swal("Pedido salvo com sucesso.", "", "success");
        }).catch((error) => {
            if (error.response.data.validacoes)
                return invalidForm(error.response.data.validacoes)

            swal("Ocorreu um erro, entre em contato com a empresa", "", "warning");
        })
}

function atualizarProduto(data, id) {
    api.put('/Pedido/' + id, data)
        .then((response) => {
            swal("Pedido atualizado com sucesso.", "", "success");
        }).catch((error) => {
            if (error.response.data.validacoes)
                return invalidForm(error.response.data.validacoes)

            swal("Ocorreu um erro, entre em contato com a empresa", "", "warning");
        })
}

function limparForm() {
    document.getElementById('frmPedido').reset()
}

function deletarPedido(uuid) {
    swal({
        title: "Tem certeza que quer deletar este registro?",
        text: "O registro será deletado definitivamente!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((isConfirm) => {
        if (isConfirm) {
            api.delete('/Pedido/' + uuid)
            limparForm()
            $("#tablePedido tbody").empty()
        }
    })
}

function selectGridPedido(id = null) {
    api.get('/Pedido/' + id)
        .then((response) => {
            const { pedido } = response.data
            for (const key in pedido) {
                const value = pedido[key]
                document.getElementById(key).value = value
            }

            GridProdutos(document.getElementById('uuid').value)
        })
}

function Grid(coluna, text) {
    if (!text)
        text = ''

    axios.get(`/Pedido/Search/${coluna}/${text}`)
        .then(async (response) => {
            const { data } = response.data;
            $("#tablePedido tbody").empty()
            for (const item of data) {
                $("#tablePedido tbody").append(`
                    <tr onclick="selectGridPedido('${item.uuid}')"> 
                        <td>${item.nomeCliente}</td> 
                        <td>${item.dataPedido}</td>
                        <td>${item.nomeStatus}</td>
                    </tr>
                `);
            }
        })
}

// Produtos do pedido

$('#valor').mask('000.000.000.000.000,00', {
    reverse: true,
});

$('#desconto').mask('000.000.000.000.000,00', {
    reverse: true,
});

document.getElementById('btnSalvarProdutos').addEventListener('click', (e) => {
    e.preventDefault();

    // removeInvalidForm()

    const data = {
        idProduto: document.getElementById('idProduto').value,
        quantidade: document.getElementById('quantidade').value,
        valor: document.getElementById('valor').value,
        desconto: document.getElementById('desconto').value,
        observacao: document.getElementById('produto.observacao').value,
        idPedido: document.getElementById('uuid').value
    }

    data.valor = decimalParser(String(data.valor))
    data.desconto = decimalParser(String(data.desconto))


    const uuidProduto = document.getElementById('uuidproduto').value;
    if (uuidProduto === "")
        saveProdutos(data)
    else
        updateProdutos(data, uuidProduto)
})

document.getElementById('btnNovoProdutos').addEventListener('click', (e) => {
    e.preventDefault()
    limparFormProdutos();
})

document.getElementById('btnDeletarProdutos').addEventListener('click', (e) => {
    e.preventDefault()
    const uuid = document.getElementById('uuidproduto').value
    deletarProdutoPedido(uuid)
})

function saveProdutos(data) {
    api.post('/Produto/Pedido', data)
        .then((response) => {
            document.getElementById('uuidproduto').value = response.data.id
            GridProdutos(document.getElementById('uuid').value)
            swal("Produto adicionado com sucesso.", "", "success");
        }).catch((error) => {
            if (error.response.data.validacoes)
                return invalidForm(error.response.data.validacoes)

            swal("Ocorreu um erro, entre em contato com a empresa", "", "warning");
        })
}

function updateProdutos(data, uuid) {
    api.put('/Produto/Pedido/' + uuid, data)
        .then((response) => {
            GridProdutos(document.getElementById('uuid').value)
            swal("Produto atualizado com sucesso.", "", "success");
        }).catch((error) => {
            if (error.response.data.validacoes)
                return invalidForm(error.response.data.validacoes)

            swal("Ocorreu um erro, entre em contato com a empresa", "", "warning");
        })
}

function GridProdutos(idPedido) {
    axios.get(`/Produto/Pedido/Search/${idPedido}`)
        .then(async (response) => {
            const { data } = response.data;
            $("#tableProdutoPedido tbody").empty()
            for (const item of data) {
                $("#tableProdutoPedido tbody").append(`
                    <tr onclick="selectGridProdutosPedido('${item.uuid}')"> 
                        <td>${item.nomeProduto}</td> 
                        <td>${item.quantidade}</td>
                        <td>${item.valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
                    </tr>
                `);
            }
        })
}

function selectGridProdutosPedido(id = null) {
    api.get('/Produto/Pedido/' + id)
        .then((response) => {
            const { produtoPedido } = response.data
            for (const key in produtoPedido) {
                const value = produtoPedido[key]
                document.getElementById(key).value = value
            }
        })
}

function limparFormProdutos() {
    document.getElementById('frmProdutosPedido').reset()
    removeInvalidForm()
}

async function deletarProdutoPedido(uuid) {

    const isConfirm = await swal({
        title: "Tem certeza que quer deletar este registro?",
        text: "O registro será deletado definitivamente!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })

    if (!isConfirm) {
        return;
    }
    api.delete('/Produto/Pedido/' + uuid)
        .then((result) => {
            limparFormProdutos()
            GridProdutos(document.getElementById('uuid').value)
        }).catch((error) => {
            const message = error.response?.data ?? "Ocorreu um erro, entre em contato com a empresa";
            swal(message, "", "warning");
        })
}
