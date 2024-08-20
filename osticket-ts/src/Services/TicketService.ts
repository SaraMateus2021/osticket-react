import { TicketG } from "../Types/Ticket";
import { TicketFormData } from "../Types/Ticket";
import { TicketFromDataUpdate } from "../Types/Ticket";

const API_URL = '/api/tickets.json';
const API_KEY = 'B8EEE87AA9B79D9233D9C4BAECB851A6'; 

/**
 * Função para buscar todos os tickets.
 * @returns {Promise<TicketG[]>} A resposta da API com os tickets.
 */

export const fetchTickets = async (): Promise<TicketG[]> =>{
    try {
        const response = await fetch(API_URL, {
            headers: {
              'X-API-Key': API_KEY
            }
          });

          if (!response.ok) {
            throw new Error('Failed to fetch tickets');
        }

        console.log(response)
        const data = await response.json();
        console.log(data)
        console.log(data.tickets)
        return data.tickets;

    } catch (error) {
        console.error('Error fetching tickets', error);
        return [];
    }
}

export interface CreateTicketResponse {
    success: boolean;
    number?: string;
    message?: string;
}

export const createTicket = async (ticketData: TicketFormData): Promise<CreateTicketResponse> => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': API_KEY,
            },
            body: JSON.stringify(ticketData),
        });

        if (response.status === 201) {
            let data: string;
            data = await response.text();
            return { success: true, number: data };
          } else {
              let errorData: string =  await response.text();
              if (errorData.includes('No errors')) errorData = 'Missing parameters.'
              return { success: false, message: errorData };
          }

    } catch (error) {
        console.error('Error creating ticket', error);
        return { success: false, message: 'Failed to create ticket' };
    }
}

interface DeleteTicketResponse {
    success: boolean;
    message: string;
}

export const deleteTicket = async (ticketId: string): Promise<DeleteTicketResponse> => {
        try {
            const response = await fetch(`${API_URL}?id=${ticketId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Key': API_KEY,
                },
            });
            if (response.status === 204) {
                return { success: true, message: 'Ticket deleted successfully!' };
            } else {
                const errorData = await response.text();
                return { success: false, message: errorData };
            }
        } catch (error) {
            console.error('Error deleting ticket', error);
            return { success: false, message: 'Failed to delete ticket' };
        }
}

export interface EditTicketResult {
    success: boolean;
    message: string;
}

export const editTicket = async (ticketData: TicketFromDataUpdate): Promise<EditTicketResult> => {
    try {
        const response = await fetch(API_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': API_KEY,
            },
            body: JSON.stringify(ticketData),
        });

        if (response.status === 204) {
            return { success: true, message: 'Ticket updated successfully!' };
          } else {
            let errorData = await response.text();
            if (errorData.includes('No errors')) errorData = 'Missing parameters.'
            return { success: false, message: errorData };
          }

    } catch (error) {
        console.error('Error updating ticket', error);
        return { success: false, message: 'Failed to update ticket.' };
    }
}