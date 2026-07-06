const mongoose=require('mongoose');

const ticketSchema= new mongoose.Schema({
  title: { type:String, required:true },
  description: { type:String },
  priority: { type:String, required:true, enum:['Low','Medium','High'], default:'Low' },
  createdBy: { type:String, required:true },
  status: { type:String, required:true, enum:['Open','In Progress','Resolved'], default:'Open' }
}, {
  timestamps: true
});

module.exports=mongoose.model('Ticket',ticketSchema);