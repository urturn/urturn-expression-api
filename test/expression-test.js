buster.spec.expose();

describe('UT.Expression', function(){
  beforeEach(function(){
    expect(WD).toBeDefined() ;
    expect(UT.Expression).toBeDefined() ;
  });
  afterEach(function(){
    UT.Expression._reset();
  });

  describe('.ready callback', function(){
    it('has a ready event that is called with an instance of expression.', function(done){
      var readyFunc = function(expression_instance){
        expect(expression_instance).toBeDefined("Expression should be defined.");
        expect(expression_instance.trigger).toBeDefined("expression instance should have a trigger function.");
        expression_instance.unbind('ready', readyFunc);
        done();
      };
      UT.Expression.ready(readyFunc);
      UT.Expression._dispatch({type: 'ready', options: {}});
      var expression = UT.Expression._postInstance();
      expect(expression).toBeDefined();
      expression.trigger('ready', expression);
    });
  });
});