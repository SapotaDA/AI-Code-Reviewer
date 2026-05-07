const { PrismaClient } = require('@prisma/client');
const aiService = require('../services/aiService');

const prisma = new PrismaClient();

const reviewCode = async (req, res, next) => {
  try {
    const { code, language } = req.body;

    if (!code || !language) {
      return res.status(400).json({ error: 'Code and language are required' });
    }

    // Get AI review
    const review = await aiService.reviewCode(code, language);

    // Save to database
    const codeReview = await prisma.codeReview.create({
      data: {
        code,
        language,
        review,
        userId: req.user.id,
      },
      include: {
        user: {
          select: {
            username: true,
            name: true,
          },
        },
      },
    });

    // Update analytics
    await prisma.analytics.update({
      where: { userId: req.user.id },
      data: {
        totalReviews: { increment: 1 },
        aiUsageCount: { increment: 1 },
        lastActive: new Date(),
        favoriteLanguage: language,
      },
    });

    // Add to review history
    await prisma.reviewHistory.create({
      data: {
        codeSnippet: code,
        language,
        reviewType: 'review',
        result: review,
        userId: req.user.id,
      },
    });

    res.json({
      message: 'Code review completed successfully',
      review,
      codeReview,
    });
  } catch (error) {
    next(error);
  }
};

const explainCode = async (req, res, next) => {
  try {
    const { code, language } = req.body;

    if (!code || !language) {
      return res.status(400).json({ error: 'Code and language are required' });
    }

    // Get AI explanation
    const explanation = await aiService.explainCode(code, language);

    // Add to review history
    await prisma.reviewHistory.create({
      data: {
        codeSnippet: code,
        language,
        reviewType: 'explain',
        result: explanation,
        userId: req.user.id,
      },
    });

    // Update analytics
    await prisma.analytics.update({
      where: { userId: req.user.id },
      data: {
        aiUsageCount: { increment: 1 },
        lastActive: new Date(),
      },
    });

    res.json({
      message: 'Code explanation completed successfully',
      explanation,
    });
  } catch (error) {
    next(error);
  }
};

const improveCode = async (req, res, next) => {
  try {
    const { code, language } = req.body;

    if (!code || !language) {
      return res.status(400).json({ error: 'Code and language are required' });
    }

    // Get AI improvements
    const improvements = await aiService.improveCode(code, language);

    // Add to review history
    await prisma.reviewHistory.create({
      data: {
        codeSnippet: code,
        language,
        reviewType: 'improve',
        result: improvements,
        userId: req.user.id,
      },
    });

    // Update analytics
    await prisma.analytics.update({
      where: { userId: req.user.id },
      data: {
        aiUsageCount: { increment: 1 },
        lastActive: new Date(),
      },
    });

    res.json({
      message: 'Code improvements generated successfully',
      improvements,
    });
  } catch (error) {
    next(error);
  }
};

const getReviewHistory = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search, language, type } = req.query;
    const skip = (page - 1) * limit;

    const where = {
      userId: req.user.id,
      ...(search && {
        OR: [
          { codeSnippet: { contains: search, mode: 'insensitive' } },
          { result: { contains: search, mode: 'insensitive' } },
        ],
      }),
      ...(language && { language }),
      ...(type && { reviewType: type }),
    };

    const [reviews, total] = await Promise.all([
      prisma.reviewHistory.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: parseInt(limit),
        select: {
          id: true,
          codeSnippet: true,
          language: true,
          reviewType: true,
          createdAt: true,
        },
      }),
      prisma.reviewHistory.count({ where }),
    ]);

    res.json({
      reviews,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteReview = async (req, res, next) => {
  try {
    const { id } = req.params;

    const review = await prisma.reviewHistory.findFirst({
      where: { id, userId: req.user.id },
    });

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    await prisma.reviewHistory.delete({
      where: { id },
    });

    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    next(error);
  }
};

const getDashboardStats = async (req, res, next) => {
  try {
    const analytics = await prisma.analytics.findUnique({
      where: { userId: req.user.id },
      select: {
        totalReviews: true,
        favoriteLanguage: true,
        aiUsageCount: true,
        lastActive: true,
        subscriptionTier: true,
      },
    });

    const recentReviews = await prisma.reviewHistory.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: {
        id: true,
        language: true,
        reviewType: true,
        createdAt: true,
      },
    });

    const languageStats = await prisma.reviewHistory.groupBy({
      by: ['language'],
      where: { userId: req.user.id },
      _count: { language: true },
      orderBy: { _count: { language: 'desc' } },
    });

    res.json({
      analytics,
      recentReviews,
      languageStats,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  reviewCode,
  explainCode,
  improveCode,
  getReviewHistory,
  deleteReview,
  getDashboardStats,
};
