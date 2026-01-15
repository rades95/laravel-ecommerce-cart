<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class DailySalesReport extends Mailable
{
    use Queueable, SerializesModels;

    public $orders;
    public $totalRevenue;
    public $totalOrders;
    public $date;
    public $productsSold;

    /**
     * Create a new message instance.
     */
    public function __construct($orders, $totalRevenue, $totalOrders, $date, $productsSold)
    {
        $this->orders = $orders;
        $this->totalRevenue = $totalRevenue;
        $this->totalOrders = $totalOrders;
        $this->date = $date;
        $this->productsSold = $productsSold;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Daily Sales Report - ' . $this->date->format('F j, Y'),
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.daily-sales-report',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
