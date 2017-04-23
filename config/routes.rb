Rails.application.routes.draw do
  get "service-worker", to: "service_worker#service_worker"

  namespace :api do
    resources :poi
  end

  get "poi/:id", to: "home#home"
  get "map", to: "home#home"
  root "home#home"
end
