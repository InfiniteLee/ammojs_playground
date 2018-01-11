//Spherical Linear Interpolation for Quaternions
var SlerpedQuaternion = (function () {
  var currentTarget = new THREE.Quaternion();
  var lastTarget = new THREE.Quaternion();
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
      if (!this.isSet()) return new THREE.Quaternion();
      if (lastTarget == currentTarget) return currentTarget;
      var alpha = THREE.Math.clamp((Date.now() - lastSet) / lerpDuration, 0, 1);

      var retQuaternion = new THREE.Quaternion();
      return THREE.Quaternion.slerp(lastTarget, currentTarget, retQuaternion, alpha)
    }
  };

});
