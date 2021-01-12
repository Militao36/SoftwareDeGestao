import request from "supertest";
import app from '../../src/app';

describe("Test api Produto", () => {
    let data = null
    let id = null

    beforeEach(async () => {
        const response = await request(app).post("/Fornecedor")
            .send({
                razaoSocial: 'BMS LTDA',
                nomeFantasia: 'GRUPO BMS',
                logradouro: 'Travessa são judas',
                numero: '40',
                complemento: 'Casa 2',
                bairro: 'Fatima',
                cep: '36570-000',
                cidade: 'Viçosa',
                uf: 'MG',
                telefone: '3138919414',
                celular: '',
                cnpjCpf: '03.054.436/0001-51',
                ie: '',
                email: 'bms@gmail.com.br'
            })
        data = {
            codBarras: '1234',
            nomeProduto: 'Camisa Preta',
            valor: 29.00,
            estoque: 10,
            estoqueMin: 1,
            idFornecedor: response.body.id,
        }
    });

    test("[GET] Pagina de produto", async () => {
        const response = await request(app)
            .get("/Produto")
        expect(response.statusCode).toBe(200);
    });

    test("[POST] Salvar novo Produto", async () => {
        const response = await request(app)
            .post("/Produto")
            .send(data)
        id = response.body.id
        expect(typeof (response.body.id)).toBe('string');
        expect(response.statusCode).toBe(201);
    })

    test("[PUT] Atualizar Produto", async () => {
        const response = await request(app)
            .put("/Produto/" + id)
            .send(data)
        expect(response.statusCode).toBe(204);
    })

    test("[DELETE] Deletar Produto", async () => {
        const response = await request(app)
            .delete("/Produto/" + id)
        expect(response.statusCode).toBe(204);
    })
});