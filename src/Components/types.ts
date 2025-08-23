
export type FeedDataItems={
    id:number,
    name:string;
    imgUrl:string;
    timeStamp:number;
    postText:string;
    emoji:string;
}

export type LoginFormType={
    email:string;
    password:string;
}
export type LoginErrorType={
    email:string | null;
    password:string | null;
    loginError:string | null
}

export type SignUpFormType={
    email:string;
    password:string;
    repeatedPassword:string;
}
export type SignUpErrorType={
    email:string | null;
    password:string | null;
    repeatedPassword:string | null
}

export type FeedData=[FeedDataItems]
   
