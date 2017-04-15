// Code goes here
(function () {
  "use strict";

  var app = angular.module("photoSelectDemo", ["ui.bootstrap", 'ngFileUpload', 'angularUtils.directives.dirPagination', 'imageCropper'


  ]);

  app.controller('myController', ['$scope', myController])
  app.directive("pictureUriFromPhotoIdDirective", [pictureUriFromPhotoIdDirective])
  app.directive("dimentionClass", [dimentionClass]);

  app.filter("convertToSrc", function () {
    return function (pin) {
      var blob = pin[Object.keys(pin)[0]];
      var reader = new window.FileReader();

      reader.readAsDataURL();
      console.log(reader);

      reader.onloadend = function () {
        base64data = reader.result;
        console.log(base64data);
        return base64data;
      }


    };
  });
  // app.directive('fileModel', ['$parse', function ($parse) {
  //   return {
  //     restrict: 'A',
  //     link: function (scope, element, attrs) {
  //       var model = $parse(attrs.fileModel);
  //       var modelSetter = model.assign;

  //       element.bind('change', function () {
  //         scope.$apply(function () {
  //           modelSetter(scope, element[0].files[0]);
  //           scope.chnageFile();
  //         });
  //       });
  //     }
  //   };
  // }]);
  app.controller('mainController', ['$scope', function ($scope) {
    /* jshint validthis: true */
    var vm = this;
    $scope.$watch('file1',function(){
      console.log("fine.. ");
      console.log($scope.file1);
      $scope.chnageFile();
    },true);
    $scope.showImg = false;
    $scope.chnageFile = function () {
      $scope.showImg = false;
      var file = $scope.file1;

      console.log('file is ');
      console.dir(file);
      var reader = new FileReader();

      reader.addEventListener("load", function () {
        // preview.src = reader.result;
        $scope.imgBase64 = reader.result;
        $scope.$apply(function () {
          $scope.showImg = true;
        });
        // alert($scope.imgBase64);
      }, false);

      if (file) {
        reader.readAsDataURL(file);
      }

    };

    // Some cropper options.
    vm.imageUrl = 'images/unsplash_' + getRandomInt(1, 7) + '.jpg';
    vm.showControls = true;
    vm.fit = true;

    vm.myButtonLabels = {
      rotateLeft: ' (rotate left) ',
      rotateRight: ' (rotate right) ',
      zoomIn: ' (zoomIn) ',
      zoomOut: ' (zoomOut) ',
      fit: ' (fit) ',
      crop: ' [crop] '
    };

    vm.updateResultImage = function (base64) {
      vm.resultImage = base64;
      $scope.$apply(); // Apply the changes.
    };

    // Cropper API available when image is ready.
    //vm.cropperApi = function(cropperApi) {
    //  cropperApi.zoom(3);
    //  cropperApi.rotate(270);
    //  cropperApi.fit();
    //  vm.resultImage = cropperApi.crop();
    //  $scope.$apply(); // Apply the changes.
    //};

    /**
     * Returns a random integer between min (inclusive) and max (inclusive)
     */
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }]);
  function myController($scope) {
    $scope.test = '1d23'

  }

  function pictureUriFromPhotoIdDirective() {
    return {
      scope: {
        pictureUriFromPhotoIdDirective: "="
      },
      restrict: "A",
      link: function ($scope, $elem, $attr) {
        $scope.$watch('pictureUriFromPhotoIdDirective', function (newVal) {
          var uri;
          if (newVal != null) {

            uri = 'https://unsplash.it/' + newVal + '?image=' + newVal;

            $elem.attr('src', uri);

          } else {
            var src = $attr['defaultsrc'];
            $elem.attr('src', src);
          }

        });


      }
    };
  }


  function dimentionClass() {
    return {
      link: function (scope, element) {
        var img = element[0];
        img.onload = function () {
          var container = img.parentNode;

          var cwidth = parseInt(container.offsetWidth);
          var cheight = parseInt(container.offsetHeight);
          if (cwidth == 0) {
            cwidth = 1
          }; // if container (e.g. on a dropdown) isn't visible then it has no height or width. Setting to 1 to assume square input'
          if (cheight == 0) {
            cheight = 1
          };
          var containerRatio = cwidth / cheight;
          var imageRatio = img.width / img.height;


          img.className = imageRatio > containerRatio ? 'landscape' : 'portrait';
        }
      }
    };
  }


}());