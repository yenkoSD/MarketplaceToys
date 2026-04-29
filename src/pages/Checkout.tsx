import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, CreditCard, Truck, ClipboardList, CheckCircle2, ShoppingBag, ArrowLeft, Plus, Minus, Trash2, Info } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AuthModal from '../components/AuthModal';

type Step = 1 | 2 | 3 | 4 | 5;

interface ShippingData {
  fullName: string;
  email: string;
  street: string;
  extNumber: string;
  intNumber: string;
  zipCode: string;
  city: string;
  state: string;
  phone: string;
  references: string;
}

interface PaymentData {
  cardNumber: string;
  expiry: string;
  cvv: string;
}

// Logo Components
function VisaLogo({ active, dimmed }: { active: boolean; dimmed: boolean }) {
  return (
    <div className={`w-14 h-9 bg-white border border-black/5 rounded-lg shadow-sm flex items-center justify-center p-2 transition-all duration-500 ${active ? 'scale-110 shadow-md ring-1 ring-[#1A1F71]/10' : dimmed ? 'opacity-20 grayscale' : 'grayscale opacity-50'}`}>
      <svg viewBox="0 0 100 32" className="w-full h-full">
        <path fill="#1A1F71" d="M38 3.5l-5.6 13.9 6.7-13.9H46l-10 20.8h-4.3l-2.4-11.4c-.6-3.3-3.1-6-6.4-6.3L20 6.1l-.1-.4h11.4c3.1 0 5.8 2.1 6.8 5.1V3.5h.3z" />
        <path fill="#F79E1B" d="M19.1 6.1l-.1-.4h-11L8.1 6h-.1c-1.1 0-2.1.8-2.3 1.9l-4.5 16.3h4.5l5.5-13.8c.2-.5.7-.9 1.3-.9h6.6z" />
        <path fill="#1A1F71" d="M59.5 3.5c-4.6 0-8.1 2.3-8.1 5.9 0 4.1 5.6 4.3 5.6 6.2 0 .6-.7 1.2-2.3 1.2-1.9 0-3.6-.5-5.1-1.3l-.7 4.1c1.4.6 3.2 1.1 4.9 1.1 5.1 0 8.5-2.5 8.5-6.3 0-4.4-5.6-4.7-5.6-6.7 0-.5.6-1.1 2-1.1 1.7 0 3 .5 4.3 1.1l.6-4c-1.2-.5-2.6-.8-4.1-.8zm15.1.3h-4.2l-6.8 16.3h4.3l.9-2.4h5.2l.5 2.4H79l-4.4-16.3zm-3.2 10l1.7-4.6 1 4.6h-2.7z" />
      </svg>
    </div>
  );
}

function MastercardLogo({ active, dimmed }: { active: boolean; dimmed: boolean }) {
  return (
    <div className={`w-14 h-9 bg-white border border-black/5 rounded-lg shadow-sm flex items-center justify-center p-2 transition-all duration-500 ${active ? 'scale-110 shadow-md ring-1 ring-[#EB001B]/10' : dimmed ? 'opacity-20 grayscale' : 'grayscale opacity-50'}`}>
      <div className="flex items-center">
        <div className="w-5 h-5 rounded-full bg-[#EB001B] opacity-90" />
        <div className="w-5 h-5 rounded-full bg-[#F79E1B] -ml-2.5 opacity-90 mix-blend-multiply" />
      </div>
    </div>
  );
}

function AmexLogo({ active, dimmed }: { active: boolean; dimmed: boolean }) {
  return (
    <div className={`w-14 h-9 bg-white border border-black/5 rounded-lg shadow-sm flex items-center justify-center p-1 transition-all duration-500 ${active ? 'scale-110 shadow-md ring-1 ring-[#0070D1]/10' : dimmed ? 'opacity-20 grayscale' : 'grayscale opacity-50'}`}>
      <div className={`px-1.5 py-0.5 border border-zinc-200 rounded-sm font-black text-[8px] tracking-tight transition-all duration-500 ${active ? 'bg-[#0070D1] text-white border-transparent' : 'text-zinc-400'}`}>
        AMEX
      </div>
    </div>
  );
}

export default function Checkout() {
  const navigate = useNavigate();
  const { items, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [step, setStep] = useState<Step>(1);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [shipping, setShipping] = useState<ShippingData>({
    fullName: '',
    email: '',
    street: '',
    extNumber: '',
    intNumber: '',
    zipCode: '',
    city: '',
    state: '',
    phone: '',
    references: '',
  });
  const [payment, setPayment] = useState<PaymentData>({
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const nextStep = () => {
    if (step === 2) {
      if (!isAuthenticated) {
        setShowAuthModal(true);
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const zipRegex = /^\d{5}$/;
      const isComplete = 
        shipping.fullName && 
        emailRegex.test(shipping.email) && 
        shipping.street && 
        shipping.extNumber && 
        zipRegex.test(shipping.zipCode) && 
        shipping.city && 
        shipping.state && 
        shipping.phone;
        
      if (!isComplete) return;
    }
    setStep((prev) => (prev + 1) as Step);
  };

  const prevStep = () => setStep((prev) => (prev - 1) as Step);

  const steps = [
    { id: 1, name: 'Bolsa', icon: ShoppingBag },
    { id: 2, name: 'Envío', icon: Truck },
    { id: 3, name: 'Pago', icon: CreditCard },
    { id: 4, name: 'Revisión', icon: ClipboardList },
    { id: 5, name: 'Confirmación', icon: CheckCircle2 },
  ];

  const handleStepClick = (s: number) => {
    if (step === 5) return; // Disable navigation once confirmed
    if (s < step) setStep(s as Step);
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const zipRegex = /^\d{5}$/;
  const isShippingValid = 
    shipping.fullName && 
    emailRegex.test(shipping.email) && 
    shipping.street && 
    shipping.extNumber && 
    zipRegex.test(shipping.zipCode) && 
    shipping.city && 
    shipping.state && 
    shipping.phone;
  const isPaymentValid = payment.cardNumber.length >= 16 && payment.expiry && payment.cvv.length >= 3;

  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="flex justify-between items-center mb-16 relative">
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-zinc-100 -z-10" />
          {steps.map((s) => (
            <button
              key={s.id}
              onClick={() => handleStepClick(s.id)}
              disabled={s.id > step || step === 5}
              className={`flex flex-col items-center gap-3 bg-white px-4 transition-all ${
                s.id === step ? 'text-[#0066CC]' : s.id < step ? 'text-[#1D1D1F]' : 'text-zinc-300'
              } ${step === 5 ? 'cursor-default' : ''}`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${
                s.id === step ? 'border-[#0066CC] bg-[#0066CC] text-white' : s.id < step ? 'border-[#1D1D1F] bg-[#1D1D1F] text-white' : 'border-zinc-100 bg-white'
              }`}>
                {s.id < step ? <s.icon size={16} /> : <span className="text-xs font-bold">{s.id}</span>}
              </div>
              <span className={`text-[10px] uppercase font-bold tracking-[0.2em] ${s.id === step ? 'opacity-100' : 'opacity-40'}`}>
                {s.name}
              </span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="relative overflow-hidden min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            >
              {step === 1 && <BagStep items={items} onUpdate={updateQuantity} onRemove={removeFromCart} total={totalPrice} onNext={nextStep} />}
              {step === 2 && <ShippingStep data={shipping} setData={setShipping} onNext={nextStep} onBack={prevStep} />}
              {step === 3 && <PaymentStep data={payment} setData={setPayment} onNext={nextStep} onBack={prevStep} isValid={isShippingValid} />}
              {step === 4 && <ReviewStep items={items} shipping={shipping} total={totalPrice} onNext={nextStep} onBack={prevStep} />}
              {step === 5 && <ConfirmationStep onFinish={() => { clearCart(); navigate('/'); }} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      
      {/* Auth Modal for logic gates */}
      <AnimatePresence>
        {showAuthModal && (
          <AuthModal 
            onClose={() => {
              setShowAuthModal(false);
              // Check again after close, if logged in, proceed
            }} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function BagStep({ items, onUpdate, onRemove, total, onNext }: any) {
  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="font-serif italic text-2xl text-[#86868B] mb-8">Tu bolsa está vacía</p>
        <button onClick={() => window.history.back()} className="text-[#0066CC] font-bold uppercase tracking-widest text-xs border-b border-[#0066CC] pb-1">
          Volver a la tienda
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div className="space-y-6">
        {items.map((item: any) => (
          <div key={item.id} className="flex gap-8 items-center border-b border-zinc-50 pb-6">
            <div className="w-24 h-32 bg-[#F5F5F7] rounded-2xl overflow-hidden border border-black/5 flex-shrink-0">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <h4 className="font-serif font-black italic text-xl tracking-tighter text-[#1D1D1F]">{item.name}</h4>
              <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#86868B] mt-1">{item.brand}</p>
              
              <div className="flex items-center gap-4 mt-6">
                <div className="flex items-center bg-[#F5F5F7] rounded-full p-1">
                  <button onClick={() => onUpdate(item.id, -1)} className="p-1 px-3 hover:bg-white rounded-full transition-all">
                    <Minus size={12} />
                  </button>
                  <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                  <button onClick={() => onUpdate(item.id, 1)} className="p-1 px-3 hover:bg-white rounded-full transition-all">
                    <Plus size={12} />
                  </button>
                </div>
                <button onClick={() => onRemove(item.id)} className="text-[#86868B] hover:text-red-500 transition-colors p-2">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <div className="text-right">
              <span className="font-mono font-bold text-lg text-[#0066CC]">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center pt-8">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#86868B]">Subtotal</span>
          <span className="text-4xl font-serif font-black italic tracking-tighter text-[#1D1D1F]">${total.toFixed(2)}</span>
        </div>
        <button
          onClick={onNext}
          className="bg-[#1D1D1F] text-white px-12 py-5 rounded-full text-xs font-bold uppercase tracking-[0.4em] hover:bg-[#0066CC] transition-all shadow-xl active:scale-95 flex items-center gap-3"
        >
          Continuar <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

function ShippingStep({ data, setData, onNext, onBack }: any) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Numeric validations
    if (['zipCode', 'extNumber', 'intNumber', 'phone'].includes(name)) {
      if (value !== '' && !/^\d+$/.test(value)) return;
    }

    if (name === 'zipCode' && value.length > 5) return;

    setData({ ...data, [name]: value });
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const zipRegex = /^\d{5}$/;
  const isFormComplete = 
    data.fullName && 
    emailRegex.test(data.email) && 
    data.street && 
    data.extNumber && 
    zipRegex.test(data.zipCode) && 
    data.city && 
    data.state && 
    data.phone;

  const estadosMexico = [
    "Aguascalientes", "Baja California", "Baja California Sur", "Campeche", "Chiapas", "Chihuahua", "Coahuila", "Colima", "Ciudad de México", "Durango", "Guanajuato", "Guerrero", "Hidalgo", "Jalisco", "México", "Michoacán", "Morelos", "Nayarit", "Nuevo León", "Oaxaca", "Puebla", "Querétaro", "Quintana Roo", "San Luis Potosí", "Sinaloa", "Sonora", "Tabasco", "Tamaulipas", "Tlaxcala", "Veracruz", "Yucatán", "Zacatecas"
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-10">
      <div className="text-center">
        <h3 className="text-3xl font-serif font-black italic tracking-tighter text-[#1D1D1F]">DIRECCIÓN DE ENVÍO</h3>
        <p className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#86868B] mt-2">Detalles precisos para tu entrega premium</p>
      </div>

      <div className="grid grid-cols-1 gap-6 bg-white p-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Nombre Completo" name="fullName" value={data.fullName} onChange={handleChange} />
          <Input label="Correo Electrónico" name="email" type="email" value={data.email} onChange={handleChange} placeholder="ejemplo@email.com" />
        </div>

        {/* Fila 1: Calle y Números */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Input label="Calle" name="street" value={data.street} onChange={handleChange} />
          </div>
          <Input label="Núm. Exterior" name="extNumber" value={data.extNumber} onChange={handleChange} />
          <Input label="Núm. Interior (Opc)" name="intNumber" value={data.intNumber} onChange={handleChange} />
        </div>

        {/* Fila 2: Ciudad, CP y Estado */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Input label="Ciudad" name="city" value={data.city} onChange={handleChange} />
          <Input label="Código Postal" name="zipCode" value={data.zipCode} onChange={handleChange} placeholder="5 dígitos" maxLength={5} />
          <div className="space-y-2 group">
            <label className="text-[9px] uppercase font-bold tracking-widest text-[#86868B] group-focus-within:text-[#0066CC] transition-colors">
              Estado
            </label>
            <select
              name="state"
              value={data.state}
              onChange={handleChange}
              className="w-full bg-[#F5F5F7] border border-transparent focus:border-[#0066CC] rounded-2xl px-6 py-4 text-sm font-medium outline-none transition-all text-[#1D1D1F] appearance-none cursor-pointer"
            >
              <option value="">Seleccionar...</option>
              {estadosMexico.map(e => <option key={e} value={e}>{e}</option>)}
            </select>
          </div>
        </div>

        <Input label="Teléfono" name="phone" value={data.phone} onChange={handleChange} />

        {/* Fila 3: Referencias */}
        <div className="space-y-2 group">
          <label className="text-[9px] uppercase font-bold tracking-widest text-[#86868B] group-focus-within:text-[#0066CC] transition-colors">
            Referencias de entrega
          </label>
          <textarea
            name="references"
            value={data.references}
            onChange={handleChange}
            placeholder="Ej: Portón negro, entre calle X y Y..."
            className="w-full bg-[#F5F5F7] border border-transparent focus:border-[#0066CC] rounded-2xl px-6 py-4 text-sm font-medium outline-none transition-all placeholder:text-[#86868B]/30 text-[#1D1D1F] resize-none h-32"
          />
        </div>
      </div>

      <div className="flex justify-between pt-8">
        <button onClick={onBack} className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-[0.2em] text-[#86868B] hover:text-[#1D1D1F]">
          <ArrowLeft size={16} /> Volver
        </button>
        <button
          onClick={onNext}
          disabled={!isFormComplete}
          className="bg-[#1D1D1F] text-white px-12 py-5 rounded-full text-xs font-bold uppercase tracking-[0.4em] hover:bg-[#0066CC] transition-all shadow-xl active:scale-95 disabled:opacity-20 disabled:cursor-not-allowed"
        >
          Ir al Pago
        </button>
      </div>
    </div>
  );
}

function PaymentStep({ data, setData, onNext, onBack, isValid }: any) {
  const [showCvvInfo, setShowCvvInfo] = useState(false);

  const getCardType = (number: string) => {
    const clean = number.replace(/\s+/g, '');
    if (clean.startsWith('4')) return 'visa';
    if (clean.startsWith('5')) return 'mastercard';
    if (clean.startsWith('34') || clean.startsWith('37')) return 'amex';
    return null;
  };

  const cardType = getCardType(data.cardNumber);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value: rawValue } = e.target;
    let value = rawValue;

    if (name === 'cardNumber') {
      value = value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().substring(0, 19);
    } else if (name === 'expiry') {
      let cleanValue = value.replace(/\D/g, '');
      if (cleanValue.length > 0) {
        if (parseInt(cleanValue[0]) > 1 && cleanValue.length === 1) {
          cleanValue = '0' + cleanValue;
        }
        
        if (cleanValue.length >= 2) {
          value = cleanValue.substring(0, 2) + '/' + cleanValue.substring(2, 4);
        } else {
          value = cleanValue;
        }
      } else {
        value = '';
      }
      value = value.substring(0, 5);
    }

    setData({ ...data, [name]: value });
  };

  const isFormComplete = data.cardNumber.replace(/\s/g, '').length >= 15 && data.expiry.length >= 5 && data.cvv.length >= 3;

  if (!isValid) {
    return (
      <div className="text-center py-20 space-y-6">
        <p className="text-[#ff3131] font-bold uppercase tracking-widest text-xs">Información de envío incompleta</p>
        <button onClick={onBack} className="bg-[#1D1D1F] text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest">
          Corregir Envío
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-12">
      <div className="text-center space-y-8">
        <h3 className="text-3xl font-serif font-black italic tracking-tighter text-[#1D1D1F]">MÉTODO DE PAGO</h3>
        
        {/* Card Logos */}
        <div className="flex justify-center items-center gap-8 py-4">
          <VisaLogo active={cardType === 'visa'} dimmed={!!cardType && cardType !== 'visa'} />
          <MastercardLogo active={cardType === 'mastercard'} dimmed={!!cardType && cardType !== 'mastercard'} />
          <AmexLogo active={cardType === 'amex'} dimmed={!!cardType && cardType !== 'amex'} />
        </div>
      </div>

      <div className="space-y-6">
        <Input 
          label="Número de Tarjeta" 
          name="cardNumber" 
          value={data.cardNumber} 
          onChange={handleChange} 
          placeholder="0000 0000 0000 0000" 
        />
        <div className="grid grid-cols-2 gap-6">
          <Input 
            label="Fecha (MM/AA)" 
            name="expiry" 
            value={data.expiry} 
            onChange={handleChange} 
            placeholder="MM/AA" 
            maxLength={5}
          />
          <div className="relative group/cvv">
            <Input 
              label="CVV" 
              name="cvv" 
              value={data.cvv} 
              onChange={handleChange} 
              placeholder="123" 
              maxLength={4}
            />
            <div className="absolute right-4 top-10 flex items-center">
              <button 
                onMouseEnter={() => setShowCvvInfo(true)}
                onMouseLeave={() => setShowCvvInfo(false)}
                className="text-[#86868B] hover:text-[#0066CC] transition-colors"
              >
                <Info size={16} />
              </button>
              <AnimatePresence>
                {showCvvInfo && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-full right-0 mb-4 w-48 p-4 bg-[#1D1D1F] text-white text-[10px] uppercase font-bold tracking-[0.1em] rounded-2xl shadow-2xl z-20 leading-relaxed"
                  >
                    El código de 3 o 4 dígitos al reverso de tu tarjeta.
                    <div className="absolute bottom-[-6px] right-2 w-3 h-3 bg-[#1D1D1F] rotate-45" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-8">
        <button onClick={onBack} className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-[0.2em] text-[#86868B] hover:text-[#1D1D1F]">
          <ArrowLeft size={16} /> Volver
        </button>
        <button
          onClick={onNext}
          disabled={!isFormComplete}
          className="bg-[#1D1D1F] text-white px-12 py-5 rounded-full text-xs font-bold uppercase tracking-[0.4em] hover:bg-[#0066CC] transition-all shadow-xl active:scale-95 disabled:opacity-20 disabled:cursor-not-allowed"
        >
          Revisar Orden
        </button>
      </div>
    </div>
  );
}

function ReviewStep({ items, shipping, total, onNext, onBack }: any) {
  const shippingCost = 15.00;
  const finalTotal = total + shippingCost;

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h3 className="text-3xl font-serif font-black italic tracking-tighter text-[#1D1D1F]">REVISIÓN FINAL</h3>
        <p className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#86868B] mt-2">Todo está listo para el envío</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#86868B] border-b border-zinc-100 pb-2">Destinatario</h4>
            <div className="text-[#1D1D1F] space-y-1">
              <p className="font-bold">{shipping.fullName}</p>
              <p className="text-xs opacity-60 mb-2">{shipping.email}</p>
              <p className="opacity-60 leading-relaxed">
                {shipping.street} #{shipping.extNumber}
                {shipping.intNumber && `, Int. ${shipping.intNumber}`}
              </p>
              <p className="opacity-60">{shipping.city}, {shipping.state}. CP {shipping.zipCode}</p>
              <p className="opacity-60">{shipping.phone}</p>
              {shipping.references && (
                <div className="mt-4 p-3 bg-[#F5F5F7] rounded-xl border border-black/5">
                  <p className="text-[8px] uppercase font-bold tracking-widest text-[#86868B] mb-1">Ref:</p>
                  <p className="text-[10px] italic leading-relaxed">{shipping.references}</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#86868B] border-b border-zinc-100 pb-2">Artículos ({items.length})</h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {items.map((item: any) => (
                <div key={item.id} className="flex justify-between text-xs py-1">
                  <span className="opacity-60">{item.quantity}x {item.name}</span>
                  <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-[#F5F5F7] rounded-[32px] p-10 space-y-6">
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1D1D1F]">Resumen Matemático</h4>
          <div className="space-y-4 text-sm">
            <div className="flex justify-between">
              <span className="opacity-40">Subtotal</span>
              <span className="font-bold tracking-tighter">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-40">Envío Premium</span>
              <span className="font-bold tracking-tighter">${shippingCost.toFixed(2)}</span>
            </div>
            <div className="h-[1px] bg-black/5 pt-4" />
            <div className="flex justify-between items-baseline pt-4">
              <span className="text-[10px] uppercase font-black">Total Final</span>
              <span className="text-4xl font-serif font-black italic tracking-tighter text-[#0066CC]">${finalTotal.toFixed(2)}</span>
            </div>
          </div>
          <button
            onClick={onNext}
            className="w-full bg-[#1D1D1F] text-white py-5 rounded-full text-xs font-bold uppercase tracking-[0.4em] hover:bg-[#0066CC] transition-all shadow-2xl active:scale-95 mt-6"
          >
            Confirmar Pedido
          </button>
        </div>
      </div>

      <div className="flex justify-start">
        <button onClick={onBack} className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-[0.2em] text-[#86868B] hover:text-[#1D1D1F]">
          <ArrowLeft size={16} /> Volver al Pago
        </button>
      </div>
    </div>
  );
}

function ConfirmationStep({ onFinish }: any) {
  const orderNumber = Math.random().toString(36).substring(2, 10).toUpperCase();
  const { clearCart } = useCart();

  React.useEffect(() => {
    // Clear cart immediately when order is confirmed
    clearCart();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="text-center py-20 space-y-12 bg-white rounded-[32px] border border-black/5 p-12">
      <motion.div
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', damping: 12, stiffness: 200 }}
        className="w-28 h-28 bg-[#0066CC]/5 rounded-full flex items-center justify-center mx-auto"
      >
        <CheckCircle2 size={56} className="text-[#0066CC]" />
      </motion.div>

      <div className="space-y-6">
        <div className="space-y-2">
          <span className="text-[10px] uppercase font-bold tracking-[0.6em] text-[#86868B]">Transacción Exitosa</span>
          <h3 className="text-5xl md:text-6xl font-serif font-black italic tracking-tighter text-[#1D1D1F]">¡Gracias por tu compra!</h3>
        </div>
        
        <div className="bg-[#F5F5F7] p-8 rounded-3xl inline-block">
          <p className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#86868B] mb-2">Número de Pedido</p>
          <p className="text-3xl font-serif font-black italic tracking-tighter text-[#1D1D1F]">#{orderNumber}</p>
        </div>

        <p className="text-[#86868B] max-w-sm mx-auto text-sm leading-relaxed pt-4">
          Tu pedido ha sido procesado con éxito. Hemos enviado una confirmación detallada a tu correo electrónico.
        </p>
      </div>

      <button
        onClick={onFinish}
        className="bg-[#1D1D1F] text-white px-16 py-6 rounded-full text-xs font-bold uppercase tracking-[0.4em] hover:bg-[#0066CC] transition-all shadow-xl active:scale-95"
      >
        Volver al Inicio
      </button>
    </div>
  );
}

function Input({ label, ...props }: any) {
  return (
    <div className="space-y-2 group">
      <label className="text-[9px] uppercase font-bold tracking-widest text-[#86868B] group-focus-within:text-[#0066CC] transition-colors">
        {label}
      </label>
      <input
        {...props}
        className="w-full bg-[#F5F5F7] border border-transparent focus:border-[#0066CC] rounded-2xl px-6 py-4 text-sm font-medium outline-none transition-all placeholder:text-[#86868B]/30 text-[#1D1D1F]"
      />
    </div>
  );
}
