class Commande {
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

      getCommandeList() {
        $.ajax({
          type : "GET",
          url : "http://localhost:8888/api/commandes/all",
          dataType : "json",
          success: (results) => {
            let row = ""
            console.log(results.message);
            console.log(results.object);
            $.each(results.object, (index, commande) => {
              row += 
                `
                  <tr>
                    <th>${commande.id}</th>
                    <th>${commande.nomCli}</th>
                    <td>${commande.numCli}</td>
                    <td>${commande.matriculeVoiture}</td>
                    <td>${commande.marqueVoiture}</td>
                    <td>${commande.typeVoiture}</td>
                    <td>${commande.nbPlaceVoiture}</td>
                    <td>${commande.priceVoiture}</td>
                    <td>
                        <a class="btn btn-outline-info export" id="export-data" data-id="${commande.id}"><i class="fa-solid fa-file-export"></i></a>
                    </td>
                  </tr>
                `;
            });
            $("#tableCommande tbody").html(row);
            $('.table').DataTable({
              "language": {
                "sEmptyTable":     "Aucune donnée disponible dans le tableau",
                "sInfo":           "Affichage de l'élément _START_ à _END_ sur _TOTAL_ éléments",
                "sInfoEmpty":      "Affichage de l'élément 0 à 0 sur 0 élément",
                "sInfoFiltered":   "(filtré à partir de _MAX_ éléments au total)",
                "sInfoPostFix":    "",
                "sInfoThousands":  ",",
                "sLengthMenu":     "Afficher _MENU_ éléments",
                "sLoadingRecords": "Chargement...",
                "sProcessing":     "Traitement...",
                "sSearch":         "Rechercher :",
                "sZeroRecords":    "Aucun élément correspondant trouvé",
                "oPaginate": {
                  "sFirst":    "Premier",
                  "sLast":     "Dernier",
                  "sNext":     "Suivant",
                  "sPrevious": "Précédent"
                },
                "oAria": {
                  "sSortAscending":  ": activer pour trier la colonne par ordre croissant",
                  "sSortDescending": ": activer pour trier la colonne par ordre décroissant"
                }
              }
            });
            
            let lengthCommande = $('.table tr').length;
            let totalLentgthCommande = lengthCommande - 2;
            console.log("Nombre des commandes est : "+ totalLentgthCommande)
          },
          error:(error) => {
            console.log(error);
          }
        });
      }

      ExportPDF() {
        $("body").on("click","#export-data", function(event) {
            var idCom = $(this).attr("data-id")
            console.log("DATA-ID : "+idCom)
            $.ajax({
                type:"GET",
                contentType:"application/json;charset=utf-8",
                url: `http://localhost:8888/api/commande/export/pdf/${idCom}`,
                success:(response) => {
                    console.log(response)
                    Swal.fire("Petite alerte !!","L'exportation est effectuée avec succès !!","success")
                },
                error:(err) => {
                    console.log(err)
                    Swal.fire("Ouupss !!","Veuillez réessayer s'il vous plait !!","error")
                }
            })
        })
    }


}


$(function () {
    const commande = new Commande();
    commande.getCommandeList();

    $("#searchInput").on("keyup", (e) => {
        e.preventDefault();
        commande.searchTable();
    })

    commande.ExportPDF();

    
})
