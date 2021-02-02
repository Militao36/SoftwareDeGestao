$('#valor').mask('000.000.000.000.000,00', {
    reverse: true,
});


document.getElementById('btnSalvar').addEventListener('click', (e) => {
    e.preventDefault()

    const data = {
        idTipoPagamento: document.getElementById('idTipoPagamento').value || null,
        tipo: document.getElementById('tipo').value || null,
        valor: document.getElementById('valor').value
            .replace('.', '').replace(',', '.') || 0,
        descricao: document.getElementById('descricao').value || null,
    }

    removeInvalidForm()
    const id = document.getElementById('uuid').value
    if (id === '')
        salvarCaixa(data)
    else
        atualizaCaixa(data, id)
})

document.getElementById('btnNovo').addEventListener('click', (e) => {
    e.preventDefault()
    limparForm()
})

document.getElementById('btnDeletar').addEventListener('click', (e) => {
    e.preventDefault()
    const uuid = document.getElementById('uuid').value
    deletarCaixa(uuid)
})

document.getElementById('txtPesquisa').addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        let texto = document.getElementById('txtPesquisa').value || 'null';
        let coluna = document.getElementById('selectColuna').value;
        Grid(coluna, encodeURIComponent(texto));
    }

    $("#tableCaixa tbody").empty()
})

document.getElementById('cadastrarFormaPagamento').addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = '/forma/pagamento'
})


function salvarCaixa(data) {
    api.post('/Caixa', data)
        .then((response) => {
            document.getElementById('uuid').value = response.data.id
            swal("Caixa salvo com sucesso.", "", "success");
        }).catch((error) => {
            if (error.response.data.validacoes)
                return invalidForm(error.response.data.validacoes)

            swal("Ocorreu um erro, entre em contato com a empresa", "", "warning");
        })
}

function atualizaCaixa(data, id) {
    api.put('/Caixa/' + id, data)
        .then((response) => {
            swal("Caixa atualizado com sucesso.", "", "success");
        }).catch((error) => {
            if (error.response.data.validacoes)
                return invalidForm(error.response.data.validacoes)

            swal("Ocorreu um erro, entre em contato com a empresa", "", "warning");
        })
}

function limparForm() {
    document.getElementById('frmCaixa').reset()
    $("#tableCaixa tbody").empty()
}

function deletarCaixa(uuid) {
    swal({
        title: "Tem certeza que quer deletar este registro?",
        text: "O registro será deletado definitivamente!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((isConfirm) => {
        if (isConfirm) {
            api.delete('/Caixa/' + uuid)
            limparForm()
            $("#tableCaixa tbody").empty()
        }
    })
}

function selectGridCaixa(id = null) {
    api.get('/Caixa/' + id)
        .then((response) => {
            const { caixa } = response.data
            for (const key in caixa) {
                const value = caixa[key]
                document.getElementById(key).value = value
            }
        })
}

function Grid(coluna, text) {
    if (!text)
        text = ''

    axios.get(`/Caixa/Search/${coluna}/${text}`)
        .then(async (response) => {
            const { data } = response.data;
            $("#tableCaixa tbody").empty()
            for (const item of data) {
                $("#tableCaixa tbody").append(`
                    <tr onclick="selectGridCaixa('${item.uuid}')"> 
                        <td>${item.tipoPagamento}</td> 
                        <td>${String(item.tipo).toUpperCase()}</td>
                        <td>${item.valor
                        .toLocaleString('pt-br', {
                            style: 'currency', currency: 'BRL'
                        }) || 0}</td>
                    </tr>
                `);
            }
        })
}