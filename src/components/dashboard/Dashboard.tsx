import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Users, 
  Clock, 
  CheckCircle,
  AlertCircle,
  TrendingUp
} from "lucide-react";
import heroImage from "@/assets/chatbot-hero.jpg";

interface MetricCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  trend?: string;
  status?: 'success' | 'warning' | 'danger';
}

function MetricCard({ title, value, description, icon: Icon, trend, status }: MetricCardProps) {
  const statusColors = {
    success: 'bg-gradient-success',
    warning: 'bg-gradient-to-r from-warning to-warning/80',
    danger: 'bg-gradient-to-r from-danger to-danger/80'
  };

  return (
    <Card className="bg-gradient-card shadow-soft hover:shadow-medium transition-smooth">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className={cn(
          "p-2 rounded-lg",
          status ? statusColors[status] : "bg-gradient-primary"
        )}>
          <Icon className="h-4 w-4 text-white" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
        {trend && (
          <div className="flex items-center mt-2 text-xs text-success">
            <TrendingUp className="h-3 w-3 mr-1" />
            {trend}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function Dashboard() {
  const metrics = [
    {
      title: "Status do Bot",
      value: "Online",
      description: "Funcionando perfeitamente",
      icon: CheckCircle,
      status: 'success' as const
    },
    {
      title: "Conversas Ativas",
      value: 24,
      description: "Sessões em andamento",
      icon: Users,
      trend: "+12% desde ontem"
    },
    {
      title: "Mensagens Hoje",
      value: 187,
      description: "Total processadas",
      icon: MessageSquare,
      trend: "+8% vs. média"
    },
    {
      title: "Tempo de Resposta",
      value: "1.2s",
      description: "Resposta média",
      icon: Clock,
      status: 'success' as const
    }
  ];

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-primary p-8 text-primary-foreground shadow-strong">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Dashboard do ChatBot RAG</h1>
          <p className="text-primary-foreground/90 max-w-md">
            Gerencie seu chatbot inteligente para WhatsApp com tecnologia RAG e OpenAI
          </p>
        </div>
        <div className="absolute inset-0 opacity-20">
          <img 
            src={heroImage} 
            alt="ChatBot Dashboard" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Quick Actions & Status */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Sistema Status */}
        <Card className="bg-gradient-card shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-success" />
              Status do Sistema
            </CardTitle>
            <CardDescription>
              Monitoramento dos serviços essenciais
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">API WhatsApp</span>
              <Badge variant="secondary" className="bg-success text-success-foreground">
                Conectado
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">OpenAI API</span>
              <Badge variant="secondary" className="bg-success text-success-foreground">
                Funcionando
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Base RAG</span>
              <Badge variant="secondary" className="bg-warning text-warning-foreground">
                <AlertCircle className="h-3 w-3 mr-1" />
                Precisa Config.
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Webhook</span>
              <Badge variant="secondary" className="bg-success text-success-foreground">
                Ativo
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-gradient-card shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Atividade Recente
            </CardTitle>
            <CardDescription>
              Últimas interações do sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm">Nova conversa iniciada</p>
                  <p className="text-xs text-muted-foreground">+55 11 99999-8888 • há 2min</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm">Documento RAG atualizado</p>
                  <p className="text-xs text-muted-foreground">FAQ.pdf • há 15min</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-warning rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm">Configuração alterada</p>
                  <p className="text-xs text-muted-foreground">API Settings • há 1h</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}