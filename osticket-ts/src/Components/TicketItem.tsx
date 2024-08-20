import React from "react";
import "../Styling/ShowTickets.css"
import { TicketG } from '../Types/Ticket';

interface TicketItemProps{
    ticket: TicketG;
}

const TicketItem: React.FC<TicketItemProps> = ({ticket}) =>{
    return(
        <div className="ticket-item">
            <p><strong>ID: </strong>{ticket.id}</p>
            <p><strong>Number:</strong> {ticket.number}</p>
            <p><strong>Subject:</strong> {ticket.subject}</p>
        </div>
    );
};

export default TicketItem 