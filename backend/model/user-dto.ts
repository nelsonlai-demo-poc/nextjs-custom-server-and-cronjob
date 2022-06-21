class UserDTO {
    username: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(username: string, createdAt: Date, updatedAt: Date) {
        this.username = username;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

export default UserDTO;
