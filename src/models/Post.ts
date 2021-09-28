class Post {
    id: number;
    number: number;
    title: string;
    description: string;
    createdAt: string;

    votesCount: number;
    commentsCount: number;
    
    user: PostUser;
    projectName: string;

    postURL: string;
}

class PostUser {
    id: number;
    name: string;
    avatarURL: string;
}

export default Post;