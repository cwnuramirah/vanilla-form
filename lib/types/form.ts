export interface Option {
	id: string;
	option: string;
	value: boolean;
  }
  
  export interface BaseQuestion {
	id: string;
	question: string;
	type: "short" | "paragraph" | "select" | "checkbox" | "radio" | "date" | "time";
	description?: string;
	required: boolean;
  }
  
  export interface ShortAnswerQuestion extends BaseQuestion {
	type: "short";
  }
  
  export interface ParagraphAnswerQuestion extends BaseQuestion {
	type: "paragraph";
  }
  
  export interface SelectQuestion extends BaseQuestion {
	type: "select";
	options: Option[];
	shuffleOptions?: boolean;
  }
  
  export interface CheckboxQuestion extends BaseQuestion {
	type: "checkbox";
	options: Option[];
	shuffleOptions?: boolean;
	maxSelections?: number;
  }
  
  export interface RadioQuestion extends BaseQuestion {
	type: "radio";
	options: Option[];
	shuffleOptions?: boolean;
  }
  
  export interface DateQuestion extends BaseQuestion {
	type: "date";
  }
  
  export interface TimeQuestion extends BaseQuestion {
	type: "time";
  }
  
  export type Question =
	| ShortAnswerQuestion
	| ParagraphAnswerQuestion
	| SelectQuestion
	| CheckboxQuestion
	| RadioQuestion
	| DateQuestion
	| TimeQuestion;
  
  export type Form = {
	id: string;
	title: string;
	createdAt: string;
	modifiedAt: string;
	questions: Question[];
  };
  
  export type FormSummary = Pick<Form, 'id' | 'title' | 'createdAt' | 'modifiedAt'>;
