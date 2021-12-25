import express from 'express';
import mongoose from 'mongoose';

import Memory from '../db/memoryModel.js'

const router = express.Router();


// get all memories from db

router.get('/', async (req, res) => {
    try {
        const memories = await Memory.find()
        res.status(200).json(memories)

        
    } catch (error) {
        res.status(404).json({message: error.message})
    }
})

// get single  memory from db  
router.get('/:id', async (req, res) => {
    try {
            const { id } = req.params

        if(!mongoose.Types.ObjectId.isValid(id)) 
            res.status(404).json({message: 'no memory found'})
        
        const memory = await Memory.findById(id)


        if(!memory) return

        res.status(200).json(memory)
    } catch (error) {
        res.status(404).json({message: 'no memory'})
        
    }
})

// create memory
router.post('/:id', async (req, res) =>{
    try {
        const memory = req.body


        const createdMemory = await Memory.create(memory)
        res.status(201).json(createdMemory)
    } catch (error) {
        res.status(404).json({message:'cannott created'})
        
    }
})

//update memory
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) 
        res.status(404).json({message: 'no memory found'})
    
        const { title, content, creator, image } = req.body

        const updatedMemory = await Memory.findByIdAndUpdate(id, {title, content, creator, image, _id: id}, {new: true})

        res.status(200).json(updatedMemory)

} catch (error) {
    res.status(404).json({message: 'error'})
    
}
})


router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) 
        res.status(404).json({message: 'no memory found'})
    
    await Memory.findByIdAndDelete(id)

        

        res.status(200).json({message: 'memory has been deleted'})

} catch (error) {
    res.status(404).json({message: 'error'})
    
}
})

export default router