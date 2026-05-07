// Use mock database for now since PostgreSQL is not available
const { prisma: mockPrisma } = require('../mockDatabase');

console.log('⚠️  Using mock database for testing (PostgreSQL not configured)');

const prisma = mockPrisma;

module.exports = { prisma };
