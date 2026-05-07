// Mock database for testing without PostgreSQL
const mockUsers = [];
const mockReviews = [];
const mockAnalytics = [];

const mockPrisma = {
  user: {
    findFirst: async ({ where }) => {
      const { OR } = where;
      return mockUsers.find(u => 
        OR.some(condition => 
          condition.email ? u.email === condition.email : u.username === condition.username
        )
      ) || null;
    },
    findUnique: async ({ where }) => {
      return mockUsers.find(u => u.id === where.id) || null;
    },
    create: async ({ data }) => {
      const user = { ...data, id: Date.now().toString(), createdAt: new Date(), updatedAt: new Date() };
      mockUsers.push(user);
      // Create analytics for user
      mockAnalytics.push({
        id: Date.now().toString(),
        userId: user.id,
        totalReviews: 0,
        aiUsageCount: 0,
        lastActive: new Date(),
        subscriptionTier: 'free'
      });
      return user;
    },
    update: async ({ where, data }) => {
      const index = mockUsers.findIndex(u => u.id === where.id);
      if (index !== -1) {
        mockUsers[index] = { ...mockUsers[index], ...data };
        return mockUsers[index];
      }
      return null;
    }
  },
  analytics: {
    findUnique: async ({ where }) => {
      return mockAnalytics.find(a => a.userId === where.userId) || null;
    },
    create: async ({ data }) => {
      const analytics = { ...data, id: Date.now().toString() };
      mockAnalytics.push(analytics);
      return analytics;
    },
    update: async ({ where, data }) => {
      const index = mockAnalytics.findIndex(a => a.userId === where.userId);
      if (index !== -1) {
        mockAnalytics[index] = { ...mockAnalytics[index], ...data };
        return mockAnalytics[index];
      }
      return null;
    }
  },
  reviewHistory: {
    findMany: async ({ where, orderBy, skip, take }) => {
      let results = mockReviews.filter(r => r.userId === where.userId);
      if (where.language) results = results.filter(r => r.language === where.language);
      if (where.reviewType) results = results.filter(r => r.reviewType === where.reviewType);
      if (orderBy?.createdAt === 'desc') results.sort((a, b) => b.createdAt - a.createdAt);
      return results.slice(skip || 0, (skip || 0) + (take || 10));
    },
    count: async ({ where }) => {
      return mockReviews.filter(r => r.userId === where.userId).length;
    },
    create: async ({ data }) => {
      const review = { ...data, id: Date.now().toString() };
      mockReviews.push(review);
      return review;
    },
    findFirst: async ({ where }) => {
      return mockReviews.find(r => r.id === where.id && r.userId === where.userId) || null;
    },
    delete: async ({ where }) => {
      const index = mockReviews.findIndex(r => r.id === where.id);
      if (index !== -1) {
        mockReviews.splice(index, 1);
        return { id: where.id };
      }
      return null;
    }
  },
  codeReview: {
    create: async ({ data, include }) => {
      const review = { ...data, id: Date.now().toString(), createdAt: new Date(), updatedAt: new Date() };
      mockReviews.push(review);
      return review;
    }
  },
  $disconnect: async () => {}
};

module.exports = { prisma: mockPrisma };
