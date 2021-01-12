$('#telefone').mask('(00) 00000-0000');
$('#celular').mask('(00) 00000-0000');
$('#cep').mask('00000-000');
$('#cpf').mask('000.000.000-00');
$('#dataAdmissao').mask('00/00/0000');
$('#dataDemissao').mask('00/00/0000');
$('#salario').mask('000.000.000.000.000,00', {
    reverse: true,
});



document.getElementById('btnSalvar').addEventListener('click', (e) => {
    e.preventDefault()

    const data = {
        nome: document.getElementById('nome').value,
        cpf: document.getElementById('cpf').value,
        rg: document.getElementById('rg').value,
        logradouro: document.getElementById('logradouro').value,
        numero: document.getElementById('numero').value,
        complemento: document.getElementById('complemento').value,
        bairro: document.getElementById('bairro').value,
        cep: document.getElementById('cep').value,
        cidade: document.getElementById('cidade').value,
        uf: document.getElementById('uf').value,
        telefone: document.getElementById('telefone').value,
        celular: document.getElementById('celular').value,
        email: document.getElementById('email').value,
        observacao: document.getElementById('observacao').value,
        salario: document.getElementById('salario').value,
        dataAdmissao: document.getElementById('dataAdmissao').value,
        comissao: document.getElementById('comissao').value,
        diaPagamento: document.getElementById('diaPagamento').value,
        dataDemissao: document.getElementById('dataDemissao').value,
    }

    data.salario = data.salario.replace('.', '').replace(',', '.')
    data.dataAdmissao = dateTransformHttp(data.dataAdmissao)
    data.comissao = data.comissao != "" ? 0 : Number(data.comissao.replace('.', '').replace(',', '.'))
    data.dataDemissao = dateTransformHttp(data.dataDemissao)

    removeInvalidForm()
    const uuid = document.getElementById('uuid').value
    if (uuid === '')
        salvarFornecedor(data)
    else
        atualizarFornecedor(data, uuid)

})

function salvarFornecedor(data) {
    api.post('/Funcionario', data)
        .then((response) => {
            document.getElementById('uuid').value = response.data.id
            swal("Funcionario salvo com sucesso.", "", "success");
        }).catch((error) => {
            if (error.response.data.validacoes)
                return invalidForm(error.response.data.validacoes)

            swal("Ocorreu um erro, entre em contato com a empresa", "", "warning");
        })
}

function atualizarFornecedor(data, id) {
    api.put('/Funcionario/' + id, data)
        .then((response) => {
            swal("Funcionario atualizado com sucesso.", "", "success");
        }).catch((error) => {
            if (error.response.data.validacoes)
                return invalidForm(error.response.data.validacoes)

            swal("Ocorreu um erro, entre em contato com a empresa", "", "warning");
        })
}

function invalidForm(data = []) {
    data.forEach(v => {
        const key = Object.keys(v)
        const value = Object.values(v)
        document.getElementById(key[0]).classList.add('is-invalid')
        const item = document.getElementById(`I${key[0]}`)
        item.style.display = 'block'
        item.classList.add("invalid-feedback");
        item.innerHTML = value.join('%')
    })
}

function removeInvalidForm() {
    const elements = document.getElementsByClassName('invalid-feedback')
    if (elements.length == 0)
        return

    for (let index = 0; index <= elements.length; index++) {
        const input = elements[0].parentElement.getElementsByTagName('input')[0]
        elements[0].style.display = 'none'
        input.classList.remove('is-invalid')
        elements[0].classList.remove('invalid-feedback')
    }
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
            api.delete('/Funcionario/' + uuid)
            limparForm()
        }
    })
}

function limparForm() {
    document.getElementById('frmFuncionario1').reset()
    document.getElementById('frmFuncionario2').reset()
    $("#TableFuncionario tbody").empty()
}

function Grid(coluna, text) {
    if (!text)
        text = ''

    axios.get(`/Funcionario/Search/${coluna}/${text}`)
        .then(async (response) => {
            const { data } = response.data;
            $("#TableFuncionario tbody").empty()
            for (const item of data) {
                $("#TableFuncionario tbody").append(`
                    <tr onclick="selectGridFuncionario('${item.uuid}')"> 
                        <td>${item.nome}</td> 
                        <td>${item.cpf || ''}</td>
                        <td>${item.cidade || ''}</td>
                    </tr>
                `);
            }
        })
}

function selectGridFuncionario(id = null) {
    api.get('/Funcionario/' + id)
        .then((response) => {
            const { funcionario } = response.data
            for (const key in funcionario) {
                const value = funcionario[key]
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

    $("#TableFuncionario tbody").empty()
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