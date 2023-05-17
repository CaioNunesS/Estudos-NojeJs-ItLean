import mongoose from "mongoose"; // mongo db

const toDoSchema = new mongoose.Schema({

    nomeUsuario: {
        type: String,
        require: "This field is required",
    },
    dataAtual: {
        type: Date,
        require: "This field is required",
    },
    listaTarefas: {
        type: [
            { titulo: String ,
             dataExecucao: Date ,
             isConcluido: Boolean }
        ],
        require: "This field is required"

    }
})

export default mongoose.model('registerToDo', toDoSchema);






