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
                        <a class="btn btn-outline-warning edit" id="edit-data" data-id="${commande.id}"><i class="fa-regular fa-pen-to-square"></i></a>
                        <a class="btn btn-outline-danger delete" data-id="${commande.id}" id="delete-data"><i class="fa-solid fa-trash"></i></a>
                    </td>
                  </tr>
                `;
            });
            $("#tableCommande tbody").html(row);
            $('.table').DataTable();
          },
          error:(error) => {
            console.log(error);
          }
        });
      }

      addCommande() {
        let 
      }


}


$(function () {
    const commande = new Commande();
    commande.getCommandeList();

    $("#searchInput").on("keyup", (e) => {
        e.preventDefault();
        commande.searchTable();
    })
})