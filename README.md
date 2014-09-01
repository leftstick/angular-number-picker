# angular-number-picker  ![](http://img.shields.io/badge/bower_module-v1.0.2-green.svg?style=flat) #
=====================

A directive used for picking number by using -/+ button, instead of typing the number directly.

This is an `angular` directive designed in `mobile-first` concept. Which means you would have better user experience while in mobile development.

> While running on mobile device, you would increase/decrease the number continuously by long tap the -/+ button.

![](https://raw.githubusercontent.com/leftstick/angular-number-picker/master/docs/img/demo.png)

Try it: [plunker](http://plnkr.co/edit/BrojZhv8fZIS0XLJEeO9?p=preview)


## Requirement ##

- [angularjs](http://angularjs.org/) (1.2.0+)

## UI dependency(optional) ##

- [bootstrap](http://getbootstrap.com) (3.2.0+)

## Install ##

```JavaScript
bower install angular-number-picker --save
```
## Basic Usage ##

- Include `angular-number-picker.js` into your `index.html` by using `script` tag, or you have other way to import dependency(For example: requirejs), like following:
```HTML
<script type="text/javascript" src="[location]/angular-number-picker.js"></script>
```
- Add `angularNumberPicker` module as your angular app's dependency
```JavaScript
var demo = angular.module('demo', ['angularNumberPicker']);
```
- Use `h-number` tag in your html
```HTML
<div ng-controller="DemoController">
    <h-number value="input.num" min="2" max="10" step="1"></h-number>
</div>
```
- Writing `DemoController`
```JavaScript
demo.controller('DemoController', ['$scope', function($scope) {
   $scope.input = {
            num: 0
        };

   $scope.getNumber = function() {
       alert('The number is: [' + $scope.input.num + ']');
   };
}]);
``` 

## `h-number` configuration ##

| Attribute        | Type           | Required  | Description |
| :------------- |:-------------| :-----:| :-----|
| value | [expression] | Yes | Expression to evaluate as the input number |
| min | Number | No | The minimal point to limit the operation. 0 by default |
| max | Number | No | The maximum point to limit the operation. 100 by default |
| step | Number | No | The step value for the operation. 1 by default|

## build-in class ##

### `input-group` ###

The wrapper class for the `h-number` element

### `input-group-addon` ###

The wrapper class for `+-` operator

### `form-control` ###

The wrapper class for the number area at the center

### `active` ###

The `active` class will be added to the `input-group-addon` button, while touching them. So it's possible to implement your own behavior.


> It's easy to implement those classes to achieve your own UI


## run demo locally ##

### Install npm dependency ###
```Shell
npm install
```

### Install bower dependency ###
```Shell
bower install
```

### run demo ###
```Shell
gulp demo
```


## LICENSE ##

[MIT License](https://raw.githubusercontent.com/leftstick/angular-number-picker/master/LICENSE)



[expression]: https://docs.angularjs.org/guide/expression
