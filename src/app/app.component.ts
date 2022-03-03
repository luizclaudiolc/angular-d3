import { Component, Output } from '@angular/core';
import { GenerateUuidService } from 'src/utils/generate-uuid.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private makeId: GenerateUuidService) {}
  title = 'angular-d3';
}
