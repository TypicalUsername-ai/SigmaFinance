[![Made with Supabase](https://supabase.com/badge-made-with-supabase.svg)](https://supabase.com)
![frontend build status](https://github.com/TypicalUsername-ai/SigmaFinance/actions/workflows/yarn-build.yml/badge.svg)

# SigmaFinance

Home repo of the SigmaFinance build on top of docker with Supabase and React.js

## Table of Contents
* [General info](#general-info)
* [Prerequirements](#prerequirements)
* [Technologies](#technologies)
* [Installation](#installation)
* [Setup](#setup)
* [Architecture/Design](#architecturedesign)

## General Info
SigmaFinance, designed for crypto and currency enthusiasts, is a cutting-edge project offering a user-friendly web application. This platform empowers users to effortlessly track and compare historical data of their preferred currencies. With a diverse range of over (number of indices) indices, SigmaFinance provides comprehensive insights derived from the (name of API).

Our authentication process is seamlessly integrated, allowing users to access the platform through their email address or seamlessly connect via Google or GitHub profiles. SigmaFinance is committed to delivering an unparalleled experience for users keen on staying informed and making informed decisions in the dynamic world of cryptocurrencies.
## Prerequirements

* git
* Docker

## Technologies

- [Tailwind.js](https://tailwindcss.com/)
- [Daisy UI](https://daisyui.com/)
- [Docker](https://www.docker.com/)
- Database [PostgreSQL](https://github.com/supabase/postgres)
- Auth [GoTrue](https://github.com/supabase/gotrue)
- Rest API [PostgREST](https://postgrest.org/en/stable/)
- [React.js](https://react.dev/)
- [Supabase SDK](https://supabase.com/docs/reference/javascript/installing)

## Getting Started
1. Clone the Repository

Clone this repository to your local machine using:

```bash
git clone https://github.com/TypicalUsername-ai/SigmaFinance.git
```

2. Configuration

Navigate to the project directory and modify the environment variables in the .env file to set your Supabase credentials and other configurations:

```bash
cd supabase-docker
cp .env.example .env
# Edit the .env file with your Supabase credentials and configuration
```

3. Build and Run

Run the following command to build and start the Docker containers:

```bash
docker-compose up -d
```

This command will create and start the Supabase container along with its dependencies defined in the docker-compose.yml file.

4. Access Supabase

Once the containers are up and running, you can access Supabase via:

    Dashboard: Open your browser and go to http://127.0.0.1:8000 to access the Supabase dashboard.
    API Access: Use http://127.0.0.1:8080 as the endpoint URL in your applications to interact with your local Supabase instance.

5. Shutting Down

To stop the containers, run:

```bash
docker-compose down
```

## Testing

Testing was done manually by checking whether the success criteria of each user story were met. 
The success criteria were defined by [Issues](https://github.com/typicalusername-ai/sigmafinance/issues) wich were tracked by the main User Stories marked with the `Priority` tags.
The success criteria were define by issues marked with a `feat` Tag.
The priority issues were split into [Milestones](https://github.com/typicalusername-ai/sigmafinance/milestones) which signifies which priority release and which parts of them were implemented.
The priority 1 implementation which can be seen in [This milestone](https://github.com/typicalusername-ai/sigmafinance/milestone/1?closed=1)

## CI

The project has an automated CI Pipeline that builds the project on every PR and commit to the master branch. 
If the build fails it will be marked on the repository page 

[Pipeline file](../master/.github/workflows/yarn-build.yml)