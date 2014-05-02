// oj.PluginName

;(function(root, factory){
  // Export to Node, Require.JS, or globally
  if (typeof module === 'object' && module.exports) module.exports = factory(root)
  else if (typeof define === 'function' && define.amd) define(function(){return factory(root)})
  else factory(root, root.oj)
}(this, function(root, oj){

  // Create plugin
  var plugin = function(oj, settings){
    if (typeof settings !== 'object')
      settings = {}

    var PluginName = oj.createType('PluginName', {

      base: oj.View,

      constructor: function(){
        var this_ = this,
          union = oj.unionArguments(arguments),
          options = union.options,
          args = union.args;

        // Set properties from arguments
        if(args.length > 0)
          this.value = args[0];

        // Set properties if found in options
        [].forEach(function(prop){
          if (options[prop] != null)
            this[prop] = oj.argumentShift(options, prop);
        });

        // Create root element
        this.el = oj(function(){
          oj.button()
        });

        // Call super
        PluginName.base.constructor.apply(this, [options]);
      },

      properties: {
        value: {
          get:function(){return this._value || 'default value';},
          set:function(v){this._value = v;}
        }
      },

      methods: {
        method:function(){
          console.log('method called');
        }
      }
    });

    return {PluginName:PluginName};
  }
  // Export to OJ
  if (typeof oj != 'undefined') oj.use(plugin);
  return plugin;
}));

