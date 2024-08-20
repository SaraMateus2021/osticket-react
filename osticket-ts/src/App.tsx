import './App.css'
import TicketGet from './Components/TicketGet'
import TicketPost from './Components/TicketPost'
import TicketDelete from './Components/TicketDelete'
import TicketEdit from './Components/TicketEdit'

function App() {

  return (
    <div className="App">
      <h1>Ticket Management System</h1>
      <div className="container">
        <TicketGet/>
        <TicketPost />
        <TicketDelete />
        <TicketEdit />
      </div>
    </div>
  )
}

export default App
