function deleteCategory(Category_id) {

    if (confirm("Are you Sure Do you want to Delete?")) {
        console.log("Category_id:",Category_id);
        window.location.href = "/DeleteCategory?Category_id=" + Category_id;
        window.location.href = "/DeleteMovie?id=" + id;
    }
}