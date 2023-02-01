import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-add-books',
  templateUrl: './add-books.component.html',
  styleUrls: ['./add-books.component.css']
})
export class AddBooksComponent implements OnInit {
  Book : Book = {
    title: '',
    description: '',
    author:'',
    year:'',
    publisher:'',
  };
  submitted = false;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
  }

  saveBook(): void {
    const data = {
      title: this.Book.title,
      description: this.Book.description,
      author: this.Book.author,
      year: this.Book.year,
      publisher:this.Book.publisher
    };

    this.bookService.create(data)
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
    this.Book = {
      title: '',
      description: '',
      author:'',
      year:'',
      publisher:'',
    };
  }

}

