import request from "supertest";
import app from '../../src/app';

describe("Test api pedido", () => {
    let data = null
    let id = null

    beforeEach(async () => {
        const clienteResponse = await request(app).post("/Cliente")
            .send({
                nome: 'Matheus Moreira',
                cpfCnpj: '14361347654',
                ie: '',
                subTributario: '',
                endereco: 'Travessa são judas',
                numero: '40',
                complemento: 'Casa 2',
                bairro: 'Grota dos camilos',
                cidade: 'Viçosa',
                uf: 'MG',
                email: 'matheus@gmail.com',
                telefone: '3138919414'
            })

        const statusResponse = await request(app).post("/StatusPedido")
            .send({
                nomeStatus: "Aberto"
            })

        const funcionarioResponse = await request(app).post("/Funcionario")
            .send({
                nome: 'BMS LTDA',
                cpf: 'GRUPO BMS',
                rg: '',
                logradouro: 'Travessa são judas',
                numero: '40',
                complemento: 'Casa 2',
                bairro: 'Fatima',
                cep: '36570-000',
                cidade: 'Viçosa',
                uf: 'MG',
                telefone: '3138919414',
                celular: '3138919414',
                email: 'bms@gmail.com.br',
                observacao: 'Observacao teste',
                salario: 1000.00,
                dataAdmissao: '2021-01-02',
                comissao: 5,
                diaPagamento: '5',
                dataDemissao: null,
            })

        data = {
            idCliente: clienteResponse.body.id,
            dataPedido: '2021-01-17',
            idStatusPedido: statusResponse.body.id,
            idFuncionario: funcionarioResponse.body.id,
            valorComissao: 0,
            observacao: '',
            numeroReferencia: ''
        }
    });

    test("[GET] Pagina de pedido", async () => {
        const response = await request(app)
            .get("/Pedido")
        expect(response.statusCode).toBe(200);
    });

    test("[POST] Salvar novo pedido", async () => {
        const response = await request(app)
            .post("/Pedido")
            .send(data)
        id = response.body.id
        expect(typeof (response.body.id)).toBe('string');
        expect(response.statusCode).toBe(201);
    })

    test("[PUT] Atualizar pedido", async () => {
        const response = await request(app)
            .put("/Pedido/" + id)
            .send(data)
        expect(response.statusCode).toBe(204);
    })

    test("[DELETE] Deletar Pedido", async () => {
        const response = await request(app)
            .delete("/Pedido/" + id)
        expect(response.statusCode).toBe(204);
    })
});