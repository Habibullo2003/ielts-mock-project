# IELTS Mock Project

IELTS tayyorlanayotganlar uchun mo‘ljallangan **mock test platforma**.  
Foydalanuvchilar interaktiv testlarni yechishi, natijalarni ko‘rishi va o‘z natijalarini tahlil qilishi mumkin.  

---

## 📂 Loyiha tuzilishi

ielts-mock-project/
│
├─ backend/ # Django + Django REST Framework backend
│ ├─ manage.py
│ ├─ app/ # Asosiy Django app
│ ├─ requirements.txt
│ ├─ .env # maxfiy, git ignore qilingan
│
├─ frontend/ # React + Vite frontend
│ ├─ package.json
│ ├─ src/
│ ├─ public/
│
├─ .gitignore
└─ README.md


---

## ⚙️ Talablar

- Python 3.10+  
- Node.js 18+  
- PostgreSQL 14+  
- npm yoki yarn  

---

## 🛠️ O‘rnatish

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate   # Linux / Mac
venv\Scripts\activate      # Windows
pip install -r requirements.txt

Migratsiyalarni qo‘llash:
python manage.py migrate
python manage.py runserver

Frontend:
cd frontend
npm install
npm run dev
Frontend default: http://localhost:5173


📝 API Endpointlar
Questions API Endpoint 
Base URL: http://127.0.0.1:8000/api/questions/
| Method | Endpoint             | Description              | Auth                         |
| ------ | -------------------- | ------------------------ | ---------------------------- |
| GET    | /api/questions/      | Barcha savollar ro‘yxati | ✅                           |
| POST   | /api/questions/      | Yangi savol yaratish     | ✅                           |
| GET    | /api/questions/<id>/ | Bitta savol tafsiloti    | ✅                           |
| PUT    | /api/questions/<id>/ | Savolni yangilash        | ✅                           |
| DELETE | /api/questions/<id>/ | Savolni o‘chirish        | ✅                           |


GET request
GET http://127.0.0.1:8000/api/questions/
Response:
[
  {
    "id": 1,
    "text": "Which word is the synonym of 'happy'?",
    "option_a": "Sad",
    "option_b": "Joyful",
    "option_c": "Angry",
    "option_d": "Tired",
    "correct_option": "B"
  },
  {
    "id": 2,
    "text": "Choose the correct past tense of 'go'.",
    "option_a": "Went",
    "option_b": "Goed",
    "option_c": "Gone",
    "option_d": "Going",
    "correct_option": "A"
  }
]

POST request
POST http://127.0.0.1:8000/api/questions/
Authorization: Token <user_token>
Content-Type: application/json

{
  "text": "What is the capital of France?",
  "option_a": "London",
  "option_b": "Berlin",
  "option_c": "Paris",
  "option_d": "Madrid",
  "correct_option": "C"
}

Response:
{
  "id": 3,
  "text": "What is the capital of France?",
  "option_a": "London",
  "option_b": "Berlin",
  "option_c": "Paris",
  "option_d": "Madrid",
  "correct_option": "C"
}

GET / PUT / DELETE individual question
GET one question:
GET http://127.0.0.1:8000/api/questions/3/

PUT example (update):
PUT http://127.0.0.1:8000/api/questions/3/
Content-Type: application/json

{
  "text": "What is the capital of France?",
  "option_a": "London",
  "option_b": "Berlin",
  "option_c": "Paris",
  "option_d": "Rome",
  "correct_option": "C"
}

DELETE example:
DELETE http://127.0.0.1:8000/api/questions/3/



