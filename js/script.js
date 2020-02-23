app.controller("todoCtrl", function() {
  let vm = this;

  // recipies array & inputs
  vm.recipies = [];
  vm.newRecipe = null;
  vm.newDescription = null;
  vm.id = 1;

  // adding recipe function
  vm.btnAdd = function() {
    vm.recipies.push({
      recipe: vm.newRecipe,
      description: vm.newDescription,
      date: vm.today,
      id: vm.id++
    });
    $("#exampleModalCenter").modal("hide");
    vm.stringifyItem = angular.toJson(vm.recipies);
    vm.addToLocal = localStorage.setItem("recipies", vm.stringifyItem);
    vm.newRecipe = "";
    vm.newDescription = "";
  };

  //sort by date function
  vm.propertyName = "date";
  vm.reverse = false;
  vm.sortBy = function(propertyName) {
    vm.reverse = vm.propertyName === propertyName ? !vm.reverse : true;
    vm.propertyName = propertyName;
  };


    //current date/time 
    vm.today = new Date();
    let dd = String(vm.today.getDate()).padStart(2, "0");
    let mm = String(vm.today.getMonth() + 1).padStart(2, "0");
    let yyyy = vm.today.getFullYear();
    let hh = String(vm.today.getHours()).padStart(2, "0");
    let min = String(vm.today.getMinutes()).padStart(2, "0");
    vm.today = mm + "-" + dd + "-" + yyyy + " " + hh + ":" + min;
    setInterval(vm.today, 1000);

  // checking if localStorage is not empty
    if (localStorage.getItem("recipies") || localStorage.getItem("previous_recipies")) {
      vm.str = localStorage.getItem("recipies");
      vm.recipies = JSON.parse(vm.str);
      vm.str2 = localStorage.getItem("previous_recipies");
      vm.prevVersions = JSON.parse(vm.str2);
    }
  
  
  //button remove todo
  vm.removeItem = function(id) {
    let index = vm.recipies.findIndex(item => item.id == id);
    vm.recipies.splice(index, 1);
    localStorage.clear();
    if (vm.recipies.length != localStorage.length) {
      vm.stringifyItem = angular.toJson(vm.recipies);
      vm.addToLocal = localStorage.setItem("recipies", vm.stringifyItem);
      vm.stringyfyPrevItems = angular.toJson(vm.prevVersions);
      vm.addToLocal = localStorage.setItem("previous_recipies", vm.stringyfyPrevItems);
    }
    else{
      vm.stringifyItem = angular.toJson(vm.recipies);
      vm.addToLocal = localStorage.setItem("recipies", vm.stringifyItem);
      vm.stringyfyPrevItems = angular.toJson(vm.prevVersions);
      vm.addToLocal = localStorage.setItem("previous_recipies", vm.stringyfyPrevItems);
    }
  };

  //previous resipies versions array/inputs
  vm.prevVersions = [];
  vm.prevRecipeName = null;
  vm.prevDescr = null;

  // button edit recipe
  vm.btnEdit = function(edit) {
    vm.editTodoText = edit.recipe;
    vm.editRecipeDescription = edit.description;
    vm.prevRecipeName = edit.recipe;
    vm.prevDescr = edit.description;
    localStorage.clear();
    vm.saveTodo = function() {
      if (edit.recipe != vm.editTodoText || edit.description != vm.editRecipeDescription) {
        vm.prevVersions.push({
          prevRecipeName: vm.prevRecipeName,
          prevDescription: vm.prevDescr
        });

        edit.description = vm.editRecipeDescription;
        edit.todo = vm.editTodoText;
        vm.editTodoText = "";
        vm.prevRecipeName = "";
        vm.prevDescr = "";
        vm.stringifyItem = angular.toJson(vm.recipies);
        vm.addToLocal = localStorage.setItem("recipies", vm.stringifyItem);
        vm.stringyfyPrevItems = angular.toJson(vm.prevVersions);
        vm.addToLocal = localStorage.setItem("previous_recipies", vm.stringyfyPrevItems);
      } else {
        vm.stringifyItem = angular.toJson(vm.recipies);
        vm.addToLocal = localStorage.setItem("recipies", vm.stringifyItem);
        vm.stringyfyPrevItems = angular.toJson(vm.prevVersions);
        vm.addToLocal = localStorage.setItem("previous_recipies", vm.stringyfyPrevItems);
      }
    };
  };

  //jQuery section
  $(function() {
    $("#editModal").blur(function() {
      vm.stringifyItem = angular.toJson(vm.recipies);
      vm.addToLocal = localStorage.setItem("recipies", vm.stringifyItem);
    });
    $(".fade").click(function() {
      $(this).modal("show");
    });
    $(".todoOpen").click(function() {
      $("#table").fadeIn(600);
      $("#btnAdd").fadeIn(600);
      $(".triangle").fadeIn(600);
    });
  });
});
