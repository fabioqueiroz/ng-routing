import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MessageService } from './message.service';

@Component({
  templateUrl: './message.component.html',
  styles: [
    '.message-row { margin-bottom: 10px }'
  ]
})
export class MessageComponent {
  get messages() {
    return this._messageService.messages;
  }

  constructor(private _messageService: MessageService,
              private _router: Router) { }

  close(): void {
    // Close the popup.
    this._router.navigate([{ outlets: { popup: null }}]);
    this,this._messageService.isDisplayed = false;
  }
}
