(function () {
    "use strict";

    angular.module("photoSelectDemo")
        .directive('panZoom', [panZoom])
        .directive('panZoomUrl', [panZoomUrl])
        .controller("panZoomCtrl", ["$scope", "$location", panZoomCtrl])

    function panZoom() {
        return {
            scope: {
                imageWidth: '=',
                imageHeight: '=',
                imageBlug: '=',
                uploadFunction: '='
            },
            transclude: false,
            restrict: "E",
            templateUrl: 'panZoom.html',
            replace: false,
            controller: 'panZoomCtrl',
            controllerAs: 'ctrl',
            link: function ($scope, $elem, $attr, controller) {
                var a = $elem.find('.pan-image')
                $scope.$watch(function () { return a.attr('src') }, function (newVal) {
                    if (newVal) { controller.init($elem) }
                })


            }
        }
    }
    function panZoomUrl() {
        return {
            scope: {
                imageWidth: '=',
                imageHeight: '=',
                imageurl: '=',
                uploadFunction: '='
            },
            transclude: false,
            restrict: "E",
            templateUrl: 'panZoomURL.html',
            replace: false,
            controller: 'panZoomCtrl',
            controllerAs: 'ctrl',
            link: function ($scope, $elem, $attr, controller) {
                var a = $elem.find('.pan-image')
                $scope.$watch(function () { return a.attr('src') }, function (newVal) {
                    if (newVal) { controller.init($elem) }
                })


            }
        }
    }

    function panZoomCtrl($scope, $location) {
        this.panZoomEnabled = true;
        var something = this;
        this.init = function ($element) {
            var _this = this;
            this.img = $element.find('.pan-image');
            this.img.cropper('destroy');
            this.img.cropper({
                viewMode: 3,
                dragMode: 'move',
                autoCropArea: 1,
                restore: true,
                checkImageOrigin: false,
                guides: false,
                highlight: false,
                cropBoxMovable: false,
                cropBoxResizable: false,
                center: false,
                zoomable: true,
                minContainerWidth: 50,
                minContainerHeight: 50,
                toggleDragModeOnDblclick: false,
                built: function () {
                    var cropBoxData = sessionStorage.getItem('cropBoxData');
                    var canvasData = sessionStorage.getItem('canvasData');

                    if (cropBoxData && canvasData) {
                        cropBoxData = JSON.parse(cropBoxData);
                        canvasData = JSON.parse(canvasData);

                        var ratioW = _this.img.cropper().siblings('.cropper-container').width() / cropBoxData.width;
                        var ratioH = _this.img.cropper().siblings('.cropper-container').height() / cropBoxData.height;

                        cropBoxData.width *= ratioW;
                        cropBoxData.height *= ratioH;

                        canvasData.height *= ratioH;
                        canvasData.left *= ratioW;
                        canvasData.top *= ratioH;
                        canvasData.width *= ratioW;

                        _this.img.cropper('setCanvasData', canvasData);
                        _this.img.cropper('setCropBoxData', cropBoxData);
                    }

                }
            });
        }

        $scope.uploadFunction = function () {
            var result = something.img.cropper('getCroppedCanvas');
            if (result) {
                return result;
                var outputUrl = result.toDataURL('image/jpeg')
                $location.url(outputUrl);
            }
            alert("Result!")
        }



    }

})();