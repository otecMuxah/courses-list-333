import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SpinnerService } from './services/spiner.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  isLoad$: Observable<boolean>;
  constructor(private spinnerService: SpinnerService) {
    this.isLoad$ = this.spinnerService.spinnerState$;
  }
  title = 'e-learn-dev'; // unused
}

export const ToastrOptions = {
  positionClass: 'toast-top-center',
  closeButton: false,
  tapToDismiss: false,
  enableHtml: true,
};
