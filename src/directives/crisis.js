app.directive("crises", function() {
    return {
        restrict: "E",
        scope: {
            info: "="
        },
        templateUrl: "views/crisis.html"
    };
});
