'use strict';

angular.module('portfolioApp')
    .controller('AdminCtrl', function ($http, Auth, User, configService, toastr) {

        var vm = this;
        // Use the User $resource to fetch all users
        vm.users = User.query();
        vm.config = configService.get();

        vm.delete = function (user) {
            User.remove({
                id: user._id
            });
            angular.forEach(vm.users, function (u, i) {
                if (u === user) {
                    vm.users.splice(i, 1);
                }
            });
        };
    
        vm.save = function(form){
            vm.submitted = true;
            
            if (form.$valid && Auth.isAdmin()) {

                var saveData = {
                    _id: vm.config._id,
                    name: form.name.$modelValue,
                    contactEmailAddress: form.contactEmailAddress.$modelValue,
                    about: form.about.$modelValue,
                    linkedInAddress: form.linkedInAddress.$modelValue,
                    githubAddress: form.githubAddress.$modelValue
                };

                if (vm.config._id) {
                    configService.update(
                        saveData,
                        function () {
                            toastr.success('Item Saved.');
                        },
                        function (ex) {
                            toastr.error(ex);
                        });
                } else {
                    configService.save(
                        saveData,
                        function () {
                            toastr.success('Item Saved.');
                        },
                        function (ex) {
                            toastr.error(ex);
                        });
                }
            }
        }

        
        
    });