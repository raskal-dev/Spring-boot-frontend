class Voiture {
    constructor() {}

    getData() {
        $.ajax({
            type: "GET",
            url: "http://localhost:8585/voitures",
            success: function(response) {
                console.log(response);
                let row = "";
                $.each(response._embedded.voitures, (index, resp) => {
                const id = resp._links.self.href.split("/").pop();
                    row +=
                        `<tr>
                            <th>${id}</th>
                            <td>${resp.marqueVoiture}</td>
                            <td>${resp.nbPlace}</td>
                            <td>${resp.prixVoiture}</td>
                            <td>${resp.typeVoiture}</td>
                        </tr>`;
                });

                $.each(response.object, (index, tombil) => {
                    const id = resp._links.self.href.split("/").pop();
                        row +=
                            `<tr>
                                <th>${tombil.id}</th>
                                <td>${resp.marqueVoiture}</td>
                                <td>${resp.nbPlace}</td>
                                <td>${resp.prixVoiture}</td>
                                <td>${resp.typeVoiture}</td>
                            </tr>`;
                    });

                $("#tableVoiture tbody").html(row);
            }
        });
    }
}

$(() => {
    const voiture = new Voiture();
    voiture.getData();
});
















// class Voiture {
//     constructor() {}

//     getData() {



//         $.ajax({
//             url: "http://localhost:8585/voitures",
//             type: "GET",
//             dataType: "json",
//             success: function(response) {
//                 console.log(response);
//               var trHTML = '';
//               $.each(response, function(i, item) {
//                 trHTML += '<tr><td>' + item.id_matricule + '</td><td>' + item.marque_voiture + '</td><td>' + item.nb_place + '</td><td>' + item.prix_voiture + '</td><td>' + item.type_voiture + '</td></tr>';
//               });
//               $('#tableVoiture tbody').append(trHTML);
//             },
//             error: function(xhr, status, error) {
//               console.log("Erreur : " + error);
//             }
//           });
          

//         // $.ajax({
//         //     url: "http://localhost:8585/voitures",
//         //     type: "GET",
//         //     dataType: "json",
//         //     success: function(response) {
//         //       $.each(response, function(i, item) {
//         //         var tr = $("<tr>");
//         //         $("<td>").html(item.id_matricule || "").appendTo(tr);
//         //         $("<td>").html(item.marque_voiture || "").appendTo(tr);
//         //         $("<td>").html(item.nb_place || "").appendTo(tr);
//         //         $("<td>").html(item.prix_voiture || "").appendTo(tr);
//         //         $("<td>").html(item.type_voiture || "").appendTo(tr);
//         //         $(tr).appendTo("#tableVoiture tbody");
//         //       });
//         //     },
//         //     error: function(xhr, status, error) {
//         //       console.log("Erreur : " + error);
//         //     }
//         //   });



//         // $.ajax({
//         //     url:"http://localhost:8585/voitures",
//         //     type:"GET",
//         //     dataType: "json",
//         //     success: function(data) {
//         //         console.log(data);
//         //         let row = "";
//         //         $.each(data, (index, resp) => {
//         //             row +=
//         //                 `<tr>
//         //                     <th>${resp.id_matricule}</th>
//         //                     <td>${resp.marqueVoiture}</td>
//         //                     <td>${resp.nb_place}</td>
//         //                     <td>${resp.prix_voiture}</td>
//         //                     <td>${resp.type_voiture}</td>
//         //                 </tr>`;
//         //         })
//         //         $("#tableVoiture tbody").html(row)
//         //     },
//         //     error: function(xhr, status, error) {
//         //       // Gestion des erreurs ici
//         //       console.log("Erreur : " + error);
//         //     }
//         // })
//         // $.getJSON("http://localhost:8585/voitures", function(data) {
//         //     let row = "";
//         //     $.each(data, function(index, element) {
//         //         row += "<tr><td>" + element.idMatricule + "</td><td>" + element.marqueVoiture + "</td><td>" + element.nb_place + "</td><td>" + element.prix_voiture + "</td><td>" + element.type_voiture + "</td></tr>";
//         //     });
//         //     $("#tableVoiture tbody").html(row)
//         // });
//     }
// }

// $(() => {
//     const voiture = new Voiture();


//     voiture.getData()
// })
