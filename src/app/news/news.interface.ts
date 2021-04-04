export interface INews {
    by: string;
    id: number;
    dead: boolean;
    deleted: boolean;
    type: "job" | "story" | "comment" | "poll" | "pollopt";
    title: string;
    time: string;
    text: string;
    url: string;
    scpre: number;
    descendants: number;
    parents: Array<number>;
    kids: Array<number>;
    parts: Array<number>
}

export interface IPageination {
    top: number;
    skip: number;
}

export interface IStory {
    type: "new" | "top" | "best"
}