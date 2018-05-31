import { NgModule } from '@angular/core';
import { LogMonitorComponent } from './log-monitor.component';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [CommonModule],
  declarations: [LogMonitorComponent],
  exports: [LogMonitorComponent]
})
export class LogMonitorModule { }
