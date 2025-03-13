# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = "1.0"

# Add additional assets to the asset load path.
# Rails.application.config.assets.paths << Emoji.images_path
# Rails.application.config.assets.paths << Rails.root.join('app', 'assets', 'fonts')

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in the app/assets
# folder are already added.
Rails.application.config.assets.precompile += %w( bootstrap.bundle.min.js sidebar-menu.js dragdrop.js rangeslider.min.js quill.min.js data-table.js prism.js clipboard.min.js feather.min.js simplebar.min.js apexcharts.min.js swiper_bundle.min.js fullcalendar.main.js apexcharts.js custom.js )
