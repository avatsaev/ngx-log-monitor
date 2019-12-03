import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input, NgZone,
  OnChanges,
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
export class LogMonitorComponent implements OnChanges, AfterViewInit {

  @Input() title;
  @Input() logStream: LogMessage;
  @Input() history: LogMessage[] = [];
  @Input() theme: 'dark' | 'light' = 'dark';
  @Input() icons = true;
  @Input() customClass = 'log-container';
  @Input() animated = true;
  @ViewChild('container', {static: false}) container: ElementRef;

  constructor(private zone: NgZone) { }

  ngOnChanges(changes: SimpleChanges) {

    if (changes['history']) {
      this.history = changes['history'].currentValue.map(normalizeLogMessage);
    }

    if (changes['logStream'] && changes['logStream'].currentValue) {

      this.zone.run(() => {
        const normalizedMsg = normalizeLogMessage(changes['logStream'].currentValue);
        this.history.push(normalizedMsg);
        setTimeout(() => this.scrollToBottom());
      });
    }
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  private scrollToBottom() {
    this.container.nativeElement.scrollTop = this.container.nativeElement.scrollHeight;
  }

}
