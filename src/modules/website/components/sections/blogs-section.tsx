import { useState, useMemo } from "react";
import { Search, Filter, Calendar, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  image: string;
  author: string;
  date: string;
  readTime: string;
  featured?: boolean;
}

const blogs: Blog[] = [
  {
    id: "1",
    title: "Building Scalable React Applications with Next.js 14",
    excerpt: "Learn how to build high-performance React applications using Next.js 14's latest features including App Router, Server Components, and more.",
    content: "Full blog content here...",
    category: "Frontend Development",
    tags: ["React", "Next.js", "TypeScript", "Performance"],
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop",
    author: "Saeed Al-Tout",
    date: "2024-01-15",
    readTime: "8 min read",
    featured: true
  },
  {
    id: "2",
    title: "AI Integration in Modern Web Applications",
    excerpt: "Explore how to integrate AI and machine learning features into your web applications using OpenAI APIs and TensorFlow.js.",
    content: "Full blog content here...",
    category: "AI/ML",
    tags: ["AI", "Machine Learning", "OpenAI", "JavaScript"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    author: "Saeed Al-Tout",
    date: "2024-01-10",
    readTime: "12 min read",
    featured: true
  },
  {
    id: "3",
    title: "Optimizing Database Performance with Prisma",
    excerpt: "Discover best practices for optimizing database queries and improving application performance using Prisma ORM.",
    content: "Full blog content here...",
    category: "Backend Development",
    tags: ["Prisma", "Database", "Performance", "Node.js"],
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=600&fit=crop",
    author: "Saeed Al-Tout",
    date: "2024-01-05",
    readTime: "10 min read",
    featured: true
  },
  {
    id: "4",
    title: "Mastering TypeScript for Better Code Quality",
    excerpt: "A comprehensive guide to using TypeScript effectively in your projects to improve code quality and developer experience.",
    content: "Full blog content here...",
    category: "Programming",
    tags: ["TypeScript", "JavaScript", "Best Practices", "Code Quality"],
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=600&fit=crop",
    author: "Saeed Al-Tout",
    date: "2023-12-28",
    readTime: "15 min read"
  },
  {
    id: "5",
    title: "Building Real-time Applications with Socket.io",
    excerpt: "Learn how to build real-time features like chat, notifications, and live updates using Socket.io and React.",
    content: "Full blog content here...",
    category: "Real-time",
    tags: ["Socket.io", "Real-time", "React", "WebSockets"],
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
    author: "Saeed Al-Tout",
    date: "2023-12-20",
    readTime: "11 min read"
  },
  {
    id: "6",
    title: "Deploying Applications with Docker and AWS",
    excerpt: "A step-by-step guide to containerizing your applications with Docker and deploying them to AWS cloud infrastructure.",
    content: "Full blog content here...",
    category: "DevOps",
    tags: ["Docker", "AWS", "DevOps", "Deployment"],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",
    author: "Saeed Al-Tout",
    date: "2023-12-15",
    readTime: "14 min read"
  },
  {
    id: "7",
    title: "Creating Beautiful UIs with Tailwind CSS",
    excerpt: "Master the art of building modern, responsive user interfaces using Tailwind CSS utility-first approach.",
    content: "Full blog content here...",
    category: "Design",
    tags: ["Tailwind CSS", "CSS", "Design", "UI/UX"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
    author: "Saeed Al-Tout",
    date: "2023-12-10",
    readTime: "9 min read"
  },
  {
    id: "8",
    title: "Testing React Applications with Jest and Testing Library",
    excerpt: "Comprehensive guide to writing effective tests for React applications using Jest and React Testing Library.",
    content: "Full blog content here...",
    category: "Testing",
    tags: ["Testing", "Jest", "React Testing Library", "Quality Assurance"],
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=600&fit=crop",
    author: "Saeed Al-Tout",
    date: "2023-12-05",
    readTime: "13 min read"
  }
];

const categories = ["All", "Frontend Development", "Backend Development", "AI/ML", "Programming", "Real-time", "DevOps", "Design", "Testing"];

/**
 * BlogsSection - Blogs section with filtering and search functionality.
 */
export function BlogsSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesSearch = 
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.tags.some(tag => 
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );
      
      const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent mb-4 sm:mb-6">
            Blog & Articles
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Insights, tutorials, and thoughts on{" "}
            <span className="font-semibold text-foreground">web development, AI, and technology</span>
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles by title, content, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* Filter Button */}
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/10 transition-colors"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredBlogs.length} of {blogs.length} articles
          </p>
        </div>

        {/* Featured Blogs */}
        {filteredBlogs.filter(blog => blog.featured).length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Featured Articles</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredBlogs.filter(blog => blog.featured).map((blog) => (
                <Card key={blog.id} className="group hover:shadow-lg transition-shadow">
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <Badge variant="secondary" className="mb-2">
                        {blog.category}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {blog.title}
                    </CardTitle>
                    <p className="text-muted-foreground line-clamp-2">
                      {blog.excerpt}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>{blog.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(blog.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <span>{blog.readTime}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {blog.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Link to={`/blogs/${blog.id}`}>
                      <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Blogs */}
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.filter(blog => !blog.featured).map((blog) => (
              <Card key={blog.id} className="group hover:shadow-lg transition-shadow">
                <div className="relative h-40 overflow-hidden rounded-t-lg">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <Badge variant="secondary" className="text-xs">
                      {blog.category}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                    {blog.title}
                  </CardTitle>
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {blog.excerpt}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                    <div className="flex items-center gap-2">
                      <span>{blog.author}</span>
                      <span>•</span>
                      <span>{new Date(blog.date).toLocaleDateString()}</span>
                    </div>
                    <span>{blog.readTime}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {blog.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Link to={`/blogs/${blog.id}`}>
                    <Button variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      Read More
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-4">
              No articles found matching your criteria.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

BlogsSection.displayName = "BlogsSection"; 