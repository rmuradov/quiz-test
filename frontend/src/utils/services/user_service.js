import { ApiService } from './_service';

export class UserService extends ApiService {
    constructor () {
        super();
    }

    login(data) {
        this.setRequestHeaders();

        return this
            .post('/auth/login', data)
            .then(function({ data, status, statusText, headers }) {
                localStorage.setItem('api_token', data.api_token);

                return data;
            })
            .catch(function(error) {
                throw error;
            });
    }

    logout(){
        localStorage.removeItem('api_token');
    }

    loadProfile() {
        //return Promise.resolve({data: JSON.parse(localStorage.getItem('current_user'))});
    }

}

export default new UserService;
