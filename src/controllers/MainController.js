app.controller("MainController", [
    "$scope",
    function($scope) {
        $scope.factor = [
            { name: "eat", description: "Long time without eating" },
            { name: "sleep", description: "Not enough sleep last night" },
            { name: "meds", description: "Meds taken late / forgotten" },
            { name: "stress", description: "Under stress" },
            { name: "period", description: "Period time" },
            { name: "tired", description: "I was tired" }
        ];
        $scope.crisis = [
            { name: "unconscious", type: "Fall down (unconscious)" },
            { name: "sitting", type: "Body doesn't answer (sitting)" },
            { name: "standing", type: "Body doesn't answer (not-stable)" },
            { name: "fall", type: "Body doesn't answer (fell down)" }
        ];
    }
]);
