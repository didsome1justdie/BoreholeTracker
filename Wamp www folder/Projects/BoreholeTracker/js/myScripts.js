var myApp = angular.module('myApp', ['ngRoute'])

myApp.config(function ($routeProvider, $locationProvider) 
{
    $locationProvider.hashPrefix("");
    $routeProvider.when("/home", 
    {
        templateUrl: "MyTemplates/Home.html",
        controller: "HomeController"
    })
    $routeProvider.when("/addborehole", 
    {
        templateUrl: "MyTemplates/AddBorehole.html",
        controller: "AddBoreholeController"
    })
    $routeProvider.when("/deleteborehole", 
    {
        templateUrl: "MyTemplates/DeleteBorehole.html",
        controller: "DeleteBoreholeController"
    })
    $routeProvider.when("/editborehole", 
    {
        templateUrl: "MyTemplates/EditBorehole.html",
        controller: "EditBoreholeController"
    })
    $routeProvider.when("/addreading", 
    {
        templateUrl: "MyTemplates/AddReading.html",
        controller: "AddReadingController"
    })
    $routeProvider.when("/deletereading", 
    {
        templateUrl: "MyTemplates/DeleteReading.html",
        controller: "DeleteReadingController"
    })
    $routeProvider.when("/editreading", 
    {
        templateUrl: "MyTemplates/EditReading.html",
        controller: "EditReadingController"
    })
    $routeProvider.when("/view", 
    {
        templateUrl: "MyTemplates/View.html",
        controller: "ViewController"
    })
    $routeProvider.otherwise(
    {
        redirectTo :"/home"
    })
    //$locationProvider.html5Mode(true);
})
myApp.controller("HomeController", function($scope)
{
    
})

myApp.controller("AddBoreholeController", ["$scope", "$http", "$window", function($scope, $http, $window)
{
    //add new borehole
    $scope.addnewborehole = function()
    {
        var correct = true;
        $scope.msg = "|"
        if($scope.bornam == undefined)
        {
            $scope.msg = $scope.msg + ' Borehole Name is required! |';
            correct = false;
        }
        if($scope.bortyp == undefined)
        {
            $scope.msg = $scope.msg + ' Borehole Type is required! |';
            correct = false;
        }
        if($scope.borlat == undefined)
        {
            $scope.msg = $scope.msg + ' Latitude is required! |';
            correct = false;
        }
        if($scope.borlng == undefined)
        {
            $scope.msg = $scope.msg + ' Longitude is required! |';
            correct = false;
        }
        if($scope.borele == undefined)
        {
            $scope.msg = $scope.msg + ' Elevation is required! |';
            correct = false;
        }
        
        if(correct)
        {
            $http(
            {
                method : 'POST',
                url : "/projects/BoreholeTracker/Background.php",
                data: 
                {
                    'request' : 'addnewborehole',
                    'bornam' : $scope.bornam, 
                    'bortype' : $scope.bortyp, 
                    'lat' : $scope.borlat, 
                    'long' : $scope.borlng, 
                    'ele' : $scope.borele
                }
            })
            .then(function(response)
            {
                $scope.response = response.data;
                if($scope.response == 1)
                {
                    $scope.msg = "Borehole " + $scope.bornam + " added successfully";
                }
                else
                {
                    console.log($scope.response);
                }
            });
        }
    }
}])
myApp.controller("DeleteBoreholeController", function($scope, $http)
{
    $scope.deletelist = function()
    {
        $http(
        {
            method : 'POST',
            url : "/projects/BoreholeTracker/Background.php",
            data: 
            {
                request : 'getactiveboreholes'
            }
        })
        .then(function(response)
        {
            $scope.deleteBoreholeList = response.data;
            console.log(response.data);
        });
    }
    $scope.deletelist();
    $scope.deleteborehole = function(id)
    {
        var correct = true;
        $scope.msg = "|"
        if(id == undefined)
        {
            $scope.msg = $scope.msg + ' Please select a borehole! |';
            correct = false;
        }
        if(correct)
        {
            $http(
            {
                method : 'POST',
                url : "/projects/BoreholeTracker/Background.php",
                data: 
                {
                    request : 'deleteborehole',
                    'borid' : id.BoreholeID
                }
            })
            .then(function(response)
            {
                $scope.response = response.data;
                if($scope.response == 1)
                {
                    $scope.msg = "Borehole " + id.BoreholeID + " deleted successfully";
                }
                else
                {
                    console.log($scope.response);
                }
                $scope.deletelist();
                $scope.reinstatelist();
            });
        }
    }
    $scope.reinstatelist = function()
    {
        $http(
        {
            method : 'POST',
            url : "/projects/BoreholeTracker/Background.php",
            data: 
            {
                request : 'getinactiveboreholes'
            }
        })
        .then(function(response)
        {
            $scope.reinstateBoreholeList = response.data;
            console.log(response.data);
        });
    }
    $scope.reinstatelist();
    $scope.reinstateborehole = function(id)
    {
        var correct = true;
        $scope.msg = "|"
        if(id == undefined)
        {
            $scope.msg = $scope.msg + ' Please select a borehole! |';
            correct = false;
        }
        if(correct)
        {
            $http(
            {
                method : 'POST',
                url : "/projects/BoreholeTracker/Background.php",
                data: 
                {
                    request : 'reinstateborehole',
                    'bornum' : id.BoreholeID
                }
            })
            .then(function(response)
            {
                $scope.response = response.data;
                if($scope.response == 1)
                {
                    $scope.msg = "Borehole " + id.BoreholeID + " reinstated successfully";
                }
                else
                {
                    console.log($scope.response);
                }
                $scope.deletelist();
                $scope.reinstatelist();
            });
        }
    }
})
myApp.controller("EditBoreholeController", ["$scope", "$http", "$window", function($scope, $http, $window)
{
    $scope.editlist = function()
    {
        $http(
        {
            method : 'POST',
            url : "/projects/BoreholeTracker/Background.php",
            data: 
            {
                request : 'getactiveboreholes'
            }
        })
        .then(function(response)
        {
            $scope.editBoreholeList = response.data;
            console.log(response.data);
        });
    }
    $scope.editlist();
    $scope.editborehole = function(selectedborhol)
    {
        var correct = true;
        $scope.msg = "|"
        if($scope.bornam == undefined && $('#bornam').prop('value') < 2)
        {
            $scope.msg = $scope.msg + ' Borehole Name is too short or required! |';
            correct = false;
        }
        if($scope.bortyp == undefined && $('#bortyp').prop('value') < 2)
        {
            $scope.msg = $scope.msg + ' Borehole Type is too short or required! |';
            correct = false;
        }
        if($scope.borlat == undefined && $('#borlat').prop('value') < 2)
        {
            $scope.msg = $scope.msg + ' Latitude is too short or required! |';
            correct = false;
        }
        if($scope.borlng == undefined && $('#borlng').prop('value') < 2)
        {
            $scope.msg = $scope.msg + ' Longitude is too short or required! |';
            correct = false;
        }
        if($scope.borele == undefined && $('#borele').prop('value') < 1)
        {
            $scope.msg = $scope.msg + ' Elevation is too short or required! |';
            correct = false;
        }
        
        if(correct)
        {
            $http(
            {
                method : 'POST',
                url : "/projects/BoreholeTracker/Background.php",
                data: 
                {
                    'request' : 'editboreholedetails',
                    'borid' : selectedborhol.BoreholeID,
                    'bornam' : $('#bornam').prop('value'),
                    'bortyp' : $('#bortyp').prop('value'), 
                    'lat' : $('#borlat').prop('value'), 
                    'long' : $('#borlng').prop('value'), 
                    'ele' : $('#borele').prop('value')
                }
            })
            .then(function(response)
            {
                $scope.response = response.data;
                if($scope.response == 1)
                {
                    $scope.msg = "Borehole " + $('#borid').prop('value') + " edited successfully";
                    setTimeout(function() {$window.location.reload();}, 2000);
                }
                else
                {
                    console.log($scope.response);
                }
            });
        }
    }
}])
myApp.controller("AddReadingController", ["$scope", "$http", "$window", function($scope, $http, $window)
{
    $scope.editlist = function()
    {
        $http(
        {
            method : 'POST',
            url : "/projects/BoreholeTracker/Background.php",
            data: 
            {
                request : 'getactiveboreholes'
            }
        })
        .then(function(response)
        {
            $scope.showBoreholeList = response.data;
            console.log(response.data);
        });
    }
    $scope.editlist();

    //add new reading
    $scope.addnewreading = function(selectedboreh)
    {
        var correct = true;
        $scope.msg = "|"
        if(selectedboreh == undefined)
        {
            $scope.msg = $scope.msg + ' Please select a borehole! |';
            correct = false;
        }
        if($scope.readdate == undefined && $('#readdate').prop('value') < 1)
        {
            $scope.msg = $scope.msg + ' Please select a date! |';
            correct = false;
        }
        if($scope.reading == undefined && $('#reading').prop('value') < 1)
        {
            $scope.msg = $scope.msg + ' Please enter a reading! |';
            correct = false;
        }

        if(correct)
        {
            var mydate = $('#readdate').prop('value');
            var year = mydate.substring(0,4);
            var month = mydate.substring(5,7);
            var day = mydate.substring(8,10);
            var date = year + "-" + month + "-" + day;
            
            $http(
            {
                method : 'POST',
                url : "/projects/BoreholeTracker/Background.php",
                data: 
                {
                    'request' : 'addnewreading',
                    'borid' : selectedboreh.BoreholeID, 
                    'readdate' : date, 
                    'reading' : $('#reading').prop('value')
                }
            })
            .then(function(response)
            {
                $scope.response = response.data;
                if($scope.response == 1)
                {
                    $scope.msg = "Reading for Borehole: " + selectedboreh.BoreholeID + " added successfully";
                }
                else
                {
                    console.log($scope.response);
                }

                console.log($scope.msg);
            });
        }
        
    }
}])
myApp.controller("DeleteReadingController", function($scope, $http)
{
    $scope.deletelist = function()
    {
        $http(
        {
            method : 'POST',
            url : "/projects/BoreholeTracker/Background.php",
            data: 
            {
                request : 'getactivereadings'
            }
        })
        .then(function(response)
        {
            $scope.deleteReadingList = response.data;
            console.log(response.data);
        });
    }
    $scope.deletelist();
    $scope.deletereading = function(id)
    {
        var correct = true;
        $scope.msg = "|"
        if(id == undefined)
        {
            $scope.msg = $scope.msg + ' Please select a reading! |';
            correct = false;
        }
        if(correct)
        {
            $http(
            {
                method : 'POST',
                url : "/projects/BoreholeTracker/Background.php",
                data: 
                {
                    request : 'deletereading',
                    'readid' : id.ReadingID
                }
            })
            .then(function(response)
            {
                $scope.response = response.data;
                if($scope.response == 1)
                {
                    $scope.msg = "Reading with ID: " + id.ReadingID + " deleted successfully";
                }
                else
                {
                    console.log($scope.response);
                }
                $scope.deletelist();
                $scope.reinstatelist();
            });
        }
    }
    $scope.reinstatelist = function()
    {
        $http(
        {
            method : 'POST',
            url : "/projects/BoreholeTracker/Background.php",
            data: 
            {
                request : 'getinactivereadings'
            }
        })
        .then(function(response)
        {
            $scope.reinstateReadingList = response.data;
            console.log(response.data);
        });
    }
    $scope.reinstatelist();
    $scope.reinstatereading = function(id)
    {
        var correct = true;
        $scope.msg = "|"
        if(id == undefined)
        {
            $scope.msg = $scope.msg + ' Please select a reading! |';
            correct = false;
        }
        if(correct)
        {
            $http(
            {
                method : 'POST',
                url : "/projects/BoreholeTracker/Background.php",
                data: 
                {
                    request : 'reinstatereading',
                    'readid' : id.ReadingID
                }
            })
            .then(function(response)
            {
                $scope.response = response.data;
                if($scope.response == 1)
                {
                    $scope.msg = "Reading with ID: " + id.ReadingID + " reinstated successfully";
                }
                else
                {
                    console.log($scope.response);
                }
                $scope.deletelist();
                $scope.reinstatelist();
            });
        }
    }
})
myApp.controller("EditReadingController", ["$scope", "$http", "$window", function($scope, $http, $window)
{
    $scope.editlist1 = function()
    {
        $http(
        {
            method : 'POST',
            url : "/projects/BoreholeTracker/Background.php",
            data: 
            {
                request : 'getactiveboreholes'
            }
        })
        .then(function(response)
        {
            $scope.editBoreholeList = response.data;
            console.log(response.data);
        });
    }
    $scope.editlist1();
    $scope.getreadings = function(selectedborehole)
    {
        var correct = true;
        $scope.msg = "|"
        if(selectedborehole == undefined)
        {
            $scope.msg = $scope.msg + ' Please select a borehole! |';
            correct = false;
        }
        if(correct)
        {
            $http(
            {
                method : 'POST',
                url : "/projects/BoreholeTracker/Background.php",
                data: 
                {
                    request : 'getreadings',
                    'borid' : selectedborehole.BoreholeID
                }
            })
            .then(function(response)
            {
                $scope.editReadingList = response.data;
                console.log(response.data);
            });
        }
    }

    $scope.editreading = function(selectedreading)
    {
        var correct = true;
        $scope.msg = "|"
        if(selectedreading == undefined)
        {
            $scope.msg = $scope.msg + ' Please select a reading! |';
            correct = false;

            if($scope.readdate == undefined && $('#readdate').prop('value') < 1)
            {
                $scope.msg = $scope.msg + ' Please select a date! |';
                correct = false;
            }
            if($scope.reading == undefined && $('#reading').prop('value') < 1)
            {
                $scope.msg = $scope.msg + ' Please enter a reading! |';
                correct = false;
            }
        }
        if(correct)
        {
            var mydate = $('#readdate').prop('value');
            var year = mydate.substring(0,4);
            var month = mydate.substring(5,7);
            var day = mydate.substring(8,10);
            var date = year + "-" + month + "-" + day;

            $http(
            {
                method : 'POST',
                url : "/projects/BoreholeTracker/Background.php",
                data: 
                {
                    'request' : 'editreading',
                    'readid' : selectedreading.ReadingID,
                    'readdate' : date, 
                    'reading' : $('#reading').prop('value')
                }
            })
            .then(function(response)
            {
                $scope.response = response.data;
                if($scope.response == 1)
                {
                    $scope.msg = "Reading with ID: " + selectedreading.ReadingID + " edited successfully";
                    setTimeout(function() {$window.location.reload();}, 2000);
                }
                else
                {
                    console.log($scope.response);
                }
            });
        }
    }
}])
myApp.controller("ViewController", function($scope, $http)
{
    $scope.showData1 = function()
    {
        $http(
        {
            method : 'POST',
            url : "/projects/BoreholeTracker/Background.php",
            data: 
            {
                request : 'getactiveboreholes'
            }
        })
        .then(function(response)
        {
            $scope.showBoreholeList = response.data;
            console.log(response.data);
        });
    }
    $scope.showData1();
    $scope.showData2 = function(id)
    {
        $http(
        {
            method : 'POST',
            url: "/projects/BoreholeTracker/Background.php",
            data: 
            {
                request : 'getreadings',
                'borid' : id.BoreholeID
            }
        })
        .then(function(response)
        {
            $scope.showReadingList = response.data;
        });
        
    }
    
})