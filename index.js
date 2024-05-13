// import { sum } from './add.js';
const { sum } = require('./add');

// console.log("awasthi",sum(2,4));

// let s = sum(9,11);
// console.log(s);

const express = require("express");
const socket = require('socket.io');
const app = express();
const cors = require('cors');
const employeeRoutes = require('./routes/employee');

app.use(cors({
    origin: '*'
}));

app.use(express.json());

app.use('/employee',employeeRoutes.router);

const server = app.listen("8080", () => {
    console.log("Server started at port 8080")
});

const io = socket(server);

io.on('connection', (socket) => {
    console.log('New connection',socket.id);

    socket.on('myMsg',(msg)=>{
        console.log(socket.id);
        console.log(msg,"from angular");
        io.emit('fromServer',"Hi this is a message from server");
    })

})