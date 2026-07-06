const express=require('express');
const mongoose=require('mongoose');
const cors = require('cors');


const ticketRoutes= require('./Routes/ticketRoutes');

const app=express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/ticketData')
.then(()=>console.log("Database / MongoDB connected"))
.catch(err=>console.log(err));

app.use('/api/tickets',ticketRoutes);

const PORT=5000;
app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));