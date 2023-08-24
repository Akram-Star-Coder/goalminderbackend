const express = require('express');
const tasks = require('../Models/tasks');
const router = express.Router();


router.get('/getAll', async(req, res) => {
    try{

    const fetchedTasks = await tasks.find({
        isCheck : false
    }).sort({ createdAt: -1 })
        if(fetchedTasks){
            res.status(200).send(fetchedTasks);
        }
        else{
            res.status(202).send("not fetched");
        }

    }
    catch(e){
        res.status(500).send(e.message);
    }
});


router.post('/create', async(req, res)=>{
    try {
        const data = req.body;

        const isCreated = await tasks.create({
            title : data.title, 
            date : new Date(data.date)
        });
        if(isCreated){
            res.status(200).send(isCreated);
        }
        else{
            res.status(201).send(isCreated);
        }
    }   
    catch(e){
        console.log(e.message);
    }
})


router.get('/done/:id', async(req, res)=>{
    try {

        const {id} = req.params;

        const isChecked = await tasks.findByIdAndUpdate(id, {
            isCheck : true
        });
        if(isChecked){
            res.status(200).send(isChecked);
        }
        else{
            res.status(201).send(isChecked);
        }
    }   
    catch(e){
        console.log(e.message);
    }
})

router.delete('/trash/:id', async(req, res)=>{
    try {

        const {id} = req.params;

        const isChecked = await tasks.findByIdAndDelete(id);
        if(isChecked){
            res.status(200).send("Is DELETED");
        }
        else{
            res.status(201).send(isChecked);
        }
    }   
    catch(e){
        console.log(e.message);
    }
})


module.exports = router;