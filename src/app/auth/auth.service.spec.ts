import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { AuthRequest, AuthSuccessResponse } from "./auth.interfaces";

import { AuthService } from "./auth.service";

describe("AuthService", () => {
    let authService: AuthService;
    let httpSpy: jasmine.SpyObj<HttpClient>;

    beforeEach(() => {
        const _httpSpy = jasmine.createSpyObj("HttpClient", ["post"]);

        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [
                {
                    provide: HttpClient,
                    useValue: _httpSpy,
                },
                AuthService,
            ],
        });

        authService = TestBed.get(AuthService);
        httpSpy = TestBed.get(HttpClient);
    });

    it("should be created", () => {
        const service: AuthService = TestBed.get(AuthService);
        expect(service).toBeTruthy();
    });

    it("should be able to authenticate a user", async () => {
        const email = "foo";
        const password = "bar";
        const token = "foo";

        const expectedAuthRequest: AuthRequest = { auth: { email, password } };
        const expectedAuthResponse: AuthSuccessResponse = {
            status: 200,
            resource: { token },
        };

        httpSpy.post.and.returnValue(of(expectedAuthResponse));

        const response = await authService.authenticateUser(email, password).toPromise();

        // this is valuable (confirms loginRequest being formatted properly)
        expect(httpSpy.post).toHaveBeenCalledWith(
            `${authService.url}/auth`,
            expectedAuthRequest,
            authService.httpOptions,
        );
        // this isn't particularly valuable
        expect(response).toBe(expectedAuthResponse);
    });
});
