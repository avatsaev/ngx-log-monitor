import {
  AfterContentChecked, AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {LogMessage} from './models/log-message.model';

@Component({
  selector: 'log-monitor',
  templateUrl: './log-monitor.component.html',
  styleUrls: ['./log-monitor.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogMonitorComponent implements OnInit, OnChanges, AfterViewInit, AfterViewChecked {

  @Input() msgStream: LogMessage;
  @Input() history: LogMessage[] = [];
  @Input() theme: 'dark' | 'light' = 'light';
  @ViewChild('container') container: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {

    console.log(changes);
    if (changes.msgStream.currentValue) {
      this.history.push(changes.msgStream.currentValue);
    }
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }


  private scrollToBottom() {
    this.container.nativeElement.scrollTop = this.container.nativeElement.scrollHeight;
  }

}
