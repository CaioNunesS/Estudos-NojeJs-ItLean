import '../configs/db.js'
import registerStudent from '../models/models.js'

export const insertStudent = async (req, res) => {
    try {
        if (!req.body) throw Error('Body is undefined')

        const { name, studentClass, endnote } = req.body;

        const newStudent = new registerStudent({
            name,
            studentClass,
            endnote,
        })

        await newStudent.save()

        res.status(201).json({ menssage: 'Student added sucess' })
    } catch (error) {
        console.log('error', error);
        res.status(400).json({
            mensagem: error,
        })
    }
}

export const listStudents = async (req, res) => {
    try {
        const students = await registerStudent.find({})

        res.json({ students })
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

export const getStudentById = async (req, res) => {
    try {

        const { id } = req.params
        const student = await registerStudent.findById(id)
        let studentMsg = ''
        if (student.endnote < 5) {
            studentMsg = 'The student has failed'
        }else if(student.endnote > 4 && student.endnote < 6){
            studentMsg = 'the student is in remedial classes'
        }else{ studentMsg ='Approved student'}

        res.json({ ...student._doc, studentMsg })
        
        // let finalSituation = {
        //     Reproved: student.endnote < 5,
        //     Remedial: student.endnote >= 5 && student.endnote < 6,
        //     Approved: student.endnote >= 6
        // }
        // const finalResult = Object.entries(finalSituation).find(([key, value]) => value === true)[0];

        //res.json({ ...student._doc, finalResult })

    } catch (error) {
        res.status(400).json({ message: 'error get specific student' })
    }
}

export const updateStudent = async (req, res) => {
    try {
        const { id } = req.params
        const body = req.body

        const updateStudentList = await registerStudent.updateOne({ _id: id }, { ...body })

        res.json(updateStudentList)

    } catch (error) {
        res.status(400).json({ message: error })
    }
}

export const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params
        const result = await registerStudent.deleteOne({ _id: id })

        res.json(result)
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

