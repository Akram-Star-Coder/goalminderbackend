const express = require('express');
const ideas = require('../Models/ideas');
const router = express.Router();


router.get('/getAll', async(req, res) => {
    try{

    const fetchedideas = await ideas.find().sort({ createdAt: -1 })
        if(fetchedideas){
            res.status(200).send(fetchedideas);
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
        const {title} = req.body;

        const isCreated = await ideas.create({
            title : title
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


module.exports = router;