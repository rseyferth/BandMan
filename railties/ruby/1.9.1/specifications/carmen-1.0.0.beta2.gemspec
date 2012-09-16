# -*- encoding: utf-8 -*-

Gem::Specification.new do |s|
  s.name = "carmen"
  s.version = "1.0.0.beta2"

  s.required_rubygems_version = Gem::Requirement.new(">= 1.3.6") if s.respond_to? :required_rubygems_version=
  s.authors = ["Jim Benton"]
  s.date = "2012-05-09"
  s.description = "Includes data from the Debian iso-data project."
  s.email = "jim@autonomousmachine.com"
  s.homepage = "http://github.com/jim/carmen"
  s.require_paths = ["lib"]
  s.rubygems_version = "1.8.16"
  s.summary = "A collection of geographic region data for Ruby"

  if s.respond_to? :specification_version then
    s.specification_version = 3

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_development_dependency(%q<minitest>, ["= 2.6.1"])
      s.add_development_dependency(%q<nokogiri>, [">= 0"])
      s.add_development_dependency(%q<rake>, ["= 0.9.2.2"])
    else
      s.add_dependency(%q<minitest>, ["= 2.6.1"])
      s.add_dependency(%q<nokogiri>, [">= 0"])
      s.add_dependency(%q<rake>, ["= 0.9.2.2"])
    end
  else
    s.add_dependency(%q<minitest>, ["= 2.6.1"])
    s.add_dependency(%q<nokogiri>, [">= 0"])
    s.add_dependency(%q<rake>, ["= 0.9.2.2"])
  end
end
