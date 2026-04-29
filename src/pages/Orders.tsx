import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Package, Clock, MapPin, CreditCard, ChevronRight } from 'lucide-react';
import { Order } from '../types';

const MOCK_ORDERS: Order[] = [
  {
    id: 'ord_1',
    orderNumber: '#EZ-2026-001',
    date: '15 de enero',
    total: 204.99,
    status: 'Entregado',
    items: [
      {
        id: '1',
        name: 'Superman (Recovering Suit)',
        price: 95.00,
        image: 'https://images.unsplash.com/photo-1594463750939-ebb6bd2d5337?q=80&w=800&auto=format&fit=crop',
        quantity: 1
      },
      {
        id: '2',
        name: 'Spider-Man Blue Ver.',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?q=80&w=800&auto=format&fit=crop',
        quantity: 1
      }
    ],
    shippingAddress: {
      fullName: 'Violeta Garcia',
      street: 'Av. Paseo de la Reforma',
      extNumber: '222',
      intNumber: '8B',
      zipCode: '06600',
      city: 'CDMX',
      state: 'Ciudad de México',
      references: 'Torre corporativa, frente al Ángel.'
    },
    subtotal: 184.99,
    shippingCost: 20.00
  },
  {
    id: 'ord_2',
    orderNumber: '#EZ-2026-002',
    date: '20 de enero',
    total: 110.00,
    status: 'En camino',
    items: [
      {
        id: '5',
        name: 'Batman (1989 Ver.)',
        price: 110.00,
        image: 'https://images.unsplash.com/photo-1531259683607-1756291b4482?q=80&w=800&auto=format&fit=crop',
        quantity: 1
      }
    ],
    shippingAddress: {
      fullName: 'Violeta Garcia',
      street: 'Av. Paseo de la Reforma',
      extNumber: '222',
      intNumber: '8B',
      zipCode: '06600',
      city: 'CDMX',
      state: 'Ciudad de México',
      references: 'Torre corporativa, frente al Ángel.'
    },
    subtotal: 90.00,
    shippingCost: 20.00
  }
];

export default function Orders() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {!selectedOrder ? (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="mb-16">
                <h1 className="text-5xl font-serif font-black italic tracking-tighter mb-4 text-[#1D1D1F]">MIS PEDIDOS</h1>
                <p className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#86868B]">
                  Historial de adquisiciones exclusivas
                </p>
              </div>

              <div className="space-y-6">
                {MOCK_ORDERS.map((order) => (
                  <button
                    key={order.id}
                    onClick={() => setSelectedOrder(order)}
                    className="w-full group bg-white border border-zinc-100 p-8 rounded-[32px] flex items-center gap-8 text-left transition-all hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:border-black/5"
                  >
                    <div className="w-24 h-24 rounded-2xl overflow-hidden bg-zinc-50 flex-shrink-0">
                      <img 
                        src={order.items[0].image} 
                        alt={order.items[0].name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    
                    <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-8">
                      <div>
                        <p className="text-[9px] uppercase font-bold tracking-widest text-zinc-400 mb-1">Orden</p>
                        <p className="text-xs font-black tracking-tight text-[#1D1D1F]">{order.orderNumber}</p>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase font-bold tracking-widest text-zinc-400 mb-1">Fecha</p>
                        <p className="text-xs font-bold text-[#1D1D1F]">{order.date}</p>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase font-bold tracking-widest text-zinc-400 mb-1">Total</p>
                        <p className="text-xs font-bold text-[#1D1D1F]">${order.total.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase font-bold tracking-widest text-zinc-400 mb-1">Estado</p>
                        <span className={`text-[9px] uppercase font-black tracking-widest px-3 py-1 rounded-full ${
                          order.status === 'Entregado' ? 'bg-zinc-100 text-[#1D1D1F]' : 'bg-[#0066CC]/5 text-[#0066CC]'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>

                    <div className="text-zinc-300 transition-transform group-hover:translate-x-2">
                      <ChevronRight size={20} />
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            >
              <button 
                onClick={() => setSelectedOrder(null)}
                className="group flex items-center gap-2 text-[10px] uppercase font-bold tracking-[0.2em] text-[#86868B] hover:text-[#1D1D1F] mb-12 transition-colors"
              >
                <ChevronLeft size={16} className="transition-transform group-hover:-translate-x-1" /> 
                Volver al historial
              </button>

              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 border-b border-zinc-100 pb-12">
                <div>
                  <h2 className="text-4xl font-serif font-black italic tracking-tighter mb-4 text-[#1D1D1F]">ORDEN {selectedOrder.orderNumber}</h2>
                  <div className="flex gap-6 text-[10px] uppercase font-bold tracking-widest text-[#86868B]">
                    <span className="flex items-center gap-2"><Clock size={12} /> {selectedOrder.date}</span>
                    <span className="flex items-center gap-2"><Package size={12} /> {selectedOrder.status}</span>
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-12">
                  <section>
                    <h3 className="text-[10px] uppercase font-black tracking-[0.3em] text-[#1D1D1F] mb-8">Artículos en la orden</h3>
                    <div className="space-y-6">
                      {selectedOrder.items.map((item) => (
                        <div key={item.id} className="flex gap-6 p-6 rounded-3xl bg-zinc-50/50 border border-zinc-100">
                          <div className="w-20 h-20 rounded-2xl overflow-hidden bg-white border border-zinc-100 flex-shrink-0">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 flex flex-col justify-center">
                            <h4 className="text-sm font-bold text-[#1D1D1F] mb-1">{item.name}</h4>
                            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Cant: {item.quantity}</p>
                          </div>
                          <div className="flex items-center text-sm font-black font-serif italic">
                            ${item.price.toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section>
                    <h3 className="text-[10px] uppercase font-black tracking-[0.3em] text-[#1D1D1F] mb-8">Detalles de Envío</h3>
                    <div className="bg-white border border-zinc-100 rounded-[32px] p-8 space-y-6">
                      <div className="flex gap-4">
                        <MapPin size={20} className="text-zinc-300" />
                        <div>
                          <p className="text-sm font-bold text-[#1D1D1F] mb-2">{selectedOrder.shippingAddress.fullName}</p>
                          <p className="text-xs text-[#86868B] leading-relaxed">
                            {selectedOrder.shippingAddress.street} #{selectedOrder.shippingAddress.extNumber}
                            {selectedOrder.shippingAddress.intNumber && `, Int. ${selectedOrder.shippingAddress.intNumber}`}
                            <br />
                            {selectedOrder.shippingAddress.zipCode}, {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state}
                          </p>
                          {selectedOrder.shippingAddress.references && (
                            <div className="mt-4 p-4 bg-zinc-50 rounded-2xl">
                              <p className="text-[9px] uppercase font-bold tracking-widest text-[#86868B] mb-1">Referencias</p>
                              <p className="text-[11px] font-medium text-[#1D1D1F]">{selectedOrder.shippingAddress.references}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </section>
                </div>

                <div className="space-y-8">
                  <section className="bg-[#1D1D1F] text-white rounded-[32px] p-8 shadow-xl">
                    <h3 className="text-[10px] uppercase font-black tracking-[0.3em] mb-8 text-zinc-400">Resumen de Pago</h3>
                    
                    <div className="space-y-4 mb-8">
                      <div className="flex justify-between text-xs">
                        <span className="text-zinc-400">Subtotal</span>
                        <span className="font-bold">${selectedOrder.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-zinc-400">Envío</span>
                        <span className="font-bold">${selectedOrder.shippingCost.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <div className="pt-6 border-t border-white/10 flex justify-between items-baseline">
                      <span className="text-[10px] uppercase font-black tracking-[0.2em] text-[#0066CC]">Total Final</span>
                      <span className="text-2xl font-serif font-black italic">${selectedOrder.total.toFixed(2)}</span>
                    </div>

                    <div className="mt-8 pt-8 border-t border-white/10">
                      <div className="flex items-center gap-3">
                        <CreditCard size={14} className="text-zinc-400" />
                        <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">Tarjeta terminada en **** 4589</span>
                      </div>
                    </div>
                  </section>

                  <button 
                    className="w-full py-4 rounded-full border border-zinc-200 text-[10px] font-bold uppercase tracking-[0.3em] text-[#1D1D1F] hover:bg-zinc-50 transition-all flex items-center justify-center gap-2"
                    onClick={() => window.print()}
                  >
                    Descargar Factura
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
