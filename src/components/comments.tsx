'use client';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Textarea } from './ui/textarea';
import { ThumbsUp, MessageSquare } from 'lucide-react';
import { Separator } from './ui/separator';

const comments = [
    {
        id: 1,
        author: 'Learner One',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
        text: 'This is a fantastic explanation of fundamental rights! Really cleared up a lot of my doubts.',
        likes: 12,
        replies: 2,
    },
    {
        id: 2,
        author: 'Aspiring Lawyer',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
        text: 'Could you elaborate on the exceptions to Article 19? The instructor was a bit fast on that part.',
        likes: 5,
        replies: 1,
    },
    {
        id: 3,
        author: 'Jane Doe',
        avatar: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
        text: 'Absolutely brilliant course. The instructor\'s knowledge is top-notch.',
        likes: 25,
        replies: 0,
    }
]

export default function Comments() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-xl flex items-center gap-2">
                    <MessageSquare className="h-5 w-5"/> Student Comments
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="mb-6">
                    <Textarea placeholder="Add a comment..." className="mb-2" />
                    <Button>Post Comment</Button>
                </div>

                <Separator className="mb-6"/>

                <div className="space-y-6">
                    {comments.map(comment => (
                        <div key={comment.id} className="flex items-start gap-4">
                            <Avatar>
                                <AvatarImage src={comment.avatar} alt={comment.author} />
                                <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <p className="font-semibold">{comment.author}</p>
                                <p className="text-muted-foreground text-sm">{comment.text}</p>
                                <div className="flex items-center gap-4 text-muted-foreground text-xs mt-2">
                                    <button className="flex items-center gap-1 hover:text-primary">
                                        <ThumbsUp className="h-3 w-3" /> {comment.likes}
                                    </button>
                                    <button className="flex items-center gap-1 hover:text-primary">
                                        <MessageSquare className="h-3 w-3" /> {comment.replies} Replies
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
