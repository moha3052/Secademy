// Schema contract matching supabase/migrations. Regenerate from Supabase after schema changes.
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];
type Table<Row, Required extends keyof Row = never> = {
  Row: Row;
  Insert: Partial<Row> & Pick<Row, Required>;
  Update: Partial<Row>;
  Relationships: [];
};
type Profile = {
  id: string;
  display_name: string;
  avatar_url: string | null;
  experience_level: "beginner" | "intermediate" | "advanced" | null;
  learning_goal: "exams" | "career" | "development" | "interest" | null;
  learning_interest: "system" | "network" | "ethical" | "python" | null;
  onboarded: boolean;
  last_lesson_id: string | null;
  created_at: string;
};
export type Database = {
  public: {
    Tables: {
      profiles: Table<Profile, "id">;
      courses: Table<
        {
          id: string;
          slug: string;
          title: string;
          description: string;
          difficulty: string;
          published: boolean;
          created_at: string;
        },
        "id" | "slug" | "title" | "description"
      >;
      modules: Table<
        { id: string; course_id: string; title: string; position: number },
        "id" | "course_id" | "title" | "position"
      >;
      lessons: Table<
        {
          id: string;
          module_id: string;
          slug: string;
          title: string;
          content_reference: string;
          position: number;
          published: boolean;
          search_document: string;
        },
        "id" | "module_id" | "slug" | "title" | "content_reference" | "position"
      >;
      enrollments: Table<
        { id: string; user_id: string; course_id: string; created_at: string },
        "user_id" | "course_id"
      >;
      lesson_progress: Table<
        {
          id: string;
          user_id: string;
          lesson_id: string;
          status: "completed";
          completed_at: string;
        },
        "user_id" | "lesson_id"
      >;
      quizzes: Table<
        { id: string; lesson_id: string; title: string },
        "id" | "lesson_id" | "title"
      >;
      questions: Table<
        {
          id: string;
          quiz_id: string;
          question_type: "multiple_choice" | "true_false";
          prompt: string;
          position: number;
        },
        "id" | "quiz_id" | "question_type" | "prompt" | "position"
      >;
      question_options: Table<
        { id: string; question_id: string; label: string; position: number },
        "id" | "question_id" | "label" | "position"
      >;
      quiz_attempts: Table<
        {
          id: string;
          user_id: string;
          quiz_id: string;
          score: number;
          answers: Json;
          created_at: string;
        },
        "user_id" | "quiz_id" | "score" | "answers"
      >;
      labs: Table<
        {
          id: string;
          title: string;
          description: string;
          difficulty: string;
          published: boolean;
        },
        "id" | "title" | "description"
      >;
      lab_progress: Table<
        {
          id: string;
          user_id: string;
          lab_id: string;
          validation_method: "manual";
          completed_at: string;
        },
        "user_id" | "lab_id"
      >;
    };
    Views: { [_ in never]: never };
    Functions: {
      submit_quiz: {
        Args: { p_lesson_id: string; p_answers: number[] };
        Returns: Json;
      };
    };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
};
