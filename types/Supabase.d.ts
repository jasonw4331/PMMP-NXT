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
  next_auth: {
    Tables: {
      accounts: {
        Row: {
          access_token: string | null
          expires_at: number | null
          id: string
          id_token: string | null
          oauth_token: string | null
          oauth_token_secret: string | null
          provider: string
          providerAccountId: string
          refresh_token: string | null
          scope: string | null
          session_state: string | null
          token_type: string | null
          type: string
          userId: string | null
        }
        Insert: {
          access_token?: string | null
          expires_at?: number | null
          id?: string
          id_token?: string | null
          oauth_token?: string | null
          oauth_token_secret?: string | null
          provider: string
          providerAccountId: string
          refresh_token?: string | null
          scope?: string | null
          session_state?: string | null
          token_type?: string | null
          type: string
          userId?: string | null
        }
        Update: {
          access_token?: string | null
          expires_at?: number | null
          id?: string
          id_token?: string | null
          oauth_token?: string | null
          oauth_token_secret?: string | null
          provider?: string
          providerAccountId?: string
          refresh_token?: string | null
          scope?: string | null
          session_state?: string | null
          token_type?: string | null
          type?: string
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'accounts_userId_fkey'
            columns: ['userId']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
      authenticators: {
        Row: {
          counter: number | null
          credentialBackedUp: boolean | null
          credentialDeviceType: string | null
          credentialID: string
          credentialPublicKey: string
          provider: string | null
          providerAccountId: string | null
          transports: string | null
          userId: string
        }
        Insert: {
          counter?: number | null
          credentialBackedUp?: boolean | null
          credentialDeviceType?: string | null
          credentialID: string
          credentialPublicKey: string
          provider?: string | null
          providerAccountId?: string | null
          transports?: string | null
          userId: string
        }
        Update: {
          counter?: number | null
          credentialBackedUp?: boolean | null
          credentialDeviceType?: string | null
          credentialID?: string
          credentialPublicKey?: string
          provider?: string | null
          providerAccountId?: string | null
          transports?: string | null
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: 'authenticators_provider_providerAccountId_fkey'
            columns: ['provider', 'providerAccountId']
            isOneToOne: false
            referencedRelation: 'accounts'
            referencedColumns: ['provider', 'providerAccountId']
          },
          {
            foreignKeyName: 'authenticators_userId_fkey'
            columns: ['userId']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
      sessions: {
        Row: {
          expires: string
          id: string
          sessionToken: string
          userId: string | null
        }
        Insert: {
          expires: string
          id?: string
          sessionToken: string
          userId?: string | null
        }
        Update: {
          expires?: string
          id?: string
          sessionToken?: string
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'sessions_userId_fkey'
            columns: ['userId']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
      users: {
        Row: {
          email: string | null
          emailVerified: string | null
          id: string
          image: string | null
          name: string | null
        }
        Insert: {
          email?: string | null
          emailVerified?: string | null
          id?: string
          image?: string | null
          name?: string | null
        }
        Update: {
          email?: string | null
          emailVerified?: string | null
          id?: string
          image?: string | null
          name?: string | null
        }
        Relationships: []
      }
      verification_tokens: {
        Row: {
          expires: string
          identifier: string | null
          token: string
        }
        Insert: {
          expires: string
          identifier?: string | null
          token: string
        }
        Update: {
          expires?: string
          identifier?: string | null
          token?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      uid: {
        Args: Record<PropertyKey, never>
        Returns: string
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
            foreignKeyName: 'commands_command_software_id_fkey'
            columns: ['software_id']
            isOneToOne: false
            referencedRelation: 'software'
            referencedColumns: ['id']
          }
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
            foreignKeyName: 'fk_software_id'
            columns: ['software_id']
            isOneToOne: false
            referencedRelation: 'software'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'fk_software_release'
            columns: ['software_release']
            isOneToOne: false
            referencedRelation: 'releases'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'fk_user_id'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
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
            foreignKeyName: 'fk_software_id'
            columns: ['software_id']
            isOneToOne: false
            referencedRelation: 'software'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'fk_software_release'
            columns: ['software_release']
            isOneToOne: false
            referencedRelation: 'releases'
            referencedColumns: ['id']
          }
        ]
      }
      notifications: {
        Row: {
          created_at: string | null
          id: number
          is_read: boolean | null
          release_id: number | null
          software_id: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          is_read?: boolean | null
          release_id?: number | null
          software_id?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          is_read?: boolean | null
          release_id?: number | null
          software_id?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'fk_release_id'
            columns: ['release_id']
            isOneToOne: false
            referencedRelation: 'releases'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'fk_software_id'
            columns: ['software_id']
            isOneToOne: false
            referencedRelation: 'software'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'fk_user_id'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
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
            foreignKeyName: 'fk_software_id'
            columns: ['software_id']
            isOneToOne: false
            referencedRelation: 'software'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'fk_user_id'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
      releases: {
        Row: {
          artifact: string
          changelog: string | null
          id: number
          release_date: string
          software_id: number
          supported_api: string
          version: string
        }
        Insert: {
          artifact: string
          changelog?: string | null
          id?: number
          release_date: string
          software_id: number
          supported_api: string
          version: string
        }
        Update: {
          artifact?: string
          changelog?: string | null
          id?: number
          release_date?: string
          software_id?: number
          supported_api?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: 'fk_software_id'
            columns: ['software_id']
            isOneToOne: false
            referencedRelation: 'software'
            referencedColumns: ['id']
          }
        ]
      }
      software: {
        Row: {
          categories: string[]
          created_at: string | null
          description: string
          developer_id: string
          id: number
          name: string
          project_url: string
          tagline: string
        }
        Insert: {
          categories: string[]
          created_at?: string | null
          description: string
          developer_id: string
          id?: number
          name: string
          project_url: string
          tagline: string
        }
        Update: {
          categories?: string[]
          created_at?: string | null
          description?: string
          developer_id?: string
          id?: number
          name?: string
          project_url?: string
          tagline?: string
        }
        Relationships: [
          {
            foreignKeyName: 'fk_developer_id'
            columns: ['developer_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
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
            foreignKeyName: 'fk_category'
            columns: ['category']
            isOneToOne: false
            referencedRelation: 'categories'
            referencedColumns: ['category_name']
          },
          {
            foreignKeyName: 'fk_software_id'
            columns: ['software_id']
            isOneToOne: false
            referencedRelation: 'software'
            referencedColumns: ['id']
          }
        ]
      }
      software_followers: {
        Row: {
          followed_at: string | null
          follower_id: string
          id: number
          software_id: number
        }
        Insert: {
          followed_at?: string | null
          follower_id: string
          id?: number
          software_id: number
        }
        Update: {
          followed_at?: string | null
          follower_id?: string
          id?: number
          software_id?: number
        }
        Relationships: [
          {
            foreignKeyName: 'fk_follower_id'
            columns: ['follower_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'fk_software_id'
            columns: ['software_id']
            isOneToOne: false
            referencedRelation: 'software'
            referencedColumns: ['id']
          }
        ]
      }
      user_followers: {
        Row: {
          developer_id: string
          followed_at: string | null
          follower_id: string
          id: number
        }
        Insert: {
          developer_id: string
          followed_at?: string | null
          follower_id: string
          id?: number
        }
        Update: {
          developer_id?: string
          followed_at?: string | null
          follower_id?: string
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: 'fk_developer_id'
            columns: ['developer_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'fk_follower_id'
            columns: ['follower_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
      users: {
        Row: {
          email: string | null
          id: string
          image: string | null
          name: string | null
        }
        Insert: {
          email?: string | null
          id: string
          image?: string | null
          name?: string | null
        }
        Update: {
          email?: string | null
          id?: string
          image?: string | null
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'users_id_fkey'
            columns: ['id']
            isOneToOne: true
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
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
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'objects_bucketId_fkey'
            columns: ['bucket_id']
            isOneToOne: false
            referencedRelation: 'buckets'
            referencedColumns: ['id']
          }
        ]
      }
      s3_multipart_uploads: {
        Row: {
          bucket_id: string
          created_at: string
          id: string
          in_progress_size: number
          key: string
          owner_id: string | null
          upload_signature: string
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          id: string
          in_progress_size?: number
          key: string
          owner_id?: string | null
          upload_signature: string
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          id?: string
          in_progress_size?: number
          key?: string
          owner_id?: string | null
          upload_signature?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: 's3_multipart_uploads_bucket_id_fkey'
            columns: ['bucket_id']
            isOneToOne: false
            referencedRelation: 'buckets'
            referencedColumns: ['id']
          }
        ]
      }
      s3_multipart_uploads_parts: {
        Row: {
          bucket_id: string
          created_at: string
          etag: string
          id: string
          key: string
          owner_id: string | null
          part_number: number
          size: number
          upload_id: string
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          etag: string
          id?: string
          key: string
          owner_id?: string | null
          part_number: number
          size?: number
          upload_id: string
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          etag?: string
          id?: string
          key?: string
          owner_id?: string | null
          part_number?: number
          size?: number
          upload_id?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: 's3_multipart_uploads_parts_bucket_id_fkey'
            columns: ['bucket_id']
            isOneToOne: false
            referencedRelation: 'buckets'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 's3_multipart_uploads_parts_upload_id_fkey'
            columns: ['upload_id']
            isOneToOne: false
            referencedRelation: 's3_multipart_uploads'
            referencedColumns: ['id']
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      list_multipart_uploads_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          next_key_token?: string
          next_upload_token?: string
        }
        Returns: {
          key: string
          id: string
          created_at: string
        }[]
      }
      list_objects_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          start_after?: string
          next_token?: string
        }
        Returns: {
          name: string
          id: string
          metadata: Json
          updated_at: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
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

type PublicSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
      PublicSchema['Views'])
  ? (PublicSchema['Tables'] &
      PublicSchema['Views'])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
  ? PublicSchema['Enums'][PublicEnumNameOrOptions]
  : never
