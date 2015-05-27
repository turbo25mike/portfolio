'use strict';

angular.module('portfolioApp')
    .controller('ExperienceAdminController', function ($scope, $routeParams, onepageUtil, Upload, Auth, appSettings, toastr, workService) {
        var vm = this;
        vm.isAdmin = Auth.isAdmin;
        vm.appSettings = appSettings;
        vm.experienceLoaded = false;

        if ($routeParams.id === 'new') {
            vm.experienceLoaded = true;
            vm.experience = {
                name: '',
                info: '',
                active: true,
                style: '',
                link: '',
                date: new Date(),
                image: {
                    id: 'sample',
                    format: 'jpg',
                    transformations: ''
                },
                experienceItems: []
            };
        } else {
            vm.experience = workService.get({
                id: $routeParams.id
            }, function(){
             vm.experienceLoaded = true
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
                        vm.experience.image.id = data.public_id;
                        vm.experience.image.format = data.format;
                    } else {
                        file.error = true;
                        toastr.error("failed to upload [" + file.name + "] error: " + data.error.code);
                    }
                });
            });
        });

        $scope.$watch(angular.bind(vm, function () {
            return this.expfiles;
        }), function () {
            if (!vm.expfiles) {
                return;
            }
            vm.expfiles.forEach(function (file) {
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
                        vm.experience.experienceItems.push({
                            id: data.public_id,
                            format: data.format,
                            order: vm.experience.experienceItems.length || 0,
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

            if (form.$valid && Auth.isAdmin()) {

                var saveData = {
                    _id: vm.experience._id,
                    name: form.name.$modelValue,
                    info: form.info.$modelValue,
                    style: form.style.$modelValue,
                    link: form.link.$modelValue,
                    date: form.date.$modelValue,
                    image: vm.experience.image,
                    experienceItems: vm.experience.experienceItems
                };

                if (vm.experience._id) {
                    workService.update(
                        saveData,
                        function () {
                            toastr.success('Item Saved.');
                        },
                        function (ex) {
                            toastr.error(ex);
                        });
                } else {
                    workService.save(
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
                angular.forEach(vm.experience.experienceItems, function (image) {
                    if (image.order === itemOrder) {
                        image.order--;
                    } else if (image.order === itemOrder - 1) {
                        image.order++;
                    }
                });
            } else {
                angular.forEach(vm.experience.experienceItems, function (image) {
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
            for (var i = 0; i < vm.experience.experienceItems.length; i++) {
                if (vm.experience.experienceItems[i]._id === image._id) {
                    foundIndex = i;
                    break;
                }
            }
            if (foundIndex !== null) {
                vm.experience.experienceItems.splice(foundIndex, 1);
                toastr.success('Your image has been removed.  Please remember to save this change to apply.');
            }

        };
    });