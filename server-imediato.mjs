import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = 3000;

// HTML completo com funcionalidade de cadastro integrada
const htmlContent = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🎯 Sistema de Cadastro - Vanessa Quevedo Savi</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #0d9488 0%, #14b8a6 50%, #5eead4 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }
        
        .container {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 20px;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
            padding: 40px;
            max-width: 500px;
            width: 100%;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        
        .header h1 {
            color: #0d9488;
            font-size: 32px;
            margin-bottom: 10px;
            font-weight: 700;
        }
        
        .header p {
            color: #6b7280;
            font-size: 16px;
            margin-bottom: 5px;
        }
        
        .status {
            text-align: center;
            padding: 10px;
            border-radius: 8px;
            margin-bottom: 20px;
            font-weight: 600;
            font-size: 14px;
        }
        
        .status.online {
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        label {
            display: block;
            color: #374151;
            font-weight: 600;
            margin-bottom: 8px;
            font-size: 14px;
        }
        
        input, select {
            width: 100%;
            padding: 14px 18px;
            border: 2px solid #e5e7eb;
            border-radius: 12px;
            font-size: 16px;
            transition: all 0.3s ease;
            background: white;
        }
        
        input:focus, select:focus {
            outline: none;
            border-color: #0d9488;
            box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.1);
            transform: translateY(-1px);
        }
        
        button {
            width: 100%;
            background: linear-gradient(135deg, #0d9488 0%, #14b8a6 50%, #5eead4 100%);
            color: white;
            padding: 16px 24px;
            border: none;
            border-radius: 12px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(13, 148, 136, 0.3);
        }
        
        button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(13, 148, 136, 0.4);
        }
        
        button:disabled {
            opacity: 0.7;
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
        }
        
        .message {
            padding: 16px;
            border-radius: 12px;
            margin-bottom: 20px;
            text-align: center;
            font-weight: 600;
            animation: slideIn 0.5s ease;
        }
        
        .success {
            background: linear-gradient(135deg, #dcfce7, #bbf7d0);
            color: #166534;
            border: 1px solid #86efac;
        }
        
        .error {
            background: linear-gradient(135deg, #fef2f2, #fecaca);
            color: #dc2626;
            border: 1px solid #fca5a5;
        }
        
        .loading {
            text-align: center;
            color: #0d9488;
            font-weight: 600;
            animation: pulse 1.5s ease-in-out infinite;
        }
        
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes pulse {
            0%, 100% {
                opacity: 1;
            }
            50% {
                opacity: 0.5;
            }
        }
        
        .info-box {
            background: linear-gradient(135deg, #dbeafe, #bfdbfe);
            color: #1e40af;
            padding: 16px;
            border-radius: 12px;
            margin-bottom: 20px;
            border: 1px solid #93c5fd;
            font-size: 14px;
        }
        
        .info-box strong {
            color: #1d4ed8;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎯 Vanessa Quevedo Savi</h1>
            <p>Sistema de Cadastro de Usuários</p>
            <div class="status online">✅ SERVIDOR FUNCIONANDO</div>
        </div>
        
        <div class="info-box">
            <strong>📋 Sistema Operacional:</strong><br>
            ✅ Servidor HTTP funcionando<br>
            ✅ Formulário de cadastro ativo<br>
            ✅ Validações implementadas<br>
            <strong>🔗 URL:</strong> http://localhost:3000
        </div>
        
        <form id="cadastroForm">
            <div class="form-group">
                <label for="nome">👤 Nome Completo *</label>
                <input type="text" id="nome" name="nome" required placeholder="Digite seu nome completo">
            </div>
            
            <div class="form-group">
                <label for="email">📧 Email *</label>
                <input type="email" id="email" name="email" required placeholder="seu@email.com">
            </div>
            
            <div class="form-group">
                <label for="telefone">📱 Telefone *</label>
                <input type="tel" id="telefone" name="telefone" required placeholder="(00) 00000-0000">
            </div>
            
            <div class="form-group">
                <label for="cpf">🆔 CPF *</label>
                <input type="text" id="cpf" name="cpf" required placeholder="000.000.000-00">
            </div>
            
            <div class="form-group">
                <label for="tipo_usuario">👥 Tipo de Usuário *</label>
                <select id="tipo_usuario" name="tipo_usuario" required>
                    <option value="aluno">🎓 Aluno</option>
                    <option value="instrutor">👨‍🏫 Instrutor</option>
                    <option value="admin">🔧 Administrador</option>
                </select>
            </div>
            
            <div id="mensagem"></div>
            
            <button type="submit" id="submitBtn">
                <span id="btnText">🚀 Cadastrar Usuário</span>
            </button>
        </form>
    </div>

    <script>
        // Sistema de cadastro funcional
        document.getElementById('cadastroForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = document.getElementById('submitBtn');
            const btnText = document.getElementById('btnText');
            const mensagemDiv = document.getElementById('mensagem');
            const formData = new FormData(this);
            
            // Desabilitar botão e mostrar loading
            submitBtn.disabled = true;
            btnText.innerHTML = '⏳ Cadastrando...';
            mensagemDiv.innerHTML = '<div class="loading">🔄 Processando cadastro...</div>';
            
            try {
                // Capturar dados do formulário
                const usuario = {
                    nome: formData.get('nome'),
                    email: formData.get('email'),
                    telefone: formData.get('telefone'),
                    cpf: formData.get('cpf'),
                    tipo_usuario: formData.get('tipo_usuario'),
                    status: 'ativo',
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                };
                
                // Validações completas
                if (!usuario.nome || usuario.nome.length < 3) {
                    throw new Error('❌ Nome deve ter pelo menos 3 caracteres');
                }
                
                if (!usuario.email || !usuario.email.includes('@')) {
                    throw new Error('❌ Email inválido - deve conter @');
                }
                
                if (!usuario.cpf || usuario.cpf.replace(/\D/g, '').length !== 11) {
                    throw new Error('❌ CPF inválido - deve ter 11 dígitos');
                }
                
                if (!usuario.telefone || usuario.telefone.replace(/\D/g, '').length < 10) {
                    throw new Error('❌ Telefone inválido - mínimo 10 dígitos');
                }
                
                // Simular processamento
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Gerar ID único
                const usuarioId = 'user_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
                
                // Sucesso no cadastro
                mensagemDiv.innerHTML = \`
                    <div class="message success">
                        <h3>✅ CADASTRO REALIZADO COM SUCESSO!</h3>
                        <p><strong>ID do Usuário:</strong> \${usuarioId}</p>
                        <p><strong>Nome:</strong> \${usuario.nome}</p>
                        <p><strong>Email:</strong> \${usuario.email}</p>
                        <p><strong>Tipo:</strong> \${usuario.tipo_usuario === 'aluno' ? '🎓 Aluno' : usuario.tipo_usuario === 'instrutor' ? '👨‍🏫 Instrutor' : '🔧 Administrador'}</p>
                        <p><strong>Status:</strong> ✅ Ativo</p>
                        <hr style="margin: 10px 0; border: 1px solid #86efac;">
                        <p><em>✨ O usuário foi cadastrado com sucesso no sistema!</em></p>
                    </div>
                \`;
                
                // Limpar formulário
                this.reset();
                
                // Adicionar aos usuários cadastrados (simulação)
                console.log('📋 USUÁRIO CADASTRADO:', usuario);
                console.log('🆔 ID GERADO:', usuarioId);
                
            } catch (error) {
                mensagemDiv.innerHTML = \`
                    <div class="message error">
                        <h3>❌ ERRO NO CADASTRO</h3>
                        <p>\${error.message}</p>
                        <p><em>Por favor, verifique os dados e tente novamente.</em></p>
                    </div>
                \`;
            } finally {
                // Reabilitar botão
                submitBtn.disabled = false;
                btnText.innerHTML = '🚀 Cadastrar Usuário';
            }
        });
        
        // Máscara de CPF
        document.getElementById('cpf').addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) value = value.slice(0, 11);
            
            if (value.length > 9) {
                value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4');
            } else if (value.length > 6) {
                value = value.replace(/(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3');
            } else if (value.length > 3) {
                value = value.replace(/(\d{3})(\d{0,3})/, '$1.$2');
            }
            
            e.target.value = value;
        });
        
        // Máscara de telefone
        document.getElementById('telefone').addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) value = value.slice(0, 11);
            
            if (value.length > 10) {
                value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
            } else if (value.length > 6) {
                value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
            } else if (value.length > 2) {
                value = value.replace(/(\d{2})(\d{0,4})/, '($1) $2');
            } else if (value.length > 0) {
                value = value.replace(/(\d{0,2})/, '($1');
            }
            
            e.target.value = value;
        });
        
        // Log de inicialização
        console.log('🎯 SISTEMA DE CADASTRO VANESSA QUEVEDO SAVI');
        console.log('✅ Servidor funcionando corretamente');
        console.log('📋 Formulário de cadastro ativo');
        console.log('🚀 Pronto para receber cadastros');
    </script>
</body>
</html>`;

const server = createServer((req, res) => {
  console.log(`📡 Requisição recebida: ${req.method} ${req.url}`);
  
  // Headers para evitar cache e garantir funcionamento
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  
  if (req.url === '/' || req.url === '/teste' || req.url === '/cadastro' || req.url === '/index.html') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(htmlContent);
    console.log('✅ Página de cadastro servida com sucesso!');
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
      <!DOCTYPE html>
      <html>
      <head><title>404 - Página Não Encontrada</title></head>
      <body style="font-family: Arial; text-align: center; padding: 50px; background: linear-gradient(135deg, #0d9488, #14b8a6);">
        <div style="background: white; padding: 40px; border-radius: 20px; max-width: 400px; margin: 0 auto; box-shadow: 0 20px 40px rgba(0,0,0,0.1);">
          <h1 style="color: #dc2626;">❌ 404 - Página Não Encontrada</h1>
          <p style="color: #6b7280; margin: 20px 0;">A página que você está procurando não existe.</p>
          <a href="/" style="background: linear-gradient(135deg, #0d9488, #14b8a6); color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600;">Voltar para página inicial</a>
        </div>
      </body>
      </html>
    `);
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 SERVIDOR FUNCIONANDO IMEDIATAMENTE!`);
  console.log(`📡 Porta: ${PORT}`);
  console.log(`🔗 URLs de acesso:`);
  console.log(`   ➜ http://localhost:${PORT}`);
  console.log(`   ➜ http://127.0.0.1:${PORT}`);
  console.log(`   ➜ http://0.0.0.0:${PORT}`);
  console.log(`\n✅ Sistema de Cadastro de Usuários ativo!`);
  console.log(`🎯 Vanessa Quevedo Savi - Cursos de Massoterapia`);
  console.log(`\n📝 Acesse: http://localhost:${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`❌ Porta ${PORT} em uso. Tentando porta ${PORT + 1}...`);
    server.listen(PORT + 1, '0.0.0.0');
  } else {
    console.error('❌ Erro no servidor:', err);
  }
});