<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Str;
use Validator;
use Illuminate\Validation\Rule;

use App\Complex;
use App\Models;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/';

    public function username() {
        return 'name';
    }

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    /**
     * @api {post} /auth/login Login
     * @apiName Login
     * @apiGroup Auth
     */

    public function login(Request $request){
        $this->validateLogin($request);

        if ($this->attemptLogin($request)) {
            $token = Str::random(60);
            $this->guard()->user()->api_token = $token;
            $this->guard()->user()->save();

            $user = $this->guard()->user()->toArray();
            $user['api_token'] = $token;

            return response()->json($user);
        }

        return response(
            [
                'errors' => [
                    'auth' => 'auth.failed',
                ],
            ], Response::HTTP_UNAUTHORIZED);
    }

    /**
     * @api {post} /auth/logout Logout
     * @apiName Logout
     * @apiGroup Auth
     *
     *
     * @apiParam {String} api_token Current session token.
     *
     */

    public function logout(Request $request){
        $this->guard()->user()->api_token = Str::random(60);
        $this->guard()->user()->save();
        return response(['auth'=> ['auth.logout']], Response::HTTP_OK);
    }
}
