import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { debounceTime, take } from "rxjs/operators";
import { AppStore } from "../../../../app.store";
import { setSelectedNote, updateNoteAttempt } from "../../../../store/notes/notes.actions";
import { Note, UpdateNoteAttemptProps } from "../../../../store/notes/notes.interfaces";

interface NoteForm {
    content: string;
}

enum EditorSelection {
    Viewer,
    Editor,
}

@Component({
    selector: "app-note-editor",
    templateUrl: "./note-editor.component.html",
    styleUrls: ["./note-editor.component.css"],
})
export class NoteEditorComponent implements OnInit {
    private readonly NOTE_EDITOR_DEBOUNCE = 750;

    public selectedNote$: Observable<Note | undefined> = this.store.select(
        ({ notesState }: AppStore) => notesState.selectedNote,
    );

    public noteForm = new FormGroup({
        content: new FormControl(""),
    });

    public noteMarkdownContent: string = "";

    public editorControls = EditorSelection;

    public selectedControl = EditorSelection.Viewer;

    constructor(private readonly route: ActivatedRoute, private readonly store: Store<AppStore>) {}

    public ngOnInit(): void {
        this.route.paramMap.subscribe((params: ParamMap) => {
            const maybeNoteId = params.get("noteId");
            if (maybeNoteId) {
                const noteId = parseInt(maybeNoteId, 10);
                this.store.dispatch(setSelectedNote({ noteId }));
            }
        });

        this.selectedNote$.subscribe((selectedNote: Note | undefined): void => {
            if (selectedNote) {
                this.noteForm.controls["content"].setValue(selectedNote.content, {
                    emitEvent: false,
                });

                this.setNoteMarkdownContent();
            }
        });

        this.noteForm.valueChanges
            .pipe(debounceTime(this.NOTE_EDITOR_DEBOUNCE))
            .subscribe(async (noteForm: NoteForm) => {
                const { content } = noteForm;
                const selectedNote = await this.selectedNote$.pipe(take(1)).toPromise();

                if (selectedNote) {
                    const { id, folderId } = selectedNote;
                    const updatedNote: UpdateNoteAttemptProps = {
                        id,
                        folderId,
                        content,
                    };

                    this.store.dispatch(updateNoteAttempt(updatedNote));
                }
            });
    }

    public onClickView(): void {
        this.selectedControl = this.editorControls.Viewer;
    }

    public onClickEdit(): void {
        this.selectedControl = this.editorControls.Editor;
    }

    public setNoteMarkdownContent(): void {
        const content = this.noteForm.get("content");

        if (!content) {
            return;
        }

        this.noteMarkdownContent = content.value;
    }
}
