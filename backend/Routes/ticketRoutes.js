const express=require('express');
const Ticket=require('../models/Tickets');
const router=express.Router();

router.post('/',async(req,res)=>{
    try{
        const ticket=new Ticket(req.body);
        await ticket.save();
        res.status(201).json(ticket);
    }catch(err){
        res.status(400).json({error:err.message});
    }
});

// Get All Tickets
router.get('/',async(req,res)=>{
    try {
        const tickets=await Ticket.find().sort({ createdAt: -1 });
        res.json(tickets);
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});

// Update ticket status
router.patch('/:id/status', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Open','In Progress','Resolved'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status value' });
    }

    try {
        const ticket = await Ticket.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );
        if (!ticket) return res.status(404).json({ error: 'Ticket not found' });
        res.json(ticket);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete ticket
router.delete('/:id', async (req, res) => {
    try {
        const ticket = await Ticket.findByIdAndDelete(req.params.id);
        if (!ticket) return res.status(404).json({ error: 'Ticket not found' });
        res.json({ message: 'Ticket deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports=router