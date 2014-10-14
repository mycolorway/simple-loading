(function() {
  describe('Simple Sample', function() {
    return it('should inherit from SimpleModule', function() {
      var sample;
      sample = simple.sample();
      return expect(sample instanceof SimpleModule).toBe(true);
    });
  });

}).call(this);
