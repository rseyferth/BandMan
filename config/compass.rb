# Require any additional compass plugins here.
project_type = :rails

# Set this to the root of your project when deployed:
http_path = "/"

# Add vendor and lib paths to sass
add_import_path "vendor/assets/sass"
add_import_path "lib/assets/sass"

# Default paths
css_dir = "app/assets/stylesheets"
sass_dir = "app/assets/sass"
images_dir = "app/assets/images"
javascripts_dir = "app/assets/javascripts"
fonts_dir = "publis/assets/fonts"

# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed

# To enable relative paths to assets via compass helper functions. Uncomment:
# relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
line_comments = true


# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass
