var should = require('should');
var validateDeviceState = require('../../validator/deviceStateValidator.js');

describe('DeviceState', function() {

  describe('purge', function() {
    
    it('should return 2 devicestates only', function (done) {
     	
        var state = {
            devicetype : 1,
            value: 12.1,
            datetime: '2010-01-01 22:00:00'
        };
        
        gladys.deviceState.createByIdentifier('THIS_IS_MY_IDENTIFIER', 'test', 'binary', state)
        .then(function(result){
           options = {
             devicetype : result.devicetype,
             days : 365
           }

           return gladys.deviceState.purge(options);
        })
        .then(function() {
           states = {
              devicetype : 1
           }

           return gladys.deviceState.get(states);
        })
        .then(function(result){
           validateDeviceState(result);
           result.should.be.instanceof(Array);
           result.should.have.length(2);
           done();
        }).catch(function(err){
            done(err);
        });

    });
    
    
  });

});
