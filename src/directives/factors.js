app.directive("factor", function() {
    return {
        restrict: "E",
        scope: {
            info: "="
        },
        templateUrl: "views/factors.html"
    };
});
