<?php

namespace App\Complex;

use App\Models as Model;
use Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Notification;
use App\Notifications;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;


class User{

    /**
     * @var Model\User
     */
    private $_model = null;

    /**
     * User constructor.
     * @param Model\User $user
     */
    public function __construct(Model\User $user)
    {
        $this->_model = $user;
        // Admin!12345
    }

    private function getColumns(){
        return $this->getModel()->getVisible();
    }


    /**
     * @return Model\User
     */
    private function getModel(){
        return $this->_model;
    }

    public function store(Array $data){
        $model = $this->getModel();

        foreach ($data as $key => $value){
            if ($key == 'password'){
                continue;
            }

            $model->$key = $value;
        }

        $password = self::generate_password();

        $model->password = bcrypt($password);
        $model->password_updated_at = Carbon::now();

        $model->save();

        return $model;
    }

    /**
     * @param $model Model\User
     * @param array $data
     * @return Model\User
     */
    public function update($model, array $data){
        foreach ($data as $key => $value){
            $model->$key = $value;

            if ($key == 'password'){
                $model->$key = bcrypt($value);
            }
        }

        $model->api_token = $this->genToken();

        $model->save();

        return $model;
    }

    private function genToken(){
        return Str::random(60);
    }

    /**
     * @param $id
     * @return bool|Model\User
     */
    public function get($id){
        $validator = Validator::make(
          ['id' => $id],
          [
            'id' => 'required|numeric|min:1',
          ]
        );


        $data = false;
        if ($validator->passes()){
            $data = $this->getModel()->find($id);
        }

        return $data;
    }

    /**
     * @param $user Model\User
     * return void
     */

    public function destroy($user){
        $user->api_token = $this->genToken();
        $user->save();

        $user->delete();
    }

}