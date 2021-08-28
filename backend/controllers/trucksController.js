const express = require('express');
const router = express.Router();

const {
    getTrucks,
    addTruck,
    getTruckById,
    assignTruck,
    updateTruck,
    deleteTruck
} = require('../services/trucksService');

router.get('/', async (req, res) => {
    try {
        const { userId, role } = req.user;
        
        if(role !== 'DRIVER') throw 'user isn`t driver'
        
        const trucks = await getTrucks(userId);
    
        res.json({trucks});    
    } catch(err) {
        res.status(400).json(err)
    }
});

router.post('/', async (req, res) => {
    try {
        const { userId, role } = req.user;
        
        if(role !== 'DRIVER') throw 'user isn`t driver'

        await addTruck(userId, req.body);
    
        res.json({message: "Success"});    
    } catch(err) {
        res.status(400).json(err)
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        
        if(req.user.role !== 'DRIVER') throw 'user isn`t driver'
        
        const truck = await getTruckById(id);
    
        res.json(truck);    
    } catch(err) {
        res.status(400).json(err)
    }
});

router.post('/:id/assign', async (req, res) => {
    try {
        const { userId, role } = req.user
        const { id } = req.params

        if(role !== 'DRIVER') throw 'user isn`t driver'

        const trucks = await getTrucks(userId)

        for(let truck of trucks) {
            if (truck.assigned_to !== null) throw 'only one truck can be assigned'
        }
        
        await assignTruck(id, userId)
        res.json({message: 'Truck assigned successfully'});    
    } catch(err) {
        res.status(400).json(err)
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { role } = req.user
        const { id } = req.params
        const data = req.body

        if(role !== 'DRIVER') throw 'user isn`t driver'

        const truck = await getTruckById(id)

        if(truck.assigned_to !== null) throw 'truck is already assigned'

        await updateTruck(id, data)
        res.json('truck updated successfully')
    } catch (err) {
        res.status(400).json(err)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params

        if(req.user.role !== 'DRIVER') throw 'user isn`t driver'
        
        const truck = await getTruckById(id);

        if(truck.assigned_to !== null) throw 'truck is already assigned'

        await deleteTruck(id)
        res.json('Truck deleted successfully');    
    } catch(err) {
        res.status(400).json(err)
    }
});


module.exports = {
    trucksRouter: router
}