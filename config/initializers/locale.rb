# Set load paths
I18n.load_path += Dir[Rails.root.join('vendor', 'locale', '*.{rb,yml}')]

# Set default locale to en
I18n.default_locale = :en
