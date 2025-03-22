
interface Image {
    id: number;
    imageUrl: string;
}

interface Registration {
    id: number;
    fullName: string;
    email: string;
    phone: string;
    notes: string | null;
    courseId: number;
    createdAt: string;
}

export interface Course {
    id: number;
    title: string;
    description: string;
    duration: string;
    price: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    images: Image[];
    registrations: Registration[];
}
