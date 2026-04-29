# 💰 Expense Tracker (Full Stack)

A minimal full-stack Expense Tracker built with a focus on **correctness under real-world conditions** such as retries, duplicate submissions, and unreliable networks.

---

## 🚀 Live Demo

* Frontend:https://assessment-one-phi.vercel.app/
* Backend API: https://assessment-production-eb5a.up.railway.app/

---

## 🧠 Problem Statement

Users should be able to:

* Add expenses
* View expenses
* Filter by category
* Sort by date
* See total expenses

The system must behave correctly under:

* Multiple clicks
* Network retries
* Page refreshes

---

## 🛠️ Tech Stack

### Backend

* Django
* Django REST Framework (DRF)
* SQLite (can be replaced with PostgreSQL)

### Frontend

* React (Vite)
* Axios

---

## ✨ Features

* ✅ Create expense (amount, category, description, date)
* ✅ View expense list
* ✅ Filter by category
* ✅ Sort by date (newest first)
* ✅ Total calculation (backend-driven)
* ✅ Idempotent POST API (prevents duplicate entries)
* ✅ Loading + error handling in UI

---

## 🔥 Key Design Decisions

### 1. Idempotent API (Critical)

* Used `Idempotency-Key` header
* Prevents duplicate entries on retries or double clicks
* If same key is received → existing record is returned

---

### 2. Accurate Money Handling

* Used `DecimalField` instead of float
* Avoids rounding errors (important for financial data)

---

### 3. Backend Aggregation

* Total is calculated on backend
* Ensures consistency regardless of frontend logic

---

### 4. Frontend Protection

* Disabled button during submission
* Prevents multiple API calls from UI

---

## 📡 API Endpoints

### ➤ Create Expense

POST `/expenses`

**Headers:**

```
Idempotency-Key: unique-key
```

**Body:**

```json
{
  "amount": 250.00,
  "category": "Food",
  "description": "Lunch",
  "date": "2026-04-29"
}
```

---

### ➤ Get Expenses

GET `/expenses`

**Query Params:**

* `category=Food` → filter
* `sort=date_desc` → newest first

**Response:**

```json
{
  "total": 500.00,
  "count": 2,
  "results": [...]
}
```

---

## ⚙️ Setup Instructions

### 🔹 Backend Setup

```bash
git clone <repo-url>
cd expense_tracker

python -m venv venv
venv\Scripts\activate   # Windows

pip install -r requirements.txt

python manage.py migrate
python manage.py runserver
```

---

### 🔹 Frontend Setup

```bash
cd expense-frontend

npm install
npm run dev
```

---

## 🌐 CORS Configuration

Used `django-cors-headers` to allow frontend communication:

```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
]
```

---

## 🧪 Testing Scenarios

* ✅ Duplicate POST requests return same record
* ✅ Multiple clicks do not create duplicates
* ✅ Filtering works correctly
* ✅ Sorting works correctly
* ✅ Total reflects filtered results

---

## ⚖️ Trade-offs

* UI kept minimal (focused on correctness)
* No authentication system
* No pagination implemented

---

## 🔮 Future Improvements

* Add authentication (JWT)
* Add pagination
* Add category analytics dashboard
* Improve UI/UX design
* Add caching for performance

---


