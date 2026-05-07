const { prisma } = require('../prisma/config');
const { generateToken } = require('../utils/jwt');
const { hashPassword, comparePassword } = require('../utils/bcrypt');

const register = async (req, res, next) => {
  try {
    const { email, username, password, name } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return res.status(400).json({
        error: existingUser.email === email ? 'Email already registered' : 'Username already taken',
      });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        name,
      },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        avatar: true,
        createdAt: true,
      },
    });

    // Create analytics record
    await prisma.analytics.create({
      data: {
        userId: user.id,
      },
    });

    // Generate token
    const token = generateToken({ userId: user.id });

    res.status(201).json({
      message: 'User registered successfully',
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Update last active
    await prisma.analytics.update({
      where: { userId: user.id },
      data: { lastActive: new Date() },
    });

    // Generate token
    const token = generateToken({ userId: user.id });

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        name: user.name,
        avatar: user.avatar,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        avatar: true,
        createdAt: true,
        analytics: {
          select: {
            totalReviews: true,
            favoriteLanguage: true,
            lastActive: true,
            aiUsageCount: true,
            subscriptionTier: true,
          },
        },
      },
    });

    res.json({ user });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { name, avatar } = req.body;
    
    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: { name, avatar },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        avatar: true,
      },
    });

    res.json({
      message: 'Profile updated successfully',
      user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
};
