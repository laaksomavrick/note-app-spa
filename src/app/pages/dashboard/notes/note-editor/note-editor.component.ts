import {
    AfterContentInit,
    AfterViewChecked,
    AfterViewInit,
    Component,
    OnInit,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { debounceTime, take } from 'rxjs/operators';
import { AppStore } from '../../../../app.store';
import {
    setSelectedNote,
    updateNoteAttempt,
} from '../../../../store/notes/notes.actions';
import { Note, UpdateNoteAttemptProps } from '../../../../store/notes/notes.interfaces';

interface NoteForm {
    name?: string;
    content?: string;
}

@Component({
    selector: 'app-note-editor',
    templateUrl: './note-editor.component.html',
    styleUrls: ['./note-editor.component.css'],
})
export class NoteEditorComponent implements OnInit {
    private readonly NOTE_EDITOR_DEBOUNCE = 750;

    public selectedNote$: Observable<Note | undefined> = this.store.select(
        ({ notesState }: AppStore) => notesState.selectedNote,
    );

    public noteForm = new FormGroup({
        name: new FormControl(''),
        content: new FormControl(''),
    });

    constructor(
        private readonly route: ActivatedRoute,
        private readonly store: Store<AppStore>,
    ) {}

    public ngOnInit(): void {
        this.route.paramMap.subscribe((params: ParamMap) => {
            const maybeNoteId = params.get('noteId');
            if (maybeNoteId) {
                const noteId = parseInt(maybeNoteId, 10);
                this.store.dispatch(setSelectedNote({ noteId }));
            }
        });

        this.selectedNote$.subscribe((selectedNote: Note | undefined): void => {
            if (selectedNote) {
                this.noteForm.controls['name'].setValue(selectedNote.name, {
                    emitEvent: false,
                });
                this.noteForm.controls['content'].setValue(selectedNote.content, {
                    emitEvent: false,
                });
            }
        });

        this.noteForm.valueChanges
            .pipe(debounceTime(this.NOTE_EDITOR_DEBOUNCE))
            .subscribe(async (noteForm: NoteForm) => {
                const { name, content } = noteForm;
                const selectedNote = await this.selectedNote$.pipe(take(1)).toPromise();

                if (selectedNote) {
                    const { id, folderId } = selectedNote;
                    const updatedNote: UpdateNoteAttemptProps = {
                        id,
                        folderId,
                        name,
                        content,
                    };

                    this.store.dispatch(updateNoteAttempt(updatedNote));
                }
            });
    }
}
