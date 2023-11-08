"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const firebaseAdmin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
firebaseAdmin.initializeApp();

const todos_1 = require("./entities/todos");


const app = express();
exports.app = app;
app.use(cors());
app.use(express.json());


const todosRouter = new todos_1.TodosRouter();

app.use('/todos', todosRouter.router);
