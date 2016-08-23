'use strict';

/**
 * @ngdoc function
 * @name calcCApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the calcCApp
 */
angular.module('calcCApp').controller('MainCtrl', function ($scope) {
    
    var opQUEUE = [],//queue with the numbers to make the calculus 
        operators = /x|÷|-|\+/,//regex with operators
        operation = '',//current operetion pressed
        nNum = false;//flag to start writing the second number in calculus 

    //model to calc display
    $scope.displayShow = '';
    //model to AC or C button
    $scope.ac = 'AC';

    //main controll to numbers and operatos click in the calculator
    $scope.numsAndOpsclicks = function(func) {
        //used to don't put another point in 
        if(func ==='.' && (/\.+/.test($scope.displayShow)))
        {
            return;
        }
        //when the operators are pressed
        if(func.search(operators) === 0){
            opQUEUE.push(parseFloat($scope.displayShow));
            operation = func;
//            console.log(opQUEUE);
            if(opQUEUE.length > 1) {
                operations(operation);
            }
            nNum = true;
        } else { //when the numbers are pressed
            if(nNum){//checking if it is the number after press operator
                nNum = false;
                $scope.displayShow = '';
            }
            $scope.displayShow += func;
            $scope.ac = 'C';
        }
    };
    
    // here it will clear the display and queue
    $scope.acClick = function(){
        $scope.displayShow = '';
        operation = '';
        if( opQUEUE.length === 1 ){
            opQUEUE.pop();
        }
        $scope.ac = 'AC';
    };
    
    //invert negative or positive number shown in Display 
    $scope.sosoClick = function(){
        $scope.displayShow = parseFloat($scope.displayShow) * -1;   
    };
    
    //get the percent of the showed number or queued number 
    $scope.percentClick = function(){
        if(opQUEUE.length === 1) {
          $scope.displayShow = (parseFloat(opQUEUE[0])*parseFloat($scope.displayShow))/100;   
        }
        else {
            $scope.displayShow = parseFloat($scope.displayShow)/100; 
        }  
    };
    
    //give the result of the operation 
    $scope.equalClick = function(){
        if(opQUEUE.length === 0)
        {
            return;
        }
        opQUEUE.push(parseFloat($scope.displayShow));
        operations(operation);
        opQUEUE.pop();
        nNum = true;        
    };
    
    
    //make the calculus of the operations
    function operations(func){
        switch(func){
            case '+':
                opQUEUE[0] = parseFloat(opQUEUE[0])+parseFloat(opQUEUE[1]);
                break;            
            case '-':
                opQUEUE[0] = parseFloat(opQUEUE[0])-parseFloat(opQUEUE[1]);
                break;            
            case 'x':
                opQUEUE[0] = parseFloat(opQUEUE[0])*parseFloat(opQUEUE[1]);
                break;            
            case '÷':
                opQUEUE[0] = parseFloat(opQUEUE[0])/parseFloat(opQUEUE[1]);
                break;
        }
        
        if(opQUEUE.length > 1) {
            opQUEUE.pop();
        }
        $scope.displayShow = opQUEUE[0];
//        console.log(opQUEUE);
    }
});

