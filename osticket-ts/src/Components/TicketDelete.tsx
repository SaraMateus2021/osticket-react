import { useState, ChangeEvent } from 'react';
import "../Styling/ShowTickets.css"
import "../Styling/GetId.css"
import { deleteTicket } from '../Services/TicketService';

function TicketDelete (){
    const [ticketNumber, setTicketNumber] = useState<string>('');
    const [responseMessage, setResponseMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTicketNumber( e.target.value);
    };

    const handleDelete = async (): Promise<void>  => {

        try {
            const result = await deleteTicket(ticketNumber);
            if(result.success){
                setResponseMessage(result.message);
                setIsError(!result.success); 
            }else{
                setResponseMessage(result.message);
                setIsError(true);
            }
        } catch (error) {
            setResponseMessage('An unexpected error occurred! Failed to delete ticket');
            setIsError(true);
        }
    };

    return(
        <div>
            <br />
            <h3>Delete a ticket </h3>
            <p>Delete a ticket and eliminate it from the system.</p>
            <input
                    type="number"
                    placeholder="Enter ticket number"
                    value={ticketNumber}
                    onChange={handleChange}
                    className='getId-ticket'
            />
            <button onClick={handleDelete}>Delete Ticket</button>
            {responseMessage && (
            <div className={`response-message ${isError ? 'error' : 'success'}`}>
                <p>{responseMessage}</p>
            </div>
            )}
        </div>
    );
}

export default TicketDelete;