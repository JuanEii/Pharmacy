
export interface Resource {
  title: string;
  type: 'video' | 'article' | 'quiz' | 'practice' | 'exam';
  url: string;
  level?: 'beginner' | 'intermediate' | 'expert' | 'pebc';
  estimatedTime?: string;
  detailedContent?: string;
  keyKnowledge?: string[];
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
  phase: number;
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

export type ViewState = 'roadmap' | 'simulator';

export interface EvaluationState {
  isActive: boolean;
  questionCount: number;
  currentQuestionIndex: number;
  phaseWeightPreference: 'fase1' | 'fase2' | null;
  history: ChatMessage[];
  awaitingInput: boolean;
}
