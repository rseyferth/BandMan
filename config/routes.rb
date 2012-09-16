BandMan::Application.routes.draw do
  
  
  root :to => "pages#home"
  
  resources :contacts
  resources :users

  # Signup process
  match "signup" => "users#create", :as => "signup_create", :via => :post
  match "signup" => "users#new", :as => "signup"
  match "signup/validate/email" => "users#email_unique", :as => "signup_validate_email"

  # Login and out paths
  match "login" => "session#create", :as => "login_create", :via => :post
  match "login" => "session#new", :as => "login"
  match "logout" => "session#destroy", :as => "logout"

  # Dashboard
  match "dashboard" => "dashboard#index", :as => "dashboard"

  # Validations
  match "i18n/all" => "i18n#all", :as => "i18n"
  match "i18n/validations" => "i18n#validation", :as => "i18n_validation"

  match ":band_id" => "bands#show", :as => "band"
  resources :bands, :path => '', :except => [:index, :create, :new, :show] do
  
    resources :todos, :controller => "TodoGroups", :as => "todo_groups" do
      
      resources :items, :controller => "Todos", :as => "todos" do

        match "status" => "todos#get_statuses", :via => :get, :As => "status"
        match "status" => "todos#create_status", :via => :post, :as => "create_status"

        resources :comments

      end

    end

  end



  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  # root :to => 'welcome#index'

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id))(.:format)'
end
