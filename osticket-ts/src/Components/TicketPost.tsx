import { useState, ChangeEvent, FormEvent } from 'react';
import "../Styling/ShowTickets.css"
import { TicketFormData } from '../Types/Ticket';
import "../Styling/ShowForm.css"
import { createTicket } from '../Services/TicketService';

function TicketPost() {
    const [formData, setFormData] = useState<TicketFormData>({
        name: '',
        email: '',
        subject: '',
        message: '',
        priorityId: undefined,
        topicId: undefined,
        slaId: undefined,
        deptId: undefined,
        staffId: undefined,
        teamId: undefined,
        statusId: undefined
    });
    const [responseMessage, setResponseMessage] = useState('');
    const [isError, setIsError] = useState(false); 
    
    const handleChange = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> ):void => {
        const { name, value } = e.target; 
        setFormData({ 
            ...formData,
            [name]: name.includes('Id') ? (isNaN(parseInt(value)) ? '' : parseInt(value)) : value,//Verifica se o nome do campo inclui a substring 'Id'. Isso é usado para identificar campos que devem ser tratados como números (como priorityId, topicId, etc.). Se o nome do campo inclui 'Id', o valor é convertido de uma string para um número inteiro. Isso é necessário porque campos que representam IDs geralmente são números e devem ser armazenados como tal.
        });
    }

    const handleSubmit = async (e:FormEvent<HTMLFormElement> ): Promise<void> => {
        e.preventDefault(); 

        // Prepare the data object, omitting any fields that should not be included
 
        const dataToSend = Object.fromEntries(
            Object.entries(formData).filter(([_, value]) => value !== '' && value !== undefined)
        );
        
        try {
            const result = await createTicket(dataToSend);
            if (result.success) {
                setResponseMessage(`Ticket created successfully! Number: ${result.number}`);
                setIsError(false);
            } else {
                setResponseMessage(result.message ?? 'An error occurred while creating the ticket.');
                setIsError(true);
            }
        } catch (error) {
            setResponseMessage('An unexpected error occurred.');
            setIsError(true);
        }
    }

    return(
        <div className="all-tickets">
             <br />
            <h3>Create a ticket </h3>
            <p>Create a ticket and add it to the system.</p>

            <form onSubmit={handleSubmit} className="ticket-form">
                <div className="form-group">
                    <label htmlFor="name">Name <span style={{ color: 'red', fontStyle: 'italic' }}>* </span></label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            value={formData.name} 
                            onChange={handleChange} 
                        />
                </div>
                <div className="form-group">
                <label htmlFor="email">Email <span style={{ color: 'red', fontStyle: 'italic' }}>* </span> </label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                    />
                </div>
                <div className="form-group">
                <label htmlFor="subject">Subject <span style={{ color: 'red', fontStyle: 'italic' }}>* </span></label>
                    <input 
                        type="text" 
                        id="subject" 
                        name="subject" 
                        value={formData.subject} 
                        onChange={handleChange} 
                    />
                </div>
                <div className="form-group">
                <label htmlFor="message">Message <span style={{ color: 'red', fontStyle: 'italic' }}>* </span></label>
                    <textarea 
                        id="message" 
                        name="message" 
                        value={formData.message} 
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
                <button type="submit">Post Ticket</button>
            </form>

            {responseMessage && (
                <div className={`response-message ${isError ? 'error' : 'success'}`}>
                    <p>{responseMessage}</p>
                </div>
            )}
        </div>
    );
}
export default TicketPost;
