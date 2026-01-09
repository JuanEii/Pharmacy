
import React, { useState, useEffect, useMemo } from 'react';
import { ROADMAP } from './constants';
import { CourseModule, ModuleStep, UserProgress, QuizQuestion } from './types';
import { GoogleGenAI } from "@google/genai";

// --- Sub-Components ---

const PhaseBadge: React.FC<{ phase: number }> = ({ phase }) => {
  const styles = [
    'bg-blue-100 text-blue-700 border-blue-200',
    'bg-amber-100 text-amber-700 border-amber-200',
    'bg-rose-100 text-rose-700 border-rose-200',
    'bg-purple-100 text-purple-700 border-purple-200',
    'bg-slate-800 text-white border-slate-900 shadow-sm' // Style for Phase 5 (Technical Direction)
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
    <div className="bg-slate-900 text-white rounded-3xl p-6 mt-8 shadow-2xl overflow-hidden relative border border-slate-700">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <i className="fas fa-question-circle text-8xl"></i>
      </div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">Validación de Conocimientos</span>
          <span className="text-[10px] text-slate-400">Pregunta {currentIdx + 1} de {quiz.length}</span>
        </div>
        <h3 className="text-xl font-bold mb-6">{q.question}</h3>
        <div className="space-y-3">
          {q.options.map((opt, i) => (
            <button
              key={i}
              disabled={showResult}
              onClick={() => handleAnswer(i)}
              className={`w-full text-left p-4 rounded-xl text-sm transition-all border ${
                showResult 
                  ? i === q.correctAnswer 
                    ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300' 
                    : selected === i 
                      ? 'border-red-500 bg-red-500/20 text-red-300' 
                      : 'border-slate-700 opacity-50'
                  : 'border-slate-700 hover:border-emerald-500 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-[10px]">{String.fromCharCode(65 + i)}</span>
                {opt}
              </div>
            </button>
          ))}
        </div>
        {showResult && (
          <div className="mt-6 p-4 bg-slate-800 rounded-2xl animate-fade-in border-l-4 border-emerald-500">
            <p className="text-xs text-slate-400 mb-1 font-bold uppercase">Explicación Técnica:</p>
            <p className="text-sm text-slate-200 leading-relaxed">{q.explanation}</p>
            <button 
              onClick={() => { setShowResult(false); setSelected(null); setCurrentIdx((currentIdx + 1) % quiz.length); }}
              className="mt-4 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              Siguiente Desafío <i className="fas fa-arrow-right ml-1"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const ResourceCard: React.FC<{ res: any }> = ({ res }) => {
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
    <div className="group relative flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 hover:border-emerald-300 hover:shadow-[0_10px_30px_-15px_rgba(16,185,129,0.2)] transition-all duration-300 hover:-translate-y-1">
      <div className={`flex-shrink-0 w-14 h-14 ${iconData.bg} rounded-xl flex items-center justify-center text-xl transition-transform group-hover:scale-110 duration-300`}>
        <i className={`fas ${iconData.icon} ${iconData.color}`}></i>
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          {res.level && (
            <span className={`text-[8px] font-black px-1.5 py-0.5 rounded border tracking-widest uppercase ${getLevelStyles(res.level)}`}>
              {res.level}
            </span>
          )}
          {res.estimatedTime && <span className="text-[9px] font-bold text-gray-400 uppercase">⏱️ {res.estimatedTime}</span>}
        </div>
        <h4 className="text-sm font-bold text-slate-800 truncate group-hover:text-emerald-700 transition-colors">
          {res.title}
        </h4>
      </div>

      <a href={res.url} className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-emerald-50 transition-all duration-300">
        <i className="fas fa-external-link-alt text-[10px] text-emerald-500"></i>
      </a>
    </div>
  );
};

const ChronogramTimeline: React.FC<{ progress: string[], onSelect: (modId: string, stepId: string) => void }> = ({ progress, onSelect }) => (
  <div className="space-y-6">
    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Cronograma de Estudios Maestro</h3>
    <div className="relative pl-6 border-l-2 border-slate-100 space-y-8">
      {ROADMAP.map((module) => (
        <div key={module.id} className="relative">
          <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full border-2 border-white bg-emerald-500 shadow-sm"></div>
          <div className="mb-2">
            <PhaseBadge phase={module.phase} />
            <h4 className="text-sm font-black text-slate-800 mt-1">{module.title}</h4>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {module.steps.map(step => {
              const isDone = progress.includes(step.id);
              return (
                <button 
                  key={step.id}
                  onClick={() => onSelect(module.id, step.id)}
                  className={`text-left p-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-between group ${
                    isDone ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-white border-gray-100 text-slate-500 hover:border-emerald-300'
                  }`}
                >
                  <span className="truncate pr-2">{step.title}</span>
                  {isDone ? <i className="fas fa-check-circle text-emerald-500"></i> : <i className="fas fa-chevron-right text-[10px] text-gray-300 group-hover:translate-x-1 transition-transform"></i>}
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
  <aside className="w-72 bg-white h-screen border-r border-gray-200 flex flex-col sticky top-0 z-20">
    <div className="p-8 border-b border-gray-50">
      <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
        <span className="text-emerald-500"><i className="fas fa-dna"></i></span> Pharma<span className="text-emerald-500">Path</span>
      </h2>
      <p className="text-[10px] text-gray-400 mt-2 uppercase tracking-widest font-bold">Scientific Excellence</p>
    </div>
    <nav className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
      {ROADMAP.map((module) => {
        const completedInModule = module.steps.filter(s => progress.includes(s.id)).length;
        const totalInModule = module.steps.length;
        const isDone = completedInModule === totalInModule;
        const isActive = currentModuleId === module.id;

        return (
          <button
            key={module.id}
            onClick={() => onSelectModule(module.id)}
            className={`w-full text-left p-4 rounded-2xl transition-all duration-300 flex items-center gap-4 ${
              isActive 
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200 ring-4 ring-emerald-50' 
              : 'hover:bg-gray-50 text-slate-600'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-colors ${
              isActive ? 'bg-white/20' : 'bg-gray-100'
            }`}>
              <i className={`fas ${module.icon}`}></i>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold truncate">{module.title}</div>
              <div className={`text-[10px] font-medium mt-0.5 ${isActive ? 'text-emerald-100' : 'text-gray-400'}`}>
                {completedInModule}/{totalInModule} Completados
              </div>
            </div>
            {isDone && <i className={`fas fa-check-circle ${isActive ? 'text-white' : 'text-emerald-500'}`}></i>}
          </button>
        );
      })}
    </nav>
    <div className="p-6 bg-slate-50 border-t border-gray-100">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
          <i className="fas fa-user-graduate text-slate-500"></i>
        </div>
        <div>
          <p className="text-xs font-bold text-slate-800">Candidato TOP</p>
          <p className="text-[10px] text-slate-400">Nivel Pro II</p>
        </div>
      </div>
    </div>
  </aside>
);

const AIChat: React.FC<{ context: string }> = ({ context }) => {
  const [messages, setMessages] = useState<{role: 'user' | 'model', content: string}[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          { text: `Eres un experto Mentor en Química Farmacéutica, Director Técnico Senior y Candidato PEBC. Estás ayudando a un estudiante de nivel experto en: "${context}". Tus respuestas deben ser de alto nivel estratégico y técnico, citando guías ICH, FDA, normatividad sanitaria vigente y el uso de plataformas como SICOQ, MedDRA y Kawak cuando sea relevante.` },
          ...messages.map(m => ({ text: `${m.role === 'user' ? 'Pregunta' : 'Respuesta'}: ${m.content}` })),
          { text: `Pregunta actual: ${input}` }
        ]
      });
      
      const reply = response.text || "Lo siento, no pude procesar esa respuesta.";
      setMessages(prev => [...prev, { role: 'model', content: reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', content: "Hubo un error conectando con el laboratorio IA." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl flex flex-col h-[550px] border border-gray-100 overflow-hidden sticky top-8">
      <div className="p-5 bg-slate-800 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
              <i className="fas fa-robot text-lg"></i>
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-800 rounded-full"></div>
          </div>
          <div>
            <h4 className="font-bold text-sm tracking-tight">Mentor IA Senior Director</h4>
            <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Online & Ready</p>
          </div>
        </div>
        <button className="text-slate-400 hover:text-white transition-colors"><i className="fas fa-ellipsis-v"></i></button>
      </div>
      <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar bg-slate-50/50">
        {messages.length === 0 && (
          <div className="text-center mt-12 px-6">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-flask text-3xl text-emerald-600 animate-pulse"></i>
            </div>
            <h5 className="text-slate-800 font-bold mb-2">Consulta de Nivel Estratégico</h5>
            <p className="text-xs text-slate-500 leading-relaxed">¿Dudas sobre Dirección Técnica, validación ICH o plataformas como SICOQ/MedDRA? Estoy aquí para profundizar.</p>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}>
            <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
              m.role === 'user' 
                ? 'bg-emerald-600 text-white rounded-tr-none' 
                : 'bg-white text-slate-700 rounded-tl-none border border-gray-100'
            }`}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-2 p-3 bg-white rounded-2xl w-24 items-center justify-center shadow-sm">
            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"></div>
            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce delay-100"></div>
            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce delay-200"></div>
          </div>
        )}
      </div>
      <div className="p-5 bg-white border-t border-gray-100">
        <div className="flex gap-2">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Escribe tu consulta de Dirección Técnica..."
            className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
          />
          <button 
            onClick={sendMessage}
            disabled={loading}
            className="bg-emerald-600 text-white w-12 h-12 rounded-xl hover:bg-emerald-700 flex items-center justify-center transition-all active:scale-95 shadow-lg shadow-emerald-200 disabled:opacity-50"
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('pharma-progress');
    return saved ? JSON.parse(saved) : {
      completedSteps: [],
      currentModuleId: ROADMAP[0].id,
      currentStepId: ROADMAP[0].steps[0].id
    };
  });

  useEffect(() => {
    localStorage.setItem('pharma-progress', JSON.stringify(progress));
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
  const completionPercentage = Math.round((progress.completedSteps.length / totalSteps) * 100);

  return (
    <div className="flex min-h-screen bg-white selection:bg-emerald-100 selection:text-emerald-900">
      <Sidebar 
        currentModuleId={progress.currentModuleId} 
        onSelectModule={(id) => setProgress(prev => ({ 
          ...prev, 
          currentModuleId: id, 
          currentStepId: ROADMAP.find(m => m.id === id)?.steps[0].id || prev.currentStepId 
        }))} 
        progress={progress.completedSteps}
      />

      <main className="flex-1 p-8 lg:p-12 overflow-y-auto bg-[#fafbfc]">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div className="max-w-xl">
            <nav className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
              <span>Etapa de Aprendizaje</span>
              <i className="fas fa-chevron-right text-[8px]"></i>
              <PhaseBadge phase={activeModule.phase} />
            </nav>
            <h1 className="text-4xl font-black text-slate-800 leading-tight">{activeModule.title}</h1>
            <p className="text-slate-500 mt-2 text-lg">Domina cada hito para convertirte en un farmacéutico TOP.</p>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6 min-w-[240px]">
            <div className="w-16 h-16 relative">
               <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="32" cy="32" r="28"
                  fill="transparent"
                  stroke="#f1f5f9"
                  strokeWidth="8"
                />
                <circle
                  cx="32" cy="32" r="28"
                  fill="transparent"
                  stroke="#10b981"
                  strokeWidth="8"
                  strokeDasharray={175.9}
                  strokeDashoffset={175.9 - (175.9 * completionPercentage) / 100}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                 <span className="text-sm font-black text-slate-800">{completionPercentage}%</span>
              </div>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Maestría Total</div>
              <div className="text-lg font-black text-slate-800 mt-0.5">Nivel: {completionPercentage > 90 ? 'Senior Director' : completionPercentage > 50 ? 'Elite Professional' : 'Aspirante'}</div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
          {/* Main Content Area */}
          <div className="xl:col-span-8 space-y-8">
            <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex border-b border-gray-50 overflow-x-auto no-scrollbar bg-slate-50/30">
                {activeModule.steps.map((step) => (
                  <button
                    key={step.id}
                    onClick={() => setProgress(prev => ({ ...prev, currentStepId: step.id }))}
                    className={`px-8 py-5 text-sm font-bold whitespace-nowrap transition-all relative ${
                      progress.currentStepId === step.id 
                      ? 'text-emerald-600' 
                      : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    {step.title}
                    {progress.currentStepId === step.id && (
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-emerald-500 rounded-full"></div>
                    )}
                    {progress.completedSteps.includes(step.id) && <i className="fas fa-check-circle ml-2 text-emerald-500 text-[10px]"></i>}
                  </button>
                ))}
              </div>

              <div className="p-10">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center text-xl shadow-inner">
                       <i className={`fas ${activeModule.icon}`}></i>
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-slate-800 leading-none">{activeStep.title}</h2>
                      <p className="text-xs text-slate-400 mt-2 font-medium">Cronograma de Élite - Nivel {activeModule.phase}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => toggleStepCompletion(activeStep.id)}
                    className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all transform active:scale-95 ${
                      progress.completedSteps.includes(activeStep.id)
                      ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                      : 'bg-slate-800 text-white hover:bg-slate-900 shadow-xl shadow-slate-200'
                    }`}
                  >
                    {progress.completedSteps.includes(activeStep.id) ? '✓ Lección Validada' : 'Validar este Paso'}
                  </button>
                </div>

                <div className="prose prose-slate max-w-none mb-10">
                   <p className="text-xl text-slate-700 font-medium mb-6 leading-relaxed italic border-l-4 border-emerald-500 pl-6">
                    {activeStep.description}
                  </p>
                  <div className="text-slate-600 leading-relaxed space-y-4">
                    {activeStep.content.split('. ').map((sentence, idx) => (
                      <p key={idx}>{sentence}.</p>
                    ))}
                  </div>
                </div>

                {/* Interactive Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                  <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                      <i className="fas fa-microchip text-emerald-500"></i> Competencias Maestras
                    </h3>
                    <ul className="space-y-4">
                      {activeStep.keyKnowledge.map((k, i) => (
                        <li key={i} className="flex items-start gap-3 group">
                          <div className="mt-1.5 w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                          <span className="text-sm font-bold text-slate-700 group-hover:text-emerald-700 transition-colors">{k}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                       <i className="fas fa-layer-group text-emerald-500"></i> Recursos Indispensables
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      {activeStep.resources.map((res, i) => (
                        <ResourceCard key={i} res={res} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Interactive Quiz if exists */}
                {activeStep.quiz && <QuizSection quiz={activeStep.quiz} />}
              </div>
            </div>

            {/* Cronograma Visual Wrapper */}
            <div className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-sm overflow-hidden">
               <ChronogramTimeline 
                progress={progress.completedSteps} 
                onSelect={(mid, sid) => setProgress(p => ({...p, currentModuleId: mid, currentStepId: sid}))} 
              />
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="xl:col-span-4 space-y-8">
            <AIChat context={`${activeModule.title} - ${activeStep.title}`} />
            
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-[40px] p-8 text-white shadow-2xl border border-slate-700">
               <div className="flex items-center justify-between mb-8">
                  <h4 className="text-lg font-black uppercase tracking-tighter">Tu Futuro Profesional</h4>
                  <i className="fas fa-crown text-amber-400 text-xl"></i>
               </div>
               <div className="p-6 bg-white/5 rounded-3xl border border-white/10 mb-6">
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 bg-emerald-400/20 text-emerald-400 rounded-2xl flex items-center justify-center text-2xl">
                       <i className="fas fa-briefcase"></i>
                    </div>
                    <div>
                       <p className="text-sm font-black mb-1">Director Técnico IPS/Industria</p>
                       <p className="text-[10px] text-slate-400 font-medium leading-relaxed">Domina la Fase 5 para alcanzar el máximo nivel de responsabilidad legal y técnica.</p>
                    </div>
                  </div>
               </div>
               <div className="p-6 bg-white/5 rounded-3xl border border-white/10 mb-8">
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 bg-purple-400/20 text-purple-400 rounded-2xl flex items-center justify-center text-2xl">
                       <i className="fas fa-plane-departure"></i>
                    </div>
                    <div>
                       <p className="text-sm font-black mb-1">Global License PEBC</p>
                       <p className="text-[10px] text-slate-400 font-medium leading-relaxed">El estándar de oro para farmacéuticos internacionales.</p>
                    </div>
                  </div>
               </div>
               <button className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-emerald-500/20">
                  Descargar Plan de Carrera Élite
               </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
