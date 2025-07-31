import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, User, Clock, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    excerpt:
      "Learn how to build high-performance React applications using Next.js 14's latest features including App Router, Server Components, and more.",
    content: `
      <h2>Introduction</h2>
      <p>Next.js 14 introduces groundbreaking features that revolutionize how we build React applications. In this comprehensive guide, we'll explore the latest capabilities and best practices for creating scalable, high-performance applications.</p>
      
      <h2>App Router: The New Paradigm</h2>
      <p>The App Router is Next.js 14's most significant feature, introducing a file-system based routing system that's more intuitive and powerful than the traditional Pages Router.</p>
      
      <h3>Key Benefits:</h3>
      <ul>
        <li>Nested layouts with shared UI</li>
        <li>Server Components by default</li>
        <li>Streaming and Suspense</li>
        <li>Simplified data fetching</li>
      </ul>
      
      <h2>Server Components</h2>
      <p>Server Components allow you to write UI that can be rendered and cached on the server, reducing the JavaScript bundle size sent to the client and improving performance.</p>
      
      <h2>Performance Optimizations</h2>
      <p>Next.js 14 includes several performance improvements:</p>
      <ul>
        <li>Turbopack for faster development</li>
        <li>Improved image optimization</li>
        <li>Better caching strategies</li>
        <li>Enhanced tree shaking</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Next.js 14 represents a significant step forward in React development, offering better performance, developer experience, and scalability. By leveraging these new features, you can build applications that are faster, more maintainable, and provide better user experiences.</p>
    `,
    category: "Frontend Development",
    tags: ["React", "Next.js", "TypeScript", "Performance"],
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop",
    author: "Saeed Al-Tout",
    date: "2024-01-15",
    readTime: "8 min read",
    featured: true,
  },
  // Add more blogs here...
];

/**
 * BlogDetailSection - Individual blog detail section.
 */
export function BlogDetailSection({ blogId }: { blogId?: string }) {
  const blog = blogs.find((b) => b.id === blogId);

  if (!blog) {
    return (
      <section className="py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Article Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            The article you're looking for doesn't exist.
          </p>
          <Link to="/blogs">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <div className="mb-8">
          <Link to="/blogs">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>

        {/* Article Header */}
        <div className="mb-12">
          <div className="max-w-4xl mx-auto">
            {/* Category and Meta */}
            <div className="flex items-center gap-4 mb-6">
              <Badge variant="secondary">{blog.category}</Badge>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{blog.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(blog.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{blog.readTime}</span>
                </div>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {blog.title}
            </h1>

            {/* Excerpt */}
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed">
              {blog.excerpt}
            </p>

            {/* Featured Image */}
            <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden rounded-lg mb-8">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {blog.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Share Button */}
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Share this article:
                </span>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="max-w-4xl mx-auto">
          <Card className="p-8">
            <CardContent className="prose prose-lg max-w-none">
              <div
                dangerouslySetInnerHTML={{ __html: blog.content }}
                className="text-muted-foreground leading-relaxed"
              />
            </CardContent>
          </Card>
        </div>

        {/* Author Info */}
        <div className="max-w-4xl mx-auto mt-12">
          <Card>
            <CardHeader>
              <CardTitle>About the Author</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl">
                  SA
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{blog.author}</h3>
                  <p className="text-muted-foreground mb-3">
                    Full Stack Developer and AI enthusiast with over 5 years of
                    experience building scalable web applications. Passionate
                    about sharing knowledge and helping developers grow their
                    skills.
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      View Profile
                    </Button>
                    <Button variant="outline" size="sm">
                      Follow
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Related Articles */}
        <div className="max-w-4xl mx-auto mt-12">
          <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogs
              .filter((b) => b.id !== blog.id)
              .slice(0, 2)
              .map((relatedBlog) => (
                <Card
                  key={relatedBlog.id}
                  className="group hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-40 overflow-hidden rounded-t-lg">
                    <img
                      src={relatedBlog.image}
                      alt={relatedBlog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                      {relatedBlog.title}
                    </CardTitle>
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {relatedBlog.excerpt}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                      <span>{relatedBlog.author}</span>
                      <span>{relatedBlog.readTime}</span>
                    </div>
                    <Link to={`/blogs/${relatedBlog.id}`}>
                      <Button variant="outline" size="sm" className="w-full">
                        Read More
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

BlogDetailSection.displayName = "BlogDetailSection";
