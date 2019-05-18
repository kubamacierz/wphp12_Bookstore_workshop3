$(function () {

    function renderBook(book) {
        return `<li class="list-group-item">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <span class="bookTitle">${book.title}</span>
                    <button data-id="${book.id}"
                            class="btn btn-danger pull-right btn-xs btn-book-remove"><i
                            class="fa fa-trash"></i>
                    </button>
                    <button data-id="${book.id}"
                            class="btn btn-primary pull-right btn-xs btn-book-show-description"><i
                            class="fa fa-info-circle"></i>
                    </button>
                </div>
                <div class="panel-body book-description">${book.description}</div>
            </div>
        </li>`;
    }

    $.getJSON("http://localhost:8000/book")
        .done(function (result) {
            console.log(result);
            const bookListHTML = result.success.map(renderBook).join("");
            $("#booksList").html(bookListHTML);
        })
        .fail(function (xhr, status, error) {
            console.log(xhr, status, error);
            showModal("Error");
        })

});