import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  // Clean up existing users to prevent unique constraint errors if running multiple times
  // Be careful with this in production, but fine for local seeding
  // await prisma.user.deleteMany()

  const password = await hash('password123', 10)

  // 1. Create an Admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@skyhaven.com' },
    update: {
      password,
      role: 'ADMIN',
      name: 'Admin User',
    },
    create: {
      email: 'admin@skyhaven.com',
      name: 'Admin User',
      password,
      role: 'ADMIN',
    },
  })
  console.log(`Created admin user with id: ${admin.id} | Email: ${admin.email} | Password: password123`)

  // 2. Create a Manager user
  const manager = await prisma.user.upsert({
    where: { email: 'manager@skyhaven.com' },
    update: {
      password,
      role: 'MANAGER',
      name: 'Manager User',
    },
    create: {
      email: 'manager@skyhaven.com',
      name: 'Manager User',
      password,
      role: 'MANAGER',
    },
  })
  console.log(`Created manager user with id: ${manager.id} | Email: ${manager.email} | Password: password123`)

  // 3. Create a Staff user
  const staff = await prisma.user.upsert({
    where: { email: 'staff@skyhaven.com' },
    update: {
      password,
      role: 'STAFF',
      name: 'Staff User',
    },
    create: {
      email: 'staff@skyhaven.com',
      name: 'Staff User',
      password,
      role: 'STAFF',
    },
  })
  console.log(`Created staff user with id: ${staff.id} | Email: ${staff.email} | Password: password123`)

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })