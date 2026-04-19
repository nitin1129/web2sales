import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import pb from '@/lib/pocketbaseClient';

const BlogDetailPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      // Try to fetch by slug first, then by ID
      let record;
      try {
        record = await pb.collection('blogs').getFirstListItem(`slug="${id}"`, { $autoCancel: false });
      } catch {
        record = await pb.collection('blogs').getOne(id, { $autoCancel: false });
      }
      setBlog(record);
    } catch (error) {
      console.error('Error fetching blog:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateReadTime = (content) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading article...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg mb-4">Article not found</p>
          <Link to="/blogs">
            <Button className="bg-[#6255A4] hover:bg-[#6255A4]/90">Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${blog.title} | Web2Sales Blog`}</title>
        <meta name="description" content={blog.excerpt || blog.title} />
        {blog.seoKeywords && <meta name="keywords" content={blog.seoKeywords} />}
      </Helmet>

      <article className="bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#6255A4] to-[#9489CC] text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link to="/blogs">
              <Button variant="ghost" className="text-white hover:bg-white/20 mb-6">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Button>
            </Link>

            {blog.category && (
              <span className="inline-block bg-white/20 text-white text-sm font-semibold px-4 py-1 rounded-full mb-4">
                {blog.category}
              </span>
            )}

            <h1 className="text-4xl md:text-5xl font-bold mb-6">{blog.title}</h1>

            <div className="flex flex-wrap items-center gap-6 text-white/90">
              {blog.author && (
                <div className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  <span>{blog.author}</span>
                </div>
              )}
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                <span>{formatDate(blog.publishDate)}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                <span>{calculateReadTime(blog.content)} min read</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            {blog.excerpt && (
              <p className="text-xl text-gray-600 mb-8 pb-8 border-b border-gray-200 italic">
                {blog.excerpt}
              </p>
            )}

            <div
              className="prose prose-lg max-w-none"
              style={{
                color: '#374151',
                lineHeight: '1.8'
              }}
            >
              {blog.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-12 bg-gradient-to-r from-[#6255A4] to-[#7B6FB8] rounded-xl p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Website?</h2>
            <p className="text-lg mb-6 opacity-90">
              Let's turn your website into a 24×7 sales machine
            </p>
            <Link to="/services">
              <Button size="lg" className="bg-white text-[#6255A4] hover:bg-gray-100 font-bold">
                View Our Services
              </Button>
            </Link>
          </div>
        </div>
      </article>
    </>
  );
};

export default BlogDetailPage;