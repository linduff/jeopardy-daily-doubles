import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-clue',
  templateUrl: './clue.component.html',
  styleUrls: ['./clue.component.css']
})
export class ClueComponent {

  @Input()
  percentage: any

  @Input()
  cardColor: any

  constructor() { }

  ngOnInit(): void {
  }

}
