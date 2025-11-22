import Head from "next/head"
import { useRouter } from "next/router"
import { Bot, Zap, Shield, MessageSquare, ArrowRight, Github } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"

export default function Home() {
  const router = useRouter()

  const handleStartChat = () => {
    const sessionId = Math.random().toString(36).substring(2, 10)
    router.push(`/chat/${sessionId}`)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Head>
        <title>AI Assistant</title>
        <meta name="description" content="Your intelligent conversation partner" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="border-b sticky top-0 z-10 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Bot className="h-6 w-6 text-primary" />
            <span>AI Chat</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#" className="hover:text-foreground transition-colors">Pricing</a>
            <a href="#" className="hover:text-foreground transition-colors">About</a>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Github className="h-5 w-5" />
            </Button>
            <Button onClick={handleStartChat}>Get Started</Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-32 container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">
              New: GPT-4 Turbo Support
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight lg:text-7xl">
              Your Intelligent <span className="text-primary">Conversation Partner</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-[700px] mx-auto">
              Experience the next generation of AI chat. Fast, accurate, and always available to help you solve problems and create content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" className="h-12 px-8 text-lg" onClick={handleStartChat}>
                Start Chatting <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 text-lg">
                View Documentation
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Why Choose Us?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We provide the most advanced AI chat interface with features designed for productivity and ease of use.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <Zap className="h-10 w-10 text-primary mb-4" />
                  <CardTitle>Lightning Fast</CardTitle>
                  <CardDescription>
                    Get instant responses with our optimized infrastructure and streaming support.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  Our system is built for speed, ensuring you never lose your flow state while working.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Shield className="h-10 w-10 text-primary mb-4" />
                  <CardTitle>Secure & Private</CardTitle>
                  <CardDescription>
                    Your data is encrypted and never used for training without your explicit permission.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  Enterprise-grade security ensures your conversations remain confidential.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <MessageSquare className="h-10 w-10 text-primary mb-4" />
                  <CardTitle>Smart Context</CardTitle>
                  <CardDescription>
                    The AI remembers previous interactions within a session for coherent conversations.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  Seamlessly continue conversations where you left off with intelligent context management.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 bg-background">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Bot className="h-5 w-5 text-primary" />
            <span>AI Chat</span>
          </div>
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} AI Chat Interface. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
