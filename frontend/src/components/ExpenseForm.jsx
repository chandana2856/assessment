import { useState } from "react";
import { createExpense, generateKey } from "../api";

export default function ExpenseForm({ onSuccess }) {
  const [form, setForm] = useState({
    amount: "",
    category: "",
    description: "",
    date: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    if (!form.amount || !form.category || !form.date) {
      return "Amount, category, and date are required";
    }

    if (parseFloat(form.amount) <= 0) {
      return "Amount must be greater than 0";
    }

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return; // 🚫 prevent double click

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setLoading(true);

    const key = generateKey(); // 🔑 unique request key

    try {
      await createExpense(
        {
          amount: parseFloat(form.amount),
          category: form.category,
          description: form.description,
          date: form.date,
        },
        key
      );

      // ✅ Reset form
      setForm({
        amount: "",
        category: "",
        description: "",
        date: "",
      });

      // 🔄 Refresh list
      if (onSuccess) onSuccess();

    } catch (err) {
      console.error(err);
      setError("Failed to add expense. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <h2>Add Expense</h2>

      {error && (
        <p style={{ color: "red", marginBottom: "10px" }}>
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          step="0.01"
        />

        <br /><br />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Expense"}
        </button>
      </form>
    </div>
  );
}