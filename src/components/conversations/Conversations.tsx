import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  History,
  Search,
  MessageSquare,
  User,
  Bot,
  Clock,
  Phone
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

interface Conversation {
  id: string;
  userPhone: string;
  userName: string;
  lastMessage: string;
  lastMessageTime: string;
  status: 'active' | 'closed';
  messageCount: number;
  messages: Message[];
}

export function Conversations() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

  const [conversations] = useState<Conversation[]>([
    {
      id: "1",
      userPhone: "+55 11 99999-8888",
      userName: "João Silva",
      lastMessage: "Obrigado pela ajuda!",
      lastMessageTime: "2024-01-15 14:30",
      status: "closed",
      messageCount: 8,
      messages: [
        { id: "1", content: "Olá, preciso de ajuda com meu pedido", sender: "user", timestamp: "14:25" },
        { id: "2", content: "Olá! Claro, vou te ajudar. Qual é o número do seu pedido?", sender: "bot", timestamp: "14:25" },
        { id: "3", content: "É o pedido #12345", sender: "user", timestamp: "14:26" },
        { id: "4", content: "Encontrei seu pedido! Ele está em processo de entrega e deve chegar até amanhã.", sender: "bot", timestamp: "14:27" },
        { id: "5", content: "Ótimo! Você pode me informar o código de rastreamento?", sender: "user", timestamp: "14:28" },
        { id: "6", content: "Sim! O código de rastreamento é: BR123456789BR. Você pode acompanhar em tempo real no site dos Correios.", sender: "bot", timestamp: "14:29" },
        { id: "7", content: "Perfeito! Muito obrigado pela agilidade.", sender: "user", timestamp: "14:30" },
        { id: "8", content: "De nada! Estou sempre aqui para ajudar. Tenha um ótimo dia!", sender: "bot", timestamp: "14:30" }
      ]
    },
    {
      id: "2",
      userPhone: "+55 11 98888-7777",
      userName: "Maria Santos",
      lastMessage: "Como posso fazer a devolução?",
      lastMessageTime: "2024-01-15 15:45",
      status: "active",
      messageCount: 3,
      messages: [
        { id: "1", content: "Oi, comprei um produto que não ficou bom", sender: "user", timestamp: "15:40" },
        { id: "2", content: "Olá Maria! Sinto muito que o produto não atendeu suas expectativas. Posso te ajudar com a troca ou devolução. Qual produto você gostaria de devolver?", sender: "bot", timestamp: "15:41" },
        { id: "3", content: "Como posso fazer a devolução?", sender: "user", timestamp: "15:45" }
      ]
    },
    {
      id: "3",
      userPhone: "+55 11 97777-6666",
      userName: "Pedro Costa",
      lastMessage: "Qual o horário de funcionamento?",
      lastMessageTime: "2024-01-15 16:20",
      status: "active",
      messageCount: 1,
      messages: [
        { id: "1", content: "Qual o horário de funcionamento?", sender: "user", timestamp: "16:20" }
      ]
    }
  ]);

  const filteredConversations = conversations.filter(conv => 
    conv.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.userPhone.includes(searchTerm) ||
    conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Conversas</h1>
        <p className="text-muted-foreground mt-2">
          Visualize e gerencie todas as conversas do chatbot
        </p>
      </div>

      {/* Search */}
      <Card className="bg-gradient-card shadow-soft">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, telefone ou mensagem..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Conversations List */}
      <Card className="bg-gradient-card shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5 text-primary" />
            Lista de Conversas
          </CardTitle>
          <CardDescription>
            Total de {filteredConversations.length} conversas encontradas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredConversations.map((conversation) => (
              <Dialog key={conversation.id}>
                <DialogTrigger asChild>
                  <div className="flex items-center justify-between p-4 border rounded-lg bg-background/50 hover:bg-background/80 transition-smooth cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-primary-foreground" />
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium truncate">{conversation.userName}</h3>
                          <Badge 
                            variant="secondary"
                            className={
                              conversation.status === 'active' 
                                ? "bg-success text-success-foreground" 
                                : "bg-muted text-muted-foreground"
                            }
                          >
                            {conversation.status === 'active' ? 'Ativa' : 'Encerrada'}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                          <Phone className="h-3 w-3" />
                          <span>{conversation.userPhone}</span>
                        </div>
                        
                        <p className="text-sm text-muted-foreground truncate">
                          {conversation.lastMessage}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2 text-right">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{conversation.lastMessageTime.split(' ')[1]}</span>
                      </div>
                      <Badge variant="outline">
                        {conversation.messageCount} mensagens
                      </Badge>
                    </div>
                  </div>
                </DialogTrigger>
                
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-primary" />
                      Conversa com {conversation.userName}
                    </DialogTitle>
                  </DialogHeader>
                  
                  <div className="flex flex-col h-[60vh]">
                    <div className="flex items-center gap-4 p-4 border-b bg-muted/50 rounded-t-lg">
                      <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-medium">{conversation.userName}</h3>
                        <p className="text-sm text-muted-foreground">{conversation.userPhone}</p>
                      </div>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {conversation.messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-[70%] ${
                            message.sender === 'user' 
                              ? 'bg-chat-outgoing text-primary-foreground' 
                              : 'bg-chat-incoming text-foreground'
                          } rounded-lg p-3 shadow-soft`}>
                            <div className="flex items-center gap-2 mb-1">
                              {message.sender === 'bot' ? (
                                <Bot className="h-4 w-4 text-primary" />
                              ) : (
                                <User className="h-4 w-4" />
                              )}
                              <span className="text-xs opacity-70">
                                {message.sender === 'bot' ? 'ChatBot' : conversation.userName}
                              </span>
                            </div>
                            <p className="text-sm">{message.content}</p>
                            <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>

          {filteredConversations.length === 0 && (
            <div className="text-center py-8">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Nenhuma conversa encontrada</h3>
              <p className="text-muted-foreground">
                {searchTerm ? 'Tente ajustar os termos de busca' : 'As conversas aparecerão aqui quando iniciadas'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}