import { Component, EventEmitter, Input, Output } from "@angular/core";
import removeMd from "remove-markdown";
import { Note } from "../../../../store/notes/notes.interfaces";

const MAX_LENGTH = 32;

@Component({
    selector: "app-note-list-item",
    templateUrl: "./note-list-item.component.html",
    styleUrls: ["./note-list-item.component.css"],
})
export class NoteListItemComponent {
    @Input() private readonly note: Note | undefined = undefined;

    @Input() private readonly selected: boolean = false;

    @Output() private readonly clickNote = new EventEmitter<Note>();

    // Title
    // Last edited | Some of the body
    // Tags

    public getNoteName(): string {
        const note = this.note;

        if (note === undefined) {
            return "";
        }

        const substringTitle = note.content.substring(0, MAX_LENGTH);
        const sanitizedSubstringTitle = removeMd(substringTitle);

        return sanitizedSubstringTitle;
    }

    public onClickNote(): void {
        this.clickNote.emit(this.note);
    }
}
