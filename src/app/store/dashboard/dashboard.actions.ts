import { createAction, props } from "@ngrx/store";
import { AppBootProps } from "./dashboard.interfaces";

export const appBootAttempt = createAction("[Dashboard] App boot attempt", props<AppBootProps>());

export const appBootSuccess = createAction("[Dashboard] App boot success");

export const appBootFailure = createAction("[Dashboard] App boot failure");

export type DashboardActions =
    | ReturnType<typeof appBootAttempt>
    | ReturnType<typeof appBootSuccess>
    | ReturnType<typeof appBootFailure>;
