<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ReplyResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'content' => $this->content,
            'username' => $this->user->name,
            'reply_parent' => $this->reply_id,
            'created_at' => $this->created_at->diffForHumans(),
        ];
    }
}
