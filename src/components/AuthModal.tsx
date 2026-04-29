import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, User, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AuthModalProps {
  onClose: () => void;
}

type AuthView = 'login' | 'register' | 'forgot';

export default function AuthModal({ onClose }: AuthModalProps) {
  const [view, setView] = useState<AuthView>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      login(email, fullName || email.split('@')[0]);
      onClose();
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    
    if (!acceptedTerms) {
      setError('Debes aceptar los términos y condiciones');
      return;
    }
    
    login(email, fullName);
    onClose();
  };

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
    }
  };

  const resetState = (newView: AuthView) => {
    setView(newView);
    setError('');
    setIsSubmitted(false);
  };

  const inputClasses = "w-full border-b border-zinc-200 pl-10 py-4 text-xs font-bold uppercase tracking-widest outline-none transition-all focus:border-[#0066CC] placeholder:text-zinc-300 bg-transparent";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative bg-white/90 backdrop-blur-[20px] w-full max-w-md p-12 shadow-2xl rounded-[32px] overflow-hidden"
      >
        <button
          onClick={onClose}
          className="absolute top-8 right-8 p-2 hover:bg-zinc-100/50 rounded-full transition-colors z-10"
        >
          <X size={20} />
        </button>

        <AnimatePresence mode="wait">
          {view === 'login' && (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl font-serif font-black italic tracking-tighter mb-3 text-[#1D1D1F]">BIENVENIDO</h2>
                <p className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#86868B]">
                  Accede al archivo secreto
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-8">
                <div className="space-y-6">
                  <div className="relative group">
                    <Mail size={16} className="absolute left-0 top-1/2 -translate-y-1/2 text-[#86868B] group-focus-within:text-[#0066CC] transition-colors" />
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Correo Electrónico"
                      className={inputClasses}
                    />
                  </div>
                  <div className="relative group">
                    <Lock size={16} className="absolute left-0 top-1/2 -translate-y-1/2 text-[#86868B] group-focus-within:text-[#0066CC] transition-colors" />
                    <input
                      required
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Contraseña"
                      className={inputClasses}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button 
                    type="button"
                    onClick={() => resetState('forgot')}
                    className="text-[9px] uppercase font-bold tracking-widest text-[#86868B] hover:text-[#1D1D1F] transition-colors"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#1D1D1F] text-white py-4 rounded-full text-xs font-bold uppercase tracking-[0.4em] hover:bg-[#323234] transition-all active:scale-95 shadow-xl shadow-black/10"
                >
                  Entrar
                </button>
              </form>

              <div className="mt-12 text-center pt-8 border-t border-zinc-100">
                <p className="text-[10px] uppercase font-bold tracking-widest text-[#86868B]">
                  ¿No tienes cuenta?{' '}
                  <button 
                    onClick={() => resetState('register')}
                    className="text-[#1D1D1F] border-b border-[#1D1D1F] pb-0.5 ml-1"
                  >
                    Regístrate
                  </button>
                </p>
              </div>
            </motion.div>
          )}

          {view === 'register' && (
            <motion.div
              key="register"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl font-serif font-black italic tracking-tighter mb-3 text-[#1D1D1F]">REGISTRO</h2>
                <p className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#86868B]">
                  Iníciate en el coleccionismo
                </p>
              </div>

              <form onSubmit={handleRegister} className="space-y-6">
                <div className="space-y-4">
                  <div className="relative group">
                    <User size={16} className="absolute left-0 top-1/2 -translate-y-1/2 text-[#86868B] group-focus-within:text-[#0066CC] transition-colors" />
                    <input
                      required
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Nombre Completo"
                      className={inputClasses}
                    />
                  </div>
                  <div className="relative group">
                    <Mail size={16} className="absolute left-0 top-1/2 -translate-y-1/2 text-[#86868B] group-focus-within:text-[#0066CC] transition-colors" />
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Correo Electrónico"
                      className={inputClasses}
                    />
                  </div>
                  <div className="relative group">
                    <Lock size={16} className="absolute left-0 top-1/2 -translate-y-1/2 text-[#86868B] group-focus-within:text-[#0066CC] transition-colors" />
                    <input
                      required
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Contraseña"
                      className={inputClasses}
                    />
                  </div>
                  <div className="relative group">
                    <Lock size={16} className="absolute left-0 top-1/2 -translate-y-1/2 text-[#86868B] group-focus-within:text-[#0066CC] transition-colors" />
                    <input
                      required
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirmar Contraseña"
                      className={inputClasses}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 py-2">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="w-4 h-4 accent-[#0066CC]"
                  />
                  <label htmlFor="terms" className="text-[9px] uppercase font-bold tracking-widest text-[#86868B] cursor-pointer">
                    Acepto los términos y condiciones
                  </label>
                </div>

                {error && (
                  <p className="text-[9px] text-red-500 font-bold uppercase tracking-widest text-center">{error}</p>
                )}

                <button
                  type="submit"
                  className="w-full bg-[#1D1D1F] text-white py-4 rounded-full text-xs font-bold uppercase tracking-[0.4em] hover:bg-[#323234] transition-all active:scale-95 shadow-xl shadow-black/10"
                >
                  Registrarse
                </button>
              </form>

              <div className="mt-12 text-center pt-8 border-t border-zinc-100">
                <p className="text-[10px] uppercase font-bold tracking-widest text-[#86868B]">
                  ¿Ya tienes cuenta?{' '}
                  <button 
                    onClick={() => resetState('login')}
                    className="text-[#1D1D1F] border-b border-[#1D1D1F] pb-0.5 ml-1"
                  >
                    Entrar
                  </button>
                </p>
              </div>
            </motion.div>
          )}

          {view === 'forgot' && (
            <motion.div
              key="forgot"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              {!isSubmitted ? (
                <>
                  <button 
                    onClick={() => resetState('login')}
                    className="flex items-center gap-2 text-[9px] uppercase font-bold tracking-[0.2em] text-[#86868B] hover:text-[#1D1D1F] mb-8 transition-colors"
                  >
                    <ArrowLeft size={12} /> Volver
                  </button>

                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-serif font-black italic tracking-tighter mb-3 leading-none text-[#1D1D1F]">RESCATAR ACCESO</h2>
                    <p className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#86868B]">
                      Enviaremos instrucciones a tu correo
                    </p>
                  </div>

                  <form onSubmit={handleForgot} className="space-y-10">
                    <div className="relative group">
                      <Mail size={16} className="absolute left-0 top-1/2 -translate-y-1/2 text-[#86868B] group-focus-within:text-[#0066CC] transition-colors" />
                      <input
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Tu Correo Electrónico"
                        className={inputClasses}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#1D1D1F] text-white py-4 rounded-full text-xs font-bold uppercase tracking-[0.4em] hover:bg-[#323234] transition-all active:scale-95 shadow-xl shadow-black/10"
                    >
                      Enviar Instrucciones
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 bg-[#F5F5F7] rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm"
                  >
                    <CheckCircle2 size={40} className="text-[#0066CC]" />
                  </motion.div>
                  <h3 className="text-2xl font-serif font-black italic mb-4 text-[#1D1D1F]">¡ENVÍADO!</h3>
                  <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#86868B] leading-relaxed mb-10">
                    Revisa tu bandeja de entrada para restablecer tu acceso.
                  </p>
                  <button
                    onClick={() => resetState('login')}
                    className="text-xs font-bold uppercase tracking-[0.3em] border-b border-[#1D1D1F] pb-1 hover:text-zinc-400 hover:border-zinc-200 transition-all text-[#1D1D1F]"
                  >
                    Regresar al Inicio de Sesión
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
