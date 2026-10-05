import { useState, type FormEvent } from 'react';
import { ArrowRight, Droplet, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type LoginProps = { onLogin: () => void };

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('operador@aquagestao.com.br');
  const [password, setPassword] = useState('agua2026');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (email.trim() !== 'operador@aquagestao.com.br' || password !== 'agua2026') {
      setError('Confira o e-mail e a senha de demonstração.');
      return;
    }
    localStorage.setItem('aqua-gestao-session', 'active');
    onLogin();
  }

  return (
    <main className="login-screen">
      <section className="login-brand-panel" aria-label="Aqua Gestão">
        <div className="brand-lockup"><span className="brand-mark"><Droplet size={20} fill="currentColor" /></span><span>AQUA<span className="brand-light"> / GESTÃO</span></span></div>
        <div className="brand-message">
          <p className="eyebrow">GESTÃO DE SANEAMENTO</p>
          <h1>Água e cuidado,<br />em cada conexão.</h1>
          <p>Unidades atendidas, solicitações e equipes de campo reunidas em um só lugar.</p>
        </div>
        <div className="brand-footer"><span>ÁGUA · ESGOTO · OPERAÇÃO</span><span>01 — 04</span></div>
      </section>
      <section className="login-form-panel">
        <div className="login-form-wrap">
          <p className="eyebrow">ÁREA DA OPERAÇÃO</p>
          <h2>Bem-vindo de volta</h2>
          <p className="login-intro">Entre na sua conta para acessar o painel.</p>
          <form onSubmit={submit} className="login-form">
            <label htmlFor="email">E-mail</label>
            <Input id="email" type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} required />
            <div className="password-label"><label htmlFor="password">Senha</label></div>
            <div className="password-control">
              <Input id="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required />
              <button type="button" className="password-toggle" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {error && <p className="login-error" role="alert">{error}</p>}
            <Button type="submit" className="login-submit">Entrar <ArrowRight size={17} /></Button>
          </form>
          <div className="demo-credentials"><span className="demo-dot" /><div><strong>Acesso de demonstração</strong><span>operador@aquagestao.com.br · agua2026</span></div></div>
          <p className="login-disclaimer">Autenticação demonstrativa. Conecte um provedor de identidade antes de usar em produção.</p>
        </div>
        <span className="login-copyright">AQUA GESTÃO · 2026</span>
      </section>
    </main>
  );
}