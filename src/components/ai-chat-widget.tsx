"use client";

import { useState, useRef, useEffect, useTransition } from 'react';
import { Bot, Send, X, Loader, CornerDownLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { clientAIChatAssistant } from '@/ai/flows/client-ai-chat-assistant';
import { teamAIChatAssistant } from '@/ai/flows/team-ai-chat-assistant';
import { Logo } from './logo';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

type AIChatWidgetProps = {
  userType: 'client' | 'team';
};

export function AIChatWidget({ userType }: AIChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isPending, startTransition] = useTransition();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const initialMessage = userType === 'client'
    ? 'Hello! I am the FLUX AI Assistant. How can I help you with your payments today? You can ask about routes, savings, or transaction status.'
    : 'Hello! This is the internal FLUX AI Assistant. How can I help you? You can ask about pending tasks, client metrics, or revenue figures.';

  useEffect(() => {
    if (isOpen) {
      setMessages([{ id: 'initial', role: 'assistant', content: initialMessage }]);
    }
  }, [isOpen, initialMessage]);
  
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isPending) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    startTransition(async () => {
      try {
        let response;
        if (userType === 'client') {
            response = await clientAIChatAssistant(input);
        } else {
            const teamResponse = await teamAIChatAssistant({ query: input });
            response = teamResponse.answer;
        }
        
        const assistantMessage: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: response };
        setMessages((prev) => [...prev, assistantMessage]);
      } catch (error) {
        const errorMessage: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: "Sorry, I'm having trouble connecting. Please try again later." };
        setMessages((prev) => [...prev, errorMessage]);
        console.error('AI Chat Error:', error);
      }
    });
  };

  return (
    <>
      <div className={cn("fixed bottom-6 right-6 z-50 transition-transform duration-300 ease-in-out", isOpen ? "translate-x-[500px]" : "translate-x-0")}>
        <Button size="icon" className="h-14 w-14 rounded-full shadow-lg" onClick={() => setIsOpen(true)}>
          <Bot className="h-7 w-7" />
          <span className="sr-only">Open AI Chat</span>
        </Button>
      </div>

      <div className={cn("fixed bottom-6 right-6 z-50 h-[80vh] max-h-[700px] w-[90vw] max-w-md transform transition-all duration-300 ease-in-out", isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0", "pointer-events-none")}>
        <Card className={cn("h-full w-full flex flex-col shadow-2xl pointer-events-auto", "bg-card/80 backdrop-blur-xl")}>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback><Logo /></AvatarFallback>
              </Avatar>
              <CardTitle className='text-base'>FLUX AI Assistant</CardTitle>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden p-0">
            <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={cn("flex items-start gap-3", message.role === 'user' ? 'justify-end' : '')}>
                    {message.role === 'assistant' && (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary text-primary-foreground"><Logo className="h-5 w-5"/></AvatarFallback>
                      </Avatar>
                    )}
                    <div className={cn("max-w-[80%] rounded-lg p-3 text-sm", message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                      {message.content}
                    </div>
                  </div>
                ))}
                {isPending && (
                  <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary text-primary-foreground"><Logo className="h-5 w-5"/></AvatarFallback>
                    </Avatar>
                    <div className="max-w-[80%] rounded-lg p-3 text-sm bg-muted">
                      <Loader className="h-4 w-4 animate-spin" />
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter className="p-4 border-t">
            <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything..."
                autoComplete="off"
                disabled={isPending}
                className="flex-1"
              />
              <Button type="submit" size="icon" disabled={isPending || !input.trim()}>
                {isPending ? <Loader className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
