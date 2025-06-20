export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          created_at?: string;
        };
        Update: {
          email?: string;
        };
      };
      artifacts: {
        Row: {
          id: string;
          user_id: string;
          image_url: string;
          prediction: number;
          created_at: string;
        };
        Insert: {
          user_id: string;
          image_url: string;
          prediction: number;
          created_at?: string;
        };
        Update: {
          prediction?: number;
        };
      };
    };
  };
}
