export class Message {
    title: string;
    body: string;

    constructor(title: string, body: string){
        this.title = title;
        this.body = body;
    }
}

export enum ShowState {
    Settings,
    Output,
    Loading,
}

export enum SidebarButtonState {
    Active,
    Enabled,
}