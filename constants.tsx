
import { CourseModule } from './types';

export const ROADMAP: CourseModule[] = [
  {
    id: 'foundation',
    title: 'Fase 1: Cimientos Científicos (Mes 1-4)',
    icon: 'fa-microscope',
    phase: 1,
    steps: [
      {
        id: 'basic-chem',
        phase: 1,
        title: 'Química General e Inorgánica',
        description: 'Desde la tabla periódica hasta la estequiometría farmacéutica.',
        content: 'Todo gran farmacéutico domina la materia. Aquí aprenderás sobre enlaces químicos, soluciones y la base de las formulaciones inorgánicas.',
        resources: [
          { title: 'Química de Chang - Capítulos Fundamentales', type: 'article', level: 'beginner', estimatedTime: '2 semanas', url: '#' },
          { title: 'Simulador de Soluciones Molares', type: 'practice', level: 'beginner', estimatedTime: '3h', url: '#' }
        ],
        keyKnowledge: ['Unidades de concentración', 'Equilibrio Químico', 'Propiedades Coligativas'],
        quiz: [
          {
            question: "¿Qué es una solución isotónica en el contexto farmacéutico?",
            options: ["Una solución con mayor presión osmótica que la sangre", "Una solución con la misma presión osmótica que los fluidos corporales", "Una solución con menos solutos que el agua destilada", "Una solución saturada de NaCl"],
            correctAnswer: 1,
            explanation: "Las soluciones isotónicas (como el SSN 0.9%) mantienen el equilibrio osmótico con las células, vital para inyectables."
          }
        ]
      },
      {
        id: 'org-chem-adv',
        phase: 1,
        title: 'Orgánica y Mecanismos de Reacción',
        description: 'La arquitectura de las moléculas de los medicamentos.',
        content: 'Estudiaremos cómo se forman los enlaces carbono-carbono y cómo los grupos funcionales dictan la farmacocinética.',
        resources: [
          { title: 'Organic Chemistry Masterclass', type: 'video', level: 'intermediate', estimatedTime: '4 semanas', url: '#' },
          { title: 'Banco de Síntesis de Heterociclos', type: 'practice', level: 'expert', estimatedTime: '10h', url: '#' }
        ],
        keyKnowledge: ['Estereoquímica', 'Quiralidad en Fármacos', 'Reactividad Nucleofílica'],
        quiz: [
          {
            question: "¿Por qué es crítica la quiralidad en la Talidomida?",
            options: ["Un isómero es sedante y el otro teratogénico", "Ambos isómeros son idénticos", "La quiralidad solo afecta el color", "Aumenta la solubilidad en agua"],
            correctAnswer: 0,
            explanation: "La quiralidad puede determinar si un fármaco es seguro o tóxico; el isómero (S) de la talidomida causa malformaciones."
          }
        ]
      }
    ]
  },
  {
    id: 'industrial-core',
    title: 'Fase 2: Núcleo Profesional e Industrial (Mes 5-10)',
    icon: 'fa-industry',
    phase: 2,
    steps: [
      {
        id: 'production-mixes',
        phase: 2,
        title: 'Producción Técnica y Mezclas',
        description: 'Centrales de mezclas y ajuste de dosis (Funciones del Rol).',
        content: 'Aprenderás a garantizar productividad, oportunidad y calidad en preparaciones magistrales y nutriciones parenterales.',
        resources: [
          { title: 'Guía de Buenas Prácticas de Elaboración (BPE)', type: 'article', level: 'expert', estimatedTime: '1 semana', url: '#' },
          { title: 'Cálculo de Dosis Pediátricas y Oncológicas', type: 'practice', level: 'expert', estimatedTime: '5h', url: '#' }
        ],
        keyKnowledge: ['Cálculos de Infusión', 'Estabilidad de Mezclas', 'Áreas Blancas/Limpias'],
        quiz: [
          {
            question: "¿Qué es una cabina de flujo laminar vertical?",
            options: ["Un extractor de aire común", "Un equipo para manejar citostáticos protegiendo al operador", "Un estante de almacenamiento", "Un sistema de refrigeración"],
            correctAnswer: 1,
            explanation: "El flujo vertical protege al operador de aerosoles peligrosos, común en centrales de mezclas oncológicas."
          }
        ]
      },
      {
        id: 'supply-chain',
        phase: 2,
        title: 'Gestión de Suministros y Compras',
        description: 'Auditoría de consumos y gestión de medicamentos de alto costo.',
        content: 'Funciones clave: recibir órdenes, auditar pedidos y modificar inventarios basados en perfiles epidemiológicos.',
        resources: [
          { title: 'Gestión de Inventarios Farmacéuticos ABC-VEN', type: 'article', level: 'intermediate', estimatedTime: '3h', url: '#' },
          { title: 'Curso de Compras Públicas en Salud', type: 'video', level: 'intermediate', estimatedTime: '8h', url: '#' }
        ],
        keyKnowledge: ['Indicadores de Gestión (KPIs)', 'Rotación de Inventario', 'Cadena de Frío'],
        quiz: [
          {
            question: "¿Qué significa el sistema VEN en inventarios?",
            options: ["Vital, Esencial, No esencial", "Verde, Escaso, Nuevo", "Venta, Entrega, Negociación", "Valor Estimado Neto"],
            correctAnswer: 0,
            explanation: "VEN prioriza los medicamentos según su importancia para la vida del paciente en la gestión hospitalaria."
          }
        ]
      }
    ]
  },
  {
    id: 'clinical-quality',
    title: 'Fase 3: Especialidad Clínica y Calidad (Mes 11-16)',
    icon: 'fa-clipboard-check',
    phase: 3,
    steps: [
      {
        id: 'pharmacotherapy-adv',
        phase: 3,
        title: 'Seguimiento Farmacoterapéutico',
        description: 'Garantizar el uso racional en IPS (Nivel PEBC).',
        content: 'Uso de la metodología Dáder y detección de PRM (Problemas Relacionados con Medicamentos).',
        resources: [
          { title: 'Método Dáder: Guía de Seguimiento', type: 'article', level: 'expert', estimatedTime: '2 semanas', url: '#' },
          { title: 'Interacciones de Nivel 1 (Guía Rápida)', type: 'article', level: 'expert', url: '#' }
        ],
        keyKnowledge: ['RNM (Resultados Negativos)', 'Conciliación Medicamentosa', 'Farmacovigilancia Activa'],
        quiz: [
          {
            question: "¿Cuál es el objetivo principal de la conciliación medicamentosa?",
            options: ["Ahorrar dinero en la farmacia", "Evitar discrepancias entre los medicamentos que el paciente tomaba y los nuevos", "Vender más medicamentos", "Simplificar la receta"],
            correctAnswer: 1,
            explanation: "La conciliación asegura que no haya omisiones o duplicidades durante las transiciones de cuidado (ej. ingreso a hospital)."
          }
        ]
      },
      {
        id: 'quality-audit',
        phase: 3,
        title: 'Gestión de Calidad y Auditoría',
        description: 'Tratamiento de no conformes y auditorías al gerente general.',
        content: 'Cómo realizar una auditoría técnica y presentar informes de cumplimiento regulatorio.',
        resources: [
          { title: 'Manual de Auditoría Farmacéutica ISO 9001', type: 'article', level: 'expert', estimatedTime: '3 semanas', url: '#' },
          { title: 'Plantilla de Informe de Auditoría para Gerencia', type: 'practice', level: 'expert', url: '#' }
        ],
        keyKnowledge: ['Normas ISO en Salud', 'Acciones Correctivas (CAPA)', 'Trazabilidad de Lotes']
      }
    ]
  },
  {
    id: 'international-licensing',
    title: 'Fase 4: Élite Internacional (PEBC) y Liderazgo (Mes 17+)',
    icon: 'fa-globe',
    phase: 4,
    steps: [
      {
        id: 'pebc-prep-bank',
        phase: 4,
        title: 'Bancos de Preguntas PEBC',
        description: 'Simulacros intensivos para el examen Evaluating y Qualifying.',
        content: 'Tu meta final: el licenciamiento internacional. Enfoque en leyes canadienses, ética y farmacoterapia de alto nivel.',
        resources: [
          { title: 'PEBC License Exam Bank (Acceso Premium)', type: 'exam', level: 'pebc', estimatedTime: '6 meses', url: '#' },
          { title: 'Simulador OSCE: Estaciones de Comunicación', type: 'practice', level: 'pebc', url: '#' },
          { title: 'PharmaSuccess PEBC Mastery Guide', type: 'article', level: 'pebc', url: '#' }
        ],
        keyKnowledge: ['Leyes Federales de Farmacia', 'Ética Profesional Canadiense', 'Cálculos Farmacéuticos Avanzados'],
        quiz: [
          {
            question: "En Canadá, ¿cuál es el rol de NAPRA?",
            options: ["Vender seguros médicos", "Establecer estándares nacionales de práctica farmacéutica", "Fabricar medicamentos genéricos", "Regular el precio de las patentes"],
            correctAnswer: 1,
            explanation: "NAPRA (National Association of Pharmacy Regulatory Authorities) armoniza los estándares de práctica en todo Canadá."
          }
        ]
      }
    ]
  },
  {
    id: 'technical-direction',
    title: 'Fase 5: Dirección Técnica y Liderazgo (Expert)',
    icon: 'fa-user-tie',
    phase: 5,
    steps: [
      {
        id: 'regulatory-mastery',
        phase: 5,
        title: 'Asuntos Regulatorios y Vigilancia Sanitaria',
        description: 'Liderazgo integral en registros, certificaciones y cumplimiento técnico-legal.',
        content: 'Aprenderás a gestionar el relacionamiento con entidades regulatorias (como INVIMA o FDA) para mantener registros sanitarios y autorizaciones de comercialización. Dominarás la toma de decisiones técnicas sobre aprobación y liberación de lotes.',
        resources: [
          { title: 'Guía de Registros Sanitarios y Renovaciones', type: 'article', level: 'expert', estimatedTime: '2 semanas', url: '#' },
          { title: 'Curso de Legislación Sanitaria Vigente', type: 'video', level: 'expert', estimatedTime: '15h', url: '#' },
          { title: 'Manejo de Notificaciones Adversas (Farmacovigilancia)', type: 'practice', level: 'expert', url: '#' }
        ],
        keyKnowledge: ['Normatividad Sanitaria Nacional/Internacional', 'Gestión de Registros Sanitarios', 'Cumplimiento Técnico-Legal'],
        quiz: [
          {
            question: "¿Cuál es la función primordial de un Director Técnico en la liberación de un producto?",
            options: ["Verificar el precio de venta", "Certificar que el lote cumple con todas las especificaciones y normatividad", "Entrevistar al personal de ventas", "Revisar el diseño de la caja"],
            correctAnswer: 1,
            explanation: "El Director Técnico es legalmente responsable de asegurar que cada producto liberado cumpla con los estándares de calidad y seguridad establecidos."
          }
        ]
      },
      {
        id: 'quality-bpl-mastery',
        phase: 5,
        title: 'Dirección de Calidad (BPM/BPL)',
        description: 'Control fisicoquímico, microbiológico y dirección de laboratorios.',
        content: 'Dominio de las Buenas Prácticas de Laboratorio (BPL) y Manufactura (BPM). Dirigirás unidades de análisis externos, garantizando la formación y el desempeño del equipo técnico bajo tu supervisión.',
        resources: [
          { title: 'Manual de Control de Calidad Fisicoquímico', type: 'article', level: 'expert', url: '#' },
          { title: 'Protocolos de Microbiología Farmacéutica', type: 'practice', level: 'expert', url: '#' },
          { title: 'Simulación de Auditoría BPL (Inspección Visual)', type: 'practice', level: 'expert', url: '#' }
        ],
        keyKnowledge: ['Análisis Microbiológico', 'Ensayos Fisicoquímicos USP/BP', 'Liderazgo de Equipos Técnicos']
      },
      {
        id: 'platforms-mastery',
        phase: 5,
        title: 'Dominio de Plataformas Sectoriales',
        description: 'Uso experto de herramientas digitales: SICOQ, MedDRA, Kawak, RH1.',
        content: 'La digitalización es clave. Debes ser experto en las plataformas que rigen la industria para reportes, gestión de calidad y control de sustancias.',
        resources: [
          { title: 'Tutorial Experto SICOQ: Sustancias Controladas', type: 'video', level: 'expert', estimatedTime: '5h', url: '#' },
          { title: 'Guía MedDRA para Codificación de Reacciones', type: 'article', level: 'expert', url: '#' },
          { title: 'Kawak: Gestión Documental de Calidad', type: 'practice', level: 'expert', url: '#' },
          { title: 'Entorno PISIS y RH1: Reportes de Residuos Hospitalarios', type: 'article', level: 'expert', url: '#' },
          { title: 'Manual NeosisPro para Clientes', type: 'article', level: 'expert', url: '#' }
        ],
        keyKnowledge: ['Codificación MedDRA', 'Control SICOQ', 'Gestión Kawak', 'Reportes RH1/PISIS'],
        quiz: [
          {
            question: "¿Para qué se utiliza principalmente MedDRA en la industria farmacéutica?",
            options: ["Para calcular el precio de exportación", "Para la codificación estandarizada de eventos adversos", "Para diseñar moléculas en 3D", "Para gestionar la nómina"],
            correctAnswer: 1,
            explanation: "MedDRA es una terminología médica estandarizada globalmente para facilitar el intercambio de información regulatoria y farmacovigilancia."
          }
        ]
      }
    ]
  }
];
