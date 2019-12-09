import { HttpHeaders } from '@angular/common/http';

export abstract class HttpService {
    // TODO injectable config
    // TODO injectable localStorage ???
    public url = 'http://localhost:3000';

    // TODO abstract class HttpService
    public httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

}
