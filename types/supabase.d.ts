export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      categories: {
        Row: {
          category_name: string
        }
        Insert: {
          category_name: string
        }
        Update: {
          category_name?: string
        }
        Relationships: []
      }
      commands: {
        Row: {
          arguments: string | null
          command: string
          id: number
          software_id: number
        }
        Insert: {
          arguments?: string | null
          command: string
          id?: number
          software_id: number
        }
        Update: {
          arguments?: string | null
          command?: string
          id?: number
          software_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "commands_software_id_fkey"
            columns: ["software_id"]
            isOneToOne: false
            referencedRelation: "software"
            referencedColumns: ["id"]
          },
        ]
      }
      comments: {
        Row: {
          comment: string
          created_at: string | null
          id: number
          software_id: number
          software_release: number
          user_id: string
        }
        Insert: {
          comment: string
          created_at?: string | null
          id?: number
          software_id: number
          software_release: number
          user_id: string
        }
        Update: {
          comment?: string
          created_at?: string | null
          id?: number
          software_id?: number
          software_release?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_software_id_fkey"
            columns: ["software_id"]
            isOneToOne: false
            referencedRelation: "software"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_software_release_fkey"
            columns: ["software_release"]
            isOneToOne: false
            referencedRelation: "releases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      namespaces: {
        Row: {
          namespace: string
          software_id: number
          software_release: number
        }
        Insert: {
          namespace: string
          software_id: number
          software_release: number
        }
        Update: {
          namespace?: string
          software_id?: number
          software_release?: number
        }
        Relationships: [
          {
            foreignKeyName: "namespaces_software_id_fkey"
            columns: ["software_id"]
            isOneToOne: false
            referencedRelation: "software"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "namespaces_software_release_fkey"
            columns: ["software_release"]
            isOneToOne: false
            referencedRelation: "releases"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string | null
          id: number
          is_read: boolean | null
          release_id: number
          software_id: number
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          is_read?: boolean | null
          release_id: number
          software_id: number
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: number
          is_read?: boolean | null
          release_id?: number
          software_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_release_id_fkey"
            columns: ["release_id"]
            isOneToOne: false
            referencedRelation: "releases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_software_id_fkey"
            columns: ["software_id"]
            isOneToOne: false
            referencedRelation: "software"
            referencedColumns: ["id"]
          },
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
          bio: string
          email: string
          id: string
          image: string
          role: string
          username: string
        }
        Insert: {
          bio?: string
          email?: string
          id: string
          image?: string
          role?: string
          username?: string
        }
        Update: {
          bio?: string
          email?: string
          id?: string
          image?: string
          role?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_role_fkey"
            columns: ["role"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["role_name"]
          },
        ]
      }
      ratings: {
        Row: {
          created_at: string | null
          id: number
          rating_type: string | null
          software_id: number
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          rating_type?: string | null
          software_id: number
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: number
          rating_type?: string | null
          software_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ratings_software_id_fkey"
            columns: ["software_id"]
            isOneToOne: false
            referencedRelation: "software"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ratings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      releases: {
        Row: {
          artifact: string
          changelog: string | null
          extra_data: Json | null
          id: number
          release_date: string
          software_id: number
          version: string
        }
        Insert: {
          artifact: string
          changelog?: string | null
          extra_data?: Json | null
          id?: number
          release_date: string
          software_id: number
          version: string
        }
        Update: {
          artifact?: string
          changelog?: string | null
          extra_data?: Json | null
          id?: number
          release_date?: string
          software_id?: number
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "releases_software_id_fkey"
            columns: ["software_id"]
            isOneToOne: false
            referencedRelation: "software"
            referencedColumns: ["id"]
          },
        ]
      }
      roles: {
        Row: {
          role_name: string
        }
        Insert: {
          role_name: string
        }
        Update: {
          role_name?: string
        }
        Relationships: []
      }
      software: {
        Row: {
          categories: string[]
          created_at: string
          description: string
          developer_id: string
          id: number
          name: string
          project_url: string
          tagline: string
        }
        Insert: {
          categories: string[]
          created_at?: string
          description: string
          developer_id: string
          id?: number
          name: string
          project_url: string
          tagline: string
        }
        Update: {
          categories?: string[]
          created_at?: string
          description?: string
          developer_id?: string
          id?: number
          name?: string
          project_url?: string
          tagline?: string
        }
        Relationships: [
          {
            foreignKeyName: "software_developer_id_fkey"
            columns: ["developer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      software_categories: {
        Row: {
          category: string
          software_id: number
        }
        Insert: {
          category: string
          software_id: number
        }
        Update: {
          category?: string
          software_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "software_categories_category_fkey"
            columns: ["category"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["category_name"]
          },
          {
            foreignKeyName: "software_categories_software_id_fkey"
            columns: ["software_id"]
            isOneToOne: false
            referencedRelation: "software"
            referencedColumns: ["id"]
          },
        ]
      }
      software_followers: {
        Row: {
          followed_at: string
          follower_id: string
          id: number
          software_id: number
        }
        Insert: {
          followed_at?: string
          follower_id: string
          id?: number
          software_id: number
        }
        Update: {
          followed_at?: string
          follower_id?: string
          id?: number
          software_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "software_followers_follower_id_fkey"
            columns: ["follower_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "software_followers_software_id_fkey"
            columns: ["software_id"]
            isOneToOne: false
            referencedRelation: "software"
            referencedColumns: ["id"]
          },
        ]
      }
      user_followers: {
        Row: {
          developer_id: string
          followed_at: string
          follower_id: string
          id: number
        }
        Insert: {
          developer_id: string
          followed_at?: string
          follower_id: string
          id?: number
        }
        Update: {
          developer_id?: string
          followed_at?: string
          follower_id?: string
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "user_followers_developer_id_fkey"
            columns: ["developer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_followers_follower_id_fkey"
            columns: ["follower_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_id_by_email: {
        Args: {
          email: string
        }
        Returns: {
          id: string
        }[]
      }
      validate_categories: {
        Args: {
          categories: string[]
        }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

