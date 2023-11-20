ALTER TABLE public.actions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "delete_actions_auth_policy"
ON public.actions
FOR DELETE USING (
  auth.uid() = initiator_id
);

CREATE POLICY "insert_actions_auth_policy"
ON public.actions
FOR INSERT WITH CHECK (
  auth.uid() = initiator_id
);  

CREATE POLICY "update_actions_auth_policy"
ON public.actions
FOR UPDATE WITH CHECK (
    auth.uid() = initiator_id
);

CREATE POLICY "select_actions_everyone_policy"
ON public.actions
FOR SELECT USING (
  true
);