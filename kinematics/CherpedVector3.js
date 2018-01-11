//Cubic Hermite Interpolation for Vector3
var CherpedVector3 = (function () {
  var currentTargetVector3 = new THREE.Vector3();
  var lastTargetVector3 = new THREE.Vector3();
  var currentTargetVelocity = new THREE.Vector3();
  var lastTargetVelocity = new THREE.Vector3();
  var lerpDuration = null;
  var lastSet = null;
  var set = false;

  return {
    isSet: function() {
      return set;
    },

    setTarget: function(targetVector3, targetVelocity, duration) {
      lastTargetVector3.copy(this.isSet() ? currentTargetVector3 : targetVector3);
      currentTargetVector3.copy(targetVector3);
      lastTargetVelocity.copy(this.isSet() ? currentTargetVelocity : targetVelocity);
      currentTargetVelocity.copy(targetVelocity);
      set = true;
      lastSet = Date.now();
      lerpDuration = duration;
    },

    getCurrentTarget: function() {
      if (!set) return new THREE.Vector3();
      if (lastTargetVector3 == currentTargetVector3) return currentTargetVector3;
      var t = THREE.Math.clamp((Date.now() - lastSet) / lerpDuration, 0, 1);

      var t2 = t * t;
      var t3 = t * t * t;
      var a = 1 - 3*t2 + 2*t3;
      var b = t2 * (3 - 2*t);
      var c = t * (t -1) * (t - 1);
      var d = t2 * (t - 1);
      var retVector = new THREE.Vector3();
      retVector.add(lastTargetVector3.clone().multiplyScalar(a));
      retVector.add(currentTargetVector3.clone().multiplyScalar(b));
      retVector.add(lastTargetVelocity.clone().multiplyScalar(c));
      retVector.add(currentTargetVelocity.clone().multiplyScalar(d));
      return retVector;
    }
  };

});
