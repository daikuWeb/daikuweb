// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import { blogPosts } from '../data/blogPosts';

const prisma = new PrismaClient();

async function main() {
  // Create admin user first
  const admin = await prisma.user.upsert({
    where: { email: 'admin@daiku.com' },
    update: {},
    create: {
      name: 'Daiku Design',
      email: 'admin@daiku.com',
      password: 'hashedpassword', // In real app, use bcrypt to hash password
      role: 'ADMIN'
    }
  });

  // Create blog posts
  for (const post of blogPosts) {
    await prisma.blog.upsert({
      where: { slug: post.slug },
      update: {},
      create: {
        slug: post.slug,
        title: post.title,
        content: post.content,
        excerpt: post.excerpt,
        coverImage: post.coverImage,
        category: post.category,
        readTime: post.readTime,
        published: true,
        authorId: admin.id
      }
    });
  }

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });