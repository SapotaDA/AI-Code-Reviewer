import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  MagnifyingGlassIcon,
  TrashIcon,
  EyeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import { codeReviewAPI } from '../services/api';

const ReviewHistory = () => {
  const [reviews, setReviews] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  });
  const [filters, setFilters] = useState({
    search: '',
    language: '',
    type: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedReview, setSelectedReview] = useState(null);

  const languages = [
    { value: '', label: 'All Languages' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'go', label: 'Go' },
  ];

  const reviewTypes = [
    { value: '', label: 'All Types' },
    { value: 'review', label: 'Review' },
    { value: 'explain', label: 'Explanation' },
    { value: 'improve', label: 'Improvement' },
  ];

  useEffect(() => {
    fetchReviews();
  }, [pagination.page, filters]);

  const fetchReviews = async () => {
    setIsLoading(true);
    try {
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        ...filters,
      };

      // Remove empty filter values
      Object.keys(params).forEach(key => {
        if (params[key] === '') {
          delete params[key];
        }
      });

      const response = await codeReviewAPI.getHistory(params);
      setReviews(response.data.reviews);
      setPagination(response.data.pagination);
    } catch (error) {
      toast.error('Failed to fetch review history');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchReviews();
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this review?')) {
      return;
    }

    try {
      await codeReviewAPI.deleteReview(id);
      toast.success('Review deleted successfully');
      fetchReviews();
    } catch (error) {
      toast.error('Failed to delete review');
    }
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const truncateCode = (code, maxLength = 100) => {
    if (code.length <= maxLength) return code;
    return code.substring(0, maxLength) + '...';
  };

  return (
    <div className="flex-1 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Review History</h1>
          <p className="text-dark-textSecondary">
            Browse and manage your past code reviews and analyses
          </p>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-morphism p-6 mb-6"
        >
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-dark-textSecondary" />
                  <input
                    type="text"
                    placeholder="Search reviews..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    className="input-field w-full pl-10"
                  />
                </div>
              </div>
              <div>
                <select
                  value={filters.language}
                  onChange={(e) => handleFilterChange('language', e.target.value)}
                  className="input-field w-full"
                >
                  {languages.map(lang => (
                    <option key={lang.value} value={lang.value}>
                      {lang.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <select
                  value={filters.type}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                  className="input-field w-full"
                >
                  {reviewTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button type="submit" className="btn-primary">
              Search
            </button>
          </form>
        </motion.div>

        {/* Reviews List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="loading-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          ) : reviews.length > 0 ? (
            <>
              {reviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="glass-morphism p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="px-3 py-1 bg-primary-500/20 text-primary-400 text-sm font-medium rounded-full">
                          {review.reviewType.charAt(0).toUpperCase() + review.reviewType.slice(1)}
                        </span>
                        <span className="px-3 py-1 bg-dark-surface text-dark-text text-sm font-medium rounded-full">
                          {review.language}
                        </span>
                        <span className="text-dark-textSecondary text-sm">
                          {formatDate(review.createdAt)}
                        </span>
                      </div>
                      <div className="bg-dark-surface rounded-lg p-3 mb-3">
                        <pre className="text-dark-text text-sm whitespace-pre-wrap font-mono">
                          {truncateCode(review.codeSnippet)}
                        </pre>
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => setSelectedReview(review)}
                        className="p-2 text-dark-textSecondary hover:text-primary-400 transition-colors"
                        title="View details"
                      >
                        <EyeIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(review.id)}
                        className="p-2 text-dark-textSecondary hover:text-red-400 transition-colors"
                        title="Delete review"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Pagination */}
              {pagination.pages > 1 && (
                <div className="flex items-center justify-center space-x-2 mt-8">
                  <button
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                    className="p-2 text-dark-textSecondary hover:text-dark-text disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeftIcon className="w-5 h-5" />
                  </button>
                  
                  <div className="flex space-x-1">
                    {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-1 rounded-lg transition-colors ${
                          pagination.page === page
                            ? 'bg-primary-500 text-white'
                            : 'text-dark-textSecondary hover:text-dark-text hover:bg-dark-surface'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === pagination.pages}
                    className="p-2 text-dark-textSecondary hover:text-dark-text disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRightIcon className="w-5 h-5" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-dark-surface rounded-full flex items-center justify-center mx-auto mb-4">
                <EyeIcon className="w-8 h-8 text-dark-textSecondary" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No reviews found</h3>
              <p className="text-dark-textSecondary">
                {filters.search || filters.language || filters.type
                  ? 'Try adjusting your filters'
                  : 'Start reviewing code to see your history here'}
              </p>
            </div>
          )}
        </motion.div>

        {/* Review Detail Modal */}
        {selectedReview && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="glass-morphism p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-white">Review Details</h2>
                <button
                  onClick={() => setSelectedReview(null)}
                  className="p-2 text-dark-textSecondary hover:text-dark-text transition-colors"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="px-3 py-1 bg-primary-500/20 text-primary-400 text-sm font-medium rounded-full">
                    {selectedReview.reviewType.charAt(0).toUpperCase() + selectedReview.reviewType.slice(1)}
                  </span>
                  <span className="px-3 py-1 bg-dark-surface text-dark-text text-sm font-medium rounded-full">
                    {selectedReview.language}
                  </span>
                  <span className="text-dark-textSecondary text-sm">
                    {formatDate(selectedReview.createdAt)}
                  </span>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Code</h3>
                  <div className="bg-dark-surface rounded-lg p-4">
                    <pre className="text-dark-text text-sm whitespace-pre-wrap font-mono">
                      {selectedReview.codeSnippet}
                    </pre>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Result</h3>
                  <div className="bg-dark-surface rounded-lg p-4">
                    <pre className="text-dark-text text-sm whitespace-pre-wrap">
                      {selectedReview.result}
                    </pre>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ReviewHistory;
