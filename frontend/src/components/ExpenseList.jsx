import { useEffect, useState } from "react";
import { getExpenses } from "../api";

export default function ExpenseList({ refresh }) {
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(0);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const res = await getExpenses({
        category: category || undefined, // ✅ safe
        sort: "date_desc",
      });

      setExpenses(res.data.results);
      setTotal(res.data.total);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ FIXED: stable dependency array
  useEffect(() => {
    fetchExpenses();
  }, [category, refresh]); // ALWAYS same structure

  return (
    <div>
      <h2>Total: ₹{total}</h2>

      <input
        placeholder="Filter category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {expenses.map((e) => (
            <li key={e.id} style={{
  border: "1px solid #ddd",
  padding: "10px",
  marginBottom: "8px",
  borderRadius: "6px"
}}>
  <strong>₹{e.amount}</strong> | {e.category} <br />
  <small>{e.description}</small> <br />
  <small>{e.date}</small>
</li>
          ))}
        </ul>
      )}
    </div>
  );
}