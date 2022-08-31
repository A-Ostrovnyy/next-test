import { DetailedHTMLProps, ReactNode, HTMLAttributes } from "react";

export const enum PSize {
    small = 'small',
    medium = 'medium',
    large = 'large',
}

export interface SortProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    sort: SortEnum;
    setSort: (sort: SortEnum) => void
}

export enum SortEnum {
    Rating,
    Price
}
