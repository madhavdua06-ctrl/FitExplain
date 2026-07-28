export interface Mistake {
  mistake: string;
  fix: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}
