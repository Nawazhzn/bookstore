import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-bookhome',
  templateUrl: './bookhome.component.html',
  styleUrls: ['./bookhome.component.css']
})
export class BookhomeComponent implements OnInit {

  books?:Book[];
  currentBook:Book= {};
  currentIndex = -1;
  title = '';

  constructor(private bookService: BookService) { }

    ngOnInit(): void {
      this.retrieveBooks();

    }

    retrieveBooks(): void {
      this.bookService.getAll()
        .subscribe({
          next: (data) => {
            this.books = data;
            console.log(data);
          },
          error: (e) => console.error(e)
        });
    }

    refreshList(): void {
      this.retrieveBooks();
      this.currentBook = {};
      this.currentIndex = -1;
    }

    setActiveBook(books: Book, index: number): void {
      this.currentBook = books;
      this.currentIndex = index;
    }

    removeAllBooks(): void {
      this.bookService.deleteAll()
        .subscribe({
          next: (res) => {
            console.log(res);
            this.refreshList();
          },
          error: (e) => console.error(e)
        });
    }

    searchTitle(): void {
      this.currentBook = {};
      this.currentIndex = -1;

      this.bookService.findByTitle(this.title)
        .subscribe({
          next: (data) => {
            this.books = data;
            console.log(data);
          },
          error: (e) => console.error(e)
        });
    }


}
