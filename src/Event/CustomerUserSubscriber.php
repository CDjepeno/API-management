<?php
namespace App\Event;

use App\Entity\Customer;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Core\EventListener\EventPriorities;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;


class CustomerUserSubscriber implements EventSubscriberInterface
{
    private $token;

    public function __construct(TokenStorageInterface $token)
    {
        $this->token = $token;
    }
    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ["setUserForCustomer", EventPriorities::PRE_VALIDATE]
        ];
    }

    public function setUserForCustomer(ViewEvent $event)
    {
        $entity      = $event->getControllerResult();
        $method      = $event->getRequest()->getMethod();
        $currentUser = $this->token->getToken()->getUser();
        
        if($entity instanceof Customer && $method === "POST"){
            $entity->setUser($currentUser);
        }
        return;
    }
}