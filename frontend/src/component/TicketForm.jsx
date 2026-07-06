import { useState } from "react";
import axios from 'axios';
import './TicketForm.css';

function TicketForm({ onTicketCreated }){

    const [form, setForm] = useState({
        title: '',
        description: '',
        priority: 'Low',
        createdBy: ''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/tickets', form);
            alert("Ticket Created");
            setForm({ title: '', description: '', priority: 'Low', createdBy: '' });
            if (onTicketCreated) onTicketCreated();
        } catch (error) {
            alert("Error creating ticket");
        }
    }

    return (
        <div className="ticket-form-card">
            <h1 className="ticket-form-title">Create Ticket</h1>
            <form className="ticket-form" onSubmit={handleSubmit}>
                <div className="form-row">
                    <label htmlFor="title">Title</label>
                    <input id="title" type="text" name="title" value={form.title} onChange={handleChange} required />
                </div>
                <div className="form-row">
                    <label htmlFor="description">Description</label>
                    <input id="description" type="text" name="description" value={form.description} onChange={handleChange} />
                </div>
                <div className="form-row">
                    <label htmlFor="priority">Priority</label>
                    <select id="priority" name="priority" value={form.priority} onChange={handleChange}>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>
                <div className="form-row">
                    <label htmlFor="createdBy">Created By</label>
                    <input id="createdBy" type="text" name="createdBy" value={form.createdBy} onChange={handleChange} required />
                </div>
                <button type="submit" className="button button-primary">Create Ticket</button>
            </form>
        </div>
    )
}
export default TicketForm;