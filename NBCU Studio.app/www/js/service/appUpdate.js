//Add this for all nodes of xml<![CDATA[" and ends with "]]>  - For parsing the special characters
//alert("App Update");

// Directory Entity
function Directory() {
	var directoryId;
	var location;
	var locationId;
	var departmentId;
	var department;
	var departmentServiceName;
	var description;
	var building;
	var contactPerson1;
	var contactPerson2;
	var phoneNumber1;
	var phoneNumber2;
	var fax;
	var workTime;
	var email1;
	var email2;
}
var directoryArray = new Array();
var count=0;

function parseXML(data){
	console.log("Inside parseXML ");
    var directory;
    
    var previousUpdationSeqNum =localStorage.getItem("updationSeqNum");
    
    $(data).find("mobileUpdateDetails").each(function () {
                                             
                                             currentUpdationSeqNum =  $(this).find("updationSeqNum").text();
                                             console.log("currentUpdationSeqNum...."+currentUpdationSeqNum);
                                             if(currentUpdationSeqNum > previousUpdationSeqNum){ 
                                             localStorage.setItem("updationSeqNum", currentUpdationSeqNum);
                                             $(this).find("departmentServices").find("departmentService").each(function(){
                                                                                                               directory=new Directory();
                                                                                                               directory.location = $(this).find("location").text();
                                                                                                               directory.department = $(this).find("department").text();
                                                                                                               directory.departmentServiceName = $(this).find("departmentServiceName").text();
                                                                                                               directory.description = $(this).find("description").text();
                                                                                                               directory.fax= $(this).find("fax").text();
                                                                                                               directory.workTime = $(this).find("workTime").text();
                                                                                                               directory.email1= $(this).find("email1").text();
                                                                                                               directory.email2= $(this).find("email2").text();
                                                                                                               directory.building= $(this).find("building").text();
                                                                                                               directory.contactPerson1 =$(this).find("contactPerson1").text();
                                                                                                               directory.contactPerson2 =$(this).find("contactPerson2").text();
                                                                                                               directory.phoneNumber1 =$(this).find("phoneNumber1").text();
                                                                                                               directory.phoneNumber2 =$(this).find("phoneNumber2").text();
                                                                                                               directoryArray.push(directory);
                                                                                                               });
                                             }
                                             });
    if(directoryArray.length > 0){
        updateApp(directoryArray);
    }
}
function parseInfo(){
	$.ajax({  
		   url:"http://stage.filmmakersdestination.com/updateDirectory.xml",
           dataType:"xml",   
           type: "GET",  
           success:function(data) {
           parseXML(data);
           },  
           error:function(XMLHttpRequest,textStatus, errorThrown) {     
           }
           });
}

function getDepartmentDetails(locationName,departmentName,i){
	myDB.transaction(function(transaction) {
                     index=i;
                     transaction.executeSql('select directory_id from directory,department,location where lower(department_name)=? and lower(location_name)=? and lower(department_service_name)=? and directory.location_id=location.location_id and directory.department_id=department.department_id',[directoryArr[index].department.toLowerCase().trim(),directoryArr[index].location.toLowerCase().trim(),directoryArr[index].departmentServiceName.toLowerCase().trim()], getDepartmentDetailsSuccessHandler, errorHandler);
                     });
}
function getDepartmentDetailsSuccessHandler(transaction, results) {
	var directoryId;
    if(results.rows.length>0){
        var row = results.rows.item(0);
        directoryId = row['directory_id'];
        directoryArr[index].directoryId=directoryId;
        count++;
    }   
	else{
		
		count++;
		insertNewContact(directoryArr[index]);
	}
    if(count==directoryArr.length){
        updateDB();
    }
}

function successHandler(transaction,result){
	console.log("Updated successfully");	
}

function errorHandler(transaction, error) {
}
function insertNewContact(directoryObj){
    
	myDB.transaction(function(transaction) {
                     
                     var tempLocationId;
                     var tempDepartmentId;
                     
                     transaction.executeSql('select location_id from location where lower(location_name)="'+directoryObj.location.toLowerCase().trim()+'"',[], function (tx, result){
                                            dataset = result.rows;
                                            if(dataset.length>0){
                                            item = dataset.item(0);
                                            tempLocationId=item['location_id'];
                                            directoryObj.locationId=tempLocationId;
                                            getDepartmentId(directoryObj);
                                            }
                                            });
                     });    
}

function getDepartmentId(directoryObj){
	myDB.transaction(function(transaction) {
                     
                     transaction.executeSql('select department_id from department where location_id="'+directoryObj.locationId+'" and lower(department_name)="'+directoryObj.department.toLowerCase().trim()+'" ',[], function (tx, result){
                                            dataset = result.rows;
                                            if(dataset.length>0){
                                            item = dataset.item(0);
                                            tempDepartmentId=item['department_id'];
                                            directoryObj.departmentId=tempDepartmentId;
                                            insertDirectoryContact(directoryObj);
                                            }
                                            });
                     });
    
}

function insertDirectoryContact(directoryObj){
	myDB.transaction(function(transaction) {
                     
                     transaction.executeSql('INSERT INTO directory(location_id,contact_person1,contact_person2,department_id,email1,email2,fax,phone_number1,phone_number2,bldg_specific_number,work_time,description,department_service_name) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)',
                                            [directoryObj.locationId,directoryObj.contactPerson1.trim(),directoryObj.contactPerson2.trim(),directoryObj.departmentId,directoryObj.email1.trim(),directoryObj.email2.trim(),directoryObj.fax.trim(),directoryObj.phoneNumber1.trim(),directoryObj.phoneNumber2.trim(),directoryObj.building.trim(),directoryObj.workTime.trim(),directoryObj.description.trim(),directoryObj.departmentServiceName.trim()]);
                     }); 
}
function updateDB(){
    myDB.transaction(function(transaction) {
                     for(i=0;i<directoryArr.length;i++){  
                     if(directoryArr[i].description.trim().length!=0){
                     if(directoryArr[i].description.trim().toLowerCase()== "null"){ directoryArr[i].description=""; }
                     transaction.executeSql('update directory set description=? where directory_id =?',[directoryArr[i].description.trim(),directoryArr[i].directoryId],successHandler,errorHandler);
                     }
                     if(directoryArr[i].building.trim().length!=0){
                     if(directoryArr[i].building.trim().toLowerCase()== "null"){ directoryArr[i].building=""; }
                     transaction.executeSql('update directory set bldg_specific_number=? where directory_id =?',[directoryArr[i].building.trim(),directoryArr[i].directoryId],successHandler,errorHandler);
                     }
                     if(directoryArr[i].contactPerson1.trim().length!=0){
                     if(directoryArr[i].contactPerson1.trim().toLowerCase()== "null"){ directoryArr[i].contactPerson1=""; }
                     transaction.executeSql('update directory set contact_person1=? where directory_id =?',[directoryArr[i].contactPerson1.trim(),directoryArr[i].directoryId],successHandler,errorHandler);
                     }
                     if(directoryArr[i].contactPerson2.trim().length!=0){
                     if(directoryArr[i].contactPerson2.trim().toLowerCase()== "null"){ directoryArr[i].contactPerson2=""; }
                     transaction.executeSql('update directory set contact_person2=? where directory_id =?',[directoryArr[i].contactPerson2.trim(),directoryArr[i].directoryId],successHandler,errorHandler);
                     }
                     if(directoryArr[i].phoneNumber1.trim().length!=0){
                     if(directoryArr[i].phoneNumber1.trim().toLowerCase()== "null"){ directoryArr[i].phoneNumber1=""; }
                     transaction.executeSql('update directory set phone_number1=? where directory_id =?',[directoryArr[i].phoneNumber1.trim(),directoryArr[i].directoryId],successHandler,errorHandler);
                     }
                     if(directoryArr[i].phoneNumber2.trim().length!=0){
                     if(directoryArr[i].phoneNumber2.trim().toLowerCase()== "null"){ directoryArr[i].phoneNumber2=""; }
                     transaction.executeSql('update directory set phone_number2=? where directory_id =?',[directoryArr[i].phoneNumber2.trim(),directoryArr[i].directoryId],successHandler,errorHandler);
                     }
                     if(directoryArr[i].fax.trim().length!=0){
                     if(directoryArr[i].fax.trim().toLowerCase()== "null"){ directoryArr[i].fax=""; }
                     transaction.executeSql('update directory set fax=? where directory_id =?',[directoryArr[i].fax.trim(),directoryArr[i].directoryId],successHandler,errorHandler);
                     }
                     if(directoryArr[i].workTime.trim().length!=0){
                     if(directoryArr[i].workTime.trim().toLowerCase()== "null"){ directoryArr[i].workTime=""; }
                     transaction.executeSql('update directory set work_time=? where directory_id =?',[directoryArr[i].workTime.trim(),directoryArr[i].directoryId],successHandler,errorHandler);
                     }
                     if(directoryArr[i].email1.trim().length!=0){
                     if(directoryArr[i].email1.trim().toLowerCase()== "null"){ directoryArr[i].email1=""; }
                     transaction.executeSql('update directory set email1=? where directory_id =?',[directoryArr[i].email1.trim(),directoryArr[i].directoryId],successHandler,errorHandler);
                     }
                     if(directoryArr[i].email2.trim().length!=0){
                     if(directoryArr[i].email2.trim().toLowerCase()== "null"){ directoryArr[i].email2=""; }
                     transaction.executeSql('update directory set email2=? where directory_id =?',[directoryArr[i].email2.trim(),directoryArr[i].directoryId],successHandler,errorHandler);
                     }
                     }
                     });
    
}
function updateApp(directoryArray){
	directoryArr=directoryArray;
    myDB.transaction(function(transaction) {
                     for(i=0;i<directoryArr.length;i++){
                     getDepartmentDetails(directoryArr[i].location,directoryArr[i].department,i);
                     }
                     
                     });
}
