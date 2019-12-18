import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-note-routing',
    templateUrl: './note-routing.component.html',
    styleUrls: ['./note-routing.component.css'],
})
export class NoteRoutingComponent implements OnInit {
    constructor() {}

    public ngOnInit(): void {
        // on init, need to get folderId from route
        // need to dispatch getNotesAttempt
    }
}
