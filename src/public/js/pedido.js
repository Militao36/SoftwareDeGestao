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
    e.preventDefault()
    limparForm()
})

document.getElementById('btnDeletar').addEventListener('click', (e) => {
    e.preventDefault()
    const uuid = document.getElementById('uuid').value
    deletarPedido(uuid)
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
                        <td>${new Date(item.dataPedido).toLocaleDateString()}</td>
                        <td>${item.nomeStatus}</td>
                    </tr>
                `);
            }
        })
}

document.getElementById('txtPesquisa').addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        let texto = document.getElementById('txtPesquisa').value || 'null';
        let coluna = document.getElementById('selectColuna').value;
        Grid(coluna, encodeURIComponent(texto));
    }

    $("#TableCliente tbody").empty()
});