import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input() titleName;
  @Input() deleteListId;
  @Input() addCardId;
  @Output() deleteListEvent = new EventEmitter<any>();
  @Output() cardArrayToParent = new EventEmitter<any>();
  @Output() listToDeleteCard = new EventEmitter<any>();

  cardArray: any = [];
  cardTitle: string = '';
  deleteCardId: any = 0;
  commentTextValue: any = [];

  constructor() { }

  ngOnInit(): void {
  }

  openModal(cardIndex: any) {
    document.getElementById("myModal").style.display = "block";
    this.cardTitle = this.cardArray[cardIndex].titleName;
    this.deleteCardId = cardIndex;
    (<HTMLElement>document.querySelector('.deleteClass')).setAttribute('id', this.deleteCardId);
    (<HTMLElement>document.querySelector('.listValue')).setAttribute('id', this.cardArray[0].listId);
  }

  closeModal() {
    document.getElementById("myModal").style.display = "none";
  }
  
  closeModalOutside() {
    if (event.target == document.getElementById("myModal")) {
      document.getElementById("myModal").style.display = "none";
    }
  }

  deleteList(event: any) {
    this.deleteListEvent.emit(event);
  }

  addNewCard(event: any) {
    this.cardArray.push({
      'titleName': `Card Title`,
      'listId': this.addCardId
    });
    this.cardArrayToParent.emit(this.cardArray.slice());
  }

  deleteCard(event: any) {
    this.cardArray.splice(event.target.id, 1);
    this.cardArrayToParent.emit(this.cardArray.slice());
    this.listToDeleteCard.emit(event.target.nextElementSibling.id);
    this.closeModal();
  }

  saveComment() {
    let commentTextValue = (document.getElementById("commentText") as HTMLTextAreaElement).value;
    this.commentTextValue.push(commentTextValue);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.cardArray, event.previousIndex, event.currentIndex);
  }
}
