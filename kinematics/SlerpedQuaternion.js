//Spherical Linear Interpolation for Quaternions
let SlerpedQuaternion = (function () {
  let currentTarget = new THREE.Quaternion();
  let lastTarget = new THREE.Quaternion();
  let lerpDuration = null;
  let lastSet = null;
  let set = false;

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
      const alpha = THREE.Math.clamp((Date.now() - lastSet) / lerpDuration, 0, 1);

      let retQuaternion = new THREE.Quaternion();
      return THREE.Quaternion.slerp(lastTarget, currentTarget, retQuaternion, alpha)
    }
  };

});
