import request from "supertest";
import app from '../../src/app';

describe("Test api Funcionario", () => {
    let data = null
    let id = null

    beforeEach(() => {
        data = {
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
        }
    });

    test("[GET] Pagina de funcionario", async () => {
        const response = await request(app)
            .get("/Funcionario")
        expect(response.statusCode).toBe(200);
    });

    test("[POST] Salvar novo Funcionario", async () => {
        const response = await request(app)
            .post("/Funcionario")
            .send(data)
        id = response.body.id
        expect(typeof (response.body.id)).toBe('number');
        expect(response.statusCode).toBe(201);
    })

    test("[PUT] Atualizar Funcionario", async () => {
        const response = await request(app)
            .put("/Funcionario/" + id)
            .send(data)
        expect(response.statusCode).toBe(204);
    })

    test("[DELETE] Deletar Funcionario", async () => {
        const response = await request(app)
            .delete("/Funcionario/" + id)
        expect(response.statusCode).toBe(204);
    })
});