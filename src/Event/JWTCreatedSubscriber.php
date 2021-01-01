<?php

namespace App\Event;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JWTCreatedSubscriber
{
    public function updateJwtData(JWTCreatedEvent $event)
    {
        $user = $event->getUSer();
        $data = $event->getData();
        $data['firstName'] = $user->getFirstName();
        $data['lastName']  = $user->getLastName();

        $event->setData($data);
    }
}