var path = require('path');
var fs = require('fs');
var bower = require('bower');

function Component (data){
  this.name = data.name;
  this.version = data.version || "0.0.0";
  if(data.main){
    this.main = (typeof data.main === 'string' ? [data.main] : data.main);
  } else {
    data.main = [];
  }
  this.basedir = data.basedir || path.join(bower.config.directory, this.name);
  this.assets = data.assets || [];
  this.files = function(){
    return this.main.concat(this.assets);
  };

  this.includes = {};
  if ( data.includes ){
    data.includes.forEach(function(inc){
      if(!Component.dict[inc]){
        Component.fromName(inc);
      }
      this.includes[inc] = Component.dict[inc];
      this.includes[inc].includedIn = this;
    }.bind(this));
  }

  this.dependencies = {};
  if (data.dependencies) {
    for (var dep in data.dependencies) {
      this.dependencies[dep] = Component.fromName(dep);
    }
  }
}
Component.prototype = {
  eachInclude: function(fn){
    for(var inc in this.includes){
      this.includes[inc].eachInclude(fn);
      fn.call(this, this.includes[inc]);
    }
  },
  eachDependency: function(fn){
    for(var dep in this.dependencies){
      this.dependencies[dep].eachDependency(fn);
      fn.call(this, this.dependencies[dep]);
    }
    for(var inc in this.includes){
      inc.eachDependency(fn);
    }
  }
};
Component.fromName = function(dep){
  var depPath = path.join(bower.config.directory, dep);
  var compPath = path.join(depPath, 'component.urturn.json');
  var bowerPath = path.join(depPath, 'bower.json');
  var legacyBowerPath = path.join(depPath, 'component.json');
  if( fs.existsSync(compPath)) {
    return Component.fromOptions(JSON.parse(fs.readFileSync(compPath)));
  } else if(fs.existsSync(bowerPath)){
    return Component.fromBower(dep, JSON.parse(fs.readFileSync(bowerPath)));
  } else if (fs.existsSync(legacyBowerPath)){
    return Component.fromBower(dep, JSON.parse(fs.readFileSync(legacyBowerPath)));
  } else {
    throw new Error("No json descriptor found for " + dep);
  }
};
Component.fromOptions = function(info){
  if(!Component.dict[info.name]){
    Component.dict[info.name] = new Component(info);
    Component.list.push(Component.dict[info.name]);
  }
  return Component.dict[info.name];
};
Component.fromBower = function(name, info){
  if(!Component.dict[name]){
    Component.dict[name] = new Component({
      name: info.name,
      version: info.version,
      dependencies: info.dependencies || {},
      main: info.main
    });
    Component.list.push(Component.dict[info.name]);
  }
  return Component.dict[name];
};
Component.list = [];
Component.dict = {};

module.exports = Component;