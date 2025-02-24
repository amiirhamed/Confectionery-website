const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

// فعال‌سازی CORS
app.use(cors());

// فعال‌سازی پردازش داده‌های JSON
app.use(express.json());

// لیست محصولات (به صورت نمونه)


const products = [
    { id: 1, name: 'Birthday Cake', price: 200, image: 'images/cake.jpg' },
    { id: 2, name: 'Chocolate Pastry', price: 50, image: 'images/pastry.jpg' },
    { id: 3, name: 'Macarons', price: 150, image: 'images/macarons.jpg' },
    { id: 4, name: "Birthday Cake", price: 200, image: "images/1.jpg" },
    { id: 5, name: "Chocolate Pastry", price: 50, image: "images/2.jpg" },
    { id: 6, name: "Macarons", price: 150, image: "images/3.jpg" },

];
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
let cart = [];
let users = [
    { phone: '09122345678', password: '8965' } // یک کاربر نمونه
];

// روت برای ثبت‌نام
app.post('/api/register', (req, res) => {
    const { phone , password } = req.body;

    // بررسی وجود ایمیل در لیست کاربران
    const userExists = users.some(user => user.phone === phone);
    if (userExists) {
        return res.status(400).json({ message: "کاربر قبلا ثبت نام کرده است" });
    }

    // اضافه کردن کاربر جدید
    users.push({ phone , password });

    res.status(201).json({ message: "کاربر با موفقیت ثبت نام شد" });
});

// روت برای ورود
app.post('/api/login', (req, res) => {
    const { phone, password } = req.body;

    // پیدا کردن کاربر
    const user = users.find(user => user.phone === phone);

    // بررسی وجود کاربر
    if (!user) {
        return res.status(404).json({ message: "نام کاربری یافت نشد" });
    }

    // بررسی رمز عبور
    if (user.password !== password) {
        return res.status(400).json({ message: "رمز اشتباه است" });
    }

    // در صورتی که ورود موفق باشد
    res.json({ message: "کاربر با موفقیت وارد شد", token: 'jwt_token_here' });
});
///////////////////////////////////////////////////////////////////////////////////////////////////
// روت محصولات
app.get('/api/products', (req, res) => {
    res.json(products);
});

// روت برای مشاهده سبد خرید
app.get('/api/cart', (req, res) => {
    res.json(cart);
});

// روت سفارشات
app.post('/api/orders', (req, res) => {
    const { productId, quantity } = req.body;
    if (!productId || !quantity) {
        return res.status(400).json({ message: "Invalid input" });
    }
    const product = products.find(p => p.id === productId);  //  این خط محصولی را که شناسه‌ی آن (productId) با مقدار ارسالی کلاینت مطابقت دارد، از لیست محصولات (products) پیدا می‌کند.
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }
    const total = product.price * quantity;
    cart.push({ productId, productName: product.name, productImage: product.image, quantity, totalPrice: total });
    res.json({ message: `سفارش با موفقیت ثبت شد . قیمت کل :  $${total}` });
});

// حذف سفارش از سبد خرید
app.delete('/api/cart/:productId', (req, res) => {
    const { productId } = req.params;
    const id = parseInt(productId, 10); // مقدار productId که به‌صورت رشته دریافت شده است، به یک عدد صحیح (integer) تبدیل می‌شود. این تبدیل برای تطابق با داده‌های ذخیره‌شده در آرایه cart ضروری است.
    const index = cart.findIndex(item => item.productId === id); // ین تابع بررسی می‌کند که آیا productId در آرایه cart وجود دارد یا خیر.
    if (index === -1) {
        return res.status(404).json({ message: "محصول در سبد خرید وجود ندارد" });
    }
    cart.splice(index, 1);
    res.json({ message: "سفارش با موفقیت از سبد خرید حذف شد" });
});

// شروع سرور
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});



