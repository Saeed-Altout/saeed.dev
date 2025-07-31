import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * TermsSection - Terms of Service section.
 */
export function TermsSection() {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent mb-4 sm:mb-6">
            Terms of Service
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Please read these terms carefully before using our services
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle>1. Introduction</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                These Terms of Service ("Terms") govern your use of the services provided by Saeed Al-Tout ("we," "us," or "our"), 
                including but not limited to web development, consulting, and related services.
              </p>
              <p>
                By accessing or using our services, you agree to be bound by these Terms. If you disagree with any part of these terms, 
                then you may not access our services.
              </p>
            </CardContent>
          </Card>

          {/* Services */}
          <Card>
            <CardHeader>
              <CardTitle>2. Services</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                We provide web development, design, consulting, and related technology services. Our services include:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Custom web application development</li>
                <li>Frontend and backend development</li>
                <li>UI/UX design services</li>
                <li>Technical consulting and architecture</li>
                <li>Project management and maintenance</li>
                <li>AI/ML integration services</li>
              </ul>
            </CardContent>
          </Card>

          {/* Payment Terms */}
          <Card>
            <CardHeader>
              <CardTitle>3. Payment Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                Payment terms will be specified in individual project agreements. Generally:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Projects require a 50% deposit before work begins</li>
                <li>Remaining balance due upon project completion</li>
                <li>All payments are non-refundable unless otherwise specified</li>
                <li>Late payments may incur additional fees</li>
              </ul>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card>
            <CardHeader>
              <CardTitle>4. Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                Upon full payment, you will own the intellectual property rights to the custom work created for your project. 
                However, we retain rights to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Underlying frameworks and libraries used</li>
                <li>Reusable code components and templates</li>
                <li>Portfolio rights to showcase completed work</li>
                <li>Third-party assets and licenses</li>
              </ul>
            </CardContent>
          </Card>

          {/* Confidentiality */}
          <Card>
            <CardHeader>
              <CardTitle>5. Confidentiality</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                We respect the confidentiality of your business information and project details. We agree to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Keep all project information confidential</li>
                <li>Not disclose sensitive business information</li>
                <li>Use secure communication channels</li>
                <li>Return or destroy confidential materials upon request</li>
              </ul>
            </CardContent>
          </Card>

          {/* Limitation of Liability */}
          <Card>
            <CardHeader>
              <CardTitle>6. Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                Our liability is limited to the amount paid for the specific service. We are not liable for:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Indirect or consequential damages</li>
                <li>Loss of profits or business opportunities</li>
                <li>Data loss or security breaches</li>
                <li>Third-party service failures</li>
              </ul>
            </CardContent>
          </Card>

          {/* Termination */}
          <Card>
            <CardHeader>
              <CardTitle>7. Termination</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                Either party may terminate a project agreement with written notice. Upon termination:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>You will be charged for work completed to date</li>
                <li>We will deliver all completed work</li>
                <li>Confidentiality obligations remain in effect</li>
                <li>Intellectual property rights transfer as specified</li>
              </ul>
            </CardContent>
          </Card>

          {/* Changes to Terms */}
          <Card>
            <CardHeader>
              <CardTitle>8. Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. 
                Continued use of our services constitutes acceptance of the modified terms.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>9. Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="space-y-2">
                <p><strong>Email:</strong> saeed@flexify.dev</p>
                <p><strong>Phone:</strong> +971 50 123 4567</p>
                <p><strong>Address:</strong> Dubai, UAE</p>
              </div>
            </CardContent>
          </Card>

          {/* Last Updated */}
          <div className="text-center text-sm text-muted-foreground">
            <p>Last updated: January 2024</p>
          </div>
        </div>
      </div>
    </section>
  );
}

TermsSection.displayName = "TermsSection"; 