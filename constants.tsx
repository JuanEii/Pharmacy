
import { CourseModule } from './types';

export const ROADMAP: CourseModule[] = [
  {
    id: 'fase-1',
    title: 'Fase 1: Cimientos Científicos (Mes 1–4)',
    icon: 'fa-microscope',
    phase: 1,
    steps: [
      {
        id: 'f1-m1',
        phase: 1,
        title: 'Mes 1: Química General I (Estructura)',
        description: 'Unidades, materia, átomo, tabla periódica, enlaces y geometría molecular.',
        content: 'Dominio de magnitudes, mol, modelos atómicos, tendencias periódicas, estructuras de Lewis y teoría VSEPR.',
        keyKnowledge: ['Mol/Masa Molar', 'Números Cuánticos', 'Tendencias Periódicas', 'VSEPR'],
        resources: [
          {
            title: 'Khan Academy – Química (ES)',
            type: 'video',
            url: 'https://es.khanacademy.org/science/chemistry',
            level: 'beginner',
            keyKnowledge: ['Átomo', 'Masa Molar', 'Enlaces'],
            detailedContent: 'Núcleo del mes: Estudia unidades, átomo, mol y enlaces químicos en español.'
          },
          {
            title: 'Iniciándome en la Química – UNAM (ES)',
            type: 'video',
            url: 'https://www.coursera.org/learn/iniciandome-en-la-qumica',
            level: 'beginner',
            keyKnowledge: ['Nomenclatura', 'Tabla Periódica'],
            detailedContent: 'Curso estructurado de la UNAM/UAM. Módulos 1 y 2 (Materia y Teorías Atómicas).'
          },
          {
            title: 'Chemistry 2e – OpenStax (EN)',
            type: 'article',
            url: 'https://openstax.org/books/chemistry-2e/pages/1-introduction',
            level: 'intermediate',
            keyKnowledge: ['Deep Dive Theory'],
            detailedContent: 'Capítulos 1-4 para profundizar en formulación y problemas de mayor rigor técnico.'
          }
        ]
      },
      {
        id: 'f1-m2',
        phase: 1,
        title: 'Mes 2: Química General II (Reacciones)',
        description: 'Estequiometría, gases, equilibrio, ácidos/bases y solubilidad.',
        content: 'Cálculo de reacciones, reactivo limitante, pH, buffers y producto de solubilidad (Ksp).',
        keyKnowledge: ['Estequiometría', 'Gases Ideales', 'pH/pOH', 'Equilibrio Ksp'],
        resources: [
          {
            title: 'Khan Academy – Reacciones y Equilibrio (ES)',
            type: 'video',
            url: 'https://es.khanacademy.org/science/chemistry',
            level: 'intermediate',
            keyKnowledge: ['Cálculos Reacción', 'Ácido-Base'],
            detailedContent: 'Secciones de estequiometría, gases y equilibrio iónico.'
          },
          {
            title: 'OpenStax Chemistry 2e (EN)',
            type: 'article',
            url: 'https://openstax.org/books/chemistry-2e/pages/13-introduction',
            level: 'expert',
            keyKnowledge: ['Complex Equilibrium'],
            detailedContent: 'Capítulos 13-15: Fundamental para entender la solubilidad de fármacos y formulación.'
          }
        ]
      },
      {
        id: 'f1-m3',
        phase: 1,
        title: 'Mes 3: Química Orgánica I (Estructura)',
        description: 'Estructura, grupos funcionales y estereoquímica.',
        content: 'Hibridación, grupos funcionales (alcoholes, carbonilos, aminas) y quiralidad (R/S).',
        keyKnowledge: ['Hibridación', 'Nomenclatura IUPAC', 'Enantiómeros', 'Talidomida Case'],
        resources: [
          {
            title: 'Khan Academy – Orgánica (ES)',
            type: 'video',
            url: 'https://es.khanacademy.org/science/organic-chemistry',
            level: 'intermediate',
            keyKnowledge: ['Funcionales', 'Estereoquímica'],
            detailedContent: 'Fundamentos de estructura y centros quirales en español.'
          },
          {
            title: 'Química Orgánica: un mundo a tu alcance (ES)',
            type: 'video',
            url: 'https://www.my-mooc.com/en/mooc/la-quimica-organica-un-mundo-a-tu-alcance-c4db7934-64f2-4bca-a50f-d8be67f0eee8',
            level: 'beginner',
            keyKnowledge: ['Bases Orgánicas'],
            detailedContent: 'MOOC de la UAM. Parte 1: Estructura molecular y fundamentos.'
          },
          {
            title: 'Organic Chemistry – John McMurry (EN)',
            type: 'article',
            url: 'https://openstax.org/books/organic-chemistry/pages/index',
            level: 'expert',
            keyKnowledge: ['Advanced Stereochem'],
            detailedContent: 'Capítulos 1-5. Referencia obligatoria para niveles universitarios de farmacia.'
          }
        ]
      },
      {
        id: 'f1-m4',
        phase: 1,
        title: 'Mes 4: Química Orgánica II (Mecanismos)',
        description: 'Sustitución, eliminación y reactividad de carbonilos.',
        content: 'Mecanismos SN1, SN2, E1, E2, aromaticidad e hidrólisis de ésteres (metabolismo de fármacos).',
        keyKnowledge: ['Mecanismos SN/E', 'Regla Markovnikov', 'Aromaticidad', 'Carbonilos'],
        resources: [
          {
            title: 'Khan Academy – Mecanismos (ES)',
            type: 'video',
            url: 'https://es.khanacademy.org/science/organic-chemistry',
            level: 'expert',
            keyKnowledge: ['Arrow Pushing'],
            detailedContent: 'Sustitución, eliminación y reactividad de alquenos y carbonilos.'
          },
          {
            title: 'Master Organic Chemistry – Reaction Guide (EN)',
            type: 'article',
            url: 'https://www.masterorganicchemistry.com/reaction-guide/',
            level: 'expert',
            keyKnowledge: ['SN1 vs SN2', 'E1 vs E2'],
            detailedContent: 'La guía visual definitiva para estudiantes de medicina y farmacia. Analiza 15 mecanismos.'
          },
          {
            title: 'MOOC Orgánica Parte 2 – UAM (ES)',
            type: 'video',
            url: 'https://www.my-mooc.com/en/mooc/la-quimica-organica-un-mundo-a-tu-alcance-parte-2-4051c43f-fdeb-465c-9cc6-37ee5fdbac2e',
            level: 'intermediate',
            keyKnowledge: ['Reactividad Avanzada'],
            detailedContent: 'Profundización en reactividad de grupos funcionales complejos.'
          }
        ]
      }
    ]
  },
  {
    id: 'fase-2',
    title: 'Fase 2: Núcleo Profesional e Industrial (Mes 5–10)',
    icon: 'fa-industry',
    phase: 2,
    steps: [
      {
        id: 'f2-m5',
        phase: 2,
        title: 'Mes 5: Tecnología Farmacéutica I',
        description: 'Propiedades fisicoquímicas y clasificación de formas farmacéuticas.',
        content: 'Pharmaceutics: diseño de formulaciones, solubilidad, preformulación y terminología oficial.',
        keyKnowledge: ['Diseño Formulación', 'Solubilidad', 'Nomenclatura DIGEMID', 'Vías Admin'],
        resources: [
          {
            title: 'Tecnología Farmacéutica – Ediuns (ES)',
            type: 'article',
            url: 'https://ediuns.com.ar/wp-content/uploads/2020/08/TECNOLOGIA-FARMACEUTICA_web.pdf',
            level: 'intermediate',
            keyKnowledge: ['Operaciones Básicas'],
            detailedContent: 'Libro central de la Univ. Nacional del Sur. Capítulos de definición y clasificación.'
          },
          {
            title: 'Manual de Formas Farmacéuticas – DIGEMID (ES)',
            type: 'article',
            url: 'https://www.digemid.minsa.gob.pe/Archivos/PortalWeb/Informativo/Catalogacion/Formas%20farmacEuticas_2024.pdf',
            level: 'beginner',
            keyKnowledge: ['Estandarización 2024'],
            detailedContent: 'Norma técnica peruana 2024 que estandariza todas las formas modernas.'
          },
          {
            title: 'Essential Pharmaceutics – Springer (EN)',
            type: 'article',
            url: 'https://link.springer.com/book/10.1007/978-3-030-22107-2',
            level: 'expert',
            keyKnowledge: ['Science of Dosage Forms'],
            detailedContent: 'Referencia avanzada de postgrado sobre la ciencia de pharmaceutics.'
          }
        ]
      },
      {
        id: 'f2-m6',
        phase: 2,
        title: 'Mes 6: Formas Sólidas y Fabricación',
        description: 'Polvos, granulados, comprimidos y cápsulas.',
        content: 'Preformulación, granulación, compresión, recubrimiento y controles de calidad industrial.',
        keyKnowledge: ['Compresión', 'Friabilidad', 'Disolución', 'Defectos Comprimido'],
        resources: [
          {
            title: 'Formas Sólidas – Ediuns (ES)',
            type: 'article',
            url: 'https://ediuns.com.ar/wp-content/uploads/2020/08/TECNOLOGIA-FARMACEUTICA_web.pdf',
            level: 'intermediate',
            keyKnowledge: ['Granulación'],
            detailedContent: 'Procesos de fabricación y operaciones unitarias aplicadas a sólidos orales.'
          },
          {
            title: 'Catálogo Detallado FF – DIGEMID (ES)',
            type: 'article',
            url: 'https://www.digemid.minsa.gob.pe/Archivos/PortalWeb/Informativo/Catalogacion/CAT_FORMAS_FARMACEUTICAS_DETALLADAS_NOVIEMBRE_%202024.pdf',
            level: 'beginner',
            keyKnowledge: ['Nomenclatura Industrial'],
            detailedContent: 'Familiarízate con la terminología industrial real para productos comercializados.'
          }
        ]
      },
      {
        id: 'f2-m7',
        phase: 2,
        title: 'Mes 7: Líquidos, Semisólidos y GMP',
        description: 'Sistemas dispersos, estériles y aseguramiento de calidad.',
        content: 'Soluciones, suspensiones, cremas, inyectables y fundamentos de Good Manufacturing Practices.',
        keyKnowledge: ['Emulsiones HLB', 'Esterilidad', 'BPM/GMP', 'Estabilidad'],
        resources: [
          {
            title: 'Foundations of GMP – USP (EN)',
            type: 'video',
            url: 'https://www.usp.org/global-public-health/promoting-quality-of-medicines/gmp-online-course',
            level: 'expert',
            keyKnowledge: ['OMS/PIC-S Standards'],
            detailedContent: 'Curso gratuito de la USP. 10 módulos esenciales para cualquier cargo industrial.'
          },
          {
            title: 'Calidad Tecnologías Sanitarias – OPS/OMS (ES)',
            type: 'article',
            url: 'https://www.paho.org/es/temas/uso-racional-medicamentos-otras-tecnologias-sanitarias',
            level: 'intermediate',
            keyKnowledge: ['Regulación Regional'],
            detailedContent: 'Visión de la OPS sobre el aseguramiento de la calidad y uso racional.'
          }
        ]
      },
      {
        id: 'f2-m8',
        phase: 2,
        title: 'Mes 8: Supply Chain y Acceso',
        description: 'Ciclo de suministro, acceso y gestión logística.',
        content: 'Selección, programación, adquisición, almacenamiento y distribución de medicamentos esenciales.',
        keyKnowledge: ['Acceso a Medicamentos', 'Políticas Suministro', 'Ciclo Logístico'],
        resources: [
          {
            title: 'Logística del Suministro – OPS/OMS (ES)',
            type: 'article',
            url: 'https://www.sefh.es/bibliotecavirtual/ops/logistica.pdf',
            level: 'intermediate',
            keyKnowledge: ['Manual Nora Girón'],
            detailedContent: 'Referencia fundamental de la OPS sobre la logística de medicamentos esenciales.'
          },
          {
            title: 'Acceso y Uso Racional – OPS (ES)',
            type: 'article',
            url: 'https://www.paho.org/sites/default/files/2023-01/pahocd5510spafinaldigital-copy.pdf',
            level: 'intermediate',
            keyKnowledge: ['Políticas Públicas'],
            detailedContent: 'Documento sobre el panorama regional de acceso y precios de medicamentos.'
          }
        ]
      },
      {
        id: 'f2-m9',
        phase: 2,
        title: 'Mes 9: Compras e Indicadores',
        description: 'Procurement, planificación y métricas de desempeño.',
        content: 'Procesos de compra, contratos, cuantificación de necesidades e indicadores de gestión.',
        keyKnowledge: ['Licitación', 'Cuantificación', 'KPIs Suministro'],
        resources: [
          {
            title: 'Manual de Procesos de Compra – Salud Mesoamérica (ES)',
            type: 'article',
            url: 'https://www.saludmesoamerica.org/sites/default/files/toolkits/documents/3.%20Manual%20de%20Procesos%20de%20comprar%20medicamentos%20e%20insumos%20sanitarios_0.pdf',
            level: 'expert',
            keyKnowledge: ['Contratación Pública'],
            detailedContent: 'Manual práctico de procurement para insumos sanitarios.'
          },
          {
            title: 'Planificación Abastecimiento – OPS (ES)',
            type: 'article',
            url: 'https://www.paho.org/sites/default/files/2024-11/guia-fundo-estrategico-internet.pdf',
            level: 'expert',
            keyKnowledge: ['Fondo Estratégico'],
            detailedContent: 'Guía de planificación para el abastecimiento de insumos estratégicos.'
          }
        ]
      },
      {
        id: 'f2-m10',
        phase: 2,
        title: 'Mes 10: Almacenamiento y Distribución',
        description: 'GDP, cadena de frío e integración de servicios.',
        content: 'Buenas prácticas de almacenamiento (GSDP), monitoreo de temperatura y atención primaria.',
        keyKnowledge: ['GDP/GSDP', 'Cadena de Frío', 'TRS 1025 Anexo 7', 'Servicios APS'],
        resources: [
          {
            title: 'WHO TRS 1025 Annex 7 (EN)',
            type: 'article',
            url: 'https://www.who.int/publications/i/item/978-92-4-000182-4',
            level: 'expert',
            keyKnowledge: ['GSDP International'],
            detailedContent: 'La biblia internacional de las buenas prácticas de almacenamiento y distribución.'
          },
          {
            title: 'Servicios Farmacéuticos APS – OPS (ES)',
            type: 'article',
            url: 'https://www3.paho.org/hq/dmdocuments/2013/serierapsano6-2013.pdf',
            level: 'intermediate',
            keyKnowledge: ['Atención Primaria'],
            detailedContent: 'Visión integrada de la gestión de stock y calidad en servicios de salud primaria.'
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
            title: 'Regulatory Affairs – Masterclass',
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
