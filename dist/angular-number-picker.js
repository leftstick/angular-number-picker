(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("angular"));
	else if(typeof define === 'function' && define.amd)
		define(["angular"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("angular")) : factory(root["angular"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ngNumberPicker = undefined;
	
	var _angular = __webpack_require__(1);
	
	var ng = _interopRequireWildcard(_angular);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var isNull = function isNull(obj) {
	    return obj === null || obj === undefined;
	}; /**
	    *
	    *  Defines `hNumberPicker` directive which can only be used as element.
	    *
	    *  It allows end-user to choose number, instead of typing
	    *
	    *  usage:
	    *
	    *       <h-number value="input.num" min="1" max="10" step="1" change="onChange()"></h-number>
	    *
	    *  @author  Howard.Zuo
	    *  @date    May 16th, 2016
	    *
	    */
	
	var polyfill = function polyfill() {
	    if (typeof Object.assign !== 'function') {
	        Object.assign = function (target) {
	
	            // We must check against these specific cases.
	            if (isNull(target)) {
	                throw new TypeError('Cannot convert undefined or null to object');
	            }
	
	            var output = Object(target);
	            for (var index = 1; index < arguments.length; index++) {
	                var source = arguments[index];
	                if (!isNull(source)) {
	                    for (var nextKey in source) {
	                        if (source.hasOwnProperty(nextKey)) {
	                            output[nextKey] = source[nextKey];
	                        }
	                    }
	                }
	            }
	            return output;
	        };
	    }
	};
	
	var ngNumberPicker = exports.ngNumberPicker = function () {
	
	    polyfill();
	
	    var name = 'ngNumberPicker';
	
	    var defaults = {
	        min: 0,
	        max: 100,
	        step: 1,
	        timeout: 600
	    };
	
	    var toNumber = function toNumber(value) {
	        return Number(value);
	    };
	
	    var checkNumber = function checkNumber(value) {
	        if (!ng.isNumber(value)) {
	            throw new Error('value [' + value + '] is not a valid number');
	        }
	    };
	
	    var getTarget = function getTarget(e) {
	        if (e.touches && e.touches.length > 0) {
	            return ng.element(e.touches[0].target);
	        }
	        return ng.element(e.target);
	    };
	
	    var getType = function getType(e) {
	        return getTarget(e).attr('type');
	    };
	
	    var transform = function transform(opts) {
	        for (var key in opts) {
	            var value = opts[key];
	            opts[key] = toNumber(value);
	        }
	    };
	
	    var directive = function directive($timeout, $interval) {
	
	        return {
	            restrict: 'E',
	            transclude: true,
	            scope: {
	                value: '=',
	                singular: '@',
	                plural: '@',
	                unitPosition: '@',
	                min: '@',
	                max: '@',
	                step: '@',
	                change: '&'
	            },
	            link: function link($scope, element) {
	
	                var opts = Object.assign({}, defaults, {
	                    min: $scope.min,
	                    max: $scope.max,
	                    step: $scope.step
	                });
	
	                transform(opts);
	
	                checkNumber(opts.min);
	                checkNumber(opts.max);
	                checkNumber(opts.step);
	
	                if (opts.min > $scope.value) {
	                    $scope.value = opts.min;
	                }
	
	                $scope.$watch('value', function (newValue, oldValue) {
	                    $scope.canDown = newValue > opts.min;
	                    $scope.canUp = newValue < opts.max;
	                    $scope.unit = newValue === 1 ? $scope.singular : $scope.plural;
	
	                    if (newValue !== oldValue) {
	                        $scope.change();
	                    }
	                });
	
	                var changeNumber = function changeNumber($event) {
	                    var type = getType($event);
	
	                    //cast existing value to number, so += will really increment decimal number
	                    $scope.value = Number($scope.value);
	
	                    if (type === 'up') {
	                        if ($scope.value >= opts.max) {
	                            return;
	                        }
	                        $scope.value += opts.step;
	                        if ($scope.value > opts.max) {
	                            $scope.value = opts.max;
	                        }
	                    } else if (type === 'down') {
	                        if ($scope.value <= opts.min) {
	                            return;
	                        }
	                        $scope.value -= opts.step;
	                        if ($scope.value < opts.min) {
	                            $scope.value = opts.min;
	                        }
	                    }
	                };
	
	                var isPressing;
	                var timeoutPro;
	                var intervalPro;
	                var start;
	                var end;
	                var addon = element.find('span');
	
	                addon.on('click', function (e) {
	                    changeNumber(e);
	                    $scope.$apply();
	                    e.stopPropagation();
	                });
	
	                addon.on('touchstart', function (e) {
	                    if (isPressing) {
	                        return;
	                    }
	                    isPressing = true;
	                    getTarget(e).addClass('active');
	                    start = new Date().getTime();
	                    timeoutPro = $timeout(function () {
	                        intervalPro = $interval(function () {
	                            changeNumber(e);
	                        }, 200);
	                    }, opts.timeout);
	                    e.preventDefault();
	                });
	
	                addon.on('touchend', function (e) {
	                    end = new Date().getTime();
	                    if (intervalPro) {
	                        $interval.cancel(intervalPro);
	                        intervalPro = undefined;
	                    }
	                    if (timeoutPro) {
	                        $timeout.cancel(timeoutPro);
	                        timeoutPro = undefined;
	                    }
	                    if (end - start < opts.timeout) {
	                        changeNumber(e);
	                        $scope.$apply();
	                    }
	                    getTarget(e).removeClass('active');
	                    e.stopPropagation();
	                    isPressing = false;
	                });
	
	                $scope.$on('$destroy', function () {
	                    addon.off('touchstart touchend click');
	                });
	            },
	            template: '<div class="input-group"><span class="input-group-addon" type="down" ng-disabled="!canDown">-</span><label class="form-control"><span class="picker-unit-left" ng-if="unitPosition === \'left\' && unit">{{ unit }}</span><ng-transclude>{{ value }}</ng-transclude><span class="picker-unit-right" ng-if="unitPosition !== \'left\' && unit">{{ unit }}</span></label><span class="input-group-addon" type="up" ng-disabled="!canUp">+</span></div>'
	        };
	    };
	
	    ng.module(name, []).directive('hNumber', ['$timeout', '$interval', directive]);
	
	    return name;
	}();

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }
/******/ ])
});
;