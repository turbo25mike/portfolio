'use strict';

angular.module('portfolioApp')
    .controller('ToyAdminController', function ($scope, $routeParams, toolService, onepageUtil, Upload, Auth, appSettings, toastr) {
        var vm = this;
        vm.isAdmin = Auth.isAdmin;
        vm.appSettings = appSettings;
        vm.toyLoaded = false;
    
        if ($routeParams.id === 'new') {
            vm.toyLoaded = true;
            vm.toy = {
                images: []
            };
        } else {
            vm.toy = toolService.get({
                id: $routeParams.id
            }, function () {
                vm.toyLoaded = true
            });
        }

        onepageUtil.remove();

        $scope.$watch(angular.bind(vm, function () {
            return this.files;
        }), function () {
            if (!vm.files) {
                return;
            }
            vm.files.forEach(function (file) {
                vm.upload = Upload.upload({
                    url: 'api/cloudinary',
                    data: {},
                    file: file
                }).progress(function (e) {
                    file.progress = Math.round((e.loaded * 100.0) / e.total);
                    file.status = 'Uploading... ' + file.progress + '%';
                    if (!vm.$$phase) {
                        $scope.$apply();
                    }
                }).success(function (data) {
                    if (!data.error) {
                        vm.toy.images.push({
                            id: data.public_id,
                            format: data.format,
                            order: vm.toy.images.length || 0,
                            transformations: ''
                        });
                    } else {
                        file.error = true;
                        toastr.error("failed to upload [" + file.name + "] error: " + data.error.code);
                    }
                });
            });
        });

        $scope.save = function (form) {

            vm.submitted = true;

            if (form.$valid && Auth.isAdmin()) {

                var saveData = {
                    _id: vm.toy._id,
                    name: form.name.$modelValue,
                    order: vm.toy.order,
                    images: vm.toy.images
                };

                if (vm.toy._id) {
                    toolService.update(
                        saveData,
                        function () {
                            toastr.success('Item Saved.');
                        },
                        function (ex) {
                            toastr.error(ex);
                        });
                } else {
                    toolService.save(
                        saveData,
                        function () {
                            toastr.success('Item Saved.');
                        },
                        function (ex) {
                            toastr.error(ex);
                        });
                }
            }
        };

        vm.move = function (itemOrder, direction) {
            if (direction === 'up') {
                angular.forEach(vm.toy.images, function (image) {
                    if (image.order === itemOrder) {
                        image.order--;
                    } else if (image.order === itemOrder - 1) {
                        image.order++;
                    }
                });
            } else {
                angular.forEach(vm.toy.images, function (image) {
                    if (image.order === itemOrder) {
                        image.order++;
                    } else if (image.order === itemOrder + 1) {
                        image.order--;
                    }
                });
            }
        };

        vm.delete = function (image) {
            var foundIndex = null;
            for (var i = 0; i < vm.toy.images.length; i++) {
                if (vm.toy.images[i]._id === image._id) {
                    foundIndex = i;
                    break;
                }
            }
            if (foundIndex !== null) {
                vm.toy.images.splice(foundIndex, 1);
                toastr.success('Your image has been removed.  Please remember to save this change to apply.');
            }

        };
    });