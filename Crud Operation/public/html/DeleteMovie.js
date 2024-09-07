function deletemovie(id) {
    
    if (confirm("Are you sure you want to delete?")) {
        console.log("MovieId:",id);
        // document.getElementById('delete-movie-' + id).submit();
        window.location.href = "/DeleteMovie?id=" + id;
    }
}