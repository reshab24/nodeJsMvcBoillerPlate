require('dotenv').config()
const mongoose = require('mongoose')
const app=require('./app');

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
  );
  
  mongoose
    .connect(DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    .then((res) =>{ 
        console.log(res.connections)
        console.log('DB connection successful!')
    });


const port =process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Server Started on port  ${port}`)
});