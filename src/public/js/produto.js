$('#valor').mask('000.000.000.000.000,00', {
    reverse: true,
});


document.getElementById('btnSalvar').addEventListener('click', (e) => {
    e.preventDefault()

    const data = {
        codBarras: document.getElementById('codBarras').value,
        nomeProduto: document.getElementById('nomeProduto').value,
        valor: document.getElementById('valor').value,
        estoque: Number(document.getElementById('estoque').value || '0'),
        estoqueMin: Number(document.getElementById('estoqueMin').value || '0'),
        idFornecedor: document.getElementById('idFornecedor').value == "null" ? null : document.getElementById('idFornecedor').value,
    }

    data.valor = data.valor.replace('.', '').replace(',', '.')

    removeInvalidForm()
    const id = document.getElementById('uuid').value
    if (id === '')
        salvarProduto(data)
    else
        atualizarProduto(data, id)

})

function salvarProduto(data) {
    api.post('/Produto', data)
        .then((response) => {
            document.getElementById('uuid').value = response.data.id
            swal("Produto salvo com sucesso.", "", "success");
        }).catch((error) => {
            if (error.response.data.validacoes)
                return invalidForm(error.response.data.validacoes)

            swal("Ocorreu um erro, entre em contato com a empresa", "", "warning");
        })
}

function atualizarProduto(data, id) {
    api.put('/Produto/' + id, data)
        .then((response) => {
            swal("Produto atualizado com sucesso.", "", "success");
        }).catch((error) => {
            if (error.response.data.validacoes)
                return invalidForm(error.response.data.validacoes)

            swal("Ocorreu um erro, entre em contato com a empresa", "", "warning");
        })
}

function deletarProduto(uuid) {
    swal({
        title: "Tem certeza que quer deletar este registro?",
        text: "O registro será deletado definitivamente!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((isConfirm) => {
        if (isConfirm) {
            api.delete('/Produto/' + uuid)
            limparForm()
        }
    })
}

function limparForm() {
    document.getElementById('frmProduto1').reset()
    document.getElementById('frmProduto2').reset()
    $("#TableProduto tbody").empty()
    document.getElementById('txtPesquisa').value = ""
}

function Grid(coluna, text) {
    if (!text)
        text = ''

    axios.get(`/Produto/Search/${coluna}/${text}`)
        .then(async (response) => {
            const { data } = response.data;
            $("#TableProduto tbody").empty()
            for (const item of data) {
                $("#TableProduto tbody").append(`
                    <tr onclick="selectGridProduto('${item.uuid}')"> 
                        <td>${item.nomeProduto}</td> 
                        <td>${item.valor || 0}</td>
                        <td>${item.estoque || 0}</td>
                    </tr>
                `);
            }
        })
}

function selectGridProduto(id = null) {
    api.get('/Produto/' + id)
        .then((response) => {
            const { produto } = response.data
            for (const key in produto) {
                const value = produto[key]
                if (key === 'dataAdmissao' || key === 'dataDemissao') {
                    document.getElementById(key).value = dateTransformDateValid(value)
                    continue;
                }
                document.getElementById(key).value = valueModify(value)
            }
        })
}

document.getElementById('txtPesquisa').addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        let texto = document.getElementById('txtPesquisa').value || 'null';
        let coluna = document.getElementById('selectColuna').value;
        Grid(coluna, encodeURIComponent(texto));
    }

    $("#TableProduto tbody").empty()
});

document.getElementById('btnNovo').addEventListener('click', (e) => {
    e.preventDefault()
    limparForm()
})

document.getElementById('btnDeletar').addEventListener('click', (e) => {
    e.preventDefault()
    const uuid = document.getElementById('uuid').value
    if (uuid)
        deletarProduto(uuid)
})