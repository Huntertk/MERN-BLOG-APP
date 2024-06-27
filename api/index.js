import express from 'express';

//Express App initialization
const app = express();



//server listining
app.listen(3000,() => {
    console.log(`Server is running on port 3000`);
})