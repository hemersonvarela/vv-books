VV-BOOKS

alias sail='[ -f sail ] && bash sail || bash vendor/bin/sail'

sail artisan migrate:fresh
sail artisan db:seed     

sail artisan test

sail npm run dev   
