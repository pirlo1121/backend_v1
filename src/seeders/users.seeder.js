import mongoose from "mongoose";
import { connectDB } from "../config/db.config.js";
import { usersModel } from "../models/users.models.js";

const users = [
    {
        name: 'Carlos',
        lastName: 'Ramírez',
        email: 'carlos.ramirez@example.com',
        password: 'Password1!',
        role: 'admin'
    },
    {
        name: 'María',
        lastName: 'González',
        email: 'maria.gonzalez@example.com',
        password: 'Password1!',
        role: 'user'
    },
    {
        name: 'José',
        lastName: 'Pérez',
        email: 'jose.perez@example.com',
        password: 'Password1!',
        role: 'user'
    },
    {
        name: 'Ana',
        lastName: 'Martínez',
        email: 'ana.martinez@example.com',
        password: 'Password1!',
        role: 'user'
    },
    {
        name: 'Luis',
        lastName: 'Rodríguez',
        email: 'luis.rodriguez@example.com',
        password: 'Password1!',
        role: 'user'
    },
    {
        name: 'Laura',
        lastName: 'Fernández',
        email: 'laura.fernandez@example.com',
        password: 'Password1!',
        role: 'user'
    },
    {
        name: 'Pedro',
        lastName: 'Sánchez',
        email: 'pedro.sanchez@example.com',
        password: 'Password1!',
        role: 'user'
    },
    {
        name: 'Sofía',
        lastName: 'Torres',
        email: 'sofia.torres@example.com',
        password: 'Password1!',
        role: 'user'
    },
    {
        name: 'Diego',
        lastName: 'Vargas',
        email: 'diego.vargas@example.com',
        password: 'Password1!',
        role: 'user'
    },
    {
        name: 'Valentina',
        lastName: 'Castro',
        email: 'valentina.castro@example.com',
        password: 'Password1!',
        role: 'user'
    }
];

async function seedUsers() {
    try {
        await connectDB();

        let created = 0;

        for (const data of users) {
            const exists = await usersModel.exists({ email: data.email });

            if (exists) {
                console.log(`Usuario ya existe: ${data.email}`);
                continue;
            }

            await usersModel.create(data);
            created++;
            console.log(`Usuario creado: ${data.email}`);
        }

        console.log(`Seeder de usuarios finalizado. Creados: ${created}`);
    } catch (error) {
        console.log(error);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
}

seedUsers();
