import { createReducer, on } from '@ngrx/store';
import {
    appBootAttempt,
    appBootFailure,
    appBootSuccess,
    DashboardActions,
} from './dashboard.actions';

export interface DashboardState {
    loading: boolean;
    error: string | undefined;
}

export const initialState: DashboardState = {
    loading: true,
    error: undefined,
};

export const _dashboardReducer = createReducer<DashboardState, DashboardActions>(
    initialState,
    on(
        appBootSuccess,
        (state: DashboardState): DashboardState => {
            return {
                ...state,
                loading: false,
                error: undefined,
            };
        },
    ),
    on(
        appBootFailure,
        (state: DashboardState): DashboardState => ({
            ...state,
            loading: false,
            error: undefined,
        }),
    ),
    on(
        appBootAttempt,
        (state: DashboardState): DashboardState => ({ ...state, loading: true }),
    ),
);

// tslint:disable-next-line:typedef
export function dashboardReducer(
    state: DashboardState | undefined,
    actions: DashboardActions,
) {
    return _dashboardReducer(state, actions);
}
