# Stripe Backend API

A simple Node.js + Express backend to handle Stripe endpoints for mobile app.

---

## 🚀 Features

- Dynamically create **Stripe customers**
- Generate **ephemeral keys** for secure, temporary customer access
- Create `PaymentIntents` with dynamic amounts and currencies
- Designed for integration with your Expo (React Native) app

---

## 📁 Project Structure

```
stripe-backend/
├── index.js # Express server entry point
├── package.json # Project dependencies and scripts
├── .env # Environment variables
└── ...
```

---

## ⚙️ Getting Started

1️⃣ **Install dependencies:**

```bash
npm install
```

2️⃣ Create a .env file with your Stripe secret key:

```
STRIPE_SECRET_KEY=sk_test_51YourKeyHere
```

✅ Important: Use your test secret key for development.

3️⃣ Run the server:

```bash
node index.js
```

✅ Or for automatic reloads during development:

```bash
npx nodemon index.js
```

The server will run at http://localhost:3000.

---

## 🔗 API Endpoint

### POST /payment

Creates a Stripe `PaymentIntent` and ephemeral key.
Request:

```json
{
  "amount": 1699,
  "currency": "usd"
}
```

✅ `amount` should be an integer in the smallest currency unit (e.g., 1699 cents = $16.99).
✅ `currency` must be a valid currency code (like "`usd`").

**Example:**

```bash
curl -X POST http://localhost:3000/payment \
  -H "Content-Type: application/json" \
  -d '{"amount": 1699, "currency": "usd"}'
```

**Response:**

```json
{
  "paymentIntent": "<client_secret>",
  "ephemeralKey": "<ephemeral_key_secret>",
  "customer": "<customer_id>"
}
```

---

## ⚠️ Common Issues

- If testing on a real device, replace `localhost` with your computer’s local IP (e.g., `192.168.x.x`).

- Make sure your React Native/Expo app sends the amount in the smallest currency unit (`amount * 100`).

- Stripe secret key must never be used in the frontend — only your publishable key (`pktest...`) goes in the app.

---

## 🛡️ Security Notes

- Your Stripe secret key (`sktest...`) must stay private in the backend.
- All sensitive operations like creating `PaymentIntent`s and ephemeral keys happen here for security.

---

## 🌟 Deployment

You can deploy this backend to any Node.js-compatible platform:

- Railway
- Render
- AWS, GCP, etc.

---

## 🤝 License

MIT License – for personal learning and experimentation.
