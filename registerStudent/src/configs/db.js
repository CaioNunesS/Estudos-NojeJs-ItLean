import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_URL,{
    useNewURLParser: true,
    useUnifiedTopology: true,
  })

  const db = mongoose.connection;
  db.on('error',console.error.bind(console, 'connection error'))

  db.once('open', ()=>{
    console.log('Connected');
  })