# Database migrations

required: supabase cli
workdir: the base workdir project

## Create a migration

run `supabase migration new $NAME_OF_MIGRATION`

the migrations will be created in the `$PROJECT_ROOT/supabase/migrations` folder

## Check applied migrations

run `supabase migration list --db-url postgres://postgres:$POSTGRES_PASSWORD@$POSTGRES_URL`

in our case `$POSTGRES_PASSWORD` is in .env
and `$POSTGRES_URL` is `0.0.0.0:5432`

## Apply migrations

run `supabase migration up` using the `--db-url` flag as above 
