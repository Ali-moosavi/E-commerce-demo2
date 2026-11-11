**English** | [فارسی](./README.fa.md)

# 🛒 E-Commerce Demo

A modern online store inspired by Digikala, built with Next.js and PostgreSQL. It has a Persian (RTL) interface with multi-level categories, product filtering, detailed product pages, authentication and a shopping cart.

🔗 **Live demo:** [ali-mousavi-demoprj.vercel.app](https://ali-mousavi-demoprj.vercel.app)

## ✨ Features

- Responsive homepage with a hero slider, quick links and a top products carousel
- Multi-level categories (parent and child)
- Product filtering by properties and options of each category
- Product page with gallery, feature highlights, specifications, introduction and expert review
- User registration and login with Better Auth
- Per-user shopping cart with quantity management
- Form validation with React Hook Form and Zod
- Full RTL layout with Persian numerals
- Mobile-friendly design

## 🛠️ Tech Stack

| Area | Tools |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS 4, Material UI, shadcn/ui, Lucide |
| Database | PostgreSQL, Prisma 7 (with the `pg` adapter) |
| Auth | Better Auth |
| State | Redux Toolkit |
| Forms | React Hook Form, Zod |
| Slider | Swiper |
| Deployment | Vercel |

## 🗄️ Database Models

- **Auth:** `User`, `Session`, `Account`, `Verification`
- **Catalog:** `categories`, `grandChildProduct`, `pageDetails`, `featureHighlights`, `specifications`
- **Filters:** `properties`, `propertiesOption`, `productsproperty`
- **Cart:** `cart`, `cartItem`

## 📁 Project Structure

```
├── src/
│   ├── app/                 # Routes, pages and API handlers
│   ├── components/          # UI components
│   ├── lib/                 # Prisma, auth and data helpers
│   └── generated/prisma/    # Generated Prisma client
├── prisma/                  # Database schema
└── public/                  # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20.9 or higher
- A PostgreSQL database

### 1. Clone and install

```bash
git clone https://github.com/Ali-moosavi/E-commerce-demo2.git
cd E-commerce-demo2
npm install
```

The Prisma client is generated automatically after install.

### 2. Set up environment variables

Create a `.env` file in the root:

```env
DATABASE_URL="postgresql://user:password@host:5432/dbname?sslmode=verify-full"
DIRECT_URL="postgresql://user:password@host:5432/dbname?sslmode=verify-full"
BETTER_AUTH_SECRET="your-secret"
BETTER_AUTH_URL="http://localhost:3000"
```

### 3. Set up the database

```bash
npx prisma migrate dev
```

### 4. Run the project

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🗺️ Roadmap

- [ ] Real reviews and questions
- [ ] Real seller data
- [ ] Checkout and orders
- [ ] Order history
- [ ] Search

## 👤 Author

**Ali Mousavi**
- LinkedIn: [ali-mousavi](https://www.linkedin.com/in/ali-mousavi-52116342a/)
- Email: alimousavi3026@gmail.com