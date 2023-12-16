import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'e-learn-dev';
}

export const ToastrOptions = {
  positionClass: 'toast-top-center',
  closeButton: false,
  tapToDismiss: false,
  enableHtml: true
};
