import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-add-books',
  templateUrl: './add-books.component.html',
  styleUrls: ['./add-books.component.css']
})
export class AddBooksComponent implements OnInit {
  Books : Book = {
    title: '',
    description: '',
    author:'',
    year:'',
    publisher:'',
  };
  submitted = false;

  constructor(private booksService: BooksService) { }

  ngOnInit(): void {
  }

  saveBook(): void {
    const data = {
      title: this.Books.title,
      description: this.Books.description,
      author: this.Books.author,
      year: this.Books.year,
      publisher:this.Books.publisher
    };

    this.booksService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newBook(): void {
    this.submitted = false;
    this.Books = {
      title: '',
      description: '',
      author:'',
      year:'',
      publisher:'',
    };
  }

}

