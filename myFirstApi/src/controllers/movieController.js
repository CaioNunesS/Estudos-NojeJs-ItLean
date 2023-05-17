import '../configs/db.js'
import Movie from '../models/movie.js'

export const insertMovie = async(req, res)=>{
    try {
        if (!req.body) throw Error('Body is undefined')
       
        const {name,description,category} = req.body;

        const newMovie = new Movie({
            name,
            description,
            category
        })

        // console.log('body', {name,description,category});
        await newMovie.save()
        
        res.json(201).json({menssage: 'Movie added sucess'})
    } catch (error) {
        console.log('error', error);
        res.status(400).json({
            mensagem: error,
        })
    }
}

export const listMovies = async (req, res)=>{
    try {
        const movies = await Movie.find({})

        res.json({movies})
    } catch (error) {
        res.status(400).json({message: error})
    }
}

export const updateMovie = async (req, res)=>{
    try {
        const {id} = req.params
        const body = req.body

        const updateMovie = await Movie.updateOne({_id: id}, {...body})

        res.json(updateMovie)

    } catch (error) {
        res.status(400).json({message: error})
    }
}

export const deleteMovie = async (req, res)=>{
    try {
        const {id} = req.params
        const result = await Movie.deleteOne({_id: id})

        res.json(result)
    } catch (error) {
        res.status(400).json({message: error})
    }
}

export const getMovieById = async (req,res)=>{
    try {
const {id} = req.params


        const movie = await Movie.findById(id)
        res.json(movie)
    } catch (error) {
        res.status(400).json({message: 'error get specific movie'})
    }
}