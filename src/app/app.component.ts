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
    {message: 'log 1', time: '12:23:33'},
    {message: 'log 2', time: '12:23:34'},
    {message: 'log 3', time: '12:23:35'},
    {message: 'log 4', time: '12:23:36'},
    {message: 'log 5', time: '12:23:37'},
    {message: 'log 6', time: '12:23:38'},
    {message: 'log 7', time: '12:23:39'},
  ];

  logStream$ = timer(0, 1000).pipe(
    take(this.logs.length),
    map(i => this.logs[i])
  );


  ngOnInit() {
  }


}
