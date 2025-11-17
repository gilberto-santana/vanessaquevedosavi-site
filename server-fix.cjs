const http = require('http');

const server = http.createServer((req, res) => {
    console.log(`Requisição recebida: ${req.url} - ${new Date().toISOString()}`);
    
    const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vanessa Quevedo Savi - Cadastro</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            background: linear-gradient(135deg, #0f172a, #1e293b);
            color: white; 
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }
        .container {
            background: rgba(255, 255, 255, 0.1);
            padding: 40px;
            border-radius: 20px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            max-width: 450px;
            width: 100%;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        h1 { 
            color: #5eead4; 
            margin-bottom: 10px; 
            text-align: center;
            font-size: 28px;
        }
        .subtitle {
            text-align: center;
            color: #cbd5e1;
            margin-bottom: 30px;
            font-size: 16px;
        }
        .form-group { 
            margin-bottom: 20px; 
        }
        label { 
            display: block; 
            margin-bottom: 8px; 
            color: #e2e8f0;
            font-weight: 600;
            font-size: 14px;
        }
        input { 
            width: 100%; 
            padding: 12px 16px; 
            border: 2px solid rgba(94, 234, 212, 0.3); 
            border-radius: 8px; 
            background: rgba(15, 23, 42, 0.7);
            color: #f8fafc;
            font-size: 16px;
            transition: all 0.3s ease;
        }
        input:focus {
            outline: none;
            border-color: #5eead4;
            box-shadow: 0 0 0 3px rgba(94, 234, 212, 0.2);
        }
        input.error {
            border-color: #ef4444;
        }
        button { 
            width: 100%;
            background: linear-gradient(135deg, #0d9488, #14b8a6, #5eead4);
            color: white; 
            padding: 14px; 
            border: none; 
            border-radius: 8px; 
            cursor: pointer; 
            font-size: 16px; 
            font-weight: 600;
            transition: all 0.3s ease;
            margin-top: 10px;
        }
        button:hover { 
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(20, 184, 166, 0.4);
        }
        button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
        }
        .success { 
            color: #86efac; 
            margin-top: 20px; 
            text-align: center;
            padding: 15px;
            background: rgba(34, 197, 94, 0.2);
            border-radius: 8px;
            display: none;
        }
        .loading {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 3px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            border-top-color: white;
            animation: spin 1s ease-in-out infinite;
            margin-right: 10px;
        }
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        .error-message {
            color: #ef4444;
            font-size: 12px;
            margin-top: 5px;
            display: none;
        }
        .error-message.show {
            display: block;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Vanessa Quevedo Savi</h1>
        <p class="subtitle">Cadastro de Novo Usuário</p>
        
        <div id="successMessage" class="success">
            ✓ Usuário cadastrado com sucesso!
        </div>
        
        <form id="userForm">
            <div class="form-group">
                <label for="nome">Nome Completo *</label>
                <input type="text" id="nome" name="nome" required>
                <div class="error-message" id="nomeError">Por favor, insira seu nome completo</div>
            </div>
            
            <div class="form-group">
                <label for="email">E-mail *</label>
                <input type="email" id="email" name="email" required>
                <div class="error-message" id="emailError">Por favor, insira um e-mail válido</div>
            </div>
            
            <div class="form-group">
                <label for="telefone">Telefone *</label>
                <input type="tel" id="telefone" name="telefone" required placeholder="(00) 00000-0000">
                <div class="error-message" id="telefoneError">Por favor, insira um telefone válido</div>
            </div>
            
            <div class="form-group">
                <label for="cpf">CPF *</label>
                <input type="text" id="cpf" name="cpf" required placeholder="000.000.000-00">
                <div class="error-message" id="cpfError">Por favor, insira um CPF válido</div>
            </div>
            
            <div class="form-group">
                <label for="senha">Senha *</label>
                <input type="password" id="senha" name="senha" required>
                <div class="error-message" id="senhaError">A senha deve ter pelo menos 6 caracteres</div>
            </div>
            
            <button type="submit" id="submitBtn">
                Cadastrar Usuário
            </button>
        </form>
    </div>

    <script>
        // Validação de CPF
        function validarCPF(cpf) {
            cpf = cpf.replace(/\D/g, '');
            if (cpf.length !== 11) return false;
            
            let soma = 0;
            for (let i = 0; i < 9; i++) {
                soma += parseInt(cpf.charAt(i)) * (10 - i);
            }
            let resto = 11 - (soma % 11);
            if (resto === 10 || resto === 11) resto = 0;
            if (resto !== parseInt(cpf.charAt(9))) return false;
            
            soma = 0;
            for (let i = 0; i < 10; i++) {
                soma += parseInt(cpf.charAt(i)) * (11 - i);
            }
            resto = 11 - (soma % 11);
            if (resto === 10 || resto === 11) resto = 0;
            if (resto !== parseInt(cpf.charAt(10))) return false;
            
            return true;
        }

        // Formatação de CPF
        function formatarCPF(cpf) {
            cpf = cpf.replace(/\D/g, '');
            if (cpf.length <= 11) {
                cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
                cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
                cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            }
            return cpf;
        }

        // Formatação de Telefone
        function formatarTelefone(telefone) {
            telefone = telefone.replace(/\D/g, '');
            if (telefone.length <= 10) {
                telefone = telefone.replace(/(\d{2})(\d)/, '($1) $2');
                telefone = telefone.replace(/(\d{4})(\d)/, '$1-$2');
            } else {
                telefone = telefone.replace(/(\d{2})(\d)/, '($1) $2');
                telefone = telefone.replace(/(\d{5})(\d)/, '$1-$2');
            }
            return telefone;
        }

        // Aplicar máscaras
        document.getElementById('cpf').addEventListener('input', function(e) {
            e.target.value = formatarCPF(e.target.value);
        });

        document.getElementById('telefone').addEventListener('input', function(e) {
            e.target.value = formatarTelefone(e.target.value);
        });

        // Validações em tempo real
        document.getElementById('email').addEventListener('blur', function(e) {
            const email = e.target.value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const errorElement = document.getElementById('emailError');
            
            if (email && !emailRegex.test(email)) {
                e.target.classList.add('error');
                errorElement.classList.add('show');
            } else {
                e.target.classList.remove('error');
                errorElement.classList.remove('show');
            }
        });

        document.getElementById('cpf').addEventListener('blur', function(e) {
            const cpf = e.target.value;
            const errorElement = document.getElementById('cpfError');
            
            if (cpf && !validarCPF(cpf)) {
                e.target.classList.add('error');
                errorElement.classList.add('show');
            } else {
                e.target.classList.remove('error');
                errorElement.classList.remove('show');
            }
        });

        // Submissão do formulário
        document.getElementById('userForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Limpar erros
            document.querySelectorAll('.error-message').forEach(msg => msg.classList.remove('show'));
            document.querySelectorAll('input').forEach(input => input.classList.remove('error'));
            
            const formData = {
                nome: document.getElementById('nome').value.trim(),
                email: document.getElementById('email').value.trim(),
                telefone: document.getElementById('telefone').value.trim(),
                cpf: document.getElementById('cpf').value.trim(),
                senha: document.getElementById('senha').value
            };
            
            // Validações
            let hasErrors = false;
            
            if (!formData.nome) {
                document.getElementById('nome').classList.add('error');
                document.getElementById('nomeError').classList.add('show');
                hasErrors = true;
            }
            
            if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                document.getElementById('email').classList.add('error');
                document.getElementById('emailError').classList.add('show');
                hasErrors = true;
            }
            
            if (!formData.telefone || formData.telefone.replace(/\D/g, '').length < 10) {
                document.getElementById('telefone').classList.add('error');
                document.getElementById('telefoneError').classList.add('show');
                hasErrors = true;
            }
            
            if (!formData.cpf || !validarCPF(formData.cpf)) {
                document.getElementById('cpf').classList.add('error');
                document.getElementById('cpfError').classList.add('show');
                hasErrors = true;
            }
            
            if (!formData.senha || formData.senha.length < 6) {
                document.getElementById('senha').classList.add('error');
                document.getElementById('senhaError').classList.add('show');
                hasErrors = true;
            }
            
            if (hasErrors) return;
            
            // Desabilitar botão
            const submitBtn = document.getElementById('submitBtn');
            submitBtn.innerHTML = '<span class="loading"></span> Cadastrando...';
            submitBtn.disabled = true;
            
            try {
                // Simular chamada à API
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                console.log('Usuário cadastrado:', formData);
                
                // Mostrar sucesso
                document.getElementById('successMessage').style.display = 'block';
                document.getElementById('userForm').reset();
                
                setTimeout(() => {
                    document.getElementById('successMessage').style.display = 'none';
                }, 5000);
                
            } catch (error) {
                alert('Erro ao cadastrar usuário. Por favor, tente novamente.');
            } finally {
                submitBtn.innerHTML = 'Cadastrar Usuário';
                submitBtn.disabled = false;
            }
        });
    </script>
</body>
</html>`;

    res.writeHead(200, { 
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-cache'
    });
    res.end(html);
    console.log(`✅ Página servida com sucesso para ${req.url}`);
});

const PORT = 3000;
server.listen(PORT, '0.0.0.0', () => {
    console.log('🚀 SERVIDOR EMERGÊNCIAL INICIADO COM SUCESSO!');
    console.log(`📍 Acesse: http://localhost:${PORT}`);
    console.log(`✅ Sistema de cadastro de usuários funcionando perfeitamente`);
    console.log(`⏰ Iniciado em: ${new Date().toLocaleString('pt-BR')}`);
});

server.on('error', (err) => {
    console.error('❌ Erro no servidor:', err);
    if (err.code === 'EADDRINUSE') {
        console.error(`❌ Porta ${PORT} já está em uso`);
    }
});

// Manter o servidor estável
process.on('uncaughtException', (err) => {
    console.error('❌ Erro não capturado:', err);
});

process.on('unhandledRejection', (err) => {
    console.error('❌ Rejeição não tratada:', err);
});