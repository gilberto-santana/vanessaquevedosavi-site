import { useSupabase } from '@/hooks/use-supabase'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

export function SupabaseAuthExample() {
  const { user, signIn, signUp, signOut, supabase } = useSupabase()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    
    const { error } = await signIn(email, password)
    if (error) {
      setMessage(`Erro: ${error.message}`)
    } else {
      setMessage('Login realizado com sucesso!')
    }
    setLoading(false)
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    
    const { error } = await signUp(email, password)
    if (error) {
      setMessage(`Erro: ${error.message}`)
    } else {
      setMessage('Cadastro realizado! Verifique seu email.')
    }
    setLoading(false)
  }

  const handleSignOut = async () => {
    await signOut()
    setMessage('Logout realizado!')
  }

  const testDatabase = async () => {
    try {
      // Exemplo de criação de tabela (você precisa criar no dashboard primeiro)
      const { data, error } = await supabase
        .from('usuarios') // Substitua pelo nome da sua tabela
        .select('*')
        .limit(5)

      if (error) {
        setMessage(`Erro no banco: ${error.message}`)
      } else {
        setMessage(`Dados encontrados: ${data?.length || 0} registros`)
      }
    } catch (error) {
      setMessage('Erro ao conectar com o banco de dados')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Supabase Auth Exemplo</CardTitle>
          <CardDescription>
            {user ? `Logado como: ${user.email}` : 'Faça login ou cadastre-se'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!user ? (
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="******"
                  required
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" disabled={loading}>
                  {loading ? 'Carregando...' : 'Entrar'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleSignUp}
                  disabled={loading}
                >
                  Cadastrar
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <Button onClick={testDatabase} variant="outline">
                Testar Banco de Dados
              </Button>
              <Button onClick={handleSignOut} variant="destructive">
                Sair
              </Button>
            </div>
          )}
          
          {message && (
            <div className="p-3 bg-blue-50 text-blue-700 rounded text-sm">
              {message}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}