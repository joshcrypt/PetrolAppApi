(function() {
    'use strict';
    window.addEventListener('load', function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName('needs-validation');
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      });
    }, false);
  })();
//Process Form data
function FormProcess(){
  var Mileage = document.getElementById('Mileage').value;
  var PpL = document.getElementById('PpL').value;
  var Amount = document.getElementById('Amount').value;
  var Capacity = document.getElementById('Capacity').value;
  var PetrolStation = document.getElementById('PetrolStation').value;
  var LicensePlate = document.getElementById('LicensePlate').value;
  var AdditionalInfo = document.getElementById('AdditionalInfo').value;
  //Creating XHR object
  let xhr = new XMLHttpRequest();
  let url = "http://localhost:3000/petroldetails";
  xhr.open("POST",url,true);
  xhr.setRequestHeader('Content-Type','application/json');
  // Create a state change callback 
  xhr.onreadystatechange = function () { 
    if (xhr.readyState === 4 && xhr.status === 200) { 
        // Print received data from server 
        result.innerHTML = this.responseText; 
    } 
  }; 
  var petroldata = JSON.stringify({"Mileage":Mileage,"PpL":PpL,"Amount":Amount,"Capacity":Capacity,"PetrolStation":PetrolStation,"LicensePlate":LicensePlate,"AdditionalInfo":AdditionalInfo});
  xhr.send(petroldata);
}
//Delete petrol details
function deletePetrolDetails(Id){
  var delpetroldetail = confirm("Are you sure you want to delete?");
  if(delpetroldetail == true){
    const xhr = new XMLHttpRequest();
    let url = `http://localhost:3000/petroldetails/${Id}`
    xhr.open("DELETE",url, false);
    xhr.send();
    location.reload();
  } else{
    location.reload();
  }
}
//Update petrol details
function setEditModal(Id){
  const xhr = new XMLHttpRequest();
  let url = `http://localhost:3000/petroldetails/${Id}`
  xhr.open("GET",url, false);
  xhr.send();
  const petroldetail = JSON.parse(xhr.responseText);
  
  let Mileage = petroldetail.Mileage;
  let Date = petroldetail.Date;
  let PpL = petroldetail.PpL;
  let Amount = petroldetail.Amount;
  let Capacity = petroldetail.Capacity;
  let PetrolStation = petroldetail.PetrolStation;
  let LicensePlate = petroldetail.LicensPlate;
  let AdditionalInfo = petroldetail.AdditionalInfo;

  document.getElementById('Id').value = Id;
  document.getElementById('Mileage').value = Mileage;
  document.getElementById('Date').value = Date;
  document.getElementById('PpL').value = PpL;
  document.getElementById('Amount').value = Amount;
  document.getElementById('Capacity').value = Capacity;
  document.getElementById('PetrolStation').value = PetrolStation;
  document.getElementById('LicensePlate').value = LicensePlate; 
  document.getElementById('AdditionalInfo').value = AdditionalInfo;
//Set the action on the form
  document.getElementById('editpetroldetailsform').action = url;
}
//Load Petrol details in view page
function LoadPetrolDetails(){
  const xhr = new XMLHttpRequest();
  let url = "http://localhost:3000/petroldetails";
  xhr.open("GET",url,false);
  xhr.send();
  const petroldetails = JSON.parse(xhr.responseText);
  for(let petroldetail of petroldetails){
    const petrolview = `
      <div class="col-4">
      <div class="card">
          <div class="card-body">
              <h5 class="card-title">${petroldetail.Date}</h5>
              <h6 class="card-subtitle mb-2 text-muted">${petroldetail.Id}</h6>
              <h6 class="card-subtitle mb-2 text-muted">${petroldetail.Mileage}</h6>
              <div>Amount: ${petroldetail.Amount}</div>
              <div>Price Per Liter: ${petroldetail.PpL}</div>
              <div>Capacity: ${petroldetail.Capacity}</div>
              <div>Petrol Station: ${petroldetail.PetrolStation}</div>
              <div>License Plate: ${petroldetail.LicensePlate}</div>
              <div>Additional Info: ${petroldetail.AdditionalInfo}</div>
              <hr>
              <button type="button" class="btn btn-danger" onclick="deletePetrolDetails(${petroldetail.Id})">Delete</button>
              <button type="button" class="btn btn-primary" data-toggle="modal"
                  data-target="#editpetroldetailsModal" onclick="setEditModal(${petroldetail.Id})">
                  Edit
              </button>
          </div>
      </div>
    </div>
    `
    document.getElementById('petroldetails').innerHTML = document.getElementById('petroldetails').innerHTML + petrolview;
  }
}
LoadPetrolDetails();