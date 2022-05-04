Rails.application.routes.draw do
  resources :products, only: %i[index show]
  resources :reviews
  resources :categories, only: %i[index show]

  get 'shopping_carts/:id' => 'shopping_carts#show', :as => 'cart'
  delete 'shopping_carts/:id' => 'shopping_carts#destroy'

  post 'line_items/:id/add' => 'line_items#add_quantity', :as => 'line_item_add'
  post 'line_items/:id/reduce' => 'line_items#reduce_quantity',
       :as => 'line_item_reduce'
  post 'line_items' => 'line_items#create'
  get 'line_items/:id' => 'line_items#show', :as => 'line_item'
  delete 'line_items/:id' => 'line_items#destroy'

  resources :orders, only: %i[create show]

  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
end
