buster.spec.expose();

describe('UT.Expression', function(){
  beforeEach(function(){
    expect(WD).toBeDefined() ;
    expect(UT.Expression).toBeDefined() ;
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
      var expression = UT.Expression._getInstance();
      expression.trigger('ready', expression);
    });
  });

  describe('.extendExpression', function(){
    it('can be extended with static module', function(){
      UT.Expression.extendExpression('test', {hello:'hello'});
      var expression = UT.Expression._getInstance();
      expression.trigger('ready', expression);
      expression.initializeExtension();
      expect(expression.test.hello).toBeDefined("expression instance should have a trigger function.");
      expect(expression.test.hello).toEqual('hello');
    });
    
    it('can be extended with dynamic module', function(){
      UT.Expression.extendExpression('testdynamic', function(exp){
        expect(exp).toBeDefined();
        exp.test2 = 'test2';
        return { test3: 'test3' };
      });
      var expression = UT.Expression._getInstance();
      expression.initializeExtension();
      expect(expression.test2).toEqual('test2');
      expect(expression.testdynamic.test3).toEqual('test3');
    });
  });
});