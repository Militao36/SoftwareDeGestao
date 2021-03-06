$('#telefone').mask('(00) 00000-0000');
$('#celular').mask('(00) 00000-0000');
$('#cep').mask('00000-000');

const options = {
    onKeyPress: function (cpf, ev, el, op) {
        var masks = ['000.000.000-000', '00.000.000/0000-00'];
        $('#cnpjCpf').mask((cpf.length > 14) ? masks[1] : masks[0], op);
    }
}

$('#cnpjCpf').length > 11 ? $('#cnpjCpf').mask('00.000.000/0000-00', options) : $('#cnpjCpf').mask('000.000.000-00#', options);

document.getElementById('btnSalvar').addEventListener('click', (e) => {
    e.preventDefault()
    const data = {
        razaoSocial: document.getElementById('razaoSocial').value,
        nomeFantasia: document.getElementById('nomeFantasia').value,
        logradouro: document.getElementById('logradouro').value,
        numero: document.getElementById('numero').value,
        complemento: document.getElementById('complemento').value,
        bairro: document.getElementById('bairro').value,
        cep: document.getElementById('cep').value,
        cidade: document.getElementById('cidade').value,
        uf: document.getElementById('uf').value,
        telefone: document.getElementById('telefone').value,
        celular: document.getElementById('celular').value,
        cnpjCpf: document.getElementById('cnpjCpf').value,
        ie: document.getElementById('ie').value,
        email: document.getElementById('email').value,
    }

    removeInvalidForm()
    const id = document.getElementById('uuid').value
    if (id === '')
        salvarFornecedor(data)
    else
        atualizarFornecedor(data, id)

})

function salvarFornecedor(data) {

    api.post('/Fornecedor', data)
        .then((response) => {
            document.getElementById('uuid').value = response.data.id
            swal("Fornecedor salvo com sucesso.", "", "success");
        }).catch((error) => {
            if (error.response.data.validacoes)
                return invalidForm(error.response.data.validacoes)

            swal("Ocorreu um erro, entre em contato com a empresa", "", "warning");
        })
}

function atualizarFornecedor(data, id) {
    api.put('/Fornecedor/' + id, data)
        .then((response) => {
            swal("Fornecedor salvo com sucesso.", "", "success");
        }).catch((error) => {
            if (error.response.data.validacoes)
                return invalidForm(error.response.data.validacoes)

            swal("Ocorreu um erro, entre em contato com a empresa", "", "warning");
        })
}

function deletarFornecedor(uuid) {
    swal({
        title: "Tem certeza que quer deletar este registro?",
        text: "O registro será deletado definitivamente!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((isConfirm) => {
        if (isConfirm) {
            api.delete('/Fornecedor/' + uuid)
            limparForm()
            $("#TableFornecedor tbody").empty()
        }
    })
}

function limparForm() {
    document.getElementById('frmFornecedor1').reset()
    document.getElementById('frmFornecedor2').reset()
    $("#TableFornecedor tbody").empty()

}

function Grid(coluna, text) {
    if (!text)
        text = ''

    axios.get(`/Fornecedor/Search/${coluna}/${text}`)
        .then(async (response) => {
            const { data } = response.data;
            $("#TableFornecedor tbody").empty()
            for (const item of data) {
                $("#TableFornecedor tbody").append(`
                    <tr onclick="selectGridFornecedor('${item.uuid}')"> 
                        <td>${item.razaoSocial}</td> 
                        <td>${item.cnpjCpf || ''}</td>
                        <td>${item.cidade || ''}</td>
                    </tr>
                `);
            }
        })
}

function selectGridFornecedor(id = null) {
    api.get('/Fornecedor/' + id)
        .then((response) => {
            const { fornecedor } = response.data
            for (const key in fornecedor) {
                const value = fornecedor[key]
                document.getElementById(key).value = value
            }
        })
}

document.getElementById('txtPesquisa').addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        let texto = document.getElementById('txtPesquisa').value || 'null';
        let coluna = document.getElementById('selectColuna').value;
        Grid(coluna, encodeURIComponent(texto));
    }

    $("#TableFornecedor tbody").empty()
});

document.getElementById('btnNovo').addEventListener('click', (e) => {
    e.preventDefault()
    limparForm()
})

document.getElementById('btnDeletar').addEventListener('click', (e) => {
    e.preventDefault()
    const uuid = document.getElementById('uuid').value
    if (uuid)
        deletarFornecedor(uuid)
})