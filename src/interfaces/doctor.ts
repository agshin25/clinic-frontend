interface Image {
    id: number;
    imageUrl: string;
}

export interface Doctor {
    id: number,
    name: string
    surname: string,
    specialty: string,
    shortAbout: string
    createdAt: string,
    updatedAt: string,
    profileImage: Image
}