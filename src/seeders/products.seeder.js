import mongoose from "mongoose";
import { connectDB } from "../config/db.config.js";
import { productModel } from "../models/products.models.js";

const products = [
    {
        name: 'Laptop Lenovo IdeaPad',
        price: 2499.99,
        description: 'Laptop con procesador Intel Core i5, 16GB RAM y 512GB SSD',
        imagen: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b8/Lenovo_IdeaPad_Flex14_laptop.jpg/960px-Lenovo_IdeaPad_Flex14_laptop.jpg'
    },
    {
        name: 'Mouse Logitech MX Master',
        price: 89.99,
        description: 'Mouse inalámbrico ergonómico con sensor de alta precisión',
        imagen: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/90/Logitech_MX_Master_3S_HS01.jpg/960px-Logitech_MX_Master_3S_HS01.jpg'
    },
    {
        name: 'Teclado Mecánico Redragon',
        price: 129.5,
        description: 'Teclado mecánico RGB con switches rojos y reposamuñecas',
        imagen: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1f/Redragon_-_52795210242.jpg/960px-Redragon_-_52795210242.jpg'
    },
    {
        name: 'Monitor Samsung 24',
        price: 549.0,
        description: 'Monitor LED Full HD de 24 pulgadas con panel IPS',
        imagen: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ab/HK_WC_%E7%81%A3%E4%BB%94_Wan_Chai_%E6%9F%AF%E5%B8%83%E9%80%A3%E9%81%93_2_O%27Brien_Street_%E8%BB%92%E5%B0%BC%E8%A9%A9%E9%81%93_Hennessy_Road_%E7%81%A3%E4%BB%94%E9%9B%BB%E8%85%A6%E5%9F%8E_Wan_Chai_Computer_Centre_%E9%87%91%E9%9B%BB%E8%85%A6%E7%94%A8%E5%93%81_Golden_Computer_Accessories_Samsung_brand_monitor_paper_box_June_2021_SS2_01.jpg/960px-thumbnail.jpg'
    },
    {
        name: 'Audífonos Sony WH-1000XM5',
        price: 399.99,
        description: 'Audífonos inalámbricos con cancelación activa de ruido',
        imagen: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bb/Headphones_Sony_super-light.jpg/960px-Headphones_Sony_super-light.jpg'
    },
    {
        name: 'Webcam Logitech C920',
        price: 159.9,
        description: 'Cámara web Full HD 1080p con micrófonos estéreo',
        imagen: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/79/Webcam_%28Logitech_c922%29.jpg/960px-Webcam_%28Logitech_c922%29.jpg'
    },
    {
        name: 'Disco SSD Kingston 1TB',
        price: 219.0,
        description: 'Unidad SSD NVMe de 1TB con lectura de hasta 3500 MB/s',
        imagen: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/75/2023_Dysk_SSD_Kingston_NV2_2TB.jpg/960px-2023_Dysk_SSD_Kingston_NV2_2TB.jpg'
    },
    {
        name: 'Memoria RAM Corsair 16GB',
        price: 189.99,
        description: 'Memoria RAM DDR4 de 16GB a 3200MHz',
        imagen: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/94/2%2A8Go_DDR4_Corsair_-_2018-05-08.jpg/960px-2%2A8Go_DDR4_Corsair_-_2018-05-08.jpg'
    },
    {
        name: 'Silla Gamer Ergonómica',
        price: 799.0,
        description: 'Silla gamer reclinable con soporte lumbar y reposabrazos',
        imagen: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b2/Gaming_chair.jpg/960px-Gaming_chair.jpg'
    },
    {
        name: 'Impresora HP DeskJet',
        price: 349.9,
        description: 'Impresora multifuncional con WiFi y escáner integrado',
        imagen: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d2/HP_DeskJet_2630_All-in-One_Printer.jpg/960px-HP_DeskJet_2630_All-in-One_Printer.jpg'
    }
];

async function seedProducts() {
    try {
        await connectDB();

        let created = 0;

        for (const data of products) {
            const exists = await productModel.exists({ name: data.name });

            if (exists) {
                console.log(`Producto ya existe: ${data.name}`);
                continue;
            }

            await productModel.create(data);
            created++;
            console.log(`Producto creado: ${data.name}`);
        }

        console.log(`Seeder de productos finalizado. Creados: ${created}`);
    } catch (error) {
        console.log(error);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
}

seedProducts();
