import { AuthFailureResponse, AuthSuccessResponse } from '../../auth/auth.interfaces';
import { authAttempt, authDismissError, authFailure, authSuccess } from './auth.actions';
import { authReducer, initialState } from './auth.reducer';

describe('Auth reducer', () => {
    it('sets token, loading, and error on authSuccess', () => {
        const token = 'foo';
        const successResponse: AuthSuccessResponse = {
            status: 200,
            resource: {
                token
            }
        };

        const newState = authReducer(
            initialState,
            authSuccess(successResponse),
        );

        expect(newState).toEqual({
            ...initialState,
            token
        });
    });

    it('sets token, loading, and error on authFailure', () => {
        const msg = 'foo';
        const failureResponse: AuthFailureResponse = {
            status: 500,
            error: {
                msg
            }
        };

        const newState = authReducer(
            initialState,
            authFailure(failureResponse),
        );

        expect(newState).toEqual({
            ...initialState,
            token: undefined,
            loading: false,
            error: msg
        });
    });

    it('sets loading on authAttempt', () => {
        const newState = authReducer(
            initialState,
            authAttempt({ email: 'foo', password: 'bar'}),
        );

        expect(newState).toEqual({
            ...initialState,
            loading: true,
        });
    });

    it('sets error on authDismissError', () => {
        const newState = authReducer(
            initialState,
            authDismissError(),
        );

        expect(newState).toEqual({
            ...initialState,
            error: undefined
        });
    });
});
