/**
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

import * as ng from 'angular';

const isNull = obj => obj === null || obj === undefined;

const polyfill = function() {
    if (typeof Object.assign !== 'function') {
        Object.assign = function(target) {

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

export const ngNumberPicker = (function() {

    polyfill();

    let name = 'ngNumberPicker';

    var defaults = {
        min: 0,
        max: 100,
        step: 1,
        timeout: 600
    };

    var toNumber = function(value) {
        return Number(value);
    };

    var checkNumber = function(value) {
        if (!ng.isNumber(value)) {
            throw new Error('value [' + value + '] is not a valid number');
        }
    };

    var getTarget = function(e) {
        if (e.touches && e.touches.length > 0) {
            return ng.element(e.touches[0].target);
        }
        return ng.element(e.target);
    };

    var getType = function(e) {
        return getTarget(e).attr('type');
    };

    var transform = function(opts) {
        for (var key in opts) {
            var value = opts[key];
            opts[key] = toNumber(value);
        }
    };

    var directive = function($timeout, $interval) {

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
            link: function($scope, element) {

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

                $scope.$watch('value', function(newValue, oldValue) {
                    $scope.canDown = newValue > opts.min;
                    $scope.canUp = newValue < opts.max;
                    $scope.unit = newValue === 1 ? $scope.singular : $scope.plural;

                    if (newValue !== oldValue) {
                        $scope.change();
                    }
                });

                var changeNumber = function($event) {
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

                addon.on('click', function(e) {
                    changeNumber(e);
                    $scope.$apply();
                    e.stopPropagation();
                });

                addon.on('touchstart', function(e) {
                    if (isPressing) {
                        return;
                    }
                    isPressing = true;
                    getTarget(e).addClass('active');
                    start = new Date().getTime();
                    timeoutPro = $timeout(function() {
                        intervalPro = $interval(function() {
                            changeNumber(e);
                        }, 200);
                    }, opts.timeout);
                    e.preventDefault();
                });

                addon.on('touchend', function(e) {
                    end = new Date().getTime();
                    if (intervalPro) {
                        $interval.cancel(intervalPro);
                        intervalPro = undefined;
                    }
                    if (timeoutPro) {
                        $timeout.cancel(timeoutPro);
                        timeoutPro = undefined;
                    }
                    if ((end - start) < opts.timeout) {
                        changeNumber(e);
                        $scope.$apply();
                    }
                    getTarget(e).removeClass('active');
                    e.stopPropagation();
                    isPressing = false;
                });

                $scope.$on('$destroy', function() {
                    addon.off('touchstart touchend click');
                });

            },
            template: '<div class="input-group"><span class="input-group-addon" type="down" ng-disabled="!canDown">-</span><label class="form-control"><span class="picker-unit-left" ng-if="unitPosition === \'left\' && unit">{{ unit }}</span><ng-transclude>{{ value }}</ng-transclude><span class="picker-unit-right" ng-if="unitPosition !== \'left\' && unit">{{ unit }}</span></label><span class="input-group-addon" type="up" ng-disabled="!canUp">+</span></div>'
        };
    };

    ng.module(name, [])
        .directive('hNumber', ['$timeout', '$interval', directive]);

    return name;
}());
