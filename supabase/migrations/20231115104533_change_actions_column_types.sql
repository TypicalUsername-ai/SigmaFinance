ALTER TABLE public.actions
    DROP COLUMN action_type,
    ADD action_type int8,
    ALTER COLUMN target_id TYPE text;