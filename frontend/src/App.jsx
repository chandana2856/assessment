import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import { useRef } from "react";

import { useState } from "react";

function App() {
  const [refresh, setRefresh] = useState(0);

  return (
    <div style={{
      maxWidth: "600px",
      margin: "40px auto",
      fontFamily: "Arial"
    }}>
      <h1 style={{ textAlign: "center" }}>💰 Expense Tracker</h1>

      <ExpenseForm onSuccess={() => setRefresh(r => r + 1)} />
      <ExpenseList refresh={refresh} />
    </div>
  );
}
export default App;
