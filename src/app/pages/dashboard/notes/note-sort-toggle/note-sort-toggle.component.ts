import { Component, EventEmitter, Input, Output } from "@angular/core";
import { NOTE_ORDER_BY_DEFAULT, NoteOrderByParams } from "../notes.service";

// TODO: on selection of currentNoteOrderBy as a btn do asc/desc

@Component({
    selector: "app-note-sort-toggle",
    templateUrl: "./note-sort-toggle.component.html",
    styleUrls: ["./note-sort-toggle.component.css"],
})
export class NoteSortToggleComponent {
    @Input() public currentNoteOrderBy: NoteOrderByParams = NOTE_ORDER_BY_DEFAULT;

    @Output() public sortClick = new EventEmitter<NoteOrderByParams>();

    public onSortClick(): void {
        // TODO if this gets bigger, use another pattern
        if (this.currentNoteOrderBy === NoteOrderByParams.UpdatedAt) {
            this.sortClick.emit(NoteOrderByParams.CreatedAt);
        } else if (this.currentNoteOrderBy === NoteOrderByParams.CreatedAt) {
            this.sortClick.emit(NoteOrderByParams.UpdatedAt);
        }
    }

    public getCurrentNoteOrderByText(): string {
        switch (this.currentNoteOrderBy) {
            case NoteOrderByParams.CreatedAt:
                return "Creation date";
            case NoteOrderByParams.UpdatedAt:
                return "Last updated";
            default:
                return NOTE_ORDER_BY_DEFAULT;
        }
    }
}
