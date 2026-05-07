import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import Editor from '@monaco-editor/react';
import {
  PlayIcon,
  EyeIcon,
  SparklesIcon,
  DocumentDuplicateIcon,
  ArrowDownTrayIcon,
} from '@heroicons/react/24/outline';
import { codeReviewAPI } from '../services/api';

const CodeReviewer = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [review, setReview] = useState('');
  const [explanation, setExplanation] = useState('');
  const [improvements, setImprovements] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('review');

  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'go', label: 'Go' },
  ];

  const handleReview = async () => {
    if (!code.trim()) {
      toast.error('Please enter some code to review');
      return;
    }

    setIsLoading(true);
    try {
      const response = await codeReviewAPI.reviewCode({ code, language });
      setReview(response.data.review);
      setActiveTab('review');
      toast.success('Code review completed!');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to review code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExplain = async () => {
    if (!code.trim()) {
      toast.error('Please enter some code to explain');
      return;
    }

    setIsLoading(true);
    try {
      const response = await codeReviewAPI.explainCode({ code, language });
      setExplanation(response.data.explanation);
      setActiveTab('explain');
      toast.success('Code explanation generated!');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to explain code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImprove = async () => {
    if (!code.trim()) {
      toast.error('Please enter some code to improve');
      return;
    }

    setIsLoading(true);
    try {
      const response = await codeReviewAPI.improveCode({ code, language });
      setImprovements(response.data.improvements);
      setActiveTab('improve');
      toast.success('Code improvements generated!');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to improve code');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const downloadAsText = (content, filename) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Downloaded successfully!');
  };

  return (
    <div className="flex-1 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">AI Code Reviewer</h1>
          <p className="text-dark-textSecondary">
            Get intelligent code analysis, explanations, and improvements
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Code Editor Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-morphism p-6"
          >
            <div className="mb-4">
              <label htmlFor="language" className="block text-sm font-medium text-dark-text mb-2">
                Programming Language
              </label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="input-field w-full"
              >
                {languages.map((lang) => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-dark-text mb-2">
                Code Editor
              </label>
              <div className="border border-dark-border rounded-lg overflow-hidden">
                <Editor
                  height="400px"
                  language={language}
                  value={code}
                  onChange={(value) => setCode(value || '')}
                  theme="vs-dark"
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    tabSize: 2,
                    wordWrap: 'on',
                  }}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleReview}
                disabled={isLoading}
                className="btn-primary flex items-center space-x-2 disabled:opacity-50"
              >
                <PlayIcon className="w-4 h-4" />
                <span>Review Code</span>
              </button>
              <button
                onClick={handleExplain}
                disabled={isLoading}
                className="btn-secondary flex items-center space-x-2 disabled:opacity-50"
              >
                <EyeIcon className="w-4 h-4" />
                <span>Explain Code</span>
              </button>
              <button
                onClick={handleImprove}
                disabled={isLoading}
                className="btn-secondary flex items-center space-x-2 disabled:opacity-50"
              >
                <SparklesIcon className="w-4 h-4" />
                <span>Improve Code</span>
              </button>
            </div>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-morphism p-6"
          >
            {(review || explanation || improvements) && (
              <div className="mb-4">
                <div className="flex space-x-1 border-b border-dark-border">
                  {review && (
                    <button
                      onClick={() => setActiveTab('review')}
                      className={`px-4 py-2 text-sm font-medium transition-colors ${
                        activeTab === 'review'
                          ? 'text-primary-400 border-b-2 border-primary-400'
                          : 'text-dark-textSecondary hover:text-dark-text'
                      }`}
                    >
                      Review
                    </button>
                  )}
                  {explanation && (
                    <button
                      onClick={() => setActiveTab('explain')}
                      className={`px-4 py-2 text-sm font-medium transition-colors ${
                        activeTab === 'explain'
                          ? 'text-primary-400 border-b-2 border-primary-400'
                          : 'text-dark-textSecondary hover:text-dark-text'
                      }`}
                    >
                      Explanation
                    </button>
                  )}
                  {improvements && (
                    <button
                      onClick={() => setActiveTab('improve')}
                      className={`px-4 py-2 text-sm font-medium transition-colors ${
                        activeTab === 'improve'
                          ? 'text-primary-400 border-b-2 border-primary-400'
                          : 'text-dark-textSecondary hover:text-dark-text'
                      }`}
                    >
                      Improvements
                    </button>
                  )}
                </div>
              </div>
            )}

            <div className="relative">
              {isLoading ? (
                <div className="flex items-center justify-center h-96">
                  <div className="text-center">
                    <div className="loading-dots mb-4">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <p className="text-dark-textSecondary">
                      AI is analyzing your code...
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  {activeTab === 'review' && review && (
                    <div>
                      <div className="flex justify-end space-x-2 mb-3">
                        <button
                          onClick={() => copyToClipboard(review)}
                          className="p-2 text-dark-textSecondary hover:text-dark-text transition-colors"
                          title="Copy to clipboard"
                        >
                          <DocumentDuplicateIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => downloadAsText(review, 'code-review.txt')}
                          className="p-2 text-dark-textSecondary hover:text-dark-text transition-colors"
                          title="Download as text"
                        >
                          <ArrowDownTrayIcon className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="bg-dark-surface rounded-lg p-4 max-h-96 overflow-y-auto">
                        <pre className="text-dark-text whitespace-pre-wrap text-sm">
                          {review}
                        </pre>
                      </div>
                    </div>
                  )}

                  {activeTab === 'explain' && explanation && (
                    <div>
                      <div className="flex justify-end space-x-2 mb-3">
                        <button
                          onClick={() => copyToClipboard(explanation)}
                          className="p-2 text-dark-textSecondary hover:text-dark-text transition-colors"
                          title="Copy to clipboard"
                        >
                          <DocumentDuplicateIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => downloadAsText(explanation, 'code-explanation.txt')}
                          className="p-2 text-dark-textSecondary hover:text-dark-text transition-colors"
                          title="Download as text"
                        >
                          <ArrowDownTrayIcon className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="bg-dark-surface rounded-lg p-4 max-h-96 overflow-y-auto">
                        <pre className="text-dark-text whitespace-pre-wrap text-sm">
                          {explanation}
                        </pre>
                      </div>
                    </div>
                  )}

                  {activeTab === 'improve' && improvements && (
                    <div>
                      <div className="flex justify-end space-x-2 mb-3">
                        <button
                          onClick={() => copyToClipboard(improvements)}
                          className="p-2 text-dark-textSecondary hover:text-dark-text transition-colors"
                          title="Copy to clipboard"
                        >
                          <DocumentDuplicateIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => downloadAsText(improvements, 'code-improvements.txt')}
                          className="p-2 text-dark-textSecondary hover:text-dark-text transition-colors"
                          title="Download as text"
                        >
                          <ArrowDownTrayIcon className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="bg-dark-surface rounded-lg p-4 max-h-96 overflow-y-auto">
                        <pre className="text-dark-text whitespace-pre-wrap text-sm">
                          {improvements}
                        </pre>
                      </div>
                    </div>
                  )}

                  {!review && !explanation && !improvements && !isLoading && (
                    <div className="flex items-center justify-center h-96">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-dark-surface rounded-full flex items-center justify-center mx-auto mb-4">
                          <SparklesIcon className="w-8 h-8 text-dark-textSecondary" />
                        </div>
                        <p className="text-dark-textSecondary">
                          Enter some code and click on any action to see AI-powered results
                        </p>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default CodeReviewer;
