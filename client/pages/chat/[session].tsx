import React, { useState, useRef, useEffect } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import { 
  Send, 
  Bot, 
  User, 
  Plus, 
  MessageSquare, 
  Settings, 
  Menu, 
  MoreVertical
} from "lucide-react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { ScrollArea } from "../../components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { cn } from "../../lib/utils"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

type Session = {
  id: string
  title: string
  date: string
}

const MOCK_SESSIONS: Session[] = [
  { id: "1", title: "React Component Help", date: "Today" },
  { id: "2", title: "Explain Quantum Physics", date: "Yesterday" },
  { id: "3", title: "Dinner Recipes", date: "Previous 7 Days" },
]

export default function ChatSession() {
  const router = useRouter()
  const { session } = router.query
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Initialize with a welcome message
  useEffect(() => {
    if (!session) return;
    setMessages(prev => {
      if (prev.length > 0) return prev;
      return [
        {
          id: "init",
          role: "assistant",
          content: "Hello! I'm your AI assistant. How can I help you today?",
          timestamp: new Date()
        }
      ];
    });
  }, [session]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages])

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate network delay and AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `I received your message: "${userMessage.content}". As an AI model, I can process this information and respond accordingly. This is a simulated response for session ${session}.`,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiMessage])
      setIsLoading(false)
    }, 1000)
  }

  const handleNewChat = () => {
    const newSessionId = Math.random().toString(36).substring(2, 10)
    router.push(`/chat/${newSessionId}`)
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Head>
        <title>Chat Session - AI Assistant</title>
      </Head>

      {/* Sidebar - Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed md:relative z-50 w-64 h-full bg-muted/20 border-r flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <Bot className="h-5 w-5" />
            <span>AI Chat</span>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarOpen(false)}>
            <Menu className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="px-4 pb-4">
          <Button onClick={handleNewChat} className="w-full justify-start" variant="outline">
            <Plus className="mr-2 h-4 w-4" /> New Chat
          </Button>
        </div>

        <ScrollArea className="flex-1 px-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-xs font-medium text-muted-foreground px-2">History</h3>
              {MOCK_SESSIONS.map((s) => (
                <Button
                  key={s.id}
                  variant="ghost"
                  className="w-full justify-start font-normal h-auto py-2 px-2 truncate"
                  onClick={() => router.push(`/chat/${s.id}`)}
                >
                  <MessageSquare className="mr-2 h-4 w-4 shrink-0" />
                  <span className="truncate text-left">{s.title}</span>
                </Button>
              ))}
            </div>
          </div>
        </ScrollArea>

        <div className="p-4 border-t space-y-2">
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="mr-2 h-4 w-4" /> Settings
          </Button>
          <div className="flex items-center gap-2 p-2 rounded-md hover:bg-accent cursor-pointer">
            <Avatar className="h-8 w-8">
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">User Name</p>
              <p className="text-xs text-muted-foreground truncate">user@example.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-14 border-b flex items-center px-4 justify-between bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <span className="font-medium">Session: {session}</span>
              <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">GPT-4</span>
            </div>
          </div>
          <Button variant="ghost" size="icon">
             <MoreVertical className="h-5 w-5" />
          </Button>
        </header>

        <div className="flex-1 relative overflow-hidden" ref={scrollRef}>
           <ScrollArea className="h-full p-4 md:p-8">
             <div className="max-w-3xl mx-auto space-y-6 pb-4">
               {messages.map((msg) => (
                 <div
                   key={msg.id}
                   className={cn(
                     "flex gap-4",
                     msg.role === "assistant" ? "flex-row" : "flex-row-reverse"
                   )}
                 >
                   <Avatar className="h-8 w-8 border shrink-0">
                     {msg.role === "assistant" ? (
                       <>
                         <AvatarImage src="/bot-avatar.png" />
                         <AvatarFallback><Bot className="h-4 w-4" /></AvatarFallback>
                       </>
                     ) : (
                       <>
                         <AvatarImage src="/user-avatar.png" />
                         <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                       </>
                     )}
                   </Avatar>
                   
                   <div 
                    className={cn(
                      "rounded-lg p-4 max-w-[80%]",
                      msg.role === "assistant" 
                        ? "bg-muted" 
                        : "bg-primary text-primary-foreground"
                    )}
                   >
                     <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                   </div>
                 </div>
               ))}
               
               {isLoading && (
                 <div className="flex gap-4">
                   <Avatar className="h-8 w-8 border shrink-0">
                     <AvatarFallback><Bot className="h-4 w-4" /></AvatarFallback>
                   </Avatar>
                   <div className="bg-muted rounded-lg p-4">
                     <div className="flex space-x-2">
                       <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                       <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                       <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce"></div>
                     </div>
                   </div>
                 </div>
               )}
             </div>
           </ScrollArea>
        </div>

        <div className="p-4 border-t bg-background">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading || !input.trim()}>
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </form>
            <p className="text-xs text-center text-muted-foreground mt-2">
              AI can make mistakes. Consider checking important information.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

