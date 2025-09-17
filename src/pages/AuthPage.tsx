import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { MessageSquare, Bot, Zap, Lock } from 'lucide-react';
import chatbotHero from '@/assets/chatbot-hero.jpg';

export const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn, signUp } = useAuth();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const result = await signIn(email, password);
    
    if (result.error) {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const result = await signUp(email, password, fullName);
    
    if (result.error) {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-primary/5 flex">
      {/* Left Panel - Hero */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-90" />
        <img 
          src={chatbotHero}
          alt="Chatbot RAG" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-primary-foreground p-12">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center space-x-2 mb-8">
              <Bot className="h-12 w-12" />
              <h1 className="text-4xl font-bold">ChatBot RAG</h1>
            </div>
            
            <h2 className="text-2xl font-semibold">
              Plataforma Completa de Gestão
            </h2>
            
            <p className="text-lg opacity-90 max-w-md">
              Gerencie seu chatbot inteligente com tecnologia RAG integrada ao WhatsApp
            </p>
            
            <div className="grid grid-cols-1 gap-4 mt-8 max-w-sm">
              <div className="flex items-center space-x-3">
                <MessageSquare className="h-6 w-6 text-primary-glow" />
                <span>Conversas em Tempo Real</span>
              </div>
              <div className="flex items-center space-x-3">
                <Zap className="h-6 w-6 text-primary-glow" />
                <span>IA Avançada com RAG</span>
              </div>
              <div className="flex items-center space-x-3">
                <Lock className="h-6 w-6 text-primary-glow" />
                <span>Seguro e Confiável</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Auth Forms */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Bot className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">ChatBot RAG</h1>
            </div>
            <p className="text-muted-foreground">Painel de Administração</p>
          </div>

          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Entrar</TabsTrigger>
              <TabsTrigger value="signup">Cadastrar</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin">
              <Card>
                <CardHeader>
                  <CardTitle>Fazer Login</CardTitle>
                  <CardDescription>
                    Entre com suas credenciais para acessar o painel
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="password">Senha</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>

                    {error && (
                      <div className="text-danger text-sm bg-danger/10 p-3 rounded-md">
                        {error}
                      </div>
                    )}

                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-primary hover:opacity-90" 
                      disabled={loading}
                    >
                      {loading ? 'Entrando...' : 'Entrar'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="signup">
              <Card>
                <CardHeader>
                  <CardTitle>Criar Conta</CardTitle>
                  <CardDescription>
                    Crie sua conta para acessar o painel administrativo
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Nome Completo</Label>
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="Seu nome completo"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="signupEmail">Email</Label>
                      <Input
                        id="signupEmail"
                        type="email"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="signupPassword">Senha</Label>
                      <Input
                        id="signupPassword"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                      />
                    </div>

                    {error && (
                      <div className="text-danger text-sm bg-danger/10 p-3 rounded-md">
                        {error}
                      </div>
                    )}

                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-primary hover:opacity-90" 
                      disabled={loading}
                    >
                      {loading ? 'Criando conta...' : 'Criar Conta'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};