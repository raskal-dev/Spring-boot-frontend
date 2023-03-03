$(document).ready(function() {
	// Fonction pour charger une page via AJAX
	function chargerPage(page) {
		$.ajax({
			url: page + '.html',
			method: 'GET',
			success: function(data) {
				$('#content').html(data);
			},
			error: function() {
				alert('Erreur lors du chargement de la page ' + page);
			}
		});
	}

	// Au chargement de la page, on charge la page d'accueil
	chargerPage('accueil');

	// On écoute le clic sur les liens de la navbar
	$('nav a').click(function(e) {
		e.preventDefault(); // On empêche le comportement par défaut du clic sur le lien

		// On récupère le data-page du lien sur lequel on a cliqué
		var page = $(this).data('page');

		// On charge la page correspondante via AJAX
		chargerPage(page);
	});
});
