const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static('views'));


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const uploadPath = 'public/uploads';
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: function(req, file, cb) {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb) {
        const fileTypes = /jpeg|jpg|png|gif/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb('Error: Hanya gambar yang diizinkan!');
        }
    }
});


function readProducts() {
    try {
        if (!fs.existsSync('products.json')) {
            fs.writeFileSync('products.json', JSON.stringify({ products: [] }));
            return { products: [] };
        }
        return JSON.parse(fs.readFileSync('products.json', 'utf8'));
    } catch (error) {
        console.error('Error reading products:', error);
        return { products: [] };
    }
}

function saveProducts(products) {
    try {
        fs.writeFileSync('products.json', JSON.stringify(products, null, 2));
        return true;
    } catch (error) {
        console.error('Error saving products:', error);
        return false;
    }
}


app.get('/api/products', (req, res) => {
    try {
        const products = readProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Gagal mengambil data produk' });
    }
});

app.post('/api/products', upload.single('image'), (req, res) => {
    try {
        if (!req.body.name || !req.file) {
            return res.status(400).json({ error: 'Data produk tidak lengkap' });
        }

        const products = readProducts();
        const newProduct = {
            id: Date.now(),
            name: req.body.name,
            price: parseInt(req.body.price),
            description: req.body.description,
            image: `/uploads/${req.file.filename}`,
            whatsapp: req.body.whatsapp,
            createdAt: new Date().toISOString()
        };

        products.products.push(newProduct);

        if (saveProducts(products)) {
            res.status(201).json(newProduct);
        } else {
            res.status(500).json({ error: 'Gagal menyimpan produk' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Gagal menambah produk' });
    }
});

app.delete('/api/products/:id', (req, res) => {
    try {
        const products = readProducts();
        const productId = parseInt(req.params.id);
        products.products = products.products.filter(p => p.id !== productId);
        
        if (saveProducts(products)) {
            res.json({ message: 'Produk berhasil dihapus' });
        } else {
            res.status(500).json({ error: 'Gagal menghapus produk' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Gagal menghapus produk' });
    }
});


app.get('/admin/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/admin/login.html'));
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/pages/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});