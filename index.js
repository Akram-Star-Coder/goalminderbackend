const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose  =require('mongoose');
const tasksRoutes = require('./Routes/tasksRoutes');
const goalsRoutes = require("./Routes/goalsRoutes");
const thoughtsRoutes = require('./Routes/thoughtsRoutes');
const goals = require('./Models/goals');
const tasks = require("./Models/tasks");


const url = "mongodb+srv://goalminder:goalminder@cluster0.gsusedi.mongodb.net/goalminder?retryWrites=true&w=majority";


dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());


app.listen(3001, ()=>{
    console.log('Connected to Server 3001');
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('Connected to Database GoalMinder');
    })
    .catch(err => {
      console.error('Error connecting Database:', err);
    });
});


app.use('/api/tasks', tasksRoutes);
app.use('/api/goals', goalsRoutes);
app.use('/api/thoughts', thoughtsRoutes);
app.get('/api/allInfos', async(req, res)=>{
  try{

    const numberOfTasksDone = await tasks.find({
      isCheck : true
    });
    const numberOfGoalsDone = await goals.find({
      isCheck : true
    });

    if(numberOfGoalsDone && numberOfTasksDone){
      res.status(200).send({
        numberOfGoalsDone : numberOfGoalsDone.length, 
        numberOfTasksDone : numberOfTasksDone.length 
      });
    }
    else{
      res.status(201).send('Error');
    }

  }
  catch(e){
    console.log(e.message);
    res.status(500).send(e.message);
  }
})
