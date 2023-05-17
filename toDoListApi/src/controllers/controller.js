import '../configs/configs.js'
import registerToDo from '../models/models.js'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat.js'
dayjs.extend(customParseFormat)

export const insertToDo = async (req, res) => {
    try {
        if (!req.body) throw Error('Body is undefined')

        const { nomeUsuario, dataAtual, listaTarefas: [{ titulo, dataExecucao, isConcluido }] } = req.body;
        // console.log(req.body.nomeUsuario.length);

        // let teste = dayjs('2022-02-31', 'YYYY-MM-DD', true).isValid();
        // console.log('teste ===>', teste);
        const listaTarefa = req.body.listaTarefas
        const dataAtualValidacao = req.body.dataAtual
        let tituloValidacao;
        let dataExecucaoValidacao;
        let isConcluidoValidacao;

        listaTarefa.forEach(element => {
            tituloValidacao = element.titulo.length
            // console.log('titulo ===>', tituloLength);
            dataExecucaoValidacao = element.dataExecucao
            // console.log('data ===>', dataExecucaoLength);
            isConcluidoValidacao = element.isConcluido
            // console.log('concluido ===>', isConcluidoLength);

        });

        if (req.body.nomeUsuario.length > 0 &&
            dayjs(dataAtualValidacao, 'YYYY-MM-DD', true).isValid() &&
            tituloValidacao > 0 &&
            dayjs(dataExecucaoValidacao, 'YYYY-MM-DD', true).isValid() &&
            typeof (isConcluidoLength) === 'boolean'

        ) {
            const newToDo = new registerToDo({
                nomeUsuario,
                dataAtual,
                listaTarefas: [{
                    titulo,
                    dataExecucao,
                    isConcluido,
                }]
            })
            await newToDo.save()
            res.status(201).json({ message: 'Task added sucess' })
        } else {
            res.json({ message: "Informação inválida" })
        }

    } catch (error) {
        console.log('error', error);
        res.status(400).json({
            mensagem: error,
        })
    }
}
export const updateToDo = async (req, res) => {
    try {
        const { id } = req.params
        const body = req.body

        const listaTarefa = req.body.listaTarefas
        // console.log(listaTarefa);
        let tituloLength;
        let dataExecucaoLength;
        let isConcluidoLength;

        listaTarefa.forEach(element => {
            tituloLength = element.titulo.length
            // console.log('titulo ===>', tituloLength);
            dataExecucaoLength = element.dataExecucao.length
            // console.log('data ===>', dataExecucaoLength);
            isConcluidoLength = element.isConcluido
            // console.log('concluido ===>', isConcluidoLength);

        });

        if (req.body.nomeUsuario.length > 0 &&
            req.body.dataAtual.length === 10 &&
            tituloLength > 0 &&
            dataExecucaoLength === 10 &&
            typeof (isConcluidoLength) === 'boolean'

        ) {

            const updateToDoList = await registerToDo.updateOne({ _id: id }, { ...body })

            res.json({ message: 'Update done with success', updateToDoList })
        } else {
            res.json({ message: "Informação inválida" })
        }
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

export const listToDo = async (req, res) => {
    try {
        const toDoList = await registerToDo.find({})

        res.json({ toDoList })
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

export const getToDoById = async (req, res) => {
    try {

        const { id } = req.params
        const toDo = await registerToDo.findById(id)

        res.json({ toDo })

    } catch (error) {
        res.status(400).json({ message: 'error get specific student!!' })
    }
}


export const deleteToDo = async (req, res) => {
    try {
        const { id } = req.params
        const result = await registerToDo.deleteOne({ _id: id })

        res.json(result)
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

