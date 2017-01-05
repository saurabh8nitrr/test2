define([ '../module' ], function(refdataControllerModule) {

	refdataControllerModule.controller('refdataEntityController',[
	                                                              '$scope',
	                                                              'refdataService',
	                                                              'uiGridConstants',
	                                                              '$timeout',
	                                                              '$rootScope',
	                                                              '$filter',
	                                                              function($scope, service, uiGridConstants,
	                                                            		  $timeout, $rootScope, $filter) {


	                                                            	  console.log('controller is invoked');
	                                                            	  var searchFieldName = '';
	                                                            	  var message = '';
	                                                            	  $scope.showErrorMessage = false;
	                                                            	  $scope.showAuditData = false;
	                                                            	  $scope.showMessage = false;
	                                                            	  $scope.showErrorMessageUpdate = false;
	                                                            	  $scope.checkboxDisabled = true;
	                                                            	  $scope.newMessage = false;
	                                                            	  $scope.errorDir=
	                                                            	  {
	                                                            			  handleMsg:null,
	                                                            			  errorType:null
	                                                            	  };
	                                                            	  var dateFormat = 'yyyy-MM-dd';
	                                                            	  $scope.rbs = false;
	                                                            	  $scope.rbsValue = {};
	                                                            	  $scope.lockRbsValue = true;
	                                                            	  $scope.nonEditable = false;
	                                                            	  $scope.rbsThresholdForm = {};
	                                                            	  $scope.newData = false;
	                                                            	  var newSaveData = "";
	                                                            	  $scope.closeIcon = false;
	                                                            	  $scope.enableSearch = false;
	                                                            	  $scope.showSearch = false;
	                                                            	  $scope.uploadError = false;
	                                                            	  /***********************export functionality***********************************/

	                                                            	  $scope.export = function(){
	                                                            		  var myElement = angular.element(document.querySelectorAll(".custom-csv-link-location"));
	                                                            		  $scope.gridApi.exporter.csvExport('all','all');

	                                                            	  };
	                                                            	  $scope.closepop = function () {
	                                                            		  // $scope.uploadSuccess = false;
	                                                            		  $scope.uploadError = false;
	                                                            		  $scope.isOpen = false;  
	                                                            		  element.removeClass('trigger');
	                                                            	  };
	                                                            	  /******************************************************************************/

//	                                                            	  rootscope watch for logged in user
//	                                                            	  name change. As it's not available at
//	                                                            	  the time of startup.
	                                                            	  $rootScope.$watch('userDetail',function(value) {
	                                                            		  if (value) {
	                                                            			  $scope.username = value.userCd;
	                                                            		  }
	                                                            	  });
	                                                            	  window.myFunction=function() {
	                                                            		  document.getElementById("myDIV").style.visibility = "visible";
	                                                            		  document.getElementById("choose").style.visibility = "hidden";
	                                                            		  document.getElementById("popfileName").style.visibility = "hidden";
	                                                            		  var fullPath = document.getElementById('popfileName').value;
	                                                            		  if (fullPath) {
	                                                            			  var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
	                                                            			  $scope.filename = fullPath.substring(startIndex);
	                                                            			  if ($scope.filename.indexOf('\\') === 0 || $scope.filename.indexOf('/') === 0) {

	                                                            				  $scope.filename = $scope.filename.substring(1);
	                                                            			  }

	                                                            		  }
	                                                            	  };
	                                                            	  $scope.change=function() {
	                                                            		  $scope.uploadError = false;
	                                                            		  document.getElementById("myDIV").style.visibility = "hidden";
	                                                            		  document.getElementById("choose").style.visibility = "visible";
	                                                            		  document.getElementById("popfileName").style.visibility = "visible";
	                                                            	  };
	                                                            	  $scope.hide=function() {
	                                                            		  document.getElementById("uploadfile.html").style.visibility = "hidden";
	                                                            	  };
	                                                            	  /*-----------------------------------------fetchsheet------------------------*/
	                                                            	  $scope.fetchSheet=function() {

	                                                            		  service.getSheet($scope.selectedEntity.entityRef);


	                                                            	  };
//	                                                            	  **********************upload file********************
	                                                            	  $scope.file = undefined;
	                                                            	  $scope.templateUrl = "uploadfile.html";
	                                                            	  $scope.upload = function(file) {
	                                                            		  var fileDoc = {file : $scope.file};
	                                                            		  if(fileDoc.file.name.indexOf('.csv') > -1){
	                                                            			  service.uploadfile(fileDoc.file).then(function(response) {
	                                                            				  console.log("success");
	                                                            				  $scope.uploadError = true;
	                                                            				  $rootScope.$broadcast('file uploaded');
	                                                            				  /*$scope.alerts={type: 'success', message:'file uploaded' };*/
	                                                            				  $scope.errorDir.handleMsg="File Uploaded";
	                                                            				  $scope.errorDir.typeError=false;
	                                                            				  refreshDataList();
	                                                            				  $scope.closepop();
	                                                            				  /*if(response==null)
{
console.log("error");
$scope.uploadError = true;
$scope.alerts={type: 'error', message:'Oops Error while Uploading' };
document.getElementById("uploadResult").style.color = "#A94442";
}
else
{
console.log("success");
$scope.uploadError = true;
$rootScope.$broadcast('file uploaded');
document.getElementById("uploadResult").style.color = "#5cb586";
$scope.alerts={type: 'success', message:'File uploaded' };
$scope.closepop();
refreshDataList();
}*/
	                                                            			  },function(error) {
	                                                            				  console.log("error");
	                                                            				  $scope.uploadError = true;
	                                                            				  /*$scope.alerts={type: 'error', message:error.data.message };*/
	                                                            				  $scope.errorDir.handleMsg=error.data.message;
	                                                            				  $scope.errorDir.typeError=true;
	                                                            				  $rootScope.$broadcast('file uploaded');
	                                                            			  });
	                                                            		  }
	                                                            		  else {
	                                                            			  $scope.uploadError = true;
	                                                            			  $scope.alerts={type: 'error', message: 'Only .csv file can be uploaded.' };
	                                                            		  }
	                                                            	  };
	                                                            	  refdataControllerModule.directive('fileModel', ['$parse', function ($parse) {
	                                                            		  return {
	                                                            			  restrict: 'A',
	                                                            			  link: function(scope, element, attrs) {
	                                                            				  var model = $parse(attrs.fileModel);
	                                                            				  var modelSetter = model.assign;

	                                                            				  element.bind('change', function(){
	                                                            					  scope.$apply(function(){
	                                                            						  modelSetter(scope, element[0].files[0]);
	                                                            						  scope.$parent[attrs.fileModel] = element[0].files[0]; 
	                                                            					  });
	                                                            				  });
	                                                            			  }
	                                                            		  };
	                                                            	  }]);
//	                                                            	  ***************end******************
	                                                            	  $scope.exactFlag = true;
	                                                            	  $scope.newRecordFlag = false;
	                                                            	  $scope.metadata = {};
	                                                            	  $scope.currentOperation = 'new';
	                                                            	  $scope.detailView = '_details';
	                                                            	  $scope.entityMapping = [];

	                                                            	  $scope.flag=true;
	                                                            	  $scope.primaryKeyField = undefined;
	                                                            	  $scope.edit = false;  

//	                                                            	  these are the configurations for the many to many relation display value
	                                                            	  $scope.checkboxConfig = {
	                                                            			  activeFlagValue : "A",
	                                                            			  inactiveFlagValue : "D",
	                                                            			  configFieldKey: 'activeFlag'
	                                                            	  }
	                                                            	  $scope.checboxChange = function(relation) {
	                                                            		  console.log(relation);
	                                                            		  relation[$scope.checkboxConfig.configFieldKey] = (relation[$scope.checkboxConfig.configFieldKey].toString() === "true") ?
	                                                            				  $scope.checkboxConfig.activeFlagValue :
	                                                            					  ((relation[$scope.checkboxConfig.configFieldKey] == $scope.checkboxConfig.activeFlagValue) ?  
	                                                            							  $scope.checkboxConfig.inactiveFlagValue : $scope.checkboxConfig.activeFlagValue );
	                                                            		  console.log($scope.relationshipData);
	                                                            		  console.log(relation);
	                                                            	  }
	                                                            	  var rowData = {};
	                                                            	  $scope.gridOptions = {
	                                                            			  enableRowSelection : true,
	                                                            			  enableRowHeaderSelection : false,
	                                                            			  enablePaginationControls: false,
	                                                            			  multiSelect : false,
	                                                            			  enableHorizontalScrollbar : uiGridConstants.scrollbars,
	                                                            			  enableVerticalScrollbar : uiGridConstants.scrollbars,
	                                                            			  noUnselect : true,
	                                                            			  paginationPageSizes: [5,10,15],
	                                                            			  paginationPageSize: 10,
	                                                            			  enableColumnMenus:false,  //to disable second sorting
	                                                            			  /****added for export*****/
	                                                            			  /*enableGridMenu: true,*/

	                                                            			  exporterCsvFilename: $scope.myvar,

	                                                            			  exporterFieldCallback: function (grid, row, col, input)
	                                                            			  {   

	                                                            				  if (col.name == 'modifiedDttm')
	                                                            				  {


	                                                            					  return $filter('date')(input, "yyyy-MM-dd hh:mm:ss");

	                                                            				  } 
	                                                            				  else
	                                                            				  {
	                                                            					  return input;
	                                                            				  }
	                                                            			  },


	                                                            	  }; 
	                                                            	  /************************/

	                                                            	  function replaceKeys(object, oldKey, newKey) {
	                                                            		  return JSON.parse(JSON.stringify(object).replace("\""+oldKey+"\"","\""+newKey+"\""));
	                                                            	  }

	                                                            	  function refreshPage() {
	                                                            		  service.getConfig().then(function(response) {
	                                                            			  $scope.metadata = response.data;
	                                                            			  $scope.parentData = {};
	                                                            			  var s=String($scope.metadata.title);
	                                                            			  $scope.csvname=s.replace("Maintenance","Master");
	                                                            			  $scope.gridOptions.exporterCsvFilename=$scope.csvname+'.csv';
//	                                                            			  code entity based refdata version accommodating for the attribute field.
	                                                            			  $scope.metadata = $scope.metadata.hasOwnProperty('fields') ? 
	                                                            					  $scope.metadata: replaceKeys($scope.metadata, "attributes", "fields");
	                                                            			  var fields = $scope.metadata.fields;
	                                                            			  for (var i = 0; i < fields.length; i++) {
	                                                            				  var columnDef = fields[i];
	                                                            				  if(columnDef.id) {
	                                                            					  $scope.primaryKeyField = columnDef.property; 
	                                                            				  }
	                                                            				  if (columnDef.parentEntity) {
	                                                            					  service.getParentEntityData(columnDef.parentEntity,columnDef.property).then( function(response) {
	                                                            						  $scope.parentData[response.config.fieldName] = response.data;
	                                                            					  });
	                                                            				  }
	                                                            			  }
	                                                            			  refreshDataList();
	                                                            		  });
	                                                            	  }
	                                                            	  function refreshDataList() {
	                                                            		  service.getData().then(function(response) {

	                                                            			  $scope.gridOptions.data = response.data;

	                                                            			  $scope.gridOptions.columnDefs = createColumnDefs($scope.metadata.fields);

	                                                            			  $scope.dropdownSelected = $scope.gridOptions.columnDefs[0];
	                                                            			  changeSearchColumnDropDownTag($scope.gridOptions.columnDefs[0].displayName);
	                                                            			  /*$timeout(function() {
$scope.gridApi.selection.selectRow($scope.gridOptions.data[0]);
}, 250);*/

	                                                            			  searchFieldName = $scope.gridOptions.columnDefs[0].field;
	                                                            		  });
	                                                            	  };

	                                                            	  service.getEntitiesMapping().then(function(response) {
	                                                            		  $scope.entityMapping = response.data;
	                                                            		  $scope.selectedEntity = $scope.entityMapping[0];
	                                                            		  service.selectedEntity = $scope.selectedEntity.entityRef;
	                                                            		  refreshPage();
	                                                            	  });

	                                                            	  $scope.$watch('selectedEntity', function(entity) {
	                                                            		  if (entity) {
	                                                            			  service.selectedEntity = entity.entityRef;
	                                                            			  $scope.cancel();
	                                                            			  refreshPage();
	                                                            			  checkForRbs();
	                                                            			  $scope.searchValue = undefined;
	                                                            			  $scope.dropdownSelected = undefined;
	                                                            			  $scope.exactFlag = false;
	                                                            		  }
	                                                            	  });

	                                                            	  function checkForRbs(){
	                                                            		  if($scope.selectedEntity.title == "RBS Maintenance"){
	                                                            			  console.log("dolly")
	                                                            			  $scope.rbs = true;
	                                                            		  }
	                                                            	  }
	                                                            	  $scope.gridOptions.onRegisterApi = function(gridApi) {
	                                                            		  $scope.gridApi = gridApi;
	                                                            		  $scope.gridApi.selection.on.rowSelectionChanged($scope, function(row) {
	                                                            			  rowData = row.entity;
	                                                            			  rowIsSelected(row.entity);
	                                                            		  });
	                                                            		  $scope.gridApi.grid.registerRowsProcessor($scope.searchFilter,200);
	                                                            	  };
	                                                            	  $scope.searchColumnSelected = function(selectedObject) {
//	                                                            		  changeSearchColumnDropDownTag(aliasName);
	                                                            		  searchFieldName = selectedObject.field;
	                                                            	  };

	                                                            	  $scope.filterGrid = function() {
	                                                            		  $scope.gridApi.grid.refresh();
	                                                            	  };

	                                                            	  function checkIfEmpty(value) {
//	                                                            		  return true if undefined, null,
//	                                                            		  or has no elements
	                                                            		  return (value == undefined
	                                                            				  || value == null || value.length == 0);
	                                                            	  };

//	                                                            	  to acess element of a nested json
	                                                            	  function findProp(obj, prop, defval){
	                                                            		  if (typeof defval == 'undefined') defval = null;
	                                                            		  prop = prop.split('.');
	                                                            		  for (var i = 0; i < prop.length; i++) {
	                                                            			  if(typeof obj[prop[i]] == 'undefined')
	                                                            				  return defval;
	                                                            			  obj = obj[prop[i]];
	                                                            		  }
	                                                            		  return obj;
	                                                            	  }

	                                                            	  $scope.searchFilter = function(renderableRows) {
	                                                            		  if (!checkIfEmpty($scope.dropdownSelected) && !checkIfEmpty($scope.searchValue)) {
	                                                            			  var isFirstRow = false;
	                                                            			  renderableRows.forEach(function(row) {
//	                                                            				  if there is any selected row unselect it.
	                                                            				  row.isSelected = row.isSelected ? false: row.isSelected;
	                                                            				  var match = false;
	                                                            				  if ($scope.exactFlag) {
	                                                            					  row.visible = row.entity[$scope.dropdownSelected.field] == $scope.searchValue;
	                                                            				  } else {
	                                                            					  var searchValue = findProp(row.entity, $scope.dropdownSelected.field);
	                                                            					  if (searchValue != null && searchValue != undefined) {
	                                                            						  var searchString = searchValue.toString();
	                                                            						  if ( (searchString.toUpperCase()).indexOf($scope.searchValue.toUpperCase()) == 0 && $scope.dropdownSelected.type != "number"){
//	                                                            							  this condition specifies that this is first row of the search result.
	                                                            							  row.isSelected = !isFirstRow ? true: false;
	                                                            							  row.visible = true;
//	                                                            							  this make the actual row selection on the basis row.isSelected. 
	                                                            							  if(row.isSelected) rowIsSelected(row.entity);
	                                                            							  isFirstRow = !isFirstRow ? true: isFirstRow;
	                                                            						  } 
	                                                            						  else if (searchValue != null && searchValue != undefined && $scope.dropdownSelected.type == "number") {
	                                                            							  var match = $filter('date')(searchValue, dateFormat) === $filter('date')($scope.searchValue, dateFormat);
	                                                            							  row.visible = match;
	                                                            						  }
	                                                            						  else {
	                                                            							  row.visible = false; 
	                                                            						  }
	                                                            					  }
	                                                            					  else {
	                                                            						  row.visible = false;
	                                                            					  }
	                                                            				  }
	                                                            			  });
	                                                            		  }
	                                                            		  return renderableRows;
	                                                            	  };

	                                                            	  $scope.clearSearchModel = function() {
	                                                            		  $timeout(function() {
	                                                            			  $scope.gridApi.selection.selectRow($scope.gridOptions.data[0]);
	                                                            		  }, 250);
	                                                            		  $scope.searchValue = "";
	                                                            	  };

	                                                            	  $scope.changeExactFlag = function() {
	                                                            		  $scope.exactFlag = !$scope.exactFlag;
	                                                            	  };

	                                                            	  $scope.newRecord = function() {
	                                                            		  checkForRbs();
	                                                            		  emptyMetaValues($scope.metadata.fields);
	                                                            		  $scope.rbsValue = {};
	                                                            		  $scope.currentOperation = 'new';
	                                                            		  $scope.newRecordFlag = true;
	                                                            		  message = angular.element( document.querySelector( '#lblSaveNewMessage' ) );
	                                                            		  message.empty();
	                                                            	  };
	                                                            	  $scope.saveData = function() {
	                                                            		  var saveData = getMetadataValues($scope.metadata.fields);
	                                                            		  if($scope.newData == true){
	                                                            			  saveData.versionNo = newSaveData.versionNo;
	                                                            		  }
	                                                            		  if($scope.selectedEntity.title == "RBS Maintenance"){
	                                                            			  saveData.redThresholdValueNbl = parseInt($scope.rbsValue.redThreshold);
	                                                            			  saveData.amberThresholdValueNbl = parseInt($scope.rbsValue.amberThreshold);
	                                                            			  if(saveData.redThresholdValueNbl != undefined && saveData.amberThresholdValueNbl != undefined){
	                                                            				  if(saveData.redThresholdValueNbl <= saveData.amberThresholdValueNbl){
	                                                            					  $scope.alerts={type: 'error', message:"Amber Threshold should be less than Red Threshold." };
	                                                            					  $scope.showErrorMessage = true;
	                                                            					  return;
	                                                            				  }
	                                                            			  }
	                                                            		  }
	                                                            		  $scope.showErrorMessage = false;
	                                                            		  if ($scope.currentOperation == 'update') {
	                                                            			  if($scope.detailView == '_details'){
	                                                            				  service.updateData(saveData)
	                                                            				  .then(function(response) {
	                                                            					  $scope.newData = true;
	                                                            					  newSaveData = response.data;
	                                                            					  refreshDataList();
	                                                            					  $scope.newRecordFlag = false;
	                                                            					  $scope.edit = false;
	                                                            					  rowData = newSaveData;
	                                                            					  $scope.errorDir.handleMsg="Record saved Successfully.";
	                                                            					  $scope.errorDir.typeError=false;
	                                                            					  $scope.showMessage = true;
	                                                            					  $scope.errorMessage = false;
	                                                            				  },
	                                                            				  function(error) {
	                                                            					  $scope.showMessage = true;
	                                                            					  $scope.errorMessage = true;
	                                                            					  $scope.error = error.data.message;
	                                                            					  $scope.alerts={type: 'error', message:$scope.error};
	                                                            				  });
	                                                            			  }
	                                                            			  else if($scope.detailView != '_details')
	                                                            			  {
	                                                            				  /*for(var i=0; i<$scope.relationshipData.length; i++){
$scope.relationshipData[i].versionNo = $scope.relationshipData[i].versionNo + 1;
$scope.relationshipData[i].modifiedBy = $scope.username;
$scope.relationshipData[i].modifiedDttm = new Date();
}*/
	                                                            				  service.saveRelationshipData($scope.metadata, $scope.metadata.key, $scope.relationMapping.alias,$scope.relationshipData).success(function() {
	                                                            					  /*
$scope.alerts={type: 'success', message:"Record Saved Successfully." };*/
	                                                            					  $scope.errorDir.handleMsg="Record Saved Successfully.";
	                                                            					  $scope.errorDir.typeError=false;
	                                                            					  $scope.showMessage = true;
	                                                            					  $scope.errorMessage = false;
	                                                            					  $scope.checkboxDisabled = true;
	                                                            				  }).error(function(error) {
//	                                                            					  $scope.setError(error);
	                                                            					  $scope.showMessage = false;
	                                                            					  $scope.errorMessage = true;
	                                                            					  /*$scope.error = error.data.message;
$scope.alerts={type: 'error', message:$scope.error};*/
	                                                            					  $scope.errorDir.handleMsg=error.data.message;
	                                                            					  $scope.errorDir.typeError=true;
	                                                            				  });
	                                                            			  }
	                                                            		  } else if ($scope.currentOperation = 'new') {
	                                                            			  saveData.versionNo = 1;
	                                                            			  service.saveData(saveData)
	                                                            			  .then(function(response) {
	                                                            				  refreshDataList();
	                                                            				  $scope.newMessage = true;
	                                                            				  $scope.showMessage = true;
	                                                            				  /*$scope.alerts={type: 'success', message:"Record Saved Successfully." };*/
	                                                            				  $scope.errorDir.handleMsg="Record Saved Successfully.";
	                                                            				  $scope.errorDir.typeError=false;
	                                                            				  $scope.errorMessage = false;
	                                                            			  },
	                                                            			  function(error) {
	                                                            				  /******************************* experiment for exception handling messages start *********************************/
	                                                            				  $scope.errorMessage = true;
	                                                            				  $scope.showMessage = true;
//	                                                            				  $scope.error = error.data.message;  //here msg is too big.
	                                                            				  /*
$scope.error = error.data.code;
$scope.alerts={type: 'error', message:$scope.error};*/
	                                                            				  $scope.errorDir.handleMsg=error.data.message;
	                                                            				  $scope.errorDir.typeError=true;
	                                                            				  /******************************* experiment for exception handling messages start *********************************/
	                                                            			  });
	                                                            		  }
	                                                            		  $scope.show = true;
	                                                            		  $timeout(function() {
	                                                            			  $scope.show = false;
	                                                            		  }, 3000);
	                                                            	  };
	                                                            	  $scope.cancel = function() {
	                                                            		  $scope.newRecordFlag = false;

	                                                            		  $scope.relationMapping = undefined;
	                                                            		  $scope.edit = false;
	                                                            		  $scope.showErrorMessageUpdate = false;
	                                                            		  $scope.showErrorMessage = false;
	                                                            		  if($scope.detailView != "_details" && $scope.closeIcon == false) {
	                                                            			  $scope.viewRelation($scope.detailView);
	                                                            			  angular.element(document.getElementById('tab2')).addClass('active');
	                                                            			  angular.element(document.getElementById('tab2Content')).addClass('active'); 
	                                                            			  angular.element(document.getElementById('tab1')).removeClass('active');
	                                                            			  angular.element(document.getElementById('tab1Content')).removeClass('active');
	                                                            		  }
	                                                            		  else if($scope.detailView == "_details" && $scope.closeIcon == false){
	                                                            			  rowIsSelected(rowData);
	                                                            			  angular.element(document.getElementById('tab1')).addClass('active');
	                                                            			  angular.element(document.getElementById('tab1Content')).addClass('active'); 
	                                                            			  angular.element(document.getElementById('tab2')).removeClass('active');
	                                                            			  angular.element(document.getElementById('tab2Content')).removeClass('active');
	                                                            		  }
	                                                            		  /*angular.element(document.getElementById('tab1')).addClass('active');
angular.element(document.getElementById('tab1Content')).addClass('active'); 
angular.element(document.getElementById('tab2')).removeClass('active');
angular.element(document.getElementById('tab2Content')).removeClass('active');*/
	                                                            		  message = angular.element( document.querySelector( '#lblSaveMessage' ) );
	                                                            		  message.empty();
	                                                            		  $scope.newMessage = false;
	                                                            		  $scope.showErrorMessage = false;
	                                                            		  $scope.showMessage = false;
	                                                            		  $scope.errorMessage = false;
	                                                            		  $scope.checkboxDisabled = true;
	                                                            		  $scope.showSearch = false;
	                                                            		  $scope.searchValue = undefined;
	                                                            		  if($scope.closeIcon == true){
	                                                            			  $scope.newData = false;
	                                                            			  $scope.detailView = "_details";
	                                                            			  angular.element(document.getElementById('tab1')).addClass('active');
	                                                            			  angular.element(document.getElementById('tab1Content')).addClass('active'); 
	                                                            			  angular.element(document.getElementById('tab2')).removeClass('active');
	                                                            			  angular.element(document.getElementById('tab2Content')).removeClass('active');
	                                                            		  }
	                                                            		  if($scope.selectedEntity.title != "RBS Maintenance"){
	                                                            			  $scope.rbs = false;
	                                                            		  }
	                                                            		  else{
	                                                            			  if(this.rbsThresholdForm.$pristine != undefined){
	                                                            				  this.rbsThresholdForm.$setPristine();
	                                                            				  this.rbsThresholdForm.$setUntouched();
	                                                            			  }
	                                                            		  }
	                                                            		  if($scope.selectedEntity.title != "Sub Area Maintenance"){
	                                                            			  $scope.enableSearch = false;
	                                                            		  }
	                                                            	  };
	                                                            	  $scope.clear = function(){
	                                                            		  $scope.newRecordFlag = true;
	                                                            		  $scope.showErrorMessage = false;
	                                                            		  $scope.showMessage = false;
	                                                            		  if($scope.newMessage == false){
	                                                            			  for(var i=0; i<$scope.metadata.fields.length; i++){
	                                                            				  $scope.metadata.fields[i].value = "";
	                                                            			  }
	                                                            		  }
	                                                            		  $scope.rbsValue = {};
	                                                            		  message = angular.element( document.querySelector( '#lblSaveNewMessage' ) );
	                                                            		  message.empty();
	                                                            	  }
	                                                            	  $scope.setOperation = function(){
	                                                            		  $scope.currentOperation = 'update';
	                                                            		  checkForRbs();
	                                                            		  $scope.nonEditable = true;
	                                                            		  $scope.showMessage = false;
	                                                            		  $scope.closeIcon = false;
	                                                            	  }
	                                                            	  $scope.updateRecord = function(){
	                                                            		  if($scope.detailView == '_details'){
	                                                            			  $scope.edit=true;
	                                                            		  }
	                                                            		  else{
	                                                            			  $scope.nonEditable = true;
	                                                            			  $scope.checkboxDisabled = false;
	                                                            		  } 
	                                                            		  $scope.showMessage = false;
	                                                            	  }
	                                                            	  function getMetadataValues(metadata) {
	                                                            		  var json = {};

	                                                            		  for (var i = 0; i < metadata.length; i++) {
	                                                            			  var columnDef = metadata[i];
	                                                            			  var value = checkIfEmpty(columnDef.parentEntity) ? columnDef.value : 
	                                                            				  ({}.constructor === columnDef.value.constructor ? columnDef.value : JSON.parse(columnDef.value));
	                                                            			  json[columnDef.property] = value; 
	                                                            		  }

	                                                            		  return json;
	                                                            	  };

	                                                            	  function rowIsSelected(selectedRow) {
	                                                            		  var originalRow = angular.copy(selectedRow);

	                                                            		  if (Object.keys(originalRow).length !== 0) {

	                                                            			  $scope.detailView = '_details';

	                                                            			  var metaobj = $scope.metadata.fields;
	                                                            			  for (var i = 0; i < Object
	                                                            			  .keys(originalRow).length; i++) {
//	                                                            				  below line look for child object to populate the respective entity field in the value variable rather then 
//	                                                            				  fetching parent property
	                                                            				  var key = Object.keys(originalRow)[i];
	                                                            				  var value = originalRow[key];

	                                                            				  for (var j = 0; j < metaobj.length; j++) {
	                                                            					  var columnMeta = metaobj[j];
	                                                            					  if (columnMeta.property == key) {
	                                                            						  metaobj[j]['value'] = value;
	                                                            					  }
	                                                            					  if (metaobj[j]['value'] != null
	                                                            							  && metaobj[j]['value'] != undefined
	                                                            							  && columnMeta.widgetType != null) {
	                                                            						  if (columnMeta.widgetType.toUpperCase() == 'DATE') {
	                                                            							  metaobj[j].value = new Date(metaobj[j].value);
	                                                            						  }
	                                                            					  }
	                                                            				  }
	                                                            			  }
	                                                            			  for (var j = 0; j < metaobj.length; j++) {
	                                                            				  if (metaobj[j].id) {
	                                                            					  $scope.metadata.key = metaobj[j].value;
	                                                            				  }
	                                                            			  }
	                                                            		  }
	                                                            		  if($scope.selectedEntity.title == "RBS Maintenance"){
	                                                            			  $scope.rbsValue.redThreshold = selectedRow.redThresholdValueNbl;
	                                                            			  $scope.rbsValue.amberThreshold = selectedRow.amberThresholdValueNbl;
	                                                            		  }
	                                                            	  };
	                                                            	  function emptyMetaValues(metaobj) {
	                                                            		  for (var j = 0; j < metaobj.length; j++) {
	                                                            			  var columnMeta = metaobj[j];

	                                                            			  metaobj[j]['value'] = "";

	                                                            			  if (metaobj[j].defaultValue != null
	                                                            					  && metaobj[j].defaultValue != undefined
	                                                            					  && metaobj[j].defaultValue != "") {
	                                                            				  metaobj[j]['value'] = metaobj[j].defaultValue;
	                                                            			  }

	                                                            		  }
	                                                            	  };

	                                                            	  function changeSearchColumnDropDownTag(
	                                                            			  value) {
	                                                            		  $scope.searchDropDownValue = "Search by "
	                                                            			  + value;
	                                                            	  };
	                                                            	  function createColumnDefs(colArr) {
	                                                            		  function convertToFunc(metaFunc) {
//	                                                            			  check whether the passed parameter is function or not, else return the same value
	                                                            			  if (metaFunc && (typeof metaFunc === 'string') && metaFunc.indexOf("function") === 0) {
	                                                            				  // we can only pass a function as string in JSON ==> doing a real function
	                                                            				  metaFunc = metaFunc.replace(/'}'/g,'}').replace(/'{'/g,'{');
	                                                            				  var jsFunc = new Function('return ' + metaFunc);
	                                                            				  return jsFunc;
	                                                            			  }
	                                                            			  return metaFunc;
	                                                            		  };
	                                                            		  function isFunction(functionToCheck) {
	                                                            			  var getType = {};
	                                                            			  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
	                                                            		  }
	                                                            		  var columndefs = [];
	                                                            		  for (var i = 0; i < colArr.length; i++) {
	                                                            			  if (colArr[i].gridColumn != undefined
	                                                            					  && colArr[i].gridColumn == true) {
	                                                            				  var json = {};
//	                                                            				  this code here is to take into account the changing of the Many to One key field value
	                                                            				  var fieldTxt = checkIfEmpty(colArr[i].parentEntity) ? colArr[i].property : 
	                                                            					  colArr[i].property + "." + colArr[i].parentDesc ;   
	                                                            				  json.field = fieldTxt;
	                                                            				  json.displayName = (colArr[i].title != undefined && colArr[i].title.length > 0) ? colArr[i].title
	                                                            						  : colArr[i].property;
	                                                            				  if (colArr[i].dataType && colArr[i].dataType.toUpperCase() == 'DATE') {
	                                                            					  json.cellFilter = 'date:"yyyy-MM-dd hh:mm:ss"';
	                                                            				  }
	                                                            				  json.enableHiding = false,
	                                                            				  columndefs
	                                                            				  .push(json);
	                                                            				  json.enableFiltering = true;
	                                                            				  if(colArr[i].customGridOptions != undefined){
	                                                            					  Object.keys(colArr[i].customGridOptions).forEach(function (key) {
	                                                            						  var val = colArr[i].customGridOptions[key];
	                                                            						  val = convertToFunc(val);
	                                                            						  json[key] = isFunction(val) ? val() : val;
	                                                            					  });
	                                                            				  }
	                                                            				  json.width = '20%';
	                                                            				  if(colArr[i].property == 'parameterDescriptionTxt'){
	                                                            					  json.width = '50%';
	                                                            				  }
	                                                            				  else if(colArr[i].property == 'commentsTxt'  || colArr[i].property.match('Description')){
	                                                            					  json.width = '30%';
	                                                            				  }
	                                                            				  else if(colArr[i].property == 'modifiedDttm' || colArr[i].property == 'amberThresholdValueNbl' || 
	                                                            						  colArr[i].property == 'redThresholdValueNbl' || colArr[i].property == 'historyId'){
	                                                            					  json.width = '18%';
	                                                            				  }
	                                                            				  else if(colArr[i].property == 'modifiedBy'){
	                                                            					  json.width = '15%';
	                                                            				  }
	                                                            				  else if(colArr[i].property == 'activeFlag'){
	                                                            					  json.width = '12%';
	                                                            				  }
	                                                            				  if($scope.metadataHistory != undefined){
	                                                            					  if(colArr[i].property == 'modifiedDttm' || colArr[i].property == 'amberThresholdValueNbl' || colArr[i].property == 'modifiedBy'){
	                                                            						  json.width = '25%';
	                                                            					  }
	                                                            				  }
	                                                            			  }
	                                                            		  }
	                                                            		  return columndefs;
	                                                            	  };

	                                                            	  var isDate = function(date) {
	                                                            		  return (new Date(date) !== "Invalid Date" && !isNaN(new Date(
	                                                            				  date))) ? true : false;
	                                                            	  };

	                                                            	  if ($('#toggle-one').bootstrapToggle) {
	                                                            		  $('#toggle-one').bootstrapToggle()
	                                                            	  };

	                                                            	  $scope.viewRelation = function(alias) {
	                                                            		  if(alias == "parameter"){
	                                                            			  $scope.enableSearch = true;
	                                                            		  }
	                                                            		  $scope.detailView = alias;
	                                                            		  $scope.showMessage = false;
	                                                            		  $scope.nonEditable = false;
	                                                            		  for (var i = 0; i < $scope.metadata.relationships.length; i++) {
	                                                            			  if ($scope.metadata.relationships[i].alias == alias) {
	                                                            				  $scope.relationMapping = $scope.metadata.relationships[i];
	                                                            			  }
	                                                            		  }
	                                                            		  service.getRelationshipData($scope.metadata, $scope.metadata.key, alias).then(function(response) {
	                                                            			  $scope.relationshipData = response.data;
	                                                            			  $scope.detailView = alias;
	                                                            		  });
	                                                            	  };
	                                                            	  $scope.searchParameter = function(searchValue){
	                                                            		  $scope.searchResult= [];

	                                                            		  $scope.searchValue=searchValue;

	                                                            		  $scope.searchValue = $scope.searchValue.toLowerCase();


	                                                            		  for(var i=0; i<$scope.relationshipData.length ;i++){

	                                                            			  if($scope.relationshipData[i].parameter.parameterDescriptionTxt.toLowerCase().indexOf($scope.searchValue) >= 0 ){

	                                                            				  $scope.searchResult.push($scope.relationshipData[i]);

	                                                            			  }

	                                                            		  }


	                                                            		  if($scope.searchResult){

	                                                            			  $scope.showSearch = true;

	                                                            		  }

	                                                            		  return $scope.searchResult;
	                                                            	  }
	                                                            	  $scope.showDialog = function(id) {
	                                                            		  $('#'+id).modal({backdrop: 'static', keyboard: false});
	                                                            	  };
	                                                            	  $scope.hideDialog = function(id) {
	                                                            		  $('#'+id).modal("hide");

	                                                            	  };

	                                                            	  /**************************show audit start *****************************/
	                                                            	  var params = {};
	                                                            	  $scope.entity = "";

	                                                            	  $scope.gridOptionsAuditHistory = {
	                                                            			  enableRowSelection : false,
	                                                            			  enableRowHeaderSelection : false,
	                                                            			  enablePaginationControls: false,
	                                                            			  multiSelect : false,
	                                                            			  enableHorizontalScrollbar : uiGridConstants.scrollbars,
	                                                            			  enableVerticalScrollbar : uiGridConstants.scrollbars,
	                                                            			  paginationPageSize: 10,
	                                                            			  noUnselect : true,
	                                                            			  enableColumnMenus:false  //to disable second sorting
	                                                            	  };
	                                                            	  $scope.gridOptionsAuditHistory.onRegisterApi = function(gridApiHistory) {
	                                                            		  $scope.gridApiHistory = gridApiHistory;
	                                                            		  $scope.gridApiHistory.selection.on.rowSelectionChanged($scope, function(row) {
	                                                            			  rowDataHistory = row.entity;
	                                                            		  });
	                                                            	  };

	                                                            	  $scope.showAudit = function(){
	                                                            		  /*angular.forEach($scope.metadata.fields, function(ele) {

 if(ele.id){

 params[ele.property] = ele.value;

 }

});*/
	                                                            		  service.getConfigHistory().then(function(response) {
	                                                            			  $scope.metadataHistory = response.data;
	                                                            		  });
	                                                            		  for(var i=0; i<=$scope.metadata.fields.length; i++){
	                                                            			  if($scope.metadata.fields[i].id == true){
	                                                            				  if($scope.metadata.fields[i].value == undefined){
	                                                            					  $scope.message = "Please select atleast one row.";
	                                                            					  $scope.showDialog('confirmClose');
	                                                            					  break;
	                                                            				  }
	                                                            				  else{
	                                                            					  params[$scope.metadata.fields[i].property] = $scope.metadata.fields[i].value;
	                                                            					  $scope.showAuditData = true;
	                                                            					  $scope.showDialog('showAuditModal');
	                                                            					  service.getDataWithParams($scope.entity , params).then(function (response) {
	                                                            						  $scope.gridOptionsAuditHistory = {};
	                                                            						  $scope.gridOptionsAuditHistory.data = response.data;
	                                                            						  $scope.gridOptionsAuditHistory.paginationPageSize = 10;
	                                                            						  $scope.gridOptionsAuditHistory.columnDefs = createColumnDefs($scope.metadataHistory.attributes);
	                                                            						  params = {};
	                                                            					  })
	                                                            					  break;
	                                                            				  }
	                                                            			  }
	                                                            		  }
	                                                            	  };
	                                                            	  $scope.evaluateCellColor = function(grid, row, col, rowRenderIndex, colRenderIndex) {
	                                                            		  var currentValue = grid.getCellValue(row,col);
	                                                            		  var currentValueKey = row.entity.$$hashKey;
	                                                            		  var hasPreviousValue = true;

	                                                            		  function deepEquals(x, y) {
	                                                            			  if ( x === y ) return true;
	                                                            			  if ( ! ( x instanceof Object ) || ! ( y instanceof Object ) ) return false;
	                                                            			  if ( x.constructor !== y.constructor ) return false;
	                                                            			  for ( var p in x ) {
	                                                            				  if ( ! x.hasOwnProperty( p ) ) continue;
	                                                            				  if ( ! y.hasOwnProperty( p ) ) return false;
	                                                            				  if ( x[ p ] === y[ p ] ) continue;
	                                                            				  if ( typeof( x[ p ] ) !== "object" ) return false;
	                                                            				  if ( ! deepEquals( x[ p ],  y[ p ] ) ) return false;
	                                                            			  }
	                                                            			  for ( p in y ) {
	                                                            				  if ( y.hasOwnProperty( p ) && ! x.hasOwnProperty( p ) ) return false;
	                                                            			  }
	                                                            			  return true;
	                                                            		  }

	                                                            		  var gridLength = grid.appScope.gridOptionsAuditHistory.data.length;
	                                                            		  for(var i=0; i<gridLength; i++){
	                                                            			  var gridRowKey = grid.appScope.gridOptionsAuditHistory.data[i].$$hashKey;
	                                                            			  if(currentValueKey == gridRowKey){
	                                                            				  currentValueIndex = i;
	                                                            				  break;
	                                                            			  }
	                                                            		  }

	                                                            		  if(hasPreviousValue && currentValue != null && currentValue != undefined && currentValueIndex != 0) {
	                                                            			  var previousRow = grid.rowHashMap['object:'+grid.appScope.gridOptionsAuditHistory.data[currentValueIndex-1].$$hashKey]; 
	                                                            			  var previousValue = grid.getCellValue(previousRow, col);
	                                                            			  if(currentValue != previousValue) {
	                                                            				  return 'yellow';
	                                                            			  }
	                                                            		  }
	                                                            	  };  
	                                                            	  /************************** show audit end *****************************/


//	                                                            	  code to solve ui-grid scroll disable problem.
	                                                            	  $timeout(function() {
	                                                            		  var $viewport = angular.element(document.querySelector('.ui-grid-render-container'));
	                                                            		  [ 'touchstart', 
	                                                            		    'touchmove',
	                                                            		    'touchend', 
	                                                            		    'keydown',
	                                                            		    'wheel', 
	                                                            		    'mousewheel',
	                                                            		    'DomMouseScroll',
	                                                            		    'MozMousePixelScroll' ].forEach(function(eventName) {
	                                                            		    	$viewport.unbind(eventName);
	                                                            		    });
	                                                            	  });
	                                                              }]);
	refdataControllerModule.directive('checkIfExists', function() {
		return {
			require : 'ngModel',
			scope: true,
			link : function(scope, element, attrs, ngModel) {
				if(scope.primaryKeyField == scope.metaobj.property && scope.currentOperation != 'update') {
					scope.$watch('metaobj.value', function (newvalue, oldvalue) {
						var object = jQuery.grep(scope.gridOptions.data, function(obj) {
							if(newvalue != undefined){
								return obj[scope.primaryKeyField].toUpperCase() === newvalue.toUpperCase();
							}
						});
						if(object.length > 0) {
							ngModel.$setValidity('invalidUser', false);
						}
						else {
							ngModel.$setValidity('invalidUser', true);
						}
					});
				}
			}
		};
	});
	refdataControllerModule.directive('popoverClose', function($timeout){
		return{
			scope: {
				excludeClass: '@'
			},
			link: function(scope, element, attrs) {

				var trigger = document.getElementsByClassName('trigger');


				function closeTrigger(i) {

					$timeout(function(){

						angular.element(trigger[0]).triggerHandler('click');

						element.removeClass('trigger');

					});

				}


				element.on('click', function(event) {

					var etarget = angular.element(event.target);

					var tlength = trigger.length;

					if(!etarget.hasClass('trigger') && !etarget.hasClass(scope.excludeClass)) {

						for(var i=0; i<tlength; i++) {

							closeTrigger(i)

						}

					}

				});

			}
		};
	});
	refdataControllerModule.directive('popoverElem', function(){
		return{
			link: function(scope, element, attrs) {

				element.on('click', function(){

					element.hasClass('trigger')? element.removeClass('trigger'): element.addClass('trigger'); 

				});
			}
		}
	});
	refdataControllerModule.directive('filterByType', function() {
		return {
			require : 'ngModel',
			link : function(scope, element, attrs, ngModel) {

				ngModel.$parsers.push(function(value) {
					return '' + value;
				});

				ngModel.$formatters.push(function(value) {

					if (attrs.type.toLowerCase() == 'date') {
						return new Date(value);
					} else if (attrs.type == 'text'
						|| attrs.type == 'email') {
						return '' + value;
					} else if (attrs.type == 'number') {
						return parseFloat(value, 10);
					} else {
						return '' + value;
					}
				});
			}
		};
	});
	refdataControllerModule.filter('filterMetaValue',['$filter',function($filter) {
		return function(metaDataObject) {
			var objectValue = metaDataObject.value;
			function checkForChildObject(metaObj) {
//				return true is parent entity exists and has object value.
//				this check whether the parent object is available in the json.
				var result = checkIfEmpty(metaObj.parentEntity) ? false : ( metaObj.value ?  {}.constructor === metaObj.value.constructor : false);  
				return result;
			} 
			function fetchChildValue(metaObj) {
				return '' + metaObj.value[metaObj.parentDesc];
			}
			function checkIfEmpty(value) {
//				return true if undefined, null,
//				or has no elements
				return (value == undefined || value == null || value.length == 0);
			};
			objectValue = checkForChildObject(metaDataObject) ? fetchChildValue(metaDataObject) : objectValue;  
			if (metaDataObject.value != undefined) 
			{
				if ((metaDataObject.widgetType + "").toLowerCase() == 'date') {
					return $filter('date')(new Date(objectValue),'MM/dd/yyyy hh:mm:ss');
				} else if ((metaDataObject.widgetType + "").toLowerCase() == 'text' || (metaDataObject.widgetType + "").toLowerCase() == 'email') {
					return '' + objectValue;
				} else if ((metaDataObject.widgetType + "").toLowerCase() == 'number') {
					return parseFloat(objectValue ,10);
				} 
				else {
					return objectValue;
				}
			} else {
//				Ohh, shit this is bad.
				return "";
			}
		};
	}]);
});