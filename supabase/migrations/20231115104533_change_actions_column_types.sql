ALTER TABLE public.actions
    DROP COLUMN action_type,
    ADD action_type int8 NOT NULL,
    ALTER COLUMN target_id TYPE text,
    ALTER COLUMN target_id SET NOT NULL;