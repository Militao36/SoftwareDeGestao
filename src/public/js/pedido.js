document.getElementById('btnSalvar').addEventListener('click', (e) => {
    e.preventDefault()

    const data = {
        idCliente: document.getElementById('idCliente').value,
        dataPedido: document.getElementById('dataPedido').value || null,
        idStatusPedido: document.getElementById('idStatusPedido').value || null,
        idFuncionario: document.getElementById('idFuncionario').value || null,
        valorComissao: document.getElementById('valorComissao').value,
        observacao: document.getElementById('observacao').value,
    }


    removeInvalidForm()
    const id = document.getElementById('uuid').value
    if (id === '')
        salvarProduto(data)
    else
        atualizarProduto(data, id)

})

document.getElementById('btnNovo').addEventListener('click', (e) => {
    limparForm()
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
    $("#tablePedido tbody").empty()
}