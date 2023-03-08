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
            url : "http://localhost:8888/api/voitures/vendu",
            dataType:"json",
            success: function(results){
                var row = ""
                console.log(results.message);
                console.log(results.object);
                $.each(results.object, (index, voiture) => {
                        row +=
                            `<tr>
                                <th class="align-middle">${voiture.id}</th>
                                <th class="align-middle">${voiture.matricule}</th>
                                <td class="align-middle">${voiture.mark}</td>
                                <td class="align-middle">${voiture.type}</td>
                                <td class="align-middle">${voiture.placeNumber}</td>
                                <td class="align-middle">${voiture.price}</td>
                                <td class="align-middle">
                                    <a class="btn btn-outline-primary buy" style="font-size: 0.8rem;" data-bs-toggle="modal" data-bs-target="#exampleModal" id="buy-data" data-id="${voiture.id}"><i class="fa-solid fa-cart-plus"></i></a>
                                    <a class="btn btn-outline-warning edit" style="font-size: 0.8rem;" id="edit-data" data-id="${voiture.id}"><i class="fa-regular fa-pen-to-square"></i></a>
                                    <a class="btn btn-outline-danger delete" style="font-size: 0.8rem;" data-id="${voiture.id}" id="delete-data"><i class="fa-solid fa-trash"></i></a>
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
        let placeNumber = $("#placeNumber").val()
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

    migrateDataCommande() {
        $("body").on("click","#buy-data", function(event) {
            $("#form-ajout-car")[0].reset()
            $("#form-ajout-commande")[0].reset()
            var id = $(this).attr("data-id")
            console.log("DATA-ID : "+id)
            $.ajax({
                type:"GET",
                contentType:"application/json;charset=utf-8",
                url:`http://localhost:8888/api/voitures/byId/${id}`,
                success:(response) => {
                    console.log(response.object)
                    $("#idVoiture").val(response.object.id)
                    $("#matriculeVoiture").val(response.object.matricule)
                    $("#marqueVoiture").val(response.object.mark)
                    $("#typeVoiture").val(response.object.type)
                    $("#nbPlaceVoiture").val(response.object.placeNumber)
                    $("#priceVoiture").val(response.object.price)
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

    addCommande(data_commande, idCar) {
        
        $.ajax({
            type:"POST",
            contentType:"application/json;charset=utf-8",
            url:"http://localhost:8888/api/commandes/save",
            data: JSON.stringify(data_commande),
            dataType:"json",
            success:(response) => {
                console.log("RESPONSE : "+response)

                $('#exampleModal').modal('hide');

                $.ajax({
                    type:"PUT",
                    contentType:"application/json;charset=utf-8",
                    url:`http://localhost:8888/api/voitures/update/${idCar}`,
                    data: JSON.stringify(
                        { 
                            matricule: $("#matriculeVoiture").val(),
                            mark: $("#marqueVoiture").val(),
                            type:$("#typeVoiture").val(),
                            placeNumber: $("#nbPlaceVoiture").val(),
                            price: $("#priceVoiture").val(),
                            vendu: true 
                        
                        }),
                    dataType:"json",
                    success:(response) => {
                        console.log("RESPONSE : "+response)
                        Swal.fire("Petite alerte !!","Modification avec succès !!","success")
                        this.getVoitureList()
                        $("#form-ajout-car")[0].reset();
                    },
                    error:(err) => {
                        console.log("ERROR : "+err)
                        Swal.fire("Ouupss !!","Veuillez réessayer s'il vous plait !!","error")
                    }
                });
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
                icon:"question",
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

    $("#btn-buy").on("click",(event) => {
        event.preventDefault()
        let id_V = $("#idVoiture").val();
        var dataFormCom = {        
            // commande
            nomCli: $("#nomCli").val(),
            numCli: $("#numCli").val(),
            matriculeVoiture: $("#matriculeVoiture").val(),
            marqueVoiture: $("#marqueVoiture").val(),
            typeVoiture:$("#typeVoiture").val(),
            nbPlaceVoiture: $("#nbPlaceVoiture").val(),
            priceVoiture: $("#priceVoiture").val()
        }
        voiture.addCommande(dataFormCom, id_V);
    })

    $('#form-ajout-car').on("submit", (event) => {
        event.preventDefault()
        voiture.addVoitrure();
    })

    voiture.migrateData();
    voiture.migrateDataCommande();
    voiture.deleteData();

})