<?php
namespace App\Http\Guards;

use Illuminate\Auth\TokenGuard;
use Illuminate\Http\Request;
use Illuminate\Contracts\Auth\UserProvider;

class CustomToken extends TokenGuard
{


    /**
     * Create a new authentication guard.
     *
     * @param  \Illuminate\Contracts\Auth\UserProvider  $provider
     * @param  \Illuminate\Http\Request  $request
     * @return void
     */
    public function __construct(UserProvider $provider, Request $request)
    {
        parent::__construct($provider, $request);
    }

    public function getTokenForRequest(){
        $token = parent::getTokenForRequest();

        return $token;
    }

}