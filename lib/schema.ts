export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      Entries: {
        Row: {
          category?: string;
          createdAt?: string;
          description: string;
          id?: string;
          link: string;
          name: string;
          user: string;
          user_id: string;
        };
        Insert: {
          category?: string;
          createdAt?: string;
          description: string;
          id?: string;
          link: string;
          name: string;
          user: string;
          user_id: string;
        };
        Update: {
          category?: string;
          createdAt?: string;
          description?: string;
          id?: string;
          link?: string;
          name?: string;
          user?: string;
          user_id?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
