import { Component } from '@angular/core';

@Component({
  selector: 'shared-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styles: `
    .spinner-container {
      border-radius: 100px;
      bottom: 10px;
      padding: 5px;
      position: absolute;
      right: 10px;
    }

    .spinner-container span {
      color: white;
      padding-inline: 10px;
    }
  `
})
export class LoadingSpinnerComponent {

}
