# Notice!!!:
```
    The requirements from e-mail were not fully meet - the only part that is wired up with back-end using API calls is 
    Login page. Quiz works in fully self-standing mode in browser without any API calls!
```

# Backend - Laravel 5.4 based app:

## Requirements:

    MySql server on local machine
    PHP >= 5.6.4
    OpenSSL PHP Extension
    PDO PHP Extension
    Mbstring PHP Extension
    Tokenizer PHP Extension
    XML PHP Extension

## Pre-Installation
```
    Create the mysql database on you local machine
    Clone the repo to some dir on your local
```
## Installation
```
    cd project_dir/backend
    composer install
    cp .env.example .env and put there the requiered data and credentials for DB server and DB that you have created on prev step
    php artisan migrate:refresh
    php artisan db:seed
```

## Run the backend

```
    cd project_dir/backend
    php artisan serve --host=localhost --port=8000
```

# Frontend - React Quiz:

## Get Started
```
    Install required npm modules with `npm install`
    In the project directory, you can then run: `npm start` - that command would Run the app on following url - http://localhost:3000.
```

## Proper login credentials to put in Login page - admin:admin

