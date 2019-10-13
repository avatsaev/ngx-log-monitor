# NGX Log Monitor - Log Monitoring Component for Angular 


DEMO: https://ngx-log-monitor.surge.sh


![](https://i.imgur.com/GLFbLWN.gif)


## Installation and setup


Install:

`npm i -S ngx-log-monitor`

Import the module:

```typescript
import {LogMonitorModule} from 'ngx-log-monitor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LogMonitorModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

```


## Usage example

Log Message interface:

```typescript
interface LogMessage {
  type?: 'LOG' | 'INFO' | 'WARN' | 'ERR' | 'SUCCESS';
  timestamp?: string;
  message: string;
}

```

- If the type isn't set, 'LOG' type will be used as default
- If timestamp isn't set, current locale date will be used 

```typescript

import {LogMessage as NgxLogMessage} from 'ngx-log-monitor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{

  restoredLogs: NgxLogMessage[] = [
    {message: 'A simple restored log message'},
    {message: 'A success restored message', type: 'SUCCESS'},
    {message: 'A warning restored message', type: 'WARN'},
    {message: 'An error restored message', type: 'ERR'},
    {message: 'An info restored message', type: 'INFO'},
  ];

  logs: NgxLogMessage[] = [
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

}


```

```html

<log-monitor
    [logStream]="logStream$ | async"
    theme="dark"
    title="NGRX action dispatch logs"
    [animated]="true"
    [icons]="true"
    [history]="restoredLogs" 
></log-monitor>

```

`logStream$` must be an observable that emits object literals conform to the `LogMessage` interface


