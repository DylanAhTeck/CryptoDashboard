import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

  faSearch = faSearch;
  myControl = new FormControl()

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.myControl.value == '') return;
    var query = (this.myControl.value).toUpperCase();
    this.router.navigate(['/details', query])
  }

}
