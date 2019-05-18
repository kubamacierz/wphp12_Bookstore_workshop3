$(function () {

    const URL = "http://localhost:8000/book";

    function showError(xhr, status, error) {
        console.log(xhr, status, error);
        showModal("Error: " + error);
    }

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

    $.getJSON(URL)
        .done(function (result) {
            console.log(result);
            const bookListHTML = result.success.map(renderBook).join("");
            $("#booksList").html(bookListHTML);
        })
        .fail(showError);

    $('#booksList').on('click', '.btn-book-remove', function () {
        console.log(`Deleting book with id: ${this.dataset.id}`);

        const button = this;

        $.ajax({
            url: URL + "/" + this.dataset.id,
            type: "DELETE"
        })
            .done(function () {
                console.log("DELETED");
                $(button).closest('.list-group-item').remove();
            })
            .fail(showError);
    });

    $('#bookAdd').on('submit', function (event) {
        event.preventDefault();

        console.log(this.elements.title.value, this.elements.description.value);

        let book = {
            title: this.elements.title.value,
            description: this.elements.description.value
        };

        $.post({
            url: URL,
            data: book
        }).done(function (res) {
            book = res.success[0];
            $('#booksList').append($(renderBook(book)));
        }).fail(showError);
    })

});