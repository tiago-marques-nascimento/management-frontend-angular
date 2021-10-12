export class User {
    id?: string;
    name?: string;
    password?: string;
    roles: Role[] = [];
}

export class Role {
    id?: string;
    name?: string;
}
