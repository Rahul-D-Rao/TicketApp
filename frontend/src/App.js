import { useState } from 'react';
import './App.css';
import TicketForm from './component/TicketForm';
import TicketList from './component/TicketList';

function App() {
  const [refreshCount, setRefreshCount] = useState(0);

  const handleTicketCreated = () => {
    setRefreshCount(prev => prev + 1);
  }

  return (
    <>
      <TicketForm onTicketCreated={handleTicketCreated} />
      <TicketList refreshCount={refreshCount} />
    </>
  );
}

export default App;
