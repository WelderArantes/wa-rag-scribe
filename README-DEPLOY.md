# 🚀 Guia de Deploy - ChatBot RAG

Este guia explica como fazer o deploy da aplicação ChatBot RAG no Google Cloud Platform (GCP).

## 📋 Pré-requisitos

1. **Google Cloud Account**: Tenha uma conta no GCP
2. **gcloud CLI**: Instale o [Google Cloud CLI](https://cloud.google.com/sdk/docs/install)
3. **Projeto GCP**: Crie um projeto no Google Cloud Console
4. **Node.js**: Versão 18 ou superior
5. **Supabase Project**: Configure seu projeto Supabase

## 🔧 Configuração Inicial

### 1. Configurar gcloud CLI

```bash
# Fazer login
gcloud auth login

# Definir projeto (substitua YOUR_PROJECT_ID)
gcloud config set project YOUR_PROJECT_ID

# Verificar configuração
gcloud config list
```

### 2. Habilitar APIs necessárias

```bash
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com
gcloud services enable appengine.googleapis.com
```

## 🚢 Opções de Deploy

### Opção 1: Cloud Run (Recomendado)

Cloud Run é uma plataforma serverless que escala automaticamente.

```bash
# Deploy automático
./deploy.sh

# Ou manualmente:
npm run build
gcloud builds submit --config cloudbuild.yaml .
```

**Vantagens:**
- ✅ Serverless (paga apenas pelo uso)
- ✅ Escala automaticamente (0 a N instâncias)
- ✅ Deploy rápido
- ✅ Suporte a containers

### Opção 2: App Engine

App Engine é uma plataforma totalmente gerenciada.

```bash
# Build e deploy
npm run build
gcloud app deploy app.yaml
```

**Vantagens:**
- ✅ Totalmente gerenciado
- ✅ Integração automática com outros serviços GCP
- ✅ Versionamento automático
- ✅ Fácil configuração

## 🔧 Configurações de Produção

### 1. Variáveis de Ambiente

No **Cloud Run**, defina as variáveis:

```bash
gcloud run services update chatbot-rag \
  --region=us-central1 \
  --set-env-vars="NODE_ENV=production"
```

No **App Engine**, adicione no `app.yaml`:

```yaml
env_variables:
  NODE_ENV: production
```

### 2. Domínio Personalizado

#### Cloud Run:
```bash
gcloud run domain-mappings create \
  --service=chatbot-rag \
  --domain=seudominio.com \
  --region=us-central1
```

#### App Engine:
```bash
gcloud app domain-mappings create seudominio.com
```

### 3. SSL/HTTPS

Ambas as opções incluem SSL automático para domínios personalizados.

## 📊 Monitoramento

### Cloud Logging

Visualize logs em tempo real:

```bash
# Cloud Run
gcloud logs tail "resource.type=cloud_run_revision"

# App Engine
gcloud logs tail "resource.type=gae_app"
```

### Cloud Monitoring

- Acesse o [Cloud Console](https://console.cloud.google.com/)
- Navegue para "Monitoring"
- Configure alertas para CPU, memória e latência

## 🔄 CI/CD com GitHub Actions

Adicione este workflow em `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GCP

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Cloud SDK
      uses: google-github-actions/setup-gcloud@v0
      with:
        project_id: ${{ secrets.GCP_PROJECT_ID }}
        service_account_key: ${{ secrets.GCP_SA_KEY }}
        export_default_credentials: true
    
    - name: Build and Deploy
      run: |
        npm ci
        npm run build
        gcloud builds submit --config cloudbuild.yaml .
```

## 🔐 Segurança

### 1. IAM e Permissions

Configure roles mínimos necessários:

```bash
# Para Cloud Build
gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
  --member="serviceAccount:YOUR_BUILD_SA@YOUR_PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/run.developer"
```

### 2. Firewall Rules

Para App Engine, configure regras de firewall:

```bash
gcloud app firewall-rules create 1000 \
  --source-range="0.0.0.0/0" \
  --action=allow
```

## 💰 Custos Estimados

### Cloud Run
- **Gratuito**: Até 2 milhões de requests/mês
- **Preço**: ~$0.40 por milhão de requests adicionais
- **Memória**: ~$0.0000025 per GB-second

### App Engine
- **Gratuito**: 28 horas/dia de instância F1
- **Preço**: ~$0.05 por hora de instância padrão
- **Bandwidth**: ~$0.12 per GB

## 🛠️ Troubleshooting

### Problemas Comuns

1. **Build Failed**:
   ```bash
   # Verificar logs
   gcloud builds log BUILD_ID
   ```

2. **Service Unavailable**:
   ```bash
   # Verificar status do serviço
   gcloud run services describe chatbot-rag --region=us-central1
   ```

3. **Timeout Issues**:
   ```bash
   # Aumentar timeout (Cloud Run)
   gcloud run services update chatbot-rag \
     --region=us-central1 \
     --timeout=900
   ```

### Logs Úteis

```bash
# Logs em tempo real
gcloud logs tail --format=json

# Logs específicos de erro
gcloud logs read "severity=ERROR" --limit=50
```

## 📞 Suporte

- [Google Cloud Support](https://cloud.google.com/support)
- [Cloud Run Documentation](https://cloud.google.com/run/docs)
- [App Engine Documentation](https://cloud.google.com/appengine/docs)
- [Supabase Documentation](https://supabase.com/docs)

## 🎯 Próximos Passos

Após o deploy:

1. ✅ Configure as credenciais do WhatsApp Business API
2. ✅ Adicione a chave da OpenAI nas configurações
3. ✅ Teste o sistema de autenticação
4. ✅ Configure backup do banco de dados Supabase
5. ✅ Implemente monitoramento personalizado
6. ✅ Configure alertas de disponibilidade

---

**Sucesso no seu deploy! 🎉**