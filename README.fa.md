<div dir="rtl">

[English](./README.md) | **فارسی**

# 🛒 دمو فروشگاه اینترنتی

یک فروشگاه اینترنتی مدرن با الهام از دیجی‌کالا، ساخته‌شده با Next.js و PostgreSQL. رابط کاربری فارسی (راست‌به‌چپ) دارد و شامل دسته‌بندی چندسطحی، فیلتر محصولات، صفحه محصول کامل، احراز هویت و سبد خرید است.

🔗 **دمو زنده:** [ali-mousavi-demoprj.vercel.app](https://ali-mousavi-demoprj.vercel.app)

## ✨ امکانات

- صفحه اصلی ریسپانسیو با اسلایدر، لینک‌های سریع و کاروسل پرفروش‌ترین‌ها
- دسته‌بندی چندسطحی (دسته والد و زیردسته)
- فیلتر محصولات بر اساس ویژگی‌ها و گزینه‌های هر دسته
- صفحه محصول شامل گالری تصاویر، ویژگی‌های برجسته، مشخصات فنی، معرفی و بررسی تخصصی
- ثبت‌نام و ورود کاربران با Better Auth
- سبد خرید مخصوص هر کاربر با مدیریت تعداد (افزودن و کاهش)
- اعتبارسنجی فرم‌ها با React Hook Form و Zod
- چیدمان کامل راست‌به‌چپ با اعداد فارسی
- طراحی مناسب موبایل

## 🛠️ تکنولوژی‌ها

| بخش          | ابزارها                                        |
| ------------ | ---------------------------------------------- |
| فریم‌ورک     | Next.js 16 (App Router)، React 19، TypeScript  |
| استایل       | Tailwind CSS 4، Material UI، shadcn/ui، Lucide |
| دیتابیس      | PostgreSQL، Prisma 7 (با آداپتر `pg`)          |
| احراز هویت   | Better Auth                                    |
| مدیریت state | Redux Toolkit                                  |
| فرم‌ها       | React Hook Form، Zod                           |
| اسلایدر      | Swiper                                         |
| استقرار      | Vercel                                         |

## 🗄️ ساختار دیتابیس

- **احراز هویت:** `User`، `Session`، `Account`، `Verification`
- **کاتالوگ:** `categories`، `grandChildProduct`، `pageDetails`، `featureHighlights`، `specifications`
- **فیلترها:** `properties`، `propertiesOption`، `productsproperty`
- **سبد خرید:** `cart`، `cartItem`

## 📁 ساختار پروژه

```
├── src/
│   ├── app/                 # مسیرها، صفحات و API
│   ├── components/          # کامپوننت‌ها
│   ├── lib/                 # Prisma، احراز هویت و توابع داده
│   └── generated/prisma/    # کلاینت Prisma (تولیدشده)
├── prisma/                  # اسکیمای دیتابیس
└── public/                  # فایل‌های استاتیک
```

## 🚀 راه‌اندازی

### پیش‌نیازها

- Node.js نسخه ۲۰.۹ یا بالاتر
- یک دیتابیس PostgreSQL

### ۱. کلون و نصب

```bash
git clone https://github.com/Ali-moosavi/E-commerce-demo2.git
cd E-commerce-demo2
npm install
```

کلاینت Prisma بعد از نصب به‌صورت خودکار ساخته می‌شود.

### ۲. تنظیم متغیرهای محیطی

یک فایل `.env` در ریشه پروژه بسازید:

```env
DATABASE_URL="postgresql://user:password@host:5432/dbname?sslmode=verify-full"
DIRECT_URL="postgresql://user:password@host:5432/dbname?sslmode=verify-full"
BETTER_AUTH_SECRET="your-secret"
BETTER_AUTH_URL="http://localhost:3000"
```

### ۳. آماده‌سازی دیتابیس

```bash
npx prisma migrate dev
```

### ۴. اجرای پروژه

```bash
npm run dev
```

سپس [http://localhost:3000](http://localhost:3000) را باز کنید.

## 📦 بیلد برای محیط پروداکشن

```bash
npm run build
npm start
```

## 🗺️ برنامه‌های آینده

- [ ] ثبت و نمایش واقعی دیدگاه‌ها و پرسش‌ها
- [ ] اطلاعات واقعی فروشنده
- [ ] پرداخت و ثبت سفارش
- [ ] تاریخچه سفارش‌ها
- [ ] جستجو

## 👤 سازنده

**علی موسوی**

- لینکدین: [ali-mousavi](https://www.linkedin.com/in/ali-mousavi-52116342a/)
- ایمیل: alimousavi3026@gmail.com

</div>
