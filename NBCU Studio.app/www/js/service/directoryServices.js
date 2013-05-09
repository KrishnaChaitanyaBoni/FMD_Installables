//Blank search field validation and fetch the results from SQLite DB
 function validateAndSearch(){
     if ($("header .searchCover").is(":visible") != false){
        var searchWord = document.getElementById("searchKeyword").value;
		searchWord=searchWord.trim();
         if(searchWord.length<2){
		 navigator.notification.alert(
    'Search text should contain atleast two characters.',  // message
    {},         // callback
    'Directory Search',    // title
    'OK'      // Close button Name
    );
             $("#searchKeyword").focus();;

		  }
		  else{
          showSearchDirectoryRecords(searchWord);
		   $("#dirSearchResults").show();
          $("#dirLocationResults").hide();
		  $("#searchKeyword").blur();;
          }
         }

		 }
	
		//Function to set department service name in storage for reference to load department services page dynamically
		function setDepartmentServicename(deptServiceName,locationName){
		//alert("In setDepartmentServicename "+deptServiceName);
				if(typeof(Storage)!=="undefined"){
		sessionStorage.departmentService=deptServiceName;
		sessionStorage.locationName=locationName;
		}
						
		}
		
		//Method to detect Enter/Return/Go key press for directory search results
		function detectEnterKeyPress(e){
		if(e.keyCode==13){
        validateAndSearch();
        }
        }
		
function backBtnNav(){
    
    if ($("#dirSearchResults").is(":visible") == true)
	{
         	window.location="../html/directory.html";  
    }
    else{
	    javascript:history.back();
    }
}
