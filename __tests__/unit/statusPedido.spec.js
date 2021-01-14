import request from "supertest";
import app from '../../src/app';

describe("Test api status pedido", () => {
    let data = null
    let id = null

    beforeEach(async () => {
        data = {
            nomeStatus: "Aberto"
        }
    });

    test("[POST] Salvar novo Status Pedido", async () => {
        const response = await request(app)
            .post("/StatusPedido")
            .send(data)
        id = response.body.id
        console.log(response.body)
        expect(typeof (response.body.id)).toBe('string');
        expect(response.statusCode).toBe(201);
    })

    test("[PUT] Atualizar Status Pedido", async () => {
        const response = await request(app)
            .put("/StatusPedido/" + id)
            .send(data)
        expect(response.statusCode).toBe(204);
    })

    test("[DELETE] Deletar Status Pedido", async () => {
        const response = await request(app)
            .delete("/StatusPedido/" + id)
        expect(response.statusCode).toBe(204);
    })
});