# -*- encoding: utf-8 -*-

Gem::Specification.new do |s|
  s.name = "carmen-rails"
  s.version = "1.0.0.beta3"

  s.required_rubygems_version = Gem::Requirement.new("> 1.3.1") if s.respond_to? :required_rubygems_version=
  s.authors = ["Jim Benton"]
  s.date = "2012-05-21"
  s.description = "Provides country_select and subregion_select form helpers."
  s.email = ["jim@autonomousmachine.com"]
  s.homepage = "http://github.com/jim/carmen-rails"
  s.require_paths = ["lib"]
  s.rubygems_version = "1.8.16"
  s.summary = "Rails adapter for Carmen"

  if s.respond_to? :specification_version then
    s.specification_version = 3

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<rails>, [">= 0"])
      s.add_runtime_dependency(%q<carmen>, ["~> 1.0.0.beta2"])
      s.add_development_dependency(%q<minitest>, [">= 0"])
    else
      s.add_dependency(%q<rails>, [">= 0"])
      s.add_dependency(%q<carmen>, ["~> 1.0.0.beta2"])
      s.add_dependency(%q<minitest>, [">= 0"])
    end
  else
    s.add_dependency(%q<rails>, [">= 0"])
    s.add_dependency(%q<carmen>, ["~> 1.0.0.beta2"])
    s.add_dependency(%q<minitest>, [">= 0"])
  end
end
