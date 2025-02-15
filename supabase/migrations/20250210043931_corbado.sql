-- Function provided by Corbado for synchronizing user accounts
-- https://www.corbado.com/blog/supabase-passkeys#setup-supabase-backend
CREATE OR REPLACE FUNCTION get_user_id_by_email(email TEXT)
    RETURNS TABLE (id uuid)
    SECURITY definer
AS $$
BEGIN
    RETURN QUERY SELECT au.id FROM auth.users au WHERE au.email = $1;
END;
$$ LANGUAGE plpgsql;
