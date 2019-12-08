import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable, of, ReplaySubject } from 'rxjs';
import { AuthFailureResponse, AuthSuccessResponse } from '../../auth/auth.interfaces';
import { AuthService } from '../../auth/auth.service';
import { authAttempt, authFailure, authSuccess } from './auth.actions';
import { AuthEffects } from './auth.effects';

describe('Auth effects', () => {
    let routerMock: jasmine.SpyObj<Router>;
    let authServiceMock: jasmine.SpyObj<AuthService>;
    let authEffects: AuthEffects;
    let actions: ReplaySubject<Action>;

    beforeEach(() => {

        routerMock = jasmine.createSpyObj('Router', ['navigate']);
        authServiceMock = jasmine.createSpyObj('AuthService', ['authenticateUser', 'setToken']);
        actions = new ReplaySubject<Action>();

        TestBed.configureTestingModule({
            providers: [
                provideMockActions(() => actions),
                { provide: Router, useValue: routerMock },
                { provide: AuthService, useValue: authServiceMock },
                AuthEffects
            ],
        });

        authEffects = TestBed.get(AuthEffects);
    });


    describe('authorize', () => {
        const authSuccessResponse: AuthSuccessResponse = {
            status: 200,
            resource: {
                token: 'token'
            }
        };
        const authFailureResponse: AuthFailureResponse = {
            status: 500,
            error: {
                msg: 'msg'
            }
        };

        beforeEach(() => {
            // Simulate an authAttempt action
            actions = new ReplaySubject<Action>();
            actions.next(authAttempt);
        });

        // tslint:disable-next-line:typedef
        it('stores the token in localStorage for a good login', (done) => {
            authServiceMock.authenticateUser.and.returnValue(of(authSuccessResponse));

            authEffects.authorize$.subscribe(() => {
                expect(authServiceMock.setToken).toHaveBeenCalledWith(authSuccessResponse.resource.token);
                done();
            });
        });

        // tslint:disable-next-line:typedef
        it('navigates to / for a good login', (done) => {
            authServiceMock.authenticateUser.and.returnValue(of(authSuccessResponse));

            authEffects.authorize$.subscribe(() => {
                expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
                done();
            });
        });

        // tslint:disable-next-line:typedef
        it('returns authSuccess for a good login', (done) => {
            authServiceMock.authenticateUser.and.returnValue(of(authSuccessResponse));

            authEffects.authorize$.subscribe((action: Action) => {
                expect(action.type).toBe(authSuccess.type);
                done();
            });
        });

        // tslint:disable-next-line:typedef
        it('returns authFailure for a bad login', (done) => {
            authServiceMock.authenticateUser.and.returnValue(of(authFailureResponse));

            authEffects.authorize$.subscribe((action: Action) => {
                expect(action.type).toBe(authFailure.type);
                done();
            });
        });

    });
});
