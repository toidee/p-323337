export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      applications: {
        Row: {
          application_subtype: string | null
          application_type: string
          certificate_expiry: string | null
          certificate_number: string | null
          establishment_id: string | null
          establishment_type: string
          form_data: Json | null
          id: string
          owner_id: string | null
          rejection_history: Json | null
          status: string
          submission_date: string
        }
        Insert: {
          application_subtype?: string | null
          application_type: string
          certificate_expiry?: string | null
          certificate_number?: string | null
          establishment_id?: string | null
          establishment_type: string
          form_data?: Json | null
          id?: string
          owner_id?: string | null
          rejection_history?: Json | null
          status: string
          submission_date?: string
        }
        Update: {
          application_subtype?: string | null
          application_type?: string
          certificate_expiry?: string | null
          certificate_number?: string | null
          establishment_id?: string | null
          establishment_type?: string
          form_data?: Json | null
          id?: string
          owner_id?: string | null
          rejection_history?: Json | null
          status?: string
          submission_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "applications_establishment_id_fkey"
            columns: ["establishment_id"]
            isOneToOne: false
            referencedRelation: "establishments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "applications_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      certificates: {
        Row: {
          application_id: string | null
          certificate_number: string
          certificate_type: string
          expiry_date: string | null
          id: string
          issue_date: string
          pdf_path: string
        }
        Insert: {
          application_id?: string | null
          certificate_number: string
          certificate_type: string
          expiry_date?: string | null
          id?: string
          issue_date?: string
          pdf_path: string
        }
        Update: {
          application_id?: string | null
          certificate_number?: string
          certificate_type?: string
          expiry_date?: string | null
          id?: string
          issue_date?: string
          pdf_path?: string
        }
        Relationships: [
          {
            foreignKeyName: "certificates_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      establishments: {
        Row: {
          active_status: string | null
          address: string | null
          date_registered: string | null
          dti_number: string | null
          form_data: Json | null
          id: string
          latitude: number | null
          longitude: number | null
          name: string | null
          num_occupants: number | null
          num_storeys: number | null
          occupancy_type: string | null
          owner_id: string | null
          rejection_history: Json | null
          status: string | null
          total_floor_area: number | null
          type: string | null
        }
        Insert: {
          active_status?: string | null
          address?: string | null
          date_registered?: string | null
          dti_number?: string | null
          form_data?: Json | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          name?: string | null
          num_occupants?: number | null
          num_storeys?: number | null
          occupancy_type?: string | null
          owner_id?: string | null
          rejection_history?: Json | null
          status?: string | null
          total_floor_area?: number | null
          type?: string | null
        }
        Update: {
          active_status?: string | null
          address?: string | null
          date_registered?: string | null
          dti_number?: string | null
          form_data?: Json | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          name?: string | null
          num_occupants?: number | null
          num_storeys?: number | null
          occupancy_type?: string | null
          owner_id?: string | null
          rejection_history?: Json | null
          status?: string | null
          total_floor_area?: number | null
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "establishments_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      inspections: {
        Row: {
          application_type: string
          checklist_data: Json | null
          checklist_type: string | null
          establishment_id: string | null
          id: string
          inspector_id: string | null
          scheduled_date_time: string | null
          status: string
        }
        Insert: {
          application_type: string
          checklist_data?: Json | null
          checklist_type?: string | null
          establishment_id?: string | null
          id?: string
          inspector_id?: string | null
          scheduled_date_time?: string | null
          status: string
        }
        Update: {
          application_type?: string
          checklist_data?: Json | null
          checklist_type?: string | null
          establishment_id?: string | null
          id?: string
          inspector_id?: string | null
          scheduled_date_time?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "inspections_establishment_id_fkey"
            columns: ["establishment_id"]
            isOneToOne: false
            referencedRelation: "establishments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inspections_inspector_id_fkey"
            columns: ["inspector_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string | null
          id: string
          message: string
          status: string | null
          title: string
          type: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          message: string
          status?: string | null
          title: string
          type: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string
          status?: string | null
          title?: string
          type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          availability_period: Json | null
          date_joined: string
          duty_hours_log: Json | null
          duty_status: boolean | null
          full_name: string
          id: string
          position: string | null
          role: string
          status: string | null
        }
        Insert: {
          availability_period?: Json | null
          date_joined?: string
          duty_hours_log?: Json | null
          duty_status?: boolean | null
          full_name: string
          id: string
          position?: string | null
          role: string
          status?: string | null
        }
        Update: {
          availability_period?: Json | null
          date_joined?: string
          duty_hours_log?: Json | null
          duty_status?: boolean | null
          full_name?: string
          id?: string
          position?: string | null
          role?: string
          status?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
