require "json"

desc "Compile the css"
task :compile do
  system("compass compile && git add css")
  bower = JSON.parse(File.read("bower.json"))
  File.write('component.urturn.json', JSON.pretty_generate(
  {
    name: bower['name'],
    version: bower['version'],
    main: ["css/styles.css"],
    assets: [
      "fonts/urturn_icons.eot",
      "fonts/urturn_icons.svg",
      "fonts/urturn_icons.ttf",
      "fonts/urturn_icons.woff"
    ]
  }))
end

task :install do
  puts("install Git pre-commit hook")
  system("cp git-pre-commit-hook .git/hooks/pre-commit")
  system("chmod u+x .git/hooks/pre-commit")
end

task :publish do
  puts("tag a new version of urturn-expression-css")
  version = JSON.parse(File.read("bower.json"))['version']
  system("git tag v#{version}")
  system("git push && git push --tags")
end

task :precommit => :compile
task :default => :compile