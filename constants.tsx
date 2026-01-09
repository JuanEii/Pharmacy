
import { CourseModule } from './types';

export const ROADMAP: CourseModule[] = [
  {
    id: 'fase-1',
    title: 'Fase 1: Cimientos Científicos (Mes 1–4)',
    icon: 'fa-microscope',
    phase: 1,
    steps: [
      {
        id: 'f1-b1',
        phase: 1,
        title: 'Bloque 1: Fundamentos y Tabla Periódica',
        description: 'Semanas 1–2: Unidades, masa molar y tendencias periódicas.',
        content: 'Dominio inicial del lenguaje químico: desde el análisis dimensional hasta la organización electrónica de los elementos.',
        keyKnowledge: ['Análisis Dimensional', 'Masa Molar', 'Isótopos', 'Tendencias Periódicas'],
        resources: [
          {
            title: 'Chemistry 2e (Cap. 1-2) – OpenStax',
            type: 'article',
            url: 'https://openstax.org/books/chemistry-2e/pages/1-introduction',
            level: 'beginner',
            estimatedTime: '2 semanas',
            keyKnowledge: ['Átomos', 'Moléculas', 'Iones'],
            detailedContent: `
              <h2 class="text-2xl font-black mb-4">Fundamentos Químicos</h2>
              <p class="mb-4">Este bloque establece las reglas del juego. Debes dominar la conversión de unidades sin dudar.</p>
              <ul class="list-disc pl-6 space-y-2 mb-6">
                <li><strong>Estudio sugerido:</strong> Capítulos 1 "Essentials" y 2 "Atoms, Molecules, and Ions".</li>
                <li><strong>Reto Técnico:</strong> Resuelve 20 problemas de masa molar y conversión de moles antes de pasar al siguiente tema.</li>
              </ul>
            `
          },
          {
            title: 'General Chemistry – Coursera',
            type: 'video',
            url: 'https://www.coursera.org/learn/general-chemistry',
            level: 'beginner',
            keyKnowledge: ['Desarrollo de Conceptos'],
            detailedContent: 'Módulos 1 y 2. Enfócate en la aplicación práctica de la teoría atómica moderna.'
          }
        ]
      },
      {
        id: 'f1-b2',
        phase: 1,
        title: 'Bloque 2: Enlaces y Geometría',
        description: 'Semanas 3–4: Estructuras de Lewis y teoría VSEPR.',
        content: 'Comprender cómo se unen los átomos para formar moléculas y cómo su forma dicta su función biológica.',
        keyKnowledge: ['Enlace Iónico/Covalente', 'Estructuras de Lewis', 'VSEPR', 'Polaridad'],
        resources: [
          {
            title: 'General Chemistry 1 – OLI (Carnegie Mellon)',
            type: 'practice',
            url: 'https://oli.cmu.edu/courses/general-chemistry-1-open-free/',
            level: 'beginner',
            keyKnowledge: ['Geometría Molecular'],
            detailedContent: 'Módulos de Chemical Bonding & Molecular Structure. Practica dibujar moléculas de fármacos reales como el Paracetamol.'
          }
        ]
      },
      {
        id: 'f1-b3',
        phase: 1,
        title: 'Bloque 3: Estequiometría y Gases',
        description: 'Semanas 5–6: Ecuaciones químicas, rendimiento y soluciones.',
        content: 'Cálculo exacto de reactivos y productos. Fundamental para la preparación de soluciones en farmacia hospitalaria.',
        keyKnowledge: ['Reactivo Limitante', 'Rendimiento', 'Gases Ideales', 'Molaridad'],
        resources: [
          {
            title: 'Stoichiometry (Cap. 5-9) – OpenStax',
            type: 'article',
            url: 'https://openstax.org/books/chemistry-2e/pages/5-introduction',
            level: 'intermediate',
            keyKnowledge: ['Balanceo', 'Concentración'],
            detailedContent: 'Capítulos 5 (Estequiometría) y 9 (Gases). Realiza problemas de preparación de soluciones al 0.9% (SSN).'
          }
        ]
      },
      {
        id: 'f1-b4',
        phase: 1,
        title: 'Bloque 4: Equilibrio y pH',
        description: 'Semanas 7–8: Ácidos, bases, buffers y solubilidad Ksp.',
        content: 'Entender el equilibrio químico es vital para comprender la absorción de fármacos (pKa) y la estabilidad de formulaciones.',
        keyKnowledge: ['pH/pOH', 'Buffers', 'Ksp', 'Henderson-Hasselbalch'],
        resources: [
          {
            title: 'Acids & Bases – Khan Academy',
            type: 'video',
            url: 'https://www.khanacademy.org/science/chemistry',
            level: 'intermediate',
            keyKnowledge: ['Equilibrio Iónico'],
            detailedContent: 'Domina los conceptos de ácidos fuertes/débiles y el producto de solubilidad para entender precipitados en mezclas.'
          }
        ]
      },
      {
        id: 'f1-b5',
        phase: 1,
        title: 'Bloque 5: Estructura Orgánica',
        description: 'Semanas 9–10: Grupos funcionales e hibridación.',
        content: 'Introducción a la química del carbono. Identificación de grupos funcionales en estructuras de fármacos complejos.',
        keyKnowledge: ['Hibridación sp/sp2/sp3', 'Esqueleto de líneas', 'Grupos Funcionales'],
        resources: [
          {
            title: 'Organic Chemistry – OpenStax',
            type: 'article',
            url: 'https://openstax.org/books/organic-chemistry/pages/index',
            level: 'intermediate',
            keyKnowledge: ['Nomenclatura', 'Estructura'],
            detailedContent: 'Capítulos 1-3. Crea una tabla de grupos funcionales vinculando cada uno con un fármaco real (ej. Ácido carboxílico -> Aspirina).'
          }
        ]
      },
      {
        id: 'f1-b6',
        phase: 1,
        title: 'Bloque 6: Estereoquímica',
        description: 'Semanas 11–12: Quiralidad y su importancia clínica.',
        content: '¿Por qué la forma espacial de una molécula cambia su efecto? El caso de la talidomida y el ibuprofeno.',
        keyKnowledge: ['Enantiómeros', 'Diastereómeros', 'R/S System', 'Fischer Projections'],
        resources: [
          {
            title: 'Stereochemistry Practice – ChemInteractive',
            type: 'practice',
            url: 'https://cheminteractive.ie/',
            level: 'expert',
            keyKnowledge: ['Centros Quirales'],
            detailedContent: 'Ejercicios intensivos de determinación de centros R/S. Obligatorio para entender farmacología avanzada.'
          }
        ]
      },
      {
        id: 'f1-b7',
        phase: 1,
        title: 'Bloque 7: Mecanismos SN y E',
        description: 'Semanas 13–14: Sustitución nucleofílica y eliminación.',
        content: 'Cómo se rompen y forman enlaces. SN1 vs SN2 y su competencia con las reacciones de eliminación.',
        keyKnowledge: ['Nucleófilos', 'Sustratos', 'Cinética SN1/SN2', 'E1/E2'],
        resources: [
          {
            title: 'Reaction Guide – Master Organic Chemistry',
            type: 'article',
            url: 'https://www.masterorganicchemistry.com/reaction-guide/',
            level: 'expert',
            keyKnowledge: ['Mecanismos'],
            detailedContent: 'Guía visual definitiva de mecanismos. Dibuja a mano 15 mecanismos con flechas antes de validar.'
          }
        ]
      },
      {
        id: 'f1-b8',
        phase: 1,
        title: 'Bloque 8: Carbonilos y Adición',
        description: 'Semanas 15–16: Reactividad de alquenos y pro-fármacos.',
        content: 'Final de la base científica: Hidrólisis de ésteres y amidas, clave para entender el metabolismo de pro-fármacos.',
        keyKnowledge: ['Adición Nucleofílica', 'Hidrólisis de Ésteres', 'Aromaticidad'],
        resources: [
          {
            title: 'Carbonyl Chemistry – Khan Academy',
            type: 'video',
            url: 'https://www.khanacademy.org/science/organic-chemistry',
            level: 'expert',
            keyKnowledge: ['Reactividad Carbonilo'],
            detailedContent: 'Análisis de cómo se transforman los fármacos en el cuerpo mediante reacciones de hidrólisis.'
          }
        ]
      }
    ]
  },
  {
    id: 'fase-2',
    title: 'Fase 2: Núcleo Profesional (Mes 5–10)',
    icon: 'fa-industry',
    phase: 2,
    steps: [
      {
        id: 'f2-b1',
        phase: 2,
        title: 'Bloque 1: Propiedades Fisicoquímicas',
        description: 'Mes 5: Intro a Pharmaceutics y Preformulación.',
        content: 'De la molécula al medicamento: estados físicos, tamaño de partícula y solubilidad.',
        keyKnowledge: ['Solubilidad', 'Tensión Superficial', 'Preformulación', 'Fisicoquímica'],
        resources: [
          {
            title: 'Essential Pharmaceutics – Brunaugh',
            type: 'article',
            url: 'https://ethernet.edu.et/handle/123456789/229',
            level: 'intermediate',
            keyKnowledge: ['Pharmaceutics', 'Fisicoquímica'],
            detailedContent: 'Libro base para estudiantes con fundamentos de formas farmacéuticas y casos clínicos.'
          },
          {
            title: 'Pharmaceutics I – Udemy (Free)',
            type: 'video',
            url: 'https://www.udemy.com/course/dosage-forms-pharmaceutics-i-dosage-forms-introduction/',
            level: 'beginner',
            keyKnowledge: ['Dosage Forms'],
            detailedContent: 'Repaso básico y contextual de las diferentes formas farmacéuticas.'
          }
        ]
      },
      {
        id: 'f2-b2',
        phase: 2,
        title: 'Bloque 2: Clasificación y Sólidos',
        description: 'Mes 5: Polvos, granulados y formas sólidas básicas.',
        content: 'Categorización general y fundamentos de la fabricación de formas farmacéuticas sólidas.',
        keyKnowledge: ['Polvos', 'Granulados', 'Sólidos', 'Clasificación'],
        resources: [
          {
            title: 'Pharmaceutical Products – FutureLearn',
            type: 'video',
            url: 'https://www.futurelearn.com/courses/pharmaceutical-products-for-beginners',
            level: 'intermediate',
            keyKnowledge: ['Diseño de Producto'],
            detailedContent: 'Curso de la Univ. de Malaya sobre el diseño y procesos básicos de fabricación.'
          }
        ]
      },
      {
        id: 'f2-b3',
        phase: 2,
        title: 'Bloque 3: Sólidos Orales Avanzados',
        description: 'Mes 6: Procesos de comprimidos y cápsulas.',
        content: 'Compresión, granulación y recubrimiento. Control de calidad de sólidos orales.',
        keyKnowledge: ['Compresión', 'Recubrimiento', 'Control de Calidad', 'Disolución'],
        resources: [
          {
            title: 'Modern Pharmaceutics: A Textbook',
            type: 'article',
            url: 'https://akfarm-xaverius.ac.id/download/pharmaceutical_dosage_forms.pdf',
            level: 'expert',
            keyKnowledge: ['Diseño Industrial'],
            detailedContent: 'Visión profunda del diseño y fabricación a escala industrial de formas sólidas.'
          }
        ]
      },
      {
        id: 'f2-b4',
        phase: 2,
        title: 'Bloque 4: Semisólidos y Tópicos',
        description: 'Mes 6: Cremas, ungüentos y geles.',
        content: 'Propiedades reológicas y estabilidad de sistemas dispersos para aplicación tópica.',
        keyKnowledge: ['Emulgentes', 'Reología', 'Ungüentos', 'Geles'],
        resources: [
          {
            title: 'Essential Pharmaceutics: Semisólidos',
            type: 'article',
            url: 'https://ethernet.edu.et/handle/123456789/229',
            level: 'intermediate',
            keyKnowledge: ['Sistemas Dispersos'],
            detailedContent: 'Capítulos enfocados en reología y estabilidad física de emulsiones y semisólidos.'
          }
        ]
      },
      {
        id: 'f2-b5',
        phase: 2,
        title: 'Bloque 5: Formas Líquidas',
        description: 'Mes 7: Jarabes, suspensiones y emulsiones.',
        content: 'Estabilidad de suspensiones (sedimentación) y emulsiones (HLB).',
        keyKnowledge: ['Suspensiones', 'Emulsiones', 'HLB', 'Jarabe'],
        resources: [
          {
            title: 'Liquid Dosage Forms – FutureLearn',
            type: 'article',
            url: 'https://www.futurelearn.com/courses/pharmaceutical-products-for-beginners',
            level: 'intermediate',
            keyKnowledge: ['Tensoactivos', 'HLB'],
            detailedContent: 'Módulos sobre tipos de formas líquidas y parámetros de calidad críticos.'
          }
        ]
      },
      {
        id: 'f2-b6',
        phase: 2,
        title: 'Bloque 6: Estériles y GMP',
        description: 'Mes 7: Inyectables, estabilidad y principios GMP.',
        content: 'Requisitos de esterilidad, pirogenicidad y liofilización. Introducción a normas industriales.',
        keyKnowledge: ['Esterilidad', 'Liofilización', 'BPM/GMP', 'Estabilidad'],
        resources: [
          {
            title: 'Foundations of GMP – USP (Gratis)',
            type: 'video',
            url: 'https://www.usp.org/global-public-health/promoting-quality-of-medicines/gmp-online-course',
            level: 'expert',
            keyKnowledge: ['GMP OMS', 'PIC/S'],
            detailedContent: 'Curso de 10 módulos sobre principios de manufactura de calidad mundial.'
          }
        ]
      },
      {
        id: 'f2-b7',
        phase: 2,
        title: 'Bloque 7: Supply Chain Farmacéutica',
        description: 'Mes 8: Ciclo de suministro y actores del sector.',
        content: 'Mapeo de la cadena: desde el fabricante hasta la farmacia hospitalaria/comunitaria.',
        keyKnowledge: ['Ciclo de Suministro', 'Mayoristas', 'Actores', 'Disponibilidad'],
        resources: [
          {
            title: 'Practical Pharma Supply Management',
            type: 'article',
            url: 'https://www.udemy.com/course/pharmaceutical-supply-chain-management-a-practical-guide/',
            level: 'intermediate',
            keyKnowledge: ['Cuantificación', 'Especificación'],
            detailedContent: 'Curso completo sobre planificación y distribución con enfoque en países de ingresos medios.'
          },
          {
            title: 'Phasuma: Consultoría Supply',
            type: 'article',
            url: 'https://phasuma.com/',
            level: 'beginner',
            keyKnowledge: ['Mapeo de Cadena'],
            detailedContent: 'Referencia técnica sobre las etapas críticas del ciclo de suministro farmacéutico.'
          }
        ]
      },
      {
        id: 'f2-b8',
        phase: 2,
        title: 'Bloque 8: Planificación e Inventario',
        description: 'Mes 8: Cuantificación, pronóstico y stock de seguridad.',
        content: 'Cálculo de necesidades basado en consumo histórico y morbilidad epidemiológica.',
        keyKnowledge: ['Lead Time', 'Punto de Pedido', 'Stock Seguridad', 'Forecasting'],
        resources: [
          {
            title: 'WHO Storage & Distribution Practices',
            type: 'article',
            url: 'https://extranet.who.int/prequal/sites/default/files/document_files/TRS1025_annex7.pdf',
            level: 'expert',
            keyKnowledge: ['GSDP', 'OMS'],
            detailedContent: 'Guía oficial TRS 1025 Anexo 7 sobre buenas prácticas de almacenamiento y distribución.'
          }
        ]
      },
      {
        id: 'f2-b9',
        phase: 2,
        title: 'Bloque 9: Compras y Licitaciones',
        description: 'Mes 9: Procurement, contratos y evaluación de proveedores.',
        content: 'Transparencia, ética y cumplimiento regulatorio en la adquisición de medicamentos.',
        keyKnowledge: ['Licitación', 'Contratos', 'Ética', 'Auditoría Proveedores'],
        resources: [
          {
            title: 'Procurement Sections – Udemy',
            type: 'video',
            url: 'https://www.udemy.com/course/pharmaceutical-supply-chain-management-a-practical-guide/',
            level: 'expert',
            keyKnowledge: ['Evaluación Proveedor'],
            detailedContent: 'Módulos orientados a la práctica de negociación y compra técnica.'
          }
        ]
      },
      {
        id: 'f2-b10',
        phase: 2,
        title: 'Bloque 10: Cadena de Frío y Distribución',
        description: 'Mes 9: Logística térmica y transporte seguro.',
        content: 'Gestión de productos termosensibles, monitoreo de temperatura y segregación.',
        keyKnowledge: ['Cold Chain', 'FEFO', 'Termosensibles', 'Humedad'],
        resources: [
          {
            title: 'WHO Good Distribution Practices (GDP)',
            type: 'article',
            url: 'https://cdn.who.int/media/docs/default-source/medicines/norms-and-standards/guidelines/distribution/trs957-annex5-gdp-final.pdf',
            level: 'expert',
            keyKnowledge: ['GDP', 'Identidad Producto'],
            detailedContent: 'Guía internacional sobre la calidad e identidad del producto durante el transporte.'
          }
        ]
      },
      {
        id: 'f2-b11',
        phase: 2,
        title: 'Bloque 11: Riesgo y Trazabilidad',
        description: 'Mes 10: QMS, CAPA y puntos críticos en suministro.',
        content: 'Análisis FMEA aplicado a la logística y aseguramiento de la integridad de datos.',
        keyKnowledge: ['FMEA', 'CAPA', 'Data Integrity', 'Trazabilidad'],
        resources: [
          {
            title: 'Foundations of GMP – Auditing',
            type: 'video',
            url: 'https://www.usp.org/education/free-courses',
            level: 'expert',
            keyKnowledge: ['Auditoría Supply'],
            detailedContent: 'Módulos de auditoría de la USP extrapolables a la cadena de suministro.'
          }
        ]
      },
      {
        id: 'f2-b12',
        phase: 2,
        title: 'Bloque 12: Proyecto "Del API al Paciente"',
        description: 'Mes 10: Integración de conocimientos industriales y supply.',
        content: 'Simulación de flujo completo de un medicamento desde la planta hasta el uso por el paciente.',
        keyKnowledge: ['Flujo Completo', 'Indicadores Calidad', 'Rol Director Técnico'],
        resources: [
          {
            title: 'Guide to the Pharma Industry – Udemy',
            type: 'video',
            url: 'https://www.udemy.com/course/pharmaceutical-industry-guide/',
            level: 'intermediate',
            keyKnowledge: ['Visión Global'],
            detailedContent: 'Visión panorámica de mercados y tendencias para encajar tu proyecto en contexto global.'
          }
        ]
      }
    ]
  },
  {
    id: 'fase-3',
    title: 'Fase 3: Especialidad Clínica (Mes 11–16)',
    icon: 'fa-clipboard-check',
    phase: 3,
    steps: [
      {
        id: 'atencion-farmaceutica',
        phase: 3,
        title: 'M11-13: Seguimiento Clínico',
        description: 'Pharmaceutical Care y uso racional de medicamentos.',
        content: 'Gestión de PRM (Problemas Relacionados con Medicamentos) y atención directa al paciente.',
        keyKnowledge: ['Método Dáder', 'MTM', 'Farmacoterapia', 'OSCE'],
        resources: [
          {
            title: 'Good Pharmacy Practice – WHO/FIP',
            type: 'article',
            url: 'https://www.fip.org/good-pharmacy-practice',
            level: 'expert',
            keyKnowledge: ['GPP', 'Ética Clínica'],
            detailedContent: 'Marco oficial internacional para la práctica de farmacia clínica.'
          }
        ]
      },
      {
        id: 'calidad-auditoria',
        phase: 3,
        title: 'M14-16: Gestión de Calidad',
        description: 'Auditoría, CAPA y sistemas de gestión integrados.',
        content: 'Dominio de ISO 9001 aplicado a salud y aseguramiento de la seguridad del paciente.',
        keyKnowledge: ['ISO 9001', 'CAPA', 'Gestión de Riesgos', 'GXP'],
        resources: [
          {
            title: 'Pharmuni – GXP Training',
            type: 'practice',
            url: 'https://pharmuni.com/',
            level: 'expert',
            keyKnowledge: ['Certificación ISO', 'Auditoría Interna'],
            detailedContent: 'Cursos certificados en GMP, GCP y GDP con trazabilidad internacional.'
          }
        ]
      }
    ]
  },
  {
    id: 'fase-4',
    title: 'Fase 4: Élite Internacional (Mes 17–20)',
    icon: 'fa-globe',
    phase: 4,
    steps: [
      {
        id: 'blueprint-pebc',
        phase: 4,
        title: 'M17-18: Blueprint y Repaso',
        description: 'Alineación con las 9 competencias internacionales de PEBC.',
        content: 'Cierre de brechas en legislación, ética y farmacocinética avanzada para el estándar canadiense.',
        keyKnowledge: ['Ethical/Legal', 'Knowledge & Research', 'Health Promotion'],
        resources: [
          {
            title: 'PEBC Official Blueprint',
            type: 'exam',
            url: 'https://pebc.ca/pharmacists/qualifying-examination/',
            level: 'pebc',
            keyKnowledge: ['Syllabus', 'References'],
            detailedContent: 'Documentación obligatoria para entender los dominios evaluados en el examen de licencia.'
          }
        ]
      },
      {
        id: 'pebc-simulacros',
        phase: 4,
        title: 'M19-20+: Bancos y Simulacros',
        description: 'Entrenamiento intensivo MCQ y estaciones OSCE.',
        content: 'Estrategia de examen y resolución de casos complejos bajo presión de tiempo.',
        keyKnowledge: ['Exam Strategy', 'MCQ Practice', 'OSCE Simulation'],
        resources: [
          {
            title: 'PharmAchieve – MCQ & OSCE Prep',
            type: 'practice',
            url: 'https://pharmachieve.com/',
            level: 'pebc',
            keyKnowledge: ['Kroll System', 'Counselling'],
            detailedContent: 'Plataforma líder en simulacros y bancos de preguntas para PEBC.'
          }
        ]
      }
    ]
  },
  {
    id: 'fase-5',
    title: 'Fase 5: Dirección Técnica (Expert)',
    icon: 'fa-user-tie',
    phase: 5,
    steps: [
      {
        id: 'asuntos-regulatorios',
        phase: 5,
        title: 'Liderazgo y Regulación Global',
        description: 'Gestión ante FDA, EMA y Health Canada.',
        content: 'Dominio de registros sanitarios, variaciones y farmacovigilancia post-comercialización.',
        keyKnowledge: ['Dossier CTD', 'Vigilancia Sanitaria', 'Leyes de Farmacia'],
        resources: [
          {
            title: 'Regulatory Affairs – Udemy Masterclass',
            type: 'article',
            url: 'https://www.udemy.com/course/pharmaceutical-regulatory-affairs/',
            level: 'expert',
            keyKnowledge: ['FDA/EMA', 'eCTD'],
            detailedContent: 'Guía completa sobre la documentación necesaria para la aprobación de fármacos.'
          }
        ]
      },
      {
        id: 'plataformas-liderazgo',
        phase: 5,
        title: 'Dirección de Calidad y Plataformas',
        description: 'SICOQ, MedDRA, Kawak y liderazgo de equipos técnicos.',
        content: 'Integración estratégica de sistemas digitales para el control de calidad y cumplimiento legal.',
        keyKnowledge: ['SICOQ', 'MedDRA', 'Kawak', 'RH1', 'Liderazgo'],
        resources: [
          {
            title: 'Pharmacy Leadership – ASHP',
            type: 'article',
            url: 'https://elearning.ashp.org/products/7136/pharmacy-leadership-certificate-management-basics',
            level: 'expert',
            keyKnowledge: ['Management', 'KPIs'],
            detailedContent: 'Certificación en fundamentos de gestión y liderazgo farmacéutico.'
          }
        ]
      }
    ]
  }
];
