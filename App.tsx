
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { ROADMAP } from './constants';
import { CourseModule, ModuleStep, UserProgress, QuizQuestion, Resource, ViewState, ChatMessage } from './types';
import { GoogleGenAI } from "@google/genai";

// --- Sub-Components ---

const ResourceModal: React.FC<{ resource: Resource | null; onClose: () => void }> = ({ resource, onClose }) => {
  if (!resource) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-3xl max-h-[90vh] rounded-[32px] shadow-2xl overflow-hidden flex flex-col animate-scale-up border border-white/20">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-emerald-500 border border-emerald-50">
              <i className={`fas ${resource.type === 'video' ? 'fa-circle-play' : resource.type === 'exam' ? 'fa-graduation-cap' : 'fa-book-open'}`}></i>
            </div>
            <div>
              <h3 className="font-black text-slate-800 leading-tight">{resource.title}</h3>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Recurso de Especialización</p>
            </div>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full hover:bg-gray-200 flex items-center justify-center transition-colors">
            <i className="fas fa-times text-slate-400"></i>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-white">
          <div className="prose prose-slate max-w-none">
            {resource.detailedContent ? (
              <div dangerouslySetInnerHTML={{ __html: resource.detailedContent }} className="study-content text-slate-600 leading-relaxed" />
            ) : (
              <div className="text-center py-20">
                <i className="fas fa-file-contract text-4xl text-emerald-100 mb-4 animate-pulse"></i>
                <p className="text-slate-400 font-medium italic">Accediendo a bibliografía científica...</p>
              </div>
            )}
            
            <div className="mt-10 p-6 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
               <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Acceso a Recurso Externo</h4>
               <p className="text-sm text-slate-600 mb-4">Este material incluye una plataforma externa certificada para completar la formación técnica.</p>
               <a 
                 href={resource.url} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-xl text-xs font-bold text-slate-700 hover:border-emerald-500 hover:text-emerald-600 transition-all shadow-sm"
               >
                 <i className="fas fa-external-link-alt text-[10px]"></i>
                 Abrir Plataforma Oficial
               </a>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 bg-slate-50 flex justify-between items-center">
          <button 
            onClick={onClose}
            className="px-8 py-3 bg-emerald-600 text-white rounded-2xl text-xs font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
          >
            Completar Lectura
          </button>
        </div>
      </div>
    </div>
  );
};

const ResourceCard: React.FC<{ res: Resource; onOpen: (res: Resource) => void }> = ({ res, onOpen }) => {
  const getLevelStyles = (level?: string) => {
    switch(level) {
      case 'beginner': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'intermediate': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'expert': return 'bg-rose-50 text-rose-600 border-rose-100';
      case 'pebc': return 'bg-purple-50 text-purple-600 border-purple-100';
      default: return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  const iconData = (() => {
    switch(res.type) {
      case 'exam': return { icon: 'fa-graduation-cap', color: 'text-purple-500', bg: 'bg-purple-50' };
      case 'practice': return { icon: 'fa-flask-vial', color: 'text-amber-500', bg: 'bg-amber-50' };
      case 'video': return { icon: 'fa-circle-play', color: 'text-rose-500', bg: 'bg-rose-50' };
      case 'quiz': return { icon: 'fa-bolt-lightning', color: 'text-yellow-500', bg: 'bg-yellow-50' };
      case 'article': return { icon: 'fa-book-open', color: 'text-blue-500', bg: 'bg-blue-50' };
      default: return { icon: 'fa-file-lines', color: 'text-gray-500', bg: 'bg-gray-50' };
    }
  })();

  return (
    <button 
      onClick={() => onOpen(res)}
      className="w-full text-left group relative flex flex-col gap-3 p-5 bg-white rounded-3xl border border-gray-100 hover:border-emerald-300 hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.15)] transition-all duration-300 hover:-translate-y-1"
    >
      <div className="flex items-center gap-4">
        <div className={`flex-shrink-0 w-12 h-12 ${iconData.bg} rounded-2xl flex items-center justify-center text-lg transition-transform group-hover:scale-110 duration-300`}>
          <i className={`fas ${iconData.icon} ${iconData.color}`}></i>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            {res.level && (
              <span className={`text-[8px] font-black px-1.5 py-0.5 rounded border tracking-widest uppercase ${getLevelStyles(res.level)}`}>
                {res.level}
              </span>
            )}
            {res.estimatedTime && <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">⏱️ {res.estimatedTime}</span>}
          </div>
          <h4 className="text-sm font-black text-slate-800 truncate group-hover:text-emerald-700 transition-colors">
            {res.title}
          </h4>
        </div>

        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-emerald-50 transition-all duration-300">
          <i className="fas fa-arrow-right text-[10px] text-emerald-500"></i>
        </div>
      </div>
    </button>
  );
};

const PhaseBadge: React.FC<{ phase: number }> = ({ phase }) => {
  const styles = [
    'bg-blue-100 text-blue-700 border-blue-200',
    'bg-amber-100 text-amber-700 border-amber-200',
    'bg-rose-100 text-rose-700 border-rose-200',
    'bg-purple-100 text-purple-700 border-purple-200',
    'bg-slate-800 text-white border-slate-900 shadow-sm'
  ][phase - 1];
  
  return (
    <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border uppercase tracking-widest ${styles}`}>
      {phase === 5 ? 'Elite: Dirección Técnica' : `Fase ${phase}`}
    </span>
  );
};

const EvaluationView: React.FC = () => {
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const systemPrompt = `
    Actúa como un Evaluador Senior de Química Farmacéutica de nivel mundial. 
    Tu misión es evaluar al usuario mediante un bloque de 10 preguntas con un rigor técnico de nivel examen de certificación industrial (Board Exam Style).

    ESTRUCTURA DEL TEMARIO EVALUABLE:
    FASE 1 (40% de peso): 
    - Química General: Magnitudes, unidades SI, Mol, masa molar, estructura atómica (isótopos, iones), Tabla Periódica (tendencias), Enlace químico, Lewis, VSEPR, Reacciones, Estequiometría, Gases, Equilibrio, Ácido-Base (Henderson-Hasselbalch), Ksp.
    - Química Orgánica: Hibridación, Grupos Funcionales, Estereoquímica (R/S), Mecanismos SN1, SN2, E1, E2, Adición (Markovnikov), Carbonilos e Hidrólisis.

    FASE 2 (60% de peso): 
    - Tecnología Farmacéutica: Fisicoquímica (solubilidad, flujo), Formas Sólidas (granulación, compresión, defectos como capping/laminación), Líquidas/Semisólidas (fases, viscosidad), Estériles (esterilización, pirogenicidad), Estabilidad.
    - GMP: Validación, Trazabilidad, Documentación ("lo que no está escrito no existe").
    - Supply Chain: Ciclo de suministro, Selección, Cuantificación (métodos), Compras/Procurement, Inventarios (Stock de seguridad, Lead time, Rotación), GDP, Cadena de Frío.

    REGLAS DE ORO DEL EVALUADOR:
    1. Una sola pregunta a la vez. No muestres varias simultáneamente.
    2. Rigor y Precisión: Formula cada reactivo sin ambigüedades. Si es numérico, indica unidades y datos suficientes.
    3. Flujo de Corrección: Tras cada respuesta del usuario:
       a) Califica: CORRECTA, PARCIAL o INCORRECTA.
       b) Respuesta Esperada: Explica la solución detallada y el razonamiento técnico (Senior level).
       c) Feedback dinámico: Si fue incorrecta o parcial, añade una mini-pregunta de seguimiento inmediata para confirmar que el usuario entendió la corrección.
    4. Progresión: Empieza en dificultad media y escala hacia alta, conectando conceptos (ej. cómo el pH de la Fase 1 afecta la estabilidad en la Fase 2).

    PRIMER PASO: Saluda y pregunta al usuario si prefiere que este bloque de 10 preguntas tenga más peso en la Fase 1 o en la Fase 2.
  `;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const startEvaluation = async () => {
    setLoading(true);
    setStarted(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          { text: systemPrompt },
          { text: "Saluda y pregunta por la preferencia de peso (Fase 1 o Fase 2) para iniciar el primer bloque de 10 preguntas." }
        ]
      });
      setHistory([{ role: 'model', content: response.text || "" }]);
    } catch (e) {
      setHistory([{ role: 'model', content: "Hubo un error al inicializar el núcleo de evaluación. Por favor, intente de nuevo." }]);
    }
    setLoading(false);
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input;
    setInput('');
    setHistory(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          { text: systemPrompt },
          ...history.map(h => ({ role: h.role, parts: [{ text: h.content }] })),
          { role: 'user', parts: [{ text: userMsg }] }
        ]
      });
      setHistory(prev => [...prev, { role: 'model', content: response.text || "" }]);
    } catch (e) {
      setHistory(prev => [...prev, { role: 'model', content: "Error en la comunicación con el evaluador." }]);
    }
    setLoading(false);
  };

  if (!started) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center space-y-12 animate-fade-in">
        <div className="relative">
          <div className="absolute -inset-6 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="w-40 h-40 bg-slate-900 rounded-[48px] flex items-center justify-center shadow-3xl relative">
            <i className="fas fa-file-signature text-6xl text-emerald-400"></i>
          </div>
        </div>
        <div className="max-w-2xl px-6">
          <h2 className="text-6xl font-black text-slate-900 mb-6 tracking-tight">Núcleo de Validación</h2>
          <p className="text-slate-500 text-xl font-medium leading-relaxed mb-10">
            Enfréntate a un bloque de 10 preguntas diseñadas para medir tu competencia técnica real en química farmacéutica, producción y supply chain.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <div className="px-6 py-4 bg-white border border-slate-100 rounded-3xl flex items-center gap-4 shadow-sm">
               <div className="w-10 h-10 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500"><i className="fas fa-microscope"></i></div>
               <div className="text-left">
                 <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Fase 1</div>
                 <div className="text-sm font-black text-slate-800">Cimientos Científicos</div>
               </div>
            </div>
            <div className="px-6 py-4 bg-white border border-slate-100 rounded-3xl flex items-center gap-4 shadow-sm">
               <div className="w-10 h-10 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500"><i className="fas fa-industry"></i></div>
               <div className="text-left">
                 <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Fase 2</div>
                 <div className="text-sm font-black text-slate-800">Núcleo Industrial</div>
               </div>
            </div>
          </div>
        </div>
        <button 
          onClick={startEvaluation}
          className="group relative px-16 py-7 bg-emerald-600 text-white rounded-[32px] font-black uppercase tracking-[0.25em] shadow-2xl shadow-emerald-200 hover:bg-emerald-700 hover:-translate-y-1.5 transition-all active:scale-95 text-lg"
        >
          Iniciar Simulación de Examen
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto flex flex-col h-[85vh] bg-white rounded-[56px] shadow-3xl border border-gray-100 overflow-hidden animate-scale-up">
      <div className="p-10 bg-slate-900 text-white flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-emerald-500/20">
            <i className="fas fa-user-graduate text-3xl"></i>
          </div>
          <div>
            <h3 className="font-black text-xl tracking-tight">Evaluador Técnico Senior</h3>
            <div className="flex items-center gap-3 mt-1">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <p className="text-[11px] text-emerald-400 font-bold uppercase tracking-[0.2em]">Sesión de Certificación Activa</p>
            </div>
          </div>
        </div>
        <button onClick={() => setStarted(false)} className="px-6 py-3 rounded-2xl bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-400 text-xs font-black uppercase tracking-widest transition-all">
          Abortar Misión
        </button>
      </div>
      
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-12 space-y-12 custom-scrollbar bg-[#FAFBFC]">
        {history.map((m, idx) => (
          <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
            <div className={`max-w-[85%] p-10 rounded-[48px] text-lg leading-relaxed shadow-sm ${
              m.role === 'user' 
              ? 'bg-emerald-600 text-white rounded-br-none shadow-2xl shadow-emerald-200' 
              : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'
            }`}>
              <div className="prose prose-lg max-w-none prose-slate">
                {m.content.split('\n').map((line, lidx) => (
                  <p key={lidx} className="mb-5 last:mb-0 leading-relaxed font-medium">{line}</p>
                ))}
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start animate-pulse">
            <div className="bg-white border border-slate-100 px-10 py-6 rounded-[36px] flex items-center gap-5 shadow-sm">
               <div className="flex gap-1.5">
                 <div className="w-3 h-3 bg-emerald-400 rounded-full animate-bounce"></div>
                 <div className="w-3 h-3 bg-emerald-400 rounded-full animate-bounce delay-100"></div>
                 <div className="w-3 h-3 bg-emerald-400 rounded-full animate-bounce delay-200"></div>
               </div>
               <span className="text-xs font-black text-slate-400 uppercase tracking-widest">El Evaluador está analizando tu respuesta...</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-12 bg-white border-t border-slate-50">
        <div className="flex gap-6 max-w-4xl mx-auto items-end">
          <textarea 
            rows={1}
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Introduce tu respuesta técnica aquí..."
            className="flex-1 bg-slate-50 border border-slate-100 rounded-[32px] px-10 py-6 text-lg focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium placeholder:text-slate-300 shadow-inner resize-none overflow-hidden"
          />
          <button 
            disabled={loading}
            onClick={handleSend} 
            className="bg-slate-900 text-white h-[76px] px-12 rounded-[32px] flex items-center justify-center gap-4 shadow-2xl hover:bg-emerald-600 disabled:opacity-50 transition-all group shrink-0"
          >
            <span className="text-xs font-black uppercase tracking-[0.2em]">Enviar</span>
            <i className="fas fa-paper-plane text-xs transition-transform group-hover:translate-x-1.5 group-hover:-translate-y-1.5"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

const AIChat: React.FC<{ context: string }> = ({ context }) => {
  const [messages, setMessages] = useState<{role: 'user' | 'model', content: string}[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    setInput('');
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          { text: `Eres un experto Mentor en Química Farmacéutica y Director Técnico Senior. Ayudas a un estudiante en: "${context}". Tus respuestas deben citar normatividad regulatoria e industrial de alto nivel.` },
          ...messages.map(m => ({ text: `${m.role === 'user' ? 'Pregunta' : 'Respuesta'}: ${m.content}` })),
          { text: `Consulta: ${input}` }
        ]
      });
      setMessages(prev => [...prev, { role: 'model', content: response.text || "" }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', content: "Error de red en el módulo IA." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-[40px] shadow-2xl flex flex-col h-[600px] border border-gray-100 overflow-hidden sticky top-8">
      <div className="p-6 bg-slate-900 text-white flex items-center gap-4">
        <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
          <i className="fas fa-brain text-xl"></i>
        </div>
        <div>
          <h4 className="font-black text-sm tracking-tight">Technical Mentor IA</h4>
          <p className="text-[9px] text-emerald-400 font-bold uppercase tracking-widest">Senior Technical Support</p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar bg-slate-50/30">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[90%] p-5 rounded-[28px] text-sm leading-relaxed ${
              m.role === 'user' ? 'bg-emerald-600 text-white rounded-br-none shadow-lg shadow-emerald-50' : 'bg-white text-slate-700 rounded-tl-none shadow-sm border border-gray-100'
            }`}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && <div className="p-4 bg-white rounded-2xl w-20 flex justify-center shadow-sm animate-pulse">...</div>}
      </div>
      <div className="p-6 bg-white border-t border-gray-100">
        <div className="flex gap-3">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Consulte aspectos técnicos..."
            className="flex-1 bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
          />
          <button onClick={sendMessage} className="bg-slate-900 text-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl hover:bg-slate-800 transition-all">
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState<ViewState>('roadmap');
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('pharma-progress-v3');
    return saved ? JSON.parse(saved) : {
      completedSteps: [],
      currentModuleId: ROADMAP[0].id,
      currentStepId: ROADMAP[0].steps[0].id
    };
  });

  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  useEffect(() => {
    localStorage.setItem('pharma-progress-v3', JSON.stringify(progress));
  }, [progress]);

  const activeModule = useMemo(() => 
    ROADMAP.find(m => m.id === progress.currentModuleId) || ROADMAP[0], 
  [progress.currentModuleId]);

  const activeStep = useMemo(() => 
    activeModule.steps.find(s => s.id === progress.currentStepId) || activeModule.steps[0],
  [activeModule, progress.currentStepId]);

  const toggleStepCompletion = (stepId: string) => {
    setProgress(prev => {
      const isCompleted = prev.completedSteps.includes(stepId);
      const newCompleted = isCompleted 
        ? prev.completedSteps.filter(id => id !== stepId)
        : [...prev.completedSteps, stepId];
      return { ...prev, completedSteps: newCompleted };
    });
  };

  const totalSteps = ROADMAP.reduce((acc, m) => acc + m.steps.length, 0);
  const completion = Math.round((progress.completedSteps.length / totalSteps) * 100);

  return (
    <div className="flex min-h-screen bg-[#FDFEFE]">
      {/* Sidebar */}
      <aside className="w-80 bg-white h-screen border-r border-gray-100 flex flex-col sticky top-0 z-20">
        <div className="p-10 border-b border-gray-50">
          <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-500 text-white rounded-lg flex items-center justify-center text-sm shadow-lg shadow-emerald-200">
              <i className="fas fa-flask"></i>
            </div>
            <span>Pharma<span className="text-emerald-500 tracking-tighter">Path</span></span>
          </h2>
        </div>
        <nav className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          <div className="space-y-2">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-4 mb-4">Navegación</h3>
            <button
              onClick={() => setView('roadmap')}
              className={`w-full text-left p-4 rounded-3xl transition-all flex items-center gap-4 ${view === 'roadmap' ? 'bg-slate-900 text-white shadow-xl' : 'hover:bg-slate-50 text-slate-500'}`}
            >
              <i className="fas fa-map-marked-alt"></i>
              <span className="text-xs font-black uppercase tracking-tighter">Plan de Estudios</span>
            </button>
            <button
              onClick={() => setView('simulator')}
              className={`w-full text-left p-4 rounded-3xl transition-all flex items-center gap-4 ${view === 'simulator' ? 'bg-emerald-500 text-white shadow-xl' : 'hover:bg-slate-50 text-slate-500'}`}
            >
              <i className="fas fa-graduation-cap"></i>
              <span className="text-xs font-black uppercase tracking-tighter">Validación (Quiz)</span>
            </button>
          </div>

          <div className="space-y-3 pt-6 border-t border-gray-50">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-4 mb-4">Fases de Aprendizaje</h3>
            {ROADMAP.map((module) => {
              const completed = module.steps.filter(s => progress.completedSteps.includes(s.id)).length;
              const total = module.steps.length;
              const isActive = progress.currentModuleId === module.id && view === 'roadmap';

              return (
                <button
                  key={module.id}
                  onClick={() => { setView('roadmap'); setProgress(prev => ({ ...prev, currentModuleId: module.id, currentStepId: module.steps[0].id })); }}
                  className={`w-full text-left p-5 rounded-3xl transition-all flex items-center gap-4 ${isActive ? 'bg-slate-100 text-slate-900 border-2 border-emerald-500' : 'hover:bg-slate-50 text-slate-500'}`}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm ${isActive ? 'bg-emerald-500 text-white' : 'bg-slate-100'}`}>
                    <i className={`fas ${module.icon}`}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-black truncate uppercase tracking-tighter">{module.title}</div>
                    <div className="text-[8px] font-bold mt-1 opacity-60">{completed}/{total} Unidades</div>
                  </div>
                </button>
              );
            })}
          </div>
        </nav>
      </aside>

      <main className="flex-1 p-12 overflow-y-auto bg-[#F8FAFB]">
        {view === 'roadmap' ? (
          <>
            <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-16 gap-8">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <PhaseBadge phase={activeModule.phase} />
                  <div className="h-1 w-8 bg-slate-200 rounded-full"></div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Scientific Pathway</span>
                </div>
                <h1 className="text-5xl font-black text-slate-900 leading-[1.1] tracking-tighter">
                  {activeModule.title}
                </h1>
              </div>
              <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 flex items-center gap-8 min-w-[320px]">
                <div className="w-20 h-20 relative">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="40" cy="40" r="36" fill="transparent" stroke="#F1F5F9" strokeWidth="8" />
                    <circle cx="40" cy="40" r="36" fill="transparent" stroke="#10b981" strokeWidth="8" strokeDasharray={226.2} strokeDashoffset={226.2 - (226.2 * completion) / 100} className="transition-all duration-1000" strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-black text-slate-800">{completion}%</span>
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Global Mastery</div>
                  <div className="text-xl font-black text-slate-900 leading-none">
                    {completion > 90 ? 'Board Certified' : completion > 40 ? 'Professional' : 'Academy Level'}
                  </div>
                </div>
              </div>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
              <div className="xl:col-span-8 space-y-10">
                <div className="bg-white rounded-[56px] shadow-sm border border-gray-100 overflow-hidden">
                  <div className="flex border-b border-gray-100 overflow-x-auto no-scrollbar bg-slate-50/50">
                    {activeModule.steps.map((step) => (
                      <button
                        key={step.id}
                        onClick={() => setProgress(prev => ({ ...prev, currentStepId: step.id }))}
                        className={`px-10 py-6 text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all relative ${
                          progress.currentStepId === step.id ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-600'
                        }`}
                      >
                        {step.title}
                        {progress.currentStepId === step.id && <div className="absolute bottom-0 left-0 w-full h-1 bg-emerald-500 rounded-full"></div>}
                      </button>
                    ))}
                  </div>

                  <div className="p-12">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-6">
                      <div>
                        <h2 className="text-3xl font-black text-slate-900 leading-none tracking-tighter">{activeStep.title}</h2>
                        <p className="text-xs font-bold text-slate-400 mt-3 uppercase tracking-widest flex items-center gap-2">
                           <i className="fas fa-layer-group text-emerald-500"></i> Critical Unit Mastery
                        </p>
                      </div>
                      <button 
                        onClick={() => toggleStepCompletion(activeStep.id)}
                        className={`px-10 py-4 rounded-[24px] text-xs font-black uppercase tracking-widest transition-all transform active:scale-95 shadow-xl ${
                          progress.completedSteps.includes(activeStep.id) 
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                          : 'bg-slate-900 text-white hover:bg-slate-800'
                        }`}
                      >
                        {progress.completedSteps.includes(activeStep.id) ? '✓ Milestone Validated' : 'Validate Competency'}
                      </button>
                    </div>

                    <div className="prose prose-slate max-w-none mb-12">
                       <p className="text-2xl text-slate-700 italic border-l-8 border-emerald-500 pl-10 leading-relaxed font-medium">
                        {activeStep.description}
                      </p>
                      <div className="mt-8 text-slate-600">{activeStep.content}</div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                      <div className="bg-[#FAFBFB] rounded-[40px] p-10 border border-slate-100/50">
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8">Conceptos Clave</h3>
                        <ul className="space-y-6">
                          {activeStep.keyKnowledge.map((k, i) => (
                            <li key={i} className="flex items-start gap-4 text-sm font-bold text-slate-700 group">
                              <div className="mt-1.5 w-2 h-2 rounded-full bg-emerald-500 group-hover:scale-150 transition-transform"></div>
                              {k}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-6">
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Developed Curriculum</h3>
                        <div className="grid grid-cols-1 gap-4">
                          {activeStep.resources.map((res, i) => (
                            <ResourceCard key={i} res={res} onOpen={setSelectedResource} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="xl:col-span-4 space-y-12">
                <AIChat context={`${activeModule.title} - ${activeStep.title}`} />
              </div>
            </div>
          </>
        ) : (
          <EvaluationView />
        )}
      </main>
      
      <ResourceModal resource={selectedResource} onClose={() => setSelectedResource(null)} />
    </div>
  );
}
