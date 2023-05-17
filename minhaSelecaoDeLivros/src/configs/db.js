import mongoose from 'mongoose'

mongoose.Promise = Promise

mongoose.connection.on('connected', ()=>{
    console.log('MongoDB Connection Established');
})

mongoose.connection.on('disconnected', ()=>{
    console.log('MongoDB Connection Disconnected');
})

mongoose.connection.on('close', ()=>{
    console.log('MongoDB Connection Closed');
})

mongoose.connection.on('error', error => {
    console.log('MongoDB ERROR: ', error);
})

export const connectMongoDB = async ()=>{
    const connectUri = process.env.MONGODB_URI

    await mongoose.connect(connectUri,{
        useNewURLParser: true,
        useUnifiedTopology: true
    })
}