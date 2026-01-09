
import React, { useState, useEffect, useMemo } from 'react';
import { ROADMAP } from './constants';
import { CourseModule, ModuleStep, UserProgress, QuizQuestion, Resource } from './types';
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
                 className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl text-xs font-bold text-slate-700 hover:border-emerald-500 hover:text-emerald-600 transition-all shadow-sm"
               >
                 <i className="fas fa-external-link-alt text-[10px]"></i>
                 Abrir Plataforma Oficial
               </a>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 bg-slate-50 flex justify-between items-center">
          <div className="flex items-center gap-4">
             <div className="flex -space-x-2">
               {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-emerald-100 flex items-center justify-center text-[10px] font-bold text-emerald-600">P</div>)}
             </div>
             <span className="text-[10px] text-slate-400 font-bold uppercase">Validado por Expertos</span>
          </div>
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

  const getIconData = (type: string) => {
    switch(type) {
      case 'exam': return { icon: 'fa-graduation-cap', color: 'text-purple-500', bg: 'bg-purple-50' };
      case 'practice': return { icon: 'fa-flask-vial', color: 'text-amber-500', bg: 'bg-amber-50' };
      case 'video': return { icon: 'fa-circle-play', color: 'text-rose-500', bg: 'bg-rose-50' };
      case 'quiz': return { icon: 'fa-bolt-lightning', color: 'text-yellow-500', bg: 'bg-yellow-50' };
      case 'article': return { icon: 'fa-book-open', color: 'text-blue-500', bg: 'bg-blue-50' };
      default: return { icon: 'fa-file-lines', color: 'text-gray-500', bg: 'bg-gray-50' };
    }
  };

  const iconData = getIconData(res.type);

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

      {res.keyKnowledge && res.keyKnowledge.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {res.keyKnowledge.map((k, idx) => (
            <span key={idx} className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 text-slate-500 rounded-lg text-[9px] font-bold border border-slate-100 transition-colors group-hover:bg-emerald-50/50 group-hover:text-emerald-700 group-hover:border-emerald-100">
              <i className="fas fa-tag text-[7px] opacity-40"></i>
              {k}
            </span>
          ))}
        </div>
      )}
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

const QuizSection: React.FC<{ quiz: QuizQuestion[] }> = ({ quiz }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  if (!quiz || quiz.length === 0) return null;

  const q = quiz[currentIdx];

  const handleAnswer = (idx: number) => {
    setSelected(idx);
    setShowResult(true);
  };

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-8 mt-10 shadow-2xl overflow-hidden relative border border-slate-700 group">
      <div className="absolute top-0 right-0 p-8 opacity-5 transition-opacity group-hover:opacity-10">
        <i className="fas fa-dna text-9xl"></i>
      </div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-xs">
               <i className="fas fa-check"></i>
             </div>
             <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">Board Exam Practice</span>
          </div>
          <span className="text-[10px] text-slate-400 font-bold">Question {currentIdx + 1}/{quiz.length}</span>
        </div>
        <h3 className="text-xl font-bold mb-8 leading-tight">{q.question}</h3>
        <div className="space-y-3">
          {q.options.map((opt, i) => (
            <button
              key={i}
              disabled={showResult}
              onClick={() => handleAnswer(i)}
              className={`w-full text-left p-4 rounded-2xl text-sm font-medium transition-all border ${
                showResult 
                  ? i === q.correctAnswer 
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300' 
                    : selected === i 
                      ? 'border-red-500 bg-red-500/10 text-red-300' 
                      : 'border-slate-800 opacity-40'
                  : 'border-slate-800 hover:border-emerald-500 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-xl border border-slate-700 flex items-center justify-center text-xs bg-slate-800/50">{String.fromCharCode(65 + i)}</span>
                {opt}
              </div>
            </button>
          ))}
        </div>
        {showResult && (
          <div className="mt-8 p-6 bg-slate-800/50 rounded-[24px] border border-slate-700/50 animate-fade-in">
            <p className="text-[10px] text-emerald-400 mb-2 font-black uppercase tracking-widest">Rationale & Analysis</p>
            <p className="text-sm text-slate-300 leading-relaxed font-medium">{q.explanation}</p>
            <button 
              onClick={() => { setShowResult(false); setSelected(null); setCurrentIdx((currentIdx + 1) % quiz.length); }}
              className="mt-6 flex items-center gap-2 text-xs font-bold text-white hover:text-emerald-400 transition-colors"
            >
              Siguiente Análisis <i className="fas fa-arrow-right text-[10px]"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const ChronogramTimeline: React.FC<{ progress: string[], onSelect: (modId: string, stepId: string) => void }> = ({ progress, onSelect }) => (
  <div className="space-y-8">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Cronograma de Estudios</h3>
      <span className="text-[10px] font-bold text-emerald-500">Optimizando Ruta Crítica</span>
    </div>
    <div className="relative pl-8 border-l-2 border-slate-100 space-y-10">
      {ROADMAP.map((module) => (
        <div key={module.id} className="relative">
          <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full border-4 border-white bg-emerald-500 shadow-lg shadow-emerald-200"></div>
          <div className="mb-4">
            <PhaseBadge phase={module.phase} />
            <h4 className="text-md font-black text-slate-800 mt-2">{module.title}</h4>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {module.steps.map(step => {
              const isDone = progress.includes(step.id);
              return (
                <button 
                  key={step.id}
                  onClick={() => onSelect(module.id, step.id)}
                  className={`text-left p-4 rounded-2xl border text-[11px] font-bold transition-all flex items-center justify-between group ${
                    isDone ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-white border-gray-100 text-slate-500 hover:border-emerald-300 hover:shadow-sm'
                  }`}
                >
                  <span className="truncate pr-4 uppercase tracking-tighter">{step.title}</span>
                  {isDone ? <i className="fas fa-check-circle text-emerald-500"></i> : <i className="fas fa-chevron-right text-[8px] opacity-30 group-hover:translate-x-1 group-hover:opacity-100 transition-all"></i>}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Sidebar: React.FC<{ 
  currentModuleId: string, 
  onSelectModule: (id: string) => void,
  progress: string[]
}> = ({ currentModuleId, onSelectModule, progress }) => (
  <aside className="w-80 bg-white h-screen border-r border-gray-100 flex flex-col sticky top-0 z-20">
    <div className="p-10 border-b border-gray-50">
      <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3">
        <div className="w-8 h-8 bg-emerald-500 text-white rounded-lg flex items-center justify-center text-sm shadow-lg shadow-emerald-200">
          <i className="fas fa-flask"></i>
        </div>
        <span>Pharma<span className="text-emerald-500 tracking-tighter">Path</span></span>
      </h2>
      <div className="mt-4 h-1 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full bg-emerald-500 w-1/3 animate-pulse"></div>
      </div>
    </div>
    <nav className="flex-1 overflow-y-auto p-6 space-y-3 custom-scrollbar">
      {ROADMAP.map((module) => {
        const completed = module.steps.filter(s => progress.includes(s.id)).length;
        const total = module.steps.length;
        const isActive = currentModuleId === module.id;

        return (
          <button
            key={module.id}
            onClick={() => onSelectModule(module.id)}
            className={`w-full text-left p-5 rounded-3xl transition-all duration-300 flex items-center gap-4 ${
              isActive 
              ? 'bg-slate-900 text-white shadow-2xl ring-4 ring-slate-100' 
              : 'hover:bg-slate-50 text-slate-500'
            }`}
          >
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-lg transition-colors ${
              isActive ? 'bg-emerald-500 text-white' : 'bg-slate-100'
            }`}>
              <i className={`fas ${module.icon}`}></i>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-black truncate uppercase tracking-tighter">{module.title}</div>
              <div className="text-[9px] font-bold mt-1 opacity-60">
                {completed}/{total} Milestone Units
              </div>
            </div>
          </button>
        );
      })}
    </nav>
  </aside>
);

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
      setMessages(prev => [...prev, { role: 'model', content: "Hubo un error de conexión con el núcleo de inteligencia." }]);
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
          <p className="text-[9px] text-emerald-400 font-bold uppercase tracking-widest">Nivel Director Senior</p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar bg-slate-50/30">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[90%] p-5 rounded-[28px] text-sm leading-relaxed ${
              m.role === 'user' ? 'bg-emerald-600 text-white rounded-br-none' : 'bg-white text-slate-700 rounded-tl-none shadow-sm border border-gray-100'
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
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('pharma-progress-v2');
    return saved ? JSON.parse(saved) : {
      completedSteps: [],
      currentModuleId: ROADMAP[0].id,
      currentStepId: ROADMAP[0].steps[0].id
    };
  });

  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  useEffect(() => {
    localStorage.setItem('pharma-progress-v2', JSON.stringify(progress));
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
      <Sidebar 
        currentModuleId={progress.currentModuleId} 
        onSelectModule={(id) => setProgress(prev => ({ 
          ...prev, 
          currentModuleId: id, 
          currentStepId: ROADMAP.find(m => m.id === id)?.steps[0].id || prev.currentStepId 
        }))} 
        progress={progress.completedSteps}
      />

      <main className="flex-1 p-12 overflow-y-auto bg-[#F8FAFB]">
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
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8">Conceptos Clave de la Unidad</h3>
                    <ul className="space-y-6">
                      {activeStep.keyKnowledge.map((k, i) => (
                        <li key={i} className="flex items-start gap-4 text-sm font-bold text-slate-700 group">
                          <div className="mt-1.5 w-2 h-2 rounded-full bg-emerald-500 shadow-lg shadow-emerald-200 group-hover:scale-150 transition-transform"></div>
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

                {activeStep.quiz && <QuizSection quiz={activeStep.quiz} />}
              </div>
            </div>

            <div className="bg-white rounded-[56px] p-12 border border-gray-100 shadow-sm overflow-hidden">
               <ChronogramTimeline 
                progress={progress.completedSteps} 
                onSelect={(mid, sid) => setProgress(p => ({...p, currentModuleId: mid, currentStepId: sid}))} 
              />
            </div>
          </div>

          <div className="xl:col-span-4 space-y-12">
            <AIChat context={`${activeModule.title} - ${activeStep.title}`} />
            
            <div className="bg-slate-900 rounded-[48px] p-10 text-white shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full -mr-24 -mt-24 group-hover:scale-150 transition-transform duration-700"></div>
               <h4 className="text-xl font-black mb-6 flex items-center gap-3">
                 <i className="fas fa-trophy text-amber-400"></i>
                 Professional Roadmap
               </h4>
               <div className="space-y-4">
                 {[
                   { icon: 'fa-briefcase', title: 'Technical Director', desc: 'Phase 5 Required' },
                   { icon: 'fa-microscope', title: 'Quality Assurance Head', desc: 'GMP Certified' },
                   { icon: 'fa-globe', title: 'International License', desc: 'PEBC Standard' }
                 ].map((item, idx) => (
                   <div key={idx} className="p-5 bg-white/5 rounded-[24px] border border-white/10 hover:bg-white/10 transition-colors">
                     <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-sm"><i className={`fas ${item.icon}`}></i></div>
                       <div>
                         <div className="text-xs font-black">{item.title}</div>
                         <div className="text-[9px] text-white/40 font-bold uppercase tracking-widest mt-1">{item.desc}</div>
                       </div>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </div>
      </main>
      
      <ResourceModal resource={selectedResource} onClose={() => setSelectedResource(null)} />
    </div>
  );
}
