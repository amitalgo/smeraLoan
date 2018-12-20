<?php 
require_once 'classes/RestController.php';
require_once 'models/UserModel.php';

define( 'API_ACCESS_KEY', 'AAAAyjxmWek:APA91bG6ylWd1zk0y02lC4SpGZb771Xoa9dKzD6pn-YFjOrWxZ7KYKaG13v4GBDXR6FDYDtDIZ7VyljUMXFFC1CKQIpK5HSDtlh4cg35rf8SuoShuXOZDnzOAcYT01M9L7pQw7EX939H');

class Notification extends RestController{
    
    private $userModel;
    
    public function __construct(){
        $this->userModel = new UserModel();
    }
    
    public function sendNotification($userId, $message){
    // public function sendNotification(){
    //     $userId = 2433;
    //     $message = "Hello";
        $user = $this->userModel-> findOne($userId);
        if($user){
            $token[] = $user->device_id;
            $msg = array(
                'body' 	=> $message,
                'title'	=> 'Fundraiser Assist - New Donation',
                'icon'	=> 'icon',/*Default Icon*/
                'sound' => ''/*Default sound*/
            );
            $fields = array(
                'registration_ids'	=> $token,
                'notification'	    => $msg
            );
            $headers = array(
                'Authorization: key=' . API_ACCESS_KEY,
                'Content-Type: application/json'
            );    
            $this->send($headers, $fields);
        }
    }

    private function send($headers, $fields){
        $ch = curl_init();
		curl_setopt( $ch,CURLOPT_URL, 'https://fcm.googleapis.com/fcm/send' );
		curl_setopt( $ch,CURLOPT_POST, true );
		curl_setopt( $ch,CURLOPT_HTTPHEADER, $headers );
		curl_setopt( $ch,CURLOPT_RETURNTRANSFER, true );
		curl_setopt( $ch,CURLOPT_SSL_VERIFYPEER, false );
		curl_setopt( $ch,CURLOPT_POSTFIELDS, json_encode( $fields ) );
        $result = curl_exec($ch );
        curl_close( $ch );
		exit;
    }

    
}

?>