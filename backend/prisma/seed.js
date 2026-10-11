const prisma = require('../src/config/db');

async function main() {
    await prisma.role.createMany({
        data: [
            { name: 'Cliente' },
            { name: 'Propietario' },
            { name: 'Admin' },
        ],
        skipDuplicates: true,
    });

    await prisma.workplaceType.createMany({
        data: [
            { name: 'Oficina Privada' },
            { name: 'Sala de Reuniones' },
            { name: 'Escritorio Dedicado' },
            { name: 'Escritorio Compartido' },
        ],
        skipDuplicates: true,
    });

    console.log('Roles y tipos de espacios de trabajo creados exitosamente.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });


