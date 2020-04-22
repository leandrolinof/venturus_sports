
function excluir() {
    var tr = '';
    var tr = $(event.target).closest('tr');

    tr.remove();
};


function TableSearch() {
	var vInputSearch, vFilter, vTableVenturus, tr, td, i, vInputValue;
	
	vInputSearch   = document.getElementById("inputSearch");
	vFilter        = vInputSearch.value.toUpperCase();
	vTableVenturus = document.getElementById("table-venturus");
	tr             = vTableVenturus.getElementsByTagName("tr");

	for (i = 0; i < tr.length; i++) {
	    td = tr[i].getElementsByTagName("td")[0];

	    if ( td ) {
	        vInputValue = td.textContent || td.innerText;

	        if (vInputValue.toUpperCase().indexOf(vFilter) > -1) {
	            tr[i].style.display = "";
	        } else {
	            tr[i].style.display = "none";
	        };
	    };   
	};
};





var link  = document.querySelector('a');
var panel = document.querySelector('#dropdown-content');


link.addEventListener('click', function(){
    panel.style.display = 'block';
  	event.stopPropagation(); 
  	var doc = document.querySelector('body');
  
  	doc.addEventListener('click', function() {
  		console.log(event);
  		panel.style.display = 'none';
    	doc.removeEventListener('click', function(){})
  	});
  
  	doc.addEventListener('keypress', function() {
    	console.log(event.keyCode);
    	
    	if (event.keyCode == 49) {
        	panel.style.display = 'none';
      		doc.removeEventListener('keypress', function(){})
    	};
  	});
});


var vUsers;
var vRide;
var vDayWeek;
var vPosts;
var vAlbums;
var vPhotos;
var albumCount;
var photoCount;
var length;
var table = document.getElementById('table-venturus');

Promise.all([
	$.ajax({ url: 'https://jsonplaceholder.typicode.com/users',
    		async: true,
            success: function(data1) {
             	vUsers = data1;		                    },
            error: function(xhr, ajaxOptions, thrownError) {
                alert(thrownError);

                return false; 
            }
    }),

    $.ajax({url: 'https://jsonplaceholder.typicode.com/albums',
			async: true,
            success: function(data2) {
            	vAlbums = data2;
            },
            error: function(xhr, ajaxOptions, thrownError) {
                alert(thrownError);

                return false;
            }
    }),

	$.ajax({url: 'https://jsonplaceholder.typicode.com/photos',
			async: true,
            success: function(data3) {
            	vPhotos = data3;
            },
            error: function(xhr, ajaxOptions, thrownError) {
                alert(thrownError);

                return false;
            }
    }),                	
]).then(([vUsers, vAlbums, vPhotos]) => {
	vUsers.forEach((line) => {
	    var lineId   = line.id;
	    var lineIdAlbums;
	  	var tr        = document.createElement('tr');
		var username  = document.createElement('td');
    	var name      = document.createElement('td');    
		var email     = document.createElement('td');    
		var city      = document.createElement('td');
		var tdDayWeek = document.createElement('td');
		var tdRide    = document.createElement('td');
		var tdPosts   = document.createElement('td');
		var tdAlbums  = document.createElement('td');
		var tdphotos  = document.createElement('td');
	    var trash     = document.createElement("td");


		vPosts   = Math.floor(Math.random() * 50);
		vRide    = Math.floor(Math.random() * 3 + 1);
		vDayWeek = Math.floor(Math.random() * 6 + 1);


    	length = 0; 
    	vAlbums.forEach((album) => {
	        if ( album.userId == lineId ) { 
	            length++;
	        };

	        lineIdAlbums = album.id;
	    });

	    albumCount = length;



	    length = 0;
	    vPhotos.forEach((photos) => {
	    	if ( photos.albumId == lineIdAlbums ) {
	    		length++;
	    	};
	    });

	    photoCount = length;


		username.innerText  = line.username;
	    name.innerText      = line.name;
	    email.innerText     = line.email;
	    city.innerText      = line.address.city;

	    if ( vRide == 1 ) {
	        tdRide.innerText = 'Always';
	    } else if ( vRide == 2 ) {
	        tdRide.innerText = 'Sometimes';
	    } else if ( vRide == 3 ) {
	        tdRide.innerText = 'Never';
	    };

	    if ( vDayWeek == 1 ) {
	    	tdDayWeek.innerText = 'Every Day';
	    } else if ( vDayWeek == 2 ) {
	    	tdDayWeek.innerText = 'Weekends';
	    } else if ( vDayWeek == 3 ) {
	    	tdDayWeek.innerText = 'Week Days';
	    } else if ( vDayWeek == 4 ) {
	    	tdDayWeek.innerText = 'Mon,Wed,Fri';
	    } else if ( vDayWeek == 5 ) {
	    	tdDayWeek.innerText = 'Mon,Tue,Wed';
	    } else if ( vDayWeek == 6 ) {
	    	tdDayWeek.innerText = 'Fri,Sun';
	    }

	    tdPosts.innerText	= vPosts;
	    tdAlbums.innerText  = albumCount;
	    tdphotos.innerText  = photoCount;
	    trash.innerHTML     = '<a onclick="excluir()" href="javascript:void(0)"><i class="far fa-trash-alt btnDelete"></i></a>';

	    tr.append(username, name, email, city, tdRide, tdDayWeek, tdPosts, tdAlbums, tdphotos, trash);
	    table.append(tr);
    });
});




$('#btnSave').on('click', function() {
    var newRow = $("<tr>");	    
    var cols = "";	


    if ( document.getElementById("inputRadio1").checked ) {
    	var vRide = 'Always';
    } else if ( document.getElementById("inputRadio2").checked ) {
    	var vRide = 'Sometimes';
    } else if ( document.getElementById("inputRadio3").checked ) {
    	var vRide = 'Never';
    };


	var vChecks = new Array();
	$("input[name='day_week[]']:checked").each(function() {
	    vChecks.push($(this).val());
	});


	if ( document.getElementById("inputUserName").value == "" ) {
		alert('Operação não realizada! Por favor digitar um Username.');

		$('#inputUserName').trigger('focus');

		return false;
	} else if ( document.getElementById("inputName").value == "" ) {
		alert('Operação não realizada! Por favor digitar um Name.');

		$('#inputName').trigger('focus');  

		return false;
	} else if ( document.getElementById("inputMail").value == "" ) {
		alert('Operação não realizada! Por favor digitar um E-mail.');

		$('#inputMail').trigger('focus');  

		return false;
	} else if ( vChecks == "" ) {
		alert('Operação não realizada! Por favor escolher pelo menos um dia da semana.');

		$('input[type="checkbox"]').eq(0).focus();  

		return false; 
	};


	if ( vChecks == 'Sun,Sat' ) {
	    var vDayWeek = 'Weekends';
	} else if ( vChecks == 'Mon,Tue,Wed,Thu,Fri' ) {
		var vDayWeek = 'Week Days';
	} else if ( vChecks == 'Sun,Mon,Tue,Wed,Thu,Fri,Sat' ) {
		var vDayWeek = 'Every Day';
	} else {
		var vDayWeek = vChecks;
	};


    cols += '<td>'+document.getElementById("inputUserName").value+'</td>';	    
    cols += '<td>'+document.getElementById("inputName").value+'</td>';	    
    cols += '<td>'+document.getElementById("inputMail").value+'</td>';		    
    cols += '<td>'+document.getElementById("inputCity").value+'</td>'; 
    cols += '<td>'+vRide+'</td>';
    cols += '<td>'+vDayWeek+'</td>'; 
    cols += '<td>0</td>';   
    cols += '<td>0</td>';   
    cols += '<td>0</td>';  
    cols += '<td>';	    
    cols += '<a onclick="excluir()" href="javascript:void(0)"><i class="far fa-trash-alt btnDelete"></i></a>';	    
    cols += '</td>';	

    newRow.append(cols);	    
    $("#table-venturus").append(newRow);

	document.getElementById("inputUserName").value = null;	    
    document.getElementById("inputName").value     = null;   
    document.getElementById("inputMail").value 	   = null;	    
    document.getElementById("inputCity").value 	   = null;	
    document.getElementById("inputRadio1").checked = true;
    document.getElementById("inputCheck1").checked = false;	
    document.getElementById("inputCheck2").checked = false;				
    document.getElementById("inputCheck3").checked = false;
    document.getElementById("inputCheck4").checked = false;
    document.getElementById("inputCheck5").checked = false;
    document.getElementById("inputCheck6").checked = false;
    document.getElementById("inputCheck7").checked = false;
	
	$('#inputUserName').trigger('focus'); 
    
    return false;
});



$('#btnDiscard').on('click', function() {
	document.getElementById("inputUserName").value = null;	    
    document.getElementById("inputName").value     = null;   
    document.getElementById("inputMail").value 	   = null;	    
    document.getElementById("inputCity").value 	   = null;	
    document.getElementById("inputRadio1").checked = true;
    document.getElementById("inputCheck1").checked = false;	
    document.getElementById("inputCheck2").checked = false;				
    document.getElementById("inputCheck3").checked = false;
    document.getElementById("inputCheck4").checked = false;
    document.getElementById("inputCheck5").checked = false;
    document.getElementById("inputCheck6").checked = false;
    document.getElementById("inputCheck7").checked = false;
});