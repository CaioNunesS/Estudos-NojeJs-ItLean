import '../configs/configs.js'
import registerToDo from '../models/models.js'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat.js'
dayjs.extend(customParseFormat)

export const insertTask = async (req, res) => {
    try {
        if (!req.body) throw Error('Body is undefined')

        const { id } = req.params
        const list = await registerToDo.findById(id)

        const { titulo, dataExecucao, isConcluido } = req.body;
        const listaTarefa = req.body
        let dataExecucaoValidacao = listaTarefa.dataExecucao
        console.log('teste ===>',dayjs(dataExecucaoValidacao, 'YYYY-MM-DD', true).isValid());
        // console.log('lista ==>', listaTarefa.titulo);

        if (
            listaTarefa.titulo.length > 0 &&
            dayjs(dataExecucaoValidacao, 'YYYY-MM-DD', true).isValid() &&
            typeof (listaTarefa.isConcluido) === 'boolean'

        ) {

            const newTask = {

                titulo,
                dataExecucao,
                isConcluido,
            }

            list.listaTarefas.push(newTask)

            await list.save()

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
export const updateTask = async (req, res) => {
    try {
        const { id, idTask } = req.params
        const body = req.body
        const listaTarefa = req.body
        console.log('lista ==>', listaTarefa.titulo);

        if (
            listaTarefa.titulo.length > 0 &&
            listaTarefa.dataExecucao.length >= 10 &&
            typeof (listaTarefa.isConcluido) === 'boolean'

        ) {

            const updateTaskList = await registerToDo.updateOne({ _id: id, 'listaTarefas._id': idTask }, { $set: { 'listaTarefas.$': body } })

            res.json(updateTaskList)
        } else {
            res.json({ message: "Informação inválida" })
        }
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

export const listTask = async (req, res) => {
    try {
        const { id } = req.params

        const toDoUser = await registerToDo.find({ _id: id })
        const taskList = toDoUser[0].listaTarefas

        res.json({ taskList })
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

export const getTaskById = async (req, res) => {
    try {

        const { id, idTask } = req.params
        const userToDo = await registerToDo.findById(id)
        const tasks = userToDo.listaTarefas
        const task = tasks.filter(tarefa => tarefa._id.toString() === idTask.toString())

        res.json(task)

    } catch (error) {
        res.status(400).json({ message: 'error get specific student!!' })
    }
}


export const deleteTask = async (req, res) => {
    try {
        const { id, idTask } = req.params
        const userToDo = await registerToDo.findById(id)
        const tasks = userToDo.listaTarefas
        const task = tasks.find(task => {
            if (task._id.toString() === idTask.toString()) {
                return task
            }
        })
        let taskId = tasks.indexOf(task)
        tasks.splice(taskId, 1)

        await registerToDo.updateOne({ _id: id, 'listaTarefas._id': idTask }, { $set: { listaTarefas: tasks } })

        res.json(tasks)
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

