# ÍRIS

Protótipo web responsivo de orientação, formação e oportunidades em tecnologia para mulheres. Todas as pessoas, instituições, locais, vagas e eventos exibidos são dados demonstrativos.

## Executar localmente

Requer Node.js 22 ou superior.

```bash
npm install
npm run dev
```

Validações disponíveis:

```bash
npm run typecheck
npm test
npm run build
```

## Persistência

O protótipo não usa backend ou autenticação real. Perfil, teste vocacional, rotina, comunidade e itens salvos ficam no `localStorage`, na chave `iris:v1`. A tela Perfil permite reiniciar os dados.

## Deploy no Railway

O repositório inclui `Dockerfile`, `Caddyfile` e `railway.json`. No Railway:

1. Crie um projeto a partir deste repositório GitHub.
2. Mantenha o builder detectado como Dockerfile.
3. Gere um domínio público na seção Networking.
4. O Railway fornece `PORT`; o Caddy usa essa variável automaticamente.

A rota `/` funciona como healthcheck. O Caddy redireciona rotas internas para `index.html`, permitindo atualizar qualquer página da aplicação.

## Escopo demonstrativo

- Sem envio de dados para serviços externos.
- Sem agenda real de mentorias, candidaturas ou moderação.
- Sem mapa externo: a visualização cartográfica é intencionalmente ilustrativa.
- Impressão do currículo usa a função nativa do navegador.
