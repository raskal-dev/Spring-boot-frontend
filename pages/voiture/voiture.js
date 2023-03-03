class Voiture {
    constructor() {}

    searchTable() {
        var input, filter, table, tr, td, i, j, txtValue;
        input = document.getElementById("searchInput");
        filter = input.value.toUpperCase();
        table = document.getElementById("tableVoiture");
        tr = table.getElementsByTagName("tr");
      
        for (i = 1; i < tr.length; i++) {
          // Commencer à partir de 1 pour exclure la première ligne des en-têtes
          td = tr[i].getElementsByTagName("td");
          for (j = 0; j < td.length; j++) {
            txtValue = td[j].textContent || td[j].innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
              tr[i].style.display = "";
              break;
            } else {
              tr[i].style.display = "none";
            }
          }
        }
      }


    getVoitureList() {
        $.ajax({
            type : "GET",
            url : "http://localhost:8888/api/voitures/all",
            dataType:"json",
            success: function(results){
                var row = ""
                console.log(results.message);
                console.log(results.object);
                $.each(results.object, (index, voiture) => {
                        row +=
                            `<tr>
                                <th>${voiture.id}</th>
                                <th>${voiture.matricule}</th>
                                <td>${voiture.mark}</td>
                                <td>${voiture.type}</td>
                                <td>${voiture.placeNumber}</td>
                                <td>${voiture.price}</td>
                                <td>
                                    <a class="btn btn-outline-warning btn-sm edit" id="edit-data" data-id="${voiture.id}"><i class="fa-regular fa-pen-to-square"></i></a>
                                    <a class="btn btn-outline-danger btn-sm delete" data-id="${voiture.id}" id="delete-data"><i class="fa-solid fa-trash"></i></a>
                                </td>
                            </tr>`;
                    });

                $("#tableVoiture tbody").html(row);
                // $('.table').DataTable();
            },
            error:function(error) {
                console.error(error);
            }
        });
    }

    addVoitrure() {
    
        var matricule = $("#matricule").val()
        var mark = $("#mark").val()
        var type = $("#type").val()
        var placeNumber = $("#placeNumber").val()
        var price = $("#price").val()
        
        $.ajax({
            type:"POST",
            contentType:"application/json;charset=utf-8",
            url:"http://localhost:8888/api/voitures/save",
            data:JSON.stringify({
                matricule:matricule,
                mark:mark,
                type:type,
                placeNumber:placeNumber,
                price:price
            }),
            dataType:"json",
            success:(response) => {
                console.log(response)
                Swal.fire("Petite alerte !!","L'ajout est effectuée avec succès !!","success")
                this.getVoitureList()
                $("#form-ajout-car")[0].reset();
            },
            error:(err) => {
                console.log(err)
                Swal.fire("Ouupss !!","Veuillez réessayer s'il vous plait !!","error")
            }
        })
    }

    migrateData() {
        $("body").on("click","#edit-data", function(event) {
            $("#form-ajout-car")[0].reset()
            var id = $(this).attr("data-id")
            console.log("DATA-ID : "+id)
            $.ajax({
                type:"GET",
                contentType:"application/json;charset=utf-8",
                url:`http://localhost:8888/api/voitures/byId/${id}`,
                success:(response) => {
                    console.log(response.object)
                    $("#matricule").val(response.object.matricule)
                    $("#mark").val(response.object.mark)
                    $("#type").val(response.object.type)
                    $("#placeNumber").val(response.object.placeNumber)
                    $("#price").val(response.object.price)
                    $("#idCar").val(response.object.id)
                    $("#btn-modifier").show()
                    $("#btn-add-car").hide()
                },
                error:(err) => {
                    console.log(err)
                    Swal.fire("Ouupss !!","Veuillez réessayer s'il vous plait !!","error")
                }
            })
        })
    }

    updateData(data_k, idCar) {
        
        $.ajax({
            type:"PUT",
            contentType:"application/json;charset=utf-8",
            url:`http://localhost:8888/api/voitures/update/${idCar}`,
            data: JSON.stringify(data_k),
            dataType:"json",
            success:(response) => {
                console.log("RESPONSE : "+response)
                Swal.fire("Petite alerte !!","Modification avec succès !!","success")
                $("#btn-modifier").hide()
                $("#btn-add-car").show()
                this.getVoitureList()
                $("#form-ajout-car")[0].reset();
            },
            error:(err) => {
                console.log("ERROR : "+err)
                Swal.fire("Ouupss !!","Veuillez réessayer s'il vous plait !!","error")
            }
        })   
    }

    deleteData() {
        $("body").on("click","#delete-data", function(event) {
            var id = $(this).attr("data-id")
            console.log("DATA-ID : "+id)
            Swal.fire({
                title:"Confirmation ...",
                text:"Voulez-vous vraiment supprimer cette Étudiant ?",
                icon:"warning",
                showCancelButton:true,
                confirmButtonColor:"#3085d6",
                cancelButtonColor:"#d33",
                confirmButtonText:"Oui"
            }).then((result) => {
                if (result.isConfirmed) {
                    $.ajax({
                        type:"DELETE",
                        url:`http://localhost:8888/api/voitures/delete/${id}`,
                        success:(response) => {
                            Swal.fire("Petite alerte !!",`${response.message}`,"success").then(() => {
                                window.location.reload()    
                            })
                            this.getVoitureList()
                        },
                        error:(err) => {
                            console.log(err)
                            Swal.fire("Ouupss !!","Veuillez réessayer s'il vous plait !!","error")
                        }
                    })    
                }
                
            })
        })
    }

    loadPage(url) {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
            document.getElementById("menuNav").innerHTML = this.responseText;
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
        }

}

$(function () {
    const voiture = new Voiture();
    voiture.getVoitureList();

    $("#searchInput").on("keyup", (e) => {
        e.preventDefault();
        voiture.searchTable();
    })
    // $('.table').DataTable();


    $("#btn-modifier").hide()
    
    $("#btn-modifier").on("click",(event) => {
        event.preventDefault()
        var idC = $("#idCar").val()
        var dataForm = {        
            matricule: $("#matricule").val(),
            mark: $("#mark").val(),
            type:$("#type").val(),
            placeNumber: $("#placeNumber").val(),
            price: $("#price").val()
        }
        voiture.updateData(dataForm, idC)
    })

    $('#form-ajout-car').on("submit", (event) => {
        event.preventDefault()
        voiture.addVoitrure();
    })

    voiture.migrateData();
    voiture.deleteData();

})