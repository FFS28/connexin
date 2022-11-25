import { ReactNode } from "react";
// For Select Field
export interface ServiceListData {
    ref: string;
    service: string;
}
export interface RoleListData {
    ref: string;
    role: string;
}
export interface User {
    ref: string;
    name: string;
    email: string;
    service: string;
    role: string;
    level: number;
    active: boolean;
}
export interface FilterData {
    sent: number;
    await: number;
    overdue: number;
    completed: number;
}
export interface ServiceData {
    ref: string;
    service: string;
    subservice: string;
    where: string;
    hospital: string;
    address: string;
    postalcode: string;
    adsforredirect: string;
    serviceemail: string;
}
export interface RoleData {
    ref: string;
    role: string;
    author: string;
}
export interface RoleTableList {
    id: number;
    role: string;
    author: string;
}
export interface UserTableList {
    id: number;
    name: string;
    email: string; 
    level: string;
    state: ReactNode;
}
export interface ServiceTableList {
    id: number;
    service: string;
    subservice: string;
    where: string;
    hospital: string;
    address: string;
    postalcode: string;
    adsforredirect: string;
    serviceemail: string;
}
export interface CellType {
    id: string;
    numeric: boolean;
    disablePadding: boolean;
    label: string;
}
export interface LevelData {
    ref: string;
    level: string;
}