<?php
namespace App\Event;

use App\Entity\Invoice;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Core\EventListener\EventPriorities;
use App\Repository\InvoiceRepository;
use DateTime;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;


class InvoiceChronoSubscriber implements EventSubscriberInterface
{
    private $token;
    private $repository;

    public function __construct(TokenStorageInterface $token, InvoiceRepository $repository)
    {
        $this->token      = $token;
        $this->repository = $repository;
    }
    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ["setChronoForInvoice", EventPriorities::PRE_VALIDATE]
        ];
    }

    public function setChronoForInvoice(ViewEvent $event)
    {
        $entity      = $event->getControllerResult();
        $method      = $event->getRequest()->getMethod();
        $currentUser = $this->token->getToken()->getUser();
        
        if($entity instanceof Invoice && $method === "POST"){
            $nextChrono  = $this->repository->findNextChrono($currentUser);
            $entity->setChrono($nextChrono);
            
            if(empty($entity->getSentAt())){
                $entity->setSentAt(new \DateTime());
            }
        }
        return;
    }
}