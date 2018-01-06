var SlerpedQuaternion = (function () {
	var currentTarget = null;
	var lastTarget = null;
	var lerpDuration = null;
	var lastSet = null;
	var set = false;

	return {
		isSet: function() {
			return set;
		},

		setTarget: function(target, duration) {
			lastTarget = set ? currentTarget : target;
			currentTarget = target;
			set = true;
			lastSet = Date.now();
			lerpDuration = duration;
		},

		getCurrentTarget: function() {
			if (!set) return new THREE.Quaternion();
			if (lastTarget == currentTarget) return currentTarget;
			var alpha = THREE.Math.clamp((Date.now() - lastSet) / lerpDuration, 0, 1);
			return lastTarget.slerp(currentTarget, alpha);
		}
	};

});
