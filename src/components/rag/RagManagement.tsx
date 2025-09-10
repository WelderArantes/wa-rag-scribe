import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Database,
  Upload,
  FileText,
  Trash2,
  RefreshCw,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Document {
  id: string;
  name: string;
  content: string;
  status: 'processing' | 'ready' | 'error';
  uploadedAt: string;
  size: string;
}

export function RagManagement() {
  const [isLoading, setIsLoading] = useState(false);
  const [newContent, setNewContent] = useState("");
  const { toast } = useToast();

  const [documents] = useState<Document[]>([
    {
      id: "1",
      name: "FAQ Geral",
      content: "Perguntas frequentes sobre produtos e serviços...",
      status: "ready",
      uploadedAt: "2024-01-15",
      size: "2.3 KB"
    },
    {
      id: "2", 
      name: "Manual do Produto",
      content: "Instruções detalhadas de uso do produto...",
      status: "processing",
      uploadedAt: "2024-01-15",
      size: "15.7 KB"
    },
    {
      id: "3",
      name: "Políticas da Empresa",
      content: "Diretrizes e políticas internas...",
      status: "error",
      uploadedAt: "2024-01-14",
      size: "8.1 KB"
    }
  ]);

  const handleSyncRag = async () => {
    if (!newContent.trim()) {
      toast({
        title: "Conteúdo vazio",
        description: "Por favor, adicione algum conteúdo antes de sincronizar.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    // Simulate RAG processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Base RAG atualizada!",
      description: "O conhecimento foi processado e está pronto para uso.",
    });
    
    setNewContent("");
    setIsLoading(false);
  };

  const getStatusBadge = (status: Document['status']) => {
    switch (status) {
      case 'ready':
        return (
          <Badge className="bg-success text-success-foreground">
            <CheckCircle className="h-3 w-3 mr-1" />
            Pronto
          </Badge>
        );
      case 'processing':
        return (
          <Badge className="bg-warning text-warning-foreground">
            <Clock className="h-3 w-3 mr-1" />
            Processando
          </Badge>
        );
      case 'error':
        return (
          <Badge className="bg-danger text-danger-foreground">
            <AlertCircle className="h-3 w-3 mr-1" />
            Erro
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Base de Conhecimento RAG</h1>
        <p className="text-muted-foreground mt-2">
          Gerencie o conteúdo que o chatbot usa para responder perguntas
        </p>
      </div>

      {/* Add New Content */}
      <Card className="bg-gradient-card shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-primary" />
            Adicionar Conhecimento
          </CardTitle>
          <CardDescription>
            Insira texto, FAQs, manuais ou qualquer conteúdo relevante
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Cole aqui o conteúdo que você quer adicionar à base de conhecimento do chatbot. Pode ser FAQs, manuais, informações sobre produtos, políticas da empresa, etc."
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            rows={8}
            className="resize-none"
          />
          
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {newContent.length} caracteres
            </p>
            <Button 
              onClick={handleSyncRag}
              disabled={isLoading || !newContent.trim()}
              className="bg-gradient-primary text-primary-foreground shadow-soft hover:shadow-medium"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                  Processando...
                </>
              ) : (
                <>
                  <Database className="h-4 w-4 mr-2" />
                  Sincronizar RAG
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Documents List */}
      <Card className="bg-gradient-card shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Documentos na Base
          </CardTitle>
          <CardDescription>
            Conteúdo atual disponível para o chatbot
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {documents.map((doc) => (
              <div 
                key={doc.id}
                className="flex items-center justify-between p-4 border rounded-lg bg-background/50 hover:bg-background/80 transition-smooth"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-medium">{doc.name}</h3>
                    {getStatusBadge(doc.status)}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {doc.content}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span>Adicionado em {doc.uploadedAt}</span>
                    <span>{doc.size}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toast({
                      title: "Reprocessando documento",
                      description: `${doc.name} será reprocessado.`
                    })}
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toast({
                      title: "Documento removido",
                      description: `${doc.name} foi removido da base.`,
                      variant: "destructive"
                    })}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {documents.length === 0 && (
            <div className="text-center py-8">
              <Database className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Nenhum documento encontrado</h3>
              <p className="text-muted-foreground">
                Adicione seu primeiro conteúdo para começar a usar o RAG
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* RAG Statistics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-gradient-card shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total de Documentos</p>
                <p className="text-2xl font-bold">{documents.length}</p>
              </div>
              <FileText className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Documentos Prontos</p>
                <p className="text-2xl font-bold text-success">
                  {documents.filter(d => d.status === 'ready').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Última Sincronização</p>
                <p className="text-sm font-medium">há 2 horas</p>
              </div>
              <RefreshCw className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}