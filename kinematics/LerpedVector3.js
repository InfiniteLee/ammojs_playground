//Linear Interpolation for Vector3
var LerpedVector3 = (function () {
  var currentTarget = new THREE.Vector3();
  var lastTarget = new THREE.Vector3();
  var lerpDuration = null;
  var lastSet = null;
  var set = false;

  return {
    isSet: function() {
      return set;
    },

    setTarget: function(target, duration) {
      lastTarget.copy(this.isSet() ? currentTarget : target);
      currentTarget.copy(target);
      set = true;
      lastSet = Date.now();
      lerpDuration = duration;
    },

    getCurrentTarget: function() {
      if (!this.isSet()) return new THREE.Vector3();
      if (lastTarget == currentTarget) return currentTarget;
      var alpha = THREE.Math.clamp((Date.now() - lastSet) / lerpDuration, 0, 1);
      var retVector3 = new THREE.Vector3();
      retVector3.lerpVectors(lastTarget, currentTarget, alpha);
      return retVector3;
    }
  };

});
