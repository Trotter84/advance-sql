Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'
  namespace :api do
    resources :properties, only: [:index]
    get 'citties/:city', to: 'properties#city'
    resources :agents, only: [:index, :show]
    resources :buyers, only: [:show]
  end

  #Do not place any routes below this one
  if Rails.env.production?
    get '*other', to: 'static#index'
  end
end
