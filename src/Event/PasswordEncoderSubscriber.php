<?php
namespace App\Event;

use App\Entity\User;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Core\EventListener\EventPriorities;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;


class PasswordEncoderSubscriber implements EventSubscriberInterface
{
    protected $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;    
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ["encodePassword", EventPriorities::PRE_WRITE]
        ];
    }

    public function encodePassword(ViewEvent $event)
    {
        $entity = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();
        
        if($entity instanceof User && $method === "POST"){
            $hash = $this->encoder->encodePassword($entity, $entity->getPassword());
            $entity->setPassword($hash);
        }
        return;
    }
}