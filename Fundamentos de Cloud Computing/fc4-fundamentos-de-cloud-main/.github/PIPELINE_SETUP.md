# 🚀 Pipeline CI/CD - Configuração

## Pré-requisitos na EC2

### 1. Preparar diretório da aplicação
```bash
sudo mkdir -p /opt/finance-tracker
sudo chown ec2-user:ec2-user /opt/finance-tracker
mv ~/finance-tracker /opt/finance-tracker/
mv ~/finance-app.env /opt/finance-tracker/
chmod 600 /opt/finance-tracker/finance-app.env
```

### 2. Atualizar serviço systemd
```bash
sudo nano /etc/systemd/system/finance-tracker.service
```

Conteúdo:
```ini
[Unit]
Description=Finance Tracker API
After=network.target

[Service]
Type=simple
User=ec2-user
WorkingDirectory=/opt/finance-tracker
EnvironmentFile=/opt/finance-tracker/finance-app.env
ExecStart=/opt/finance-tracker/finance-tracker
Restart=on-failure
RestartSec=5
StandardOutput=append:/opt/finance-tracker/finance-tracker.log
StandardError=append:/opt/finance-tracker/finance-tracker.log

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl restart finance-tracker
sudo systemctl enable finance-tracker
```

---

## Configurar Chaves SSH

### 1. Gerar chave SSH (no seu computador)
```bash
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/finance-tracker-deploy
```

### 2. Adicionar chave pública na EC2
```bash
# Ver chave pública
cat ~/.ssh/finance-tracker-deploy.pub

# Conectar na EC2 e adicionar
ssh -i sua-chave.pem ec2-user@SEU-IP-EC2
nano ~/.ssh/authorized_keys
# Cole a chave pública no final
# Salve: Ctrl+O, Enter, Ctrl+X

chmod 600 ~/.ssh/authorized_keys
```

### 3. Testar conexão
```bash
ssh -i ~/.ssh/finance-tracker-deploy ec2-user@SEU-IP-EC2
```

---

## Configurar GitHub Secrets

GitHub → Repositório → Settings → Secrets and variables → Actions → New repository secret

Adicione:

| Name | Value |
|------|-------|
| **EC2_HOST** | IP ou DNS da EC2 (ex: `3.85.123.45`) |
| **EC2_USER** | `ec2-user` |
| **EC2_SSH_KEY** | Conteúdo completo de `~/.ssh/finance-tracker-deploy` |

Para copiar a chave privada:
```bash
cat ~/.ssh/finance-tracker-deploy
# Copie TUDO (incluindo BEGIN e END)
```

---

## Como usar o Pipeline

### Deploy Automático
- Faça push para a branch `main`
- O pipeline será executado automaticamente
- Acompanhe em: GitHub → Actions

### Deploy Manual
- GitHub → Actions → Deploy to EC2
- Clique em "Run workflow"
- Selecione a branch → "Run workflow"

---

## Fluxo do Pipeline

1. ✅ Checkout do código
2. ✅ Setup Go 1.22
3. ✅ Executar testes (`go test ./...`)
4. ✅ Build do binário Linux AMD64
5. ✅ Upload via SCP para EC2
6. ✅ Parar serviço
7. ✅ Backup da versão anterior
8. ✅ Instalar nova versão
9. ✅ Iniciar serviço
10. ✅ Health check (`/health`)
11. ✅ Rollback automático se falhar

---

## Troubleshooting

### Ver logs da aplicação na EC2
```bash
sudo journalctl -u finance-tracker -f
tail -f /opt/finance-tracker/finance-tracker.log
```

### Ver status do serviço
```bash
sudo systemctl status finance-tracker
```

### Fazer rollback manual
```bash
sudo systemctl stop finance-tracker
sudo mv /opt/finance-tracker/finance-tracker.backup /opt/finance-tracker/finance-tracker
sudo systemctl start finance-tracker
```

### Testar conexão SSH do GitHub
```bash
ssh -i ~/.ssh/finance-tracker-deploy ec2-user@SEU-IP-EC2 "echo 'Conexão OK!'"
```

---

## Melhorias Futuras

- [ ] Notificações no Slack/Discord
- [ ] Deploy com Blue-Green
- [ ] Testes de integração
- [ ] Versionamento de releases
- [ ] Deploy em múltiplas instâncias
- [ ] Métricas e monitoramento
