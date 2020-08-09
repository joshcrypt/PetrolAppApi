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
  var petroldata = JSON.stringify({"Mileage":Mileage,"PpL":PpL,"Amount":Amount,"Capacity":Capacity,"PetrolStation":PetrolStation,"LicensPlate":LicensePlate,"AdditionalInfo":AdditionalInfo});
  xhr.send(petroldata);
}
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
          </div>
      </div>
    </div>
    `
    document.getElementById('petroldetails').innerHTML = document.getElementById('petroldetails').innerHTML + petrolview;
  }
}
LoadPetrolDetails();