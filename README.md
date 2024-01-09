[![Made with Supabase](https://supabase.com/badge-made-with-supabase.svg)](https://supabase.com)
![frontend build status](https://github.com/TypicalUsername-ai/SigmaFinance/actions/workflows/yarn-build.yml/badge.svg)

# SigmaFinance

Home repo of the SigmaFinance build on top of docker with Supabase and React.js

## Table of Contents
* [General info](#general-info)
* [Prerequirements](#technologies)
* [Technologies](#technologies)
* [Installation](#installation)
* [Setup](#setup)
* [Architecture/Design](#architecturedesign)

## General Info
SigmaFinance, designed for crypto and currency enthusiasts, is a cutting-edge project offering a user-friendly web application. This platform empowers users to effortlessly track and compare historical data of their preferred currencies. With a diverse range of over (number of indices) indices, SigmaFinance provides comprehensive insights derived from the (name of API).

Our authentication process is seamlessly integrated, allowing users to access the platform through their email address or seamlessly connect via Google or GitHub profiles. SigmaFinance is committed to delivering an unparalleled experience for users keen on staying informed and making informed decisions in the dynamic world of cryptocurrencies.
## Prerequirements

* Node
* Docker

## Technologies

* Supabase
* Postgresql
* Javascript
* HTML5
* React.js
* Tailwind.js
* Docker
  

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

    Dashboard: Open your browser and go to http://localhost:5433 to access the Supabase dashboard.
    API Access: Use http://localhost:5433 as the endpoint URL in your applications to interact with your local Supabase instance.

5. Shutting Down

To stop the containers, run:

```bash
docker-compose down
```