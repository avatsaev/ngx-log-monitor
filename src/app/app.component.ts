import {Component, OnInit} from '@angular/core';
import {LogMessage} from 'ngx-log-monitor';
import {timer} from 'rxjs';
import {map, take, tap} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'app';
  logs: LogMessage[] = [
    {message: 'A simple log message'},
    {message: 'A success message', type: 'SUCCESS'},
    {message: 'A warning message', type: 'WARN'},
    {message: 'An error message', type: 'ERR'},
    {message: 'An info message', type: 'INFO'},
  ];

  logStream$ = timer(0, 1000).pipe(
    take(this.logs.length),
    map(i => this.logs[i])
  );


  ngOnInit() {
  }


}
