import mongoose from "mongoose";
import { connectDB } from "../config/db.config.js";
import { productModel } from "../models/products.models.js";

const products = [
    {
        name: 'Golden Retriever',
        price: 1200.0,
        description: 'Perro de raza grande, originario de Escocia. Amigable, inteligente y muy paciente con niños. Esperanza de vida de 10 a 12 años y peso de 25 a 34 kg.',
        imagen: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bd/Golden_Retriever_Dukedestiny01_drvd.jpg/960px-Golden_Retriever_Dukedestiny01_drvd.jpg'
    },
    {
        name: 'Labrador Retriever',
        price: 1000.0,
        description: 'Perro de raza grande originario de Terranova (Canadá). Leal, enérgico y fácil de entrenar; muy usado como perro guía. Vive de 10 a 12 años y pesa de 25 a 36 kg.',
        imagen: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/34/Labrador_on_Quantock_%282175262184%29.jpg/960px-Labrador_on_Quantock_%282175262184%29.jpg'
    },
    {
        name: 'Pastor Alemán',
        price: 1100.0,
        description: 'Perro de trabajo originario de Alemania. Valiente, protector y muy inteligente; usado en labores policiales y de rescate. Vive de 9 a 13 años y pesa de 22 a 40 kg.',
        imagen: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d0/German_Shepherd_-_DSC_0346_%2810096362833%29.jpg/960px-German_Shepherd_-_DSC_0346_%2810096362833%29.jpg'
    },
    {
        name: 'Bulldog Francés',
        price: 2500.0,
        description: 'Perro de compañía pequeño originario de Francia, reconocible por sus orejas de murciélago. Tranquilo y cariñoso, ideal para apartamentos. Vive de 10 a 12 años y pesa de 8 a 14 kg.',
        imagen: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/18/2008-07-28_Dog_at_Frolick_Field.jpg/960px-2008-07-28_Dog_at_Frolick_Field.jpg'
    },
    {
        name: 'Beagle',
        price: 800.0,
        description: 'Sabueso de tamaño mediano originario de Inglaterra con un olfato excepcional. Alegre, curioso y sociable. Vive de 12 a 15 años y pesa de 9 a 11 kg.',
        imagen: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/55/Beagle_600.jpg/960px-Beagle_600.jpg'
    },
    {
        name: 'Husky Siberiano',
        price: 1300.0,
        description: 'Perro de trineo originario de Siberia, de ojos azules o bicolores y doble capa de pelo. Activo, independiente y amigable. Vive de 12 a 14 años y pesa de 16 a 27 kg.',
        imagen: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8b/Husky_L.jpg/960px-Husky_L.jpg'
    },
    {
        name: 'Gato Persa',
        price: 900.0,
        description: 'Gato de pelo largo y cara chata originario de Persia (Irán). Tranquilo, dócil y casero; requiere cepillado diario. Vive de 12 a 17 años y pesa de 3 a 6 kg.',
        imagen: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/81/Persialainen.jpg/960px-Persialainen.jpg'
    },
    {
        name: 'Gato Siamés',
        price: 700.0,
        description: 'Gato originario de Tailandia, de cuerpo esbelto, ojos azules y pelaje con puntos oscuros. Muy vocal, sociable y apegado a su familia. Vive de 15 a 20 años y pesa de 3 a 5 kg.',
        imagen: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/16/Siamese_cat_Vaillante.JPG/960px-Siamese_cat_Vaillante.JPG'
    },
    {
        name: 'Maine Coon',
        price: 1500.0,
        description: 'Una de las razas de gato más grandes, originaria de Maine (EE. UU.). Pelaje semilargo y orejas con penachos; conocido como «gigante gentil». Vive de 12 a 15 años y pesa de 5 a 11 kg.',
        imagen: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/87/M%C3%A2le_Black_Silver_Blotched_Tabby.jpeg/960px-M%C3%A2le_Black_Silver_Blotched_Tabby.jpeg'
    },
    {
        name: 'British Shorthair',
        price: 1200.0,
        description: 'Gato originario de Gran Bretaña, de cuerpo robusto, cara redonda y pelaje denso, típicamente azul grisáceo. Calmado e independiente. Vive de 12 a 20 años y pesa de 4 a 8 kg.',
        imagen: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2d/Mystica_from_British_Empire_Cattery.jpg/960px-Mystica_from_British_Empire_Cattery.jpg'
    }
];

async function seedProducts() {
    try {
        await connectDB();

        const { deletedCount } = await productModel.deleteMany({});
        console.log(`Productos eliminados: ${deletedCount}`);

        const created = await productModel.insertMany(products);
        created.forEach((product) => console.log(`Producto creado: ${product.name}`));

        console.log(`Seeder de productos finalizado. Creados: ${created.length}`);
    } catch (error) {
        console.log(error);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
}

seedProducts();
