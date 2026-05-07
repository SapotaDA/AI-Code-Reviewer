import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CodeBracketIcon,
  SparklesIcon,
  ShieldCheckIcon,
  RocketLaunchIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  StarIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

const Landing = () => {
  const features = [
    {
      icon: CodeBracketIcon,
      title: 'Multi-Language Support',
      description: 'Support for JavaScript, TypeScript, Python, Java, C++, Go and more.',
    },
    {
      icon: SparklesIcon,
      title: 'AI-Powered Analysis',
      description: 'Advanced AI models provide intelligent code reviews and suggestions.',
    },
    {
      icon: ShieldCheckIcon,
      title: 'Security Focused',
      description: 'Identify security vulnerabilities and best practices violations.',
    },
    {
      icon: RocketLaunchIcon,
      title: 'Performance Optimization',
      description: 'Get suggestions to improve code performance and efficiency.',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Senior Developer',
      content: 'AI Code Reviewer has transformed our code review process. It catches bugs we would have missed!',
      avatar: 'SJ',
    },
    {
      name: 'Michael Chen',
      role: 'Tech Lead',
      content: 'The AI suggestions are incredibly helpful for learning best practices and improving code quality.',
      avatar: 'MC',
    },
    {
      name: 'Emily Davis',
      role: 'Full Stack Developer',
      content: 'A must-have tool for any developer serious about code quality and security.',
      avatar: 'ED',
    },
  ];

  const faqs = [
    {
      question: 'How accurate is the AI code review?',
      answer: 'Our AI models are trained on millions of code repositories and provide highly accurate reviews with detailed explanations.',
    },
    {
      question: 'What programming languages are supported?',
      answer: 'We support JavaScript, TypeScript, Python, Java, C++, Go, and are constantly adding more languages.',
    },
    {
      question: 'Is my code secure and private?',
      answer: 'Yes, all code is encrypted and processed securely. We never share your code with third parties.',
    },
    {
      question: 'Can I integrate with my existing workflow?',
      answer: 'Yes, we offer API access and integrations with popular development tools and platforms.',
    },
  ];

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-purple-900 to-indigo-900 opacity-90"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              AI-Powered
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-purple-400">
                {' '}Code Review
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Transform your code quality with intelligent AI analysis. Get instant feedback on bugs, 
              security issues, performance, and best practices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="btn-primary text-lg px-8 py-3 inline-flex items-center justify-center"
              >
                Get Started Free
                <ArrowRightIcon className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/login"
                className="btn-secondary text-lg px-8 py-3 inline-flex items-center justify-center"
              >
                Sign In
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Choose AI Code Reviewer?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the future of code review with our cutting-edge AI technology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-morphism p-6 text-center"
              >
                <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Showcase Section */}
      <section className="py-20 bg-gradient-to-r from-primary-900/20 to-purple-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                Intelligent Code Analysis
              </h2>
              <div className="space-y-4">
                {[
                  'Bug detection and error prevention',
                  'Security vulnerability identification',
                  'Performance optimization suggestions',
                  'Code readability improvements',
                  'Best practices enforcement',
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircleIcon className="w-6 h-6 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="glass-morphism p-6"
            >
              <div className="bg-dark-surface rounded-lg p-4 font-mono text-sm">
                <div className="text-green-400 mb-2">// Before AI Review</div>
                <div className="text-gray-300">
                  {`function calculateTotal(items) {
  let sum = 0;
  for(var i = 0; i < items.length; i++) {
    sum += items[i].price;
  }
  return sum;
}`}
                </div>
                <div className="text-primary-400 mt-4 mb-2">// After AI Review</div>
                <div className="text-gray-300">
                  {`const calculateTotal = (items) => 
  items.reduce((sum, item) => sum + item.price, 0);`}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Loved by Developers
            </h2>
            <p className="text-xl text-gray-300">
              See what our users are saying about AI Code Reviewer
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-morphism p-6"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-semibold">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300">{testimonial.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-r from-primary-900/20 to-purple-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-300">
              Got questions? We've got answers
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-morphism p-6"
              >
                <h3 className="text-xl font-semibold text-white mb-3">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-morphism p-12"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Code?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of developers who are already using AI Code Reviewer to write better, 
              more secure code in less time.
            </p>
            <Link
              to="/register"
              className="btn-primary text-lg px-8 py-3 inline-flex items-center justify-center"
            >
              Start Your Free Trial
              <RocketLaunchIcon className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-surface border-t border-dark-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">AI Code Reviewer</h3>
              <p className="text-gray-400">
                Intelligent code analysis powered by advanced AI technology.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link to="/features" className="text-gray-400 hover:text-white transition-colors">Features</Link></li>
                <li><Link to="/pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
                <li><Link to="/api" className="text-gray-400 hover:text-white transition-colors">API</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
                <li><Link to="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
                <li><Link to="/careers" className="text-gray-400 hover:text-white transition-colors">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><Link to="/docs" className="text-gray-400 hover:text-white transition-colors">Documentation</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
                <li><Link to="/status" className="text-gray-400 hover:text-white transition-colors">Status</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-dark-border mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 AI Code Reviewer. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
