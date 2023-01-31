import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

books?:Book[];
currentBook:Book= {};
currentIndex = -1;
title = '';

constructor(private booksService: BooksService) { }

  ngOnInit(): void {
    this.retrieveBooks();

  }

  retrieveBooks(): void {
    this.booksService.getAll()
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
    this.booksService.deleteAll()
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

    this.booksService.findByTitle(this.title)
      .subscribe({
        next: (data) => {
          this.books = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

}
