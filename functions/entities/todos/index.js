"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodosRouter = void 0;
const express_1 = require("express");
const firebaseAdmin = require("firebase-admin");
const db = firebaseAdmin.firestore().collection("todos");

class TodosRouter {
    constructor() {
        this.router = express_1.Router();

        this.router.get("/list-all", function (request, response) {
            db.get().then(function (docs) {
                let todos = [];

                docs.forEach(function (doc) {
                    todos.push({
                        id: doc.id,
                        description: doc.data().description
                    });
                });

                response.json(todos);
            });
        });

        this.router.get("/:id", function (request, response) {
            const id = request.params.id;
            db.doc(id).get().then(function (doc) {
                response.json({
                    id: doc.id,
                    description: doc.data().description
                });
            });
        });

        this.router.post("/todos", function (request, response) {
            const newTodo = {
                description: request.body.description,
            }

            db.add(newTodo).then(function () {
                response.json({
                    status: 200,
                    message: "Todo adicionado com sucesso"
                })
            });

        });

        this.router.delete("/todos", function (request, response) {

            db.doc(request.body.id).delete().then(function () {
                response.json({
                    status: 200,
                    message: "Todo deletado com sucesso"
                })
            });
        });

        this.router.put("/todos", function (request, response) {

            const updateTodo = {
                description: request.body.description,
            }

            db.doc(request.body.id).update(updateTodo).then(function () {
                response.json({
                    status: 200,
                    message: "Todo atualizado com sucesso"
                })
            });
        });
    }
}

exports.TodosRouter = TodosRouter;
