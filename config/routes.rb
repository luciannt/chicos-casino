Rails.application.routes.draw do
  resources :players
  resources :tables
  resources :scores
  resources :user_scores
  resources :users
  resources :player_rankings
  resources :games

  get "game/show"
  get "/me", to: "users#show"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  post "/signup", to: "users#create"
  get "/game/:code", to: "games#get_by_code"

  get "players/action"
  root "tables#index"

  mount ActionCable.server => "/cable"
end
