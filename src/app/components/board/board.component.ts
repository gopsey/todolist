import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  public listArrayFromBoard = [];
  listIdToDelete: any = 0;
  cardIdToDelete: any = 0;

  constructor() { }

  ngOnInit(): void {
  }

  addNewList() {
    this.listArrayFromBoard.push(
      {
        'titleName': `List ${this.listArrayFromBoard.length + 1}`,
        'deleteListId': this.listArrayFromBoard.length,
        'addCardId': this.listArrayFromBoard.length,
        'cards': {}
      }
    );
  }

  delete(event: any) {
    this.listArrayFromBoard.splice(event.target.id, 1);
  }

  updateCards(cards: any) {
    let currentListForCardUpdate = cards[0].listId;
    this.listArrayFromBoard[currentListForCardUpdate].cards = cards;
  }

  deleteCard(cardIdToDelete: any) {
    this.cardIdToDelete = cardIdToDelete;
  }

  setListToDeleteCard(event: any) {
    this.listIdToDelete = event;
    this.listArrayFromBoard[this.listIdToDelete].cards.splice(this.listArrayFromBoard[this.listIdToDelete].cards[this.cardIdToDelete].listId, 1)
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.listArrayFromBoard, event.previousIndex, event.currentIndex);
  }
}
