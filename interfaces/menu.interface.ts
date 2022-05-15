export interface MenuItem {
    _id: {
        secondCategory: string
    };
    pages: PageItem[];
}

export interface PageItem {
    _id: string;
    alias: string;
    title: string;
    category: string;
}
