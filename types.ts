
export interface Resource {
  title: string;
  type: 'video' | 'article' | 'quiz' | 'practice' | 'exam';
  url: string;
  level?: 'beginner' | 'intermediate' | 'expert' | 'pebc';
  estimatedTime?: string; // e.g., "2h", "1 week"
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface ModuleStep {
  id: string;
  title: string;
  description: string;
  content: string;
  resources: Resource[];
  keyKnowledge: string[];
  quiz?: QuizQuestion[];
  phase: number; // 1: Foundation, 2: Professional, 3: Specialist, 4: Expert/Licensing
}

export interface CourseModule {
  id: string;
  title: string;
  icon: string;
  phase: number;
  steps: ModuleStep[];
}

export interface UserProgress {
  completedSteps: string[];
  currentModuleId: string;
  currentStepId: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}
