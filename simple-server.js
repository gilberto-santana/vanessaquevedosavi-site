const http = require('http');

const server = http.createServer((req, res) => {
    console.log(`Requisição recebida: ${req.url}`);
    
    const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vanessa Quevedo Savi - Cadastro</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            background: linear-gradient(135deg, #0f172a, #1e293b);
            color: white; 
            padding: 40px; 
            text-align: center;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        .container {
            background: rgba(255, 255, 255, 0.1);
            padding: 40px;
            border-radius: 15px;
            backdrop-filter: blur(10px);
            max-width: 400px;
            width: 100%;
        }
        h1 { color: #5eead4; margin-bottom: 20px; }
        .form-group { margin-bottom: 15px; text-align: left; }
        label { display: block; margin-bottom: 5px; color: #e2e8f0; }
        input { 
            width: 100%; 
            padding: 10px; 
            border: 2px solid #5eead4; 
            border-radius: 5px; 
            background: rgba(15, 23, 42, 0.7);
            color: white;
        }
        button { 
            background: linear-gradient(135deg, #0d9488, #14b8a6, #5eead4);
            color: white; 
            padding: 12px 24px; 
            border: none; 
            border-radius: 5px; 
            cursor: pointer; 
            font-size: 16px; 
            font-weight: bold;
            width: 100%;
            margin-top: 10px;
        }
        button:hover { opacity: 0.9; }
        .success { color: #86efac; margin-top: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Vanessa Quevedo Savi</h1>
        <h2>Cadastro de Usuários</h2>
        <form id="userForm">
            <div class="form-group">
                <label>Nome Completo:</label>
                <input type="text" id="nome" required>
            </div>
            <div class="form-group">
                <label>E-mail:</label>
                <input type="email" id="email" required>
            </div>
            <div class="form-group">
                <label>Telefone:</label>
                <input type="tel" id="telefone" required>
            </div>
            <div class="form-group">
                <label>CPF:</label>
                <input type="text" id="cpf" required>
            </div>
            <div class="form-group">
                <label>Senha:</label>
                <input type="password" id="senha" required>
            </div>
            <button type="submit">Cadastrar Usuário</button>
        </form>
        <div id="success" class="success" style="display: none;">
            ✓ Usuário cadastrado com sucesso!
        </div>
    </div>

    <script>
        document.getElementById('userForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const userData = {
                nome: document.getElementById('nome').value,
                email: document.getElementById('email').value,
                telefone: document.getElementById('telefone').value,
                cpf: document.getElementById('cpf').value,
                senha: document.getElementById('senha').value
            };
            
            console.log('Dados do usuário:', userData);
            
            // Simular salvamento
            setTimeout(() => {
                document.getElementById('success').style.display = 'block';
                document.getElementById('userForm').reset();
                setTimeout(() => {
                    document.getElementById('success').style.display = 'none';
                }, 3000);
            }, 1000);
        });
    </script>
</body>
</html>`;

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log('✅ Servidor funcionando em http://localhost:' + PORT);
});

// Manter o servidor ativo
process.on('uncaughtException', (err) => {
    console.error('Erro não capturado:', err);
});

process.on('unhandledRejection', (err) => {
    console.error('Rejeição não tratada:', err);
});