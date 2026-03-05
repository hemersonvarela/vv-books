VV-BOOKS

alias sail='[ -f sail ] && bash sail || bash vendor/bin/sail'

sail artisan migrate:fresh

sail artisan db:seed     

sail artisan test

sail npm run dev   

logs()->info('Import validation errors: '.json_encode($errors));


/**
# /Users/hemerson/htdocs/apps/vv-books/.vscode/mcp.json
{
    "servers": {
            "laravel-boost": {
            "command": "./vendor/bin/sail",     <------
            "args": [
            "artisan",
            "boost:mcp"
            ]
        }
    }
}

**/



