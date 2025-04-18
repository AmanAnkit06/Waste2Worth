import React, { useState } from "react";
import Footer from "../components/common/Footer";

const Blogs = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [expandedPost, setExpandedPost] = useState(null);

  // Sample blog data
  const blogPosts = [
    {
      id: 1,
      title: "10 Ways to Reduce Kitchen Food Waste",
      excerpt:
        "Practical tips for minimizing food waste in your daily cooking routine",
      content:
        "1. Plan meals weekly 2. Proper storage techniques 3. Creative leftover recipes 4. Understanding expiration labels 5. Composting basics 6. Portion control 7. Smart grocery shopping 8. Preserving methods 9. Food sharing initiatives 10. Tracking waste patterns",
      image: "https://images.unsplash.com/photo-1588013273468-315fd88ea34c",
      category: "tips",
      date: "March 15, 2024",
      author: "Sarah Johnson",
    },
    {
      id: 2,
      title: "Global Food Waste: Startling Facts",
      excerpt:
        "Understanding the worldwide impact of food waste on economy and environment",
      content:
        "1.3 billion tons of food wasted annually worldwide, representing $1 trillion in economic losses. Food waste accounts for 8% of global greenhouse emissions. 28% of agricultural land grows food that gets wasted. 1 in 9 people remain undernourished while we waste food.",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
      category: "facts",
      date: "March 12, 2024",
      author: "Michael Chen",
    },
    {
      id: 3,
      title: "Smart Food Storage Solutions",
      excerpt:
        "Innovative technologies for extending food freshness and reducing waste",
      content:
        "1. Smart containers with freshness sensors 2. Vacuum sealing systems 3. Ethylene-absorbing fridge liners 4. Herb preservation stations 5. Modular fridge organizers 6. AI-powered inventory trackers 7. Compostable food wraps 8. Controlled atmosphere storage 9. UV-C sanitization boxes 10. Community food sharing apps",
      image: "https://images.unsplash.com/photo-1583778176476-4a8b02f64d21",
      category: "solutions",
      date: "March 10, 2024",
      author: "Emma Wilson",
    },
  ];

  const filteredPosts =
    activeTab === "all"
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeTab);

  const toggleExpand = (postId) => {
    setExpandedPost(expandedPost === postId ? null : postId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <header className="relative h-96 bg-gray-900 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542838132-92c53300491e')] bg-cover bg-center opacity-70" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
            Fight Food Waste
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mb-8">
            Join the movement to reduce food waste and create sustainable food
            systems
          </p>
          <div className="flex w-full max-w-xl bg-white rounded-full overflow-hidden shadow-lg">
            <input
              type="text"
              placeholder="Search articles..."
              className="flex-1 px-6 py-3 text-gray-900 focus:outline-none"
            />
            <button className="px-6 bg-emerald-500 hover:bg-emerald-600 transition-colors">
              <i className="fas fa-search text-white" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-4 mb-12 justify-center">
          {["all", "tips", "facts", "solutions"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full capitalize transition-all ${
                activeTab === tab
                  ? "bg-emerald-500 text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-gray-100 shadow-md"
              }`}
            >
              {tab === "all" ? "All Articles" : tab}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer ${
                expandedPost === post.id ? "lg:col-span-3" : ""
              }`}
              onClick={() => toggleExpand(post.id)}
            >
              <div className="relative h-60">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover rounded-t-2xl"
                />
                <span className="absolute top-4 right-4 bg-emerald-500 text-white px-4 py-1 rounded-full text-sm">
                  {post.category}
                </span>
              </div>

              <div className="p-6">
                <div className="flex justify-between text-sm text-gray-500 mb-3">
                  <span>{post.date}</span>
                  <span>By {post.author}</span>
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-3">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>

                {expandedPost === post.id ? (
                  <div className="space-y-4">
                    <div className="text-gray-700 whitespace-pre-line">
                      {post.content}
                    </div>
                    <button className="text-white bg-emerald-500 hover:bg-emerald-600 px-6 py-2 rounded-full transition-colors">
                      Show Less
                    </button>
                  </div>
                ) : (
                  <button className="text-white bg-emerald-500 hover:bg-emerald-600 px-6 py-2 rounded-full transition-colors">
                    Read More
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter CTA */}
        <section className="mt-16 bg-emerald-50 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Stay Informed About Food Waste Solutions
          </h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Get weekly updates, tips, and resources straight to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-full border focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full transition-colors">
              Subscribe
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}

      <Footer />
    </div>
  );
};

export default Blogs;
