Rails.application.routes.draw do
  resources :game_players
  resources :scores
  resources :user_scores
  resources :users
  get "game/show"
  resources :poke_games
  resources :kitty_counters
  resources :player_rankings
  resources :matchings
  resources :turns
  resources :games

  get "/me", to: "users#show"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  post "/signup", to: "users#create"
  get "/game/:code", to: "games#get_by_code"

  mount ActionCable.server => "/cable"
end
