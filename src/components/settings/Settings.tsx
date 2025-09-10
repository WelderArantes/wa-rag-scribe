import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Settings as SettingsIcon,
  Key,
  MessageSquare,
  CheckCircle,
  AlertTriangle,
  Loader2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function Settings() {
  const [isLoading, setIsLoading] = useState(false);
  const [openaiKey, setOpenaiKey] = useState("");
  const [whatsappToken, setWhatsappToken] = useState("");
  const [whatsappPhoneId, setWhatsappPhoneId] = useState("");
  const [webhookUrl, setWebhookUrl] = useState("");
  const { toast } = useToast();

  const handleSaveSettings = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Configurações salvas!",
      description: "As credenciais foram atualizadas com sucesso.",
    });
    
    setIsLoading(false);
  };

  const handleTestConnection = async (type: 'openai' | 'whatsapp') => {
    setIsLoading(true);
    // Simulate API test
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: `Teste ${type === 'openai' ? 'OpenAI' : 'WhatsApp'} realizado!`,
      description: "Conexão estabelecida com sucesso.",
    });
    
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Configurações</h1>
        <p className="text-muted-foreground mt-2">
          Configure as integrações e credenciais do seu chatbot
        </p>
      </div>

      {/* OpenAI Configuration */}
      <Card className="bg-gradient-card shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5 text-primary" />
            Configuração OpenAI
          </CardTitle>
          <CardDescription>
            Configure sua chave da API OpenAI para processar as mensagens
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="openai-key">Chave da API OpenAI</Label>
            <div className="flex gap-2">
              <Input
                id="openai-key"
                type="password"
                placeholder="sk-..."
                value={openaiKey}
                onChange={(e) => setOpenaiKey(e.target.value)}
                className="flex-1"
              />
              <Button 
                onClick={() => handleTestConnection('openai')}
                disabled={!openaiKey || isLoading}
                variant="outline"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Testar"
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Você pode obter sua chave em{" "}
              <a 
                href="https://platform.openai.com/api-keys" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                platform.openai.com
              </a>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-success" />
            <span className="text-sm">Status:</span>
            <Badge variant="secondary" className="bg-success text-success-foreground">
              Configurado
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* WhatsApp Configuration */}
      <Card className="bg-gradient-card shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            Configuração WhatsApp Business
          </CardTitle>
          <CardDescription>
            Configure as credenciais da API do WhatsApp Business
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="whatsapp-token">Token de Acesso</Label>
              <Input
                id="whatsapp-token"
                type="password"
                placeholder="EAAG..."
                value={whatsappToken}
                onChange={(e) => setWhatsappToken(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone-id">ID do Telefone</Label>
              <Input
                id="phone-id"
                placeholder="123456789012345"
                value={whatsappPhoneId}
                onChange={(e) => setWhatsappPhoneId(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="webhook-url">URL do Webhook</Label>
            <Input
              id="webhook-url"
              placeholder="https://seu-dominio.com/api/webhook"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Configure este URL no Facebook Developer Console
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              <span className="text-sm">Status:</span>
              <Badge variant="secondary" className="bg-warning text-warning-foreground">
                Pendente
              </Badge>
            </div>
            <Button 
              onClick={() => handleTestConnection('whatsapp')}
              disabled={!whatsappToken || !whatsappPhoneId || isLoading}
              variant="outline"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Testar Conexão"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Webhook Configuration */}
      <Card className="bg-gradient-card shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SettingsIcon className="h-5 w-5 text-primary" />
            Configurações Avançadas
          </CardTitle>
          <CardDescription>
            Configurações adicionais do sistema
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Modelo OpenAI</Label>
              <select className="w-full px-3 py-2 border border-input rounded-md bg-background">
                <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                <option value="gpt-4">GPT-4</option>
                <option value="gpt-4-turbo">GPT-4 Turbo</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Limite de Tokens</Label>
              <Input type="number" placeholder="4000" defaultValue="4000" />
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label>Temperatura da IA (0-2)</Label>
            <Input type="number" step="0.1" min="0" max="2" defaultValue="0.7" />
            <p className="text-xs text-muted-foreground">
              Controla a criatividade das respostas (0 = mais focado, 2 = mais criativo)
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button 
          onClick={handleSaveSettings}
          disabled={isLoading}
          className="bg-gradient-primary text-primary-foreground shadow-soft hover:shadow-medium"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Salvando...
            </>
          ) : (
            "Salvar Configurações"
          )}
        </Button>
      </div>
    </div>
  );
}