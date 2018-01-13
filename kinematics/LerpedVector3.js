//Linear Interpolation for Vector3
let LerpedVector3 = (function () {
  let currentTarget = new THREE.Vector3();
  let lastTarget = new THREE.Vector3();
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
      if (!this.isSet()) return new THREE.Vector3();
      if (lastTarget == currentTarget) return currentTarget;
      const alpha = THREE.Math.clamp((Date.now() - lastSet) / lerpDuration, 0, 1);
      let retVector3 = new THREE.Vector3();
      retVector3.lerpVectors(lastTarget, currentTarget, alpha);
      return retVector3;
    }
  };

});
