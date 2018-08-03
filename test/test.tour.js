describe('Shepherd', function() {
  describe('.Tour()', function() {
    const instance = new Shepherd.Tour({
      defaults: {
        classes: 'shepherd-theme-arrows',
        scrollTo: true
      }
    });
    it('creates a new tour instance', function() {
      assert.ok(instance instanceof Shepherd.Tour);
    });

    it('returns the default options on the instance', function() {
      assert.ok(instance.options);
    });

    describe('.addStep()', function() {
      it('adds tour steps', function() {
        instance.addStep('test', {
          text: 'This is a test step for our tour'
        });

        assert.equal(instance.steps.length, 1);
      });

      // this is not working as documented
      it.skip('returns the step options', function() {
        assert.ok(instance.defaults);
      });
    });

    describe.skip('.start()', function() {
      it('starts a tour that is the current active', function() {
        instance.start();

        assert.equal(instance, Shepherd.activeTour);
      });
    });

  });
});
