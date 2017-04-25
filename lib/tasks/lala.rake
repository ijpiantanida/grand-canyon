task :before_assets_precompile do
  Rake::Task['npm:install'].invoke
end

Rake::Task['assets:precompile'].enhance ['before_assets_precompile']