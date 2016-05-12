
var demo = angular.module('demo', [window.ngNumberPicker]);

demo.controller('DemoController', [
    '$scope',
    function($scope) {

        $scope.input = {num: 2};

        $scope.getNumber = function() {
            alert('The number is: [' + $scope.input.num + ']');
        };

        $scope.onChange = function() {
            console.log('number changed', $scope.input.num);
        };

    }
]);
