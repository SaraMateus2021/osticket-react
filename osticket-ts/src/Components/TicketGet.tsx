import {useState } from 'react';
import { fetchTickets } from '../Services/TicketService';
import { TicketG } from '../Types/Ticket';
import "../Styling/ShowTickets.css"
import TicketItem from "./TicketItem.tsx"


function TicketGet (){
    const [tickets, setTickets] = useState<TicketG[]>([]);
    const [showTickets, setShowTickets] = useState(false);

    // Função para buscar todos os tickets
    const handleFetchTickets = async () => {
        try {
            const ticketsData: TicketG[] = await fetchTickets();
            setTickets(ticketsData);
            setShowTickets(true);
        } catch (error) {
            console.error('Error fetching tickets', error);
        }
    }

    return (
        <div>
            <br />
            <h2>Ticket</h2>
            <hr />
            <div className='"all-tickets"'>
                <h3>Get tickets </h3>
                <p>Get all tickets in the system.</p>
               <button onClick={handleFetchTickets}>Show Tickets</button>
            </div>

            {showTickets && (
                <div className='ticket-list'>
                    {tickets.length === 0 ? (
                        <p>No tickets available to show.</p>
                    ) : (
                        tickets.map((ticket) => (
                            <TicketItem key={ticket.id} ticket={ticket} />
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

export default TicketGet;