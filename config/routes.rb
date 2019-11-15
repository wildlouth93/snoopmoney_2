Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: { format: :json } do 
    resources :users, only: [:create] do 
      resources :holdings
      resources :watch_list_items
    end
    resource :session, only: [:create, :destroy] 
  end

  root to: 'root#root'
end
