export class Message {
    id: number;
    title: string;
    body: string;

    constructor(id: number, title: string, body: string){
        this.id = id
        this.title = title;
        this.body = body;
    }
}

export enum ShowState {
    Settings,
    Output,
    Loading,
    Fullscreen,
    FullscreenWeightMaps,
}

export enum SidebarButtonState {
    Active,
    Enabled,
}