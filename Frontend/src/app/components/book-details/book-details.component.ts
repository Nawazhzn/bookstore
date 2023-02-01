import { Component, Input, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit{

  @Input() viewMode = false;

  @Input() currentBook: Book = {

    title: '',
    description: '',
    author:'',
    year:'',
    publisher:'',

  };

message ='';

constructor(
  private bookService: BookService,
  private route: ActivatedRoute,
  private router: Router) { }

ngOnInit(): void {
  if (!this.viewMode) {
    this.message = '';
    this.getBook(this.route.snapshot.params["id"]);
  }
}

getBook(id: string): void {
  this.bookService.get(id)
    .subscribe({
      next: (data) => {
        this.currentBook = data;
      },
      error: (e) => console.error(e)
    });
}

updatePublished(status: boolean): void {
  const data = {
    title: this.currentBook.title,
    description: this.currentBook.description,
    author: this.currentBook.author,
    year: this.currentBook.year,
    publisher:this.currentBook.publisher
  };


  this.message = '';

  this.bookService.update(this.currentBook.id, data)
    .subscribe({
      next: (res) => {
        console.log(res);
        this.currentBook.id = status;
        this.message = res.message ? res.message : 'The status was updated successfully!';
      },
      error: (e) => console.error(e)
    });
}

updateBook(): void {
  this.message = '';

  this.bookService.update(this.currentBook.id, this.currentBook)
    .subscribe({
      next: (res) => {
        console.log(res);
        this.message = res.message ? res.message : 'This book was updated successfully!';
      },
      error: (e) => console.error(e)
    });
}


deleteBook(): void {
  this.bookService.delete(this.currentBook.id)
    .subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/books']);
      },
      error: (e) => console.error(e)
    });
}


}
