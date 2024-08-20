import {useState,ChangeEvent, FormEvent} from "react";
import "../Styling/ShowForm.css"
import "../Styling/ShowTickets.css"
import { editTicket, EditTicketResult } from '../Services/TicketService';
import { TicketFromDataUpdate } from '../Types/Ticket';

function TicketEdit(){
    const [formData, setFormData] = useState<TicketFromDataUpdate>({
        id: undefined,
        priorityId: undefined,
        topicId: undefined,
        slaId: undefined,
        deptId: undefined,
        staffId: undefined,
        teamId: undefined,
        statusId: undefined,
        message: '',
        reply: '',
        note: ''
    });
    const [responseMessage, setResponseMessage] = useState<string>('');
    const [isError, setIsError] = useState<boolean>(false); 

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>):void => {
        const { name, value } = e.target; 
        setFormData({
            ...formData,
            [name]: name.includes('Id') ? (isNaN(parseInt(value)) ? '' : parseInt(value)) : value,
        });
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        // Remover campos com valores 'undefined' ou strings vazias
        const dataToSend: TicketFromDataUpdate = Object.fromEntries(
            Object.entries(formData).filter(([_, value]) => value !== undefined && value !== '')
        ) as TicketFromDataUpdate;

        try {
            const result: EditTicketResult = await editTicket(dataToSend);
            if (result.success) {
                setResponseMessage(result.message);
                setIsError(false);
            } else {
                setResponseMessage(result.message);
                setIsError(true);
            }
        } catch (error) {
            setResponseMessage('An unexpected error occurred.');
            setIsError(true);
        }
    }

    return(
        <div>
            <br />
            <h3>Update a Ticket</h3>
            <p>Update a ticket information from the system.</p>
            <form onSubmit={handleSubmit} className="ticket-form" >
                <div className="form-group">
                    <label htmlFor="id"> ID <span style={{ color: 'red', fontStyle: 'italic' }}>* </span> </label>
                    <input 
                        type="number" 
                        id="id" 
                        name="id" 
                        value={formData.id} 
                        onChange={handleChange} 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="priorityId">Priority ID </label>
                    <input 
                        type="number" 
                        id="priorityId" 
                        name="priorityId" 
                        value={formData.priorityId} 
                        onChange={handleChange} 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="topicId">Topic ID </label>
                    <input 
                        type="number" 
                        id="topicId" 
                        name="topicId" 
                        value={formData.topicId} 
                        onChange={handleChange} 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="slaId">SLA ID </label>
                    <input 
                        type="number" 
                        id="slaId" 
                        name="slaId" 
                        value={formData.slaId} 
                        onChange={handleChange} 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="deptId">Department ID </label>
                    <input 
                        type="number" 
                        id="deptId" 
                        name="deptId" 
                        value={formData.deptId} 
                        onChange={handleChange} 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="staffId">Staff ID </label>
                    <input 
                        type="number" 
                        id="staffId" 
                        name="staffId" 
                        value={formData.staffId} 
                        onChange={handleChange} 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="teamId">Team ID </label>
                    <input 
                        type="number" 
                        id="teamId" 
                        name="teamId" 
                        value={formData.teamId} 
                        onChange={handleChange} 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="statusId">Status ID </label>
                    <input 
                        type="number" 
                        id="statusId" 
                        name="statusId" 
                        value={formData.statusId} 
                        onChange={handleChange} 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="message">Message </label>
                    <textarea 
                        id="message" 
                        name="message" 
                        value={formData.message} 
                        onChange={handleChange} 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="reply">Reply </label>
                    <textarea 
                        id="reply" 
                        name="reply" 
                        value={formData.reply} 
                        onChange={handleChange} 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="note">Note </label>
                    <textarea 
                        id="note" 
                        name="note" 
                        value={formData.note} 
                        onChange={handleChange} 
                    />
                </div>
                <button type="submit">Edit Ticket</button>
            </form>
            {responseMessage && (
            <div className={`response-message ${isError ? 'error' : 'success'}`}>
                <p>{responseMessage}</p>
            </div>
            )}
        </div>
    );
}

export default TicketEdit;