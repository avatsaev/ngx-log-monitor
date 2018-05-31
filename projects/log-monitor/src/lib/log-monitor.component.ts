import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input, NgZone,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {LogMessage} from './models/log-message.model';
import {normalizeLogMessage} from './helpers/log-message.helper';

@Component({
  selector: 'log-monitor',
  templateUrl: './log-monitor.component.html',
  styleUrls: ['./log-monitor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogMonitorComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() title;
  @Input() msgStream: LogMessage;
  @Input() history: LogMessage[] = [];
  @Input() theme: 'dark' | 'light' = 'dark';
  @Input() icons = true;
  @Input() customClass = 'log-container';
  @Input() animated = true;
  @ViewChild('container') container: ElementRef;

  constructor(private zone: NgZone) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes.history) {
      this.history = changes.history.currentValue.map(normalizeLogMessage);
    }

    if (changes.msgStream && changes.msgStream.currentValue) {

      this.zone.run(() => {
        const normalizedMsg = normalizeLogMessage(changes.msgStream.currentValue);
        this.history.push(normalizedMsg);
        setTimeout(() => this.scrollToBottom());
      });
    }
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }


  onScroll(e: Event) {
    // console.log(e);

    // console.log(this.container.nativeElement.scrollTop, this.container.nativeElement.scrollHeight);
  }

  private scrollToBottom() {
    this.container.nativeElement.scrollTop = this.container.nativeElement.scrollHeight;
  }

}
